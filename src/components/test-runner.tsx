"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { TESTS, FORMSUBMIT_ENDPOINT, type TestId } from "@/lib/tests-config";
import { PsychologyIcon } from "@/components/psychology-icons";
import { PersonalInfoForm, type PersonalInfo } from "@/components/questionnaire/personal-info-form";
import { QuestionItem } from "@/components/questionnaire/question-item";
import { NeoQuestionItem } from "@/components/questionnaire/neo-question-item";
import { McmiQuestionItem } from "@/components/questionnaire/mcmi-question-item";
import { ProgressBar } from "@/components/questionnaire/progress-bar";
import { ThankYou } from "@/components/questionnaire/thank-you";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowRight,
  Send,
  Loader2,
  ClipboardCheck,
  BookOpen,
  Clock,
  ListChecks,
  Info,
} from "lucide-react";

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

  // Category/scale scores summary for the email body
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar with back button + test name */}
      <div className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <Button
            type="button"
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="gap-1.5"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </Button>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-foreground">{test.faName}</span>
            <span className="text-xs text-muted-foreground">|</span>
            <span className="text-xs text-muted-foreground">{test.author}</span>
          </div>
        </div>
      </div>

      {/* Progress bar (sticky, below top bar) */}
      <div className="sticky top-[57px] z-30">
        <ProgressBar answered={answeredCount} total={totalQuestions} />
      </div>

      <main className="flex-1 pb-10 pt-4">
        {/* Hero with test info */}
        <TestHero test={test} />

        <div className="mx-auto max-w-3xl px-4 space-y-6">
          {/* Personal Info Form */}
          <PersonalInfoForm
            values={personal}
            errors={personalErrors}
            onChange={handlePersonalChange}
          />

          {/* Scales legend */}
          <ScalesLegend test={test} />

          {/* Questions Section */}
          <div ref={questionsSectionRef}>
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between gap-2 text-xl text-primary">
                  <span className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    {test.faName}
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {answeredCount} از {totalQuestions} پاسخ داده شده
                  </span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {test.id === "glasser" && "لطفاً هر سؤال را بر اساس واقعیت زندگی خود پاسخ دهید. مقیاس از ۱ (بسیارکم) تا ۵ (بسیارزیاد)."}
                  {test.id === "neo" && "لطفاً میزان موافقت خود را با هر عبارت بیان کنید. مقیاس از ۰ (کاملاً مخالفم) تا ۴ (کاملاً موافقم)."}
                  {test.id === "mcmi" && "لطفاً به هر عبارت با «بله» یا «خیر» پاسخ دهید. پاسخ صادقانه به دقت نتیجه کمک می‌کند."}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
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
              </CardContent>
            </Card>
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

function TestHero({ test }: { test: typeof TESTS[TestId] }) {
  const colorClasses: Record<string, { iconBg: string; iconColor: string; gradient: string; textAccent: string; badge: string }> = {
    rose: { iconBg: "bg-rose-100 dark:bg-rose-950/40", iconColor: "text-rose-600 dark:text-rose-400", gradient: "from-rose-500/20 via-red-500/10 to-transparent", textAccent: "text-rose-600 dark:text-rose-400", badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300" },
    emerald: { iconBg: "bg-emerald-100 dark:bg-emerald-950/40", iconColor: "text-emerald-600 dark:text-emerald-400", gradient: "from-emerald-500/20 via-teal-500/10 to-transparent", textAccent: "text-emerald-600 dark:text-emerald-400", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
    violet: { iconBg: "bg-violet-100 dark:bg-violet-950/40", iconColor: "text-violet-600 dark:text-violet-400", gradient: "from-violet-500/20 via-purple-500/10 to-transparent", textAccent: "text-violet-600 dark:text-violet-400", badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" },
  };
  const c = colorClasses[test.color];

  return (
    <header className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b ${c.gradient}`} />
      <div className="relative mx-auto max-w-3xl px-4 pt-6 pb-2 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-3 flex justify-center"
        >
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${c.iconBg} ${c.iconColor} ring-1 ring-${test.color}-200/40`}>
            <PsychologyIcon name={test.iconName} className="h-8 w-8" strokeWidth={1.5} />
          </div>
        </motion.div>

        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{test.faName}</h1>
        <p className={`mt-1 text-xs font-medium ${c.textAccent}`}>{test.enName} • {test.author}</p>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {test.longDescription}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium ${c.badge}`}>
            <ListChecks className="h-3 w-3" />
            {test.questionCount} سؤال
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/50 px-2.5 py-0.5 font-medium text-foreground/70">
            <Clock className="h-3 w-3" />
            {test.estimatedTime}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/50 px-2.5 py-0.5 font-medium text-foreground/70">
            <BookOpen className="h-3 w-3" />
            {Object.keys(test.scales).length} عامل
          </span>
        </div>
      </div>
    </header>
  );
}

function ScalesLegend({ test }: { test: typeof TESTS[TestId] }) {
  const colorClasses: Record<string, { dot: string; border: string }> = {
    rose: { dot: "bg-rose-500", border: "hover:border-rose-300 dark:hover:border-rose-700" },
    emerald: { dot: "bg-emerald-500", border: "hover:border-emerald-300 dark:hover:border-emerald-700" },
    violet: { dot: "bg-violet-500", border: "hover:border-violet-300 dark:hover:border-violet-700" },
  };
  const c = colorClasses[test.color];

  return (
    <Card className={`border-primary/20 bg-gradient-to-br from-card to-accent/30`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <Info className="h-4 w-4 text-primary" />
          عوامل {test.faName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(test.scales).map(([key, scale]) => (
            <div
              key={key}
              className={`rounded-xl border border-border bg-background/60 p-3 transition-colors ${c.border} hover:bg-accent/30`}
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                <span className="text-sm font-semibold text-foreground">{scale.fa}</span>
                <span className="mr-auto text-[10px] font-mono text-muted-foreground">
                  {scale.en}
                </span>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">{scale.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50 py-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} آکادمی پرورش‌گرافیک — تمامی حقوق محفوظ است.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/70">
          این پرسشنامه‌ها جنبه پژوهشی دارند و جایگزین مشاوره تخصصی نیستند.
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
