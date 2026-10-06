"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TEST_LIST, type TestId } from "@/lib/tests-config";
import { PsychologyIcon } from "@/components/psychology-icons";
import { Sparkles, BookOpen, Heart, ArrowLeft, Clock, ListChecks } from "lucide-react";

interface LandingPageProps {
  onSelectTest: (id: TestId) => void;
}

export function LandingPage({ onSelectTest }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <header className="relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-amber-50/50 to-transparent dark:from-rose-950/20 dark:via-amber-950/10" />
        <div className="absolute -top-32 right-1/4 h-72 w-72 rounded-full bg-rose-300/20 blur-3xl" />
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 pt-12 pb-8 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-5 flex justify-center"
          >
            <div className="relative h-24 w-24 rounded-3xl bg-white shadow-lg ring-1 ring-rose-200/40 dark:bg-rose-950/40">
              <Image
                src="/logo.png"
                alt="لوگو آکادمی پرورش‌گرافیک"
                fill
                priority
                sizes="96px"
                className="object-contain p-3"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-rose-100/70 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
              <Sparkles className="h-3 w-3" />
              آکادمی پرورش‌گرافیک
            </div>

            <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
              پلتفرم آزمون‌های روان‌شناختی
            </h1>

            <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              مجموعه‌ای از استانداردترین آزمون‌های روان‌شناختی شامل{" "}
              <span className="font-medium text-rose-600 dark:text-rose-400">پرسشنامه گلاسر</span>،{" "}
              <span className="font-medium text-emerald-600 dark:text-emerald-400">نئو (NEO)</span> و{" "}
              <span className="font-medium text-violet-600 dark:text-violet-400">میلون (MCMI)</span> —
              برای خودشناسی، ارزیابی شخصیت و رشد فردی.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-rose-500" />
                <span>۳ آزمون استاندارد</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5">
                <ListChecks className="h-3.5 w-3.5 text-emerald-500" />
                <span>۴۵۰+ سؤال تخصصی</span>
              </div>
              <span className="text-border">|</span>
              <div className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-violet-500 fill-violet-500" />
                <span>کاملاً محرمانه</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Test cards section */}
      <main className="flex-1 pb-10">
        <div className="mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6 text-center"
          >
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              آزمون موردنظر خود را انتخاب کنید
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              هر آزمون مستقل است. می‌توانید هر کدام را در زمان دلخواه تکمیل کنید.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {TEST_LIST.map((test, idx) => (
              <TestCard
                key={test.id}
                test={test}
                index={idx}
                onSelect={() => onSelectTest(test.id)}
              />
            ))}
          </div>

          {/* Quote section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 mx-auto max-w-3xl"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <div className="absolute -top-12 right-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-rose-200/30 blur-3xl" />
              <div className="relative">
                <div className="mb-3 flex justify-center">
                  <PsychologyIcon name="flower" className="h-8 w-8 text-rose-500" />
                </div>
                <p className="text-base italic leading-7 text-foreground">
                  «تنها راهی که می‌توانیم آنچه را که در زندگی می‌خواهیم به‌دست آوریم، این است که رفتار خود را تغییر دهیم.»
                </p>
                <p className="mt-2 text-xs text-muted-foreground">— ویلیام گلاسر</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}

function TestCard({
  test,
  index,
  onSelect,
}: {
  test: typeof TEST_LIST[number];
  index: number;
  onSelect: () => void;
}) {
  const colorClasses: Record<string, {
    ring: string;
    iconBg: string;
    iconColor: string;
    textAccent: string;
    badge: string;
    hoverBorder: string;
    btn: string;
  }> = {
    rose: {
      ring: "ring-rose-200/40",
      iconBg: "bg-rose-100 dark:bg-rose-950/40",
      iconColor: "text-rose-600 dark:text-rose-400",
      textAccent: "text-rose-600 dark:text-rose-400",
      badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
      hoverBorder: "hover:border-rose-300 dark:hover:border-rose-700",
      btn: "bg-rose-600 hover:bg-rose-700 text-white",
    },
    emerald: {
      ring: "ring-emerald-200/40",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      textAccent: "text-emerald-600 dark:text-emerald-400",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
      hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-700",
      btn: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
    violet: {
      ring: "ring-violet-200/40",
      iconBg: "bg-violet-100 dark:bg-violet-950/40",
      iconColor: "text-violet-600 dark:text-violet-400",
      textAccent: "text-violet-600 dark:text-violet-400",
      badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
      hoverBorder: "hover:border-violet-300 dark:hover:border-violet-700",
      btn: "bg-violet-600 hover:bg-violet-700 text-white",
    },
  };
  const c = colorClasses[test.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div
        className={`relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg ${c.hoverBorder}`}
      >
        {/* Decorative gradient */}
        <div className={`absolute -top-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-br ${test.gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`} />

        <div className="relative space-y-4">
          {/* Icon */}
          <div className="flex items-center justify-between">
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${c.iconBg} ${c.iconColor} ring-1 ${c.ring}`}>
              <PsychologyIcon name={test.iconName} className="h-7 w-7" />
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${c.badge}`}>
              <Clock className="h-3 w-3" />
              {test.estimatedTime}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 className="text-lg font-bold text-foreground">{test.faName}</h3>
            <p className={`text-xs font-medium ${c.textAccent}`}>{test.enName}</p>
          </div>

          {/* Author */}
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">طراح:</span> {test.author}
          </p>

          {/* Description */}
          <p className="text-sm leading-6 text-muted-foreground">{test.shortDescription}</p>

          {/* Stats */}
          <div className="flex items-center gap-3 border-t border-border pt-3 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <ListChecks className="h-3.5 w-3.5" />
              <span>{test.questionCount} سؤال</span>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>{Object.keys(test.scales).length} عامل</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onSelect}
            className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${c.btn}`}
          >
            <span>شروع آزمون</span>
            <ArrowLeft className="h-4 w-4 transition-transform group-hover/btn:-translate-x-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function LandingFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card/50 py-6">
      <div className="mx-auto max-w-5xl px-4 text-center">
        <div className="mb-3 flex items-center justify-center gap-3 text-muted-foreground">
          <PsychologyIcon name="wave" className="h-4 w-4" />
          <span className="text-xs">خودشناسی، مسیر رشد</span>
          <PsychologyIcon name="wave" className="h-4 w-4 -scale-x-100" />
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} آکادمی پرورش‌گرافیک — تمامی حقوق محفوظ است.
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/70">
          این پرسشنامه‌ها جنبه پژوهشی و آموزشی دارند و جایگزین مشاوره تخصصی نیستند.
        </p>
      </div>
    </footer>
  );
}
