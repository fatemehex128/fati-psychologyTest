"use client";

import { useState, useEffect } from "react";
import { LandingPage } from "@/components/landing-page";
import { TermsPage } from "@/components/terms-page";
import { TestRunner } from "@/components/test-runner";
import type { TestId } from "@/lib/tests-config";

export default function Home() {
  const [selectedTest, setSelectedTest] = useState<TestId | null>(null);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [selectedTest, showTerms]);

  if (selectedTest && showTerms) {
    return (
      <TermsPage
        testId={selectedTest}
        onAgree={() => setShowTerms(false)}
        onBack={() => {
          setSelectedTest(null);
          setShowTerms(false);
        }}
      />
    );
  }

  if (selectedTest) {
    return (
      <TestRunner
        testId={selectedTest}
        onBack={() => setSelectedTest(null)}
      />
    );
  }

  return (
    <LandingPage
      onSelectTest={(id) => {
        setSelectedTest(id);
        setShowTerms(true);
      }}
    />
  );
}
