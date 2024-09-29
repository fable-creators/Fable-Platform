"use client";

import { useState, useEffect, useRef } from "react";
import PageTemplate from "../pages/PageTemplate";

export default function ScrollAwareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const controlNavbar = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      const currentScrollY = window.scrollY;

      console.log(
        "Intersection observed:",
        entry.isIntersecting,
        "Current scroll:",
        currentScrollY,
      );

      if (entry.isIntersecting) {
        setIsNavbarVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current) {
          setIsNavbarVisible(false);
        } else {
          setIsNavbarVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    observer.current = new IntersectionObserver(controlNavbar, {
      threshold: 0,
    });

    const target = document.createElement("div");
    target.style.position = "absolute";
    target.style.top = "0";
    target.style.left = "0";
    target.style.right = "0";
    target.style.height = "1px";
    document.body.prepend(target);

    if (observer.current) {
      observer.current.observe(target);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      target.remove();
    };
  }, []);

  console.log("Rendering ScrollAwareLayout, isNavbarVisible:", isNavbarVisible);

  return (
    <PageTemplate isNavbarVisible={isNavbarVisible}>{children}</PageTemplate>
  );
}
