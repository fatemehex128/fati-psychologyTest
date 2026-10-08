"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MindOrb } from "@/components/illustrations";

interface ThankYouProps {
  onReset: () => void;
}

export function ThankYou({ onReset }: ThankYouProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center"
    >
      {/* Decorative floating orbs */}
      <motion.div
        className="absolute top-10 -left-4 w-32 h-32 opacity-20 float-soft"
        aria-hidden
      >
        <MindOrb color="teal" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 -right-4 w-24 h-24 opacity-15 float-soft-delayed"
        aria-hidden
      >
        <MindOrb color="violet" />
      </motion.div>

      {/* Success icon with 3D feel */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-950/40 dark:to-teal-900/40 shadow-lg"
        style={{ boxShadow: "0 8px 24px -4px rgba(13, 148, 136, 0.25)" }}
      >
        <CheckCircle2 className="h-10 w-10 text-teal-600 dark:text-teal-400" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-2 text-xl font-bold text-foreground"
      >
        پاسخ‌های شما ثبت شد
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8 text-sm leading-6 text-muted-foreground"
      >
        از تکمیل پرسشنامه سپاسگزاریم. پاسخ‌های شما برای بررسی ارسال شد.
      </motion.p>

      <Button
        onClick={onReset}
        variant="outline"
        className="gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        بازگشت به خانه
      </Button>

      {/* Soleimani-2026 badge */}
      <p className="mt-12 font-mono text-xs text-muted-foreground">
        Soleimani-2026
      </p>
    </motion.div>
  );
}
