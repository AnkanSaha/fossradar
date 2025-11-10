"use client";

import { useSearchParams } from "next/navigation";
import { TricolorRadar } from "@/components/TricolorRadar";
import { CheckCircle, ExternalLink, Github, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const prUrl = searchParams.get("pr");

  // Clear the draft from localStorage
  useEffect(() => {
    try {
      localStorage.removeItem("fossradar_submission_draft");
    } catch (error) {
      console.error("Failed to clear draft:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <Link href="/" className="flex items-start gap-2 sm:gap-3">
            <TricolorRadar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl sm:text-4xl text-gray-900 dark:text-gray-100 tracking-wider" style={{ fontFamily: 'var(--font-vt323)' }}>
                fossradar
              </h1>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-6">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl sm:text-4xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-4">
            Submission Successful!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Your project has been submitted and a pull request has been created.
          </p>

          {/* PR Link */}
          {prUrl && (
            <div className="mb-8">
              <a
                href={prUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg"
              >
                <Github className="h-5 w-5" />
                View Pull Request
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          )}

          {/* Next Steps */}
          <div className="text-left bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-8">
            <h2 className="text-xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-4">
              What Happens Next?
            </h2>
            <ol className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Review Process</strong>
                  <p className="text-sm mt-1">
                    Our maintainers will review your submission within 2-3 business days.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Add fossradar Topic</strong>
                  <p className="text-sm mt-1">
                    Add <code className="px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm">fossradar</code> as a topic to your GitHub repository.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">Get Verified (Optional)</strong>
                  <p className="text-sm mt-1">
                    Add the FOSSRadar verified badge to your README to display the verified status on your project page.
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <div>
                  <strong className="text-gray-900 dark:text-gray-100">PR Merged</strong>
                  <p className="text-sm mt-1">
                    Once approved, your PR will be merged and your project will appear on FOSSRadar.in within an hour!
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link
              href="/submit/form"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 font-medium transition-colors"
            >
              Submit Another Project
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
