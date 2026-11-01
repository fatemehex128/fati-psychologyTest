"""Apply NEO Q204 and Q238 fixes."""
import re

with open('/home/z/my-project/src/lib/neo-questions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

FIXES = {
    204: "من ترجیح می‌دهم از دیگران تمدید شود تا اینکه خودم مورد تمدید قرار گیرم.",
    238: "به عقیده من فلسفه جدید «آزادی فردی» فلسفه قابل قبولی نیست.",
}

lines = content.split('\n')
fixed_count = 0
for i, line in enumerate(lines):
    for q_num, new_text in FIXES.items():
        if re.match(rf'^\s*\{{\s*id:\s*{q_num},', line):
            factor_match = re.search(r'factor:\s*"([^"]*)"', line)
            facet_match = re.search(r'facet:\s*"([^"]*)"', line)
            rs_match = re.search(r'reverseScored:\s*(\w+)', line)
            if factor_match and facet_match and rs_match:
                factor = factor_match.group(1)
                facet = facet_match.group(1)
                rs = rs_match.group(1)
                text_safe = new_text.replace('\\', '\\\\').replace('"', '\\"')
                lines[i] = f'  {{ id: {q_num}, factor: "{factor}", facet: "{facet}", text: "{text_safe}", reverseScored: {rs} }},'
                fixed_count += 1
                print(f"✓ Fixed Q{q_num}: {new_text[:60]}...")
                break

content = '\n'.join(lines)
with open('/home/z/my-project/src/lib/neo-questions.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nTotal fixed: {fixed_count}/{len(FIXES)}")
