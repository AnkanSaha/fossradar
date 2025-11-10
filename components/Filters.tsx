"use client";

import { cn } from "@/lib/utils";
import { Filter, X } from "lucide-react";
import { useState } from "react";

export interface FilterOptions {
  tags: string[];
  verifiedOnly: boolean;
  lookingForContributors: boolean;
  sortBy: "name" | "stars" | "recent";
}

interface FiltersProps {
  availableTags: string[];
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
}

export function Filters({ availableTags, filters, onChange }: FiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onChange({ ...filters, tags: newTags });
  };

  const clearFilters = () => {
    onChange({
      tags: [],
      verifiedOnly: false,
      lookingForContributors: false,
      sortBy: "name",
    });
  };

  const activeFilterCount =
    filters.tags.length +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.lookingForContributors ? 1 : 0) +
    (filters.sortBy !== "name" ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
            "border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-900",
            "text-gray-700 dark:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <Filter className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-6">
          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Sort by
            </label>
            <div className="flex flex-wrap gap-2">
              {(["name", "stars", "recent"] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => onChange({ ...filters, sortBy: sort })}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    filters.sortBy === sort
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {sort === "name" && "Name"}
                  {sort === "stars" && "Stars"}
                  {sort === "recent" && "Recently Added"}
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Quick Filters
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => onChange({ ...filters, verifiedOnly: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Verified projects only
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.lookingForContributors}
                  onChange={(e) => onChange({ ...filters, lookingForContributors: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Looking for contributors
                </span>
              </label>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                    filters.tags.includes(tag)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
