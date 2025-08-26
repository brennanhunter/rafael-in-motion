'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useArtworkByCategory } from '@/hooks/useArtwork';

interface ArtDecoProps {
  className?: string;
}

export default function ArtDeco({ className = '' }: ArtDecoProps) {
  const artDecoPieces = useArtworkByCategory('art-deco');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showUI, setShowUI] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hideUIRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const AUTOPLAY_DURATION = 8000; // 8 seconds - more comfortable timing

  const currentArtwork = artDecoPieces[currentIndex];

  // Auto-play functionality with reset on manual navigation
  useEffect(() => {
    // Clear existing timers
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    if (progressRef.current) {
      clearInterval(progressRef.current);
    }

    // Reset progress
    setProgressPercent(0);

    // Start new timers if auto-play is enabled
    if (isAutoPlay && artDecoPieces.length > 1) {
      const startTime = Date.now();
      
      // Progress animation - updates every 100ms for smooth animation
      progressRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const percent = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100);
        setProgressPercent(percent);
      }, 100);

      // Auto-advance timer
      autoPlayRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % artDecoPieces.length);
      }, AUTOPLAY_DURATION);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [isAutoPlay, artDecoPieces.length, currentIndex]); // Reset timer when currentIndex changes

  // Auto-hide UI after inactivity
  useEffect(() => {
    const resetHideTimer = () => {
      setShowUI(true);
      if (hideUIRef.current) {
        clearTimeout(hideUIRef.current);
      }
      hideUIRef.current = setTimeout(() => {
        setShowUI(false);
      }, 3000); // Hide after 3 seconds of inactivity
    };

    resetHideTimer();
    return () => {
      if (hideUIRef.current) {
        clearTimeout(hideUIRef.current);
      }
    };
  }, [currentIndex]);

  // Handle mouse movement to show UI
  const handleMouseMove = () => {
    setShowUI(true);
    if (hideUIRef.current) {
      clearTimeout(hideUIRef.current);
    }
    hideUIRef.current = setTimeout(() => {
      setShowUI(false);
    }, 3000);
  };

  const navigateToNext = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % artDecoPieces.length);
  };

  const navigateToPrevious = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + artDecoPieces.length) % artDecoPieces.length);
  };

  const navigateToIndex = (index: number) => {
    setImageLoaded(false);
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigateToPrevious();
      } else if (e.key === 'ArrowRight') {
        navigateToNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigateToPrevious, navigateToNext, toggleAutoPlay]); // Added dependencies

  if (artDecoPieces.length === 0) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">Loading artwork...</div>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-[80vh] overflow-hidden bg-black ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Main Image Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
            </div>
          )}
          
          {/* Main Artwork Image */}
          <img
            src={currentArtwork?.imagePath}
            alt={currentArtwork?.title}
            className={`w-full h-full object-contain transition-all duration-1000 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            onLoad={handleImageLoad}
            style={{
              filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))'
            }}
          />
          
          {/* Gradient Overlays for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
        {/* Previous Button */}
        <button
          onClick={navigateToPrevious}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-[60] bg-black/30 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/50 transition-all duration-300 group"
          disabled={artDecoPieces.length <= 1}
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button - moved further left to avoid sidebar */}
        <button
          onClick={navigateToNext}
          className="absolute right-20 top-1/2 -translate-y-1/2 z-[60] bg-black/30 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/50 transition-all duration-300 group"
          disabled={artDecoPieces.length <= 1}
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Top Controls */}
        <div className="absolute top-8 left-8 right-20 z-[60]">
          <div className="flex justify-between items-start">
            {/* Artwork Info */}
            <div className="bg-black/30 backdrop-blur-sm text-white p-6 rounded-xl max-w-lg border border-white/10">
              <h2 className="text-3xl font-bold mb-3 font-cinzel leading-tight">{currentArtwork?.title}</h2>
              {currentArtwork?.story && (
                <p className="text-sm opacity-75 mt-4 leading-relaxed max-w-md italic">"{currentArtwork?.story}"</p>
              )}
            </div>

            {/* Auto-play Control with Visual State */}
            <div className="flex space-x-3">
              <button
                onClick={toggleAutoPlay}
                className={`backdrop-blur-sm text-white p-4 rounded-full transition-all duration-300 group ${
                  isAutoPlay 
                    ? 'bg-green-500/30 hover:bg-green-500/50 border border-green-400/30' 
                    : 'bg-red-500/30 hover:bg-red-500/50 border border-red-400/30'
                }`}
                title={isAutoPlay ? 'Pause slideshow (Spacebar)' : 'Resume slideshow (Spacebar)'}
              >
                {isAutoPlay ? (
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2 4H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[60]">
          <div className="flex items-center space-x-1 bg-black/30 backdrop-blur-sm p-4 rounded-full border border-white/10">
            {artDecoPieces.map((piece, index) => (
              <button
                key={index}
                onClick={() => navigateToIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'bg-white w-12 h-3' 
                    : 'bg-white/40 hover:bg-white/60 w-3 h-3'
                }`}
                title={piece.title}
              />
            ))}
          </div>
        </div>

        {/* Image Counter - moved left to avoid sidebar */}
        <div className="absolute bottom-8 right-20 z-[60]">
          <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/10">
            {currentIndex + 1} / {artDecoPieces.length}
          </div>
        </div>

        {/* Progress Bar for Auto-play - now properly synced */}
        {isAutoPlay && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <div 
              className="h-full bg-white/60 transition-all duration-100 ease-linear"
              style={{
                width: `${progressPercent}%`
              }}
            />
          </div>
        )}
      </div>

      {/* Keyboard Navigation Hint with Auto-play Status */}
      <div className={`absolute bottom-8 left-8 text-white/50 text-xs transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
        <div className="space-y-1">
          <div>Use ← → keys to navigate</div>
          <div className="flex items-center space-x-2">
            <span>Spacebar:</span>
            <span className={`px-2 py-1 rounded text-xs ${isAutoPlay ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
              {isAutoPlay ? 'Auto-play ON' : 'Auto-play OFF'}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
