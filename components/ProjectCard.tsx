import Link from "next/link";
import { Star, ExternalLink, MapPin } from "lucide-react";
import { Project } from "@/lib/schema";
import { cn, formatNumber } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group block p-4 sm:p-6 rounded-xl border transition-all duration-300 ease-out",
        "border-gray-200 dark:border-gray-800",
        "hover:border-blue-300 dark:hover:border-blue-700",
        // Enhanced shadows for better elevation
        "shadow-md shadow-gray-200/50 dark:shadow-gray-950/50",
        "hover:shadow-2xl hover:shadow-blue-200/30 dark:hover:shadow-blue-950/40",
        // Smooth hover animation with subtle scale
        "hover:-translate-y-2 hover:scale-[1.02]",
        // Glassmorphism effect
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm",
        "relative overflow-hidden"
      )}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 mb-2">
              <h3 className="text-xl sm:text-2xl font-heading font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-wide flex-1">
                {project.name}
              </h3>
              {/* Status Badges */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {project.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Verified
                  </span>
                )}
                {project.looking_for_contributors && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    <span className="hidden sm:inline">Contributors</span>
                    <span className="sm:hidden">Help</span>
                  </span>
                )}
              </div>
            </div>
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

        <div className="flex items-center justify-between text-sm">
          {project.stars > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900/30">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-base text-gray-900 dark:text-gray-100">{formatNumber(project.stars)}</span>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">stars</span>
            </div>
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
