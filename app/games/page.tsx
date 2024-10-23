"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GamesGrid } from "../components/GamesGrid";
import { FilterSection } from "../components/FilterSection";
import Loading from "../components/loading";
import Header from "../components/Header/Header";

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    platform: [] as string[],
    genre: [] as string[],
    chain: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen games-page">
      <Header />
      <div className="fixed inset-0 z-[-2]">
        <Image
          src="/fable_games.png"
          alt="Fable Games Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      <div className="fixed inset-0 z-[-1] bg-gradient-custom from-sky/90 via-sand/90 to-coffee/90 dark:from-grape/90 dark:via-plum/90 dark:to-midnight/90"></div>
      <div className="relative z-[1]">
        <div className="container mx-auto p-responsive">
          <h1
            className="fluid-heading text-coffee dark:text-sky text-glow text-glow-lg mb-4"
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
          <div className="flex-responsive gap-responsive">
            <div className="flex-grow">
              <GamesGrid searchQuery={searchQuery} filters={filters} />
            </div>
            <div className="w-full md:w-64">
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
