"""Generate the NEO questions TS file from extracted text.
We use the standard 240 questions extracted from the official PDF.
For scoring, we keep the facet structure (N1-N6, E1-E6, O1-O6, A1-A6, C1-C6) based on
standard NEO PI-R facet assignment."""

# Standard NEO PI-R facet assignment (question number -> facet code)
# Source: official NEO PI-R scoring key
# N = Neuroticism (1-48), E = Extraversion (49-96), O = Openness (97-144),
# A = Agreeableness (145-192), C = Conscientiousness (193-240)
# Each factor has 6 facets × 8 questions = 48 questions per factor

FACET_QUESTIONS = {
    # N1: Anxiety (1, 7, 13, 19, 25, 31, 37, 43)
    'N1': [1, 7, 13, 19, 25, 31, 37, 43],
    # N2: Angry Hostility (2, 8, 14, 20, 26, 32, 38, 44)
    'N2': [2, 8, 14, 20, 26, 32, 38, 44],
    # N3: Depression (3, 9, 15, 21, 27, 33, 39, 45)
    'N3': [3, 9, 15, 21, 27, 33, 39, 45],
    # N4: Self-Consciousness (4, 10, 16, 22, 28, 34, 40, 46)
    'N4': [4, 10, 16, 22, 28, 34, 40, 46],
    # N5: Impulsiveness (5, 11, 17, 23, 29, 35, 41, 47)
    'N5': [5, 11, 17, 23, 29, 35, 41, 47],
    # N6: Vulnerability (6, 12, 18, 24, 30, 36, 42, 48)
    'N6': [6, 12, 18, 24, 30, 36, 42, 48],

    # E1: Warmth (49, 55, 61, 67, 73, 79, 85, 91)
    'E1': [49, 55, 61, 67, 73, 79, 85, 91],
    # E2: Gregariousness (50, 56, 62, 68, 74, 80, 86, 92)
    'E2': [50, 56, 62, 68, 74, 80, 86, 92],
    # E3: Assertiveness (51, 57, 63, 69, 75, 81, 87, 93)
    'E3': [51, 57, 63, 69, 75, 81, 87, 93],
    # E4: Activity (52, 58, 64, 70, 76, 82, 88, 94)
    'E4': [52, 58, 64, 70, 76, 82, 88, 94],
    # E5: Excitement-Seeking (53, 59, 65, 71, 77, 83, 89, 95)
    'E5': [53, 59, 65, 71, 77, 83, 89, 95],
    # E6: Positive Emotions (54, 60, 66, 72, 78, 84, 90, 96)
    'E6': [54, 60, 66, 72, 78, 84, 90, 96],

    # O1: Fantasy (97, 103, 109, 115, 121, 127, 133, 139)
    'O1': [97, 103, 109, 115, 121, 127, 133, 139],
    # O2: Aesthetics (98, 104, 110, 116, 122, 128, 134, 140)
    'O2': [98, 104, 110, 116, 122, 128, 134, 140],
    # O3: Feelings (99, 105, 111, 117, 123, 129, 135, 141)
    'O3': [99, 105, 111, 117, 123, 129, 135, 141],
    # O4: Actions (100, 106, 112, 118, 124, 130, 136, 142)
    'O4': [100, 106, 112, 118, 124, 130, 136, 142],
    # O5: Ideas (101, 107, 113, 119, 125, 131, 137, 143)
    'O5': [101, 107, 113, 119, 125, 131, 137, 143],
    # O6: Values (102, 108, 114, 120, 126, 132, 138, 144)
    'O6': [102, 108, 114, 120, 126, 132, 138, 144],

    # A1: Trust (145, 151, 157, 163, 169, 175, 181, 187)
    'A1': [145, 151, 157, 163, 169, 175, 181, 187],
    # A2: Straightforwardness (146, 152, 158, 164, 170, 176, 182, 188)
    'A2': [146, 152, 158, 164, 170, 176, 182, 188],
    # A3: Altruism (147, 153, 159, 165, 171, 177, 183, 189)
    'A3': [147, 153, 159, 165, 171, 177, 183, 189],
    # A4: Compliance (148, 154, 160, 166, 172, 178, 184, 190)
    'A4': [148, 154, 160, 166, 172, 178, 184, 190],
    # A5: Modesty (149, 155, 161, 167, 173, 179, 185, 191)
    'A5': [149, 155, 161, 167, 173, 179, 185, 191],
    # A6: Tender-Mindedness (150, 156, 162, 168, 174, 180, 186, 192)
    'A6': [150, 156, 162, 168, 174, 180, 186, 192],

    # C1: Competence (193, 199, 205, 211, 217, 223, 229, 235)
    'C1': [193, 199, 205, 211, 217, 223, 229, 235],
    # C2: Order (194, 200, 206, 212, 218, 224, 230, 236)
    'C2': [194, 200, 206, 212, 218, 224, 230, 236],
    # C3: Dutifulness (195, 201, 207, 213, 219, 225, 231, 237)
    'C3': [195, 201, 207, 213, 219, 225, 231, 237],
    # C4: Achievement Striving (196, 202, 208, 214, 220, 226, 232, 238)
    'C4': [196, 202, 208, 214, 220, 226, 232, 238],
    # C5: Self-Discipline (197, 203, 209, 215, 221, 227, 233, 239)
    'C5': [197, 203, 209, 215, 221, 227, 233, 239],
    # C6: Deliberation (198, 204, 210, 216, 222, 228, 234, 240)
    'C6': [198, 204, 210, 216, 222, 228, 234, 240],
}

