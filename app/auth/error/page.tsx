import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 mx-auto mb-4">
            <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-2xl font-heading font-semibold text-gray-900 dark:text-gray-100 text-center mb-2">
            Authentication Error
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            There was a problem signing you in. This could be due to:
          </p>

          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 list-disc list-inside">
            <li>GitHub OAuth is not configured</li>
            <li>Invalid credentials or session expired</li>
            <li>Network connectivity issues</li>
          </ul>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Go Home
            </Link>
            <Link
              href="/submit"
              className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-center transition-colors"
            >
              Submit Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
