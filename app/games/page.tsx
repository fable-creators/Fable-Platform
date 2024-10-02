import { GamesGrid } from "../components/GamesGrid";

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-coffee dark:text-sky">
        Games
      </h1>
      <p className="text-grape dark:text-sand mb-6">
        Explore our collection of exciting games. From action-packed adventures
        to mind-bending puzzles, there&apos;s something for everyone.
      </p>
      <GamesGrid />
    </div>
  );
}
