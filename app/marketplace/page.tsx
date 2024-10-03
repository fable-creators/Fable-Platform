"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Marketplace() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.querySelector("header");
      if (headerElement) {
        setHeaderHeight(headerElement.clientHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  const placeholders = [
    { title: "Fable Bears", link: "/marketplace/fable-bears", image: "/fable_bera_banner.png" },
    { title: "Collection 2", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 3", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 4", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 5", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 6", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 7", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 8", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 9", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 10", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 11", link: "#", image: "/placeholder.svg?height=300&width=400" },
    { title: "Collection 12", link: "#", image: "/placeholder.svg?height=300&width=400" },
  ];

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
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold pt-10 mb-12 text-grape dark:text-sky text-center">
            Fable Marketplace
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-10">
            {placeholders.map((item, index) => (
              <Link href={item.link} key={index} className="block group">
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl">
                  <div className="absolute inset-0 z-10 transition-all duration-500 ease-in-out group-hover:translate-x-[-14px] group-hover:translate-y-[-14px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-sand dark:bg-plum z-0 transition-all duration-500 ease-in-out group-hover:translate-x-[14px] group-hover:translate-y-[14px]">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                      <h2 className="text-2xl font-bold text-coffee dark:text-sky">{item.title}</h2>
                      <p className="text-sm text-grape dark:text-sand">Explore Collection</p>
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