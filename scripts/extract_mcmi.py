"""Extract MCMI-III questions from PDF text file."""
import re

with open('/home/z/my-project/upload/mehvar.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Clean up: remove RTL marks, zero-width chars
text = text.replace('\u200f', '').replace('\u200e', '').replace('\u202b', '').replace('\u202a', '').replace('\u202c', '')

# Find all lines that start with . NUMBER (with possible space)
# Pattern: optional whitespace, dot, space, number, optional space/dot, space, text
pattern = re.compile(r'^[\s]*\.\s*(\d+)\s*[\.\u066b\u066c]?\s*(.+?)$', re.MULTILINE)
matches = pattern.findall(text)

# Also catch "1." without leading dot
pattern2 = re.compile(r'^[\s]*(\d+)\s*[\.\u066b\u066c]\s+(.+?)$', re.MULTILINE)
matches2 = pattern2.findall(text)

# Combine unique by text
seen = set()
questions = []

for num, q in matches + matches2:
    q = q.strip()
    if len(q) < 8 or 'madsg' in q.lower() or 'questionnaire' in q.lower():
        continue
    key = q[:50]
    if key in seen:
        continue
    seen.add(key)
    questions.append((int(num), q))

# Print first and last few
print(f"Total extracted: {len(questions)}")
print("\n=== First 5 ===")
for n, q in questions[:5]:
    print(f"{n}. {q[:80]}")
print("\n=== Last 5 ===")
for n, q in questions[-5:]:
    print(f"{n}. {q[:80]}")
print("\n=== Question 10, 20, 100, 150 ===")
for n, q in questions:
    if n in [10, 20, 30, 50, 100, 150, 175]:
        print(f"{n}. {q[:80]}")

# Save full list
with open('/home/z/my-project/upload/mcmi_clean.txt', 'w', encoding='utf-8') as f:
    for n, q in questions:
        f.write(f"{n}|{q}\n")
print(f"\nSaved to mcmi_clean.txt")
