"use client";

import { cn } from "@/lib/utils";
import { NEED_CATEGORIES, type Question } from "@/lib/glasser-questions";
import { motion } from "framer-motion";

interface QuestionItemProps {
  question: Question;
  index: number;
  value: number | null;
  onAnswer: (questionId: number, value: number) => void;
  likertOptions: readonly { value: number; label: string; description: string }[];
}

export function QuestionItem({ question, index, value, onAnswer, likertOptions }: QuestionItemProps) {
  const category = NEED_CATEGORIES[question.category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-xl border bg-card p-4 transition-colors",
        value ? "border-rose-300/60 dark:border-rose-700/50" : "border-border"
      )}
    >
      {/* Question number + text */}
      <div className="mb-3 flex items-start gap-2.5">
        <span className="mt-0.5 text-xs font-medium text-rose-500 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="flex-1 text-sm leading-6 text-foreground">
          {question.text}
        </p>
      </div>

      {/* Likert scale */}
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
                "flex flex-col items-center justify-center gap-0.5 rounded-lg py-1.5 px-1",
                "border text-center transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-rose-400/40",
                "hover:-translate-y-0.5",
                isSelected
                  ? "border-rose-500 bg-rose-500 text-white"
                  : "border-border bg-background hover:border-rose-300 dark:hover:border-rose-700"
              )}
            >
              <span className={cn(
                "text-xs font-bold leading-none",
                isSelected ? "text-white" : "text-rose-600 dark:text-rose-400"
              )}>
                {opt.value}
              </span>
              <span className={cn(
                "text-[9px] leading-tight sm:text-[10px]",
                isSelected ? "text-white/90" : "text-muted-foreground"
              )}>
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
