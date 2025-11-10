"use client";

import { UseFormReturn } from "react-hook-form";
import { INDIAN_STATES, MAJOR_INDIAN_CITIES, INDIA_CONNECTION_TYPES } from "@/lib/indian-states";
import { useState, useEffect } from "react";

interface Step3Props {
  form: UseFormReturn<any>;
  onNext: () => void;
  onBack: () => void;
}

export function Step3LocationConnection({ form, onNext, onBack }: Step3Props) {
  const [cityInput, setCityInput] = useState("");
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  const locationCity = form.watch("location_city");

  useEffect(() => {
    if (cityInput && cityInput.length > 1) {
      const filtered = MAJOR_INDIAN_CITIES.filter(
        city => city.toLowerCase().includes(cityInput.toLowerCase())
      ).slice(0, 5);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [cityInput]);

  const handleNext = () => {
    const errors = form.formState.errors;
    if (errors.location_city || errors.location_indian_state || errors.looking_for_contributors) {
      alert("Please fill in all required fields correctly");
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-normal text-gray-900 dark:text-gray-100 mb-2">
          Location & India Connection
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Tell us about your project's connection to India
        </p>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          City <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            {...form.register("location_city")}
            onChange={(e) => {
              form.setValue("location_city", e.target.value);
              setCityInput(e.target.value);
            }}
            placeholder="Bangalore"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {filteredCities.length > 0 && !MAJOR_INDIAN_CITIES.includes(locationCity) && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
              {filteredCities.map(city => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    form.setValue("location_city", city);
                    setCityInput("");
                    setFilteredCities([]);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 first:rounded-t-lg last:rounded-b-lg"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
        {form.formState.errors.location_city && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.location_city.message as string}
          </p>
        )}
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          State / Union Territory <span className="text-red-500">*</span>
        </label>
        <select
          {...form.register("location_indian_state")}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[48px]"
        >
          <option value="">Select a state</option>
          {INDIAN_STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {form.formState.errors.location_indian_state && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-1">
            {form.formState.errors.location_indian_state.message as string}
          </p>
        )}
      </div>

      {/* India Connection Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          India Connection Type <span className="text-xs text-gray-500">(Optional)</span>
        </label>
        <div className="space-y-3">
          {INDIA_CONNECTION_TYPES.map((type) => (
            <label
              key={type.value}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                {...form.register("india_connection")}
                value={type.value}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{type.label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* India Connection Details */}
      {form.watch("india_connection") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Connection Details <span className="text-xs text-gray-500">(Optional, max 500 characters)</span>
          </label>
          <textarea
            {...form.register("india_connection_details")}
            placeholder="Briefly describe your project's connection to India..."
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {form.watch("india_connection_details")?.length || 0} / 500 characters
          </p>
        </div>
      )}

      {/* Looking for Contributors */}
      <div>
        <label className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <input
            type="checkbox"
            {...form.register("looking_for_contributors")}
            className="mt-1"
          />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">
              Looking for Contributors
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Check this if your project is actively seeking new contributors
            </p>
          </div>
        </label>
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
