import { BadgeCheck } from "lucide-react";
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
        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
        "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
        className
      )}
      title="Has wbfoss topic and verified badge"
    >
      <BadgeCheck className="h-3 w-3" />
      Verified
    </span>
  );
}
