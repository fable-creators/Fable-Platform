'use client'

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax"
import { useSpring, animated } from "@react-spring/web"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import AboutSection from "./AboutSection"
import ParallaxBooks from "./ParallaxBooks"
import ParallaxGames from "./ParallaxGames"
import NavigationSidebar from "./NavigationSidebar"
import styles from "../styles/GlassEffect.module.css"
import Footer from "../components/Footer/Footer"

interface ParallaxHeroProps {
  onScrollComplete: () => void
}

const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'library', label: 'Library' },
  { id: 'games', label: 'Games' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'spotlight', label: 'Spotlight' },
]

export default function ParallaxHero({ onScrollComplete }: ParallaxHeroProps) {
  const parallax = useRef<IParallax>(null!)
  const [moonSize, setMoonSize] = useState(800)
  const [logoSize, setLogoSize] = useState({ width: 1600, height: 800 })
  const [iconSize, setIconSize] = useState(60)
  const [iconPadding, setIconPadding] = useState("ml-4")
  const [iconSpacing, setIconSpacing] = useState("space-y-4")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [currentSection, setCurrentSection] = useState("home")

  const [logoSpring, setLogoSpring] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(50px)",
  }))

  const [discordSpring, setDiscordSpring] = useSpring(() => ({
    opacity: 0,
    transform: "translateX(50px)",
  }))

  const [xSpring, setXSpring] = useSpring(() => ({
    opacity: 0,
    transform: "translateX(50px)",
  }))

  const [backToTopSpring, setBackToTopSpring] = useSpring(() => ({
    opacity: 0,
    transform: "translateY(20px)",
  }))

  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const glassContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setMoonSize(200)
        setLogoSize({ width: 300, height: 300 })
        setIconSize(40)
        setIconPadding("ml-1")
        setIconSpacing("space-y-4")
      } else if (width < 1024) {
        setMoonSize(350)
        setLogoSize({ width: 600, height: 450 })
        setIconSize(50)
        setIconPadding("ml-2")
        setIconSpacing("space-y-3")
      } else {
        setMoonSize(600)
        setLogoSize({ width: 1000, height: 750 })
        setIconSize(90)
        setIconPadding("ml-4")
        setIconSpacing("space-y-24")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    setLogoSpring({
      opacity: 1,
      transform: "translateY(0px)",
      delay: 1500,
      config: { duration: 1000 },
    })
    setDiscordSpring({
      opacity: 1,
      transform: "translateX(0px)",
      delay: 1700,
      config: { duration: 1000 },
    })
    setXSpring({
      opacity: 1,
      transform: "translateX(0px)",
      delay: 1500,
      config: { duration: 1000 },
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (parallax.current) {
        const currentScrollY = parallax.current.current
        const shouldShow = currentScrollY > 1
        setShowBackToTop(shouldShow)
        setBackToTopSpring({
          opacity: shouldShow ? 1 : 0,
          transform: `translateY(${shouldShow ? 0 : 20}px)`,
        })
        if (currentScrollY >= 5) {
          console.log("Triggering onScrollComplete from ParallaxHero")
          onScrollComplete()
        }

        // Update current section based on scroll position
        let newSection = "home"
        if (currentScrollY >= 5) newSection = "spotlight"
        else if (currentScrollY >= 4.325) newSection = "marketplace"
        else if (currentScrollY >= 3.15) newSection = "games"
        else if (currentScrollY >= 2) newSection = "library"
        else if (currentScrollY >= 1.5) newSection = "about"

        setCurrentSection(newSection)
      }
    }

    if (parallax.current) {
      parallax.current.container.current?.addEventListener(
        "scroll",
        handleScroll,
      )
    }

    return () => {
      if (parallax.current) {
        parallax.current.container.current?.removeEventListener(
          "scroll",
          handleScroll,
        )
      }
    }
  }, [onScrollComplete, setBackToTopSpring])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPlayVideo(true)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (shouldPlayVideo && videoRef.current) {
      videoRef.current.play()
    }
  }, [shouldPlayVideo])

  const scrollTo = (sectionId: string) => {
    if (parallax.current) {
      const offset = getOffsetForSection(sectionId)
      parallax.current.scrollTo(offset)
      setCurrentSection(sectionId)
    }
  }

  const getOffsetForSection = (sectionId: string): number => {
    switch (sectionId) {
      case "home":
        return 0
      case "about":
        return 1.5
      case "library":
        return 2
      case "games":
        return 3.15
      case "marketplace":
        return 4.325
      case "spotlight":
        return 5
      default:
        return 0
    }
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <NavigationSidebar scrollTo={scrollTo} currentSection={currentSection} />

      <Parallax ref={parallax} pages={6}>
        {/* Home Section */}
        <ParallaxLayer offset={0} speed={0} factor={2.25}>
          <div id="home" className="absolute inset-0 parallax-sky" />
          {/* Moon */}
          <ParallaxLayer offset={0} speed={0.15}>
            <div
              className="absolute top-1 left-10"
              style={{ width: moonSize, height: moonSize }}
            >
              <div className="parallax-moon" />
            </div>
          </ParallaxLayer>

          {/* Back Mountains */}
          <ParallaxLayer offset={0.5} speed={-0.4}>
            <div
              className="absolute bottom-0 w-full"
              style={{ marginLeft: "-800px" }}
            >
              <div
                className="parallax-mountains"
                style={{ width: "100%", height: "100vh" }}
              />
            </div>
          </ParallaxLayer>

          {/* Fable Logo & Socials */}
          <ParallaxLayer offset={0.9} speed={-1.45} factor={0.3}>
            <div
              className="absolute bottom-0 w-full"
              style={{ marginLeft: "750px", marginBottom: "700px" }}
            >
              <div className="flex items-center">
                <animated.div
                  style={{
                    ...logoSpring,
                    width: logoSize.width,
                    height: logoSize.height,
                  }}
                >
                  <div className="parallax-fable-logo" />
                </animated.div>
                <div className={`flex flex-col ${iconSpacing} ${iconPadding}`}>
                  <animated.div
                    style={{ ...xSpring, width: iconSize, height: iconSize }}
                  >
                    <Link href="https://x.com/Fable_Platform" passHref>
                      <div className="parallax-x-icon cursor-pointer" />
                    </Link>
                  </animated.div>
                  <animated.div
                    style={{
                      ...discordSpring,
                      width: iconSize,
                      height: iconSize,
                    }}
                  >
                    <Link href="https://discord.gg/uFEnUyUA" passHref>
                      <div className="parallax-discord-icon cursor-pointer" />
                    </Link>
                  </animated.div>
                </div>
              </div>
            </div>
          </ParallaxLayer>

          {/* Front Mountain */}
          <ParallaxLayer offset={2.6} speed={-0.6} factor={0.2}>
            <div className="absolute bottom-0 w-full">
              <div
                className="parallax-front-mountains"
                style={{ width: "100%", height: "100vh" }}
              />
            </div>
          </ParallaxLayer>

          {/* Main Building */}
          <ParallaxLayer offset={1} speed={0.45}>
            <div
              className="absolute bottom-0 w-full"
              style={{ marginBottom: "-150px" }}
            >
              <div
                className="parallax-main-building"
                style={{ width: "100%", height: "110vh" }}
              />
            </div>
          </ParallaxLayer>

          {/* Left Building */}
          <ParallaxLayer offset={1.25} speed={0.6}>
            <div
              className="absolute bottom-0 left-0 w-1/2"
              style={{ marginLeft: "-80px", marginBottom: "80px" }}
            >
              <div
                className="parallax-left-building"
                style={{ width: "100%", height: "120vh", paddingBottom: "60%" }}
              />
            </div>
          </ParallaxLayer>

          {/* Right Building */}
          <ParallaxLayer offset={1.07} speed={0.48}>
            <div
              className="absolute bottom-0 right-0 w-1/2"
              style={{ marginBottom: "100px" }}
            >
              <div
                className="parallax-right-building"
                style={{ width: "100%", height: "120vh", paddingBottom: "60%" }}
              />
            </div>
          </ParallaxLayer>

          {/* Purple Grass */}
          <ParallaxLayer offset={1.38} speed={0.53}>
            <div
              className="absolute bottom-0 w-full"
              style={{ marginTop: "78px" }}
            >
              <div
                className="parallax-purple-grass"
                style={{ width: "100%", height: "0", paddingBottom: "56.25%" }}
              />
            </div>
          </ParallaxLayer>
        </ParallaxLayer>

        {/* About Section */}
        <ParallaxLayer offset={1.95} speed={0.4}>
          <div id="about">
            <AboutSection />
          </div>
        </ParallaxLayer>

        {/* Library Section */}
        <ParallaxLayer offset={2} speed={0.35}>
          <div id="library" className="w-full h-full flex items-center justify-center bg-black relative">
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
            <div
              ref={glassContainerRef}
              className={`${styles["glass-container"]} absolute inset-x-0 top-1/2 -translate-y-1/2 -mt-[50px] mx-auto`}
            >
              {/* You can add content here later */}
            </div>
          </div>
        </ParallaxLayer>

        {/* Books */}
        <ParallaxLayer offset={2.995} speed={0.38}>
          <ParallaxBooks />
        </ParallaxLayer>

        {/* Games Section */}
        <ParallaxLayer offset={3.2} speed={0.45}>
          <div id="games" className="w-full h-full flex items-center justify-center bg-black">
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

        {/* Games */}
        <ParallaxLayer offset={4} speed={0.45}>
          <ParallaxGames />
        </ParallaxLayer>

        {/* Marketplace Section */}
        <ParallaxLayer offset={4.325} speed={0.45}>
          <div id="marketplace" className="w-full h-full flex items-center justify-center bg-black">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/market_scene_v2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </ParallaxLayer>

        {/* Spotlight Section */}
        <ParallaxLayer offset={5} speed={0.45}>
          <div id="spotlight" className="w-full h-full flex items-center justify-center bg-black">
            <h2 className="text-4xl font-bold text-white">Spotlight</h2>
          </div>
        </ParallaxLayer>
      </Parallax>

      <animated.div
        className="fixed bottom-4 right-[54px] z-50"
        style={backToTopSpring}
      >
        <button
          className="back-to-top-button"
          onClick={() => scrollTo("home")}
          aria-label="Back to Top"
        >
          <svg className="svgIcon" viewBox="0 0 384 512">
            <path d="M214.6  41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"></path>
          </svg>
        </button>
      </animated.div>
          </div>
  )
}