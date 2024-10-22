"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoHeroBanner } from "../components/VideoHeroBanner";
import { ChevronRight } from "lucide-react";
import AnimatedSection from "../components/animated-section";

export default function LibraryPage() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch((e) => {
        console.error("Error playing video:", e);
        setError("Failed to play video. Please try again.");
      });
    };

    const handlePlaying = () => {
      setIsVideoPlaying(true);
    };

    const handleEnded = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        }, 1000);
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.error("Error playing video:", e);
        setError("Failed to play video. Please try again.");
      });
    }
  };

  const handleSkip = () => {
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.display = "none";
        }
      }, 1000);
    }
  };

  const glowStyle = {
    "--glow-color": "var(--grape)",
    "--glow-color-dark": "var(--sky)",
    "--shadow-color": "rgba(0, 0, 0, 0.3)",
  } as React.CSSProperties;

  return (
    <div className="min-h-screen flex flex-col library-page">
      <div
        ref={containerRef}
        className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden transition-opacity duration-1000"
      >
        {!isVideoLoaded && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-2xl font-bold">Loading...</div>
          </div>
        )}
        {isVideoLoaded && !isVideoPlaying && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-2xl font-bold">Starting...</div>
          </div>
        )}
        {error ? (
          <div className="text-sky text-center">
            <p>{error}</p>
            <button
              onClick={handleSkip}
              className="mt-4 bg-coffee hover:bg-plum text-sky px-4 py-2 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-plum"
            >
              Continue to Library
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              muted
              playsInline
              preload="auto"
            >
              <source src="/videos/preloader.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!isVideoPlaying && (
              <button
                onClick={handleManualPlay}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-coffee hover:bg-plum text-sky px-4 py-2 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-plum"
              >
                Play Video
              </button>
            )}
            <button
              onClick={handleSkip}
              className="absolute bottom-8 right-8 bg-coffee hover:bg-plum text-sky px-4 py-2 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-plum"
            >
              Skip
            </button>
          </>
        )}
      </div>
      <div className="fixed inset-0 z-[-2]">
        <Image
          src="/fable_library.png"
          alt="Library Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="fixed inset-0 z-[-1] bg-gradient-custom from-sky/90 via-sand/90 to-coffee/90 dark:from-grape/90 dark:via-plum/90 dark:to-midnight/90"></div>
      <VideoHeroBanner videoSrc="/videos/library-hero.mp4" />
      <div className="container mx-auto px-4 py-8 flex-grow relative z-[1]">
        <h1
          className="text-3xl font-bold mb-4 text-plum dark:text-sky text-center text-glow text-glow-lg font-sans"
          style={glowStyle}
        >
          Library
        </h1>
        <p className="text-grape dark:text-sand mb-6">
          Welcome to the Fable-Hub Library. Explore our collection of digital
          assets and resources.
        </p>

        <AnimatedSection delay={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Link
              href="/library/featured"
              className="group bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg hover:bg-sky/30 dark:hover:bg-plum/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-2 text-plum dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300 font-sans">
                Featured Collection
              </h2>
              <p className="text-grape dark:text-sky mb-4">
                Explore our handpicked selection of digital assets, showcasing
                the best of Fable-Hub&apos;s library.
              </p>
              <div className="flex items-center text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300 font-sans">
                <span className="mr-2">Explore</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
            <Link
              href="/library/recent"
              className="group bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg hover:bg-sky/30 dark:hover:bg-plum/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-2 text-plum dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300 font-sans">
                Recent Additions
              </h2>
              <p className="text-grape dark:text-sky mb-4">
                Discover the latest digital assets added to our ever-growing
                library collection.
              </p>
              <div className="flex items-center text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300 font-sans">
                <span className="mr-2">View Latest</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
            <Link
              href="/library/categories"
              className="group bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg hover:bg-sky/30 dark:hover:bg-plum/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <h2 className="text-xl font-semibold mb-2 text-plum dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300 font-sans">
                Categories
              </h2>
              <p className="text-grape dark:text-sky mb-4">
                Browse our extensive range of categories, from fantasy art to
                sci-fi soundscapes.
              </p>
              <div className="flex items-center text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300 font-sans">
                <span className="mr-2">Browse Categories</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-sand/20 dark:bg-midnight/20 p-8 rounded-lg shadow-xl mb-12">
            <h2
              className="text-2xl font-bold mb-4 text-plum dark:text-sky text-glow text-glow-lg font-sans"
              style={glowStyle}
            >
              About Our Library
            </h2>
            <p className="text-grape dark:text-sand mb-4">
              The Fable-Hub Library is a treasure trove of digital assets
              designed to inspire and empower creators in the Fable universe.
              From stunning visual art to immersive soundscapes, our library
              offers a wide range of resources to enhance your creative
              projects.
            </p>
            <p className="text-grape dark:text-sand">
              Users can easily browse, preview, and download assets for use in
              their own Fable-inspired creations. Our library is constantly
              growing, with new additions made regularly to keep your creative
              spark alive.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/library/user-collections"
              className="bg-coffee/20 dark:bg-grape/20 p-6 rounded-lg shadow-lg hover:bg-coffee/30 dark:hover:bg-grape/30 transition-colors duration-200"
            >
              <h2 className="text-xl font-semibold mb-2 text-plum dark:text-sand font-sans">
                User Collections
              </h2>
              <p className="text-grape dark:text-sky">
                Create and manage your personal collections of favorite assets,
                making it easy to access your most-used resources.
              </p>
            </Link>
            <Link
              href="/library/activity-feed"
              className="bg-coffee/20 dark:bg-grape/20 p-6 rounded-lg shadow-lg hover:bg-coffee/30 dark:hover:bg-grape/30 transition-colors duration-200"
            >
              <h2 className="text-xl font-semibold mb-2 text-plum dark:text-sand font-sans">
                Activity Feed
              </h2>
              <p className="text-grape dark:text-sky">
                Stay updated with the latest library additions, popular
                downloads, and community favorites in real-time.
              </p>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
