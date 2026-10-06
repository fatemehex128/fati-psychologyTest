"""Generate the MCMI questions TS file from extracted text.
We renumber sequentially 1-175 since order is preserved.
Clean up Persian typography (commas, spacing)."""
import re

with open('/home/z/my-project/upload/mcmi_clean.txt', 'r', encoding='utf-8') as f:
    lines = [l.strip() for l in f.readlines() if l.strip()]

questions = []
for line in lines:
    # Split on first | (number|text)
    if '|' not in line:
        continue
    num, text = line.split('|', 1)
    text = text.strip()
    # Clean up typography
    # Replace " ،" with "،" (no space before comma)
    text = re.sub(r'\s+،', '،', text)
    # Replace " ، " patterns
    text = re.sub(r' ، ', '، ', text)
    # Replace double spaces
    text = re.sub(r'\s{2,}', ' ', text)
    # Replace " ." with "." 
    text = re.sub(r'\s+\.', '.', text)
    # Fix "کندبه" -> "کند، به" (typo in original)
    text = text.replace('کندبه', 'کند، به')
    # Fix "لذن" -> "لذت" (typo)
    text = text.replace('لذن', 'لذت')
    questions.append(text)

print(f"Total: {len(questions)}")
for i, q in enumerate(questions[:3], 1):
    print(f"{i}. {q}")
print("...")
for i, q in enumerate(questions[-3:], 173):
    print(f"{i}. {q}")

# Generate TS file content
ts_lines = ['// پرسشنامه چندمحوری بالینی میلون (MCMI-III) — ۱۷۵ سؤال استاندارد']
ts_lines.append('// منبع: پرسشنامه استاندارد MCMI-III (نسخه فارسی) — متن اصلی سؤالات حفظ شده است')
ts_lines.append('// مقیاس پاسخ: بله / خیر')
ts_lines.append('')
ts_lines.append('export interface McmiQuestion {')
ts_lines.append('  id: number;')
ts_lines.append('  text: string;')
ts_lines.append('}')
ts_lines.append('')
ts_lines.append('// ۱۷۵ سؤال استاندارد MCMI-III — متن عیناً از پرسشنامه رسمی')
ts_lines.append('export const MCMI_QUESTIONS: McmiQuestion[] = [')
for i, q in enumerate(questions, 1):
    # Escape any quotes/backticks in text
    q_safe = q.replace('\\', '\\\\').replace('"', '\\"')
    ts_lines.append(f'  {{ id: {i}, text: "{q_safe}" }},')
ts_lines.append('];')
ts_lines.append('')
ts_lines.append('export const MCMI_RESPONSE_OPTIONS = [')
ts_lines.append('  { value: 1, label: "بله", description: "این عبارت در مورد من صدق می‌کند" },')
ts_lines.append('  { value: 0, label: "خیر", description: "این عبارت در مورد من صدق نمی‌کند" },')
ts_lines.append('] as const;')
ts_lines.append('')
ts_lines.append('export const MCMI_TOTAL_QUESTIONS = MCMI_QUESTIONS.length;')
ts_lines.append('')

with open('/home/z/my-project/src/lib/mcmi-questions.ts', 'w', encoding='utf-8') as f:
    f.write('\n'.join(ts_lines))

print(f"\n✓ Wrote {len(questions)} questions to src/lib/mcmi-questions.ts")
