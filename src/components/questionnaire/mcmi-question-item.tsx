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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.15 }}
      className={cn(
        "rounded-xl border bg-card p-3 transition-colors",
        value !== null ? "border-violet-300/60 dark:border-violet-700/50" : "border-border"
      )}
    >
      <div className="flex items-center gap-3">
        {/* Question number */}
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-100 text-[11px] font-bold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
          {index + 1}
        </span>

        {/* Question text */}
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
                      ? "border-violet-500 bg-violet-500 text-white"
                      : "border-gray-500 bg-gray-500 text-white"
                    : "border-border bg-background hover:border-violet-300 dark:hover:border-violet-700"
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
