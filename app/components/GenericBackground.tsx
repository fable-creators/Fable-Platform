"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";

interface BackgroundProps {
  imageSrc?: string;
  children: ReactNode;
  overlay?: boolean;
  fullHeight?: boolean;
}

export default function Background({
  imageSrc = "/fable_generic.png",
  children,
  overlay = true,
  fullHeight = true,
}: BackgroundProps) {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        setHeaderHeight(headerElement.clientHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  return (
    <div
      className={`relative ${fullHeight ? "min-h-screen" : ""} w-full overflow-x-hidden`}
    >
      {/* Background Image */}
      <div
        className="fixed inset-x-0 bottom-0 z-[-1]"
        style={{ top: `${headerHeight}px` }}
      >
        <Image
          src={imageSrc}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      {/* Gradient Overlay */}
      {overlay && (
        <div
          className="fixed inset-x-0 bottom-0 z-0 bg-gradient-custom from-sky/90 via-sand/90 to-coffee/90 dark:from-grape/90 dark:via-plum/90 dark:to-midnight/90"
          style={{ top: `${headerHeight}px` }}
        ></div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
