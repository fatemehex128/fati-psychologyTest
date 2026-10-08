"""Regenerate the NEO questions TS file with the correct facet assignments
based on the user's official scoring PDF.

Pattern from PDF:
- Q1=N1, Q2=E1, Q3=O1, Q4=A1, Q5=C1
- Q6=N2, Q7=E2, Q8=O2, Q9=A2, Q10=C2
- ... (cycles through N, E, O, A, C every 5 questions, incrementing the facet number every 5*6=30)

Each facet has 8 questions.
We also extract reverseScored from the scoring data (کاملا موافق = 0 → reverseScored=true)
"""
import json
import re

# Load scoring data
with open('/home/z/my-project/upload/neo_scoring_data.json', 'r', encoding='utf-8') as f:
    scoring = json.load(f)

# Read existing NEO questions to extract their text
with open('/home/z/my-project/src/lib/neo-questions.ts', 'r', encoding='utf-8') as f:
    existing_content = f.read()

# Extract text for each question by id
question_texts = {}
for line in existing_content.split('\n'):
    match = re.match(r'\s*\{\s*id:\s*(\d+),\s*factor:\s*"[^"]*",\s*facet:\s*"[^"]*",\s*text:\s*"(.+)",\s*reverseScored:\s*\w+\s*\},', line)
    if match:
        q_num = int(match.group(1))
        text = match.group(2)
        question_texts[q_num] = text

print(f"Extracted text for {len(question_texts)} questions")

# Map facet code to factor
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

# Generate the new TS file
ts_lines = [
    '// پرسشنامه شخصیت‌شناسی نئو (NEO PI-R) — فرم بلند ۲۴۰ سؤالی',
    '// Costa & McCrae — ۵ عامل بزرگ شخصیت × ۶ سرفصل × ۸ سؤال = ۲۴۰ سؤال',
    '// متن سؤالات از پرسشنامه استاندارد فارسی استخراج شده است',
    '// نگاشت زیرمقیاس‌ها و نمره‌گذاری معکوس بر اساس فایل رسمی نمره‌گذاری',
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
    '      { key: "N2", fa: "خشم و پرخاشگری", en: "Angry Hostility" },',
    '      { key: "N3", fa: "افسردگی", en: "Depression" },',
    '      { key: "N4", fa: "حساسیت به خویشتن", en: "Self-Consciousness" },',
    '      { key: "N5", fa: "تکانشگری", en: "Impulsiveness" },',
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
    '      { key: "A2", fa: "صادگی", en: "Straightforwardness" },',
    '      { key: "A3", fa: "نوع‌دوستی", en: "Altruism" },',
    '      { key: "A4", fa: "همکاری/تبعیت", en: "Compliance" },',
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
    '// نگاشت زیرمقیاس‌ها و نمره‌گذاری معکوس از فایل رسمی نمره‌گذاری',
    'export const NEO_QUESTIONS: NeoQuestion[] = [',
]

# Add each question with correct facet from PDF
missing = []
for q_num in range(1, 241):
    q_str = str(q_num)
    if q_str not in scoring:
        missing.append(q_num)
        continue
    data = scoring[q_str]
    facet = data['facet']
    factor = FACET_TO_FACTOR[facet]
    # Reverse-scored: کاملا موافق = 0
    reverse_scored = data['completely_agree'] == 0
    text = question_texts.get(q_num, '???')
    text_safe = text.replace('\\', '\\\\').replace('"', '\\"')
    rs_str = 'true' if reverse_scored else 'false'
    ts_lines.append(f'  {{ id: {q_num}, factor: "{factor}", facet: "{facet}", text: "{text_safe}", reverseScored: {rs_str} }},')

ts_lines.append('];')
ts_lines.append('')
ts_lines.append('export const NEO_LIKERT_OPTIONS = [')
ts_lines.append('  { value: 0, label: "کاملاً مخالفم", description: "اصلاً با این عبارت موافق نیستم" },')
ts_lines.append('  { value: 1, label: "مخالفم", description: "بیشتر مخالفم تا موافق" },')
ts_lines.append('  { value: 2, label: "نظری ندارم", description: "نه موافق نه مخالف" },')
ts_lines.append('  { value: 3, label: "موافقم", description: "بیشتر موافقم تا مخالف" },')
ts_lines.append('  { value: 4, label: "کاملاً موافقم", description: "کاملاً با این عبارت موافقم" },')
ts_lines.append('] as const;')
ts_lines.append('')
ts_lines.append('export const NEO_TOTAL_QUESTIONS = NEO_QUESTIONS.length;')
ts_lines.append('')

if missing:
    print(f"⚠️ Missing questions in scoring data: {missing}")
else:
    print("✅ All 240 questions have scoring data")

with open('/home/z/my-project/src/lib/neo-questions.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

# Stats
reverse_count = sum(1 for q in scoring.values() if q['completely_agree'] == 0)
print(f"\n✓ Wrote 240 questions to src/lib/neo-questions.ts")
print(f"✓ Reverse-scored questions: {reverse_count}")
print(f"✓ Forward-scored questions: {240 - reverse_count}")
