import { Project } from "@/lib/schema";
import { VerifiedPill } from "./VerifiedPill";
import { InlineCopy } from "./InlineCopy";
import { ExternalLink, Github, Star, GitBranch, Calendar, Scale } from "lucide-react";
import { formatNumber, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const badgeMarkdown = `[![fossradar.in: Verified](https://img.shields.io/badge/fossradar.in-Verified-brightgreen?style=for-the-badge)](https://fossradar.in/projects/${project.slug})`;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-5xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2 tracking-wide">
              {project.name}
            </h1>
            {project.primary_lang && (
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {project.primary_lang}
              </p>
            )}
          </div>
          <VerifiedPill verified={project.verified || false} />
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {project.short_desc}
        </p>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-3">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Website
            </a>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <Star className="h-4 w-4" />
            Stars
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatNumber(project.stars || 0)}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <Scale className="h-4 w-4" />
            License
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {project.license}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <GitBranch className="h-4 w-4" />
            Issues
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {project.good_first_issues || 0}
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-1">
            <Calendar className="h-4 w-4" />
            Added
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {formatRelativeTime(project.added_at)}
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <h2 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider mb-3">
          Tags
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Looking for Contributors */}
      {project.looking_for_contributors && (
        <div className="mb-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <GitBranch className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="text-lg font-heading font-normal text-blue-900 dark:text-blue-100 mb-1 tracking-wide">
                Looking for Contributors
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                This project welcomes new contributors! Check out the repository to get started.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Badge */}
      {project.verified && (
        <div className="mb-8">
          <h2 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider mb-3">
            Verified Badge
          </h2>
          <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Add this badge to your README to show that your project is verified on Radar:
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <code className="flex-1 px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-200 font-mono overflow-x-auto">
                {badgeMarkdown}
              </code>
              <InlineCopy text={badgeMarkdown} label="Copy Badge" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
