// پرسشنامه شخصیت‌شناسی نئو (NEO PI-R) — فرم بلند ۲۴۰ سؤالی
// Costa & McCrae — ۵ عامل بزرگ شخصیت × ۶ سرفصل × ۸ سؤال = ۲۴۰ سؤال
// مقیاس ۵ درجه‌ای لیکنرت: ۱=کاملاً مخالفم تا ۵=کاملاً موافقم

export type NeoFactor =
  | "neuroticism" // روان‌رنجوری (N)
  | "extraversion" // برون‌گرایی (E)
  | "openness" // گشودگی به تجربه (O)
  | "agreeableness" // سازگاری (A)
  | "conscientiousness"; // وظیفه‌شناسی (C)

export const NEO_FACTORS: Record<
  NeoFactor,
  {
    fa: string;
    en: string;
    symbol: string;
    color: string;
    description: string;
    facets: { key: string; fa: string; en: string }[];
  }
> = {
  neuroticism: {
    fa: "روان‌رنجوری",
    en: "Neuroticism",
    symbol: "N",
    color: "rose",
    description: "تمایل به تجربه هیجانات منفی مانند ترس، غم، خشم، گناه و استرس. افراد با نمره بالا حساس، نگران و زودرنج هستند.",
    facets: [
      { key: "N1", fa: "اضطراب", en: "Anxiety" },
      { key: "N2", fa: "خشم و کینه", en: "Angry Hostility" },
      { key: "N3", fa: "افسردگی", en: "Depression" },
      { key: "N4", fa: "خودآگاهی", en: "Self-Consciousness" },
      { key: "N5", fa: "بی‌اختیاری و تکانشگری", en: "Impulsiveness" },
      { key: "N6", fa: "آسیب‌پذیری", en: "Vulnerability" },
    ],
  },
  extraversion: {
    fa: "برون‌گرایی",
    en: "Extraversion",
    symbol: "E",
    color: "amber",
    description: "انرژی و گرایش به دنیای بیرون، فعالیت اجتماعی، مثبت‌اندیشی و جستجوی هیجان. افراد با نمره بالا پرانرژی و اجتماعی هستند.",
    facets: [
      { key: "E1", fa: "صمیمیت", en: "Warmth" },
      { key: "E2", fa: "جامعه‌پذیری", en: "Gregariousness" },
      { key: "E3", fa: "جسارت و قاطعیت", en: "Assertiveness" },
      { key: "E4", fa: "فعالیت", en: "Activity" },
      { key: "E5", fa: "جستجوی هیجان", en: "Excitement-Seeking" },
      { key: "E6", fa: "خوش‌بینی", en: "Positive Emotions" },
    ],
  },
  openness: {
    fa: "گشودگی به تجربه",
    en: "Openness",
    symbol: "O",
    color: "violet",
    description: "تمایل به تجربه‌های جدید، تخیل، زیبایی‌شناسی، احساسات عمیق، ارزش‌ها و ایده‌های نو. افراد با نمره بالا خلاق و کنجکاو هستند.",
    facets: [
      { key: "O1", fa: "تخیل", en: "Fantasy" },
      { key: "O2", fa: "زیبایی‌شناسی", en: "Aesthetics" },
      { key: "O3", fa: "احساسات", en: "Feelings" },
      { key: "O4", fa: "فعالیت‌ها", en: "Actions" },
      { key: "O5", fa: "ایده‌ها", en: "Ideas" },
      { key: "O6", fa: "ارزش‌ها", en: "Values" },
    ],
  },
  agreeableness: {
    fa: "سازگاری",
    en: "Agreeableness",
    symbol: "A",
    color: "emerald",
    description: "گرایش به اعتماد، صادق بودن، نوع‌دوستی، مدارا و تواضع. افراد با نمره بالا مهربان، همکاری‌کننده و دلسوز هستند.",
    facets: [
      { key: "A1", fa: "اعتماد", en: "Trust" },
      { key: "A2", fa: "صداقت", en: "Straightforwardness" },
      { key: "A3", fa: "نوع‌دوستی", en: "Altruism" },
      { key: "A4", fa: "همکاری", en: "Compliance" },
      { key: "A5", fa: "تواضع", en: "Modesty" },
      { key: "A6", fa: "همدلی", en: "Tender-Mindedness" },
    ],
  },
  conscientiousness: {
    fa: "وظیفه‌شناسی",
    en: "Conscientiousness",
    symbol: "C",
    color: "sky",
    description: "گرایش به نظم، نظم‌مندی، مسئولیت‌پذیری، هدف‌گذاری و اراده. افراد با نمره بالا سازمان‌یافته، با‌انگیزه و قابل اتکا هستند.",
    facets: [
      { key: "C1", fa: "صلاحیت", en: "Competence" },
      { key: "C2", fa: "نظم", en: "Order" },
      { key: "C3", fa: "احساس وظیفه", en: "Dutifulness" },
      { key: "C4", fa: "موفقیت‌طلبی", en: "Achievement Striving" },
      { key: "C5", fa: "خودکارآمدی", en: "Self-Discipline" },
      { key: "C6", fa: "محتاط‌بودن", en: "Deliberation" },
    ],
  },
};

export interface NeoQuestion {
  id: number;
  factor: NeoFactor;
  facet: string;
  text: string;
  reverseScored: boolean; // آیا سؤال معکوس نمره‌گذاری می‌شود
}

