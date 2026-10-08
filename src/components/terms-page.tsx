"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TESTS, type TestId } from "@/lib/tests-config";
import { HandIllustration, BrainIllustration, MaskIllustration } from "@/components/illustrations";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Check, Shield, AlertCircle, Clock, PhoneOff, VolumeX, Lock, FileText } from "lucide-react";

interface TermsPageProps {
  testId: TestId;
  onAgree: () => void;
  onBack: () => void;
}

// General rules (11 points)
const GENERAL_RULES = [
  { icon: "✓", text: "پاسخ صادقانه بدهید: این پرسشنامه برای شناخت بهتر نیازهای روان‌شناختی شما طراحی شده است. هیچ پاسخ درست یا غلطی وجود ندارد؛ فقط نظر و احساس شخصی شما مهم است." },
  { icon: "⚡", text: "از اولین برداشت خود استفاده کنید: سعی کنید زیاد فکر نکنید. پاسخ‌هایی که بر اساس احساس اولیه داده می‌شوند، معمولاً دقیق‌تر هستند." },
  { icon: "✦", text: "همه سوالات را پاسخ دهید: برای تحلیل کامل، لازم است به تمام سوالات پاسخ داده شود. لطفاً هیچ سوالی را خالی نگذارید." },
  { icon: "⏱", text: "پاسخ‌دهی را بدون وقفه انجام دهید. لطفاً پرسشنامه را به‌صورت پیوسته و بدون توقف تکمیل کنید تا انسجام پاسخ‌ها حفظ شود." },
  { icon: "📵", text: "وسایلی که ممکن است حواستان را پرت نماید از محیط خارج نمایید یا از آنها فاصله بگیرید." },
  { icon: "🤫", text: "در محیطی آرام و بدون مزاحمت پاسخ دهید. ترجیحاً در مکانی ساکت و خلوت باشید تا تمرکز کافی داشته باشید." },
  { icon: "😊", text: "در شرایط روانی مناسب آزمون را انجام دهید. اگر احساس خستگی، عصبانیت، اضطراب یا آشفتگی ذهنی دارید، توصیه می‌شود آزمون را به زمان مناسب‌تری موکول کنید." },
  { icon: "🎵", text: "در زمان انجام تست چیزی گوش نکنید یا در حال فیلم دیدن نباشید." },
  { icon: "📱", text: "حتما در هنگام تست تماس‌های تلفن‌تان را مسدود و محدود نمایید." },
  { icon: "🔒", text: "اطلاعات شما محرمانه است: پاسخ‌های شما فقط برای تحلیل علمی استفاده می‌شود و کاملاً محرمانه باقی خواهد ماند." },
  { icon: "📋", text: "پاسخ تست شما به خودتان تحویل داده نخواهد شد و فقط با درخواست یک کلینیک رسمی که شما از ایشان خواسته باشید به آن کلینیک فرستاده خواهد شد." },
];

// Test-specific instructions
const TEST_INSTRUCTIONS: Record<TestId, { title: string; lines: string[] }> = {
  glasser: {
    title: "نحوه پاسخ‌دهی به پرسشنامه گلاسر",
    lines: [
      "از مقیاس مشخص‌شده استفاده کنید: هر سوال دارای گزینه‌هایی از ۱ تا ۵ است.",
      "۱ = اصلاً درست نیست",
      "۲ = تا حدی نادرست است",
      "۳ = نه درست نه غلط",
      "۴ = تا حدی درست است",
      "۵ = کاملاً درست است",
    ],
  },
  neo: {
    title: "نحوه پاسخ‌دهی به پرسشنامه نئو",
    lines: [
      "از مقیاس مشخص‌شده استفاده کنید: هر عبارت دارای ۵ گزینه است.",
      "کاملاً مخالفم = ۰",
      "مخالفم = ۱",
      "نظری ندارم = ۲",
      "موافقم = ۳",
      "کاملاً موافقم = ۴",
    ],
  },
  mcmi: {
    title: "نحوه پاسخ‌دهی به پرسشنامه میلون",
    lines: [
      "از مقیاس مشخص‌شده استفاده کنید:",
      "اگر شما با یک جمله موافق هستید یا معتقدید که منطبق با وضعیت شماست واژه «بلی» را علامت بزنید.",
      "اگر شما با یک جمله موافق نیستید یا معتقدید که در مورد شما صحت ندارد واژه «خیر» را علامت بزنید.",
      "سعی کنید به همه جمله‌ها جواب دهید حتی اگر از انتخاب خود مطمئن نیستید.",
      "اگر حداکثر سعی خود را نمودید ولی نتوانستید نتیجه بگیرید، واژه خیر را علامت بزنید.",
    ],
  },
};

