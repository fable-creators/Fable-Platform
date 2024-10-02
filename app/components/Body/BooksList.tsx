"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { CarouselButton } from "./CarouselButton";

const books = [
  {
    name: "Fable Chronicals",
    image: "/BookCard/fable_cron.png",
    background: "/BookBackgrounds/Fable_Cron_bg_swat.png",
  },
  {
    name: "Hooked On Bera",
    image: "/BookCard/hooked_on_bera.png",
    background: "/BookBackgrounds/Hooked_on_bera_bg_swat.png",
  },
  {
    name: "TBC 1",
    image: "/BookCard/TBC_1.png",
    background: "/BookBackgrounds/TBC_1_BG_swat.png",
  },
  {
    name: "TBC 2",
    image: "/BookCard/TBC_2.png",
    background: "/BookBackgrounds/TBC_2_BG_swat.png",
  },
  {
    name: "TBC 3",
    image: "/BookCard/TBC_3.png",
    background: "/BookBackgrounds/TBC_3_BG_swat.png",
  },
  {
    name: "TBC 4",
    image: "/BookCard/TBC_4.png",
    background: "/BookBackgrounds/TBC_4_BG_swat.png",
  },
  {
    name: "TBC 5",
    image: "/BookCard/TBC_5.png",
    background: "/BookBackgrounds/TBC_5_BG_swat.png",
  },
];

export default function BooksList() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(books.length).fill(false),
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
    const newIndex = activeIndex === 0 ? books.length - 1 : activeIndex - 1;
    setNextIndex(activeIndex);
    setActiveIndex(newIndex);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    const newIndex = activeIndex === books.length - 1 ? 0 : activeIndex + 1;
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
          (carouselRef.current.offsetWidth / books.length),
      );
      const clampedIndex = Math.max(0, Math.min(books.length - 1, newIndex));
      setNextIndex(activeIndex);
      setActiveIndex(clampedIndex);
    }

    setLastDragTime(currentTime);
  };

  const handleMouseUp = (e: MouseEvent) => {
    const clickDuration = Date.now() - clickStartTime;
    if (clickDuration < 200 && !isDragging) {
      console.log("Clicked on book:", books[activeIndex].name);
    }
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
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
      const imagePromises = books.map((book, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.src = book.background;
          img.onload = () => {
            setImagesLoaded((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${book.background}`);
            resolve();
          };
        });
      });

      Promise.all(imagePromises).then(() => {
        console.log("All book background images loaded");
      });
    };

    preloadImages();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <section className="relative w-full max-w-6xl mx-auto pt-24 pb-8 overflow-hidden">
        {books.map((book, index) => (
          <div
            key={book.name}
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
                src={book.background}
                alt={`${book.name} Background`}
                layout="fill"
                objectFit="cover"
                style={{ filter: "brightness(50%) blur(2px)" }}
                priority={true}
              />
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        ))}
        <div className="relative z-10">
          <div className="text-left pl-4 md:pl-40 mb-6">
            <h2 className="text-3xl font-bold text-white">Featured Books</h2>
          </div>
          <div
            ref={carouselRef}
            className="relative w-full overflow-hidden select-none"
            onMouseDown={handleMouseDown}
          >
            <div className="flex justify-center items-center h-[375px]">
              {books.map((book, index) => {
                const distance = Math.abs(activeIndex - index);
                const scale = distance === 0 ? 1 : 0.8 - distance * 0.1;
                const opacity = distance === 0 ? 1 : 0.6 - distance * 0.2;
                const zIndex = books.length - distance;

                return (
                  <div
                    key={book.name}
                    className="absolute transition-all duration-300 ease-in-out"
                    style={{
                      transform: `translateX(${(index - activeIndex) * 75}%) scale(${scale})`,
                      opacity,
                      zIndex,
                    }}
                  >
                    <div className="block w-60 h-90 rounded-2xl overflow-hidden border-2 border-white/20">
                      <Image
                        src={book.image}
                        alt={book.name}
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
            <a
              href="/library"
              className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-gray-300 transition-colors"
            >
              View All Books
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
