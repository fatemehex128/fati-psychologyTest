"""Extract 240 NEO PI-R questions from PDF using -layout mode."""
import re
import subprocess

result = subprocess.run(
    ['pdftotext', '-layout', '/home/z/my-project/upload/پرسشناامه و نحوه نمره گذاری.pdf', '-'],
    capture_output=True, text=True
)
text = result.stdout

for ch in ['\u200f', '\u200e', '\u202b', '\u202a', '\u202c', '\ufeff']:
    text = text.replace(ch, '')

lines = text.split('\n')

questions = {}
i = 0
while i < len(lines):
    stripped = lines[i].strip()
    if not stripped:
        i += 1
        continue

    # Skip headers/footers
    skip_markers = ['madsg', 'questionnaire', 'پرسشنامه', 'پنج عاملی', 'فرم بلند', 'روش نمره',
                    'خردہ مقیاس', 'شاخص', 'گزینه', 'کاملا رد', 'کاملا قبول', 'کلید', 'تفسیر',
                    'نمرات', 'گزارش', 'NEO']
    if any(s in stripped for s in skip_markers):
        i += 1
        continue

    # Case A: Line is JUST a number 1-240 (continuation pattern: text-num-text)
    if re.match(r'^\d{1,3}$', stripped):
        num = int(stripped)
        if 1 <= num <= 240 and num not in questions:
            # Look BACK for text lines
            text_parts = []
            j = i - 1
            while j >= 0:
                prev = lines[j].strip()
                if not prev:
                    break
                # Stop if previous line ends with a number (another question)
                if re.search(r'\d{1,3}\s*$', prev):
                    prev_match = re.search(r'^(.+?)\s+(\d{1,3})\s*$', prev)
                    if prev_match:
                        break
                if any(s in prev for s in skip_markers):
                    break
                if re.match(r'^[\d\s\.]+$', prev):
                    break
                text_parts.insert(0, prev)
                j -= 1

            # Look FORWARD for continuation text
            j = i + 1
            forward_parts = []
            while j < len(lines):
                nxt = lines[j].strip()
                if not nxt:
                    break
                # Stop if next line ends with a number (another question)
                if re.search(r'\d{1,3}\s*$', nxt):
                    nxt_match = re.search(r'^(.+?)\s+(\d{1,3})\s*$', nxt)
                    if nxt_match:
                        break
                if re.match(r'^\d{1,3}$', nxt):
                    break
                if any(s in nxt for s in skip_markers):
                    break
                if re.match(r'^[\d\s\.]+$', nxt):
                    break
                forward_parts.append(nxt)
                j += 1

            all_parts = text_parts + forward_parts
            if all_parts:
                full_text = ' '.join(all_parts)
                full_text = re.sub(r'\s+', ' ', full_text).strip()
                if len(full_text) > 3:
                    questions[num] = full_text
                i = j
            else:
                i += 1
            continue

    # Skip pure scoring table rows (not question number-only)
    if re.match(r'^[\d\s۰-۹\.\-\(\)×]+$', stripped):
        i += 1
        continue

    # Case B: Line has format "<text> <number>"
    match = re.search(r'^(.+?)\s+(\d{1,3})\s*$', stripped)
    if match:
        text_part = match.group(1).strip()
        num = int(match.group(2))
        if 1 <= num <= 240 and not re.match(r'^[\d\s\.]+$', text_part) and len(text_part) > 2:
            # Check next line — if it's text without a number, it's continuation
            full_text = text_part
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j < len(lines):
                next_stripped = lines[j].strip()
                if (next_stripped
                    and not re.match(r'^\d{1,3}$', next_stripped)
                    and not re.search(r'\d{1,3}\s*$', next_stripped)
                    and len(next_stripped) > 3
                    and not re.match(r'^[\d\s\.]+$', next_stripped)
                    and not any(s in next_stripped for s in skip_markers)):
                    full_text = full_text + ' ' + next_stripped
                    i = j + 1
                else:
                    i += 1
            else:
                i += 1

            full_text = re.sub(r'\s+', ' ', full_text).strip()
            # Strip "پرسشنامه ..." suffix from Q240
            full_text = re.sub(r'\s*پرسشنامه.*$', '', full_text).strip()
            questions[num] = full_text
            continue

    i += 1

print(f"Total: {len(questions)}")
expected = set(range(1, 241))
found = set(questions.keys())
missing = sorted(expected - found)
print(f"Missing ({len(missing)}): {missing}")

print(f"\nFirst 3:")
for n in sorted(questions.keys())[:3]:
    print(f"{n}. {questions[n][:100]}")
print(f"\nQ10 (was missing):")
if 10 in questions:
    print(f"10. {questions[10][:100]}")
print(f"\nQ175 (was missing):")
if 175 in questions:
    print(f"175. {questions[175][:100]}")
print(f"\nLast 3:")
for n in sorted(questions.keys())[-3:]:
    print(f"{n}. {questions[n][:100]}")

# Save
with open('/home/z/my-project/upload/neo_clean.txt', 'w', encoding='utf-8') as f:
    for n in sorted(questions.keys()):
        f.write(f"{n}|{questions[n]}\n")
print(f"\nSaved {len(questions)} questions to neo_clean.txt")
