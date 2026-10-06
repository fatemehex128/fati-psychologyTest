"use client";

import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThankYouProps {
  onReset: () => void;
}

export function ThankYou({ onReset }: ThankYouProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-4 py-12"
    >
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-8 text-center shadow-lg">
        {/* Decorative gradient */}
        <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
        <div className="absolute inset-x-0 -bottom-24 h-48 bg-gradient-to-t from-amber-200/20 to-transparent blur-3xl" />

        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-amber-500 shadow-lg"
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>

          <h2 className="mb-2 text-2xl font-bold text-foreground">
            پاسخ‌های شما با موفقیت ثبت شد
          </h2>
          <p className="mb-6 text-muted-foreground leading-7">
            از وقت و دقت شما در تکمیل این پرسشنامه سپاسگزاریم. پاسخ‌های شما برای تحلیل توسط تیم پژوهشی{" "}
            <span className="font-semibold text-primary">آکادمی پرورش‌گرافیک</span> ارسال شد و در اسرع وقت بررسی خواهد شد.
          </p>

          <div className="mb-6 rounded-2xl bg-accent/50 p-4 text-right">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Mail className="h-4 w-4 text-primary" />
              اطلاعات تماس با شما ثبت شد
            </div>
            <p className="text-xs leading-6 text-muted-foreground">
              در صورت نیاز، تیم پژوهشی ما حداکثر ظرف ۷۲ ساعت آینده با شما تماس خواهد گرفت. لطفاً صندوق ورودی ایمیل خود (و پوشه اسپم) را بررسی کنید.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>با احترام،</span>
            <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
            <span>تیم آکادمی پرورش‌گرافیک</span>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              onClick={onReset}
              variant="outline"
              className="w-full sm:w-auto gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              تکمیل مجدد پرسشنامه
            </Button>
            <a href="/" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full gap-2">
                بازگشت به صفحه اصلی
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
