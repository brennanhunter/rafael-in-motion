'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useArtworkByCategory } from '@/hooks/useArtwork';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ElegantContemporaryProps {
  className?: string;
}

export default function ElegantContemporary({ className = '' }: ElegantContemporaryProps) {
  const elegantContemporaryPieces = useArtworkByCategory('elegant-contemporary');
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

  const currentArtwork = elegantContemporaryPieces[currentIndex];

  // Auto-play functionality with reset on manual navigation
  useEffect(() => {
    // Clear existing timers
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }
    if (progressRef.current) {
      clearTimeout(progressRef.current);
    }
    
    setProgressPercent(0);
    
    if (isAutoPlay && elegantContemporaryPieces.length > 1) {
      // Start progress timer
      const progressInterval = setInterval(() => {
        setProgressPercent(prev => {
          if (prev >= 100) {
            return 0;
          }
          return prev + (100 / (AUTOPLAY_DURATION / 100));
        });
      }, 100);
      
      // Auto-advance timer
      autoPlayRef.current = setTimeout(() => {
        setImageLoaded(false);
        setCurrentIndex((prev) => (prev + 1) % elegantContemporaryPieces.length);
      }, AUTOPLAY_DURATION);
      
      // Store progress interval for cleanup
      progressRef.current = progressInterval as NodeJS.Timeout;
      
      // Cleanup function
      return () => {
        clearInterval(progressInterval);
        if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      };
    }
  }, [isAutoPlay, elegantContemporaryPieces.length, currentIndex]); // Reset timer when currentIndex changes

  // Mouse movement detection for UI visibility
  useEffect(() => {
    const handleMouseMove = () => {
      setShowUI(true);
      resetHideUITimer();
    };

    const handleMouseLeave = () => {
      resetHideUITimer();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Initial hide timer
  useEffect(() => {
    resetHideUITimer();
  }, []);

  const resetHideUITimer = () => {
    if (hideUIRef.current) {
      clearTimeout(hideUIRef.current);
    }
    hideUIRef.current = setTimeout(() => {
      setShowUI(false);
    }, 3000);
  };

  const navigateToNext = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % elegantContemporaryPieces.length);
  }, [elegantContemporaryPieces.length]);

  const navigateToPrevious = useCallback(() => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + elegantContemporaryPieces.length) % elegantContemporaryPieces.length);
  }, [elegantContemporaryPieces.length]);

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
  }, [isAutoPlay, navigateToNext, navigateToPrevious, toggleAutoPlay, isFullscreen]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
      if (hideUIRef.current) clearTimeout(hideUIRef.current);
      if (progressRef.current) clearTimeout(progressRef.current);
    };
  }, []);

  if (elegantContemporaryPieces.length === 0) {
    return (
      <section className={`min-h-screen bg-black flex items-center justify-center ${className}`}>
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-white"></div>
      </section>
    );
  }

  return (
    <div className={`min-h-screen bg-black ${className}`}>
      {/* Section Header */}
      <div className="pt-4 pb-6">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 font-cinzel mb-6 leading-tight">
              Elegant Contemporary
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </div>

      {/* Main Gallery Content */}
      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-8">
          {/* Gallery Container */}
          <div className="relative" style={{ minHeight: '60vh' }}>
            {/* Navigation Controls - Positioned relative to gallery container */}
            <div className={`absolute inset-0 pointer-events-none z-[60] transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
              {/* Previous Button */}
              <button
                onClick={navigateToPrevious}
                className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 group"
                disabled={elegantContemporaryPieces.length <= 1}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={navigateToNext}
                className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 group"
                disabled={elegantContemporaryPieces.length <= 1}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
              </div>
            )}
            
            {/* Main Artwork Image */}
            <div 
              className="w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300 flex items-center justify-center"
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
                className={`elegant-contemporary-image w-full h-auto max-w-full object-contain transition-all duration-1000 sm:max-h-[70vh] max-h-[60vh] ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                } ${
                  (currentArtwork?.title === 'Finding Yourself' || currentArtwork?.title === 'Japanese Night') ? 'border-2 border-gray-400 rounded-lg' : ''
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
      </div>

      {/* Navigation Dots - Simplified to 4 dots */}
      <div className="py-2">
        <div className={`flex justify-center transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/20">
            {[...Array(4)].map((_, index) => {
              const progress = currentIndex / (elegantContemporaryPieces.length - 1);
              const segmentIndex = Math.floor(progress * 3);
              const isActive = index === segmentIndex;
              return (
                <div
                  key={index}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'bg-white w-6 h-2' 
                      : 'bg-white/30 w-2 h-2'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Progress Bar for Auto-play */}
        {isAutoPlay && (
          <div className="flex justify-center mt-2">
            <div className="w-24 bg-white/20 rounded-full h-1 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-100 ease-linear"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Title and Story - Closer to image */}
      <div className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Title - Smaller and closer */}
          <div className="text-center mb-3">
            <h2 className="text-lg md:text-2xl font-bold font-cinzel leading-tight text-white">{currentArtwork?.title}</h2>
          </div>
          
          {/* Story - Inline with story text */}
          <div className="max-w-2xl mx-auto bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg border border-white/20 shadow-2xl">
            <p className="text-sm leading-relaxed text-white/90">
              <span className="text-amber-400 font-semibold">Story:</span> {currentArtwork?.story || 'No story available for this artwork.'}
            </p>
          </div>
        </div>
      </div>



      {/* Keyboard Shortcuts Help */}
      <div className="text-center py-4">
        <div className={`inline-block bg-black/50 backdrop-blur-sm p-2 sm:p-3 rounded-lg border border-white/20 transition-opacity duration-500 ${showUI ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-xs text-white/70">← → Navigate • Space: Auto Play</div>
        </div>
      </div>


      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 z-[101] bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          
          <div className="w-full h-full flex items-center justify-center p-4">
            <Image
              src={currentArtwork?.imagePath || ''}
              alt={currentArtwork?.title || ''}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
              style={{
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