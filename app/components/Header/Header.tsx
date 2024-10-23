"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
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

  const getOptimalImageSize = () => {
    return imageSizes.reduce((prev, curr) =>
      Math.abs(curr.width - windowWidth) < Math.abs(prev.width - windowWidth)
        ? curr
        : prev,
    );
  };

  const optimalSize = getOptimalImageSize();

  return (
    <div
      className="relative w-full h-responsive overflow-hidden"
      style={{ height: `${windowHeight}px` }}
    >
      <div className="absolute inset-0">
        {mounted && (
          <Image
            src={`/Hero Banner/allpartnrs_2_optimized_${optimalSize.width}.png`}
            alt="Hero Banner"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
            priority
            className="img-fluid"
          />
        )}
      </div>
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-responsive">
        <div className="container mx-auto relative">
          <div className="flex-responsive items-end justify-between gap-responsive">
            <div className="w-full lg:w-1/2 space-y-responsive">
              <h2 className="fluid-heading font-bold text-sky mb-2 md:mb-4">
                Explore Games
              </h2>
              <div className="flex flex-wrap gap-responsive">
                <button className="button-responsive bg-grape hover:bg-sand text-sky hover:text-plum transition duration-300 ease-in-out rounded">
                  PLAY
                </button>
                <button className="button-responsive border border-sky hover:bg-sky hover:text-midnight text-sky transition duration-300 ease-in-out rounded">
                  MORE DETAILS
                </button>
              </div>
            </div>
            <p className="fluid-text text-sky lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mt-4 lg:mt-0">
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
