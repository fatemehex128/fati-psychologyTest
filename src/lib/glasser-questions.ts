// پرسشنامه نیازهای اساسی ویلیام گلاسر (William Glasser)
// ۵ بعد: بقا (Survival)، عشق و تعلق (Love & Belonging)، قدرت (Power)، آزادی (Freedom)، تفریح (Fun)
// بر اساس مقیاس ۵ درجه‌ای لیکنرت: ۱=هیچ‌وقت تا ۵=همیشه

export type NeedCategory =
  | "survival"
  | "love_belonging"
  | "power"
  | "freedom"
  | "fun";

export const NEED_CATEGORIES: Record<
  NeedCategory,
  { fa: string; en: string; color: string; description: string }
> = {
  survival: {
    fa: "بقا و زیستی",
    en: "Survival",
    color: "rose",
    description:
      "نیازهای فیزیولوژیک بنیادی شامل امنیت جسمی، تغذیه، سلامت و احساس امنیت در محیط.",
  },
  love_belonging: {
    fa: "عشق و تعلق",
    en: "Love & Belonging",
    color: "pink",
    description:
      "نیاز به ارتباط عاطفی، دوست‌یابی، عضویت در گروه و احساس پذیرفته شدن از سوی دیگران.",
  },
  power: {
    fa: "قدرت و ارزشمندی",
    en: "Power / Self-worth",
    color: "amber",
    description:
      "نیاز به احترام، موفقیت، کفایت، تأثیرگذاری و رسیدن به اهداف معنادار در زندگی.",
  },
  freedom: {
    fa: "آزادی و استقلال",
    en: "Freedom",
    color: "emerald",
    description:
      "نیاز به انتخاب، استقلال، خودمختاری، حرکت و فرار از محدودیت‌های تحمیلی دیگران.",
  },
  fun: {
    fa: "تفریح و لذت",
    en: "Fun & Enjoyment",
    color: "sky",
    description:
      "نیاز به بازی، شادی، یادگیری از طریق تفریح، خنده و تجربه‌های لذت‌بخش در زندگی روزمره.",
  },
};

export interface Question {
  id: number;
  category: NeedCategory;
  text: string;
}

