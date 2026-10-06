"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Calendar, GraduationCap, Phone, Mail, MapPin } from "lucide-react";

export interface PersonalInfo {
  fullName: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  education: string;
  occupation: string;
  city: string;
  date: string;
}

interface PersonalInfoFormProps {
  values: PersonalInfo;
  errors: Partial<Record<keyof PersonalInfo, string>>;
  onChange: (field: keyof PersonalInfo, value: string) => void;
}

export function PersonalInfoForm({ values, errors, onChange }: PersonalInfoFormProps) {
  return (
    <Card className="border-primary/20 shadow-sm bg-gradient-to-br from-card via-card to-accent/30">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-primary">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </span>
          اطلاعات فردی
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          لطفاً پیش از آغاز پاسخگویی، اطلاعات زیر را تکمیل کنید. این اطلاعات صرفاً برای تحلیل آماری استفاده می‌شود و کاملاً محرمانه خواهد ماند.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="نام و نام خانوادگی"
            icon={<User className="h-4 w-4" />}
            error={errors.fullName}
            required
          >
            <Input
              value={values.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="مثلاً: مریم احمدی"
              className="bg-background"
            />
          </Field>

          <Field label="سن" icon={<Calendar className="h-4 w-4" />} error={errors.age} required>
            <Input
              type="number"
              min={10}
              max={100}
              value={values.age}
              onChange={(e) => onChange("age", e.target.value)}
              placeholder="مثلاً: ۲۸"
              className="bg-background"
            />
          </Field>

          <Field label="جنسیت" icon={<User className="h-4 w-4" />} error={errors.gender} required>
            <Select value={values.gender} onValueChange={(v) => onChange("gender", v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="انتخاب کنید..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">خانم</SelectItem>
                <SelectItem value="male">آقا</SelectItem>
                <SelectItem value="other">ترجیح می‌دهم نگویم</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="بالاترین سطح تحصیلات" icon={<GraduationCap className="h-4 w-4" />} error={errors.education}>
            <Select value={values.education} onValueChange={(v) => onChange("education", v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="انتخاب کنید..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diploma">دیپلم</SelectItem>
                <SelectItem value="associate">کاردانی</SelectItem>
                <SelectItem value="bachelor">کارشناسی</SelectItem>
                <SelectItem value="master">کارشناسی ارشد</SelectItem>
                <SelectItem value="phd">دکترا</SelectItem>
                <SelectItem value="other">سایر</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="شماره تماس" icon={<Phone className="h-4 w-4" />} error={errors.phone}>
            <Input
              value={values.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              inputMode="tel"
              dir="ltr"
              className="bg-background text-right"
            />
          </Field>

          <Field label="پست الکترونیکی" icon={<Mail className="h-4 w-4" />} error={errors.email}>
            <Input
              type="email"
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="example@email.com"
              dir="ltr"
              className="bg-background text-right"
            />
          </Field>

          <Field label="شغل / حوزه فعالیت" icon={<GraduationCap className="h-4 w-4" />} error={errors.occupation}>
            <Input
              value={values.occupation}
              onChange={(e) => onChange("occupation", e.target.value)}
              placeholder="مثلاً: دانشجو، معلم، مهندس"
              className="bg-background"
            />
          </Field>

          <Field label="شهر محل سکونت" icon={<MapPin className="h-4 w-4" />} error={errors.city}>
            <Input
              value={values.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="مثلاً: مشهد"
              className="bg-background"
            />
          </Field>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-accent/50 p-3 text-xs text-muted-foreground">
          <span className="text-primary mt-0.5">🔒</span>
          <p>
            تمامی اطلاعات شما با رعایت اصول اخلاقی و محرمانگی پردازش می‌شود و در اختیار اشخاص ثالث قرار نمی‌گیرد. هدف از جمع‌آوری این داده‌ها صرفاً تحلیل آماری و بهبود کیفیت خدمات آموزشی آکادمی است.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  icon,
  error,
  required,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        <span className="text-muted-foreground">{icon}</span>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">{error}</p>}
    </div>
  );
}
