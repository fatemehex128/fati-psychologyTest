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

const FACET_LABELS: Record<string, string> = {
  N1: "اضطراب", N2: "خشم و کینه", N3: "افسردگی", N4: "خودآگاهی", N5: "بی‌اختیاری", N6: "آسیب‌پذیری",
  E1: "صمیمیت", E2: "جامعه‌پذیری", E3: "جسارت", E4: "فعالیت", E5: "جستجوی هیجان", E6: "خوش‌بینی",
  O1: "تخیل", O2: "زیبایی‌شناسی", O3: "احساسات", O4: "فعالیت‌ها", O5: "ایده‌ها", O6: "ارزش‌ها",
  A1: "اعتماد", A2: "صداقت", A3: "نوع‌دوستی", A4: "همکاری", A5: "تواضع", A6: "همدلی",
  C1: "صلاحیت", C2: "نظم", C3: "احساس وظیفه", C4: "موفقیت‌طلبی", C5: "خودکارآمدی", C6: "احتیاط",
};

const FACTOR_NAMES: Record<string, { fa: string; color: string }> = {
  neuroticism: { fa: "روان‌رنجوری", color: "rose" },
  extraversion: { fa: "برون‌گرایی", color: "amber" },
  openness: { fa: "گشودگی", color: "violet" },
  agreeableness: { fa: "سازگاری", color: "emerald" },
  conscientiousness: { fa: "وظیفه‌شناسی", color: "sky" },
};

export function NeoQuestionItem({
  question,
  index,
  value,
  onAnswer,
  likertOptions,
}: NeoQuestionItemProps) {
  const factorInfo = FACTOR_NAMES[question.factor] || { fa: question.factor, color: "gray" };
  const facetLabel = FACET_LABELS[question.facet] || question.facet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.01, 0.1) }}
      className={cn(
        "group relative rounded-2xl border bg-card p-4 transition-all duration-300",
        "hover:shadow-md hover:border-emerald-400/40",
        value !== null ? "border-emerald-500/40 bg-emerald-500/[0.03]" : "border-border"
      )}
    >
      {/* header */}
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            {factorInfo.fa}
          </span>
          <span className="text-[10px] text-muted-foreground">• {facetLabel}</span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          {String(index + 1).padStart(3, "0")} / {String(240).padStart(3, "0")}
        </span>
      </div>

      {/* question text */}
      <p className="mb-3 text-[14px] leading-6 text-foreground">{question.text}</p>

      {/* Likert options (5-point: 0-4) */}
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
                "flex flex-col items-center justify-center gap-1 rounded-lg py-2 px-1",
                "border text-center transition-all duration-150",
                "focus:outline-none focus:ring-2 focus:ring-emerald-400/40",
                "hover:-translate-y-0.5 hover:shadow-sm",
                isSelected
                  ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                  : "border-border bg-background hover:border-emerald-400/40 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20"
              )}
            >
              <span
                className={cn(
                  "text-xs font-bold leading-none",
                  isSelected ? "text-white" : "text-emerald-600 dark:text-emerald-400"
                )}
              >
                {opt.value}
              </span>
              <span
                className={cn(
                  "text-[9px] leading-tight sm:text-[10px]",
                  isSelected ? "text-white/90" : "text-muted-foreground"
                )}
              >
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-1.5 flex items-center justify-between text-[9px] text-muted-foreground">
        <span>کاملاً مخالفم</span>
        <span>کاملاً موافقم</span>
      </div>
    </motion.div>
  );
}
