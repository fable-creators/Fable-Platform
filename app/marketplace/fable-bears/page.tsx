"use client"

import React from 'react';
import Image from 'next/image';

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
  return `#${Math.floor(Math.random() * 5200).toString().padStart(4, '0')}`;
};

let marketplaceItems: MarketplaceItem[] = Array.from({ length: 35 }, (_, i) => ({
  id: (i + 1).toString(),
  image: '/PFP.png',
  title: generateRandomTitle(),
  price: generateRandomPrice(),
}));

marketplaceItems.sort((a, b) => a.price - b.price);

const MarketplaceCard: React.FC<MarketplaceItem> = ({ image, title, price }) => {
  return (
    <div className="box relative w-full aspect-square cursor-pointer group overflow-hidden">
      <div className="imgBox absolute inset-0 z-10 transition-all duration-500 ease-in-out group-hover:translate-x-[-14px] group-hover:translate-y-[-14px]">
        <Image src={image} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="content absolute inset-0 p-4 flex flex-col justify-end bg-sand dark:bg-plum z-0 transition-all duration-500 ease-in-out group-hover:translate-x-[14px] group-hover:translate-y-[14px]">
        <div className="flex justify-between items-end w-full">
          <h2 className="text-lg sm:text-xl font-semibold text-coffee dark:text-sky truncate">{title}</h2>
          <span className="text-xs sm:text-sm text-grape dark:text-sand whitespace-nowrap">
            {typeof price === 'number' ? `${price.toFixed(4)} ETH` : 'Price unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function FableBearsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold pt-10 mb-8 text-grape dark:text-sky text-center">
        The Fable Bears
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
        {marketplaceItems.map((item) => (
          <MarketplaceCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}