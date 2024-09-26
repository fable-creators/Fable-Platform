"use client";

import { useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import VideoPreloader from "./components/VideoPreloader";
import PageTemplate from "./components/pages/PageTemplate";
import LandingPage from "./components/pages/LandingPage";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const handleVideoEnd = () => {
    setShowPreloader(false);
    setShowContent(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showPreloader) {
        setShowPreloader(false);
        setShowContent(true);
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timer);
  }, [showPreloader]);

  return (
    <ErrorBoundary>
      {showPreloader && <VideoPreloader onVideoEnd={handleVideoEnd} />}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <PageTemplate isNavbarVisible={isNavbarVisible}>
          <LandingPage />
        </PageTemplate>
      </div>
    </ErrorBoundary>
  );
}
