"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "../components/Header/Header";
import { SectionDivider }  from "../components/Body/SectionDivider";
import GamesList from "../components/Body/GamesList";
import BooksList from "../components/Body/BooksList";
import ExploreSection from "../components/Body/ExploreSection";

type LandingPageProps = {
  setIsNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LandingPage: React.FC<LandingPageProps> = ({ setIsNavbarVisible }) => {
  const [heroHeight, setHeroHeight] = useState(0);

  useEffect(() => {
    const updateHeroHeight = () => {
      const heroElement = document.querySelector('.hero-banner');
      if (heroElement) {
        setHeroHeight(heroElement.clientHeight);
      }
    };

    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);

    return () => {
      window.removeEventListener('resize', updateHeroHeight);
    };
  }, []);

  return (
    <div className="min-h-screen landing-page">
      <div 
        className="fixed inset-x-0 bottom-0 z-[-1]"
        style={{ top: `${heroHeight}px` }}
      >
        <Image
          src="/LandingPageBG (1).png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="relative z-[1]">
        <Header />
        <SectionDivider />
        <GamesList />
        <SectionDivider />
        <BooksList />
        <SectionDivider />
        <ExploreSection />

        {/* Additional content to ensure scrolling */}
        <div className="h-[200vh]">
          <p className="text-center py-20">Scroll down to test navbar hiding</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;