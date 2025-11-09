import { ThemeToggle } from "@/components/ThemeToggle";
import { Github, FileCode, Map, Radar, Heart, Globe, Users, Code, Target, Zap, Plus } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - FOSSRadar.in",
  description: "Learn about FOSSRadar.in, India's comprehensive directory celebrating FOSS projects through their founders, creators, contributors, and community impact. Built by wbfoss for the Indian open source community.",
  keywords: [
    "about fossradar",
    "foss india",
    "open source directory",
    "indian developers",
    "wbfoss",
    "open source mission",
    "git-based directory",
    "community driven",
    "transparent platform",
  ],
  openGraph: {
    title: "About FOSSRadar.in - India's Open Source Directory",
    description: "Learn about our mission to celebrate and showcase India's vibrant FOSS ecosystem through founders, creators, and contributors.",
    url: "https://fossradar.in/about",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.in/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
              <Radar className="h-8 w-8 sm:h-10 sm:w-10 text-gray-900 dark:text-gray-100 flex-shrink-0 mt-1" />
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
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
              About FOSSRadar.in
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              India's comprehensive directory celebrating Free and Open Source Software (FOSS) projects through their founders, creators, core contributors, and community impact.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                Our Mission
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              FOSSRadar.in exists to shine a spotlight on India's vibrant open source ecosystem. We believe that open source innovation from India deserves recognition, celebration, and a central platform where developers, organizations, and enthusiasts can discover and connect with incredible projects.
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Our mission is to build a comprehensive, Git-based directory that showcases the diversity and depth of FOSS contributions from India—whether through their founders, creators, core contributors, organizational base, or projects that serve the Indian community.
            </p>
          </div>

          {/* What We Are Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                What is FOSSRadar.in?
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              FOSSRadar.in is a <strong>Git-based, community-driven directory</strong> that highlights open source projects with connections to India. We showcase projects where:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Founders from India</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Projects created by Indian founders, innovators, and entrepreneurs who are building the future of open source.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <Code className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Organizations Based in India</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Companies and organizations headquartered in India that maintain significant open source projects.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Community Impact</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Projects that serve the Indian community, solve local challenges, or have significant adoption in India.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Core Contributors</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Projects with significant contributions from developers based in India or of Indian origin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why FOSSRadar Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Radar className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                Why FOSSRadar?
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Discoverability</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  India has thousands of talented open source contributors and innovative projects, but they're often scattered across platforms. FOSSRadar brings them together in one searchable, organized directory.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Recognition</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  We celebrate the contributions of Indian developers, organizations, and communities to the global open source movement. Every project listed here is a testament to India's growing influence in FOSS.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Connection</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  FOSSRadar helps developers find projects to contribute to, organizations discover talent, and users find solutions built by and for the Indian community.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Transparency</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Built on Git with a PR-based submission workflow, every project addition is reviewed by the community. Our directory is fully open source, version-controlled, and transparent.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileCode className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                How It Works
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              FOSSRadar.in operates on a simple, transparent, Git-based workflow:
            </p>
            <ol className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Submit Your Project</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Create a TOML file with your project details and submit a pull request to our GitHub repository.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Community Review</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Our maintainers and community members review your submission for quality and relevance.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Verification</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Add the <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">fossradar</code> topic to your GitHub repo and include our badge to get verified status.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Automatic Updates</strong>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">We automatically update star counts, contributor information, and other metadata daily via GitHub Actions.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Behind FOSSRadar Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                Behind FOSSRadar
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              FOSSRadar.in is built and maintained by <Link href="https://wbfoss.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">wbfoss</Link>, a community-driven initiative dedicated to promoting Free and Open Source Software in India.
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We believe in the power of open source to drive innovation, collaboration, and positive change. FOSSRadar is our contribution to making India's FOSS ecosystem more visible, connected, and vibrant.
            </p>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              The platform itself is <strong>100% open source</strong>, built with Next.js 16, TypeScript, and Tailwind CSS 4. Every line of code, every design decision, and every feature is publicly available on GitHub for anyone to inspect, contribute to, or fork.
            </p>
          </div>

          {/* Get Involved Section */}
          <div className="mb-12">
            <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <h2 className="text-2xl sm:text-3xl font-heading font-normal mb-4 tracking-wide">
                Get Involved
              </h2>
              <p className="text-base sm:text-lg mb-6 text-blue-50">
                FOSSRadar is a community project, and we welcome contributions from everyone. Whether you're submitting a project, fixing a bug, or suggesting improvements, your participation makes FOSSRadar better for everyone.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100 font-medium transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Submit Your Project
                </Link>
                <Link
                  href="https://github.com/wbfoss/fossradar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition-colors"
                >
                  <Github className="h-5 w-5" />
                  View on GitHub
                </Link>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Open & Transparent</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Everything we do is open source, publicly visible, and community-driven.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Community First</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">We're built by the community, for the community. Every voice matters.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Quality Focused</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">We maintain high standards for project quality and maintain accurate, up-to-date information.</p>
              </div>
            </div>
          </div>
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
