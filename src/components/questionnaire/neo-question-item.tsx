"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeoQuestionItemProps {
  question: {
    id: number;
    text: string;
    factor: string;
    facet: string;
  };
  index: number;
  value: number | null;
  onAnswer: (questionId: number, value: number) => void;
  likertOptions: readonly { value: number; label: string; description: string }[];
}

export function NeoQuestionItem({
  question,
  index,
  value,
  onAnswer,
  likertOptions,
}: NeoQuestionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-xl border bg-card p-4 transition-colors",
        value !== null ? "border-emerald-300/60 dark:border-emerald-700/50" : "border-border"
      )}
    >
      {/* Question number + text */}
      <div className="mb-3 flex items-start gap-2.5">
        <span className="mt-0.5 text-xs font-medium text-emerald-500 shrink-0">
          {String(index + 1).padStart(3, "0")}
        </span>
        <p className="flex-1 text-sm leading-6 text-foreground">
          {question.text}
        </p>
      </div>

      {/* Likert options (5-point: 0-4) - labels only, no numbers */}
      <div className="grid grid-cols-5 gap-1">
        {likertOptions.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onAnswer(question.id, opt.value)}
              title={opt.description}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-lg py-2 px-1",
                "border text-center transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-emerald-400/40",
                "hover:-translate-y-0.5",
                isSelected
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-border bg-background hover:border-emerald-300 dark:hover:border-emerald-700"
              )}
            >
              <span className={cn(
                "text-[10px] leading-tight sm:text-[11px] font-medium",
                isSelected ? "text-white" : "text-emerald-600 dark:text-emerald-400"
              )}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Likert hint */}
      <div className="mt-1.5 flex items-center justify-between text-[9px] text-muted-foreground">
        <span>کاملاً مخالفم</span>
        <span>کاملاً موافقم</span>
      </div>
    </motion.div>
  );
}
