import { notFound } from 'next/navigation'
import GameContent from '@/app/components/GameContent'

export default function GamePage({ params }: { params: { game: string } }) {
  console.log(`Rendering GamePage for: ${params.game}`);

  const gameData = {
    'forest-bear': {
      title: 'Forest Bear',
      description: 'An exciting adventure game where you explore lush forests and solve puzzles.',
      image: '/placeholder.svg?height=400&width=600',
      genre: ['Adventure', 'Puzzle'],
      platform: ['Web', 'Mobile'],
      developer: 'Fable Studios',
      releaseDate: 'June 1, 2023',
      about: 'Forest Bear is an immersive adventure game that takes you on a journey through enchanted woodlands. Play as Bear, a curious and brave cub, as you explore the magical forest, solve intricate puzzles, and uncover hidden treasures. With stunning visuals and an engaging storyline, Forest Bear offers hours of fun for players of all ages.',
      relatedGames: ['Outpost Surge', 'Bera Bee Catcher', 'Gemhunters']
    },
    // Add more games here as needed
  }

  const game = gameData[params.game as keyof typeof gameData]

  if (!game) {
    notFound()
  }

  return <GameContent game={game} />
}