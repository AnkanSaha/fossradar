import { ProjectSubmissionForm } from "@/components/ProjectSubmissionForm";
import { TricolorRadar } from "@/components/TricolorRadar";
import { Github, Map } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Submit Form - FOSSRadar.in",
  description: "Submit your open source project to FOSSRadar.in using our quick and easy submission form",
};

export default function SubmitFormPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
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
                  Submit Your Project
                </p>
              </div>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <Link
                href="/radar"
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Radar"
              >
                <Map className="h-4 w-4" />
              </Link>
              <Link
                href="https://github.com/wbfoss/fossradar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-3">
            Quick Project Submission
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete this form to submit your project. We'll create a pull request automatically!
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Prefer the manual method?{" "}
            <Link href="/submit" className="text-blue-600 dark:text-blue-400 hover:underline">
              View Git-based workflow
            </Link>
          </p>
        </div>

        <ProjectSubmissionForm />
      </main>
    </div>
  );
}
