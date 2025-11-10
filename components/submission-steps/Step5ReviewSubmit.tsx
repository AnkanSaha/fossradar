"use client";

import { UseFormReturn } from "react-hook-form";
import { useState, useMemo } from "react";
import { useSession, signIn } from "next-auth/react";
import { generateTOML } from "@/lib/toml-generator";
import { Loader2, CheckCircle, FileText, Github } from "lucide-react";
import { useRouter } from "next/navigation";

interface Step5Props {
  form: UseFormReturn<any>;
  onBack: () => void;
}

export function Step5ReviewSubmit({ form, onBack }: Step5Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formData = form.watch();

  // Generate TOML preview
  const tomlPreview = useMemo(() => {
    try {
      // Add added_at to form data
      const today = new Date().toISOString().split("T")[0];
      const dataWithDate = { ...formData, added_at: today };
      return generateTOML(dataWithDate);
    } catch (err) {
      return "// Error generating TOML preview";
    }
  }, [formData]);

  const handleSubmit = async () => {
    if (!session) {
      // Redirect to sign in
      await signIn("github", {
        callbackUrl: window.location.href,
      });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Add today's date
      const today = new Date().toISOString().split("T")[0];
      const submissionData = {
        ...formData,
        added_at: today,
      };

      const response = await fetch("/api/submit-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.requiresAuth) {
          await signIn("github", {
            callbackUrl: window.location.href,
          });
          return;
        }
        throw new Error(data.error || "Failed to submit project");
      }

      // Redirect to success page with PR URL
      router.push(`/submit/success?pr=${encodeURIComponent(data.prUrl)}`);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to submit project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2">
          Review & Submit
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Review your project details and TOML file before submitting
        </p>
      </div>

      {/* Summary */}
      <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
          Project Summary
        </h3>
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Name:</dt>
            <dd className="text-gray-900 dark:text-gray-100 font-medium">{formData.name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Slug:</dt>
            <dd className="text-gray-900 dark:text-gray-100 font-mono text-xs">{formData.slug}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Repository:</dt>
            <dd className="text-blue-600 dark:text-blue-400 text-xs truncate max-w-xs">{formData.repo}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Location:</dt>
            <dd className="text-gray-900 dark:text-gray-100">{formData.location_city}, {formData.location_indian_state}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-600 dark:text-gray-400">Tags:</dt>
            <dd className="text-gray-900 dark:text-gray-100">{formData.tags?.length || 0} tags</dd>
          </div>
          {formData.logo && (
            <div className="flex justify-between">
              <dt className="text-gray-600 dark:text-gray-400">Logo:</dt>
              <dd className="text-green-600 dark:text-green-400">✓ Included</dd>
            </div>
          )}
        </dl>
      </div>

      {/* TOML Preview */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            TOML File Preview
          </h3>
        </div>
        <div className="p-4 rounded-lg bg-gray-900 dark:bg-gray-950 overflow-x-auto">
          <pre className="text-sm text-gray-100 font-mono">
            <code>{tomlPreview}</code>
          </pre>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This file will be created at <code className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-800">data/projects/{formData.slug}.toml</code>
        </p>
      </div>

      {/* Auth Status */}
      {status === "loading" ? (
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Checking authentication status...
          </p>
        </div>
      ) : !session ? (
        <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
            You'll need to sign in with GitHub to submit your project
          </p>
          <button
            type="button"
            onClick={() => signIn("github", { callbackUrl: window.location.href })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-sm font-medium transition-colors"
          >
            <Github className="h-4 w-4" />
            Sign in with GitHub
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200">
              Signed in as <span className="font-medium">@{session.user?.name}</span>
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating Pull Request...
            </>
          ) : session ? (
            <>
              <Github className="h-5 w-5" />
              Submit Project
            </>
          ) : (
            "Sign in & Submit"
          )}
        </button>
      </div>
    </div>
  );
}
