"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Loader2, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";

interface Step1Props {
  form: UseFormReturn<any>;
  onNext: () => void;
}

export function Step1RepositoryDetails({ form, onNext }: Step1Props) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);

  const repoUrl = form.watch("repo");

  const handleValidateRepo = async () => {
    if (!repoUrl) return;

    setIsValidating(true);
    setValidationResult(null);

    try {
      // First, check if repo already exists
      const duplicateResponse = await fetch(
        `/api/check-duplicate?repoUrl=${encodeURIComponent(repoUrl)}`
      );
      const duplicateData = await duplicateResponse.json();

      if (duplicateData.exists) {
        setValidationResult({
          error: `This repository is already listed on FOSSRadar as "${duplicateData.project.name}"`,
          isDuplicate: true,
          existingProject: duplicateData.project,
        });
        setIsValidating(false);
        return;
      }

      // Then validate the repo
      const response = await fetch(
        `/api/validate-repo?repoUrl=${encodeURIComponent(repoUrl)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setValidationResult({ error: data.error });
        return;
      }

      setValidationResult(data);

      // Auto-fill form fields with fetched data
      if (data.metadata) {
        if (data.metadata.description) {
          form.setValue("short_desc", data.metadata.description.substring(0, 160));
        }
        if (data.metadata.language) {
          form.setValue("primary_lang", data.metadata.language);
        }
        if (data.metadata.license && data.metadata.license !== "Unknown") {
          form.setValue("license", data.metadata.license);
        }
        if (data.metadata.homepage) {
          form.setValue("website", data.metadata.homepage);
        }
        // Store topics for use in Step 2
        if (data.metadata.topics && data.metadata.topics.length > 0) {
          form.setValue("_githubTopics", data.metadata.topics);
        }
      }
    } catch (error) {
      setValidationResult({ error: "Failed to validate repository" });
    } finally {
      setIsValidating(false);
    }
  };

  const handleNext = () => {
    if (!validationResult || validationResult.error) {
      alert("Please validate the repository URL first");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2">
          Repository Details
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your GitHub repository URL. We'll fetch project details automatically.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          GitHub Repository URL <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            {...form.register("repo")}
            placeholder="https://github.com/username/project"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleValidateRepo}
            disabled={!repoUrl || isValidating}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isValidating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Validating...
              </>
            ) : (
              "Validate"
            )}
          </button>
        </div>
        {form.formState.errors.repo && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.repo.message as string}
          </p>
        )}
      </div>

      {validationResult && (
        <div
          className={`p-4 rounded-lg border ${
            validationResult.error
              ? validationResult.isDuplicate
                ? "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800"
                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
          }`}
        >
          {validationResult.error ? (
            <div className="flex items-start gap-3">
              <AlertCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                validationResult.isDuplicate
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-red-600 dark:text-red-400"
              }`} />
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  validationResult.isDuplicate
                    ? "text-orange-900 dark:text-orange-100"
                    : "text-red-900 dark:text-red-100"
                }`}>
                  {validationResult.isDuplicate ? "Project Already Exists" : "Validation Failed"}
                </p>
                <p className={`text-sm mt-1 ${
                  validationResult.isDuplicate
                    ? "text-orange-700 dark:text-orange-300"
                    : "text-red-700 dark:text-red-300"
                }`}>
                  {validationResult.error}
                </p>
                {validationResult.isDuplicate && validationResult.existingProject && (
                  <a
                    href={`/projects/${validationResult.existingProject.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium transition-colors"
                  >
                    View Existing Project
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-900 dark:text-green-100">
                    Repository Validated Successfully!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    {validationResult.metadata.stars} stars •{" "}
                    {validationResult.metadata.language || "Unknown language"} •{" "}
                    {validationResult.metadata.license}
                  </p>
                </div>
              </div>

              {!validationResult.hasFossradarTopic && (
                <div className="pl-8 p-3 rounded bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Note:</strong> This repository doesn't have the{" "}
                    <code className="px-1 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900">
                      fossradar
                    </code>{" "}
                    topic yet. Don't forget to add it after submitting!
                  </p>
                </div>
              )}

              {validationResult.metadata.archived && (
                <div className="pl-8 p-3 rounded bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <p className="text-sm text-orange-800 dark:text-orange-200">
                    <strong>Warning:</strong> This repository is archived. Archived
                    projects may not be accepted.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={handleNext}
          disabled={!validationResult || !!validationResult.error}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
