import { loadAllProjects } from "@/lib/projects";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Github, MapPin, Package } from "lucide-react";
import Link from "next/link";

export const revalidate = 3600; // Revalidate every hour

export default function RadarPage() {
  const projects = loadAllProjects();

  // Aggregate projects by state
  const projectsByState = projects.reduce((acc, project) => {
    const state = project.location_indian_state;
    if (!acc[state]) {
      acc[state] = {
        count: 0,
        cities: {},
        projects: [],
      };
    }
    acc[state].count += 1;
    acc[state].projects.push(project);

    // Track cities within state
    const city = project.location_city;
    if (!acc[state].cities[city]) {
      acc[state].cities[city] = {
        count: 0,
        projects: [],
      };
    }
    acc[state].cities[city].count += 1;
    acc[state].cities[city].projects.push(project);

    return acc;
  }, {} as Record<string, { count: number; cities: Record<string, { count: number; projects: typeof projects }>; projects: typeof projects }>);

  // Sort states by project count (descending)
  const sortedStates = Object.entries(projectsByState)
    .sort(([, a], [, b]) => b.count - a.count);

  const totalProjects = projects.length;
  const totalStates = sortedStates.length;
  const totalCities = new Set(projects.map(p => `${p.location_city}, ${p.location_indian_state}`)).size;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-4xl font-logo font-normal text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors tracking-wider">
                FOSSRadar.in
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Geographic Distribution
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Stats Overview */}
        <div className="mb-12">
          <h1 className="text-5xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
            Project Radar
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Explore open source projects across India by state and city
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalProjects}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-green-600 dark:text-green-400" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">States</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalStates}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cities</p>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{totalCities}</p>
            </div>
          </div>
        </div>

        {/* State-wise Breakdown */}
        <div className="space-y-6">
          <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
            Projects by State
          </h2>

          {sortedStates.map(([state, data]) => {
            const sortedCities = Object.entries(data.cities)
              .sort(([, a], [, b]) => b.count - a.count);

            const maxCount = Math.max(...sortedCities.map(([, c]) => c.count));

            return (
              <div
                key={state}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                      {state}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {data.count} {data.count === 1 ? 'project' : 'projects'} across {sortedCities.length} {sortedCities.length === 1 ? 'city' : 'cities'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {data.count}
                    </div>
                  </div>
                </div>

                {/* Cities within this state */}
                <div className="space-y-3">
                  <h4 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider">
                    Cities
                  </h4>
                  {sortedCities.map(([city, cityData]) => {
                    const percentage = (cityData.count / maxCount) * 100;

                    return (
                      <div key={city} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {city}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-500">
                                {cityData.count} {cityData.count === 1 ? 'project' : 'projects'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Visual bar */}
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>

                        {/* Project list */}
                        <div className="pl-6 space-y-1">
                          {cityData.projects.map((project) => (
                            <Link
                              key={project.slug}
                              href={`/projects/${project.slug}`}
                              className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              → {project.name}
                              {project.verified && (
                                <span className="ml-2 text-xs text-green-600 dark:text-green-400">✓</span>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            Back to Projects
          </Link>
        </div>
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
