"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GamesList from "./Body/GamesList";
import { SectionDivider } from "./Body/SectionDivider";

interface GameContentProps {
  game: {
    title: string;
    description: string;
    images: string[];
    genre: string[];
    platform: string[];
    developer: string;
    releaseDate: string;
    about: string;
    relatedGames: string[];
  };
}

export default function BearArenaContent({ game }: GameContentProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === game.images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? game.images.length - 1 : prevIndex - 1,
    );
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Scroll speed
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        carousel.scrollLeft += e.deltaY;
      };

      carousel.addEventListener("wheel", handleWheel);
      return () => carousel.removeEventListener("wheel", handleWheel);
    }
  }, []);

  return (
    <div className="w-full min-h-screen">
      {/* Hero Banner */}
      <div className="relative w-full h-[336px] md:h-[464px]">
        <Image
          src="/GameCard/berapong_384x576.jpg"
          alt={`${game.title} Hero`}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-start justify-end p-4 md:p-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            {game.title}
          </h1>
          <div className="flex space-x-4">
            <Link
              href="add link here"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-black transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 x-logo"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only">X (formerly Twitter)</span>
            </Link>
            <Link
              href="add link here"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-sky transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
              </svg>
              <span className="sr-only">Discord</span>
            </Link>
          </div>
        </div>
      </div>
      {/* Breadcrumb Navigation */}
      <nav className="text-sm p-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/games" className="text-sky hover:text-sand">
              Games
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-sand">{game.title}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Viewport for Images */}
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] mb-4">
              <Image
                src={game.images[currentImageIndex]}
                alt={`${game.title} Gameplay ${currentImageIndex + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            {/* Carousel of smaller images */}
            <div className="relative">
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <div
                ref={carouselRef}
                className="flex space-x-2 overflow-x-hidden py-2 cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                {game.images.map((image, index) => (
                  <div
                    key={index}
                    className={`flex-none cursor-pointer ${index === currentImageIndex ? "ring-2 ring-sky" : ""}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${game.title} Gameplay ${index + 1}`}
                      width={100}
                      height={56}
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="bg-plum p-6 rounded-lg shadow-lg h-fit">
            <h2 className="text-2xl font-bold mb-4 text-sand">Game Details</h2>
            <p className="mb-4 text-sky">{game.description}</p>
            <Button className="w-full mb-4 bg-grape hover:bg-midnight text-sky text-lg font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Play Now
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sand">Genre</h3>
                <p className="text-sky">{game.genre.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sand">Platform</h3>
                <p className="text-sky">{game.platform.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sand">Developer</h3>
                <p className="text-sky">{game.developer}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sand">Release Date</h3>
                <p className="text-sky">{game.releaseDate}</p>
              </div>
            </div>
          </div>
        </div>

        <SectionDivider />

        {/* About Section */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-sand">
            About {game.title}
          </h2>
          <p className="text-sky">{game.about}</p>
        </section>

        <SectionDivider />

        {/* Modified GamesList Carousel */}
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-sand">
            You May Also Like
          </h2>
          <div className="scale-75 origin-top-left">
            <div className="container mx-auto px-4">
              <section className="relative w-full max-w-6xl mx-auto pt-12 pb-4 overflow-hidden">
                <div className="relative z-10">
                  <div className="relative w-full overflow-hidden select-none">
                    <GamesList />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
