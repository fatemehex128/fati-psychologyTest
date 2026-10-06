"use client";

import { NEED_CATEGORIES } from "@/lib/glasser-questions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export function NeedsLegend() {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-accent/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base text-foreground">
          <Info className="h-4 w-4 text-primary" />
          راهنمای پنج نیاز اساسی گلاسر
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(NEED_CATEGORIES).map(([key, cat]) => (
            <div
              key={key}
              className="rounded-xl border border-border bg-background/60 p-3 transition-colors hover:border-primary/30 hover:bg-accent/30"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-foreground">{cat.fa}</span>
                <span className="mr-auto text-[10px] font-mono text-muted-foreground">
                  {cat.en}
                </span>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">{cat.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
