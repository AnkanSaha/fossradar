"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSubmissionSchema } from "@/lib/schema";
import { FormStepIndicator } from "./FormStepIndicator";
import { Step0Auth } from "./submission-steps/Step0Auth";
import { Step1SelectRepo } from "./submission-steps/Step1SelectRepo";
import { Step1RepositoryDetails } from "./submission-steps/Step1RepositoryDetails";
import { Step2ProjectInfo } from "./submission-steps/Step2ProjectInfo";
import { Step3LocationConnection } from "./submission-steps/Step3LocationConnection";
import { Step4OptionalDetails } from "./submission-steps/Step4OptionalDetails";
import { Step5ReviewSubmit } from "./submission-steps/Step5ReviewSubmit";

const STEPS = [
  { title: "Sign In", description: "GitHub authentication" },
  { title: "Select Repo", description: "Choose your repository" },
  { title: "Validate", description: "Fetch repository details" },
  { title: "Project Info", description: "Name, description, tags" },
  { title: "Location", description: "City, state, connection" },
  { title: "Optional", description: "Logo, website, notes" },
  { title: "Review", description: "Review & submit" },
];

const STORAGE_KEY = "fossradar_submission_draft";

export function ProjectSubmissionForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(ProjectSubmissionSchema),
    mode: "onChange",
    defaultValues: {
      repo: "",
      name: "",
      slug: "",
      short_desc: "",
      website: "",
      primary_lang: "",
      license: "",
      tags: [],
      looking_for_contributors: false,
      location_city: "",
      location_indian_state: "",
      india_connection: undefined,
      india_connection_details: "",
      submitter_notes: "",
      logo: undefined,
    },
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const draft = JSON.parse(stored);
        Object.keys(draft).forEach((key) => {
          form.setValue(key as any, draft[key]);
        });
      }
    } catch (error) {
      console.error("Failed to load draft:", error);
    }
  }, [form]);

  // Save draft to localStorage whenever form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
      } catch (error) {
        console.error("Failed to save draft:", error);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Clear draft after successful submission
  const clearDraft = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear draft:", error);
    }
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <FormStepIndicator
        currentStep={currentStep + 1}
        totalSteps={STEPS.length}
        steps={STEPS}
      />

      <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
        <form>
          {currentStep === 0 && (
            <Step0Auth onNext={nextStep} />
          )}
          {currentStep === 1 && (
            <Step1SelectRepo form={form} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 2 && (
            <Step1RepositoryDetails form={form} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 3 && (
            <Step2ProjectInfo form={form} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 4 && (
            <Step3LocationConnection form={form} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 5 && (
            <Step4OptionalDetails form={form} onNext={nextStep} onBack={prevStep} />
          )}
          {currentStep === 6 && (
            <Step5ReviewSubmit form={form} onBack={prevStep} />
          )}
        </form>
      </div>

      {/* Draft indicator */}
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
        Your progress is automatically saved in your browser
      </p>
    </div>
  );
}
