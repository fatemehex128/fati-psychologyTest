"use client";

import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  answered: number;
  total: number;
  color?: "rose" | "emerald" | "violet";
}

export function ProgressBar({ answered, total, color = "emerald" }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  const colorClasses = {
    rose: {
      indicator: "bg-rose-500",
      track: "bg-rose-500/15",
      text: "text-rose-600 dark:text-rose-400",
      percent: "text-rose-600 dark:text-rose-400",
    },
    emerald: {
      indicator: "bg-emerald-500",
      track: "bg-emerald-500/15",
      text: "text-emerald-600 dark:text-emerald-400",
      percent: "text-emerald-600 dark:text-emerald-400",
    },
    violet: {
      indicator: "bg-violet-500",
      track: "bg-violet-500/15",
      text: "text-violet-600 dark:text-violet-400",
      percent: "text-violet-600 dark:text-violet-400",
    },
  }[color];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-2">
      <div className="flex items-center gap-3">
        <span className={`text-xs tabular-nums shrink-0 ${colorClasses.text}`}>
          {answered}/{total}
        </span>
        <Progress
          value={percentage}
          className={`h-1.5 flex-1 border-none ${colorClasses.track}`}
          indicatorClassName={`${colorClasses.indicator} transition-all duration-300`}
        />
        <span className={`text-xs font-medium tabular-nums shrink-0 ${colorClasses.percent}`}>
          {percentage}٪
        </span>
      </div>
    </div>
  );
}
