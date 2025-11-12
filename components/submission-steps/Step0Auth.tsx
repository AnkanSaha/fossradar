"use client";

import { useSession, signIn } from "next-auth/react";
import { Github, CheckCircle, Loader2 } from "lucide-react";

interface Step0Props {
  onNext: () => void;
}

export function Step0Auth({ onNext }: Step0Props) {
  const { data: session, status } = useSession();

  // Auto-advance if already authenticated
  if (status === "authenticated" && session) {
    setTimeout(() => onNext(), 100);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2">
          Sign in with GitHub
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Authenticate with your GitHub account to submit your project. We'll create a pull request on your behalf.
        </p>
      </div>

      {status === "loading" ? (
        <div className="p-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-center gap-3">
            <Loader2 className="h-6 w-6 text-blue-600 dark:text-blue-400 animate-spin" />
            <p className="text-blue-800 dark:text-blue-200">
              Checking authentication status...
            </p>
          </div>
        </div>
      ) : session ? (
        <div className="p-6 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-green-800 dark:text-green-200 font-medium">
                Successfully signed in!
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                @{session.user?.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onNext}
            className="w-full px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors"
          >
            Continue
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
              Why do we need GitHub authentication?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Automatically create a pull request from your account</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Fork the repository to your account</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Add your project details to your fork</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <span>Submit PR for maintainer review</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Required permission:</strong> public_repo (to create forks and pull requests)
            </p>
          </div>

          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: window.location.href })}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-base font-semibold transition-colors"
          >
            <Github className="h-5 w-5" />
            Sign in with GitHub
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            By signing in, you agree to let us create a pull request on your behalf
          </p>
        </div>
      )}
    </div>
  );
}
