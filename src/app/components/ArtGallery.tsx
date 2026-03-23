'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtworkByCategory } from '@/hooks/useArtwork';
import { Artwork } from '@/types/artwork';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SanityImage } from './SanityImage';
import { urlFor } from '@/sanity/lib/image';

interface ArtGalleryProps {
  category?: 'elegant-contemporary' | 'abstracts' | 'portraits' | 'other';
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ArtGallery({ 
  category = 'abstracts', 
  title,
  subtitle,
  className = '' 
}: ArtGalleryProps) {
  const artworks = useArtworkByCategory(category);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const hideControlsRef = useRef<NodeJS.Timeout | null>(null);

  const AUTOPLAY_DURATION = 5000;

  // Debug log
  useEffect(() => {
    console.log('Artworks:', artworks);
    if (artworks.length > 0) {
      console.log('Current artwork:', artworks[currentIndex]);
      console.log('MainImage:', artworks[currentIndex]?.mainImage);
    }
  }, [artworks, currentIndex]);

  // Auto-hide controls
  useEffect(() => {
    const resetTimer = () => {
      if (hideControlsRef.current) clearTimeout(hideControlsRef.current);
      setShowControls(true);
      hideControlsRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };

    resetTimer();
    const handleMouseMove = () => resetTimer();
    const handleTouchStart = () => resetTimer();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      if (hideControlsRef.current) clearTimeout(hideControlsRef.current);
    };
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    
    if (isAutoPlay && artworks.length > 1) {
      autoPlayRef.current = setTimeout(() => {
        goToNext();
      }, AUTOPLAY_DURATION);
    }

    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [isAutoPlay, currentIndex, artworks.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isFullscreen && e.key === 'Escape') {
        setIsFullscreen(false);
        return;
      }
      
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlay(!isAutoPlay);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAutoPlay, isFullscreen]);

  const goToNext = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const goToPrevious = () => {
    setImageLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const goToIndex = (index: number) => {
    setImageLoaded(false);
    setCurrentIndex(index);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  if (artworks.length === 0) {
    return (
      <div className={`min-h-screen bg-black flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading artwork...</p>
        </div>
      </div>
    );
  }

  const currentArtwork = artworks[currentIndex] || artworks[0];

  return (
    <div className={`min-h-screen bg-black text-white ${className}`}>
      {/* Header */}
      {title && (
        <div className="pt-32 md:pt-36 pb-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 font-cinzel mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-white/80 font-light">{subtitle}</p>
            )}
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent mx-auto mt-6"></div>
          </motion.div>
        </div>
      )}

      {/* Artwork Information - Story/Description */}
      <div className={`px-4 pb-4 ${!title ? 'pt-32 md:pt-36' : ''}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            key={`story-${currentIndex}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {(currentArtwork.description || currentArtwork.story) && (
              <div className="max-w-2xl mx-auto bg-black/70 backdrop-blur-sm text-white p-4 rounded-lg border border-white/20 shadow-2xl">
                <p className="text-sm md:text-base leading-relaxed text-white/90">
                  {currentArtwork.story || currentArtwork.description}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="relative flex-1 flex items-center justify-center px-4 md:px-8 lg:px-16">
        <div className="relative w-full max-w-6xl mx-auto">
          
          {/* Navigation Controls */}
          <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              disabled={artworks.length <= 1}
              className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed z-20"
            >
              <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              disabled={artworks.length <= 1}
              className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed z-20"
            >
              <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Auto-play Toggle */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="pointer-events-auto absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-20"
            >
              {isAutoPlay ? (
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {/* Image Container */}
          <div 
            className="relative bg-black/20 rounded-lg cursor-pointer group"
            onClick={openFullscreen}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {currentArtwork.mainImage?.asset?.url ? (
                  <div className="w-full h-auto max-w-full transition-transform duration-300 group-hover:scale-105"
                    style={{
                      filter: 'drop-shadow(0 0 40px rgba(0,0,0,0.5))'
                    }}>
                    <Image
                      src={currentArtwork.mainImage.asset.url}
                      alt={currentArtwork.mainImage.alt || currentArtwork.title}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      onLoad={handleImageLoad}
                    />
                  </div>
                ) : (
                  <div className="text-white">
                    <p>No image available</p>
                    <p className="text-xs mt-2">Debug: {JSON.stringify(currentArtwork.mainImage)}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Loading indicator */}
            {!imageLoaded && currentArtwork.mainImage?.asset?.url && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Artwork Information - Title and Details */}
      <div className="px-4 pb-6 mt-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            key={`details-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-3xl font-bold font-cinzel mb-3 text-white">
              {currentArtwork.title}
            </h2>
            
            {(currentArtwork.year || currentArtwork.medium || currentArtwork.dimensions) && (
              <div className="text-sm md:text-base text-white/70 space-y-1">
                {currentArtwork.year && <p>Year: {currentArtwork.year}</p>}
                {currentArtwork.medium && <p>Medium: {currentArtwork.medium}</p>}
                {currentArtwork.dimensions && <p>Dimensions: {currentArtwork.dimensions}</p>}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="py-4 px-4 overflow-hidden">
        <div className={`flex justify-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex space-x-2 bg-black/50 backdrop-blur-sm p-3 rounded-xl border border-white/20 max-w-full overflow-x-auto">
            {artworks.map((artwork, index) => (
              <button
                key={artwork._id}
                onClick={() => goToIndex(index)}
                className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex 
                    ? 'ring-2 ring-amber-400 scale-110' 
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                }`}
              >
                {artwork.mainImage?.asset?.url && (
                  <Image
                    src={artwork.mainImage.asset.url}
                    alt={artwork.mainImage.alt || artwork.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="pb-4">
        <div className={`text-center transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="inline-flex items-center space-x-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
            <span className="text-sm text-white/70">
              {currentIndex + 1} / {artworks.length}
            </span>
            {isAutoPlay && (
              <div className="flex items-center space-x-2">
                <div className="w-8 bg-white/20 rounded-full h-1 overflow-hidden">
                  <div className="bg-white h-full animate-pulse" style={{ width: '100%' }} />
                </div>
                <span className="text-xs text-white/50">Auto</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="text-center pb-6">
        <div className={`inline-block bg-black/50 backdrop-blur-sm p-3 rounded-lg border border-white/20 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-xs text-white/70">← → Navigate • Space: Auto Play • Click: Fullscreen</div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={closeFullscreen}
            className="absolute top-6 right-6 z-60 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          
          <div className="w-full h-full flex items-center justify-center p-4">
            {currentArtwork.mainImage?.asset?.url && (
              <Image
                src={currentArtwork.mainImage.asset.url}
                alt={currentArtwork.mainImage.alt || currentArtwork.title}
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
          
          {/* Fullscreen Navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}