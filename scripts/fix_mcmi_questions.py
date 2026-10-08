"""Apply specific MCMI question text fixes."""
import re

with open('/home/z/my-project/src/lib/mcmi-questions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

FIXES = {
    52: "اعتیاد من مشکلاتی برای من و خانواده ام به وجود آورده است.",
    144: "من معتقدم که همه را خوشحال می کنم و دیگران مرا به خاطر کارهایی که انجام می دهم و حرف هایی که می زنم تحسین می کنند.",
    152: "من مشکل اعتیاد دارم و تلاشم برای کنارگذاشتن آن ناموفق بوده است.",
    153: "عده ای تلاش می کنند افکارم را کنترل کنند.",
    154: "قبلا تلاش کرده ام خودم را بکشم.",
    155: "من گرسنگی می کشم تا از همین هم که هست لاغر تر شوم.",
    170: "من هر کار را چند بار انجام می دهم. گاهی به خاطر کاهش نگرانیم و گاهی به خاطر این که مطمئن شوم حادثه بدی اتفاق نمی افتد.",
}

lines = content.split('\n')
fixed_count = 0
for i, line in enumerate(lines):
    for q_num, new_text in FIXES.items():
        if re.match(rf'^\s*\{{\s*id:\s*{q_num},', line):
            text_safe = new_text.replace('\\', '\\\\').replace('"', '\\"')
            lines[i] = f'  {{ id: {q_num}, text: "{text_safe}" }},'
            fixed_count += 1
            break

content = '\n'.join(lines)
with open('/home/z/my-project/src/lib/mcmi-questions.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Fixed {fixed_count}/{len(FIXES)} MCMI questions")
