'use client'

import { useState, useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";
import VideoPreloader from "./VideoPreloader";
import LandingPage from "./LandingPage";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    const hasPlayedVideo = sessionStorage.getItem("hasPlayedVideo");

    if (hasPlayedVideo === "true") {
      setShowPreloader(false);
      setShowContent(true);
    } else {
      sessionStorage.setItem("hasPlayedVideo", "pending");
    }

    const handleBeforeUnload = () => {
      if (sessionStorage.getItem("hasPlayedVideo") === "pending") {
        sessionStorage.removeItem("hasPlayedVideo");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleVideoEnd = () => {
    sessionStorage.setItem("hasPlayedVideo", "true");
    setShowPreloader(false);
    setShowContent(true);
  };

  return (
    <ErrorBoundary>
      {showPreloader && <VideoPreloader onVideoEnd={handleVideoEnd} />}
      {showContent && <LandingPage setIsNavbarVisible={setIsNavbarVisible} />} 
    </ErrorBoundary>
  );
}