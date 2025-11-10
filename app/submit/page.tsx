import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { TricolorRadar } from "@/components/TricolorRadar";
import { MeetupIcon } from "@/components/MeetupIcon";
import { Github, Map, Plus, CheckCircle2, GitPullRequest, FileText, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit Your Open Source Project - FOSSRadar.in",
  description: "Add your project to India's leading FOSS directory. Step-by-step guide with TOML examples, validation scripts & PR workflow. Get discovered by 1000s of developers across India.",
  keywords: [
    "submit project",
    "add project fossradar",
    "list project",
    "open source submission",
    "foss directory india",
    "github pull request",
    "project listing",
  ],
  openGraph: {
    title: "Submit Your Project - FOSSRadar.in",
    description: "Step-by-step guide to submit your open source project to FOSSRadar.in",
    url: "https://fossradar.in/submit",
    type: "website",
  },
  alternates: {
    canonical: "https://fossradar.in/submit",
  },
};

export default function SubmitPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I submit my project to FOSSRadar.in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Fork the FOSSRadar GitHub repository, create a TOML file in data/projects/ with your project details, validate it using 'npm run validate', and submit a pull request. Our team will review and merge it within 2-3 business days."
        }
      },
      {
        "@type": "Question",
        "name": "Is my project eligible for FOSSRadar.in?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your project is eligible if it meets any one of these criteria: Founded in India, has core contributors from India, maintained by Indian organizations, or serves the Indian community."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get the verified badge?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Add 'fossradar' as a GitHub topic to your repository and include the FOSSRadar badge in your README. Once we verify this, your project will receive the verified status."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the review process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our maintainers typically review submissions within 2-3 business days. If changes are needed, we'll comment on your pull request with specific feedback."
        }
      }
    ]
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://fossradar.in" },
    { name: "Submit Project", url: "https://fossradar.in/submit" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://www.meetup.com/wbfoss/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Meetup Group"
              >
                <MeetupIcon className="h-4 w-4" />
              </Link>
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
              Submit Your Project
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Get your open source project listed on FOSSRadar.in and reach India's vibrant FOSS community. Follow these simple steps to submit your project.
            </p>
          </div>

          {/* Eligibility Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                Is Your Project Eligible?
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Your project is eligible if it meets <strong>any one</strong> of these criteria:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Founded in India</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Project created by founders or organizations based in India</p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Core Contributors</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Significant contributions from developers based in India</p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Indian Organization</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Maintained by companies or organizations headquartered in India</p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Community Impact</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Serves the Indian community or solves local challenges</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Steps */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <GitPullRequest className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                Submission Steps
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              FOSSRadar uses a Git-based submission workflow. Follow these steps to submit your project:
            </p>
            <ol className="space-y-6 text-gray-700 dark:text-gray-300">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100 block mb-2">Fork the Repository</strong>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Visit the FOSSRadar GitHub repository and click the "Fork" button to create your own copy.
                  </p>
                  <Link
                    href="https://github.com/wbfoss/fossradar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm font-medium transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    View Repository
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100 block mb-2">Create Project File</strong>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    In the <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">data/projects/</code> directory, create a new <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">.toml</code> file named after your project (e.g., <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">my-project.toml</code>).
                  </p>
                  <div className="p-4 rounded-lg bg-gray-900 dark:bg-gray-950 text-gray-100 overflow-x-auto">
                    <pre className="text-sm"><code>{`name = "Your Project Name"
slug = "your-project-slug"
short_desc = "Brief description of your project"
repo = "https://github.com/your-username/your-project"
website = "https://your-project.com"
primary_lang = "JavaScript"
license = "MIT"
tags = ["web", "framework", "api"]
location_city = "Bangalore"
location_indian_state = "Karnataka"
looking_for_contributors = false`}</code></pre>
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">3</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100 block mb-2">Add Project Logo (Optional)</strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    Place a <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">logo.png</code> or <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">logo.svg</code> file in <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">public/logos/your-project-slug/</code>. Recommended size: 200x200px.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">4</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100 block mb-2">Validate Your Submission</strong>
                  <p className="text-gray-600 dark:text-gray-400">
                    Run the validation script to ensure your project file is correctly formatted:
                  </p>
                  <div className="mt-3 p-4 rounded-lg bg-gray-900 dark:bg-gray-950 text-gray-100">
                    <code className="text-sm">npm run validate</code>
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">5</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100 block mb-2">Create Pull Request</strong>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Commit your changes and create a pull request to the main repository. Use a clear title like "Add [Project Name]" and describe your project briefly in the PR description.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">6</span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100 block mb-2">Get Verified (Optional)</strong>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    To get the verified badge:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                    <li>Add <code className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">fossradar</code> as a GitHub topic to your repository</li>
                    <li>Include the FOSSRadar badge in your README (we'll provide the markdown)</li>
                  </ul>
                </div>
              </li>
            </ol>
          </div>

          {/* What Happens Next */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              <h2 className="text-2xl sm:text-3xl font-heading font-normal text-gray-900 dark:text-gray-100 tracking-wide">
                What Happens Next?
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Review Process</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Our maintainers will review your submission within 2-3 business days. We'll check that your project meets our eligibility criteria and that all required information is provided.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Feedback & Approval</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  If any changes are needed, we'll comment on your PR with specific requests. Once approved, your PR will be merged and your project will appear on FOSSRadar.in within an hour.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Automatic Updates</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Once listed, we automatically update your project's star count, contributors, and other metadata daily via GitHub Actions. No need for manual updates!
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mb-12">
            <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <h2 className="text-2xl sm:text-3xl font-heading font-normal mb-4 tracking-wide">
                Ready to Submit?
              </h2>
              <p className="text-base sm:text-lg mb-6 text-blue-50">
                Head over to our GitHub repository and start the submission process. We're excited to showcase your project to India's FOSS community!
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  href="https://github.com/wbfoss/fossradar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-600 hover:bg-gray-100 font-medium transition-colors"
                >
                  <Github className="h-5 w-5" />
                  View on GitHub
                  <ExternalLink className="h-4 w-4" />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-medium transition-colors"
                >
                  Browse Projects
                </Link>
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Need Help?
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              If you have questions about the submission process, feel free to open an issue on GitHub or reach out to the maintainers.
            </p>
            <Link
              href="https://github.com/wbfoss/fossradar/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Open an Issue
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
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
