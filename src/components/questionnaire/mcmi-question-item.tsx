"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface McmiQuestionItemProps {
  question: {
    id: number;
    text: string;
  };
  index: number;
  value: number | null;
  onAnswer: (questionId: number, value: number) => void;
  likertOptions: readonly { value: number; label: string; description: string }[];
}

export function McmiQuestionItem({
  question,
  index,
  value,
  onAnswer,
  likertOptions,
}: McmiQuestionItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.005, 0.05) }}
      className={cn(
        "group relative rounded-xl border bg-card p-3 transition-all duration-200",
        "hover:shadow-sm hover:border-violet-400/40",
        value !== null ? "border-violet-500/40 bg-violet-500/[0.03]" : "border-border"
      )}
    >
      <div className="flex items-start gap-3">
        {/* question number */}
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-100 text-[10px] font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
          {index + 1}
        </span>

        {/* question text */}
        <p className="flex-1 text-[13px] leading-6 text-foreground">{question.text}</p>

        {/* Yes/No buttons */}
        <div className="flex shrink-0 gap-1.5">
          {likertOptions.map((opt) => {
            const isSelected = value === opt.value;
            const isYes = opt.value === 1;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onAnswer(question.id, opt.value)}
                title={opt.description}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-violet-400/40",
                  "hover:-translate-y-0.5",
                  isSelected
                    ? isYes
                      ? "border-violet-500 bg-violet-500 text-white shadow-sm"
                      : "border-gray-500 bg-gray-500 text-white shadow-sm"
                    : "border-border bg-background hover:border-violet-400/40 hover:bg-violet-50/50 dark:hover:bg-violet-950/20"
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
