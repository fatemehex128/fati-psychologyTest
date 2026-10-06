"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { TESTS, FORMSUBMIT_ENDPOINT, type TestId } from "@/lib/tests-config";
import { PsychologyIcon } from "@/components/psychology-icons";
import { PersonalInfoForm, type PersonalInfo } from "@/components/questionnaire/personal-info-form";
import { QuestionItem } from "@/components/questionnaire/question-item";
import { NeoQuestionItem } from "@/components/questionnaire/neo-question-item";
import { McmiQuestionItem } from "@/components/questionnaire/mcmi-question-item";
import { ProgressBar } from "@/components/questionnaire/progress-bar";
import { ThankYou } from "@/components/questionnaire/thank-you";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Send, Loader2 } from "lucide-react";

type Answers = Record<number, number>;

const EMPTY_PERSONAL: PersonalInfo = {
  fullName: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  education: "",
  occupation: "",
  city: "",
  date: "",
};

interface TestRunnerProps {
  testId: TestId;
  onBack: () => void;
}

export function TestRunner({ testId, onBack }: TestRunnerProps) {
  const test = TESTS[testId];
  const [personal, setPersonal] = useState<PersonalInfo>(EMPTY_PERSONAL);
  const [personalErrors, setPersonalErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({});
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const questionsSectionRef = useRef<HTMLDivElement>(null);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = test.questionCount;
  const progressPercentage = Math.round((answeredCount / totalQuestions) * 100);

  const handlePersonalChange = (field: keyof PersonalInfo, value: string) => {
    setPersonal((prev) => ({ ...prev, [field]: value }));
    setPersonalErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const validatePersonal = (): boolean => {
    const errors: Partial<Record<keyof PersonalInfo, string>> = {};
    if (!personal.fullName.trim()) errors.fullName = "نام و نام خانوادگی الزامی است";
    if (!personal.age.trim()) errors.age = "سن الزامی است";
    else if (Number(personal.age) < 10 || Number(personal.age) > 100)
      errors.age = "سن باید بین ۱۰ تا ۱۰۰ سال باشد";
    if (!personal.gender) errors.gender = "لطفاً جنسیت را انتخاب کنید";
    if (personal.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personal.email))
      errors.email = "فرمت ایمیل صحیح نیست";

    setPersonalErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast({
        title: "لطفاً اطلاعات فردی را کامل کنید",
        description: "برخی از فیلدهای ضروری ناتمام هستند.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const categoryScores = useMemo(() => {
    const sums: Record<string, { total: number; count: number }> = {};
    Object.keys(test.scales).forEach((k) => (sums[k] = { total: 0, count: 0 }));
    test.questions.forEach((q) => {
      const v = answers[q.id];
      const cat = q.category ?? "general";
      if (typeof v === "number" && sums[cat]) {
        sums[cat].total += v;
        sums[cat].count += 1;
      }
    });
    return sums;
  }, [answers, test]);

  const buildEmailBody = () => {
    const lines: string[] = [];
    lines.push("=".repeat(60));
    lines.push(`پاسخ‌نامه ${test.faName} (${test.enName})`);
    lines.push("آکادمی پرورش‌گرافیک");
    lines.push("=".repeat(60));
    lines.push("");
    lines.push("📋 اطلاعات فردی:");
    lines.push(`نام و نام خانوادگی: ${personal.fullName || "-"}`);
    lines.push(`سن: ${personal.age || "-"}`);
    lines.push(`جنسیت: ${genderLabel(personal.gender)}`);
    lines.push(`تحصیلات: ${educationLabel(personal.education)}`);
    lines.push(`شغل: ${personal.occupation || "-"}`);
    lines.push(`شهر: ${personal.city || "-"}`);
    lines.push(`تلفن: ${personal.phone || "-"}`);
    lines.push(`ایمیل: ${personal.email || "-"}`);
    lines.push(`تاریخ ثبت: ${new Date().toLocaleString("fa-IR")}`);
    lines.push(`آزمون: ${test.faName} (${test.enName}) — ${test.author}`);
    lines.push("");
    lines.push("-".repeat(60));
    lines.push(`📊 خلاصه نمرات در ${Object.keys(test.scales).length} عامل:`);
    lines.push("-".repeat(60));
    Object.entries(categoryScores).forEach(([key, s]) => {
      const maxPerQuestion = test.likertOptions[test.likertOptions.length - 1].value;
      const maxTotal = s.count * maxPerQuestion;
      const avg = s.count > 0 ? (s.total / s.count).toFixed(2) : "0";
      const scale = test.scales[key];
      lines.push(`${scale.fa} (${scale.en}):`);
      lines.push(`  - تعداد پاسخ: ${s.count}`);
      lines.push(`  - مجموع نمره: ${s.total}${maxTotal > 0 ? ` از ${maxTotal}` : ""}`);
      lines.push(`  - میانگین: ${avg}`);
      lines.push("");
    });
    lines.push("-".repeat(60));
    lines.push("📝 پاسخ‌های تفصیلی به سؤالات:");
    lines.push("-".repeat(60));
    test.questions.forEach((q) => {
      const v = answers[q.id] ?? "-";
      const label = typeof v === "number" ? getLikertLabel(test, v) : "-";
      lines.push(`${q.id}. ${q.text}`);
      lines.push(`   پاسخ: ${v}${label !== "-" ? ` (${label})` : ""}`);
      lines.push("");
    });
    lines.push("=".repeat(60));
    lines.push("پایان پاسخ‌نامه");
    lines.push("=".repeat(60));
    return lines.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePersonal()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (answeredCount < totalQuestions) {
      toast({
        title: "پاسخ‌دهی ناتمام",
        description: `شما به ${answeredCount} از ${totalQuestions} سؤال پاسخ داده‌اید. لطفاً همه سؤالات را تکمیل کنید.`,
        variant: "destructive",
        action: (
          <ToastAction altText="رفتن به سؤالات" onClick={scrollToQuestions}>
            رفتن به سؤالات
          </ToastAction>
        ),
      });
      scrollToQuestions();
      return;
    }

    setIsSubmitting(true);
    try {
      const emailBody = buildEmailBody();
      const formData = new FormData();
      formData.append("name", personal.fullName);
      formData.append("email", personal.email || "no-reply@parvarshgraphic.ir");
      formData.append("_subject", `${test.faName} — ${personal.fullName || "ناشناس"}`);
      formData.append("_template", "table");
      formData.append("_captcha", "false");
      formData.append("message", emailBody);
      formData.append("test_type", test.faName);
      formData.append("test_code", test.id);
      formData.append("age", personal.age);
      formData.append("gender", genderLabel(personal.gender));
      formData.append("education", educationLabel(personal.education));
      formData.append("occupation", personal.occupation);
      formData.append("city", personal.city);
      formData.append("phone", personal.phone);

      Object.entries(categoryScores).forEach(([k, s]) => {
        const max = s.count * test.likertOptions[test.likertOptions.length - 1].value;
        formData.append(`score_${k}`, `${s.total}/${max}`);
      });
      formData.append("answers_json", JSON.stringify(answers, null, 2));

      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!res.ok) throw new Error("FormSubmit request failed");

      toast({
        title: "ارسال موفقیت‌آمیز بود ✅",
        description: "پاسخ‌های شما برای تیم پژوهشی ارسال شد.",
      });
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      toast({
        title: "خطا در ارسال",
        description: "لطفاً اتصال اینترنت را بررسی کرده و مجدد تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToQuestions = () => {
    questionsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleReset = () => {
    setPersonal(EMPTY_PERSONAL);
    setAnswers({});
    setPersonalErrors({});
    setIsSubmitted(false);
    onBack();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1">
          <ThankYou onReset={handleReset} />
        </main>
        <Footer />
      </div>
    );
  }

  // Color classes per test
  const colorClasses: Record<string, { iconBg: string; iconColor: string; textAccent: string; btnHover: string }> = {
    rose: { iconBg: "bg-rose-100 dark:bg-rose-950/40", iconColor: "text-rose-600 dark:text-rose-400", textAccent: "text-rose-600 dark:text-rose-400", btnHover: "hover:border-rose-300" },
    emerald: { iconBg: "bg-emerald-100 dark:bg-emerald-950/40", iconColor: "text-emerald-600 dark:text-emerald-400", textAccent: "text-emerald-600 dark:text-emerald-400", btnHover: "hover:border-emerald-300" },
    violet: { iconBg: "bg-violet-100 dark:bg-violet-950/40", iconColor: "text-violet-600 dark:text-violet-400", textAccent: "text-violet-600 dark:text-violet-400", btnHover: "hover:border-violet-300" },
  };
  const c = colorClasses[test.color];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Minimal top bar */}
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </button>

          {/* Test title + icon (minimal) */}
          <div className="flex items-center gap-2">
            <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${c.iconBg} ${c.iconColor}`}>
              <PsychologyIcon name={test.iconName} className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-foreground">{test.faName}</span>
          </div>
        </div>
      </div>

      {/* Progress bar (sticky) */}
      <div className="sticky top-[57px] z-30">
        <ProgressBar answered={answeredCount} total={totalQuestions} />
      </div>

      <main className="flex-1 pb-10 pt-4">
        <div className="mx-auto max-w-3xl px-4 space-y-5">
          {/* Personal Info Form */}
          <PersonalInfoForm
            values={personal}
            errors={personalErrors}
            onChange={handlePersonalChange}
          />

          {/* Questions Section */}
          <div ref={questionsSectionRef}>
            <div className="mb-3 px-1">
              <h2 className="text-base font-semibold text-foreground">
                {answeredCount} از {totalQuestions} سؤال پاسخ داده شده
              </h2>
            </div>
            <div className="space-y-2.5">
              {test.id === "glasser" &&
                test.questions.map((q, idx) => (
                  <QuestionItem
                    key={q.id}
                    question={q as any}
                    index={idx}
                    value={answers[q.id] ?? null}
                    onAnswer={handleAnswer}
                    likertOptions={test.likertOptions}
                  />
                ))}
              {test.id === "neo" &&
                test.questions.map((q, idx) => (
                  <NeoQuestionItem
                    key={q.id}
                    question={q as any}
                    index={idx}
                    value={answers[q.id] ?? null}
                    onAnswer={handleAnswer}
                    likertOptions={test.likertOptions}
                  />
                ))}
              {test.id === "mcmi" &&
                test.questions.map((q, idx) => (
                  <McmiQuestionItem
                    key={q.id}
                    question={q as any}
                    index={idx}
                    value={answers[q.id] ?? null}
                    onAnswer={handleAnswer}
                    likertOptions={test.likertOptions}
                  />
                ))}
            </div>
          </div>

          {/* Submit Button (sticky bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sticky bottom-3 z-20"
          >
            <div className="rounded-2xl border border-primary/30 bg-card/95 p-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/90">
              <div className="flex items-center justify-between gap-3">
                <div className="hidden sm:block">
                  <p className="text-xs text-muted-foreground">پیشرفت شما</p>
                  <p className="text-sm font-semibold text-foreground">
                    {progressPercentage}٪ تکمیل شده
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none gap-2 h-12 text-base shadow-md"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      در حال ارسال...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      ارسال پاسخ‌ها
                    </>
                  )}
                </Button>
              </div>
              {answeredCount < totalQuestions && (
                <p className="mt-2 text-center text-[11px] text-amber-700 dark:text-amber-400">
                  ⚠ برای ارسال، باید به همه {totalQuestions} سؤال پاسخ دهید.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-auto py-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-[11px] text-muted-foreground">
          © {new Date().getFullYear()} آکادمی پرورش‌گرافیک
        </p>
      </div>
    </footer>
  );
}

function genderLabel(g: string) {
  return g === "female" ? "خانم" : g === "male" ? "آقا" : g === "other" ? "ترجیح می‌دهم نگویم" : "-";
}
function educationLabel(e: string) {
  const map: Record<string, string> = {
    diploma: "دیپلم",
    associate: "کاردانی",
    bachelor: "کارشناسی",
    master: "کارشناسی ارشد",
    phd: "دکترا",
    other: "سایر",
  };
  return map[e] || "-";
}
function getLikertLabel(test: typeof TESTS[TestId], value: number) {
  const opt = test.likertOptions.find((o) => o.value === value);
  return opt?.label ?? "-";
}
