"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

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
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <User className="h-4 w-4 text-muted-foreground" />
          اطلاعات فردی
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="نام و نام خانوادگی" error={errors.fullName} required>
            <Input
              value={values.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="مثلاً: مریم احمدی"
            />
          </Field>

          <Field label="سن" error={errors.age} required>
            <Input
              type="number"
              min={10}
              max={100}
              value={values.age}
              onChange={(e) => onChange("age", e.target.value)}
              placeholder="مثلاً: ۲۸"
            />
          </Field>

          <Field label="جنسیت" error={errors.gender} required>
            <Select value={values.gender} onValueChange={(v) => onChange("gender", v)}>
              <SelectTrigger>
                <SelectValue placeholder="انتخاب کنید..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="female">خانم</SelectItem>
                <SelectItem value="male">آقا</SelectItem>
                <SelectItem value="other">ترجیح می‌دهم نگویم</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="تحصیلات" error={errors.education}>
            <Select value={values.education} onValueChange={(v) => onChange("education", v)}>
              <SelectTrigger>
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

          <Field label="شماره تماس" error={errors.phone}>
            <Input
              value={values.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
              inputMode="tel"
              dir="ltr"
              className="text-right"
            />
          </Field>

          <Field label="ایمیل" error={errors.email}>
            <Input
              type="email"
              value={values.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="example@email.com"
              dir="ltr"
              className="text-right"
            />
          </Field>

          <Field label="شغل" error={errors.occupation}>
            <Input
              value={values.occupation}
              onChange={(e) => onChange("occupation", e.target.value)}
              placeholder="مثلاً: دانشجو"
            />
          </Field>

          <Field label="شهر" error={errors.city}>
            <Input
              value={values.city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="مثلاً: مشهد"
            />
          </Field>
        </div>

        <p className="text-[11px] text-muted-foreground">
          🔒 اطلاعات شما محرمانه است و فقط برای تحلیل آماری استفاده می‌شود.
        </p>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-medium text-muted-foreground">
        {label}
        {required && <span className="text-destructive mr-0.5">*</span>}
      </Label>
      {children}
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  );
}
