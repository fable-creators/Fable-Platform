"use client";

import Header from "../Header/Header";
import GamesList from "../Body/GamesList";
import BooksList from "../Body/BooksList";
import ExploreSection from "../Body/ExploreSection";
import { SectionDivider } from "../Body/SectionDivider";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <SectionDivider />
      <GamesList />
      <SectionDivider />
      <BooksList />
      <SectionDivider />
      <ExploreSection />

      {/* Additional content to ensure scrolling */}
      <div className="h-[200vh]">
        <p className="text-center py-20">Scroll down to test navbar hiding</p>
      </div>
    </div>
  );
}