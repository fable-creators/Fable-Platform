"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { CarouselButton } from "./CarouselButton";
import AnimatedSection from "../animated-section";

const games = [
  {
    name: "Outpost Surge",
    image: "/GameCard/outpostsurge_384x576.jpg",
    background: "/GameBackgrounds/outpostsurge.jpg",
  },
  {
    name: "Bera Horses",
    image: "/GameCard/berahorses_384x576.jpg",
    background: "/GameBackgrounds/berahorses.jpg",
  },
  {
    name: "Gemhunters",
    image: "/GameCard/gemhunters_384x576.jpg",
    background: "/GameBackgrounds/gemhunters.jpg",
  },
  {
    name: "Forest Bear",
    image: "/GameCard/forrestbear_384x576.jpg",
    background: "/GameBackgrounds/forrestbear.jpg",
  },
  {
    name: "BeRacer",
    image: "/GameCard/Beracer_384x576.jpg",
    background: "/GameBackgrounds/Beraracer.png",
  },
  {
    name: "Bera Pong",
    image: "/GameCard/berapong_384x576.jpg",
    background: "/GameBackgrounds/berapong.jpg",
  },
  {
    name: "Bera Farm",
    image: "/GameCard/berafamer_384x576.jpg",
    background: "/GameBackgrounds/berafamer.jpg",
  },
  {
    name: "Bera Bee Catcher",
    image: "/GameCard/berabeecatcher_384x576.jpg",
    background: "/GameBackgrounds/berabeecatcher.jpg",
  },
  {
    name: "Bear Arena",
    image: "/GameCard/beararena_384x576.jpg",
    background: "/GameBackgrounds/beararena.jpg",
  },
];

export default function GamesList() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(games.length).fill(false),
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationRef = useRef<number>();

  const DRAG_THRESHOLD = 5;
  const TRANSITION_SPEED = 0.3;
  const CARD_WIDTH = 240;
  const VISIBLE_CARDS = 5;

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + games.length) % games.length,
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % games.length);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.pageX - dragOffset;
    currentX.current = e.pageX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    cancelAnimationFrame(animationRef.current!);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const x = e.pageX;
    const dx = x - currentX.current;
    currentX.current = x;

    setDragOffset((prevOffset) => prevOffset + dx);
  }, []);

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      if (Math.abs(e.pageX - startX.current) < DRAG_THRESHOLD) {
        const clickedIndex = Math.round(-dragOffset / CARD_WIDTH);
        const gameName = games[
          (activeIndex + clickedIndex + games.length) % games.length
        ].name
          .toLowerCase()
          .replace(/\s+/g, "-");
        router.push(`/games/${gameName}`);
      } else {
        const targetIndex = Math.round(-dragOffset / CARD_WIDTH);
        setActiveIndex(
          (prevIndex) =>
            (prevIndex + targetIndex + games.length) % games.length,
        );
      }

      setDragOffset(0);
      isDragging.current = false;
    },
    [activeIndex, dragOffset, router, games],
  );

  // Removed animateCarousel and its useEffect

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const preloadImages = () => {
      const imagePromises = games.map((game, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = game.background;
          img.onload = () => {
            setImagesLoaded((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${game.background}`);
            resolve();
          };
        });
      });

      Promise.all(imagePromises).then(() => {
        console.log("All game background images loaded");
      });
    };

    preloadImages();
  }, []);

  const getItemStyle = (index: number) => {
    const adjustedIndex = (index - activeIndex + games.length) % games.length;
    const distance = Math.min(
      Math.abs(adjustedIndex),
      Math.abs(adjustedIndex - games.length),
    );
    const scale = distance === 0 ? 1 : 0.7 - distance * 0.1;
    const opacity = 1 - distance * 0.2;
    const zIndex = VISIBLE_CARDS - distance;
    let translateX = adjustedIndex * CARD_WIDTH + dragOffset;

    if (adjustedIndex > games.length / 2) {
      translateX -= games.length * CARD_WIDTH;
    } else if (adjustedIndex < -games.length / 2) {
      translateX += games.length * CARD_WIDTH;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <AnimatedSection>
      <div className="container mx-auto px-4">
        <section className="relative w-full max-w-6xl mx-auto pt-24 pb-8 overflow-hidden">
          {games.map((game, index) => (
            <div
              key={game.name}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                zIndex: index === activeIndex ? 1 : 0,
              }}
            >
              {imagesLoaded[index] ? (
                <Image
                  src={game.background}
                  alt={`${game.name} Background`}
                  layout="fill"
                  objectFit="cover"
                  style={{ filter: "brightness(50%) blur(5px)" }}
                  priority={true}
                />
              ) : (
                <div className="w-full h-full"></div>
              )}
            </div>
          ))}
          <div className="relative z-10">
            <div
              ref={carouselRef}
              className="relative w-full overflow-hidden select-none"
              onMouseDown={handleMouseDown}
              style={{ cursor: isDragging.current ? "grabbing" : "grab" }}
            >
              <div className="flex items-center justify-center h-[375px]">
                {games.map((game, index) => (
                  <div
                    key={game.name}
                    className="absolute transition-all duration-300 ease-in-out cursor-pointer"
                    style={getItemStyle(index)}
                  >
                    <div className="block w-60 h-90 rounded-2xl overflow-hidden border-2 border-coffee/20 dark:border-sky/20">
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
                className="inline-flex items-center gap-1.5 text-sky dark:text-sky font-semibold hover:text-midnight dark:hover:text-sand transition-colors"
              >
                View All Games
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AnimatedSection>
  );
}
