"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Loading from "../../components/loading";
import ForestBearContent from "../../components/ForestBearContent";
import OutpostSurgeContent from "../../components/OutpostSurgeContent";
import BeraHorsesContent from "../../components/BeraHorsesContent";
import GemHuntersContent from "../../components/GemHuntersContent";
import BeracerContent from "../../components/BeracerContent";
import BeraPongContent from "../../components/BeraPongContent";
import BeraFarmContent from "../../components/BeraFarmContent";
import BeraBeeCatcherContent from "../../components/BeraBeeCatcherContent";
import BearArenaContent from "../../components/BearArenaContent";

export default function GamePage({ params }: { params: { game: string } }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  console.log(`Rendering GamePage for: ${params.game}`);

  const gameData = {
    "forest-bear": {
      title: "Forest Bear",
      description:
        "An exciting adventure game where you explore lush forests and solve puzzles.",
      images: [
        "/GameCard/forrestbear_384x576.jpg",
        "/GameCard/beararena_384x576.jpg",
        "/GameCard/forrestbear_384x576.jpg",
        "/GameCard/forrestbear_384x576.jpg",
        "/GameCard/forrestbear_384x576.jpg",
      ],
      genre: ["Adventure", "Puzzle"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "June 1, 2023",
      about: `Forest Bear is an immersive adventure game that takes you on a journey through enchanted woodlands. Play as Bear, a curious and brave cub, as you explore the magical forest, solve intricate puzzles, and uncover hidden treasures. With stunning visuals and an engaging storyline, Forest Bear offers hours of fun for players of all ages.

It was a peaceful day in the forest. In a corner of the forest, a group of little bears lived happily together. If no one disturbs them, they can collect more honey. Life seems simple until a hunter suddenly steps into the forest.

One day at noon, when the bears were happily collecting honey, tragedy happened. Hunters are breaking into the forest with the intention of killing bears and taking away the honey collected by the bears. The cute little bear tried to stop them, but unfortunately. The hunter's raid was successful.

The threat from hunters is growing. Bears are forced to live in fear. The bears have had enough. They decided that in order to stop the constant attacks by hunters, they made an agreement with the hunters to pay taxes on the honey they collected. From then on, the hunters would no longer attack the bear cubs.

The bear asked himself, is this the end...? Can they return to their normal lives now...? (No! Don't believe the cunning hunters, the bears are looking for their companions and they will form a forest defense team)`,
      relatedGames: ["Outpost Surge", "Bera Bee Catcher", "Gemhunters"],
    },
    "outpost-surge": {
      title: "Outpost Surge",
      description: "A thrilling tower defense game set in a futuristic world.",
      images: [
        "/GameCard/outpostsurge_384x576.jpg",
        "/GameCard/outpostsurge_384x576.jpg",
        "/GameCard/outpostsurge_384x576.jpg",
        "/GameCard/outpostsurge_384x576.jpg",
        "/GameCard/outpostsurge_384x576.jpg",
      ],
      genre: ["Strategy", "Tower Defense"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "July 15, 2023",
      about:
        "Outpost Surge is a captivating tower defense game that challenges players to protect their base from waves of futuristic enemies. Build and upgrade various defensive structures, manage resources, and employ strategic thinking to survive increasingly difficult levels.",
      relatedGames: ["Forest Bear", "Beracer", "Bear Arena"],
    },
    "bera-horses": {
      title: "Bera Horses",
      description: "A charming horse racing and management simulation game.",
      images: [
        "/GameCard/berahorses_384x576.jpg",
        "/GameCard/berahorses_384x576.jpg",
        "/GameCard/berahorses_384x576.jpg",
        "/GameCard/berahorses_384x576.jpg",
        "/GameCard/berahorses_384x576.jpg",
      ],
      genre: ["Simulation", "Racing"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "August 1, 2023",
      about:
        "Bera Horses is a delightful game that combines horse racing excitement with stable management. Train your horses, participate in races, and build the most successful stable in the Bera world.",
      relatedGames: ["Bera Farm", "Beracer", "Bera Pong"],
    },
    gemhunters: {
      title: "Gemhunters",
      description:
        "An addictive puzzle game filled with sparkling gems and challenging levels.",
      images: [
        "/GameCard/gemhunters_384x576.jpg",
        "/GameCard/gemhunters_384x576.jpg",
        "/GameCard/gemhunters_384x576.jpg",
        "/GameCard/gemhunters_384x576.jpg",
        "/GameCard/gemhunters_384x576.jpg",
      ],
      genre: ["Puzzle", "Casual"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "September 5, 2023",
      about:
        "Gemhunters is a dazzling puzzle game that will test your matching skills and strategic thinking. Swap and match colorful gems to clear the board and progress through increasingly challenging levels. With power-ups and special gems, every level offers a new and exciting challenge.",
      relatedGames: ["Bera Pong", "Forest Bear", "Bera Bee Catcher"],
    },
    beracer: {
      title: "Beracer",
      description:
        "A fast-paced racing game featuring adorable bear characters.",
      images: [
        "/GameCard/Beracer_384x576.jpg",
        "/GameCard/Beracer_384x576.jpg",
        "/GameCard/Beracer_384x576.jpg",
        "/GameCard/Beracer_384x576.jpg",
        "/GameCard/Beracer_384x576.jpg",
      ],
      genre: ["Racing", "Arcade"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "October 10, 2023",
      about:
        "Beracer is an exhilarating racing game where cute bear characters compete in high-speed races across various themed tracks. Unlock new characters, customize your vehicles, and use power-ups to gain the edge in this family-friendly racing adventure.",
      relatedGames: ["Bera Horses", "Bear Arena", "Outpost Surge"],
    },
    "bera-pong": {
      title: "Bera Pong",
      description:
        "A modern twist on the classic Pong game, featuring bear characters.",
      images: [
        "/GameCard/berapong_384x576.jpg",
        "/GameCard/berapong_384x576.jpg",
        "/GameCard/berapong_384x576.jpg",
        "/GameCard/berapong_384x576.jpg",
        "/GameCard/berapong_384x576.jpg",
      ],
      genre: ["Arcade", "Sports"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "November 20, 2023",
      about:
        "Bera Pong reimagines the classic game of Pong with cute bear characters and exciting power-ups. Play against the AI or challenge your friends in this fast-paced, addictive game that's easy to learn but hard to master.",
      relatedGames: ["Gemhunters", "Bera Bee Catcher", "Bear Arena"],
    },
    "bera-farm": {
      title: "Bera Farm",
      description: "A relaxing farming simulation game in the world of Bera.",
      images: [
        "/GameCard/berafamer_384x576.jpg",
        "/GameCard/berafamer_384x576.jpg",
        "/GameCard/berafamer_384x576.jpg",
        "/GameCard/berafamer_384x576.jpg",
        "/GameCard/berafamer_384x576.jpg",
      ],
      genre: ["Simulation", "Casual"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "December 1, 2023",
      about:
        "Bera Farm is a charming farming simulation where players can grow crops, raise animals, and build their dream farm in the delightful world of Bera. Interact with cute bear characters, complete quests, and enjoy the peaceful life of a Bera farmer.",
      relatedGames: ["Bera Horses", "Forest Bear", "Bera Bee Catcher"],
    },
    "bera-bee-catcher": {
      title: "Bera Bee Catcher",
      description:
        "A fun and challenging game where you help bears catch honey bees.",
      images: [
        "/GameCard/berabeecatcher_384x576.jpg",
        "/GameCard/berabeecatcher_384x576.jpg",
        "/GameCard/berabeecatcher_384x576.jpg",
        "/GameCard/berabeecatcher_384x576.jpg",
        "/GameCard/berabeecatcher_384x576.jpg",
      ],
      genre: ["Arcade", "Action"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "January 15, 2024",
      about:
        "In Bera Bee Catcher, players control cute bear characters as they attempt to catch honey bees using various tools and power-ups. Navigate through different environments, avoid obstacles, and collect as much honey as possible in this addictive and entertaining game.",
      relatedGames: ["Forest Bear", "Bera Farm", "Gemhunters"],
    },
    "bear-arena": {
      title: "Bear Arena",
      description:
        "An action-packed battle arena game featuring various bear characters.",
      images: [
        "/GameCard/beararena_384x576.jpg",
        "/GameCard/beararena_384x576.jpg",
        "/GameCard/beararena_384x576.jpg",
        "/GameCard/beararena_384x576.jpg",
        "/GameCard/beararena_384x576.jpg",
      ],
      genre: ["Action", "Multiplayer"],
      platform: ["Web", "Mobile"],
      developer: "Fable Studios",
      releaseDate: "February 28, 2024",
      about:
        "Bear Arena is an exciting multiplayer battle game where players control unique bear characters with special abilities. Compete in various game modes, unlock new characters and skins, and climb the ranks in this fast-paced and strategic arena combat game.",
      relatedGames: ["Outpost Surge", "Beracer", "Bera Pong"],
    },
  };

  if (isLoading) {
    return <Loading />;
  }

  const game = gameData[params.game as keyof typeof gameData];

  if (!game) {
    notFound();
  }

  const ContentComponent = {
    "forest-bear": ForestBearContent,
    "outpost-surge": OutpostSurgeContent,
    "bera-horses": BeraHorsesContent,
    gemhunters: GemHuntersContent,
    beracer: BeracerContent,
    "bera-pong": BeraPongContent,
    "bera-farm": BeraFarmContent,
    "bera-bee-catcher": BeraBeeCatcherContent,
    "bear-arena": BearArenaContent,
  }[params.game as keyof typeof gameData];

  if (!ContentComponent) {
    notFound();
  }

  return <ContentComponent game={game} />;
}
