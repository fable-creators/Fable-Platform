"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "./components/NavBar_Comp/Navbar";
import Header from "./components/Header/Header";
import GamesList from "./components/Body/GamesList";
import Footer from "./components/Footer/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import VideoPreloader from "./components/VideoPreloader";
import BooksList from "./components/Body/BooksList";
import { SectionDivider } from "./components/Body/SectionDivider";
import DraggableWidget from "./components/RadialMenuWidget/DraggableWidget";


const ExploreSection = dynamic(() => import("./components/Body/ExploreSection"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [widgetPosition, setWidgetPosition] = useState({ x: 20, y: 20 });

  const handleVideoEnd = () => {
    setShowPreloader(false);
    setShowContent(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showPreloader) {
        console.log("Fallback timer triggered");
        handleVideoEnd();
      }
    }, 25000); // 25 seconds fallback

    return () => clearTimeout(timer);
  }, [showPreloader]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsNavbarVisible(currentScrollPos < 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ErrorBoundary>
      {showPreloader && <VideoPreloader onVideoEnd={handleVideoEnd} />}
      <div
        className={`fable-platform ${
          showContent ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <Navbar isVisible={isNavbarVisible} />
        <Header />
        <main className="min-h-screen">
          <SectionDivider />
          <GamesList />
          <SectionDivider />
          <BooksList />
          <SectionDivider />
          <ExploreSection />
        </main>
        <Footer />
        <DraggableWidget
          isVisible={!isNavbarVisible}
          position={widgetPosition}
          setPosition={setWidgetPosition}
        />
      </div>
    </ErrorBoundary>
  );
}
