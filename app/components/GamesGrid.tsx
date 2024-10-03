import Image from "next/image";
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
}

const games: Game[] = [
  {
    id: "1",
    title: "OUTPOST SURGE",
    image: "/GameCard/outpostsurge_384x576.jpg",
    price: "LIVE",
  },
  {
    id: "2",
    title: "BERA BEE CATCHER",
    image: "/GameCard/berabeecatcher_384x576.jpg",
    price: "COMING SOON",
  },
  {
    id: "3",
    title: "GEMHUNTERS",
    image: "/GameCard/gemhunters_384x576.jpg",
    price: "LIVE",
  },
  {
    id: "4",
    title: "BEAR ARENA",
    image: "/GameCard/beararena_384x576.jpg",
    price: "COMING SOON",
  },
  {
    id: "5",
    title: "BERA FARM",
    image: "/GameCard/berafamer_384x576.jpg",
    price: "COMING SOON",
  },
  {
    id: "6",
    title: "BERACER",
    image: "/GameCard/Beraracer_384x576.jpg",
    price: "LIVE",
  },
  {
    id: "7",
    title: "FOREST BEAR",
    image: "/GameCard/forrestbear_384x576.jpg",
    price: "LIVE",
  },
  {
    id: "8",
    title: "BERA HORSES",
    image: "/GameCard/berahorses_384x576.jpg",
    price: "COMING SOON",
  },
];

export function GamesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {games.map((game) => (
        <Card key={game.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <Image
              src={game.image}
              alt={game.title}
              width={356}
              height={200}
              className="w-full h-auto object-cover"
            />
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-lg text-sky dark:text-sky font-semibold">
              {game.title}
            </CardTitle>
            <p
              className={`text-sm font-medium ${game.price === "LIVE" ? "text-green-600" : "text-blue-600"}`}
            >
              {game.price}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
            <Button
              variant="default"
              className="w-full sm:w-auto bg-purple-600 hover:bg-midnight  dark:hover:bg-sand text-white"
            >
              ENTER
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-purple-600 text-grape dark:text-sand hover:bg-sky dark:hover:bg-sky"
            >
              NFT COLLECTIONS
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