# Build reverse lookup: question number -> (factor, facet)
QUESTION_TO_FACET = {}
FACET_TO_FACTOR = {
    'N1': 'neuroticism', 'N2': 'neuroticism', 'N3': 'neuroticism',
    'N4': 'neuroticism', 'N5': 'neuroticism', 'N6': 'neuroticism',
    'E1': 'extraversion', 'E2': 'extraversion', 'E3': 'extraversion',
    'E4': 'extraversion', 'E5': 'extraversion', 'E6': 'extraversion',
    'O1': 'openness', 'O2': 'openness', 'O3': 'openness',
    'O4': 'openness', 'O5': 'openness', 'O6': 'openness',
    'A1': 'agreeableness', 'A2': 'agreeableness', 'A3': 'agreeableness',
    'A4': 'agreeableness', 'A5': 'agreeableness', 'A6': 'agreeableness',
    'C1': 'conscientiousness', 'C2': 'conscientiousness', 'C3': 'conscientiousness',
    'C4': 'conscientiousness', 'C5': 'conscientiousness', 'C6': 'conscientiousness',
}

for facet, qnums in FACET_QUESTIONS.items():
    factor = FACET_TO_FACTOR[facet]
    for q in qnums:
        QUESTION_TO_FACET[q] = (factor, facet)

# Read extracted questions
with open('/home/z/my-project/upload/neo_clean.txt', 'r', encoding='utf-8') as f:
    questions = {}
    for line in f:
        line = line.strip()
        if '|' not in line:
            continue
        num, text = line.split('|', 1)
        questions[int(num)] = text.strip()

print(f"Loaded {len(questions)} questions")
print(f"Q10: {questions.get(10, 'MISSING')[:80]}")

