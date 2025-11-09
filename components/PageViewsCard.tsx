"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Eye, BarChart3 } from "lucide-react";

interface PageViewsCardProps {
  slug: string;
}

interface AnalyticsData {
  slug: string;
  views: number;
  source: string;
}

export function PageViewsCard({ slug }: PageViewsCardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`/api/analytics/${slug}`, {
          cache: "force-cache", // Use CDN cache
        });

        if (response.ok) {
          const analyticsData = await response.json();
          setData(analyticsData);
        } else {
          // Fallback to 0 views
          setData({
            slug,
            views: 0,
            source: "error",
          });
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
        setData({
          slug,
          views: 0,
          source: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
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

  if (!data) {
    return null;
  }

  const views = data.views || 0;
  const isAnalyticsConfigured = data.source === "vercel-analytics";

  return (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-sm mb-1">
        <TrendingUp className="h-4 w-4" />
        <span className="font-medium">Total Page Views</span>
      </div>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl font-bold text-purple-900 dark:text-purple-100">
          {views.toLocaleString()}
        </div>
        <div className="text-sm text-purple-600 dark:text-purple-400">
          all-time {views === 1 ? "view" : "views"}
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
        {isAnalyticsConfigured ? (
          <>
            <BarChart3 className="h-3 w-3" />
            <span>Powered by Vercel Analytics</span>
          </>
        ) : (
          <>
            <Eye className="h-3 w-3" />
            <span>Analytics being configured...</span>
          </>
        )}
      </div>
    </div>
  );
}