// ۳۵ سؤال — ۷ سؤال برای هر یک از ۵ نیاز
export const QUESTIONS: Question[] = [
  // ===== بقا و زیستی (Survival) — ۱ تا ۷ =====
  {
    id: 1,
    category: "survival",
    text: "چقدر احساس امنیت جسمی و روانی در زندگی روزمره خود دارم؟",
  },
  {
    id: 2,
    category: "survival",
    text: "آیا به اندازه کافی برای تأمین نیازهای اولیه خودم (خوراک، مسکن، لباس) مطمئنم؟",
  },
  {
    id: 3,
    category: "survival",
    text: "چقدر از سلامت جسمانی خود رضایت دارم و آن را حفظ می‌کنم؟",
  },
  {
    id: 4,
    category: "survival",
    text: "آیا در محیطی زندگی می‌کنم که احساس آرامش و امنیت داشته باشم؟",
  },
  {
    id: 5,
    category: "survival",
    text: "چقدر نسبت به آینده مالی و شغلی خود احساس اطمینان دارم؟",
  },
  {
    id: 6,
    category: "survival",
    text: "آیا در صورت بروز مشکل، به افرادی اعتماد دارم که مرا حمایت کنند؟",
  },
  {
    id: 7,
    category: "survival",
    text: "چقدر از کیفیت خواب و استراحت خود رضایت دارم؟",
  },

  // ===== عشق و تعلق (Love & Belonging) — ۸ تا ۱۴ =====
  {
    id: 8,
    category: "love_belonging",
    text: "چقدر در زندگی روزمره احساس می‌کنم که دیگران دوستم دارند؟",
  },
  {
    id: 9,
    category: "love_belonging",
    text: "آیا در خانواده خود احساس تعلق و پذیرفته شدن می‌کنم؟",
  },
  {
    id: 10,
    category: "love_belonging",
    text: "چقدر دوستان صمیمی دارم که می‌توانم با آن‌ها رازهایم را در میان بگذارم؟",
  },
  {
    id: 11,
    category: "love_belonging",
    text: "آیا در گروه‌های اجتماعی (همکاران، هم‌کلاسی‌ها) احساس عضویت می‌کنم؟",
  },
  {
    id: 12,
    category: "love_belonging",
    text: "چقدر می‌توانم بدون ترس از طرد شدن، احساسات واقعی‌ام را بیان کنم؟",
  },
  {
    id: 13,
    category: "love_belonging",
    text: "آیا فردی وجود دارد که در هنگام تنهایی به یاد او احساس گرما کنید؟",
  },
  {
    id: 14,
    category: "love_belonging",
    text: "چقدر در روابط خود احساس نزدیکی عاطفی و صمیمیت می‌کنید؟",
  },

  // ===== قدرت و ارزشمندی (Power) — ۱۵ تا ۲۱ =====
  {
    id: 15,
    category: "power",
    text: "چقدر در زندگی خود احساس کفایت و شایستگی دارم؟",
  },
  {
    id: 16,
    category: "power",
    text: "آیا در محیط کار یا تحصیل از دستاوردهای خود احساس افتخار می‌کنم؟",
  },
  {
    id: 17,
    category: "power",
    text: "چقدر می‌توانم روی تصمیمات دیگران تأثیر بگذارم؟",
  },
  {
    id: 18,
    category: "power",
    text: "آیا احساس می‌کنم دیگران به مهارت‌ها و نظرم احترام می‌گذارند؟",
  },
  {
    id: 19,
    category: "power",
    text: "چقدر از موفقیت‌های گذشته خود در رسیدن به اهداف رضایت دارم؟",
  },
  {
    id: 20,
    category: "power",
    text: "آیا اهداف روشنی برای آینده دارم و در مسیر رسیدن به آن‌ها پیش می‌روم؟",
  },
  {
    id: 21,
    category: "power",
    text: "چقدر احساس می‌کنم در زندگی‌ام کنترل و تسلط دارم؟",
  },

  // ===== آزادی و استقلال (Freedom) — ۲۲ تا ۲۸ =====
  {
    id: 22,
    category: "freedom",
    text: "چقدر در تصمیم‌گیری‌های روزانه خود مستقل هستم؟",
  },
  {
    id: 23,
    category: "freedom",
    text: "آیا می‌توانم بدون اجازه دیگران، مسیر زندگی خود را انتخاب کنم؟",
  },
  {
    id: 24,
    category: "freedom",
    text: "چقدر آزادی عمل دارم تا کارهایی را که دوست دارم انجام دهم؟",
  },
  {
    id: 25,
    category: "freedom",
    text: "آیا در روابط خود حق انتخاب و رد کردن دارم؟",
  },
  {
    id: 26,
    category: "freedom",
    text: "چقدر از فشارها و الزامات محیطی محدود می‌شوم؟",
  },
  {
    id: 27,
    category: "freedom",
    text: "آیا می‌توانم در صورت نیاز، از موقعیت‌های ناراحت‌کننده کنار بکشم؟",
  },
  {
    id: 28,
    category: "freedom",
    text: "چقدر احساس می‌کنم صاحب زندگی و زمان خودم هستم؟",
  },

  // ===== تفریح و لذت (Fun) — ۲۹ تا ۳۵ =====
  {
    id: 29,
    category: "fun",
    text: "چقدر از زندگی روزمره خود لذت می‌برم؟",
  },
  {
    id: 30,
    category: "fun",
    text: "آیا وقت کافی برای تفریح و سرگرمی در زندگی اختصاص می‌دهم؟",
  },
  {
    id: 31,
    category: "fun",
    text: "چقدر فعالیت‌هایی دارم که باعث خنده و شادی واقعی من می‌شوند؟",
  },
  {
    id: 32,
    category: "fun",
    text: "آیا کارهای جدید و هیجان‌انگیز را امتحان می‌کنم؟",
  },
  {
    id: 33,
    category: "fun",
    text: "چقدر با انجام کارهای خلاقانه (نقاشی، موسیقی، ورزش) احساس لذت می‌کنم؟",
  },
  {
    id: 34,
    category: "fun",
    text: "آیا در محیط کار یا تحصیل، لحظات شادی را تجربه می‌کنم؟",
  },
  {
    id: 35,
    category: "fun",
    text: "چقدر از وقتم را به انجام کارهایی اختصاص می‌دهم که فقط برای خودم لذت‌بخش‌اند؟",
  },
];

export const LIKERT_OPTIONS = [
  { value: 1, label: "هیچ‌وقت", description: "تقریباً هرگز این احساس را ندارم" },
  { value: 2, label: "بندرت", description: "گاهی اوقات و کوتاه" },
  { value: 3, label: "گاهی", description: "در برخی موقعیت‌ها" },
  { value: 4, label: "اغلب", description: "در بیشتر مواقع" },
  { value: 5, label: "همیشه", description: "تقریباً همیشه و پایدار" },
] as const;

export const TOTAL_QUESTIONS = QUESTIONS.length;