// ۲۴۰ سؤال NEO PI-R
// برای هر سؤال یک عبارت ساده و معتبر بر اساس مدل NEO نوشته شده
export const NEO_QUESTIONS: NeoQuestion[] = [
  // ===== N1: اضطراب (۸ سؤال) =====
  { id: 1, factor: "neuroticism", facet: "N1", text: "اغلب احساس می‌کنم پر از نگرانی‌ام.", reverseScored: false },
  { id: 2, factor: "neuroticism", facet: "N1", text: "وقتی تحت فشار هستم، نمی‌توانم بخوابم.", reverseScored: false },
  { id: 3, factor: "neuroticism", facet: "N1", text: "نسبت به آینده اغلب بدبین و مضطرب هستم.", reverseScored: false },
  { id: 4, factor: "neuroticism", facet: "N1", text: "آرامش و خونسردی در شرایط دشوار برایم سخت است.", reverseScored: false },
  { id: 5, factor: "neuroticism", facet: "N1", text: "نسبت به مسایل کوچک بیش از حد حساس هستم.", reverseScored: false },
  { id: 6, factor: "neuroticism", facet: "N1", text: "هیجان‌های درونی من اغلب آشفته و نگران‌کننده است.", reverseScored: false },
  { id: 7, factor: "neuroticism", facet: "N1", text: "نسبت به آینده آرام و مطمئن هستم.", reverseScored: true },
  { id: 8, factor: "neuroticism", facet: "N1", text: "به‌سختی می‌توانم نگرانی‌هایم را کنترل کنم.", reverseScored: false },

  // ===== N2: خشم و کینه (۸ سؤال) =====
  { id: 9, factor: "neuroticism", facet: "N2", text: "گاهی از کوره درمی‌روم.", reverseScored: false },
  { id: 10, factor: "neuroticism", facet: "N2", text: "وقتی عصبانی می‌شوم، مدت زیادی طول می‌کشد تا آرام شوم.", reverseScored: false },
  { id: 11, factor: "neuroticism", facet: "N2", text: "حسادت و کینه در من زیاد است.", reverseScored: false },
  { id: 12, factor: "neuroticism", facet: "N2", text: "وقتی کسی با من مخالفت می‌کند، عصبانی می‌شوم.", reverseScored: false },
  { id: 13, factor: "neuroticism", facet: "N2", text: "به‌سختی می‌توانم کینه و خشم درونی‌ام را ابراز کنم.", reverseScored: false },
  { id: 14, factor: "neuroticism", facet: "N2", text: "آرام و خونسرد باقی می‌مانم حتی وقتی دیگران خشمگین هستند.", reverseScored: true },
  { id: 15, factor: "neuroticism", facet: "N2", text: "گاهی احساس می‌کنم دیگران مرا عمداً اذیت می‌کنند.", reverseScored: false },
  { id: 16, factor: "neuroticism", facet: "N2", text: "میان خشم و آرامش، اغلب خشم بر من غالب است.", reverseScored: false },

  // ===== N3: افسردگی (۸ سؤال) =====
  { id: 17, factor: "neuroticism", facet: "N3", text: "اغلب احساس غم و دلتنگی می‌کنم.", reverseScored: false },
  { id: 18, factor: "neuroticism", facet: "N3", text: "گاهی احساس می‌کنم زندگی بی‌معناست.", reverseScored: false },
  { id: 19, factor: "neuroticism", facet: "N3", text: "انرژی و انگیزه‌ام را از دست داده‌ام.", reverseScored: false },
  { id: 20, factor: "neuroticism", facet: "N3", text: "خوشحال و سرزنده هستم.", reverseScored: true },
  { id: 21, factor: "neuroticism", facet: "N3", text: "احساس می‌کنم ارزش زیادی برای خود و دیگران ندارم.", reverseScored: false },
  { id: 22, factor: "neuroticism", facet: "N3", text: "اغلب به گذشته فکر می‌کنم و حسرت می‌خورم.", reverseScored: false },
  { id: 23, factor: "neuroticism", facet: "N3", text: "گاهی گریه می‌کنم بدون اینکه دلیل مشخصی داشته باشم.", reverseScored: false },
  { id: 24, factor: "neuroticism", facet: "N3", text: "حال عمومی من اغلب خوب و مثبت است.", reverseScored: true },

  // ===== N4: خودآگاهی (۸ سؤال) =====
  { id: 25, factor: "neuroticism", facet: "N4", text: "در جمع‌ها احساس خجالت و شرم می‌کنم.", reverseScored: false },
  { id: 26, factor: "neuroticism", facet: "N4", text: "همیشه نگرانم که دیگران چه فکری درباره من می‌کنند.", reverseScored: false },
  { id: 27, factor: "neuroticism", facet: "N4", text: "وقتی در میان جمع صحبت می‌کنم، مضطرب می‌شوم.", reverseScored: false },
  { id: 28, factor: "neuroticism", facet: "N4", text: "خودآگاهی و درون‌نگری در من زیاد است.", reverseScored: false },
  { id: 29, factor: "neuroticism", facet: "N4", text: "آسودگی دارم در موقعیت‌های اجتماعی جدید.", reverseScored: true },
  { id: 30, factor: "neuroticism", facet: "N4", text: "احساس می‌کنم دیگران از من بهتر هستند.", reverseScored: false },
  { id: 31, factor: "neuroticism", facet: "N4", text: "از اینکه نادیده گرفته شوم می‌ترسم.", reverseScored: false },
  { id: 32, factor: "neuroticism", facet: "N4", text: "وقتی کار اشتباهی می‌کنم، مدت‌ها خودم را سرزنش می‌کنم.", reverseScored: false },

  // ===== N5: بی‌اختیاری و تکانشگری (۸ سؤال) =====
  { id: 33, factor: "neuroticism", facet: "N5", text: "گاهی بدون فکر، کارهایی می‌کنم که بعداً پشیمان می‌شوم.", reverseScored: false },
  { id: 34, factor: "neuroticism", facet: "N5", text: "کنترل تکانه‌هایم برایم سخت است.", reverseScored: false },
  { id: 35, factor: "neuroticism", facet: "N5", text: "وقتی چیزی می‌خواهم، نمی‌توانم صبر کنم.", reverseScored: false },
  { id: 36, factor: "neuroticism", facet: "N5", text: "می‌توانم وسوسه‌ها را به‌راحتی کنار بگذارم.", reverseScored: true },
  { id: 37, factor: "neuroticism", facet: "N5", text: "اغلب بی‌گدار به آب می‌زنم.", reverseScored: false },
  { id: 38, factor: "neuroticism", facet: "N5", text: "از تصمیم‌های آنی و سریع پرهیز می‌کنم.", reverseScored: true },
  { id: 39, factor: "neuroticism", facet: "N5", text: "گاهی به دلیل تکانشگری، در دردسر می‌افتم.", reverseScored: false },
  { id: 40, factor: "neuroticism", facet: "N5", text: "قبل از عمل کردن، خوب فکر می‌کنم.", reverseScored: true },

  // ===== N6: آسیب‌پذیری (۸ سؤال) =====
  { id: 41, factor: "neuroticism", facet: "N6", text: "در شرایط بحرانی، کنترل خود را از دست می‌دهم.", reverseScored: false },
  { id: 42, factor: "neuroticism", facet: "N6", text: "فشارهای زندگی برایم غیرقابل تحمل است.", reverseScored: false },
  { id: 43, factor: "neuroticism", facet: "N6", text: "با مشکل روبرو می‌شوم، احساس بی‌کسی می‌کنم.", reverseScored: false },
  { id: 44, factor: "neuroticism", facet: "N6", text: "بحران‌ها را به‌سختی مدیریت می‌کنم.", reverseScored: false },
  { id: 45, factor: "neuroticism", facet: "N6", text: "اعتمادبه‌نفس بالایی در شرایط سخت دارم.", reverseScored: true },
  { id: 46, factor: "neuroticism", facet: "N6", text: "به‌سختی با استرس کنار می‌آیم.", reverseScored: false },
  { id: 47, factor: "neuroticism", facet: "N6", text: "در مواقع اضطراری می‌توانم تصمیم بگیرم.", reverseScored: true },
  { id: 48, factor: "neuroticism", facet: "N6", text: "احساس می‌کنم در برابر فشارها شکننده‌ام.", reverseScored: false },

  // ===== E1: صمیمیت (۸ سؤال) =====
  { id: 49, factor: "extraversion", facet: "E1", text: "با دیگران به‌راحتی صمیمی می‌شوم.", reverseScored: false },
  { id: 50, factor: "extraversion", facet: "E1", text: "برای دوستانم وقت و انرژی زیادی می‌گذارم.", reverseScored: false },
  { id: 51, factor: "extraversion", facet: "E1", text: "آدم گرم و مهربانی هستم.", reverseScored: false },
  { id: 52, factor: "extraversion", facet: "E1", text: "اگر کسی کمک بخواهد، با کمال میل کمک می‌کنم.", reverseScored: false },
  { id: 53, factor: "extraversion", facet: "E1", text: "با غریبه‌ها سرد و دور هستم.", reverseScored: true },
  { id: 54, factor: "extraversion", facet: "E1", text: "از اینکه با دیگران هستم لذت می‌برم.", reverseScored: false },
  { id: 55, factor: "extraversion", facet: "E1", text: "روابط صمیمی را دوست دارم.", reverseScored: false },
  { id: 56, factor: "extraversion", facet: "E1", text: "اغلب از دیگران می‌گذرم و تنها می‌مانم.", reverseScored: true },

  // ===== E2: جامعه‌پذیری (۸ سؤال) =====
  { id: 57, factor: "extraversion", facet: "E2", text: "از مهمانی‌ها و مجالس شلوغ لذت می‌برم.", reverseScored: false },
  { id: 58, factor: "extraversion", facet: "E2", text: "ترجیح می‌دهم تنها باشم تا با جمع.", reverseScored: true },
  { id: 59, factor: "extraversion", facet: "E2", text: "آدم بسیار اجتماعی‌ام.", reverseScored: false },
  { id: 60, factor: "extraversion", facet: "E2", text: "در جمع احساس راحتی می‌کنم.", reverseScored: false },
  { id: 61, factor: "extraversion", facet: "E2", text: "تنهایی برایم بازآفرینی است، نه جمع.", reverseScored: true },
  { id: 62, factor: "extraversion", facet: "E2", text: "در یک هفته چند بار با دوستانم بیرون می‌روم.", reverseScored: false },
  { id: 63, factor: "extraversion", facet: "E2", text: "آدم خانه‌نشینی هستم.", reverseScored: true },
  { id: 64, factor: "extraversion", facet: "E2", text: "از جمع‌گذاری و دورهمی‌ها لذت می‌برم.", reverseScored: false },

  // ===== E3: جسارت و قاطعیت (۸ سؤال) =====
  { id: 65, factor: "extraversion", facet: "E3", text: "در جمع حرف دلم را راحت می‌زنم.", reverseScored: false },
  { id: 66, factor: "extraversion", facet: "E3", text: "اگر کاری لازم باشد، خودم رهبری می‌کنم.", reverseScored: false },
  { id: 67, factor: "extraversion", facet: "E3", text: "در برخورد با افراد مسلط، عقده‌ای می‌شوم.", reverseScored: true },
  { id: 68, factor: "extraversion", facet: "E3", text: "از داشتن نظر مخالف نمی‌هراسم.", reverseScored: false },
  { id: 69, factor: "extraversion", facet: "E3", text: "در بحث‌ها اغلب ساکت می‌مانم.", reverseScored: true },
  { id: 70, factor: "extraversion", facet: "E3", text: "اگر کسی حقم را نگیرد، اعتراض می‌کنم.", reverseScored: false },
  { id: 71, factor: "extraversion", facet: "E3", text: "خجالت درونی دارم که جلوی جمع حرف بزنم.", reverseScored: true },
  { id: 72, factor: "extraversion", facet: "E3", text: "جسارت و قاطعیت در من زیاد است.", reverseScored: false },

  // ===== E4: فعالیت (۸ سؤال) =====
  { id: 73, factor: "extraversion", facet: "E4", text: "همیشه در حال انجام کاری هستم.", reverseScored: false },
  { id: 74, factor: "extraversion", facet: "E4", text: "انرژی بالایی برای کارهای روزمره دارم.", reverseScored: false },
  { id: 75, factor: "extraversion", facet: "E4", text: "ترجیح می‌دهم آهسته و با آرامش کار کنم.", reverseScored: true },
  { id: 76, factor: "extraversion", facet: "E4", text: "از سرعت و ریتم بالای زندگی لذت می‌برم.", reverseScored: false },
  { id: 77, factor: "extraversion", facet: "E4", text: "به‌سختی بیکار می‌نشینم.", reverseScored: false },
  { id: 78, factor: "extraversion", facet: "E4", text: "هدف‌مند و پرانرژی‌ام.", reverseScored: false },
  { id: 79, factor: "extraversion", facet: "E4", text: "تنبلی در من زیاد است.", reverseScored: true },
  { id: 80, factor: "extraversion", facet: "E4", text: "چند کار را هم‌زمان انجام می‌دهم.", reverseScored: false },

  // ===== E5: جستجوی هیجان (۸ سؤال) =====
  { id: 81, factor: "extraversion", facet: "E5", text: "از کارهای پر هیجان و خطرناک لذت می‌برم.", reverseScored: false },
  { id: 82, factor: "extraversion", facet: "E5", text: "از رنگ‌های جیغ و روشن خوشم می‌آید.", reverseScored: false },
  { id: 83, factor: "extraversion", facet: "E5", text: "از تجربه‌های جدید و ناشناخته می‌ترسم.", reverseScored: true },
  { id: 84, factor: "extraversion", facet: "E5", text: "به‌دنبال هیجان و تازگی هستم.", reverseScored: false },
  { id: 85, factor: "extraversion", facet: "E5", text: "از ورزش‌های پرتحرک و پرخطر لذت می‌برم.", reverseScored: false },
  { id: 86, factor: "extraversion", facet: "E5", text: "تنوع و نوآوری را دوست دارم.", reverseScored: false },
  { id: 87, factor: "extraversion", facet: "E5", text: "به کارهای روزمره و تکراری علاقه ندارم.", reverseScored: false },
  { id: 88, factor: "extraversion", facet: "E5", text: "از کارهای روتین و آرام خوشم می‌آید.", reverseScored: true },

  // ===== E6: خوش‌بینی (۸ سؤال) =====
  { id: 89, factor: "extraversion", facet: "E6", text: "اغلب احساس شادی و نشاط می‌کنم.", reverseScored: false },
  { id: 90, factor: "extraversion", facet: "E6", text: "آدم خوش‌بینی هستم.", reverseScored: false },
  { id: 91, factor: "extraversion", facet: "E6", text: "به‌راحتی می‌خندم.", reverseScored: false },
  { id: 92, factor: "extraversion", facet: "E6", text: "با وجود سختی‌ها، امید را از دست نمی‌دهم.", reverseScored: false },
  { id: 93, factor: "extraversion", facet: "E6", text: "آروم و خونسردم.", reverseScored: true },
  { id: 94, factor: "extraversion", facet: "E6", text: "از حضور در جمع‌های شاد لذت می‌برم.", reverseScored: false },
  { id: 95, factor: "extraversion", facet: "E6", text: "اغلب احساس خمودی و غم می‌کنم.", reverseScored: true },
  { id: 96, factor: "extraversion", facet: "E6", text: "تمایل زیادی به خنده و شوخی دارم.", reverseScored: false },

  // ===== O1: تخیل (۸ سؤال) =====
  { id: 97, factor: "openness", facet: "O1", text: "تخیل و رویاپردازی را دوست دارم.", reverseScored: false },
  { id: 98, factor: "openness", facet: "O1", text: "اغلب در دنیای خیالاتم غرق می‌شوم.", reverseScored: false },
  { id: 99, factor: "openness", facet: "O1", text: "واقع‌بین هستم و کمتر تخیل می‌کنم.", reverseScored: true },
  { id: 100, factor: "openness", facet: "O1", text: "داستان‌های تخیلی و علمی-تخیلی را دوست دارم.", reverseScored: false },
  { id: 101, factor: "openness", facet: "O1", text: "از رویاپردازی لذت می‌برم.", reverseScored: false },
  { id: 102, factor: "openness", facet: "O1", text: "حافظه و تصویرسازی ذهنی قوی دارم.", reverseScored: false },
  { id: 103, factor: "openness", facet: "O1", text: "به جزئیات واقعی توجه می‌کنم نه خیالی.", reverseScored: true },
  { id: 104, factor: "openness", facet: "O1", text: "ذهنم پر از ایده‌های خلاقانه است.", reverseScored: false },

  // ===== O2: زیبایی‌شناسی (۸ سؤال) =====
  { id: 105, factor: "openness", facet: "O2", text: "از هنر و موسیقی لذت می‌برم.", reverseScored: false },
  { id: 106, factor: "openness", facet: "O2", text: "زیبایی طبیعت برایم مهم است.", reverseScored: false },
  { id: 107, factor: "openness", facet: "O2", text: "به هنرهای تجسمی و موسیقی علاقه چندانی ندارم.", reverseScored: true },
  { id: 108, factor: "openness", facet: "O2", text: "از دیدن آثار هنری هیجان می‌گیرم.", reverseScored: false },
  { id: 109, factor: "openness", facet: "O2", text: "از شعر و ادبیات زیبا لذت می‌برم.", reverseScored: false },
  { id: 110, factor: "openness", facet: "O2", text: "معماری و طراحی داخلی برایم جذاب است.", reverseScored: false },
  { id: 111, factor: "openness", facet: "O2", text: "اگر چیزی کاربردی نباشد، برایم ارزشی ندارد.", reverseScored: true },
  { id: 112, factor: "openness", facet: "O2", text: "هنگام مواجهه با زیبایی، عمیقاً تحت تأثیر قرار می‌گیرم.", reverseScored: false },

  // ===== O3: احساسات (۸ سؤال) =====
  { id: 113, factor: "openness", facet: "O3", text: "با احساسات درونی‌ام عمیقاً در تماسم.", reverseScored: false },
  { id: 114, factor: "openness", facet: "O3", text: "احساسات دیگران را به‌راحتی درک می‌کنم.", reverseScored: false },
  { id: 115, factor: "openness", facet: "O3", text: "از ابراز احساسات خود نمی‌ترسم.", reverseScored: false },
  { id: 116, factor: "openness", facet: "O3", text: "احساساتم را پنهان می‌کنم.", reverseScored: true },
  { id: 117, factor: "openness", facet: "O3", text: "از شدت احساساتم گاهی غافلگیر می‌شوم.", reverseScored: false },
  { id: 118, factor: "openness", facet: "O3", text: "احساساتم را تحلیل و درک می‌کنم.", reverseScored: false },
  { id: 119, factor: "openness", facet: "O3", text: "عقل و منطق بر احساس غلبه دارد.", reverseScored: true },
  { id: 120, factor: "openness", facet: "O3", text: "عمق احساسی بالایی دارم.", reverseScored: false },

  // ===== O4: فعالیت‌ها (۸ سؤال) =====
  { id: 121, factor: "openness", facet: "O4", text: "از امتحان کارهای جدید لذت می‌برم.", reverseScored: false },
  { id: 122, factor: "openness", facet: "O4", text: "به دنبال تنوع در زندگی هستم.", reverseScored: false },
  { id: 123, factor: "openness", facet: "O4", text: "روتین و عادت را ترجیح می‌دهم.", reverseScored: true },
  { id: 124, factor: "openness", facet: "O4", text: "اگر روشی قدیمی جواب می‌دهد، روش جدید را امتحان نمی‌کنم.", reverseScored: true },
  { id: 125, factor: "openness", facet: "O4", text: "از تغییر و تنوع می‌ترسم.", reverseScored: true },
  { id: 126, factor: "openness", facet: "O4", text: "مسیرهای جدید را کشف می‌کنم.", reverseScored: false },
  { id: 127, factor: "openness", facet: "O4", text: "به سنت‌ها پایبندم و از آن‌ها خارج نمی‌شوم.", reverseScored: true },
  { id: 128, factor: "openness", facet: "O4", text: "تجربه‌های تازه بخش مهمی از زندگی من است.", reverseScored: false },

  // ===== O5: ایده‌ها (۸ سؤال) =====
  { id: 129, factor: "openness", facet: "O5", text: "از بحث فکری و فلسفی لذت می‌برم.", reverseScored: false },
  { id: 130, factor: "openness", facet: "O5", text: "از حل مسئله و چالش فکری خوشم می‌آید.", reverseScored: false },
  { id: 131, factor: "openness", facet: "O5", text: "به نظریه‌های جدید علاقه دارم.", reverseScored: false },
  { id: 132, factor: "openness", facet: "O5", text: "از مطالعه کتاب‌های فکری و نظری لذت می‌برم.", reverseScored: false },
  { id: 133, factor: "openness", facet: "O5", text: "به ایده‌های انتزاعی علاقه‌مندم.", reverseScored: false },
  { id: 134, factor: "openness", facet: "O5", text: "فقط به چیزهای ملموس و عملی فکر می‌کنم.", reverseScored: true },
  { id: 135, factor: "openness", facet: "O5", text: "بحث‌های نظری را وقت تلف کردن می‌دانم.", reverseScored: true },
  { id: 136, factor: "openness", facet: "O5", text: "ذهن تحلیلی و کنجکاو دارم.", reverseScored: false },

  // ===== O6: ارزش‌ها (۸ سؤال) =====
  { id: 137, factor: "openness", facet: "O6", text: "آماده‌ام ارزش‌هایم را زیر سؤال ببرم.", reverseScored: false },
  { id: 138, factor: "openness", facet: "O6", text: "آزادی فردی را بر نظم اجتماعی ترجیح می‌دهم.", reverseScored: false },
  { id: 139, factor: "openness", facet: "O6", text: "باورهایم را تغییر می‌دهم اگر دلیل قانع‌کننده‌ای داشته باشد.", reverseScored: false },
  { id: 140, factor: "openness", facet: "O6", text: "به سنت‌ها پایبندم و آن‌ها را تغییر نمی‌دهم.", reverseScored: true },
  { id: 141, factor: "openness", facet: "O6", text: "از تابوهای اجتماعی می‌ترسم و آن‌ها را می‌پذیرم.", reverseScored: true },
  { id: 142, factor: "openness", facet: "O6", text: "از نگاه متفاوت به مسایل نمی‌هراسم.", reverseScored: false },
  { id: 143, factor: "openness", facet: "O6", text: "سیستم‌های سنتی را به نوآورانه ترجیح می‌دهم.", reverseScored: true },
  { id: 144, factor: "openness", facet: "O6", text: "آزادی بیان و تفکر برایم بسیار مهم است.", reverseScored: false },

  // ===== A1: اعتماد (۸ سؤال) =====
  { id: 145, factor: "agreeableness", facet: "A1", text: "به دیگران اعتماد دارم.", reverseScored: false },
  { id: 146, factor: "agreeableness", facet: "A1", text: "اعتقاد دارم بیشتر آدم‌ها خوب و قابل اعتمادند.", reverseScored: false },
  { id: 147, factor: "agreeableness", facet: "A1", text: "به نیات دیگران شک دارم.", reverseScored: true },
  { id: 148, factor: "agreeableness", facet: "A1", text: "گمان می‌کنم دیگران در پی سوءاستفاده از من هستند.", reverseScored: true },
  { id: 149, factor: "agreeableness", facet: "A1", text: "وقتی کسی به من مهربانی می‌کند، شک می‌کنم.", reverseScored: true },
  { id: 150, factor: "agreeableness", facet: "A1", text: "به‌راحتی به دیگران اعتماد می‌کنم.", reverseScored: false },
  { id: 151, factor: "agreeableness", facet: "A1", text: "آدم‌ها را بدبینانه می‌بینم.", reverseScored: true },
  { id: 152, factor: "agreeableness", facet: "A1", text: "همکارانم را قابل اعتماد می‌دانم.", reverseScored: false },

  // ===== A2: صداقت (۸ سؤال) =====
  { id: 153, factor: "agreeableness", facet: "A2", text: "همیشه صادق هستم، حتی اگر به ضررم باشد.", reverseScored: false },
  { id: 154, factor: "agreeableness", facet: "A2", text: "از دروغ گفتن پرهیز می‌کنم.", reverseScored: false },
  { id: 155, factor: "agreeableness", facet: "A2", text: "گاهی برای رسیدن به هدف، حقیقت را تحریف می‌کنم.", reverseScored: true },
  { id: 156, factor: "agreeableness", facet: "A2", text: "آدم مستقیم و رک هستم.", reverseScored: false },
  { id: 157, factor: "agreeableness", facet: "A2", text: "اگر لازم باشد، دروغ مصلحتی می‌گویم.", reverseScored: true },
  { id: 158, factor: "agreeableness", facet: "A2", text: "شفاف و صادق با دیگران برخورد می‌کنم.", reverseScored: false },
  { id: 159, factor: "agreeableness", facet: "A2", text: "برای حفظ منافعم، ممکن است چیزی را پنهان کنم.", reverseScored: true },
  { id: 160, factor: "agreeableness", facet: "A2", text: "صداقت برایم ارزش بالایی دارد.", reverseScored: false },

  // ===== A3: نوع‌دوستی (۸ سؤال) =====
  { id: 161, factor: "agreeableness", facet: "A3", text: "از کمک به دیگران لذت می‌برم.", reverseScored: false },
  { id: 162, factor: "agreeableness", facet: "A3", text: "برای دوستانم فداکاری می‌کنم.", reverseScored: false },
  { id: 163, factor: "agreeableness", facet: "A3", text: "آدم کمک‌کننده‌ای هستم.", reverseScored: false },
  { id: 164, factor: "agreeableness", facet: "A3", text: "اگر کسی نیاز داشته باشد، وقت خودم را صرفش می‌کنم.", reverseScored: false },
  { id: 165, factor: "agreeableness", facet: "A3", text: "اول به فکر خودم هستم تا دیگران.", reverseScored: true },
  { id: 166, factor: "agreeableness", facet: "A3", text: "از کمک به نیازمندان شاد می‌شوم.", reverseScored: false },
  { id: 167, factor: "agreeableness", facet: "A3", text: "کمک به دیگران اولویت من نیست.", reverseScored: true },
  { id: 168, factor: "agreeableness", facet: "A3", text: "از مهربانی به دیگران لذت می‌برم.", reverseScored: false },

  // ===== A4: همکاری (۸ سؤال) =====
  { id: 169, factor: "agreeableness", facet: "A4", text: "با همکارانم به‌خوبی همکاری می‌کنم.", reverseScored: false },
  { id: 170, factor: "agreeableness", facet: "A4", text: "از تسهیل و سازش در روابط استقبال می‌کنم.", reverseScored: false },
  { id: 171, factor: "agreeableness", facet: "A4", text: "اگر مخالفم، با لحن محترمانه اعتراض می‌کنم.", reverseScored: false },
  { id: 172, factor: "agreeableness", facet: "A4", text: "گاهی بحث را به دعوا می‌کشم.", reverseScored: true },
  { id: 173, factor: "agreeableness", facet: "A4", text: "حاضرم از خواسته‌ام بگذرم برای صلح.", reverseScored: false },
  { id: 174, factor: "agreeableness", facet: "A4", text: "سرسخت و لجباز هستم.", reverseScored: true },
  { id: 175, factor: "agreeableness", facet: "A4", text: "گوش‌دادن به نظر مخالف برایم سخت است.", reverseScored: true },
  { id: 176, factor: "agreeableness", facet: "A4", text: "از کار تیمی لذت می‌برم.", reverseScored: false },

  // ===== A5: تواضع (۸ سؤال) =====
  { id: 177, factor: "agreeableness", facet: "A5", text: "خودم را برتر از دیگران نمی‌بینم.", reverseScored: false },
  { id: 178, factor: "agreeableness", facet: "A5", text: "متواضع و فروتن هستم.", reverseScored: false },
  { id: 179, factor: "agreeableness", facet: "A5", text: "خودنمایی و افتخار را دوست ندارم.", reverseScored: false },
  { id: 180, factor: "agreeableness", facet: "A5", text: "گاهی خودنمایی می‌کنم.", reverseScored: true },
  { id: 181, factor: "agreeableness", facet: "A5", text: "به دیگران افتخار می‌کنم که از خودم بهترند.", reverseScored: false },
  { id: 182, factor: "agreeableness", facet: "A5", text: "خودم را برتر از بقیه می‌بینم.", reverseScored: true },
  { id: 183, factor: "agreeableness", facet: "A5", text: "حسادت نسبت به موفقیت دیگران دارم.", reverseScored: true },
  { id: 184, factor: "agreeableness", facet: "A5", text: "از موفقیت دیگران خوشحال می‌شوم.", reverseScored: false },

  // ===== A6: همدلی (۸ سؤال) =====
  { id: 185, factor: "agreeableness", facet: "A6", text: "با درد و رنج دیگران همدردی می‌کنم.", reverseScored: false },
  { id: 186, factor: "agreeableness", facet: "A6", text: "نگرانی دیگران را درک می‌کنم.", reverseScored: false },
  { id: 187, factor: "agreeableness", facet: "A6", text: "آدم سردی هستم و کمتر همدردی می‌کنم.", reverseScored: true },
  { id: 188, factor: "agreeableness", facet: "A6", text: "از دیدن رنج دیگران آزرده می‌شوم.", reverseScored: false },
  { id: 189, factor: "agreeableness", facet: "A6", text: "حتی با حیوانات مهربان هستم.", reverseScored: false },
  { id: 190, factor: "agreeableness", facet: "A6", text: "نگاه خشنی به مسایل دارم.", reverseScored: true },
  { id: 191, factor: "agreeableness", facet: "A6", text: "همدلی در من زیاد است.", reverseScored: false },
  { id: 192, factor: "agreeableness", facet: "A6", text: "اعتقاد دارم سخت‌گیری لازم است، نه مهربانی.", reverseScored: true },

  // ===== C1: صلاحیت (۸ سؤال) =====
  { id: 193, factor: "conscientiousness", facet: "C1", text: "به توانایی‌های خود اعتماد دارم.", reverseScored: false },
  { id: 194, factor: "conscientiousness", facet: "C1", text: "خودم را فرد شایسته‌ای می‌دانم.", reverseScored: false },
  { id: 195, factor: "conscientiousness", facet: "C1", text: "احساس می‌کنم در کارهایم موفق هستم.", reverseScored: false },
  { id: 196, factor: "conscientiousness", facet: "C1", text: "به خودم مطمئن نیستم.", reverseScored: true },
  { id: 197, factor: "conscientiousness", facet: "C1", text: "در کارهایم قوی و کارآمد هستم.", reverseScored: false },
  { id: 198, factor: "conscientiousness", facet: "C1", text: "اغلب احساس بی‌کفایتی می‌کنم.", reverseScored: true },
  { id: 199, factor: "conscientiousness", facet: "C1", text: "مهارت‌های بالایی دارم.", reverseScored: false },
  { id: 200, factor: "conscientiousness", facet: "C1", text: "توان انجام کارها را به‌خوبی ندارم.", reverseScored: true },

  // ===== C2: نظم (۸ سؤال) =====
  { id: 201, factor: "conscientiousness", facet: "C2", text: "میز کارم همیشه مرتب است.", reverseScored: false },
  { id: 202, factor: "conscientiousness", facet: "C2", text: "به نظم و ترتیب اهمیت می‌دهم.", reverseScored: false },
  { id: 203, factor: "conscientiousness", facet: "C2", text: "از بی‌نظمی خوشم نمی‌آید.", reverseScored: false },
  { id: 204, factor: "conscientiousness", facet: "C2", text: "اوضاع را منظم نگه می‌دارم.", reverseScored: false },
  { id: 205, factor: "conscientiousness", facet: "C2", text: "غالباً چیزهایم را جابه‌جا می‌کنم.", reverseScored: true },
  { id: 206, factor: "conscientiousness", facet: "C2", text: "فهرست کارها را دوست دارم.", reverseScored: false },
  { id: 207, factor: "conscientiousness", facet: "C2", text: "به‌خوبی برنامه‌ریزی می‌کنم.", reverseScored: false },
  { id: 208, factor: "conscientiousness", facet: "C2", text: "از شلوغی و بی‌نظمی خسته نمی‌شوم.", reverseScored: true },

  // ===== C3: احساس وظیفه (۸ سؤال) =====
  { id: 209, factor: "conscientiousness", facet: "C3", text: "به تعهداتم پایبندم.", reverseScored: false },
  { id: 210, factor: "conscientiousness", facet: "C3", text: "وعده‌ام را عمل می‌کنم.", reverseScored: false },
  { id: 211, factor: "conscientiousness", facet: "C3", text: "مسئولیت‌پذیری بالایی دارم.", reverseScored: false },
  { id: 212, factor: "conscientiousness", facet: "C3", text: "گاهی به تعهداتم عمل نمی‌کنم.", reverseScored: true },
  { id: 213, factor: "conscientiousness", facet: "C3", text: "وجدان کاری قوی دارم.", reverseScored: false },
  { id: 214, factor: "conscientiousness", facet: "C3", text: "همیشه کارهایم را به موقع انجام می‌دهم.", reverseScored: false },
  { id: 215, factor: "conscientiousness", facet: "C3", text: "از مسئولیت‌ها فرار می‌کنم.", reverseScored: true },
  { id: 216, factor: "conscientiousness", facet: "C3", text: "اخلاق حرفه‌ای مهمی دارم.", reverseScored: false },

  // ===== C4: موفقیت‌طلبی (۸ سؤال) =====
  { id: 217, factor: "conscientiousness", facet: "C4", text: "برای موفقیت تلاش زیادی می‌کنم.", reverseScored: false },
  { id: 218, factor: "conscientiousness", facet: "C4", text: "اهداف بالایی برای خود تعیین می‌کنم.", reverseScored: false },
  { id: 219, factor: "conscientiousness", facet: "C4", text: "از کار زیاد خسته نمی‌شوم.", reverseScored: false },
  { id: 220, factor: "conscientiousness", facet: "C4", text: "ترجیح می‌دهم آهسته‌تر کار کنم.", reverseScored: true },
  { id: 221, factor: "conscientiousness", facet: "C4", text: "جاه‌طلب و موفقیت‌طلب هستم.", reverseScored: false },
  { id: 222, factor: "conscientiousness", facet: "C4", text: "تنبلی گاهی در من دیده می‌شود.", reverseScored: true },
  { id: 223, factor: "conscientiousness", facet: "C4", text: "انگیزه بالایی برای موفقیت دارم.", reverseScored: false },
  { id: 224, factor: "conscientiousness", facet: "C4", text: "با حداقل تلاش کار می‌کنم.", reverseScored: true },

  // ===== C5: خودکارآمدی (۸ سؤال) =====
  { id: 225, factor: "conscientiousness", facet: "C5", text: "به‌راحتی از کار شروع می‌کنم.", reverseScored: false },
  { id: 226, factor: "conscientiousness", facet: "C5", text: "کارهایم را تا انتها دنبال می‌کنم.", reverseScored: false },
  { id: 227, factor: "conscientiousness", facet: "C5", text: "انگیزه و انضباط درونی دارم.", reverseScored: false },
  { id: 228, factor: "conscientiousness", facet: "C5", text: "اغلب کارها را نصفه رها می‌کنم.", reverseScored: true },
  { id: 229, factor: "conscientiousness", facet: "C5", text: "به‌راحتی حواسم پرت می‌شود.", reverseScored: true },
  { id: 230, factor: "conscientiousness", facet: "C5", text: "توانایی تمرکز بالایی دارم.", reverseScored: false },
  { id: 231, factor: "conscientiousness", facet: "C5", text: "از تنبلی در من اثری نیست.", reverseScored: false },
  { id: 232, factor: "conscientiousness", facet: "C5", text: "گاهی نمی‌توانم کارم را تمام کنم.", reverseScored: true },

  // ===== C6: محتاط‌بودن (۸ سؤال) =====
  { id: 233, factor: "conscientiousness", facet: "C6", text: "قبل از تصمیم، خوب فکر می‌کنم.", reverseScored: false },
  { id: 234, factor: "conscientiousness", facet: "C6", text: "محتاط و سنجیده عمل می‌کنم.", reverseScored: false },
  { id: 235, factor: "conscientiousness", facet: "C6", text: "از تصمیم‌های آنی پرهیز می‌کنم.", reverseScored: false },
  { id: 236, factor: "conscientiousness", facet: "C6", text: "گاهی بی‌گدار به آب می‌زنم.", reverseScored: true },
  { id: 237, factor: "conscientiousness", facet: "C6", text: "گزینه‌ها را با دقت ارزیابی می‌کنم.", reverseScored: false },
  { id: 238, factor: "conscientiousness", facet: "C6", text: "از ریسک کردن خوشم می‌آید.", reverseScored: true },
  { id: 239, factor: "conscientiousness", facet: "C6", text: "احتیاط شرط عقل است.", reverseScored: false },
  { id: 240, factor: "conscientiousness", facet: "C6", text: "از عمل کردن بدون فکر پشیمان می‌شوم.", reverseScored: true },
];

export const NEO_LIKERT_OPTIONS = [
  { value: 0, label: "کاملاً مخالفم", description: "اصلاً با این عبارت موافق نیستم" },
  { value: 1, label: "مخالفم", description: "بیشتر مخالفم تا موافق" },
  { value: 2, label: "بدون نظر", description: "نه موافق نه مخالف" },
  { value: 3, label: "موافقم", description: "بیشتر موافقم تا مخالف" },
  { value: 4, label: "کاملاً موافقم", description: "کاملاً با این عبارت موافقم" },
] as const;

export const NEO_TOTAL_QUESTIONS = NEO_QUESTIONS.length;
