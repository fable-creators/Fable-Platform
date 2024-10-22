"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { useSpring, animated } from "@react-spring/web";
import AboutSection from "./AboutSection";
import ParallaxBooks from "./ParallaxBooks";
import ParallaxGames from "./ParallaxGames";

interface ParallaxHeroProps {
  onScrollComplete: () => void;
}

export default function ParallaxHero({ onScrollComplete }: ParallaxHeroProps) {
  const parallax = useRef<IParallax>(null!);
  const [moonSize, setMoonSize] = useState(800);
  const [logoSize, setLogoSize] = useState({ width: 1600, height: 800 });
  const [iconSize, setIconSize] = useState(60);
  const [iconPadding, setIconPadding] = useState("ml-4");
  const [iconSpacing, setIconSpacing] = useState("space-y-4");
  //const [scrollY, setScrollY] = useState(0); //Removed as per update 2
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [logoSpring, setLogoSpring] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(50px)",
  }));

  const [discordSpring, setDiscordSpring] = useSpring(() => ({
    opacity: 0,
    transform: "translateX(50px)",
  }));

  const [xSpring, setXSpring] = useSpring(() => ({
    opacity: 0,
    transform: "translateX(50px)",
  }));

  const [backToTopSpring, setBackToTopSpring] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(20px)",
  }));

  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setMoonSize(200);
        setLogoSize({ width: 300, height: 300 });
        setIconSize(40);
        setIconPadding("ml-1");
        setIconSpacing("space-y-4");
      } else if (width < 1024) {
        setMoonSize(350);
        setLogoSize({ width: 600, height: 450 });
        setIconSize(50);
        setIconPadding("ml-2");
        setIconSpacing("space-y-3");
      } else {
        setMoonSize(600);
        setLogoSize({ width: 1000, height: 750 });
        setIconSize(90);
        setIconPadding("ml-4");
        setIconSpacing("space-y-24");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLogoSpring({
      opacity: 1,
      transform: "translateY(0px)",
      delay: 1500,
      config: { duration: 1000 },
    });
    setDiscordSpring({
      opacity: 1,
      transform: "translateX(0px)",
      delay: 1700,
      config: { duration: 1000 },
    });
    setXSpring({
      opacity: 1,
      transform: "translateX(0px)",
      delay: 1500,
      config: { duration: 1000 },
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (parallax.current) {
        const currentScrollY = parallax.current.current;
        const shouldShow = currentScrollY > 1;
        setShowBackToTop(shouldShow);
        setBackToTopSpring({
          opacity: shouldShow ? 1 : 0,
          transform: `translateY(${shouldShow ? 0 : 20}px)`,
        });
        if (currentScrollY >= 5) {
          console.log("Triggering onScrollComplete from ParallaxHero");
          onScrollComplete();
        }
      }
    };

    if (parallax.current) {
      parallax.current.container.current?.addEventListener(
        "scroll",
        handleScroll,
      );
    }

    return () => {
      if (parallax.current) {
        parallax.current.container.current?.removeEventListener(
          "scroll",
          handleScroll,
        );
      }
    };
  }, [onScrollComplete, setBackToTopSpring]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPlayVideo(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [shouldPlayVideo]);

  const scrollTo = (page: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(page);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Parallax ref={parallax} pages={6}>
        <ParallaxLayer offset={0} speed={0} factor={2.25}>
          <div className="absolute inset-0">
            <Image
              src="/parallax/0_sky_new.png"
              alt="Night Sky"
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0} speed={0.15}>
          <div className="absolute top-1 left-10">
            <Image
              src="/parallax/1 Moon.png"
              alt="Moon"
              width={moonSize}
              height={moonSize}
              className="rounded-full"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.5} speed={-0.4}>
          <div
            className="absolute bottom-0 w-full"
            style={{ marginLeft: "-900px", marginBottom: "-115px" }}
          >
            <Image
              src="/parallax/3 Mountains.png"
              alt="Mountains"
              layout="responsive"
              width={1920}
              height={1080}
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.8} speed={-1.45} factor={0.3}>
          <div
            className="absolute bottom-0 w-full"
            style={{ marginLeft: "750px", marginBottom: "700px" }}
          >
            <div className="flex items-center">
              <animated.div style={logoSpring} onClick={() => scrollTo(1)}>
                <Image
                  src="/parallax/1-1 Fable logo pink glow.png"
                  alt="Fable Logo"
                  width={logoSize.width}
                  height={logoSize.height}
                  className="cursor-pointer"
                />
              </animated.div>
              <div className={`flex flex-col ${iconSpacing} ${iconPadding}`}>
                <animated.div style={xSpring}>
                  <Link href="https://x.com/Fable_Platform" passHref>
                    <Image
                      src="/parallax/1-3 X icon.png"
                      alt="X Icon"
                      width={iconSize}
                      height={iconSize}
                      className="cursor-pointer"
                    />
                  </Link>
                </animated.div>
                <animated.div style={discordSpring}>
                  <Link href="https://discord.gg/uFEnUyUA" passHref>
                    <Image
                      src="/parallax/1-2 Discord icon.png"
                      alt="Discord Icon"
                      width={iconSize}
                      height={iconSize}
                      className="cursor-pointer"
                    />
                  </Link>
                </animated.div>
              </div>
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={0.75} speed={-0.69} factor={1}>
          <div
            className="absolute bottom-0 w-full"
            style={{ paddingBottom: "20vh" }}
          >
            <Image
              src="/parallax/4 Mountains.png"
              alt="Front Mountains"
              layout="responsive"
              width={1920}
              height={1080}
              objectFit="contain"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.0} speed={0.45}>
          <div
            className="absolute bottom-0 w-full"
            style={{ marginBottom: "-150px" }}
          >
            <Image
              src="/parallax/5 main building.png"
              alt="Main Building"
              layout="responsive"
              width={1920}
              height={1080}
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.35} speed={0.6}>
          <div
            className="absolute bottom-0 left-0 w-1/2"
            style={{ marginLeft: "-80px", marginBottom: "80px" }}
          >
            <Image
              src="/parallax/6 Building left 1.png"
              alt="Left Building"
              layout="responsive"
              width={960}
              height={540}
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.08} speed={0.48}>
          <div
            className="absolute bottom-0 right-0 w-1/2"
            style={{ marginBottom: "80px" }}
          >
            <Image
              src="/parallax/7 Building right 2.png"
              alt="Right Building"
              layout="responsive"
              width={960}
              height={540}
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.38} speed={0.53}>
          <div
            className="absolute bottom-0 w-full"
            style={{ marginTop: "78px" }}
          >
            <Image
              src="/parallax/8_grass_purple_2.png"
              alt="Purple Grass"
              layout="responsive"
              width={1920}
              height={1080}
              objectFit="cover"
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.99} speed={0.4}>
          <div onClick={() => scrollTo(2)}>
            <AboutSection />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.35}>
          <div
            className="w-full h-full flex items-center justify-center bg-black relative"
            onClick={() => scrollTo(3)}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/bear_library_room.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="glass-container absolute inset-x-0 top-1/2 -translate-y-1/2 -mt-[50px] mx-auto">
              {/* You can add content here later */}
            </div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.995} speed={0.38}>
          <div onClick={() => scrollTo(3.25)}>
            <ParallaxBooks />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={3.25} speed={0.45}>
          <div
            className="w-full h-full flex items-center justify-center bg-black"
            onClick={() => scrollTo(4)}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              className="w-full h-full object-cover"
              autoPlay={shouldPlayVideo}
            >
              <source src="/videos/Arcade_render_2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={4} speed={0.45} factor={1}>
          <ParallaxGames />
        </ParallaxLayer>
      </Parallax>

      <animated.div
        className="fixed bottom-4 right-[54px] z-50"
        style={backToTopSpring}
      >
        <button
          className="back-to-top-button"
          onClick={() => scrollTo(0)}
          aria-label="Back to Top"
        >
          <svg className="svgIcon" viewBox="0 0 384 512">
            <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </button>
      </animated.div>
    </div>
  );
}
