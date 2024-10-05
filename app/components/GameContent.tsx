import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface GameContentProps {
  game: {
    title: string
    description: string
    image: string
    genre: string[]
    platform: string[]
    developer: string
    releaseDate: string
    about: string
    relatedGames: string[]
  }
}

export default function GameContent({ game }: GameContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <div className="relative h-64 mb-8">
        <Image
          src="/ForrestBearTopBanner.png"
          alt={`${game.title} Hero`}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <h1 className="absolute bottom-4 left-4 text-4xl font-bold text-white">{game.title}</h1>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="text-sm mb-8">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/games" className="text-blue-500 hover:text-blue-600">
              Games
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-500">{game.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Viewport for Images */}
        <div className="md:col-span-2">
          <Image
            src={game.image}
            alt={`${game.title} Gameplay`}
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Game Details</h2>
          <p className="mb-4">{game.description}</p>
          <Button className="w-full mb-4">Play Now</Button>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Genre</h3>
              <p>{game.genre.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-semibold">Platform</h3>
              <p>{game.platform.join(', ')}</p>
            </div>
            <div>
              <h3 className="font-semibold">Developer</h3>
              <p>{game.developer}</p>
            </div>
            <div>
              <h3 className="font-semibold">Release Date</h3>
              <p>{game.releaseDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">About {game.title}</h2>
        <p>{game.about}</p>
      </section>

      {/* Carousel of Other Games */}
      <section className="my-8">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {game.relatedGames.map((relatedGame) => (
            <div key={relatedGame} className="flex-none w-64">
              <Image
                src="/placeholder.svg?height=150&width=256"
                alt={relatedGame}
                width={256}
                height={150}
                className="rounded-lg mb-2"
              />
              <h3 className="font-semibold">{relatedGame}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}