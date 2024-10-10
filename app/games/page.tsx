"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GamesGrid } from "../components/GamesGrid";
import { FilterSection } from "../components/FilterSection";

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    platform: [] as string[],
    genre: [] as string[],
    chain: [] as string[],
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (
    filterType: string,
    value: string,
    checked: boolean,
  ) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: checked
        ? [...prevFilters[filterType as keyof typeof prevFilters], value]
        : prevFilters[filterType as keyof typeof prevFilters].filter(
            (item) => item !== value,
          ),
    }));
  };

  return (
    <div className="min-h-screen games-page">
      <div className="fixed inset-0 z-[-2]">
        <Image
          src="/fable_games.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="fixed inset-0 z-[-1] bg-gradient-custom from-sky/90 via-sand/90 to-coffee/90 dark:from-grape/90 dark:via-plum/90 dark:to-midnight/90"></div>
      <div className="relative z-[1]">
        <div className="container mx-auto px-4 py-10 pt-20">
          <h1
            className="text-3xl font-bold mb-4 text-coffee dark:text-sky text-glow text-glow-lg"
            style={
              {
                "--glow-color": "var(--sand)",
                "--shadow-color": "rgba(0, 0, 0, 0.3)",
              } as React.CSSProperties
            }
          >
            Games
          </h1>
          <p className="text-grape dark:text-sky mb-6">
            Explore our collection of exciting games. From action-packed
            adventures to mind-bending puzzles, there&apos;s something for
            everyone.
          </p>
          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="flex-grow">
              <GamesGrid searchQuery={searchQuery} filters={filters} />
            </div>
            <div className="md:w-64">
              <FilterSection
                onSearch={handleSearch}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
