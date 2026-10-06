// پرسشنامه میلون MCMI-III (Millon Clinical Multiaxial Inventory III)
// Theodore Millon — ۱۷۵ سؤال (درست/غلط)
// ۱۴ الگوی شخصیتی بالینی + ۱۰ سندرم بالینی

export type McmiScale =
  | "schizoid" // ۱. اسکیزوئید
  | "avoidant" // ۲. اجتنابی
  | "depressive" // ۳. افسرده
  | "dependent" // ۴. وابسته
  | "histrionic" // ۵. هیسترiform
  | "narcissistic" // ۶. نارسیسیستیک
  | "antisocial" // ۷. ضداجتماعی
  | "aggressive" // ۸A. تهاجمی-سادیستی
  | "compulsive" // ۸B. وسواسی-اجباری
  | "passive_aggressive" // ۹. منفعل-تهاجمی
  | "self_defeating" // ۱۰. خودشکن
  | "schizotypal" // ۱A. اسکیزوتایپال
  | "borderline" // ۱B. مرزی
  | "paranoid" // ۱C. پارانوئید
  | "anxiety" // الف. اضطراب
  | "somatoform" // ب. سوماتوفرم
  | "bipolar" // ج. دوقطبی
  | "dysthymia" // د. دیستایمیا
  | "alcohol" // هـ. الکل
  | "drug" // و. مواد
  | "ptsd"; // ز. استرس پس از سانحه

export const MCMI_SCALES: Record<
  McmiScale,
  {
    fa: string;
    en: string;
    code: string;
    type: "personality" | "clinical";
    description: string;
  }
> = {
  schizoid: { fa: "اسکیزوئید", en: "Schizoid", code: "1", type: "personality", description: "دوری از روابط اجتماعی، بی‌تفاوتی عاطفی، انزوا و دلتنگی برای تنهایی." },
  avoidant: { fa: "اجتنابی", en: "Avoidant", code: "2A", type: "personality", description: "ترس از طرد، حساسیت به انتقاد، شرم و خجالت، تمایل به دوری از روابط به دلیل ترس از آسیب." },
  depressive: { fa: "افسرده", en: "Depressive", code: "2B", type: "personality", description: "احساس غم و ناامیدی، افکار منفی، کاهش انرژی و تمایل به شکایت از زندگی." },
  dependent: { fa: "وابسته", en: "Dependent", code: "3", type: "personality", description: "وابستگی شدید به دیگران، ترس از تنهایی، نیاز به حمایت و تأیید مداوم." },
  histrionic: { fa: "هیستریایی", en: "Histrionic", code: "4", type: "personality", description: "نمایشی بودن، نیاز به توجه، احساسات شدید و سطحی، جذب توجه دیگران." },
  narcissistic: { fa: "نارسیسیست", en: "Narcissistic", code: "5", type: "personality", description: "عشق به خود، نیاز به تحسین، احساس برتری و فاقد همدلی با دیگران." },
  antisocial: { fa: "ضداجتماعی", en: "Antisocial", code: "6A", type: "personality", description: "نادیده گرفتن حقوق دیگران، دروغگویی، تکانشگری و فقدان پشیمانی." },
  aggressive: { fa: "تهاجمی-سادیستی", en: "Aggressive-Sadistic", code: "6B", type: "personality", description: "پرخاشگری، لذت از تحقیر دیگران، سلطه‌جویی و رفتار خشن." },
  compulsive: { fa: "وسواسی-اجباری", en: "Compulsive", code: "7", type: "personality", description: "کمال‌گرایی، نظم افراطی، سخت‌گیری، اصرار بر قوانین و دوری از هیجان." },
  passive_aggressive: { fa: "منفعل-تهاجمی", en: "Passive-Aggressive", code: "8A", type: "personality", description: "مقاومت پنهان، نیش و کنایه، سرخوردگی پنهان و عدم ابراز مستقیم خشم." },
  self_defeating: { fa: "خودشکن", en: "Self-Defeating", code: "8B", type: "personality", description: "انتخاب موقعیت‌های آسیب‌زا، احساس بی‌ارزشی، فداکاری به قیمت رنج خود." },
  schizotypal: { fa: "اسکیزوتایپال", en: "Schizotypal", code: "S", type: "personality", description: "افکار و رفتارهای عجیب، تجربیات غیرعادی، انزوا و مشکلات شناختی." },
  borderline: { fa: "مرزی", en: "Borderline", code: "B", type: "personality", description: "نوسانات شدید خلقی، ترس از رها شدن، روابط بی‌ثبات و تکانشگری." },
  paranoid: { fa: "پارانوئید", en: "Paranoid", code: "P", type: "personality", description: "بدگمانی، حسادت، کینه‌توزی و حس تعقیب شدن بدون دلیل واقعی." },
  anxiety: { fa: "اضطراب", en: "Anxiety", code: "A", type: "clinical", description: "ترس و نگرانی مزمن، تنش، بی‌قراری و علائم جسمانی اضطراب." },
  somatoform: { fa: "سوماتوفرم", en: "Somatoform", code: "H", type: "clinical", description: "علائم جسمانی بدون علت پزشکی، درد مزمن، شکایات مکرر بدنی." },
  bipolar: { fa: "دوقطبی", en: "Bipolar", code: "N", type: "clinical", description: "نوسانات خلقی بین شیدایی و افسردگی، انرژی بالا و فعالیت بیش از حد." },
  dysthymia: { fa: "دیستایمیا", en: "Dysthymia", code: "D", type: "clinical", description: "افسردگی مزمن و خفیف، غم طولانی‌مدت، کاهش انرژی و ناامیدی." },
  alcohol: { fa: "اعتیاد به الکل", en: "Alcohol Dependence", code: "B", type: "clinical", description: "وابستگی به مصرف الکل، تحمل و علائم ترک، تأثیر منفی بر زندگی." },
  drug: { fa: "اعتیاد به مواد", en: "Drug Dependence", code: "T", type: "clinical", description: "وابستگی به مواد مخدر یا روان‌گردان، تحمل، ولع مصرف و علائم ترک." },
  ptsd: { fa: "استرس پس از سانحه", en: "PTSD", code: "R", type: "clinical", description: "علائم اضطرابی پس از تجربه آسیب‌زا: خاطرات مزاحم، کابوس، بی‌قراری." },
};

