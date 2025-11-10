"use client";

import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface Step4Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

export function Step4OptionalDetails({ form, onNext, onBack }: Step4Props) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoError(null);

    // Validate file type
    if (!['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'].includes(file.type)) {
      setLogoError("Please upload a PNG, JPG, SVG, or WebP image");
      return;
    }

    // Validate file size (200KB max)
    if (file.size > 200 * 1024) {
      setLogoError("Logo must be under 200KB. Please compress your image.");
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const base64Content = base64.split(',')[1]; // Remove data:image/...;base64, prefix

      setLogoPreview(base64);

      // Store in form
      form.setValue("logoFile", {
        content: base64Content,
        filename: file.name,
      });

      // Set logo path in form data
      const slug = form.getValues("slug");
      if (slug) {
        form.setValue("logo", `/logos/${slug}/${file.name}`);
      }
    };

    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setLogoError(null);
    form.setValue("logoFile", undefined);
    form.setValue("logo", undefined);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2">
          Optional Details
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Add additional information about your project
        </p>
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Website URL <span className="text-xs text-gray-500">(Optional)</span>
        </label>
        <input
          type="url"
          {...form.register("website")}
          placeholder="https://your-project.com"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {form.formState.errors.website && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.website.message as string}
          </p>
        )}
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Project Logo <span className="text-xs text-gray-500">(Optional, max 200KB)</span>
        </label>

        {!logoPreview ? (
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="h-10 w-10 text-gray-400 mb-3" />
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                PNG, JPG, SVG, or WebP (max 200KB)
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Recommended size: 200x200px
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml,image/webp"
              onChange={handleLogoUpload}
            />
          </label>
        ) : (
          <div className="relative w-48 h-48 border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <img
              src={logoPreview}
              alt="Logo preview"
              className="w-full h-full object-contain bg-gray-100 dark:bg-gray-800"
            />
            <button
              type="button"
              onClick={removeLogo}
              className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {logoError && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">
            {logoError}
          </p>
        )}

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          The logo will be included in your pull request and displayed on your project page after approval.
        </p>
      </div>

      {/* Submitter Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Additional Notes <span className="text-xs text-gray-500">(Optional, max 500 characters)</span>
        </label>
        <textarea
          {...form.register("submitter_notes")}
          placeholder="Any additional information for the maintainers..."
          rows={4}
          maxLength={500}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {form.watch("submitter_notes")?.length || 0} / 500 characters
        </p>
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
          onClick={onNext}
          className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors min-h-[48px]"
        >
          Review & Submit
        </button>
      </div>
    </div>
  );
}