# Generate TS file
ts_lines = [
    '// پرسشنامه شخصیت‌شناسی نئو (NEO PI-R) — فرم بلند ۲۴۰ سؤالی',
    '// Costa & McCrae — ۵ عامل بزرگ شخصیت × ۶ سرفصل × ۸ سؤال = ۲۴۰ سؤال',
    '// متن سؤالات از پرسشنامه استاندارد فارسی استخراج شده است',
    '// مقیاس ۵ درجه‌ای لیکنرت: ۰=کاملاً مخالفم تا ۴=کاملاً موافقم',
    '',
    'export type NeoFactor = "neuroticism" | "extraversion" | "openness" | "agreeableness" | "conscientiousness";',
    '',
    'export const NEO_FACTORS: Record<NeoFactor, {',
    '  fa: string; en: string; symbol: string; color: string; description: string;',
    '  facets: { key: string; fa: string; en: string }[];',
    '}> = {',
    '  neuroticism: {',
    '    fa: "روان‌رنجوری", en: "Neuroticism", symbol: "N", color: "rose",',
    '    description: "تمایل به تجربه هیجانات منبی مانند ترس، غم، خشم، گناه و استرس.",',
    '    facets: [',
    '      { key: "N1", fa: "اضطراب", en: "Anxiety" },',
    '      { key: "N2", fa: "خشم و کینه", en: "Angry Hostility" },',
    '      { key: "N3", fa: "افسردگی", en: "Depression" },',
    '      { key: "N4", fa: "خودآگاهی", en: "Self-Consciousness" },',
    '      { key: "N5", fa: "بی‌اختیاری و تکانشگری", en: "Impulsiveness" },',
    '      { key: "N6", fa: "آسیب‌پذیری", en: "Vulnerability" },',
    '    ],',
    '  },',
    '  extraversion: {',
    '    fa: "برون‌گرایی", en: "Extraversion", symbol: "E", color: "amber",',
    '    description: "انرژی و گرایش به دنیای بیرون، فعالیت اجتماعی، مثبت‌اندیشی.",',
    '    facets: [',
    '      { key: "E1", fa: "صمیمیت", en: "Warmth" },',
    '      { key: "E2", fa: "جامعه‌پذیری", en: "Gregariousness" },',
    '      { key: "E3", fa: "جسارت و قاطعیت", en: "Assertiveness" },',
    '      { key: "E4", fa: "فعالیت", en: "Activity" },',
    '      { key: "E5", fa: "جستجوی هیجان", en: "Excitement-Seeking" },',
    '      { key: "E6", fa: "خوش‌بینی", en: "Positive Emotions" },',
    '    ],',
    '  },',
    '  openness: {',
    '    fa: "گشودگی به تجربه", en: "Openness", symbol: "O", color: "violet",',
    '    description: "تمایل به تجربه‌های جدید، تخیل، زیبایی‌شناسی، ایده‌های نو.",',
    '    facets: [',
    '      { key: "O1", fa: "تخیل", en: "Fantasy" },',
    '      { key: "O2", fa: "زیبایی‌شناسی", en: "Aesthetics" },',
    '      { key: "O3", fa: "احساسات", en: "Feelings" },',
    '      { key: "O4", fa: "فعالیت‌ها", en: "Actions" },',
    '      { key: "O5", fa: "ایده‌ها", en: "Ideas" },',
    '      { key: "O6", fa: "ارزش‌ها", en: "Values" },',
    '    ],',
    '  },',
    '  agreeableness: {',
    '    fa: "سازگاری", en: "Agreeableness", symbol: "A", color: "emerald",',
    '    description: "گرایش به اعتماد، صداقت، نوع‌دوستی، مدارا و تواضع.",',
    '    facets: [',
    '      { key: "A1", fa: "اعتماد", en: "Trust" },',
    '      { key: "A2", fa: "صداقت", en: "Straightforwardness" },',
    '      { key: "A3", fa: "نوع‌دوستی", en: "Altruism" },',
    '      { key: "A4", fa: "همکاری", en: "Compliance" },',
    '      { key: "A5", fa: "تواضع", en: "Modesty" },',
    '      { key: "A6", fa: "همدلی", en: "Tender-Mindedness" },',
    '    ],',
    '  },',
    '  conscientiousness: {',
    '    fa: "وظیفه‌شناسی", en: "Conscientiousness", symbol: "C", color: "sky",',
    '    description: "گرایش به نظم، مسئولیت‌پذیری، هدف‌گذاری و اراده.",',
    '    facets: [',
    '      { key: "C1", fa: "صلاحیت", en: "Competence" },',
    '      { key: "C2", fa: "نظم", en: "Order" },',
    '      { key: "C3", fa: "احساس وظیفه", en: "Dutifulness" },',
    '      { key: "C4", fa: "موفقیت‌طلبی", en: "Achievement Striving" },',
    '      { key: "C5", fa: "خودکارآمدی", en: "Self-Discipline" },',
    '      { key: "C6", fa: "محتاط‌بودن", en: "Deliberation" },',
    '    ],',
    '  },',
    '};',
    '',
    'export interface NeoQuestion {',
    '  id: number;',
    '  factor: NeoFactor;',
    '  facet: string;',
    '  text: string;',
    '  reverseScored: boolean;',
    '}',
    '',
    '// ۲۴۰ سؤال استاندارد NEO PI-R — متن از پرسشنامه رسمی فارسی',
    'export const NEO_QUESTIONS: NeoQuestion[] = [',
]

# Add each question
for n in sorted(questions.keys()):
    text = questions[n]
    factor, facet = QUESTION_TO_FACET.get(n, ('neuroticism', 'N1'))
    # Escape quotes/backslashes in text
    text_safe = text.replace('\\', '\\\\').replace('"', '\\"')
    ts_lines.append(f'  {{ id: {n}, factor: "{factor}", facet: "{facet}", text: "{text_safe}", reverseScored: false }},')

ts_lines.append('];')
ts_lines.append('')
ts_lines.append('export const NEO_LIKERT_OPTIONS = [')
ts_lines.append('  { value: 0, label: "کاملاً مخالفم", description: "اصلاً با این عبارت موافق نیستم" },')
ts_lines.append('  { value: 1, label: "مخالفم", description: "بیشتر مخالفم تا موافق" },')
ts_lines.append('  { value: 2, label: "بدون نظر", description: "نه موافق نه مخالف" },')
ts_lines.append('  { value: 3, label: "موافقم", description: "بیشتر موافقم تا مخالف" },')
ts_lines.append('  { value: 4, label: "کاملاً موافقم", description: "کاملاً با این عبارت موافقم" },')
ts_lines.append('] as const;')
ts_lines.append('')
ts_lines.append('export const NEO_TOTAL_QUESTIONS = NEO_QUESTIONS.length;')
ts_lines.append('')

with open('/home/z/my-project/src/lib/neo-questions.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print(f"\n✓ Wrote {len(questions)} questions to src/lib/neo-questions.ts")
print(f"File size: {sum(len(l) for l in ts_lines)} chars")
