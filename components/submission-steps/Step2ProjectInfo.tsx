"use client";

import { UseFormReturn } from "react-hook-form";
import { generateSlug } from "@/lib/slug-generator";
import { useEffect, useState } from "react";
import categoriesData from "@/data/categories.json";

interface Step2Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

const COMMON_TAGS = [
  "web", "frontend", "backend", "fullstack", "mobile", "api", "cli",
  "devtools", "testing", "automation", "ml", "ai", "data", "analytics",
  "security", "devops", "cloud", "docker", "kubernetes", "blockchain",
  "typescript", "javascript", "python", "go", "rust", "java",
  "react", "nextjs", "nodejs", "vue", "angular"
];

const COMMON_LICENSES = [
  "MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause", "ISC", "MPL-2.0",
  "AGPL-3.0", "LGPL-3.0", "GPL-2.0", "BSD-2-Clause", "Unlicense"
];

const CATEGORIES = Object.entries(categoriesData.categories).map(([key, value]) => ({
  key,
  label: value.label,
  description: value.description
}));

export function Step2ProjectInfo({ form, onNext, onBack }: Step2Props) {
  const [tagInput, setTagInput] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

  const projectName = form.watch("name");
  const selectedTags = form.watch("tags") || [];
  const githubTopics = form.watch("_githubTopics") || [];

  // Auto-suggest tags from GitHub topics
  useEffect(() => {
    if (githubTopics.length > 0) {
      const validSuggestions = githubTopics
        .filter((topic: string) =>
          COMMON_TAGS.includes(topic.toLowerCase()) &&
          !selectedTags.includes(topic.toLowerCase())
        )
        .map((topic: string) => topic.toLowerCase())
        .slice(0, 5);
      setSuggestedTags(validSuggestions);
    }
  }, [githubTopics, selectedTags]);

  // Auto-generate slug from project name
  useEffect(() => {
    if (projectName && !form.getValues("slug")) {
      const slug = generateSlug(projectName);
      form.setValue("slug", slug);
    }
  }, [projectName, form]);

  // Filter tags for autocomplete
  useEffect(() => {
    if (tagInput) {
      const filtered = COMMON_TAGS.filter(
        tag => tag.toLowerCase().includes(tagInput.toLowerCase()) &&
        !selectedTags.includes(tag)
      ).slice(0, 5);
      setFilteredTags(filtered);
    } else {
      setFilteredTags([]);
    }
  }, [tagInput, selectedTags]);

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 10) {
      form.setValue("tags", [...selectedTags, tag]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    form.setValue("tags", selectedTags.filter((t: string) => t !== tag));
  };

  const handleNext = () => {
    const errors = form.formState.errors;
    if (errors.name || errors.slug || errors.short_desc || errors.category || errors.tags || errors.primary_lang || errors.license) {
      alert("Please fill in all required fields correctly");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2">
          Project Information
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Tell us about your project
        </p>
      </div>

      {/* Project Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...form.register("name")}
          placeholder="My Awesome Project"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.name.message as string}
          </p>
        )}
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Slug <span className="text-red-500">*</span>
          <span className="text-xs text-gray-500 ml-2">(URL-friendly identifier)</span>
        </label>
        <input
          type="text"
          {...form.register("slug")}
          placeholder="my-awesome-project"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {form.formState.errors.slug && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.slug.message as string}
          </p>
        )}
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Short Description <span className="text-red-500">*</span>
          <span className="text-xs text-gray-500 ml-2">(10-160 characters)</span>
        </label>
        <textarea
          {...form.register("short_desc")}
          placeholder="A brief description of what your project does"
          rows={3}
          maxLength={160}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {form.watch("short_desc")?.length || 0} / 160 characters
        </p>
        {form.formState.errors.short_desc && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.short_desc.message as string}
          </p>
        )}
      </div>

      {/* Primary Language */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Primary Language <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...form.register("primary_lang")}
          placeholder="TypeScript"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {form.formState.errors.primary_lang && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.primary_lang.message as string}
          </p>
        )}
      </div>

      {/* License */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          License <span className="text-red-500">*</span>
        </label>
        <select
          {...form.register("license")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[48px]"
        >
          <option value="">Select a license</option>
          {COMMON_LICENSES.map(license => (
            <option key={license} value={license}>{license}</option>
          ))}
        </select>
        {form.formState.errors.license && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.license.message as string}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category <span className="text-red-500">*</span>
          <span className="text-xs text-gray-500 ml-2">(Select one)</span>
        </label>
        <select
          {...form.register("category")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[48px]"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map(cat => (
            <option key={cat.key} value={cat.key}>
              {cat.label} - {cat.description}
            </option>
          ))}
        </select>
        {form.formState.errors.category && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.category.message as string}
          </p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags <span className="text-red-500">*</span>
          <span className="text-xs text-gray-500 ml-2">(1-10 tags)</span>
        </label>

        {/* Suggested tags from GitHub */}
        {suggestedTags.length > 0 && (
          <div className="mb-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-2">
              Suggested from GitHub topics:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="relative">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && tagInput) {
                e.preventDefault();
                addTag(tagInput);
              }
            }}
            placeholder="Type to search tags..."
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {filteredTags.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
              {filteredTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 first:rounded-t-lg last:rounded-b-lg"
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {selectedTags.map((tag: string) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {form.formState.errors.tags && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.tags.message as string}
          </p>
        )}
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 min-h-[48px]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors min-h-[48px]"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
