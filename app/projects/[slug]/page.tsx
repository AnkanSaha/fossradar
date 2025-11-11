import { notFound } from "next/navigation";
import { loadAllProjects, getProjectBySlug } from "@/lib/projects";
import { findSimilarProjects } from "@/lib/similar";
import { ProjectDetail } from "@/components/ProjectDetail";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { TricolorRadar } from "@/components/TricolorRadar";
import { MeetupIcon } from "@/components/MeetupIcon";
import { Github, Map, Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600; // Revalidate every hour

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = loadAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const pageUrl = `https://fossradar.in/projects/${slug}`;

  return {
    title: `${project.name} - FOSSRadar.in`,
    description: project.short_desc,
    keywords: [...project.tags, "open source", "fossradar", "india", project.primary_lang.toLowerCase()],
    authors: [{ name: "FOSSRadar.in" }],
    creator: "wbfoss",
    publisher: "wbfoss",
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.name} - Open Source Project from India`,
      description: project.short_desc,
      type: "website",
      url: pageUrl,
      siteName: "FOSSRadar.in",
      locale: "en_IN",
      images: [
        {
          url: `/projects/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.name} - Open Source Project`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} - FOSSRadar.in`,
      description: project.short_desc,
      creator: "@wbfoss",
      images: [`/projects/${slug}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Load cache data
  let cache;
  try {
    const cachePath = path.join(process.cwd(), "public", "cache", `${slug}.json`);
    if (fs.existsSync(cachePath)) {
      const cacheData = fs.readFileSync(cachePath, "utf-8");
      cache = JSON.parse(cacheData);
    }
  } catch (error) {
    console.error("Error loading cache:", error);
  }

  // Find similar projects
  const allProjects = loadAllProjects();
  const similarProjects = findSimilarProjects(project, allProjects, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.in" },
          { name: "Projects", url: "https://fossradar.in" },
          { name: project.name, url: `https://fossradar.in/projects/${slug}` },
        ]}
      />
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
              <TricolorRadar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 mt-1" />
              <div className="min-w-0">
                <h1 className="text-3xl sm:text-4xl text-gray-900 dark:text-gray-100 tracking-wider truncate" style={{ fontFamily: 'var(--font-vt323)' }}>
                  fossradar
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm truncate">
                  Discover Open Source Projects from India
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link
                href="/radar"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors"
              >
                <Map className="h-4 w-4" />
                Radar
              </Link>
              <Link
                href="/radar"
                className="sm:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Radar"
              >
                <Map className="h-4 w-4" />
              </Link>
              <Link
                href="/submit"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                <Plus className="h-4 w-4" />
                Submit Project
              </Link>
              <Link
                href="/submit"
                className="sm:hidden p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                aria-label="Submit Project"
              >
                <Plus className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/wbfoss/fossradar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
              <Link
                href="https://www.meetup.com/wbfoss/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 sm:p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Meetup Group"
              >
                <MeetupIcon className="h-7 w-7 sm:h-8 sm:w-8" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <ProjectDetail project={project} cache={cache} similarProjects={similarProjects} />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; 2025{" "}
                <Link
                  href="/"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  FOSSRadar.in
                </Link>
                . Open source directory.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                An initiative by{" "}
                <Link
                  href="https://wbfoss.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  wbfoss
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/wbfoss/fossradar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Link>
              <Link
                href="/about"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: project.name,
            description: project.short_desc,
            codeRepository: project.repo,
            license: `https://spdx.org/licenses/${project.license}.html`,
            programmingLanguage: project.primary_lang,
            keywords: project.tags,
            ...(project.website && { url: project.website }),
          }),
        }}
      />
    </div>
  );
}
