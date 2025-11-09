import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-4 tracking-wide">404</h1>
        <h2 className="text-3xl font-heading font-normal text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
          Project Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
