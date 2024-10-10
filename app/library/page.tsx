"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VideoHeroBanner } from "../components/VideoHeroBanner";
import { ChevronRight } from "lucide-react";

interface SectionProps {
  children: React.ReactNode;
  delay: number;
}

const AnimatedSection: React.FC<SectionProps> = ({ children, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      {children}
    </div>
  );
};

export default function LibraryPage() {
  return (
    <div className="min-h-screen flex flex-col library-page">
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
          className="text-3xl font-bold mb-4 text-coffee dark:text-sky text-glow text-glow-lg"
          style={
            {
              "--glow-color": "var(--sand)",
              "--shadow-color": "rgba(0, 0, 0, 0.3)",
            } as React.CSSProperties
          }
        >
          Library
        </h1>
        <p className="text-grape dark:text-sand mb-6">
          Welcome to the Fable-Hub Library. Explore our collection of digital
          assets and resources.
        </p>

        <AnimatedSection delay={0}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* TODO: Add link to featured collection page */}
            <Link href="/library/featured" className="group bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg hover:bg-sky/30 dark:hover:bg-plum/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300">
                Featured Collection
              </h2>
              <p className="text-grape dark:text-sky mb-4">
                Explore our handpicked selection of digital assets, showcasing
                the best of Fable-Hub's library.
              </p>
              <div className="flex items-center text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300">
                <span className="mr-2">Explore</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
            {/* TODO: Add link to recent additions page */}
            <Link href="/library/recent" className="group bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg hover:bg-sky/30 dark:hover:bg-plum/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300">
                Recent Additions
              </h2>
              <p className="text-grape dark:text-sky mb-4">
                Discover the latest digital assets added to our ever-growing
                library collection.
              </p>
              <div className="flex items-center text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300">
                <span className="mr-2">View Latest</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
            {/* TODO: Add link to categories page */}
            <Link href="/library/categories" className="group bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg hover:bg-sky/30 dark:hover:bg-plum/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300">
                Categories
              </h2>
              <p className="text-grape dark:text-sky mb-4">
                Browse our extensive range of categories, from fantasy art to
                sci-fi soundscapes.
              </p>
              <div className="flex items-center text-coffee dark:text-sand group-hover:text-grape dark:group-hover:text-sky transition-colors duration-300">
                <span className="mr-2">Browse Categories</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-sand/20 dark:bg-midnight/20 p-8 rounded-lg shadow-xl mb-12">
            <h2 className="text-2xl font-bold mb-4 text-coffee dark:text-sky">
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
            {/* TODO: Add link to user collections page */}
            <Link href="/library/user-collections" className="bg-coffee/20 dark:bg-grape/20 p-6 rounded-lg shadow-lg hover:bg-coffee/30 dark:hover:bg-grape/30 transition-colors duration-200">
              <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand">
                User Collections
              </h2>
              <p className="text-grape dark:text-sky">
                Create and manage your personal collections of favorite assets,
                making it easy to access your most-used resources.
              </p>
            </Link>
            {/* TODO: Add link to activity feed page */}
            <Link href="/library/activity-feed" className="bg-coffee/20 dark:bg-grape/20 p-6 rounded-lg shadow-lg hover:bg-coffee/30 dark:hover:bg-grape/30 transition-colors duration-200">
              <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand">
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