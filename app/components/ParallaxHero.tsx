'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const ParallaxHero: React.FC = () => {
  const [moonSize, setMoonSize] = useState(300)
  const parallaxRef = useRef<any>(null)

  useEffect(() => {
    const updateMoonSize = () => {
      const width = window.innerWidth
      let size
      if (width < 640) {
        size = 300 // Small screens
      } else if (width < 1024) {
        size = 550 // Medium screens
      } else {
        size = 800 // Large screens
      }
      setMoonSize(size)
    }

    updateMoonSize()
    window.addEventListener('resize', updateMoonSize)
    return () => window.removeEventListener('resize', updateMoonSize)
  }, [])

  return (
    <Parallax pages={3} ref={parallaxRef}>
      {/* Sky background - static */}
      <ParallaxLayer offset={0} speed={0} factor={3}>
        <div className="absolute inset-0">
          <Image
            src="/parallax/0 sky new.jpg"
            alt="Night Sky"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
        </div>
      </ParallaxLayer>

      {/* Moon - parallax effect */}
      <ParallaxLayer offset={0} speed={0.1} className="absolute top-3 left-10">
        <Image
          src="/parallax/1 Moon.png"
          alt="Moon"
          width={moonSize}
          height={moonSize}
          className="rounded-full"
        />
      </ParallaxLayer>

      {/* Add more parallax layers here */}
      <ParallaxLayer offset={1} speed={0.5}>
        <div className="flex items-center justify-center h-full">
          <h1 className="text-4xl font-bold text-white">Welcome to Fable</h1>
        </div>
      </ParallaxLayer>

      <ParallaxLayer offset={2} speed={2}>
        <div className="flex items-center justify-center h-full">
          <button 
            onClick={() => parallaxRef.current.scrollTo(0)}
            className="px-4 py-2 bg-white text-purple-900 rounded-md"
          >
            Scroll to top
          </button>
        </div>
      </ParallaxLayer>
    </Parallax>
  )
}

export default ParallaxHero