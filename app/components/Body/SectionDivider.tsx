"use client";

import React from "react";
import { useTheme } from "next-themes";
import AnimatedSection from "../animated-section";

export const SectionDivider: React.FC = () => {
  const { theme } = useTheme();

  return (
    <AnimatedSection>
      <div className="w-full px-4 py-12">
        <div className="relative overflow-hidden max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            <div
              className={theme === "light" ? "divider-light" : "divider-dark"}
              style={{ width: "1800px", maxWidth: "100%" }}
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
