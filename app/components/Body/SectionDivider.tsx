"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import AnimatedSection from "../animated-section";

export const SectionDivider: React.FC = () => {
  const { theme } = useTheme();

  return (
    <AnimatedSection>
      <div className="w-full px-4 py-12">
        <div className="relative overflow-hidden max-w-4xl mx-auto">
          <div className="flex items-center justify-center">
            {theme === "light" ? (
              <Image
                src="/Dark_mode_divider_v2.webp"
                alt=""
                width={1800}
                height={6}
                className="w-auto h-auto"
              />
            ) : (
              <Image
                src="/devider_v2.png"
                alt=""
                width={1800}
                height={6}
                className="w-auto h-auto"
              />
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
