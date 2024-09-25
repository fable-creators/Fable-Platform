import Header from "../Header/Header";
import GamesList from "../Body/GamesList";
import BooksList from "../Body/BooksList";
import ExploreSection from "../Body/ExploreSection";
import { SectionDivider } from "../Body/SectionDivider";

export default function LandingPage() {
  return (
    <>
      <Header />
      <SectionDivider />
      <GamesList />
      <SectionDivider />
      <BooksList />
      <SectionDivider />
      <ExploreSection />
    </>
  );
}