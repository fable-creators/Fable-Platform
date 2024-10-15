"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "../../components/loading";

interface MarketplaceItem {
  id: string;
  image: string;
  title: string;
  price: number;
}

const generateRandomPrice = (): number => {
  return Number((Math.random() * (0.2 - 0.0042) + 0.0042).toFixed(4));
};

const generateRandomTitle = (): string => {
  return `#${Math.floor(Math.random() * 5200)
    .toString()
    .padStart(4, "0")}`;
};

let marketplaceItems: MarketplaceItem[] = Array.from(
  { length: 35 },
  (_, i) => ({
    id: (i + 1).toString(),
    image: "/PFP.png",
    title: generateRandomTitle(),
    price: generateRandomPrice(),
  }),
);

marketplaceItems.sort((a, b) => a.price - b.price);

const MarketplaceCard: React.FC<MarketplaceItem> = ({
  image,
  title,
  price,
}) => {
  return (
    <div className="box relative w-full h-full cursor-pointer group overflow-hidden rounded-lg">
      <div className="imgBox absolute inset-0 z-10 transition-all duration-500 ease-in-out group-hover:translate-x-[-20px] group-hover:translate-y-[-20px]">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="content absolute inset-0 bg-sand dark:bg-plum z-0 transition-all duration-500 ease-in-out group-hover:translate-x-[20px] group-hover:translate-y-[20px]">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end opacity-0 transform translate-y-full transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
          <div className="flex justify-between items-end w-full">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-coffee dark:text-sky truncate max-w-[60%]">
              {title}
            </h2>
            <span className="text-sm sm:text-base md:text-lg text-grape dark:text-sand whitespace-nowrap">
              {typeof price === "number"
                ? `${price.toFixed(4)} ETH`
                : "Price unavailable"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FableBearsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="text-4xl font-bold pt-20 mb-12 lg:mb-16 text-grape dark:text-sky text-center">
        The Fable Bears
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
        {marketplaceItems.map((item) => (
          <div
            key={item.id}
            className="w-full aspect-square sm:aspect-[4/5] md:aspect-[3/4] lg:aspect-[5/6] xl:aspect-square"
          >
            <MarketplaceCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
