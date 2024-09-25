"use client";

import { useState, useEffect, useRef } from "react";

export default function VideoPreloader({
  onVideoEnd,
}: {
  onVideoEnd: () => void;
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const handleResize = () => {
      const videoAspectRatio = video.videoWidth / video.videoHeight;
      const containerAspectRatio = container.clientWidth / container.clientHeight;

      if (videoAspectRatio > containerAspectRatio) {
        video.style.width = '100%';
        video.style.height = 'auto';
      } else {
        video.style.width = 'auto';
        video.style.height = '100%';
      }
    };

    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);
      handleResize();
      video
        .play()
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing video:", error);
          setError("Error playing video");
          onVideoEnd();
        });
    };

    const handleVideoEnded = () => {
      onVideoEnd();
    };

    video.addEventListener("loadedmetadata", handleVideoLoaded);
    video.addEventListener("ended", handleVideoEnded);
    window.addEventListener("resize", handleResize);

    video.addEventListener("error", (e) => {
      console.error("Video error:", e);
      setError("Error loading video");
      onVideoEnd();
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleVideoLoaded);
      video.removeEventListener("ended", handleVideoEnded);
      window.removeEventListener("resize", handleResize);
      video.removeEventListener("error", () => {});
    };
  }, [onVideoEnd]);

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
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-2xl font-bold">{error}</div>
        </div>
      )}
      <video
        ref={videoRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        src="/videos/preloader.mp4"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}