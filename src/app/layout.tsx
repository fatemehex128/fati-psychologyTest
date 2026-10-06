import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "آکادمی پرورش‌گرافیک | پرسشنامه نیازهای گلاسر",
  description:
    "پرسشنامه ۳۵ سؤالی نیازهای اساسی ویلیام گلاسر — بقا، عشق و تعلق، قدرت، آزادی، تفریح. مرجع رسمی آکادمی پرورش‌گرافیک.",
  keywords: [
    "پرسشنامه گلاسر",
    "نیازهای گلاسر",
    "نظریه انتخاب",
    "واقعیت‌درمانی",
    "آکادمی پرورش‌گرافیک",
  ],
  authors: [{ name: "آکادمی پرورش‌گرافیک" }],
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body
        className={`${vazirmatn.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
