"use client"

import React, { useRef, useEffect, useState } from 'react'

interface VideoPreloaderProps {
  onVideoEnd: () => void
}

const VideoPreloader: React.FC<VideoPreloaderProps> = ({ onVideoEnd }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    const containerElement = containerRef.current
    if (videoElement && containerElement) {
      const handleResize = () => {
        const videoAspectRatio = videoElement.videoWidth / videoElement.videoHeight
        const containerAspectRatio = containerElement.clientWidth / containerElement.clientHeight

        if (videoAspectRatio > containerAspectRatio) {
          videoElement.style.width = '100%'
          videoElement.style.height = 'auto'
        } else {
          videoElement.style.width = 'auto'
          videoElement.style.height = '100%'
        }
      }

      const handleVideoLoaded = () => {
        console.log("Video metadata loaded")
        setIsVideoLoaded(true)
        handleResize()
        videoElement.play().then(() => {
          console.log("Video started playing successfully")
          setIsVideoPlaying(true)
        }).catch(error => {
          console.error("Video playback failed:", error)
          setError("Video playback failed. Please check your internet connection or try again.")
          onVideoEnd()
        })
      }

      const handleVideoEnded = () => {
        console.log("Video ended")
        onVideoEnd()
      }

      videoElement.addEventListener('loadedmetadata', handleVideoLoaded)
      videoElement.addEventListener('ended', handleVideoEnded)
      window.addEventListener('resize', handleResize)

      videoElement.addEventListener('error', (e) => {
        console.error("Video error:", e)
        if (videoElement.error) {
          console.error("Detailed error:", videoElement.error.message)
        }
        setError("An error occurred while loading the video.")
        onVideoEnd()
      })

      return () => {
        videoElement.removeEventListener('loadedmetadata', handleVideoLoaded)
        videoElement.removeEventListener('ended', handleVideoEnded)
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [onVideoEnd])

  const handleManualPlay = () => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.play().catch(error => {
        console.error("Manual play failed:", error)
        setError("Unable to play the video. Please try again.")
      })
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {!isVideoLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Loading...</div>
        </div>
      )}
      {isVideoLoaded && !isVideoPlaying && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">Starting...</div>
        </div>
      )}
      {error ? (
        <div className="text-sky text-center">
          <p>{error}</p>
          <button
            onClick={onVideoEnd}
            className="mt-4 bg-coffee hover:bg-plum text-sky px-4 py-2 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-plum"
          >
            Continue to Site
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/preloader.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isVideoPlaying && (
            <button
              onClick={handleManualPlay}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-coffee hover:bg-plum text-sky px-4 py-2 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-plum"
            >
              Play Video
            </button>
          )}
          {isVideoPlaying && (
            <div className="absolute bottom-8 right-8">
              <button
                onClick={onVideoEnd}
                className="bg-coffee hover:bg-plum text-sky px-4 py-2 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-plum"
              >
                Skip Video
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default VideoPreloader