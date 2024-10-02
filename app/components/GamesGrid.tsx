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
  price: "FREE" | "PAID";
}

const games: Game[] = [
  {
    id: "1",
    title: "Outpost",
    image: "/GameCard/outpostsurge_384x576.jpg",
    price: "FREE",
  },
  {
    id: "2",
    title: "Bera Bee Catcher",
    image: "/GameCard/berabeecatcher_384x576.jpg",
    price: "FREE",
  },
  {
    id: "3",
    title: "GEMHUNTERS",
    image: "/placeholder.svg?height=200&width=356",
    price: "FREE",
  },
  {
    id: "4",
    title: "Outpost",
    image: "/placeholder.svg?height=200&width=356",
    price: "FREE",
  },
  {
    id: "5",
    title: "Bera Bee Catcher",
    image: "/placeholder.svg?height=200&width=356",
    price: "FREE",
  },
  {
    id: "6",
    title: "GEMHUNTERS",
    image: "/placeholder.svg?height=200&width=356",
    price: "FREE",
  },
  {
    id: "7",
    title: "Forest Bear",
    image: "/placeholder.svg?height=200&width=356",
    price: "FREE",
  },
  {
    id: "8",
    title: "Gem Hunters",
    image: "/placeholder.svg?height=200&width=356",
    price: "PAID",
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
            <CardTitle className="text-lg font-semibold">
              {game.title}
            </CardTitle>
            <p
              className={`text-sm font-medium ${game.price === "FREE" ? "text-green-600" : "text-blue-600"}`}
            >
              {game.price}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex flex-col sm:flex-row gap-2">
            <Button
              variant="default"
              className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
            >
              PLAY
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-purple-600 text-purple-600 hover:bg-purple-100"
            >
              MORE DETAILS
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
