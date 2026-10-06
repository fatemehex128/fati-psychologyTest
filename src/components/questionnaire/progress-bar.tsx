"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  answered: number;
  total: number;
}

export function ProgressBar({ answered, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-2">
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground tabular-nums shrink-0">
          {answered}/{total}
        </span>
        <Progress
          value={percentage}
          className="h-1.5 flex-1 [&>div]:bg-primary [&>div]:transition-all [&>div]:duration-300"
        />
        <span className="text-xs font-medium text-primary tabular-nums shrink-0">
          {percentage}٪
        </span>
      </div>
    </div>
  );
}
