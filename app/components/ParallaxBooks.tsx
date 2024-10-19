'use client'

import React, { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import { CarouselButton } from './Body/CarouselButton'

const books = [
  { name: 'Fable Chronicles', image: '/BookCard/fable_cron.png' },
  { name: 'Hooked On Bera', image: '/BookCard/hooked_on_bera.png' },
  { name: 'TBC 1', image: '/BookCard/TBC_1.png' },
  { name: 'TBC 2', image: '/BookCard/TBC_2.png' },
  { name: 'TBC 3', image: '/BookCard/TBC_3.png' },
  { name: 'TBC 4', image: '/BookCard/TBC_4.png' },
  { name: 'TBC 5', image: '/BookCard/TBC_5.png' },
]

export default function ParallaxBooks() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + books.length) % books.length)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % books.length)
  }, [])

  const getItemStyle = (index: number) => {
    const adjustedIndex = (index - activeIndex + books.length) % books.length
    const distance = Math.min(Math.abs(adjustedIndex), Math.abs(adjustedIndex - books.length))
    const scale = distance === 0 ? 1 : 0.7 - distance * 0.1
    const opacity = 1 - distance * 0.2
    const zIndex = 5 - distance
    let translateX = adjustedIndex * 240 // 240px is the width of each book card

    if (adjustedIndex > books.length / 2) {
      translateX -= books.length * 240
    } else if (adjustedIndex < -books.length / 2) {
      translateX += books.length * 240
    }

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
    }
  }

  return (
    <div className="w-full landing-page-background min-h-screen py-16 pt-100">
      <div className="container mx-auto px-4 pt-100">
        <h1 className="text-center font-sans text-4xl md:text-6xl font-bold text-white mb-8">
          Check out some of our Books
        </h1>
        <div className="w-full">
          <Image
            src="/devider_v2.png"
            alt="Decorative divider"
            width={1920}
            height={20}
            className="w-full h-auto mb-16"
          />
        </div>
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
          <div
            ref={carouselRef}
            className="relative w-full overflow-hidden select-none"
          >
            <div className="flex items-center justify-center h-[375px]">
              {books.map((book, index) => (
                <div
                  key={book.name}
                  className="absolute transition-all duration-300 ease-in-out cursor-pointer"
                  style={getItemStyle(index)}
                >
                  <div className="block w-60 h-90 rounded-2xl overflow-hidden border-2 border-white/20">
                    <Image
                      src={book.image}
                      alt={book.name}
                      width={240}
                      height={360}
                      className="w-full h-full object-cover pointer-events-none"
                      draggable="false"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CarouselButton direction="left" onClick={handlePrev} />
          <CarouselButton direction="right" onClick={handleNext} />
          <div className="text-center mt-6">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sky font-semibold hover:text-sand transition-colors"
            >
              View All Books
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}