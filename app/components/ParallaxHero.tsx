"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { useSpring, animated } from "@react-spring/web";
import AboutSection from "./AboutSection";
import ParallaxBooks from './ParallaxBooks';
import ParallaxGames from './ParallaxGames';

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
  const [scrollY, setScrollY] = useState(0);

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
      if (typeof window !== "undefined") {
        setScrollY(window.pageYOffset);
        if (window.pageYOffset >= window.innerHeight * 5) {
          console.log("Triggering onScrollComplete from ParallaxHero");
          onScrollComplete();
        }
      }
    };

    handleScroll(); // Call once to set initial value
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPlayVideo(true);
    }, 8000); // 8000 milliseconds (8 seconds) delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [shouldPlayVideo]);

  const logoOpacity = useSpring({
    opacity: scrollY > window.innerHeight * 0.65 ? 0 : 1,
    config: { duration: 300 },
  });

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

        <ParallaxLayer offset={0.80} speed={-1.295} factor={.3}>
          <div
            className="absolute bottom-0 w-full"
            style={{ marginLeft: "750px", marginBottom: "700px" }}
          >
            <animated.div className="flex items-center" style={logoOpacity}>
              <animated.div style={logoSpring}>
                <Image
                  src="/parallax/1-1 Fable logo pink glow.png"
                  alt="Fable Logo"
                  width={logoSize.width}
                  height={logoSize.height}
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
            </animated.div>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={-0.6} factor={0.4}>
          <div className="absolute bottom-0 w-full">
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
          <AboutSection />
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.35}>
          <div className="w-full h-full flex items-center justify-center bg-black">
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
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.995} speed={0.38}>
          <ParallaxBooks />
        </ParallaxLayer>

        <ParallaxLayer offset={3.25} speed={0.45}>
          <div className="w-full h-full flex items-center justify-center bg-black">
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

        <ParallaxLayer offset={4} speed={0.45}>
          <ParallaxGames />
        </ParallaxLayer>

      </Parallax>
    </div>
  );
}