"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { formatNumber } from "@/lib/utils";

interface PageViewsStatProps {
  slug: string;
}

export function PageViewsStat({ slug }: PageViewsStatProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/analytics/${slug}`, {
          cache: "force-cache",
        });

        if (response.ok) {
          const data = await response.json();
          setViews(data.views || 0);
        } else {
          setViews(0);
        }
      } catch {
        setViews(0);
      }
    };

    fetchViews();
  }, [slug]);

  if (views === null) {
    return (
      <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
          <TrendingUp className="h-3.5 w-3.5" />
          Total Views
        </div>
        <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-7 w-14 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
        <TrendingUp className="h-3.5 w-3.5" />
        Total Views
      </div>
      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
        {formatNumber(views)}
      </div>
    </div>
  );
}
