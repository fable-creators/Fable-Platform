'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "../components/Header/Header"
import { SectionDivider } from "../components/Body/SectionDivider"
import GamesList from "../components/Body/GamesList"
import BooksList from "../components/Body/BooksList"
import ExploreSection from "../components/Body/ExploreSection"
import AnimatedSection from "../components/animated-section"
import Loading from "./loading"

type LandingPageProps = {
  setIsNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LandingPage({ setIsNavbarVisible }: LandingPageProps) {
  const [heroHeight, setHeroHeight] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const updateHeroHeight = () => {
      const heroElement = document.querySelector(".hero-banner")
      if (heroElement) {
        setHeroHeight(heroElement.clientHeight)
      }
    }

    updateHeroHeight()
    window.addEventListener("resize", updateHeroHeight)

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      window.removeEventListener("resize", updateHeroHeight)
      clearTimeout(timer)
    }
  }, [])

  const glowStyle = {
    "--glow-color": "var(--grape)",
    "--glow-color-dark": "var(--sky)",
    "--shadow-color": "rgba(0, 0, 0, 0.3)",
  } as React.CSSProperties

  const shadowStyle = {
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  } as React.CSSProperties

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen landing-page">
      <div
        className="fixed inset-x-0 bottom-0 z-[-1]"
        style={{ top: `${heroHeight}px` }}
      >
        <Image
          src="/LandingPageBG (1).png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="opacity-80"
        />
      </div>
      <div className="relative z-[1]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2
              className="text-3xl font-bold mb-4 text-plum dark:text-sky text-center text-glow text-glow-lg mt-20"
              style={glowStyle}
            >
              Featured Games
            </h2>
            <GamesList />
          </AnimatedSection>

          <AnimatedSection>
            <SectionDivider />
          </AnimatedSection>

          <AnimatedSection>
            <h2
              className="text-3xl font-bold mb-4 text-plum dark:text-sky text-center text-glow text-glow-lg"
              style={glowStyle}
            >
              Featured Books
            </h2>
            <BooksList />
          </AnimatedSection>

          <AnimatedSection>
            <SectionDivider />
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <Link
              href="/events"
              className="block bg-sand/20 dark:bg-midnight/20 p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto hover:bg-sand/30 dark:hover:bg-midnight/30 transition-colors duration-200"
            >
              <h2
                className="text-2xl font-semibold mb-2 text-midnight dark:text-sand"
                style={shadowStyle}
              >
                Upcoming Events
              </h2>
              <p className="text-grape dark:text-sky">
                Stay tuned for exciting events, workshops, and collaborations in
                the Fable universe.
              </p>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <section className="py-8">
              <div className="container mx-auto px-4">
                <h2
                  className="text-3xl font-bold mb-4 text-plum dark:text-sky text-center text-glow text-glow-lg"
                  style={glowStyle}
                >
                  Discover Fable-Hub&apos;s Creative Ecosystem
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-midnight dark:text-sky">
                      Collaborative Projects
                    </h3>
                    <div className="bg-sand dark:bg-plum p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-plum dark:text-sky">
                        The Fable Forge
                      </h4>
                      <p className="text-sm mb-4 text-coffee dark:text-sky">
                        Join forces with fellow creators in The Fable Forge, a
                        collaborative space where ideas meld and stories
                        intertwine. Here, artists, writers, and game developers
                        come together to craft expansive narratives and
                        breathtaking worlds that push the boundaries of
                        imagination.
                      </p>
                      <Link
                        href="/fable-forge"
                        className="text-grape hover:text-midnight dark:text-sky dark:hover:text-sand transition-colors duration-200"
                      >
                        Explore The Fable Forge
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-midnight dark:text-sky">
                      Creator Showcase
                    </h3>
                    <div className="bg-sand dark:bg-plum p-4 rounded-lg">
                      <p className="text-sm mb-4 text-coffee dark:text-sky">
                        Step into the spotlight and share your creations with
                        the Fable-Hub community. Our Creator Showcase is a
                        platform for artists, writers, and developers to exhibit
                        their work, gain recognition, and inspire others in the
                        Fable universe.
                      </p>
                      <Link
                        href="/creator-showcase"
                        className="w-full inline-block text-center bg-grape hover:bg-plum text-sky hover:text-sand dark:bg-sky dark:hover:bg-sand dark:text-midnight dark:hover:text-plum py-2 rounded transition-colors duration-200"
                      >
                        Submit Your Work
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <Link
              href="/resources"
              className="block bg-coffee/20 dark:bg-grape/20 p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto hover:bg-coffee/30 dark:hover:bg-grape/30 transition-colors duration-200"
            >
              <h2
                className="text-2xl font-semibold mb-2 text-midnight dark:text-sand"
                style={shadowStyle}
              >
                Creator Resources
              </h2>
              <p className="text-grape dark:text-sky">
                Access tools, tutorials, and guides to enhance your creative
                journey in Fable-Hub.
              </p>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={800}>
            <section className="py-8">
              <div className="container mx-auto px-4">
                <h2
                  className="text-3xl font-bold mb-4 text-plum dark:text-sky text-center text-glow text-glow-lg"
                  style={glowStyle}
                >
                  Engage with the Fable-Hub Community
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-midnight dark:text-sky">
                      Workshops
                    </h3>
                    <div className="bg-sand dark:bg-plum p-4 rounded-lg">
                      <p className="text-sm mb-4 text-coffee dark:text-sky">
                        Hone your skills and learn from industry experts in our
                        interactive workshops. From worldbuilding to character
                        design, our workshops cover a wide range of topics to
                        help you grow as a creator in the Fable universe.
                      </p>
                      <Link
                        href="/workshops"
                        className="w-full inline-block text-center bg-grape hover:bg-plum text-sky hover:text-sand dark:bg-sky dark:hover:bg-sand dark:text-midnight dark:hover:text-plum py-2 rounded transition-colors duration-200"
                      >
                        Browse Workshops
                      </Link>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-midnight dark:text-sky">
                      Forums
                    </h3>
                    <div className="bg-sand dark:bg-plum p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-plum dark:text-sky">
                        The Storytellers&apos; Circle
                      </h4>
                      <p className="text-sm mb-4 text-coffee dark:text-sky">
                        Dive into lively discussions, share your ideas, and
                        connect with fellow creators in our vibrant community
                        forums. The Storytellers&apos; Circle is where tales are
                        born, worlds are built, and friendships are forged.
                      </p>
                      <Link
                        href="/forums"
                        className="text-grape hover:text-midnight dark:text-sky dark:hover:text-sand transition-colors duration-200"
                      >
                        Join the Conversation
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </AnimatedSection>

          <AnimatedSection delay={1000}>
            <Link
              href="/community-spotlight"
              className="block bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto hover:bg-sky/30 dark:hover:bg-plum/30 transition-colors duration-200"
            >
              <h2
                className="text-2xl font-semibold mb-2 text-midnight dark:text-sand"
                style={shadowStyle}
              >
                Community Spotlight
              </h2>
              <p className="text-grape dark:text-sky">
                Discover amazing creations from our talented Fable-Hub community
                members.
              </p>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={1200}>
            <Link
              href="/challenges"
              className="block bg-plum/20 dark:bg-sky/20 p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto hover:bg-plum/30 dark:hover:bg-sky/30 transition-colors duration-200"
            >
              <h2
                className="text-2xl font-semibold mb-2 text-midnight dark:text-sand"
                style={shadowStyle}
              >
                Community Challenges
              </h2>
              <p className="text-grape dark:text-sky">
                Participate in exciting creative challenges and showcase your
                skills to the Fable-Hub community.
              </p>
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={1400}>
            <Link
              href="/marketplace-updates"
              className="block bg-grape/20 dark:bg-sand/20 p-6 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto hover:bg-grape/30 dark:hover:bg-sand/30 transition-colors duration-200"
            >
              <h2
                className="text-2xl font-semibold mb-2 text-midnight dark:text-sand"
                style={shadowStyle}
              >
                Fable Marketplace Updates
              </h2>
              <p className="text-grape dark:text-sky">
                Explore the latest additions and trending items in our digital
                marketplace.
              </p>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}