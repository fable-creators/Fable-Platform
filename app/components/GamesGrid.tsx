import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Game {
  id: string;
  title: string;
  image: string;
  price: "LIVE" | "COMING SOON";
  platform: string[];
  genre: string[];
  chain: string[];
}

const games: Game[] = [
  {
    id: "1",
    title: "OUTPOST SURGE",
    image: "/GameCard/outpostsurge_384x576.jpg",
    price: "LIVE",
    platform: ["Web", "Windows"],
    genre: ["Action", "Strategy"],
    chain: ["BeraChain"],
  },
  {
    id: "2",
    title: "BERA BEE CATCHER",
    image: "/GameCard/berabeecatcher_384x576.jpg",
    price: "COMING SOON",
    platform: ["iOS", "Android"],
    genre: ["Puzzle"],
    chain: ["BeraChain"],
  },
  {
    id: "3",
    title: "GEMHUNTERS",
    image: "/GameCard/gemhunters_384x576.jpg",
    price: "LIVE",
    platform: ["Web"],
    genre: ["Adventure", "Puzzle"],
    chain: ["ETH"],
  },
  {
    id: "4",
    title: "BEAR ARENA",
    image: "/GameCard/beararena_384x576.jpg",
    price: "COMING SOON",
    platform: ["Windows", "Android"],
    genre: ["Action", "RPG"],
    chain: ["Arbitrum"],
  },
  {
    id: "5",
    title: "BERA FARM",
    image: "/GameCard/berafamer_384x576.jpg",
    price: "COMING SOON",
    platform: ["Web", "iOS"],
    genre: ["Simulation", "Strategy"],
    chain: ["BeraChain"],
  },
  {
    id: "6",
    title: "BERACER",
    image: "/GameCard/Beracer_384x576.jpg",
    price: "LIVE",
    platform: ["Windows", "Android"],
    genre: ["Racing", "Action"],
    chain: ["Solana"],
  },
  {
    id: "7",
    title: "FOREST BEAR",
    image: "/GameCard/forrestbear_384x576.jpg",
    price: "LIVE",
    platform: ["Web", "iOS", "Android"],
    genre: ["Adventure", "RPG"],
    chain: ["ETH"],
  },
  {
    id: "8",
    title: "BERA HORSES",
    image: "/GameCard/berahorses_384x576.jpg",
    price: "COMING SOON",
    platform: ["Web", "Windows"],
    genre: ["Simulation", "Strategy"],
    chain: ["BeraChain"],
  },
];

interface GamesGridProps {
  searchQuery: string;
  filters: {
    platform: string[];
    genre: string[];
    chain: string[];
  };
}

export function GamesGrid({ searchQuery, filters }: GamesGridProps) {
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPlatform =
      filters.platform.length === 0 ||
      game.platform.some((p) => filters.platform.includes(p));
    const matchesGenre =
      filters.genre.length === 0 ||
      game.genre.some((g) => filters.genre.includes(g));
    const matchesChain =
      filters.chain.length === 0 ||
      game.chain.some((c) => filters.chain.includes(c));

    return matchesSearch && matchesPlatform && matchesGenre && matchesChain;
  });

  return (
    <div className="grid-responsive gap-responsive">
      {filteredGames.map((game) => (
        <Link
          href={`/games/${game.title.toLowerCase().replace(/\s+/g, "-")}`}
          key={game.id}
          className="block group"
        >
          <Card className="h-full transition-transform duration-300 group-hover:scale-105">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={game.image}
                  alt={game.title}
                  layout="fill"
                  objectFit="cover"
                  className="img-fluid"
                />
              </div>
            </CardHeader>
            <CardContent className="p-responsive flex-grow">
              <CardTitle className="fluid-text text-sky dark:text-sky font-semibold">
                {game.title}
              </CardTitle>
              <p
                className={`text-sm font-medium ${game.price === "LIVE" ? "text-green-600" : "text-blue-600"}`}
              >
                {game.price}
              </p>
            </CardContent>
            <CardFooter className="space-responsive">
              <div className="flex-responsive gap-responsive w-full">
                <Button
                  variant="default"
                  className="w-full bg-purple-600 hover:bg-midnight dark:hover:bg-sand text-white"
                >
                  ENTER
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-600 text-grape dark:text-sand hover:bg-sky dark:hover:bg-sky"
                >
                  NFT COLLECTIONS
                </Button>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}