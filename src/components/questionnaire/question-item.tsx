"use client";

import { cn } from "@/lib/utils";
import { LIKERT_OPTIONS, NEED_CATEGORIES, type Question } from "@/lib/glasser-questions";
import { motion } from "framer-motion";

interface QuestionItemProps {
  question: Question;
  index: number;
  value: number | null;
  onAnswer: (questionId: number, value: number) => void;
}

export function QuestionItem({ question, index, value, onAnswer }: QuestionItemProps) {
  const category = NEED_CATEGORIES[question.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.2) }}
      className={cn(
        "group relative rounded-2xl border bg-card p-5 transition-all duration-300",
        "hover:shadow-md hover:border-primary/40",
        value ? "border-primary/40 bg-primary/[0.03]" : "border-border"
      )}
    >
      {/* category pill */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
            "bg-accent text-accent-foreground"
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full bg-primary")} />
          {category.fa}
        </span>
        <span className="text-[11px] font-mono text-muted-foreground">
          {String(index + 1).padStart(2, "0")} / ۳۵
        </span>
      </div>

      {/* question text */}
      <p className="mb-4 text-[15px] leading-7 text-foreground font-medium">
        {question.text}
      </p>

      {/* Likert scale */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {LIKERT_OPTIONS.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onAnswer(question.id, opt.value)}
              title={opt.description}
              aria-pressed={isSelected}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 rounded-xl py-2.5 px-1",
                "border text-center transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1",
                "hover:-translate-y-0.5 hover:shadow-sm",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-background hover:border-primary/40 hover:bg-accent/50"
              )}
            >
              <span
                className={cn(
                  "text-base font-bold leading-none",
                  isSelected ? "text-primary-foreground" : "text-primary"
                )}
              >
                {opt.value}
              </span>
              <span
                className={cn(
                  "text-[10px] leading-tight sm:text-[11px]",
                  isSelected ? "text-primary-foreground/90" : "text-muted-foreground"
                )}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Likert hint */}
      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>هیچ‌وقت</span>
        <span>همیشه</span>
      </div>
    </motion.div>
  );
}
