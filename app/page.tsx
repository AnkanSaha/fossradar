import { loadAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { TricolorRadar } from "@/components/TricolorRadar";
import { MeetupIcon } from "@/components/MeetupIcon";
import { Github, Map, Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "FOSSRadar.in - Discover Open Source Projects from India",
  description: "India's leading directory of open source projects. Discover 100+ FOSS projects from Indian developers across Bangalore, Mumbai, Delhi, Kolkata & more. Search by tech stack, location & tags.",
  keywords: [
    "open source india",
    "foss projects",
    "indian developers",
    "github projects india",
    "open source directory",
    "indian tech community",
    "developer projects",
    "open source contributors"
  ],
  openGraph: {
    title: "FOSSRadar.in - Discover Open Source Projects from India",
    description: "Explore India's vibrant open source ecosystem. Search and discover FOSS projects by Indian founders and contributors.",
    url: "https://fossradar.in",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.in",
  },
};

export default function Home() {
  const projects = loadAllProjects();

  // Convert to search index format
  const searchIndex = projects.map((project) => ({
    slug: project.slug,
    name: project.name,
    short_desc: project.short_desc,
    tags: project.tags,
    stars: project.stars || 0,
    primary_lang: project.primary_lang,
    verified: project.verified || false,
    added_at: project.added_at,
    looking_for_contributors: project.looking_for_contributors,
    location_city: project.location_city,
    location_indian_state: project.location_indian_state,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.in" },
        ]}
      />
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <TricolorRadar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
                <h1 className="text-3xl sm:text-4xl text-gray-900 dark:text-gray-100 tracking-wider truncate" style={{ fontFamily: 'var(--font-vt323)' }}>
                  fossradar
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm truncate">
                Discover Open Source Projects from India
              </p>
            </div>
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
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        {projects.length > 0 ? (
          <ProjectGrid initialProjects={searchIndex} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No projects yet. Be the first to add one!
            </p>
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              <Plus className="h-4 w-4" />
              Submit Your Project
            </Link>
          </div>
        )}
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
    </div>
  );
}
