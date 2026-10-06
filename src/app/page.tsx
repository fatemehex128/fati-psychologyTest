"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { HeroHeader } from "@/components/questionnaire/hero-header";
import { PersonalInfoForm, type PersonalInfo } from "@/components/questionnaire/personal-info-form";
import { QuestionItem } from "@/components/questionnaire/question-item";
import { ProgressBar } from "@/components/questionnaire/progress-bar";
import { ThankYou } from "@/components/questionnaire/thank-you";
import { NeedsLegend } from "@/components/questionnaire/needs-legend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { QUESTIONS, NEED_CATEGORIES, type NeedCategory } from "@/lib/glasser-questions";
import { Send, Loader2, ClipboardCheck, ChevronLeft, RotateCcw } from "lucide-react";

const FORMSUBMIT_EMAIL = "fatemehex128@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`;

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

export default function Home() {
  const [personal, setPersonal] = useState<PersonalInfo>(EMPTY_PERSONAL);
  const [personalErrors, setPersonalErrors] = useState<Partial<Record<keyof PersonalInfo, string>>>({});
  const [answers, setAnswers] = useState<Answers>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const questionsSectionRef = useRef<HTMLDivElement>(null);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = QUESTIONS.length;
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

  // category scores summary for the email body
  const categoryScores = useMemo(() => {
    const sums: Record<NeedCategory, { total: number; count: number }> = {
      survival: { total: 0, count: 0 },
      love_belonging: { total: 0, count: 0 },
      power: { total: 0, count: 0 },
      freedom: { total: 0, count: 0 },
      fun: { total: 0, count: 0 },
    };
    QUESTIONS.forEach((q) => {
      const v = answers[q.id];
      if (typeof v === "number") {
        sums[q.category].total += v;
        sums[q.category].count += 1;
      }
    });
    return sums;
  }, [answers]);

  const buildEmailBody = () => {
    const lines: string[] = [];
    lines.push("=".repeat(60));
    lines.push("پاسخ‌نامه پرسشنامه نیازهای اساسی گلاسر");
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
    lines.push("");
    lines.push("-".repeat(60));
    lines.push("📊 خلاصه نمرات در ۵ نیاز اساسی:");
    lines.push("-".repeat(60));
    (Object.keys(categoryScores) as NeedCategory[]).forEach((key) => {
      const s = categoryScores[key];
      const avg = s.count > 0 ? (s.total / s.count).toFixed(2) : "0";
      const cat = NEED_CATEGORIES[key];
      lines.push(`${cat.fa} (${cat.en}):`);
      lines.push(`  - تعداد پاسخ: ${s.count} از ۷`);
      lines.push(`  - مجموع نمره: ${s.total} از ۳۵`);
      lines.push(`  - میانگین: ${avg} از ۵`);
      lines.push("");
    });
    lines.push("-".repeat(60));
    lines.push("📝 پاسخ‌های تفصیلی به سؤالات:");
    lines.push("-".repeat(60));
    QUESTIONS.forEach((q) => {
      const v = answers[q.id] ?? "-";
      const cat = NEED_CATEGORIES[q.category];
      lines.push(`${q.id}. [${cat.fa}] ${q.text}`);
      lines.push(`   پاسخ: ${v}${typeof v === "number" ? ` (${likertLabel(v)})` : ""}`);
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
      // scroll to top of personal info
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (answeredCount < totalQuestions) {
      toast({
        title: "پاسخ‌دهی ناتمام",
        description: `شما به ${answeredCount} از ${totalQuestions} سؤال پاسخ داده‌اید. لطفاً همه سؤالات را تکمیل کنید.`,
        variant: "destructive",
        action: (
          <ToastAction
            altText="رفتن به سؤالات"
            onClick={() => scrollToQuestions()}
          >
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
      formData.append("_subject", `پرسشنامه گلاسر — ${personal.fullName || "ناشناس"}`);
      formData.append("_template", "table");
      formData.append("_captcha", "false");
      formData.append("message", emailBody);

      // also append structured fields
      formData.append("age", personal.age);
      formData.append("gender", genderLabel(personal.gender));
      formData.append("education", educationLabel(personal.education));
      formData.append("occupation", personal.occupation);
      formData.append("city", personal.city);
      formData.append("phone", personal.phone);
      (Object.keys(categoryScores) as NeedCategory[]).forEach((k) => {
        const s = categoryScores[k];
        formData.append(`score_${NEED_CATEGORIES[k].en}`, `${s.total}/35 (avg: ${s.count > 0 ? (s.total / s.count).toFixed(2) : 0})`);
      });
      // full answers as JSON
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <ProgressBar answered={answeredCount} total={totalQuestions} />

      <main className="flex-1 pb-10">
        <HeroHeader />

        <div className="mx-auto max-w-3xl px-4 space-y-6">
          {/* Personal Info Form */}
          <PersonalInfoForm
            values={personal}
            errors={personalErrors}
            onChange={handlePersonalChange}
          />

          {/* Needs Legend */}
          <NeedsLegend />

          {/* Questions Section */}
          <div ref={questionsSectionRef}>
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between gap-2 text-xl text-primary">
                  <span className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5" />
                    پرسشنامه گلاسر
                  </span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {answeredCount} از {totalQuestions} پاسخ داده شده
                  </span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  لطفاً هر سؤال را بر اساس واقعیت زندگی خود پاسخ دهید. مقیاس از <strong>۱ (هیچ‌وقت)</strong> تا <strong>۵ (همیشه)</strong> است.
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {QUESTIONS.map((q, idx) => (
                  <QuestionItem
                    key={q.id}
                    question={q}
                    index={idx}
                    value={answers[q.id] ?? null}
                    onAnswer={handleAnswer}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Submit Button */}
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
    <footer className="mt-auto border-t border-border bg-card/50 py-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} آکادمی پرورش‌گرافیک — تمامی حقوق محفوظ است.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/70">
          این پرسشنامه بر اساس نظریه انتخاب ویلیام گلاسر طراحی شده و صرفاً جنبه پژوهشی دارد.
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
function likertLabel(v: number) {
  const labels: Record<number, string> = {
    1: "هیچ‌وقت",
    2: "بندرت",
    3: "گاهی",
    4: "اغلب",
    5: "همیشه",
  };
  return labels[v] || "-";
}
