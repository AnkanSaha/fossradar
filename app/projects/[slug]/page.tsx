import { notFound } from "next/navigation";
import { loadAllProjects, getProjectBySlug } from "@/lib/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

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

  const ogImageUrl = `https://fossradar.in${project.logo}`;
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} - FOSSRadar.in`,
      description: project.short_desc,
      images: [ogImageUrl],
      creator: "@wbfoss",
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Projects</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <ProjectDetail project={project} />
      </main>

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
            url: project.website,
          }),
        }}
      />
    </div>
  );
}
