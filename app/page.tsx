import { loadAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Github, FileCode, Map } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

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
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-logo text-gray-900 dark:text-gray-100 tracking-wider">
                FOSSRadar.in
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                Discover Open Source Projects from India
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/radar"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition-colors"
              >
                <Map className="h-4 w-4" />
                Radar
              </Link>
              <Link
                href="https://github.com/wbfoss/fossradar#-for-project-owners-get-listed"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                <FileCode className="h-4 w-4" />
                Submit Project
              </Link>
              <ThemeToggle />
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
              href="https://github.com/wbfoss/fossradar#-for-project-owners-get-listed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
            >
              <FileCode className="h-4 w-4" />
              Submit via Pull Request
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
                &copy; 2025 FOSSRadar.in. Open source directory.
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
