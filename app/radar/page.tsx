import { loadAllProjects } from "@/lib/projects";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { TricolorRadar } from "@/components/TricolorRadar";
import { MeetupIcon } from "@/components/MeetupIcon";
import { RadarChart } from "@/components/RadarChart";
import { Github, MapPin, Package, TrendingUp, Building2, Star, ArrowUpRight, Radar, Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Geographic Radar - Explore Indian Open Source Projects by Location",
  description: "Interactive map of India's open source ecosystem. View projects by state, city & region. Discover tech hubs in Bangalore, Mumbai, Delhi, Hyderabad, Pune & Kolkata with real-time statistics.",
  keywords: [
    "open source india map",
    "projects by state",
    "indian tech cities",
    "kolkata projects",
    "bangalore projects",
    "mumbai projects",
    "delhi projects",
    "geographic distribution",
    "tech hubs india"
  ],
  openGraph: {
    title: "Geographic Radar - Explore Indian Open Source Projects by Location",
    description: "Interactive analytics dashboard showing open source project distribution across Indian states and cities.",
    url: "https://fossradar.in/radar",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.in/radar",
  },
};

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
  const totalStars = projects.reduce((sum, p) => sum + (p.stars || 0), 0);
  const verifiedProjects = projects.filter(p => p.verified).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://fossradar.in" },
          { name: "Geographic Radar", url: "https://fossradar.in/radar" },
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
                <Radar className="h-4 w-4" />
                Radar
              </Link>
              <Link
                href="/radar"
                className="sm:hidden p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Radar"
              >
                <Radar className="h-4 w-4" />
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
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2 sm:mb-3 tracking-wide">
                Geographic Radar
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Real-time analytics of India&apos;s open source landscape
              </p>
            </div>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium transition-all hover:scale-105 flex-shrink-0"
            >
              <Package className="h-4 w-4" />
              All Projects
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
            {/* Total Projects */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-blue-500/30 dark:shadow-blue-950/50 hover:shadow-2xl hover:shadow-blue-500/40 dark:hover:shadow-blue-950/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Package className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">PROJECTS</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{totalProjects}</p>
                <p className="text-xs opacity-80 hidden sm:block">Total repositories</p>
              </div>
            </div>

            {/* Total Stars */}
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-amber-500/30 dark:shadow-amber-950/50 hover:shadow-2xl hover:shadow-amber-500/40 dark:hover:shadow-amber-950/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">STARS</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{totalStars}</p>
                <p className="text-xs opacity-80 hidden sm:block">GitHub stars earned</p>
              </div>
            </div>

            {/* States */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-green-500/30 dark:shadow-green-950/50 hover:shadow-2xl hover:shadow-green-500/40 dark:hover:shadow-green-950/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">STATES</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{totalStates}</p>
                <p className="text-xs opacity-80 hidden sm:block">Across India</p>
              </div>
            </div>

            {/* Cities */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-violet-600 dark:from-purple-600 dark:to-violet-700 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-purple-500/30 dark:shadow-purple-950/50 hover:shadow-2xl hover:shadow-purple-500/40 dark:hover:shadow-purple-950/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">CITIES</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{totalCities}</p>
                <p className="text-xs opacity-80 hidden sm:block">Urban centers</p>
              </div>
            </div>

            {/* Verified */}
            <div className="relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-700 rounded-xl p-4 sm:p-6 text-white shadow-xl shadow-cyan-500/30 dark:shadow-cyan-950/50 hover:shadow-2xl hover:shadow-cyan-500/40 dark:hover:shadow-cyan-950/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 opacity-90" />
                  <p className="text-xs sm:text-sm font-semibold opacity-90 tracking-wide">VERIFIED</p>
                </div>
                <p className="text-3xl sm:text-5xl font-bold mb-1 tracking-tight">{verifiedProjects}</p>
                <p className="text-xs opacity-80 hidden sm:block">{Math.round((verifiedProjects/totalProjects)*100)}% of total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Radar Chart Visualization */}
        <div className="mb-12">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-6 sm:p-8 shadow-xl shadow-gray-200/50 dark:shadow-gray-950/50">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-gray-900 dark:text-gray-100 mb-2 tracking-wide">
                  Top States Distribution
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Hexagonal visualization of project distribution across India&apos;s leading tech hubs
                </p>
                <div className="flex justify-center lg:justify-start">
                  <RadarChart
                    data={sortedStates.slice(0, 6).map(([state, data]) => ({
                      label: state,
                      value: data.count,
                    }))}
                    className="w-full max-w-md"
                  />
                </div>
              </div>
              <div className="w-full lg:w-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                  {sortedStates.slice(0, 6).map(([state, data], index) => (
                    <div
                      key={state}
                      className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                            {state}
                          </p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {data.count}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {data.count === 1 ? 'project' : 'projects'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State-wise Breakdown */}
        <div className="space-y-5">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
              Detailed State Breakdown
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Complete project listings by state and city
            </p>
          </div>

          {sortedStates.map(([state, data], index) => {
            const sortedCities = Object.entries(data.cities)
              .sort(([, a], [, b]) => b.count - a.count);

            const maxCount = Math.max(...sortedCities.map(([, c]) => c.count));
            const statePercentage = Math.round((data.count / totalProjects) * 100);

            return (
              <div
                key={state}
                className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 shadow-md shadow-gray-200/50 dark:shadow-gray-950/50 hover:shadow-2xl hover:shadow-blue-200/30 dark:hover:shadow-blue-950/40 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1"
              >
                {/* State Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-base sm:text-lg flex-shrink-0">
                      #{index + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl sm:text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide break-words">
                        {state}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 break-words">
                        {data.count} {data.count === 1 ? 'project' : 'projects'} · {sortedCities.length} {sortedCities.length === 1 ? 'city' : 'cities'} · {statePercentage}% of total
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end sm:text-right">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {data.count}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cities Grid */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
                    <Building2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
                      Cities
                    </h4>
                  </div>

                  {sortedCities.map(([city, cityData]) => {
                    const percentage = (cityData.count / maxCount) * 100;
                    const cityPercentage = Math.round((cityData.count / data.count) * 100);

                    return (
                      <div key={city} className="space-y-3">
                        {/* City Header with Progress */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="font-semibold text-gray-900 dark:text-gray-100">
                                  {city}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                                  {cityData.count} {cityData.count === 1 ? 'project' : 'projects'} · {cityPercentage}%
                                </span>
                              </div>
                              {/* Enhanced Progress Bar */}
                              <div className="mt-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden shadow-inner">
                                <div
                                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-2 rounded-full transition-all duration-700 ease-out shadow-sm"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Project List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-7">
                          {cityData.projects.map((project) => (
                            <Link
                              key={project.slug}
                              href={`/projects/${project.slug}`}
                              className="group/project flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate group-hover/project:text-blue-600 dark:group-hover/project:text-blue-400 transition-colors">
                                  {project.name}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  {project.verified && (
                                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                      Verified
                                    </span>
                                  )}
                                  {project.stars > 0 && (
                                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
                                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                      {project.stars}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover/project:text-blue-600 dark:group-hover/project:text-blue-400 transition-colors flex-shrink-0" />
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

        {/* Back to home - Mobile only */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
          >
            <Package className="h-4 w-4" />
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
