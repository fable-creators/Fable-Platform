'use client'

import React, { useState, useEffect } from "react"
import ParallaxHero from "./ParallaxHero"
import BackToTopButton from "./BackToTopButton"

type LandingPageProps = {
  setIsNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LandingPage({ setIsNavbarVisible }: LandingPageProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsNavbarVisible(scrollPosition <= 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setIsNavbarVisible])

  const handleParallaxComplete = () => {
    console.log('Parallax complete called')
  }

  if (!isMounted) {
    return null // or a loading placeholder
  }

  return (
    <div className="min-h-screen landing-page">
      <ParallaxHero onScrollComplete={handleParallaxComplete} />
      <BackToTopButton />
    </div>
  )
}