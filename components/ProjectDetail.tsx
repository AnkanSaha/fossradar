import { Project } from "@/lib/schema";
import { VerifiedPill } from "./VerifiedPill";
import { InlineCopy } from "./InlineCopy";
import { ContributorAvatars } from "./ContributorAvatars";
import { InstallationGuide } from "./InstallationGuide";
import { DocumentationLinks } from "./DocumentationLinks";
import { SimilarProjects } from "./SimilarProjects";
import { SocialShare } from "./SocialShare";
import { GitHubStarButton } from "./GitHubStarButton";
import { ExternalLink, Github, Star, GitBranch, Calendar, Scale, GitFork, Eye, AlertCircle, Clock, Code2, FileText } from "lucide-react";
import { formatNumber, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

interface ProjectCache {
  contributors: Array<{
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  }>;
  installation?: {
    type: string;
    command: string;
  };
  documentation: {
    docs_url?: string;
    changelog_url?: string;
  };
  stats?: {
    forks: number;
    watchers: number;
    open_issues: number;
    size: number;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
  };
  languages?: Record<string, number>;
}

interface ProjectDetailProps {
  project: Project;
  cache?: ProjectCache;
  similarProjects?: Project[];
}

export function ProjectDetail({ project, cache, similarProjects }: ProjectDetailProps) {
  const badgeMarkdown = `[![fossradar.in: Verified](https://img.shields.io/badge/fossradar.in-Verified-brightgreen?style=for-the-badge)](https://fossradar.in/projects/${project.slug})`;
  const projectUrl = `https://fossradar.in/projects/${project.slug}`;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2 tracking-wide break-words">
              {project.name}
            </h1>
            {project.primary_lang && (
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
                {project.primary_lang}
              </p>
            )}
          </div>
          <div className="flex-shrink-0">
            <VerifiedPill verified={project.verified || false} />
          </div>
        </div>

        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {project.short_desc}
        </p>

        {/* Star on GitHub - Prominent CTA */}
        <GitHubStarButton repoUrl={project.repo} projectName={project.name} />

        {/* Quick Links */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors text-sm sm:text-base"
          >
            <Github className="h-4 w-4" />
            <span className="hidden xs:inline">View on GitHub</span>
            <span className="xs:hidden">GitHub</span>
          </a>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white transition-colors text-sm sm:text-base"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden xs:inline">Visit Website</span>
              <span className="xs:hidden">Website</span>
            </a>
          )}
        </div>

        {/* Social Share */}
        <SocialShare
          url={projectUrl}
          title={project.name}
          description={project.short_desc}
        />
      </div>

      {/* Stats */}
      <div className="mb-8">
        <h2 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider mb-3">
          Repository Stats
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {/* Stars */}
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
              <Star className="h-3.5 w-3.5" />
              Stars
            </div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {formatNumber(project.stars || 0)}
            </div>
          </div>

          {cache?.stats && (
            <>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <GitFork className="h-3.5 w-3.5" />
                  Forks
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(cache.stats.forks)}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <Eye className="h-3.5 w-3.5" />
                  Watchers
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(cache.stats.watchers)}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Issues
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {formatNumber(cache.stats.open_issues)}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <GitBranch className="h-3.5 w-3.5" />
                  Good First
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {project.good_first_issues || 0}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  Updated
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {formatRelativeTime(cache.stats.pushed_at)}
                </div>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <Scale className="h-3.5 w-3.5" />
                  License
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {project.license}
                </div>
              </div>
            </>
          )}

          {!cache?.stats && (
            <>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <GitBranch className="h-3.5 w-3.5" />
                  Good First
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {project.good_first_issues || 0}
                </div>
              </div>
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-1">
                  <Scale className="h-3.5 w-3.5" />
                  License
                </div>
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {project.license}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Contributors */}
      {cache?.contributors && cache.contributors.length > 0 && (
        <ContributorAvatars contributors={cache.contributors} />
      )}

      {/* Installation Guide */}
      <InstallationGuide installation={cache?.installation} repoUrl={project.repo} />

      {/* Documentation Links */}
      <DocumentationLinks repoUrl={project.repo} documentation={cache?.documentation} />

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

      {/* Language Breakdown */}
      {cache?.languages && Object.keys(cache.languages).length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-heading font-normal text-gray-700 dark:text-gray-300 tracking-wider mb-3">
            Language Breakdown
          </h2>
          <div className="space-y-3">
            {(() => {
              const total = Object.values(cache.languages).reduce((sum, bytes) => sum + bytes, 0);
              const sorted = Object.entries(cache.languages).sort((a, b) => b[1] - a[1]);

              return sorted.map(([language, bytes]) => {
                const percentage = ((bytes / total) * 100).toFixed(1);
                return (
                  <div key={language}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Code2 className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {language}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      )}

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

      {/* Similar Projects */}
      {similarProjects && similarProjects.length > 0 && (
        <SimilarProjects projects={similarProjects} />
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
