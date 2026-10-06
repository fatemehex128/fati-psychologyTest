"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TEST_LIST, type TestId } from "@/lib/tests-config";
import { PsychologyIcon } from "@/components/psychology-icons";
import { ArrowLeft } from "lucide-react";

interface LandingPageProps {
  onSelectTest: (id: TestId) => void;
}

export function LandingPage({ onSelectTest }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/20">
      {/* Minimal hero */}
      <header className="relative overflow-hidden">
        <div className="absolute -top-24 right-1/3 h-48 w-48 rounded-full bg-rose-200/30 blur-3xl" />
        <div className="absolute -top-20 left-1/3 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 pt-16 pb-8 text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <Image
              src="/logo.png"
              alt="آکادمی پرورش‌گرافیک"
              width={88}
              height={88}
              priority
              className="h-20 w-20 object-contain"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl font-bold text-foreground sm:text-3xl"
          >
            آزمون‌های روان‌شناختی
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-2 text-sm text-muted-foreground"
          >
            آزمون موردنظر خود را انتخاب کنید
          </motion.p>
        </div>
      </header>

      {/* Test selection - minimal cards */}
      <main className="flex-1 pb-10">
        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-3">
            {TEST_LIST.map((test, idx) => (
              <MinimalTestCard
                key={test.id}
                test={test}
                index={idx}
                onSelect={() => onSelectTest(test.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}

function MinimalTestCard({
  test,
  index,
  onSelect,
}: {
  test: typeof TEST_LIST[number];
  index: number;
  onSelect: () => void;
}) {
  const colorClasses: Record<string, { iconColor: string; chevronColor: string; hoverBg: string }> = {
    rose: { iconColor: "text-rose-500", chevronColor: "text-rose-400", hoverBg: "hover:border-rose-300 dark:hover:border-rose-700" },
    emerald: { iconColor: "text-emerald-500", chevronColor: "text-emerald-400", hoverBg: "hover:border-emerald-300 dark:hover:border-emerald-700" },
    violet: { iconColor: "text-violet-500", chevronColor: "text-violet-400", hoverBg: "hover:border-violet-300 dark:hover:border-violet-700" },
  };
  const c = colorClasses[test.color];

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.4 }}
      onClick={onSelect}
      className={`group flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-right shadow-sm transition-all duration-200 hover:shadow-md ${c.hoverBg}`}
    >
      {/* Icon */}
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/50 ${c.iconColor}`}>
        <PsychologyIcon name={test.iconName} className="h-6 w-6" />
      </span>

      {/* Title + count */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-foreground">{test.faName}</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {test.questionCount} سؤال • {test.estimatedTime}
        </p>
      </div>

      {/* Arrow */}
      <ArrowLeft className={`h-5 w-5 shrink-0 ${c.chevronColor} transition-transform group-hover:-translate-x-1`} />
    </motion.button>
  );
}

function MinimalFooter() {
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
