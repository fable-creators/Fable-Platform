import { GamesGrid } from "../components/GamesGrid";

export default function GamesPage() {
  return (
    <div className="container mx-auto px-10 py-10 pt-20">
      <h1
        className="text-3xl font-bold mb-4 text-sky dark:text-sand text-glow text-glow-lg"
        style={
          {
            "--glow-color": "var(--sand)",
            "--shadow-color": "rgba(0, 0, 0, 1)",
          } as React.CSSProperties
        }
      >
        Games
      </h1>
      <p className="text-grape dark:text-sky mb-6">
        Explore our collection of exciting games. From action-packed adventures
        to mind-bending puzzles, there&apos;s something for everyone.
      </p>
      <GamesGrid />
    </div>
  );
}
