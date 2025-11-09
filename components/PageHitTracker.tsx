"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface PageHitTrackerProps {
  slug: string;
}

export function PageHitTracker({ slug }: PageHitTrackerProps) {
  const [hits, setHits] = useState<number | null>(null);

  useEffect(() => {
    const trackHit = async () => {
      try {
        // Increment hit count
        const response = await fetch("/api/hits", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setHits(data.hits);
        }
      } catch (error) {
        console.error("Error tracking hit:", error);
        // Fallback: try to get current hits without incrementing
        try {
          const response = await fetch(`/api/hits?slug=${slug}`);
          if (response.ok) {
            const data = await response.json();
            setHits(data.hits);
          }
        } catch {
          // Silent fail
        }
      }
    };

    trackHit();
  }, [slug]);

  if (hits === null) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
      <Eye className="h-4 w-4" />
      <span className="font-medium">{hits.toLocaleString()}</span>
      <span className="text-gray-500 dark:text-gray-400">
        {hits === 1 ? "view" : "views"}
      </span>
    </div>
  );
}
