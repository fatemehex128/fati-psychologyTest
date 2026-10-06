"use client";

import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ProgressBarProps {
  answered: number;
  total: number;
}

export function ProgressBar({ answered, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((answered / total) * 100) : 0;

  return (
    <div className="sticky top-3 z-30 mx-auto w-full max-w-3xl px-4">
      <div className="rounded-2xl border border-primary/20 bg-card/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-baseline gap-2">
            <motion.span
              key={answered}
              initial={{ scale: 1.15, color: "var(--primary)" }}
              animate={{ scale: 1, color: "var(--foreground)" }}
              transition={{ duration: 0.3 }}
              className="text-lg font-bold tabular-nums"
            >
              {answered}
            </motion.span>
            <span className="text-sm text-muted-foreground">از {total} سؤال</span>
          </div>
          <div className="flex-1 mx-2">
            <Progress
              value={percentage}
              className="h-2.5 [&>div]:bg-gradient-to-l [&>div]:from-primary [&>div]:to-amber-400 [&>div]:transition-all [&>div]:duration-500"
            />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-primary tabular-nums">{percentage}</span>
            <span className="text-sm text-muted-foreground">٪</span>
          </div>
        </div>
      </div>
    </div>
  );
}
