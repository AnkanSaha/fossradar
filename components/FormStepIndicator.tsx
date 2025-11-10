interface FormStepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ title: string; description: string }>;
}

export function FormStepIndicator({
  currentStep,
  totalSteps,
  steps,
}: FormStepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isActive
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>
                <div className="mt-2 text-center hidden sm:block">
                  <p
                    className={`text-xs font-medium ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>

              {stepNumber < totalSteps && (
                <div
                  className={`h-0.5 flex-1 mx-2 transition-colors ${
                    stepNumber < currentStep
                      ? "bg-green-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center sm:hidden">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {steps[currentStep - 1]?.title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
}
