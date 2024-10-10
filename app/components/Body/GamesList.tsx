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
  const [nextIndex, setNextIndex] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(games.length).fill(false),
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [clickStartTime, setClickStartTime] = useState(0);
  const [lastDragTime, setLastDragTime] = useState(0);

  const MAX_SPEED = 300;
  const DEBOUNCE_TIME = 50;

  const handlePrev = useCallback(() => {
    const newIndex = activeIndex === 0 ? games.length - 1 : activeIndex - 1;
    setNextIndex(activeIndex);
    setActiveIndex(newIndex);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    const newIndex = activeIndex === games.length - 1 ? 0 : activeIndex + 1;
    setNextIndex(activeIndex);
    setActiveIndex(newIndex);
  }, [activeIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
    setClickStartTime(Date.now());
    setLastDragTime(Date.now());
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (e.buttons !== 1) return;
    e.preventDefault();
    setIsDragging(true);

    const currentTime = Date.now();
    const timeDiff = currentTime - lastDragTime;

    if (timeDiff < DEBOUNCE_TIME) return;

    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;

    if (carouselRef.current) {
      const limitedWalk =
        Math.sign(walk) *
        Math.min(Math.abs(walk), (MAX_SPEED * timeDiff) / 1000);
      const newIndex = Math.round(
        (scrollLeft - limitedWalk) /
          (carouselRef.current.offsetWidth / games.length),
      );
      const clampedIndex = Math.max(0, Math.min(games.length - 1, newIndex));
      setNextIndex(activeIndex);
      setActiveIndex(clampedIndex);
    }

    setLastDragTime(currentTime);
  };

  const handleMouseUp = (e: MouseEvent) => {
    const clickDuration = Date.now() - clickStartTime;
    if (clickDuration < 200 && !isDragging) {
      const gameName = games[activeIndex].name
        .toLowerCase()
        .replace(/\s+/g, "-");
      router.push(`/games/${gameName}`);
    }
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleCardClick = (index: number) => {
    if (!isDragging) {
      const gameName = games[index].name.toLowerCase().replace(/\s+/g, "-");
      router.push(`/games/${gameName}`);
    }
  };

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

  return (
    <AnimatedSection>
      <div className="container mx-auto px-4">
        <section className="relative w-full max-w-6xl mx-auto pt-24 pb-8 overflow-hidden">
          {games.map((game, index) => (
            <div
              key={game.name}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeIndex
                  ? "opacity-100"
                  : index === nextIndex
                    ? "opacity-0"
                    : "hidden"
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
            >
              <div className="flex justify-center items-center h-[375px]">
                {games.map((game, index) => {
                  const distance = Math.abs(activeIndex - index);
                  const scale = distance === 0 ? 1 : 0.8 - distance * 0.1;
                  const opacity = distance === 0 ? 1 : 0.6 - distance * 0.2;
                  const zIndex = games.length - distance;

                  return (
                    <div
                      key={game.name}
                      className="absolute transition-all duration-300 ease-in-out cursor-pointer"
                      style={{
                        transform: `translateX(${(index - activeIndex) * 75}%) scale(${scale})`,
                        opacity,
                        zIndex,
                      }}
                      onClick={() => handleCardClick(index)}
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
                  );
                })}
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
