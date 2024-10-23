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
          <div className="absolute inset-0 parallax-sky" />
        </ParallaxLayer>


        <ParallaxLayer offset={0} speed={0.15}>
          <div className="absolute top-1 left-10" style={{ width: moonSize, height: moonSize }}>
            <div className="parallax-moon" />
            </div>
        </ParallaxLayer>

        <ParallaxLayer offset={.5} speed={-0.4}>
  <div
    className="absolute bottom-0 w-full"
    style={{ marginLeft: "-800px"}}
  >
    <div className="parallax-mountains" style={{ width: '1920px', height: '1080px' }} />
  </div>
</ParallaxLayer>

<ParallaxLayer offset={0.9} speed={-1.45} factor={0.3}>
  <div
    className="absolute bottom-0 w-full"
    style={{ marginLeft: "750px", marginBottom: "700px" }}
  >
    <div className="flex items-center">
      <animated.div 
        style={{...logoSpring, width: logoSize.width, height: logoSize.height}} 
        onClick={() => scrollTo(1)}
      >
        <div className="parallax-fable-logo cursor-pointer" />
      </animated.div>
      <div className={`flex flex-col ${iconSpacing} ${iconPadding}`}>
        <animated.div style={{...xSpring, width: iconSize, height: iconSize}}>
          <Link href="https://x.com/Fable_Platform" passHref>
            <div className="parallax-x-icon cursor-pointer" />
          </Link>
        </animated.div>
        <animated.div style={{...discordSpring, width: iconSize, height: iconSize}}>
          <Link href="https://discord.gg/uFEnUyUA" passHref>
            <div className="parallax-discord-icon cursor-pointer" />
          </Link>
        </animated.div>
      </div>
    </div>
  </div>
</ParallaxLayer>

        <ParallaxLayer offset={0.75} speed={-0.79} factor={1}>
          <div
            className="absolute bottom-0 w-full"
            style={{ paddingBottom: "20vh" }}
          >
            <div className="parallax-front-mountains" style={{ width: '100%', height: '100vh' }} />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.45}>
          <div
            className="absolute bottom-0 w-full"
            style={{ marginBottom: "-150px" }}
          >
            <div className="parallax-main-building" style={{ width: '100%', height: '107vh' }} />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.25} speed={0.6}>
          <div
            className="absolute bottom-0 left-0 w-1/2"
            style={{ marginLeft: "-80px", marginBottom: "80px" }}
          >
            <div 
              className="parallax-left-building" 
              style={{ width: '100%', height: '120vh', paddingBottom: '60%' }} 
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.07} speed={0.48}>
          <div
            className="absolute bottom-0 right-0 w-1/2"
            style={{ marginBottom: "100px" }}
          >
            <div 
              className="parallax-right-building" 
              style={{ width: '100%', height: '120vh', paddingBottom: '60%' }} 
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.38} speed={0.53}>
          <div
            className="absolute bottom-0 w-full"
            style={{ marginTop: "78px" }}
          >
            <div 
              className="parallax-purple-grass" 
              style={{ width: '100%', height: '0', paddingBottom: '56.25%' }} 
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
