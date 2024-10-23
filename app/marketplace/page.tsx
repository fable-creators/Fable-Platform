"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "../components/loading";

export default function Marketplace() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        setHeaderHeight(headerElement.clientHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      clearTimeout(timer);
    };
  }, []);

  const placeholders = [
    {
      title: "Fable Bears",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 2",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 3",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 4",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 5",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 6",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 7",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 8",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 9",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 10",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 11",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
    {
      title: "Collection 12",
      link: "/marketplace/fable-bears",
      image: "/fable_bera_banner.png",
    },
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen marketplace-page">
      <div
        className="fixed inset-x-0 bottom-0 z-[-1]"
        style={{ top: `${headerHeight}px` }}
      >
        <Image
          src="/MarketPlaceBG.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="opacity-80"
        />
      </div>
      <div className="relative z-[1]">
        <div className="container p-responsive">
          <h1
            className="fluid-heading text-grape dark:text-sky text-center text-glow text-glow-lg pt-20 mb-12"
            style={
              {
                "--glow-color": "var(--sand)",
                "--shadow-color": "rgba(0, 0, 0, 0.3)",
              } as React.CSSProperties
            }
          >
            Fable Marketplace
          </h1>
          <div className="grid-responsive gap-responsive pt-10">
            {placeholders.map((item, index) => (
              <Link href={item.link} key={index} className="block group">
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl">
                  <div className="absolute inset-0 z-10 transition-all duration-500 ease-in-out group-hover:translate-x-[-14px] group-hover:translate-y-[-14px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="img-fluid"
                    />
                  </div>
                  <div className="absolute inset-0 bg-sand dark:bg-plum z-0 transition-all duration-500 ease-in-out group-hover:translate-x-[14px] group-hover:translate-y-[14px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                      <h2 className="fluid-text font-bold text-coffee dark:text-sky">
                        {item.title}
                      </h2>
                      <p className="text-sm text-grape dark:text-sand">
                        Explore Collection
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
