import { Project } from "@/lib/schema";
import { Star, MapPin } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface SimilarProjectsProps {
  projects: Project[];
}

export function SimilarProjects({ projects }: SimilarProjectsProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider mb-3">
        Similar Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start gap-3">
              {project.logo && (
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.logo}
                    alt={`${project.name} logo`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                  {project.short_desc}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {formatNumber(project.stars || 0)}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {project.location_city}
                  </div>
                  {project.primary_lang && (
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {project.primary_lang}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
