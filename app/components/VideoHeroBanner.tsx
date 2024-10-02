"use client"

import { useRef, useState, useEffect } from 'react'

interface VideoHeroBannerProps {
  videoSrc: string;
}

export function VideoHeroBanner({ videoSrc }: VideoHeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoHeight, setVideoHeight] = useState('100vh')

  useEffect(() => {
    const handleResize = () => {
      if (videoRef.current) {
        const aspectRatio = videoRef.current.videoWidth / videoRef.current.videoHeight
        const windowWidth = window.innerWidth
        const calculatedHeight = windowWidth / aspectRatio
        setVideoHeight(`${calculatedHeight}px`)
      }
    }

    window.addEventListener('resize', handleResize)
    // Initial call to set the correct height
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden" style={{ height: videoHeight }}>
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex items-end justify-center pb-8">
        <button 
          className="button-fable"
          onClick={() => {
            // Implement the action for entering the library here
            console.log("Enter Library clicked")
          }}
        >
          Enter Library
        </button>
      </div>
    </div>
  )
}