'use client'

import React from "react"
import Link from "next/link"
import ParallaxHero from "../components/ParallaxHero"
import BackToTopButton from "../components/BackToTopButton"

type LandingPageProps = {
  setIsNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LandingPage({ setIsNavbarVisible }: LandingPageProps) {
  const glowStyle = {
    "--glow-color": "var(--grape)",
    "--glow-color-dark": "var(--sky)",
    "--shadow-color": "rgba(0, 0, 0, 0.3)",
  } as React.CSSProperties

  const shadowStyle = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  } as React.CSSProperties

  return (
    <div className="min-h-screen landing-page">
      <ParallaxHero />
      <div className="relative z-[1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Rest of the content remains the same */}
        </div>
      </div>
      <BackToTopButton />
    </div>
  )
}