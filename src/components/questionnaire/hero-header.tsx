"use client";

import Image from "next/image";
import { Sparkles, BookOpen, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function HeroHeader() {
  return (
    <header className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/40 to-transparent" />
      <div className="absolute -top-32 right-1/4 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 pt-10 pb-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex justify-center"
        >
          <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-md ring-1 ring-primary/20 sm:h-24 sm:w-24">
            <Image
              src="/logo.png"
              alt="لوگو آکادمی پرورش‌گرافیک"
              fill
              priority
              sizes="96px"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            آکادمی پرورش‌گرافیک
          </div>

          <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-4xl">
            پرسشنامه نیازهای اساسی گلاسر
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            ابزار سنجش بر اساس نظریه انتخاب ویلیام گلاسر، با هدف بررسی میزان ارضای{" "}
            <span className="font-medium text-foreground">پنج نیاز اساسی انسان</span> شامل بقا، عشق و تعلق، قدرت، آزادی و تفریح در زندگی شما.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span>۳۵ سؤال استاندارد</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>۵ تا ۱۰ دقیقه</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-primary fill-primary" />
              <span>کاملاً محرمانه</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
