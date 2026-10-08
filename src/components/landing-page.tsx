"use client";

import { motion } from "framer-motion";
import { TEST_LIST, type TestId } from "@/lib/tests-config";
import {
  BrainIllustration,
  HandIllustration,
  MaskIllustration,
  FloatingComposition,
  MindOrb,
} from "@/components/illustrations";
import { ArrowLeft } from "lucide-react";

interface LandingPageProps {
  onSelectTest: (id: TestId) => void;
}

export function LandingPage({ onSelectTest }: LandingPageProps) {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-background via-background to-accent/30">
      {/* Decorative background orbs */}
      <div className="absolute top-10 -right-20 w-72 h-72 opacity-30 float-soft">
        <MindOrb color="teal" />
      </div>
      <div className="absolute bottom-20 -left-20 w-64 h-64 opacity-20 float-soft-delayed">
        <MindOrb color="violet" />
      </div>

      {/* Hero section */}
      <header className="relative px-4 pt-16 pb-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-3xl font-bold leading-tight text-foreground sm:text-4xl"
          >
            آزمون‌های روان‌شناختی
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-2 text-sm text-muted-foreground sm:text-base"
          >
            خودشناسی، سنجش شخصیت و رشد فردی
          </motion.p>

          {/* Floating illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mx-auto mt-6 mb-2 w-72 max-w-full"
          >
            <FloatingComposition className="w-full" />
          </motion.div>
        </div>
      </header>

      {/* Test selection */}
      <main className="relative flex-1 pb-10">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="mb-5 text-center"
          >
            <h2 className="text-base font-semibold text-foreground">
              آزمون موردنظر خود را انتخاب کنید
            </h2>
          </motion.div>

          <div className="space-y-3">
            {TEST_LIST.map((test, idx) => (
              <TestCard
                key={test.id}
                test={test}
                index={idx}
                onSelect={() => onSelectTest(test.id)}
              />
            ))}
          </div>
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
  // Illustration per test
  const Illustration = {
    glasser: HandIllustration,
    neo: BrainIllustration,
    mcmi: MaskIllustration,
  }[test.id];

  // Color theme per test
  const theme = {
    glasser: {
      bg: "bg-rose-50 dark:bg-rose-950/20",
      text: "text-rose-600 dark:text-rose-400",
      hover: "hover:border-rose-300 dark:hover:border-rose-700",
      badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    },
    neo: {
      bg: "bg-emerald-50 dark:bg-emerald-950/20",
      text: "text-emerald-600 dark:text-emerald-400",
      hover: "hover:border-emerald-300 dark:hover:border-emerald-700",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    },
    mcmi: {
      bg: "bg-violet-50 dark:bg-violet-950/20",
      text: "text-violet-600 dark:text-violet-400",
      hover: "hover:border-violet-300 dark:hover:border-violet-700",
      badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
    },
  }[test.id];

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
      onClick={onSelect}
      className={`group flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-4 text-right shadow-sm transition-all duration-200 hover:shadow-md ${theme.hover}`}
    >
      {/* 3D illustration */}
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${theme.bg}`}>
        <Illustration className="h-11 w-11" />
      </div>

      {/* Title + count */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-foreground">{test.faName}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {test.questionCount} سؤال • {test.estimatedTime}
        </p>
      </div>

      {/* Badge + Arrow */}
      <div className="flex shrink-0 items-center gap-2">
        <span className={`hidden sm:inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${theme.badge}`}>
          {test.author}
        </span>
        <ArrowLeft className={`h-5 w-5 ${theme.text} transition-transform group-hover:-translate-x-1`} />
      </div>
    </motion.button>
  );
}

function LandingFooter() {
  return (
    <footer className="relative py-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <p className="font-mono text-xs text-muted-foreground">
          Soleimani-2026
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground/70">
          این پرسشنامه‌ها جنبه پژوهشی دارند و جایگزین مشاوره تخصصی نیستند.
        </p>
      </div>
    </footer>
  );
}