export function TermsPage({ testId, onAgree, onBack }: TermsPageProps) {
  const test = TESTS[testId];
  const [agreed, setAgreed] = useState(false);
  const instructions = TEST_INSTRUCTIONS[testId];

  // Illustration per test
  const Illustration = {
    glasser: HandIllustration,
    neo: BrainIllustration,
    mcmi: MaskIllustration,
  }[testId];

  // Color theme per test
  const theme = {
    glasser: {
      bg: "bg-rose-50 dark:bg-rose-950/20",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-200 dark:border-rose-900/50",
      heroBg: "from-rose-50 to-card dark:from-rose-950/20 dark:to-card",
      alertBg: "bg-rose-50 dark:bg-rose-950/20",
      alertBorder: "border-rose-300 dark:border-rose-800",
      btn: "bg-rose-600 hover:bg-rose-700 text-white",
      dot: "bg-rose-500",
    },
    neo: {
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-900/50",
      heroBg: "from-emerald-50 to-card dark:from-emerald-950/20 dark:to-card",
      alertBg: "bg-emerald-50 dark:bg-emerald-950/20",
      alertBorder: "border-emerald-300 dark:border-emerald-800",
      btn: "bg-emerald-600 hover:bg-emerald-700 text-white",
      dot: "bg-emerald-500",
    },
    mcmi: {
      bg: "bg-violet-50 dark:bg-violet-950/20",
      text: "text-violet-600 dark:text-violet-400",
      border: "border-violet-200 dark:border-violet-900/50",
      heroBg: "from-violet-50 to-card dark:from-violet-950/20 dark:to-card",
      alertBg: "bg-violet-50 dark:bg-violet-950/20",
      alertBorder: "border-violet-300 dark:border-violet-800",
      btn: "bg-violet-600 hover:bg-violet-700 text-white",
      dot: "bg-violet-500",
    },
  }[testId];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className={`sticky top-0 z-40 border-b ${theme.border} bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80`}>
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            بازگشت
          </button>
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            <span className="text-sm font-medium text-foreground">{test.faName}</span>
          </div>
        </div>
      </div>

      <main className="flex-1 py-6">
        <div className="mx-auto max-w-3xl px-4 space-y-5">
          {/* Hero with test name + illustration */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-4 rounded-2xl border ${theme.border} bg-gradient-to-l ${theme.heroBg} p-4`}
          >
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${theme.bg}`}>
              <Illustration className="h-13 w-13" />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground">{test.faName}</h1>
              <p className={`text-xs ${theme.text}`}>{test.enName} • {test.author}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {test.questionCount} سؤال • {test.estimatedTime}
              </p>
            </div>
          </motion.div>

          {/* General rules card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.bg} ${theme.text}`}>
                <FileText className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-foreground">
                نحوه پاسخ‌دهی به پرسشنامه
              </h2>
            </div>
            <p className="mb-4 text-xs text-muted-foreground">
              لطفاً به نکات زیر توجه فرمایید تا پاسخ‌دهی شما دقیق و معتبر باشد:
            </p>
            <div className="space-y-3">
              {GENERAL_RULES.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${theme.bg} ${theme.text} text-[10px] font-bold`}>
                    {idx + 1}
                  </span>
                  <p className="flex-1 text-xs leading-5 text-foreground">{rule.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Test-specific instructions ALERT */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={`rounded-2xl border-2 ${theme.alertBorder} ${theme.alertBg} p-5`}
          >
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className={`h-5 w-5 ${theme.text}`} />
              <h3 className="text-sm font-bold text-foreground">
                {instructions.title}
              </h3>
            </div>
            <div className="space-y-1.5">
              {instructions.lines.map((line, idx) => (
                <p key={idx} className={`text-xs leading-5 ${idx === 0 ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {line}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Agreement checkbox */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <label className="flex cursor-pointer items-center gap-3">
              <Checkbox
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-foreground">
                قوانین و نحوه پاسخ‌دهی را مطالعه کردم و می‌پذیرم
              </span>
            </label>
          </motion.div>

          {/* Proceed button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="pb-6"
          >
            <Button
              onClick={onAgree}
              disabled={!agreed}
              className={`w-full h-12 gap-2 text-base shadow-md ${theme.btn} ${!agreed ? "opacity-50 cursor-not-allowed" : ""}`}
              size="lg"
            >
              <Check className="h-5 w-5" />
              شروع آزمون
            </Button>
            {!agreed && (
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                برای شروع آزمون، ابتدا تیک تأیید مطالعه قوانین را بزنید
              </p>
            )}
          </motion.div>
        </div>
      </main>

      <footer className="py-6">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-mono text-[11px] text-muted-foreground">
            Soleimani-2026
          </p>
        </div>
      </footer>
    </div>
  );
}
