"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Eye } from "lucide-react";

interface PageViewsCardProps {
  slug: string;
}

export function PageViewsCard({ slug }: PageViewsCardProps) {
  const [hits, setHits] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

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
        } else {
          // If POST fails, try GET
          const getResponse = await fetch(`/api/hits?slug=${slug}`, {
            cache: "no-store",
          });
          if (getResponse.ok) {
            const data = await getResponse.json();
            setHits(data.hits);
          }
        }
      } catch (error) {
        console.error("Error tracking hit:", error);
        // Fallback: try to get current hits without incrementing
        try {
          const response = await fetch(`/api/hits?slug=${slug}`, {
            cache: "no-store",
          });
          if (response.ok) {
            const data = await response.json();
            setHits(data.hits);
          }
        } catch {
          // Silent fail - set to 0 to show something
          setHits(0);
        }
      } finally {
        setLoading(false);
      }
    };

    trackHit();
  }, [slug]);

  if (loading) {
    return (
      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
          <Eye className="h-4 w-4" />
          Page Views
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-8 w-20 rounded"></div>
        </div>
      </div>
    );
  }

  if (hits === null) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm mb-1">
        <TrendingUp className="h-4 w-4" />
        <span className="font-medium">Total Page Views</span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
          {hits.toLocaleString()}
        </div>
        <div className="text-sm text-purple-600 dark:text-purple-400">
          lifetime {hits === 1 ? "view" : "views"}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
        <Eye className="h-3 w-3" />
        <span>Tracked since launch</span>
      </div>
    </div>
  );
}
