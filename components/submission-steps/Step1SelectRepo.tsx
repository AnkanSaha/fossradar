"use client";

import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Search, ExternalLink, Star, GitFork, AlertCircle } from "lucide-react";

interface Repo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  private: boolean;
}

interface Step1Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

export function Step1SelectRepo({ form, onNext, onBack }: Step1Props) {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [manualMode, setManualMode] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<string>("");

  // Fetch user's repositories
  useEffect(() => {
    const fetchRepos = async () => {
      if (!session?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/user-repos", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRepos(data.repos || []);
        }
      } catch (error) {
        console.error("Failed to fetch repositories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [session]);

  const filteredRepos = repos.filter(
    (repo) =>
      !repo.private &&
      (repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectRepo = (repoUrl: string) => {
    setSelectedRepo(repoUrl);
    form.setValue("repo", repoUrl, { shouldValidate: true });
  };

  const handleManualSubmit = () => {
    if (manualUrl && manualUrl.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/)) {
      form.setValue("repo", manualUrl, { shouldValidate: true });
      setSelectedRepo(manualUrl);
    }
  };

  const handleNext = () => {
    const repoValue = form.getValues("repo");
    if (repoValue && repoValue.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/)) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2">
          Select Repository
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose a repository from your GitHub account or enter a repository URL manually
        </p>
      </div>

      {/* Toggle between list and manual mode */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setManualMode(false)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !manualMode
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          My Repositories
        </button>
        <button
          type="button"
          onClick={() => setManualMode(true)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            manualMode
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          Manual URL Entry
        </button>
      </div>

      {manualMode ? (
        /* Manual URL Entry */
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub Repository URL
            </label>
            <input
              type="url"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              onBlur={handleManualSubmit}
              placeholder="https://github.com/username/repository"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Enter the full GitHub repository URL (e.g., https://github.com/user/repo)
            </p>
          </div>

          {manualUrl && !manualUrl.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/) && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800 dark:text-red-200">
                  Please enter a valid GitHub repository URL
                </p>
              </div>
            </div>
          )}
        </div>
      ) : loading ? (
        /* Loading State */
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
        </div>
      ) : repos.length === 0 ? (
        /* No Repositories Found */
        <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No public repositories found in your account.
          </p>
          <button
            type="button"
            onClick={() => setManualMode(true)}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Enter repository URL manually
          </button>
        </div>
      ) : (
        /* Repository List */
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your repositories..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Repository Grid */}
          <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
            {filteredRepos.map((repo) => (
              <button
                key={repo.full_name}
                type="button"
                onClick={() => handleSelectRepo(repo.html_url)}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  selectedRepo === repo.html_url
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {repo.name}
                    </h3>
                    {repo.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>

          {filteredRepos.length === 0 && searchTerm && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-8">
              No repositories found matching "{searchTerm}"
            </p>
          )}
        </div>
      )}

      {/* Selected Repository Display */}
      {selectedRepo && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>Selected:</strong> {selectedRepo}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedRepo}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
