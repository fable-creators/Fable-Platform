"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useAnimationControls,
  Variants,
} from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0 },
};

const BackToTopButton: React.FC = () => {
  const { scrollY } = useScroll();
  const controls = useAnimationControls();
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    const updateBackToTopButton = () => {
      if (scrollY.get() > 100) {
        controls.start("show");
      } else {
        controls.start("hide");
      }
      setDebugInfo(`Scroll position: ${scrollY.get().toFixed(2)}`);
    };

    const unsubscribe = scrollY.on("change", updateBackToTopButton);
    return () => unsubscribe();
  }, [scrollY, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 z-[9999] p-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg"
        variants={ScrollToTopContainerVariants}
        initial="hide"
        animate={controls}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <FaArrowUp size={24} />
      </motion.button>
      <div className="fixed bottom-20 right-8 z-[9999] bg-white text-black p-2 text-xs">
        {debugInfo}
      </div>
    </>
  );
};

export default BackToTopButton;
