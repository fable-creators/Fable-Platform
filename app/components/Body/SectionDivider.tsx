"use client";

import React from "react";
import Image from "next/image";
import AnimatedSection from "../animated-section";

export const SectionDivider: React.FC = () => {
  return (
    <AnimatedSection>
      <div className="w-full px-4 py-12">
        <div className="relative h-[6px] overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-repeat-x transition-all duration-1000 ease-in-out transform origin-center scale-x-0 animate-scale-x">
              <Image
                src="/divider300x.png"
                alt=""
                width={300}
                height={6}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};