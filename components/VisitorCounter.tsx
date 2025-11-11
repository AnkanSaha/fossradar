"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface VisitorCounterProps {
  slug: string;
}

export function VisitorCounter({ slug }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Increment visitor count
        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
          setError(null);
        } else {
          const errorData = await response.json();
          console.error("Error tracking visitor:", errorData.error);
          // Fallback: try to get current count without incrementing
          await fetchCurrentCount();
        }
      } catch (err) {
        console.error("Error tracking visitor:", err);
        // Fallback: try to get current count without incrementing
        await fetchCurrentCount();
      }
    };

    trackVisitor();
  }, [slug]);

  const fetchCurrentCount = async () => {
    try {
      const response = await fetch(`/api/visitors?slug=${encodeURIComponent(slug)}`);
      if (response.ok) {
        const data = await response.json();
        setCount(data.count);
        setError(null);
      } else {
        setError("Unable to load visitor count");
      }
    } catch (err) {
      console.error("Error fetching visitor count:", err);
      setError("Unable to load visitor count");
    }
  };

  // Don't render if count is not loaded or there's an error
  if (count === null) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
      <Eye className="h-4 w-4" />
      <span className="font-medium">{count.toLocaleString()}</span>
      <span className="text-gray-500 dark:text-gray-400">
        {count === 1 ? "visit" : "visits"}
      </span>
    </div>
  );
}
