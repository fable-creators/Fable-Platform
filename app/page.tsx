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

  useEffect(() => {
    const hasPlayedVideo = sessionStorage.getItem('hasPlayedVideo');

    if (hasPlayedVideo === 'true') {
      setShowPreloader(false);
      setShowContent(true);
    } else {
      sessionStorage.setItem('hasPlayedVideo', 'pending');
    }

    const handleBeforeUnload = () => {
      if (sessionStorage.getItem('hasPlayedVideo') === 'pending') {
        sessionStorage.removeItem('hasPlayedVideo');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem('hasPlayedVideo', 'true');
    setShowPreloader(false);
    setShowContent(true);
  };

  return (
    <ErrorBoundary>
      {showPreloader && (
        <VideoPreloader onVideoEnd={handleVideoEnd} />
      )}
      {showContent && (
          <LandingPage setIsNavbarVisible={setIsNavbarVisible} />
      )}
    </ErrorBoundary>
  );
}