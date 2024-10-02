import React from "react";

import Header from "../components/Header/Header";
import { SectionDivider }  from "../components/Body/SectionDivider";
import GamesList from "../components/Body/GamesList";
import BooksList from "../components/Body/BooksList";
import ExploreSection from "../components/Body/ExploreSection";

type LandingPageProps = {
  setIsNavbarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const LandingPage: React.FC<LandingPageProps> = ({ setIsNavbarVisible }) => {

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
};

export default LandingPage;