import Link from "next/link";
import { Star, ExternalLink, GitBranch, MapPin } from "lucide-react";
import { Project } from "@/lib/schema";
import { VerifiedPill } from "./VerifiedPill";
import { cn, formatNumber } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block p-4 sm:p-6 rounded-xl border transition-all duration-300",
        "border-gray-200 dark:border-gray-800",
        "hover:border-blue-300 dark:hover:border-blue-700",
        "hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-900/20",
        "hover:-translate-y-1",
        "bg-white dark:bg-gray-900",
        "relative overflow-hidden"
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-heading font-normal text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-wide">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              {project.primary_lang && (
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                  {project.primary_lang}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                <MapPin className="h-3 w-3" />
                {project.location_city}
              </span>
            </div>
          </div>
          <VerifiedPill verified={project.verified || false} />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
          {project.short_desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium",
                "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300",
                "border border-blue-100 dark:border-blue-900/50"
              )}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2.5 py-1 rounded-md text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {project.stars > 0 && (
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{formatNumber(project.stars)}</span>
            </span>
          )}
          {project.looking_for_contributors && (
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <GitBranch className="h-4 w-4" />
              <span className="text-xs hidden sm:inline">Looking for contributors</span>
              <span className="text-xs sm:hidden">Contributors wanted</span>
            </span>
          )}
          {project.website && (
            <span className="flex items-center gap-1 ml-auto text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
              <span className="text-xs font-medium">Visit</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
