"""Apply specific NEO question text fixes - round 2."""
import re

with open('/home/z/my-project/src/lib/neo-questions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Map of question number -> new text (clean, complete versions)
FIXES = {
    9: "من آدم حیله گر و مکاری نیستم.",
    57: "من بعضی وقتها حالات شادی یا نشاط بسیار شدیدی را تجربه یا احساس کرده ام.",
    79: "در نشان دادن خشم و عصبانیت درنگ و تأمل می کنم، حتی اگر احساس کنم حق با من است.",
    85: "آدم سازنده و مولدی هستم و همیشه مسئولیت‌های خود را به انجام می رسانم.",
    134: "من به سخاوت و دست و دلبازی مشهور نیستم.",
    174: "من احساس می‌کنم مزیت‌یاری بر افراد دیگر ندارم (صرف نظر از موقعیت و وضع افراد).",
}

# Use line-based approach for reliability
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
