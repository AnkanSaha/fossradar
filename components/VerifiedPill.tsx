import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerifiedPillProps {
  verified: boolean;
  className?: string;
}

export function VerifiedPill({ verified, className }: VerifiedPillProps) {
  if (!verified) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold",
        "bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/40 dark:to-green-900/40",
        "text-blue-700 dark:text-blue-300",
        "border-2 border-blue-200 dark:border-blue-700/50",
        "shadow-sm",
        className
      )}
      title="Verified by fossradar"
    >
      <CheckCircle2 className="h-4 w-4 fill-blue-500 dark:fill-blue-400 text-white" />
      Verified
    </span>
  );
}
