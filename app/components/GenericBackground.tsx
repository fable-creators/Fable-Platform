import React from 'react'
import Image from 'next/image'

interface BackgroundProps {
  imageSrc?: string
  children: React.ReactNode
}

export default function Background({ imageSrc = "/fable_generic.png", children }: BackgroundProps) {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-[-2]">
        <Image
          src={imageSrc}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>
      {/* Gradient Overlay */}
      <div className="fixed inset-0 z-[-1] bg-gradient-custom from-sky/90 via-sand/90 to-coffee/90 dark:from-grape/90 dark:via-plum/90 dark:to-midnight/90"></div>
      {/* Content */}
      <div className="relative z-[1]">
        {children}
      </div>
    </div>
  )
}