"use client";

import { useState, useEffect } from "react";
import { LandingPage } from "@/components/landing-page";
import { TestRunner } from "@/components/test-runner";
import type { TestId } from "@/lib/tests-config";

export default function Home() {
  const [selectedTest, setSelectedTest] = useState<TestId | null>(null);

  // Scroll to top on test change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [selectedTest]);

  if (selectedTest) {
    return (
      <TestRunner
        testId={selectedTest}
        onBack={() => setSelectedTest(null)}
      />
    );
  }

  return <LandingPage onSelectTest={(id) => setSelectedTest(id)} />;
}
