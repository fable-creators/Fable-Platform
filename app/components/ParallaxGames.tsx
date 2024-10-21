"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CarouselButton } from "./Body/CarouselButton";

const games = [
  { name: "Outpost Surge", image: "/GameCard/outpostsurge_384x576.jpg" },
  { name: "Bera Horses", image: "/GameCard/berahorses_384x576.jpg" },
  { name: "Gemhunters", image: "/GameCard/gemhunters_384x576.jpg" },
  { name: "Forest Bear", image: "/GameCard/forrestbear_384x576.jpg" },
  { name: "BeRacer", image: "/GameCard/Beracer_384x576.jpg" },
  { name: "Bera Pong", image: "/GameCard/berapong_384x576.jpg" },
  { name: "Bera Farm", image: "/GameCard/berafamer_384x576.jpg" },
  { name: "Bera Bee Catcher", image: "/GameCard/berabeecatcher_384x576.jpg" },
  { name: "Bear Arena", image: "/GameCard/beararena_384x576.jpg" },
];

export default function ParallaxGames() {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + games.length) % games.length,
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % games.length);
  }, []);

  const getItemStyle = (index: number) => {
    const adjustedIndex = (index - activeIndex + games.length) % games.length;
    const distance = Math.min(
      Math.abs(adjustedIndex),
      Math.abs(adjustedIndex - games.length),
    );
    const scale = distance === 0 ? 1 : 0.7 - distance * 0.1;
    const opacity = 1 - distance * 0.2;
    const zIndex = 5 - distance;
    let translateX = adjustedIndex * 240; // 240px is the width of each game card

    if (adjustedIndex > games.length / 2) {
      translateX -= games.length * 240;
    } else if (adjustedIndex < -games.length / 2) {
      translateX += games.length * 240;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <div className="w-full landing-page-background min-h-screen">
      <div className="container mx-auto px-4 ">
        <h1 className="text-center font-sans text-4xl md:text-6xl font-bold text-white mb-4">
          Check out some of our Games
        </h1>
        <div className="w-full">
          <Image
            src="/devider_v2.png"
            alt="Decorative divider"
            width={1920}
            height={20}
            className="w-full h-auto mb-8"
          />
        </div>
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
          <div
            ref={carouselRef}
            className="relative w-full overflow-hidden select-none"
          >
            <div className="flex items-center justify-center h-[375px]">
              {games.map((game, index) => (
                <div
                  key={game.name}
                  className="absolute transition-all duration-300 ease-in-out cursor-pointer"
                  style={getItemStyle(index)}
                >
                  <div className="block w-60 h-90 rounded-2xl overflow-hidden border-2 border-white/20">
                    <Image
                      src={game.image}
                      alt={game.name}
                      width={240}
                      height={360}
                      className="w-full h-full object-cover pointer-events-none"
                      draggable="false"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CarouselButton direction="left" onClick={handlePrev} />
          <CarouselButton direction="right" onClick={handleNext} />
          <div className="text-center mt-6">
            <Link
              href="/games"
              className="inline-flex items-center gap-1.5 text-sky font-semibold hover:text-sand transition-colors"
            >
              View All Games
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
