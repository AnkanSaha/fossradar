"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

interface GitHubStarButtonProps {
  repoUrl: string;
  projectName: string;
}

export function GitHubStarButton({ repoUrl, projectName }: GitHubStarButtonProps) {
  const { data: session, status } = useSession();
  const [isStarring, setIsStarring] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if the repo is already starred
  useEffect(() => {
    if (session) {
      checkStarStatus();
    }
  }, [session, repoUrl]);

  const checkStarStatus = async () => {
    try {
      const response = await fetch(`/api/star?repoUrl=${encodeURIComponent(repoUrl)}`);
      const data = await response.json();
      setIsStarred(data.starred);
    } catch (error) {
      console.error("Failed to check star status:", error);
    }
  };

  const handleStarClick = async () => {
    setError(null);

    // If not authenticated, sign in with GitHub
    if (!session) {
      await signIn("github", {
        callbackUrl: window.location.href,
      });
      return;
    }

    // If already starred, show message
    if (isStarred) {
      window.open(repoUrl, "_blank");
      return;
    }

    // Star the repository
    setIsStarring(true);
    try {
      const response = await fetch("/api/star", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresAuth) {
          // Session expired or invalid, sign in again
          await signIn("github", {
            callbackUrl: window.location.href,
          });
          return;
        }
        throw new Error(data.error || "Failed to star repository");
      }

      setIsStarred(true);
      // Open the repo in a new tab to show the starred status
      window.open(repoUrl, "_blank");
    } catch (error: any) {
      console.error("Failed to star repository:", error);
      setError(error.message || "Failed to star repository");
    } finally {
      setIsStarring(false);
    }
  };

  return (
    <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-300 dark:border-yellow-700/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-heading font-normal text-yellow-900 dark:text-yellow-100 mb-1 tracking-wide flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-500 dark:fill-yellow-400 text-yellow-600 dark:text-yellow-500" />
            {isStarred ? "You starred this project!" : "Star this project on GitHub"}
          </h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            {isStarred
              ? "Thank you for your support! Click to view on GitHub."
              : session
              ? "Click to automatically star this repository"
              : "Sign in with GitHub to star this repository automatically"}
          </p>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {error}
            </p>
          )}
        </div>
        <button
          onClick={handleStarClick}
          disabled={isStarring || status === "loading"}
          className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold transition-colors shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Star className={`h-5 w-5 ${isStarred ? "fill-white" : ""}`} />
          {isStarring
            ? "Starring..."
            : isStarred
            ? "View on GitHub"
            : session
            ? "Give Star"
            : "Sign in & Star"}
        </button>
      </div>
    </div>
  );
}