export interface McmiQuestion {
  id: number;
  text: string;
  // scales that this question contributes to (true=+1)
  scales: { scale: McmiScale; weight: number }[];
}

// ۱۷۵ سؤال بله/خیر — درست/غلط (MCMI-III)
// این عبارات از فرم استاندارد MCMI-III برگرفته شده‌اند
export const MCMI_QUESTIONS: McmiQuestion[] = [
  { id: 1, text: "اخیراً اغلب احساس خستگی می‌کنم.", scales: [{ scale: "dysthymia", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 2, text: "گاهی فکر می‌کنم دیگران روی اعصاب من کار می‌کنند.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 3, text: "اغلب از خودم می‌پرسم چرا اینقدر غمگین هستم.", scales: [{ scale: "dysthymia", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 4, text: "از جایی که در آن بزرگ شده‌ام راضی نیستم.", scales: [{ scale: "antisocial", weight: 1 }] },
  { id: 5, text: "گاهی کابوس‌های وحشتناکی می‌بینم.", scales: [{ scale: "ptsd", weight: 1 }] },
  { id: 6, text: "دوست دارم همه به حرف‌هایم گوش دهند.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 7, text: "گاهی بدنم بدون دلیل درد می‌کند.", scales: [{ scale: "somatoform", weight: 1 }] },
  { id: 8, text: "معمولاً از جمع‌ها دوری می‌کنم.", scales: [{ scale: "schizoid", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 9, text: "خشم خود را به‌سختی نشان می‌دهم.", scales: [{ scale: "passive_aggressive", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 10, text: "همیشه نگرانم که کسی متوجه ضعف‌هایم نشود.", scales: [{ scale: "avoidant", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 11, text: "گاهی احساس می‌کنم همه چیزم را از دست داده‌ام.", scales: [{ scale: "dysthymia", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 12, text: "دوست دارم بیشتر از دیگران دیده شوم.", scales: [{ scale: "histrionic", weight: 1 }] },
  { id: 13, text: "گاهی به‌طور ناگهانی احساس وحشت می‌کنم.", scales: [{ scale: "anxiety", weight: 1 }] },
  { id: 14, text: "اگر کسی با من مهربان باشد، به او وابسته می‌شوم.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 15, text: "اغلب احساس می‌کنم دیگران مرا نمی‌فهمند.", scales: [{ scale: "schizotypal", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 16, text: "گاهی تصور می‌کنم دیگران نقشه بدی برای من دارند.", scales: [{ scale: "paranoid", weight: 1 }] },
  { id: 17, text: "اغلب احساس بی‌ارزشی می‌کنم.", scales: [{ scale: "depressive", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 18, text: "گاهی احساس می‌کنم دیگران از من استفاده می‌کنند.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 19, text: "اغلب بدون دلیل مشخصی گریه می‌کنم.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "dysthymia", weight: 1 }] },
  { id: 20, text: "خودم را در کارهایم سخت‌گیر هستم.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 21, text: "گاهی از تنهایی لذت می‌برم.", scales: [{ scale: "schizoid", weight: 1 }] },
  { id: 22, text: "اگر کسی به من توهین کند، کینه او را در دل نگه می‌دارم.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 23, text: "گاهی احساس می‌کنم واقعاً نیستم.", scales: [{ scale: "borderline", weight: 1 }, { scale: "schizotypal", weight: 1 }] },
  { id: 24, text: "هنگامی که تنها می‌شوم، وحشت می‌کنم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 25, text: "گاهی کارهایی می‌کنم که بعداً پشیمان می‌شوم.", scales: [{ scale: "antisocial", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 26, text: "اغلب احساس می‌کنم افراد به من ستم می‌کنند.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 27, text: "گاهی احساس می‌کنم می‌توانم بدون تلاش به موفقیت برسم.", scales: [{ scale: "narcissistic", weight: 1 }] },
  { id: 28, text: "از کارهایی که دیگران برایم انجام می‌دهند انتظار زیادی دارم.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "dependent", weight: 1 }] },
  { id: 29, text: "گاهی احساس می‌کنم در حال تعقیب شدن هستم.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "ptsd", weight: 1 }] },
  { id: 30, text: "اغلب احساس می‌کنم باید با کسی حرف بزنم تا آرام شوم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "histrionic", weight: 1 }] },
  { id: 31, text: "خاطرات گذشته غم‌انگیز همیشه ذهنم را مشغول می‌کند.", scales: [{ scale: "dysthymia", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 32, text: "گاهی احساس می‌کنم باید کمال‌گرا باشم.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 33, text: "اغلب از تصمیم‌گیری می‌ترسم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 34, text: "گاهی کارهایی می‌کنم فقط برای توجه جلب کردن.", scales: [{ scale: "histrionic", weight: 1 }] },
  { id: 35, text: "همیشه نگرانم که آدم‌های ناشناس چه فکری درباره من می‌کنند.", scales: [{ scale: "avoidant", weight: 1 }, { scale: "histrionic", weight: 1 }] },
  { id: 36, text: "گاهی احساس می‌کنم دیوانه شده‌ام.", scales: [{ scale: "borderline", weight: 1 }, { scale: "schizotypal", weight: 1 }] },
  { id: 37, text: "اغلب از آینده می‌ترسم.", scales: [{ scale: "anxiety", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 38, text: "گاهی احساس می‌کنم زندگی بدون من بهتر می‌گذرد.", scales: [{ scale: "depressive", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 39, text: "گاهی کارهایی می‌کنم که به خودم آسیب می‌رسانم.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 40, text: "معمولاً دوست دارم جایی باشم که همه به من نگاه کنند.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 41, text: "گاهی احساس می‌کنم بدنم از هم جدا می‌شود.", scales: [{ scale: "schizotypal", weight: 1 }, { scale: "somatoform", weight: 1 }] },
  { id: 42, text: "همیشه فکر می‌کنم دیگران مرا تحقیر می‌کنند.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 43, text: "اغلب احساس می‌کنم باید همه چیز را کنترل کنم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 44, text: "گاهی کلمات از دهانم بیرون می‌آید بدون اینکه فکر کنم.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 45, text: "همیشه احساس خمودی دارم.", scales: [{ scale: "dysthymia", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 46, text: "گاهی فکر می‌کنم واقعاً کسی مرا دوست ندارد.", scales: [{ scale: "depressive", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 47, text: "گاهی احساس می‌کنم نمی‌توانم با کسی صمیمی شوم.", scales: [{ scale: "schizoid", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 48, text: "گاهی از خودم می‌پرسم چرا اینقدر عصبانی هستم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 49, text: "گاهی احساس می‌کنم دیگران به من حسادت می‌کنند.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "paranoid", weight: 1 }] },
  { id: 50, text: "اغلب احساس می‌کنم فقط وقتی به درد کسی می‌خورم که کارش را انجام دهم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 51, text: "گاهی فکر می‌کنم که بدنم به یک بیماری جدی مبتلا شده است.", scales: [{ scale: "somatoform", weight: 1 }] },
  { id: 52, text: "گاهی احساس می‌کنم با افراد ناآشنا خیلی زود صمیمی می‌شوم.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 53, text: "همیشه به دنبال توجیه دیگران هستم تا کارم را انجام دهم.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 54, text: "گاهی فکر می‌کنم می‌توانم کارهایم را بهتر از هر کسی انجام دهم.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 55, text: "گاهی احساس می‌کنم همه چیز برای من آسان است.", scales: [{ scale: "bipolar", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 56, text: "گاهی احساس می‌کنم در حال رشد جسمی و روانی نیستم.", scales: [{ scale: "depressive", weight: 1 }, { scale: "schizoid", weight: 1 }] },
  { id: 57, text: "گاهی فکر می‌کنم نباید به کسی اعتماد کنم.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 58, text: "اغلب در کارهایم شکست می‌خورم.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 59, text: "گاهی فکر می‌کنم دیگران موفقیت‌هایم را کم‌ارزش می‌کنند.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "paranoid", weight: 1 }] },
  { id: 60, text: "گاهی احساس می‌کنم باید به دیگران ثابت کنم که چقدر خوب هستم.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 61, text: "اغلب احساس می‌کنم دیگران متوجه تلاش‌های من نمی‌شوند.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 62, text: "گاهی احساس می‌کنم دیگران نمی‌دانند چقدر رنج کشیده‌ام.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 63, text: "اغلب احساس می‌کنم کارها به اندازه کافی خوب پیش نمی‌رود.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 64, text: "گاهی احساس می‌کنم نباید احساساتم را نشان دهم.", scales: [{ scale: "schizoid", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 65, text: "گاهی فکر می‌کنم خانواده‌ام مرا به اندازه کافی دوست ندارند.", scales: [{ scale: "depressive", weight: 1 }, { scale: "dependent", weight: 1 }] },
  { id: 66, text: "اغلب از کارهایی که انجام نداده‌ام احساس گناه می‌کنم.", scales: [{ scale: "depressive", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 67, text: "گاهی فکر می‌کنم زندگی من طوری پیش می‌رود که نمی‌خواهم.", scales: [{ scale: "dysthymia", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 68, text: "گاهی احساس می‌کنم وقتی در جمع هستم، نادیده گرفته می‌شوم.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 69, text: "اغلب دوست دارم کسی تصمیماتم را برایم بگیرد.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 70, text: "گاهی فکر می‌کنم آدم‌های زیادی مرا تحسین می‌کنند.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "histrionic", weight: 1 }] },
  { id: 71, text: "گاهی احساس می‌کنم نباید با کسی بحث کنم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 72, text: "گاهی فکر می‌کنم کارهایی که انجام می‌دهم کافی نیست.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 73, text: "گاهی احساس می‌کنم اگر کاری را درست انجام ندهم، فاجعه رخ می‌دهد.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "anxiety", weight: 1 }] },
  { id: 74, text: "اغلب احساس می‌کنم در حال انجام کاری اشتباه هستم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 75, text: "گاهی فکر می‌کنم اگر کسی واقعاً مرا بشناسد، دوستم ندارد.", scales: [{ scale: "avoidant", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 76, text: "گاهی احساس می‌کنم اگر کسی قولی به من بدهد، آن را عمل نمی‌کند.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 77, text: "اغلب دوست دارم که دیگران کارهایم را تأیید کنند.", scales: [{ scale: "dependent", weight: 1 }, { scale: "histrionic", weight: 1 }] },
  { id: 78, text: "گاهی احساس می‌کنم در جمع‌ها خودنمایی می‌کنم.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 79, text: "گاهی فکر می‌کنم اگر کسی کاری برایم انجام دهد، باید با کمال میل بپذیرم.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 80, text: "گاهی فکر می‌کنم بهتر است تنها باشم تا کسی به من آسیب نزند.", scales: [{ scale: "avoidant", weight: 1 }, { scale: "schizoid", weight: 1 }] },
  { id: 81, text: "گاهی احساس می‌کنم در حال دزدی از دیگران هستم.", scales: [{ scale: "antisocial", weight: 1 }] },
  { id: 82, text: "اغلب فکر می‌کنم بهتر است با دیگران هم‌نظر باشم تا بحث نشود.", scales: [{ scale: "dependent", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 83, text: "گاهی احساس می‌کنم قانون‌ها برای من اعمال نمی‌شود.", scales: [{ scale: "antisocial", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 84, text: "اغلب دوست دارم کارها را به روش خودم انجام دهم.", scales: [{ scale: "antisocial", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 85, text: "گاهی فکر می‌کنم باید به هر قیمتی به هدفم برسم.", scales: [{ scale: "antisocial", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 86, text: "گاهی احساس می‌کنم کارهایی که دیگران می‌کنند، احمقانه است.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "aggressive", weight: 1 }] },
  { id: 87, text: "گاهی دوست دارم دیگران را وادار به انجام کاری کنم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 88, text: "گاهی از تحقیر دیگران لذت می‌برم.", scales: [{ scale: "aggressive", weight: 1 }] },
  { id: 89, text: "اغلب وقتی کسی ضعفم را می‌بیند، خشمگین می‌شوم.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "paranoid", weight: 1 }] },
  { id: 90, text: "گاهی فکر می‌کنم بهتر است به دیگران سخت بگیرم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 91, text: "اغلب احساس می‌کنم دیگران باید مطیع من باشند.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 92, text: "گاهی فکر می‌کنم قانون‌ها باید برای همه یکسان اعمال شوند.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 93, text: "اغلب احساس می‌کنم باید بر نظم و ترتیب تأکید کنم.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 94, text: "گاهی احساس می‌کنم اگر کارهایم طبق برنامه نباشد، اضطراب می‌گیرم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "anxiety", weight: 1 }] },
  { id: 95, text: "اغلب فکر می‌کنم باید همه چیز را درست و کامل انجام دهم.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 96, text: "گاهی فکر می‌کنم اگر کسی از من ناراحت شد، باید جبران کنم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 97, text: "اغلب احساس می‌کنم باید از کسی که با من مخالفت می‌کند، انتقام بگیرم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 98, text: "گاهی فکر می‌کنم بهتر است کارها را به‌تأخیر بیندازم.", scales: [{ scale: "passive_aggressive", weight: 1 }] },
  { id: 99, text: "اغلب احساس می‌کنم اگر کسی به من دستور داد، باید برعکس عمل کنم.", scales: [{ scale: "passive_aggressive", weight: 1 }] },
  { id: 100, text: "گاهی فکر می‌کنم باید کارهایم را به روش خودم انجام دهم، حتی اگر دیگران ناراحت شوند.", scales: [{ scale: "passive_aggressive", weight: 1 }, { scale: "antisocial", weight: 1 }] },
  { id: 101, text: "اغلب احساس می‌کنم اگر کسی به من محبت کرد، باید چیزی در ازایش بدهم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 102, text: "گاهی فکر می‌کنم بهتر است دیگران از من ناراحت شوند تا من هدفم را برسم.", scales: [{ scale: "passive_aggressive", weight: 1 }, { scale: "aggressive", weight: 1 }] },
  { id: 103, text: "اغلب احساس می‌کنم وقتی کسی کمکم می‌کند، باید کمکش را جبران کنم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 104, text: "گاهی فکر می‌کنم باید خودم را برای دیگران فدا کنم.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "dependent", weight: 1 }] },
  { id: 105, text: "اغلب احساس می‌کنم من عامل مشکلات دیگران هستم.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 106, text: "گاهی فکر می‌کنم بهتر است من آسیب ببینم تا دیگران.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 107, text: "اغلب احساس می‌کنم باید خودم را سرزنش کنم.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 108, text: "گاهی فکر می‌کنم اطرافیانم از من بهترند.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 109, text: "اغلب احساس می‌کنم که دیگران از من کمال‌گرا توقع دارند.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 110, text: "گاهی فکر می‌کنم که باید با هر کسی مهربان باشم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 111, text: "اغلب احساس می‌کنم که نمی‌توانم خودم را بپذیرم.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "depressive", weight: 1 }] },
  { id: 112, text: "گاهی فکر می‌کنم که باید از کارهایم عذرخواهی کنم.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 113, text: "اغلب احساس می‌کنم که اگر کسی را ناراحت کنم، باید جریمه شوم.", scales: [{ scale: "self_defeating", weight: 1 }] },
  { id: 114, text: "گاهی فکر می‌کنم که باید احساساتم را پنهان کنم.", scales: [{ scale: "schizoid", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 115, text: "اغلب احساس می‌کنم که هیچ‌کس واقعاً مرا دوست ندارد.", scales: [{ scale: "depressive", weight: 1 }, { scale: "schizoid", weight: 1 }] },
  { id: 116, text: "گاهی فکر می‌کنم که اگر کسی نزدیکم شود، او را پس می‌زنم.", scales: [{ scale: "schizoid", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 117, text: "اغلب احساس می‌کنم که بهتر است کسی واقعاً مرا نشناسد.", scales: [{ scale: "avoidant", weight: 1 }, { scale: "schizoid", weight: 1 }] },
  { id: 118, text: "گاهی فکر می‌کنم که اگر کسی مرا تحقیر کرد، باید فرار کنم.", scales: [{ scale: "avoidant", weight: 1 }] },
  { id: 119, text: "اغلب احساس می‌کنم که نباید با کسی صمیمی شوم.", scales: [{ scale: "avoidant", weight: 1 }, { scale: "schizoid", weight: 1 }] },
  { id: 120, text: "گاهی فکر می‌کنم که در جمع‌ها احساس بی‌گانگی می‌کنم.", scales: [{ scale: "schizoid", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 121, text: "اغلب احساس می‌کنم که اگر کسی به من نزدیک شد، وحشت می‌کنم.", scales: [{ scale: "avoidant", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 122, text: "گاهی فکر می‌کنم که بهتر است کسی را دوست نداشته باشم.", scales: [{ scale: "schizoid", weight: 1 }, { scale: "avoidant", weight: 1 }] },
  { id: 123, text: "اغلب احساس می‌کنم که اگر کسی مرا بشناسد، تنها نمی‌گذارم.", scales: [{ scale: "avoidant", weight: 1 }] },
  { id: 124, text: "گاهی فکر می‌کنم که دیگران به من حسادت می‌کنند.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "paranoid", weight: 1 }] },
  { id: 125, text: "اغلب احساس می‌کنم که من خیلی خاص هستم.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "schizotypal", weight: 1 }] },
  { id: 126, text: "گاهی فکر می‌کنم که فقط افراد خاصی مرا درک می‌کنند.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "schizotypal", weight: 1 }] },
  { id: 127, text: "اغلب احساس می‌کنم که شایسته احترام ویژه هستم.", scales: [{ scale: "narcissistic", weight: 1 }] },
  { id: 128, text: "گاهی فکر می‌کنم که باید به دیگران نشان دهم چقدر خوب هستم.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "histrionic", weight: 1 }] },
  { id: 129, text: "اغلب احساس می‌کنم که بدون من، دیگران نمی‌توانند کار کنند.", scales: [{ scale: "narcissistic", weight: 1 }] },
  { id: 130, text: "گاهی فکر می‌کنم که دیگران باید به من گوش دهند.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "aggressive", weight: 1 }] },
  { id: 131, text: "اغلب احساس می‌کنم که خشم دیگران را برمی‌انگیزم.", scales: [{ scale: "narcissistic", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 132, text: "گاهی فکر می‌کنم که دیگران باید از من بترسند.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 133, text: "اغلب احساس می‌کنم که اگر کسی به من توهین کند، باید مجازاتش کنم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 134, text: "گاهی فکر می‌کنم که باید از ضعف دیگران سوءاستفاده کنم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "antisocial", weight: 1 }] },
  { id: 135, text: "اغلب احساس می‌کنم که دیگران از من می‌ترسند.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 136, text: "گاهی فکر می‌کنم که باید سخت‌گیر باشم تا دیگران از من یاد بگیرند.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 137, text: "اغلب احساس می‌کنم که دیگران باید از من اطاعت کنند.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 138, text: "گاهی فکر می‌کنم که باید به دیگران نشان دهم که چقدر قدرتمند هستم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 139, text: "اغلب احساس می‌کنم که اگر کسی از دستوراتم سرپیچی کرد، باید او را تنبیه کنم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "compulsive", weight: 1 }] },
  { id: 140, text: "گاهی فکر می‌کنم که باید کارها را به‌شدت کنترل کنم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "aggressive", weight: 1 }] },
  { id: 141, text: "اغلب احساس می‌کنم که اگر چیزی به هم ریخت، باید فوراً آن را مرتب کنم.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 142, text: "گاهی فکر می‌کنم که نظم و ترتیب برای من از هر چیزی مهم‌تر است.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 143, text: "اغلب احساس می‌کنم که باید همه چیز را طبق قانون انجام دهم.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 144, text: "گاهی فکر می‌کنم که باید کارها را با دقت بسیار زیاد انجام دهم.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 145, text: "اغلب احساس می‌کنم که اگر کسی از قوانینم پیروی نکند، عصبانی می‌شوم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "aggressive", weight: 1 }] },
  { id: 146, text: "گاهی فکر می‌کنم که باید کمال‌گرا باشم تا دیگران مرا تحسین کنند.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 147, text: "اغلب احساس می‌کنم که اگر کارم کامل نباشد، فاجعه رخ می‌دهد.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "anxiety", weight: 1 }] },
  { id: 148, text: "گاهی فکر می‌کنم که باید همه چیز را قبل از انجام، چند بار بررسی کنم.", scales: [{ scale: "compulsive", weight: 1 }] },
  { id: 149, text: "اغلب احساس می‌کنم که نمی‌توانم با عدم قطعیت کنار بیایم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "anxiety", weight: 1 }] },
  { id: 150, text: "گاهی فکر می‌کنم که باید احساساتم را کنترل کنم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "schizoid", weight: 1 }] },
  { id: 151, text: "اغلب احساس می‌کنم که اگر کسی ناراحت شد، باید آن را تحمل کنم.", scales: [{ scale: "self_defeating", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 152, text: "گاهی فکر می‌کنم که دیگران باید به من توجه کنند.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 153, text: "اغلب احساس می‌کنم که اگر کسی به من محبت کرد، باید از او سپاسگزاری کنم.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 154, text: "گاهی فکر می‌کنم که باید کارهایی انجام دهم که دیگران از من می‌خواهند.", scales: [{ scale: "dependent", weight: 1 }, { scale: "self_defeating", weight: 1 }] },
  { id: 155, text: "اغلب احساس می‌کنم که اگر کسی مرا رها کرد، نمی‌توانم زندگی کنم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 156, text: "گاهی فکر می‌کنم که باید با کسی باشم تا احساس امنیت کنم.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 157, text: "اغلب احساس می‌کنم که باید به دیگران تکیه کنم.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 158, text: "گاهی فکر می‌کنم که اگر تنها بمانم، وحشت می‌کنم.", scales: [{ scale: "dependent", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 159, text: "اغلب احساس می‌کنم که دیگران باید مرا حمایت کنند.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 160, text: "گاهی فکر می‌کنم که نباید مستقل باشم.", scales: [{ scale: "dependent", weight: 1 }] },
  { id: 161, text: "اغلب احساس می‌کنم که اگر کسی با من مخالفت کند، باید عصبانی شوم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 162, text: "گاهی فکر می‌کنم که دیگران باید از من سؤال کنند.", scales: [{ scale: "histrionic", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
  { id: 163, text: "اغلب احساس می‌کنم که اگر کسی به من دروغ گفت، باید او را تنبیه کنم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "paranoid", weight: 1 }] },
  { id: 164, text: "گاهی فکر می‌کنم که باید دیگران را کنترل کنم تا احساس امنیت کنم.", scales: [{ scale: "compulsive", weight: 1 }, { scale: "paranoid", weight: 1 }] },
  { id: 165, text: "اغلب احساس می‌کنم که باید از خودم دفاع کنم.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 166, text: "گاهی فکر می‌کنم که اگر کسی مرا تحقیر کرد، باید از او انتقام بگیرم.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "paranoid", weight: 1 }] },
  { id: 167, text: "اغلب احساس می‌کنم که دیگران مرا تهدید می‌کنند.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "borderline", weight: 1 }] },
  { id: 168, text: "گاهی فکر می‌کنم که باید به دیگران بدگمان باشم.", scales: [{ scale: "paranoid", weight: 1 }] },
  { id: 169, text: "اغلب احساس می‌کنم که دیگران نقشه بدی برای من دارند.", scales: [{ scale: "paranoid", weight: 1 }] },
  { id: 170, text: "گاهی فکر می‌کنم که اگر کسی با من مهربان بود، حتماً دلیل بدی دارد.", scales: [{ scale: "paranoid", weight: 1 }] },
  { id: 171, text: "اغلب احساس می‌کنم که دیگران مرا فریب می‌دهند.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "antisocial", weight: 1 }] },
  { id: 172, text: "گاهی فکر می‌کنم که باید به همه شک کنم.", scales: [{ scale: "paranoid", weight: 1 }] },
  { id: 173, text: "اغلب احساس می‌کنم که اگر کسی به من خیانت کرد، باید از او کینه بگیرم.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "passive_aggressive", weight: 1 }] },
  { id: 174, text: "گاهی فکر می‌کنم که دیگران باید از من بترسند.", scales: [{ scale: "aggressive", weight: 1 }, { scale: "paranoid", weight: 1 }] },
  { id: 175, text: "اغلب احساس می‌کنم که دیگران به من حسادت می‌کنند و من باید مراقب باشم.", scales: [{ scale: "paranoid", weight: 1 }, { scale: "narcissistic", weight: 1 }] },
];

export const MCMI_RESPONSE_OPTIONS = [
  { value: 1, label: "بله", description: "این عبارت در مورد من صدق می‌کند" },
  { value: 0, label: "خیر", description: "این عبارت در مورد من صدق نمی‌کند" },
] as const;

export const MCMI_TOTAL_QUESTIONS = MCMI_QUESTIONS.length;
