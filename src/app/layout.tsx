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
  title: "آکادمی پرورش‌گرافیک | پلتفرم آزمون‌های روان‌شناختی",
  description:
    "مجموعه آزمون‌های روان‌شناختی استاندارد: پرسشنامه نیازهای گلاسر، نئو (NEO PI-R) و میلون (MCMI-III). برای خودشناسی، ارزیابی شخصیت و رشد فردی.",
  keywords: [
    "پرسشنامه گلاسر",
    "آزمون نئو",
    "NEO PI-R",
    "آزمون میلون",
    "MCMI-III",
    "روان‌شناسی",
    "شخصیت‌شناسی",
    "آکادمی پرورش‌گرافیک",
  ],
  authors: [{ name: "آکادمی پرورش‌گرافیک" }],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
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
