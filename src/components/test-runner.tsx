"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TESTS, type TestId } from "@/lib/tests-config";
import { NEO_QUESTIONS, NEO_FACTORS, type NeoFactor } from "@/lib/neo-questions";
import { HandIllustration, BrainIllustration, MaskIllustration } from "@/components/illustrations";
import { PersonalInfoForm, type PersonalInfo } from "@/components/questionnaire/personal-info-form";
import { QuestionItem } from "@/components/questionnaire/question-item";
import { NeoQuestionItem } from "@/components/questionnaire/neo-question-item";
import { McmiQuestionItem } from "@/components/questionnaire/mcmi-question-item";
import { ProgressBar } from "@/components/questionnaire/progress-bar";
import { ThankYou } from "@/components/questionnaire/thank-you";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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

const STORAGE_KEY = "test-progress";

interface SavedProgress {
  testId: TestId;
  personal: PersonalInfo;
  answers: Answers;
  timestamp: number;
}

function loadSavedProgress(testId: TestId): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SavedProgress;
    if (data.testId !== testId) return null;
    if (!data.answers || Object.keys(data.answers).length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

function saveProgress(testId: TestId, personal: PersonalInfo, answers: Answers) {
  try {
    const data: SavedProgress = {
      testId,
      personal,
      answers,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

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
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [savedData, setSavedData] = useState<SavedProgress | null>(null);
  const { toast } = useToast();
  const questionsSectionRef = useRef<HTMLDivElement>(null);
  const questionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // On mount: check for saved progress and show resume dialog
  useEffect(() => {
    const saved = loadSavedProgress(testId);
    if (saved) {
      setSavedData(saved);
      setShowResumeDialog(true);
    }
  }, [testId]);

  // Sync to localStorage whenever personal or answers change
  useEffect(() => {
    if (Object.keys(answers).length > 0 || personal.fullName || personal.age) {
      saveProgress(testId, personal, answers);
    }
  }, [personal, answers, testId]);

  // Handle resume dialog actions
  const handleResume = () => {
    if (savedData) {
      setPersonal(savedData.personal);
      setAnswers(savedData.answers);
      setTimeout(() => {
        const unansweredId = test.questions.find(
          (q) => savedData.answers[q.id] === undefined
        )?.id;
        if (unansweredId && questionRefs.current[unansweredId]) {
          questionRefs.current[unansweredId]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        } else {
          questionsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 200);
    }
    setShowResumeDialog(false);
    setSavedData(null);
  };

  const handleStartOver = () => {
    clearProgress();
    setPersonal(EMPTY_PERSONAL);
    setAnswers({});
    setShowResumeDialog(false);
    setSavedData(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  // Category scores for generic tests
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
    lines.push(`Soleimani-2026`);
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
    lines.push("📊 نمرات محاسبه‌شده:");
    lines.push("-".repeat(60));

    // For Glasser: explicitly compute averages per need based on question ranges
    if (test.id === "glasser") {
      const needs = [
        { name: "نیاز به بقا (Survival)", range: [1, 7] },
        { name: "نیاز به عشق و صمیمیت (Love & Belonging)", range: [8, 14] },
        { name: "نیاز به آزادی (Freedom)", range: [15, 21] },
        { name: "نیاز به قدرت (Power)", range: [22, 28] },
        { name: "نیاز به تفریح (Fun)", range: [29, 35] },
      ];
      needs.forEach((need) => {
        const questions = test.questions.filter(
          (q) => q.id >= need.range[0] && q.id <= need.range[1]
        );
        const sum = questions.reduce((acc, q) => acc + (answers[q.id] ?? 0), 0);
        const avg = (sum / 7).toFixed(2);
        lines.push(`${need.name}:`);
        lines.push(`  - جمع امتیاز ${need.range[0]} تا ${need.range[1]}: ${sum}`);
        lines.push(`  - میانگین (جمع تقسیم بر ۷): ${avg}`);
        lines.push("");
      });
    } else if (test.id === "neo") {
      // NEO scoring: 5 factors × 6 facets × 8 questions = 240
      const factorOrder: NeoFactor[] = ["neuroticism", "extraversion", "openness", "agreeableness", "conscientiousness"];
      const factorTotals: Record<NeoFactor, number> = {
        neuroticism: 0, extraversion: 0, openness: 0, agreeableness: 0, conscientiousness: 0,
      };

      factorOrder.forEach((factor) => {
        const factorInfo = NEO_FACTORS[factor];
        lines.push(`■ ${factorInfo.fa} (${factorInfo.en}) [${factorInfo.symbol}]:`);
        let factorSum = 0;
        factorInfo.facets.forEach((facet) => {
          const facetQuestions = NEO_QUESTIONS.filter((q) => q.facet === facet.key);
          let facetSum = 0;
          facetQuestions.forEach((q) => {
            const userAnswer = answers[q.id];
            if (typeof userAnswer === "number") {
              const score = q.reverseScored ? (4 - userAnswer) : userAnswer;
              facetSum += score;
            }
          });
          factorSum += facetSum;
          lines.push(`  ▸ ${facet.fa} [${facet.key}]: ${facetSum}/32`);
        });
        factorTotals[factor] = factorSum;
        lines.push(`  ▶ مجموع: ${factorSum}/192`);
        lines.push("");
      });

      // Summary table
      lines.push("─".repeat(60));
      lines.push("📊 خلاصه نمرات ۵ مقیاس اصلی:");
      lines.push("─".repeat(60));
      factorOrder.forEach((factor) => {
        const info = NEO_FACTORS[factor];
        lines.push(`${info.fa} (${info.en}): ${factorTotals[factor]}/192`);
      });
      lines.push("");
    } else {
      // Generic summary for other tests
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
    }
    lines.push("-".repeat(60));
    lines.push("📝 پاسخ‌های تفصیلی به سؤالات:");
    lines.push("-".repeat(60));
    if (test.id === "neo") {
      // Compact format for NEO (240 questions, large text)
      const answersPerLine = 8;
      for (let i = 0; i < test.questions.length; i += answersPerLine) {
        const chunk = test.questions.slice(i, i + answersPerLine);
        const parts = chunk.map((q) => {
          const v = answers[q.id];
          if (typeof v === "number") {
            return `Q${q.id}=${v}`;
          }
          return `Q${q.id}=-`;
        });
        lines.push(parts.join("  "));
      }
    } else {
      test.questions.forEach((q) => {
        const v = answers[q.id] ?? "-";
        const label = typeof v === "number" ? getLikertLabel(test, v) : "-";
        lines.push(`${q.id}. ${q.text}`);
        lines.push(`   پاسخ: ${v}${label !== "-" ? ` (${label})` : ""}`);
        lines.push("");
      });
    }
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
      // Compact JSON (no pretty printing) to save space
      formData.append("answers_json", JSON.stringify(answers));

      const res = await fetch("/api/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        throw new Error(data?.error || "FormSubmit request failed");
      }

      toast({
        title: "ارسال موفقیت‌آمیز بود ✅",
        description: "پاسخ‌های شما برای تیم پژوهشی ارسال شد.",
      });
      setIsSubmitted(true);
      clearProgress();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      console.error(err);
      // Check if it's a FormSubmit activation error
      const errorMsg = err?.message || "";
      if (errorMsg.includes("Activation") || errorMsg.includes("needs Activation")) {
        toast({
          title: "نیاز به فعال‌سازی ایمیل",
          description: "سرویس ایمیل هنوز فعال نشده است. لطفاً صندوق ایمیل خود را بررسی کرده و روی لینک فعال‌سازی کلیک کنید.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "خطا در ارسال",
          description: "لطفاً اتصال اینترنت را بررسی کرده و مجدد تلاش کنید.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToQuestions = () => {
    questionsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleReset = () => {
    clearProgress();
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

  // Color classes per test - applied consistently across all UI elements
  const colorClasses: Record<string, {
    iconBg: string;
    textAccent: string;
    btnHover: string;
    progressColor: "rose" | "emerald" | "violet";
    submitBtn: string;
    submitBtnHover: string;
    topBorder: string;
    heroBg: string;
    dotColor: string;
  }> = {
    rose: {
      iconBg: "bg-rose-50 dark:bg-rose-950/20",
      textAccent: "text-rose-600 dark:text-rose-400",
      btnHover: "hover:border-rose-300",
      progressColor: "rose",
      submitBtn: "bg-rose-600 hover:bg-rose-700 text-white",
      submitBtnHover: "border-rose-300",
      topBorder: "border-rose-200 dark:border-rose-900/50",
      heroBg: "from-rose-50 to-card dark:from-rose-950/20 dark:to-card",
      dotColor: "bg-rose-500",
    },
    emerald: {
      iconBg: "bg-emerald-50 dark:bg-emerald-950/20",
      textAccent: "text-emerald-600 dark:text-emerald-400",
      btnHover: "hover:border-emerald-300",
      progressColor: "emerald",
      submitBtn: "bg-emerald-600 hover:bg-emerald-700 text-white",
      submitBtnHover: "border-emerald-300",
      topBorder: "border-emerald-200 dark:border-emerald-900/50",
      heroBg: "from-emerald-50 to-card dark:from-emerald-950/20 dark:to-card",
      dotColor: "bg-emerald-500",
    },
    violet: {
      iconBg: "bg-violet-50 dark:bg-violet-950/20",
      textAccent: "text-violet-600 dark:text-violet-400",
      btnHover: "hover:border-violet-300",
      progressColor: "violet",
      submitBtn: "bg-violet-600 hover:bg-violet-700 text-white",
      submitBtnHover: "border-violet-300",
      topBorder: "border-violet-200 dark:border-violet-900/50",
      heroBg: "from-violet-50 to-card dark:from-violet-950/20 dark:to-card",
      dotColor: "bg-violet-500",
    },
  };
  const c = colorClasses[test.color];

  // Illustration component per test
  const Illustration = {
    glasser: HandIllustration,
    neo: BrainIllustration,
    mcmi: MaskIllustration,
  }[test.id];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Minimal top bar - just test name, no badge */}
      <div className={`sticky top-0 z-40 border-b ${c.topBorder} bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80`}>
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </button>

          {/* Test name with accent color dot */}
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${c.dotColor}`} />
            <span className="text-sm font-medium text-foreground">{test.faName}</span>
          </div>
        </div>
      </div>

      {/* Progress bar (sticky) - themed */}
      <div className="sticky top-[57px] z-30">
        <ProgressBar answered={answeredCount} total={totalQuestions} color={c.progressColor} />
      </div>

      <main className="flex-1 pb-10 pt-4">
        {/* Hero with 3D illustration */}
        <div className="mx-auto max-w-3xl px-4 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-4 rounded-2xl border ${c.topBorder} bg-gradient-to-l ${c.heroBg} p-4`}
          >
            {/* 3D illustration */}
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${c.iconBg}`}>
              <Illustration className="h-13 w-13" />
            </div>
            {/* Text */}
            <div className="flex-1">
              <h1 className="text-base font-bold text-foreground sm:text-lg">{test.faName}</h1>
              <p className={`text-xs ${c.textAccent}`}>{test.enName} • {test.author}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {test.questionCount} سؤال • {test.estimatedTime}
              </p>
            </div>
          </motion.div>
        </div>

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
                  <div
                    key={q.id}
                    ref={(el) => { questionRefs.current[q.id] = el; }}
                  >
                    <QuestionItem
                      question={q as any}
                      index={idx}
                      value={answers[q.id] ?? null}
                      onAnswer={handleAnswer}
                      likertOptions={test.likertOptions}
                    />
                  </div>
                ))}
              {test.id === "neo" &&
                test.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    ref={(el) => { questionRefs.current[q.id] = el; }}
                  >
                    <NeoQuestionItem
                      question={q as any}
                      index={idx}
                      value={answers[q.id] ?? null}
                      onAnswer={handleAnswer}
                      likertOptions={test.likertOptions}
                    />
                  </div>
                ))}
              {test.id === "mcmi" &&
                test.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    ref={(el) => { questionRefs.current[q.id] = el; }}
                  >
                    <McmiQuestionItem
                      question={q as any}
                      index={idx}
                      value={answers[q.id] ?? null}
                      onAnswer={handleAnswer}
                      likertOptions={test.likertOptions}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Submit Button (sticky bottom) - themed */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="sticky bottom-3 z-20"
          >
            <div className={`rounded-2xl border ${c.submitBtnHover} bg-card/95 p-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/90`}>
              <div className="flex items-center justify-between gap-3">
                <div className="hidden sm:block">
                  <p className="text-xs text-muted-foreground">پیشرفت شما</p>
                  <p className={`text-sm font-semibold ${c.textAccent}`}>
                    {progressPercentage}٪ تکمیل شده
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex-1 sm:flex-none gap-2 h-12 text-base shadow-md ${c.submitBtn}`}
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

      {/* Resume progress dialog */}
      <AlertDialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ادامه پاسخ‌دهی؟</AlertDialogTitle>
            <AlertDialogDescription>
              ما متوجه شدیم که شما قبلاً به بخشی از این آزمون پاسخ داده‌اید
              {savedData ? ` (${Object.keys(savedData.answers).length} سؤال)` : ""}.
              آیا می‌خواهید از همان‌جا ادامه دهید یا از ابتدا شروع کنید؟
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row justify-end gap-2">
            <AlertDialogCancel onClick={handleStartOver}>
              از ابتدا شروع کن
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleResume}>
              ادامه از محل قبلی
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-auto py-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-mono text-[11px] text-muted-foreground">
          Soleimani-2026
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
