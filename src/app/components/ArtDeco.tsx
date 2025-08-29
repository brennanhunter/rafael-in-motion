'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useArtworkByCategory } from '@/hooks/useArtwork';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ArtDecoProps {
  className?: string;
}

export default function ArtDeco({ className = '' }: ArtDecoProps) {
  const artDecoPieces = useArtworkByCategory('art-deco');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUI, setShowUI] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const navigateToNext = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % artDecoPieces.length);
  }, [artDecoPieces.length]);

  const navigateToPrevious = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + artDecoPieces.length) % artDecoPieces.length);
  }, [artDecoPieces.length]);

  const navigateToIndex = useCallback((index: number) => {
    setImageLoaded(false);
    setCurrentIndex(index);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(!isAutoPlay);
  }, [isAutoPlay]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsLoading(false);
  };

  const openFullscreen = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    console.log('Opening fullscreen'); // Debug log
    setIsFullscreen(true);
  };

  const closeFullscreen = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    console.log('Closing fullscreen'); // Debug log
    setIsFullscreen(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFullscreen && e.key === 'Escape') {
        closeFullscreen();
        return;
      }
      
      if (isFullscreen) return; // Don't handle navigation keys in fullscreen
      
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
  }, [navigateToPrevious, navigateToNext, toggleAutoPlay, isFullscreen]); // Added dependencies

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
      {/* Main Gallery Content */}
      <div className={`${isFullscreen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
      {/* Main Image Display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl mx-auto px-4 md:px-32 lg:px-24 pt-40 pb-32 sm:pt-32 sm:pb-24 md:pt-28 md:pb-20">
          {/* Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
            </div>
          )}
          
          {/* Main Artwork Image */}
          <div 
            className="w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300 relative z-[55]"
            onClick={(e) => {
              console.log('IMAGE CLICKED!!! Event triggered'); // Very obvious debug
              openFullscreen(e);
            }}
            title="Click to view fullscreen"
          >
            <Image
              src={currentArtwork?.imagePath || ''}
              alt={currentArtwork?.title || ''}
              width={800}
              height={600}
              className={`w-full h-full object-contain transition-all duration-1000 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              onLoad={handleImageLoad}
              style={{
                filter: `drop-shadow(0 0 40px rgba(0,0,0,0.5)) ${
                  currentArtwork?.id === 'the-prey-ii' ? 'saturate(0.7)' : ''
                }`
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
        {/* Previous Button */}
        <button
          onClick={navigateToPrevious}
          className="absolute left-[400px] md:left-[450px] top-1/2 -translate-y-1/2 z-[60] bg-black/30 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/50 transition-all duration-300 group"
          disabled={artDecoPieces.length <= 1}
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Button */}
        <button
          onClick={navigateToNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-[60] bg-black/30 backdrop-blur-sm text-white p-4 rounded-full hover:bg-black/50 transition-all duration-300 group"
          disabled={artDecoPieces.length <= 1}
        >
          <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Top Navigation Area */}
        <div className="absolute top-0 left-0 right-0 z-[60] bg-gradient-to-b from-black/90 via-black/80 to-transparent">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6 space-y-3 sm:space-y-0">
            {/* Artwork Info - Responsive positioning */}
            <div className="bg-black/70 backdrop-blur-sm text-white p-3 sm:p-4 rounded-lg max-w-full sm:max-w-md border border-white/20">
              <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 font-cinzel leading-tight">{currentArtwork?.title}</h2>
              <div className="text-xs text-white/80">
                {currentIndex + 1} of {artDecoPieces.length} • Art Deco Collection
              </div>
            </div>

            {/* Auto-play Control */}
            <button
              onClick={toggleAutoPlay}
              className={`backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 group self-start sm:self-auto ${
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2 4H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Side Story Panel - Desktop */}
        <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-[60] max-w-xs">
          {currentArtwork?.story && (
            <div className="bg-black/80 backdrop-blur-sm text-white p-4 rounded-lg border border-white/30 shadow-2xl">
              <h3 className="text-sm font-semibold mb-2 text-amber-300">Story</h3>
              <p className="text-xs leading-relaxed italic">&quot;{currentArtwork?.story}&quot;</p>
            </div>
          )}
        </div>

        {/* Bottom Area for Navigation Only */}
        <div className="absolute bottom-0 left-0 right-0 z-[60] bg-gradient-to-t from-black/95 via-black/85 to-transparent">
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {/* Story Text - Mobile Only */}
            <div className="block md:hidden">
              {currentArtwork?.story && (
                <div className="bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg border border-white/20 max-w-full mx-auto">
                  <p className="text-xs leading-relaxed italic text-center">&quot;{currentArtwork?.story}&quot;</p>
                </div>
              )}
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm p-2 sm:p-3 rounded-full border border-white/20">
                {artDecoPieces.map((piece, index) => (
                  <button
                    key={index}
                    onClick={() => navigateToIndex(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex 
                        ? 'bg-white w-8 sm:w-10 h-2 sm:h-3' 
                        : 'bg-white/40 hover:bg-white/60 w-2 sm:w-3 h-2 sm:h-3'
                    }`}
                    title={piece.title}
                  />
                ))}
              </div>
            </div>
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

      {/* Keyboard Navigation Hint */}
      <div className={`absolute top-20 sm:top-24 right-4 sm:right-6 text-white/60 text-xs transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-black/50 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-white/20 space-y-1">
          <div className="text-xs">← → Navigate</div>
          <div className="flex items-center space-x-2 text-xs">
            <span>Space:</span>
            <span className={`px-1 sm:px-2 py-1 rounded text-xs ${isAutoPlay ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
              {isAutoPlay ? 'Auto ON' : 'Auto OFF'}
            </span>
          </div>
        </div>
      </div>
      </div> {/* Close Main Gallery Content wrapper */}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[100] flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            console.log('Backdrop clicked!', e.target, e.currentTarget); // More detailed debug
            closeFullscreen();
          }}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              console.log('X button clicked!'); // Debug log
              e.stopPropagation();
              closeFullscreen();
            }}
            className="absolute top-4 right-4 z-[110] p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
          >
            <XMarkIcon className="h-6 w-6 text-white" />
          </button>

          {/* Fullscreen Image */}
          <div 
            className="relative w-full h-full flex items-center justify-center p-8 pointer-events-none"
          >
            <Image
              src={currentArtwork?.imagePath || ''}
              alt={currentArtwork?.title || ''}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain pointer-events-none"
              style={{
                filter: 'drop-shadow(0 0 60px rgba(0,0,0,0.8))',
                width: 'auto',
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
