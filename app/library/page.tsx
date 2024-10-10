"use client";

import React from "react";
import Image from "next/image";
import { VideoHeroBanner } from "../components/VideoHeroBanner";

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

        {/* Placeholder divs for future content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand">
              Featured Collection
            </h2>
            <p className="text-grape dark:text-sky">
              Placeholder for featured digital assets.
            </p>
          </div>
          <div className="bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand">
              Recent Additions
            </h2>
            <p className="text-grape dark:text-sky">
              Placeholder for newly added items to the library.
            </p>
          </div>
          <div className="bg-sky/20 dark:bg-plum/20 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand">
              Categories
            </h2>
            <p className="text-grape dark:text-sky">
              Placeholder for library categories or tags.
            </p>
          </div>
        </div>

        <div className="bg-sand/20 dark:bg-midnight/20 p-8 rounded-lg shadow-xl mb-12">
          <h2 className="text-2xl font-bold mb-4 text-coffee dark:text-sky">
            About Our Library
          </h2>
          <p className="text-grape dark:text-sand mb-4">
            This section will contain information about the Fable-Hub Library,
            its purpose, and how users can interact with the digital assets
            stored here.
          </p>
          <p className="text-grape dark:text-sand">
            More detailed content about the library's features, benefits, and
            instructions for use will be added in the future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-coffee/20 dark:bg-grape/20 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand">
              User Collections
            </h2>
            <p className="text-grape dark:text-sky">
              Placeholder for user-specific library collections or saved items.
            </p>
          </div>
          <div className="bg-coffee/20 dark:bg-grape/20 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2 text-coffee dark:text-sand">
              Activity Feed
            </h2>
            <p className="text-grape dark:text-sky">
              Placeholder for recent activity or updates in the library.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
