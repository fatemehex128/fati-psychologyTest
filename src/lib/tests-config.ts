// تنظیمات آزمون‌های مختلف سایت
import {
  QUESTIONS as GLASSER_QUESTIONS,
  NEED_CATEGORIES,
  LIKERT_OPTIONS as GLASSER_OPTIONS,
  type NeedCategory,
} from "./glasser-questions";
import {
  NEO_QUESTIONS,
  NEO_FACTORS,
  NEO_LIKERT_OPTIONS,
  type NeoFactor,
} from "./neo-questions";
import {
  MCMI_QUESTIONS,
  MCMI_SCALES,
  MCMI_RESPONSE_OPTIONS,
  type McmiScale,
} from "./mcmi-questions";

export type TestId = "glasser" | "neo" | "mcmi";

export interface TestConfig {
  id: TestId;
  faName: string;
  enName: string;
  author: string;
  shortDescription: string;
  longDescription: string;
  questionCount: number;
  estimatedTime: string;
  color: "rose" | "emerald" | "violet";
  gradient: string;
  accentColor: string;
  iconName: "hands" | "brain" | "mask";
  scales: Record<string, { fa: string; en: string; description: string }>;
  likertOptions: readonly { value: number; label: string; description: string }[];
  questions: { id: number; text: string; category?: string }[];
}

export const TESTS: Record<TestId, TestConfig> = {
  glasser: {
    id: "glasser",
    faName: "پرسشنامه نیازهای گلاسر",
    enName: "Glasser Needs Questionnaire",
    author: "ویلیام گلاسر",
    shortDescription:
      "سنجش میزان ارضای پنج نیاز اساسی انسان: بقا، عشق و تعلق، قدرت، آزادی و تفریح.",
    longDescription:
      "این پرسشنامه بر اساس نظریه انتخاب ویلیام گلاسر طراحی شده و به بررسی میزان اهمیت و ارضای پنج نیاز اساسی در زندگی شما می‌پردازد. هر نیاز با ۷ سؤال سنجیده می‌شود و در پایان می‌توانید ببینید کدام نیازها در زندگی شما برجسته‌تر هستند.",
    questionCount: GLASSER_QUESTIONS.length,
    estimatedTime: "۵ تا ۱۰ دقیقه",
    color: "rose",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    accentColor: "#e11d48",
    iconName: "hands",
    scales: Object.fromEntries(
      Object.entries(NEED_CATEGORIES).map(([k, v]) => [
        k,
        { fa: v.fa, en: v.en, description: v.description },
      ])
    ) as Record<string, { fa: string; en: string; description: string }>,
    likertOptions: GLASSER_OPTIONS,
    questions: GLASSER_QUESTIONS.map((q) => ({
      id: q.id,
      text: q.text,
      category: q.category,
    })),
  },
  neo: {
    id: "neo",
    faName: "پرسشنامه نئو (NEO PI-R)",
    enName: "NEO Personality Inventory",
    author: "کاستا و مک‌کری",
    shortDescription:
      "سنجش پنج عامل بزرگ شخصیت: روان‌رنجوری، برون‌گرایی، گشودگی، سازگاری و وظیفه‌شناسی.",
    longDescription:
      "این پرسشنامه بر اساس مدل پنج عاملی شخصیت طراحی شده و یکی از معتبرترین ابزارهای سنجش شخصیت در جهان است. هر عامل با ۶ سرفصل و ۸ سؤال برای هر سرفصل، در مجموع ۲۴۰ سؤال را شامل می‌شود. این آزمون تصویری جامع از ویژگی‌های شخصیتی شما ارائه می‌دهد.",
    questionCount: NEO_QUESTIONS.length,
    estimatedTime: "۳۰ تا ۴۰ دقیقه",
    color: "emerald",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    accentColor: "#059669",
    iconName: "brain",
    scales: Object.fromEntries(
      Object.entries(NEO_FACTORS).map(([k, v]) => [
        k,
        { fa: v.fa, en: v.en, description: v.description },
      ])
    ) as Record<string, { fa: string; en: string; description: string }>,
    likertOptions: NEO_LIKERT_OPTIONS,
    questions: NEO_QUESTIONS.map((q) => ({
      id: q.id,
      text: q.text,
      category: q.factor,
    })),
  },
  mcmi: {
    id: "mcmi",
    faName: "پرسشنامه میلون (MCMI-III)",
    enName: "Millon Clinical Multiaxial Inventory",
    author: "تئودور میلون",
    shortDescription:
      "سنجش الگوهای شخصیتی بالینی و سندرم‌های روان‌شناختی بر اساس نظریه میلون.",
    longDescription:
      "این پرسشنامه برای ارزیابی الگوهای شخصیتی و سندرم‌های بالینی طراحی شده و شامل ۱۴ الگوی شخصیتی و ۱۰ سندرم بالینی است. این آزمون معمولاً در محیط‌های بالینی و مشاوره‌ای استفاده می‌شود و پاسخ‌ها به‌صورت بله/خیر ثبت می‌شوند.",
    questionCount: MCMI_QUESTIONS.length,
    estimatedTime: "۲۰ تا ۳۰ دقیقه",
    color: "violet",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    accentColor: "#7c3aed",
    iconName: "mask",
    scales: Object.fromEntries(
      Object.entries(MCMI_SCALES).map(([k, v]) => [
        k,
        { fa: v.fa, en: v.en, description: v.description },
      ])
    ) as Record<string, { fa: string; en: string; description: string }>,
    likertOptions: MCMI_RESPONSE_OPTIONS,
    questions: MCMI_QUESTIONS.map((q) => ({
      id: q.id,
      text: q.text,
    })),
  },
};

export const TEST_LIST = Object.values(TESTS);

// FormSubmit email config
export const FORMSUBMIT_EMAIL = "fatemehex128@gmail.com";
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`;
