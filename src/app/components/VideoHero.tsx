'use client';

import { useEffect, useRef } from 'react';

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video autoplays on mount
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-black via-gray-800 to-white">
      {/* Two Videos Side by Side */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ gap: '50px' }}>
        {/* Left Video - Black and White */}
        <div className="h-full flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="max-h-full object-contain"
          >
            <source src="/videos/wearables/black-and-white.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Right Video - Elegant Sash */}
        <div className="h-full flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="max-h-full object-contain"
          >
            <source src="/videos/wearables/elegant-sash.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Subtle Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Text Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-wider">
            Art in Motion
          </h1>
          <div className="mt-8 w-32 h-1 bg-white mx-auto opacity-80" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white text-sm tracking-widest">SCROLL</span>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
