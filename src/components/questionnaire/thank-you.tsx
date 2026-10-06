"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThankYouProps {
  onReset: () => void;
}

export function ThankYou({ onReset }: ThankYouProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 text-center"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/40"
      >
        <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
      </motion.div>

      <h2 className="mb-2 text-xl font-bold text-foreground">
        پاسخ‌های شما ثبت شد
      </h2>

      <p className="mb-8 text-sm leading-6 text-muted-foreground">
        از تکمیل پرسشنامه سپاسگزاریم. پاسخ‌های شما برای تیم پژوهشی آکادمی پرورش‌گرافیک ارسال شد.
      </p>

      <Button
        onClick={onReset}
        variant="outline"
        className="gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        بازگشت به خانه
      </Button>
    </motion.div>
  );
}
