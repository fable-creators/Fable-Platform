"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { CarouselButton } from "./CarouselButton";
import AnimatedSection from "../animated-section";

const books = [
  {
    name: "Fable Chronicles",
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
  const [dragOffset, setDragOffset] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    new Array(books.length).fill(false),
  );
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const DRAG_THRESHOLD = 5;
  const CARD_WIDTH = 240;
  const VISIBLE_CARDS = 5;

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length,
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % books.length);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    startX.current = e.pageX - dragOffset;
    currentX.current = e.pageX;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
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
        const bookName = books[
          (activeIndex + clickedIndex + books.length) % books.length
        ].name
          .toLowerCase()
          .replace(/\s+/g, "-");
        console.log("Clicked on book:", bookName);
        // Navigate to the book page here
      } else {
        const targetIndex = Math.round(-dragOffset / CARD_WIDTH);
        setActiveIndex(
          (prevIndex) =>
            (prevIndex + targetIndex + books.length) % books.length,
        );
      }

      setDragOffset(0);
      isDragging.current = false;
    },
    [activeIndex, dragOffset],
  );

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

  const getItemStyle = (index: number) => {
    const adjustedIndex = (index - activeIndex + books.length) % books.length;
    const distance = Math.min(
      Math.abs(adjustedIndex),
      Math.abs(adjustedIndex - books.length),
    );
    const scale = distance === 0 ? 1 : 0.7 - distance * 0.1;
    const opacity = 1 - distance * 0.2;
    const zIndex = VISIBLE_CARDS - distance;
    let translateX = adjustedIndex * CARD_WIDTH + dragOffset;

    if (adjustedIndex > books.length / 2) {
      translateX -= books.length * CARD_WIDTH;
    } else if (adjustedIndex < -books.length / 2) {
      translateX += books.length * CARD_WIDTH;
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
    };
  };

  return (
    <AnimatedSection className="w-full">
      <div className="container mx-auto px-4">
        <section className="relative w-full max-w-6xl mx-auto pt-24 pb-8 overflow-hidden">
          {books.map((book, index) => (
            <div
              key={book.name}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeIndex ? "opacity-100" : "opacity-0"
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
                <div className="w-full h-full bg-gray-200"></div>
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
                {books.map((book, index) => (
                  <div
                    key={book.name}
                    className="absolute transition-all duration-300 ease-in-out cursor-pointer"
                    style={getItemStyle(index)}
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
                ))}
              </div>
            </div>
            <CarouselButton direction="left" onClick={handlePrev} />
            <CarouselButton direction="right" onClick={handleNext} />
            <div className="text-center mt-6">
              <Link
                href="/library"
                className="inline-flex items-center gap-1.5 text-sky dark:text-sky font-semibold hover:text-midnight dark:hover:text-sand transition-colors"
              >
                View All Books
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AnimatedSection>
  );
}
