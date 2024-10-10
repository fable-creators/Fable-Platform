"use client";

import React from "react";
import AnimatedSection from "../animated-section";

export const SectionDivider: React.FC = () => {
  return (
    <AnimatedSection>
      <div className="w-full px-4 py-8">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t-2 border-plum dark:border-sand transition-all duration-1000 ease-in-out transform origin-left scale-x-0 animate-scale-x"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-sky dark:bg-midnight px-3 text-sm text-coffee dark:text-sky font-semibold opacity-0 animate-fade-in">
              •••
            </span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
