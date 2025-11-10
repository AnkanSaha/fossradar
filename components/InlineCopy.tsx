"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InlineCopyProps {
  text: string;
  label?: string;
}

export function InlineCopy({ text, label = "Copy" }: InlineCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
        "border border-gray-200 dark:border-gray-700",
        "bg-white dark:bg-gray-900",
        "text-gray-700 dark:text-gray-300",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        copied && "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
      )}
      aria-label={copied ? "Copied" : label}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-green-600 dark:text-green-400">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">{label}</span>
        </>
      )}
    </button>
  );
}
