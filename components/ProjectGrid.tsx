"use client";

import { useState, useMemo, useEffect } from "react";
import Fuse from "fuse.js";
import { SearchIndexItem } from "@/lib/schema";
import { ProjectCard } from "./ProjectCard";
import { SearchBar } from "./SearchBar";
import { Filters, FilterOptions } from "./Filters";
import { Project } from "@/lib/schema";

interface ProjectGridProps {
  initialProjects: SearchIndexItem[];
}

export function ProjectGrid({ initialProjects }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    tags: [],
    verifiedOnly: false,
    lookingForContributors: false,
    sortBy: "name",
  });

  // Debounced search query
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(initialProjects, {
        keys: ["name", "short_desc", "tags"],
        threshold: 0.3,
        includeScore: true,
      }),
    [initialProjects]
  );

  // Get all unique tags
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    initialProjects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [initialProjects]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let results = initialProjects;

    // Apply search
    if (debouncedQuery.trim()) {
      const fuseResults = fuse.search(debouncedQuery);
      results = fuseResults.map((result) => result.item);
    }

    // Apply filters
    results = results.filter((project) => {
      // Verified filter
      if (filters.verifiedOnly && !project.verified) {
        return false;
      }

      // Looking for contributors filter
      if (filters.lookingForContributors && !project.looking_for_contributors) {
        return false;
      }

      // Tag filter (AND logic - project must have all selected tags)
      if (filters.tags.length > 0) {
        const hasAllTags = filters.tags.every((tag) => project.tags.includes(tag));
        if (!hasAllTags) {
          return false;
        }
      }

      return true;
    });

    // Apply sorting
    results.sort((a, b) => {
      switch (filters.sortBy) {
        case "stars":
          return (b.stars || 0) - (a.stars || 0);
        case "recent":
          return new Date(b.added_at).getTime() - new Date(a.added_at).getTime();
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return results;
  }, [initialProjects, debouncedQuery, filters, fuse]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Filters */}
      <Filters availableTags={availableTags} filters={filters} onChange={setFilters} />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Project Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project as unknown as Project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No projects found
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
