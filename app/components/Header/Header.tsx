"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imageSizes = [
    { width: 640, height: 360 },
    { width: 750, height: 422 },
    { width: 828, height: 466 },
    { width: 1080, height: 608 },
    { width: 1200, height: 675 },
    { width: 1920, height: 1080 },
    { width: 2048, height: 1152 },
    { width: 3840, height: 2160 },
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        {mounted && (
          <picture>
            {imageSizes.map((size, index) => (
              <source
                key={index}
                media={`(max-width: ${size.width}px)`}
                srcSet={`/Hero Banner/allpartnrs_2_optimized_${size.width}.png`}
              />
            ))}
            <Image
              src="/Hero Banner/allpartnrs_2_optimized.png"
              alt="Hero Banner"
              fill
              sizes=""
              style={{
                objectFit: "cover",
                objectPosition: "center center",
              }}
              priority
              className="w-full h-full"
            />
          </picture>
        )}
      </div>
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-7xl w-full mx-auto relative">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between relative z-10">
            <div className="mb-4 lg:mb-0 lg:w-1/2">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-2 sm:mb-4 text-sky">
                Explore Games
              </h2>
              <div className="flex space-x-2 sm:space-x-4 xl:space-x-6">
                <button className="bg-grape hover:bg-sand text-sky hover:text-plum px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1 sm:py-1.5 md:py-2 xl:py-3 rounded text-xs sm:text-sm md:text-base xl:text-lg transition duration-300 ease-in-out">
                  PLAY
                </button>
                <button className="border border-sky hover:bg-sky hover:text-midnight text-sky px-2 sm:px-3 md:px-4 lg:px-5 xl:px-6 py-1 sm:py-1.5 md:py-2 xl:py-3 rounded text-xs sm:text-sm md:text-base xl:text-lg transition duration-300 ease-in-out">
                  MORE DETAILS
                </button>
              </div>
            </div>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-sky lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-2 lg:mt-0">
              Integrating current NFT, DEX, DMA and more.
              <br className="hidden sm:inline" />
              Play, Farm, Hunt, Trade and so on!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
