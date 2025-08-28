'use client';

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import NextImage from 'next/image';
import { useArtworkByCategory, useArtwork } from '@/hooks/useArtwork';
import { Artwork } from '@/types/artwork';

// Extend Window interface to include our gallery flag
declare global {
  interface Window {
    __activeGallery?: boolean;
  }
  
  interface CSSStyleDeclaration {
    animationTimeline?: string;
  }
}

interface ArtGalleryProps {
  category?: 'art-deco' | 'abstracts' | 'portraits' | 'other';
  artworks?: Artwork[];
  images?: string[]; // Array of image paths for direct loading
  title?: string;
  subtitle?: string;
  className?: string;
}

interface ArtworkWithDimensions extends Artwork {
  aspectRatio?: number;
}

export default function ArtGallery({ 
  category = 'art-deco', 
  artworks, 
  images,
  title = 'Infinite Scroll Gallery',
  className = '' 
}: ArtGalleryProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkWithDimensions | null>(null);
  const [showFloatingHelp, setShowFloatingHelp] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoryArtworks = useArtworkByCategory(category);
  const { artwork: allArtworks } = useArtwork();
  const [artworksWithDimensions, setArtworksWithDimensions] = useState<ArtworkWithDimensions[]>([]);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Use provided images, artworks, or fall back to category/all artworks
  const displayArtworks = useMemo(() => {
    if (images) {
      // Convert image paths to artwork objects
      return images.map((imagePath, index) => {
        const filename = imagePath.split('/').pop() || '';
        
        // Clean up title generation for professionalism
        const cleanTitle = filename
          .replace(/\.(jpg|jpeg|png|gif|webp)+$/i, '') // Remove file extensions (including multiple)
          .replace(/\.(jpg|jpeg|png|gif|webp)/gi, '') // Remove any remaining extensions in the middle
          .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
          .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
          .replace(/\s+/g, ' ') // Replace multiple spaces with single space
          .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
          .trim();
        
        return {
          id: `img-${index}`,
          title: cleanTitle,
          filename,
          imagePath,
          year: undefined,
          medium: '',
          dimensions: '',
          description: 'Coming soon',
          caption: 'Coming soon',
          tags: [],
          category: 'art-deco' as const
        };
      });
    } else {
      return artworks || categoryArtworks || allArtworks;
    }
  }, [images, artworks, categoryArtworks, allArtworks]);
  

  // Load image dimensions
  useEffect(() => {
    const loadImageDimensions = async () => {
      const artworksWithAspectRatios = await Promise.all(
        displayArtworks.map(async (artwork) => {
          return new Promise<ArtworkWithDimensions>((resolve) => {
            const img = new Image();
            img.onload = () => {
              const aspectRatio = img.naturalWidth / img.naturalHeight;
              resolve({ ...artwork, aspectRatio });
            };
            img.onerror = () => {
              // Fallback to default aspect ratio if image fails to load
              resolve({ ...artwork, aspectRatio: 3/4 });
            };
            img.src = artwork.imagePath;
          });
        })
      );
      setArtworksWithDimensions(artworksWithAspectRatios);
    };

    if (displayArtworks.length > 0) {
      loadImageDimensions();
    }
  }, [displayArtworks]);

  // Mobile touch handling for horizontal swipe navigation
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, [isMobile]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isMobile) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX.current - touchEndX;
    const deltaY = touchStartY.current - touchEndY;
    
    // Only handle horizontal swipes (ignore vertical)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swipe left - next artwork
        setCurrentIndex(prev => (prev + 1) % artworksWithDimensions.length);
      } else {
        // Swipe right - previous artwork
        setCurrentIndex(prev => (prev - 1 + artworksWithDimensions.length) % artworksWithDimensions.length);
      }
    }
  }, [isMobile, artworksWithDimensions.length]);

  // Mobile navigation functions
  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % artworksWithDimensions.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + artworksWithDimensions.length) % artworksWithDimensions.length);
  };

  // Mobile gesture support
  useEffect(() => {
    if (!isMobile) return;
    
    const mobileGallery = document.querySelector('.mobile-gallery');
    if (!mobileGallery) return;

    const handleTouchStartWrapper = (e: Event) => {
      handleTouchStart(e as TouchEvent);
    };

    const handleTouchEndWrapper = (e: Event) => {
      handleTouchEnd(e as TouchEvent);
    };

    mobileGallery.addEventListener('touchstart', handleTouchStartWrapper, { passive: true });
    mobileGallery.addEventListener('touchend', handleTouchEndWrapper, { passive: true });

    return () => {
      mobileGallery.removeEventListener('touchstart', handleTouchStartWrapper);
      mobileGallery.removeEventListener('touchend', handleTouchEndWrapper);
    };
  }, [isMobile, handleTouchStart, handleTouchEnd]);

  // Desktop-only: Set up scroll-driven animations
  useEffect(() => {
    if (isMobile) return; // Skip entirely on mobile
    
    const itemCount = artworksWithDimensions.length;
    if (itemCount === 0) return;
    
    // Set a flag to indicate this gallery is active
    window.__activeGallery = true;
    
    // Set CSS custom property for number of items on HTML element (not body!)
    document.documentElement.style.setProperty('--n', itemCount.toString());
    
    // Apply gallery styles to html and body
    document.documentElement.classList.add('gallery-html');
    document.body.classList.add('gallery-body');
    
    // Show floating help after 3 seconds if user hasn't scrolled
    const helpTimer = setTimeout(() => {
      setShowFloatingHelp(true);
    }, 3000);
    
    // Hide floating help when user scrolls
    const hideHelpOnScroll = () => {
      setShowFloatingHelp(false);
      clearTimeout(helpTimer);
    };
    
    // Small delay to ensure DOM is ready
    let cleanupFunction: (() => void) | null = null;
    
    const setupTimer = setTimeout(() => {
      // Improved scroll wheel functionality
      function f(k: number) {
        if (Math.abs(k) > 0.5) {
          const scrollTop = 0.5 * (k - Math.sign(k) + 1) * (document.documentElement.offsetHeight - window.innerHeight);
          scrollTo(0, scrollTop);
        }
      }

      // Initial position
      f(-1);

      // Handle scroll events with proper cleanup
      const handleScroll = () => {
        // Only handle scroll if this gallery is still active
        if (!window.__activeGallery) {
          return;
        }
        
        const k = +getComputedStyle(document.body).getPropertyValue('--k');
        f(k);
        hideHelpOnScroll();
      };

      // Enhanced mobile support
      const handleWheel = (e: WheelEvent) => {
        if (isMobile) return; // Let touch handling take over on mobile
        hideHelpOnScroll();
      };

      // Store the handler for cleanup
      cleanupFunction = () => {
        removeEventListener('scroll', handleScroll);
        removeEventListener('wheel', handleWheel);
      };

      addEventListener('scroll', handleScroll, { passive: true });
      addEventListener('wheel', handleWheel, { passive: true });
    }, 100);
    
    // Return comprehensive cleanup
    return () => {
      // Mark gallery as inactive
      window.__activeGallery = false;
      
      // Call the scroll cleanup first
      clearTimeout(setupTimer);
      if (cleanupFunction) {
        cleanupFunction();
      }
      clearTimeout(helpTimer);
      
      // Reset scroll state
      document.body.style.removeProperty('--k');
      document.documentElement.style.removeProperty('--k');
      document.documentElement.style.removeProperty('--n');
      document.documentElement.classList.remove('gallery-html');
      document.body.classList.remove('gallery-body');
      
      // Stop the CSS animation that drives the --k value
      document.body.style.animation = 'none';
      document.body.style.animationTimeline = 'none';
      
      // Force the --k value to 0 explicitly
      document.body.style.setProperty('--k', '0');
      document.documentElement.style.setProperty('--k', '0');
      
      // Reset scroll position
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Force repaint
      void document.body.offsetHeight;
      
      // Remove the forced values after repaint
      setTimeout(() => {
        document.body.style.removeProperty('--k');
        document.documentElement.style.removeProperty('--k');
        document.body.style.removeProperty('animation');
        document.body.style.animationTimeline = '';
      }, 10);
    };
  }, [artworksWithDimensions.length, isMobile]); // Added isMobile dependency

  if (!artworksWithDimensions || artworksWithDimensions.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Grain Filter SVG */}
      <svg width="0" height="0" aria-hidden="true" className="gallery-svg">
        <defs>
          <filter id="grain">
            <feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feConvolveMatrix kernelMatrix="1 1 1 1 1 1 1 1 1" />
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0.5 0.6 0.7 0.8 0.9 1.0" />
            </feComponentTransfer>
            <feColorMatrix values="0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 1 0" />
            <feComposite operator="over" in2="SourceGraphic" />
          </filter>
        </defs>
      </svg>

      {/* Header */}
      <header className="gallery-header">
        <h1 className="gallery-h2 text-3xl font-bold mb-2">{title}</h1>
        
        <em className="gallery-em text-sm opacity-70">
          {isMobile 
            ? `Mobile gallery • ${artworksWithDimensions.length} artworks` 
            : `3D circular gallery • ${artworksWithDimensions.length} artworks`
          }
        </em>
      </header>

      {/* Main Gallery */}
      {isMobile ? (
        /* Mobile: Simple carousel */
        <main className="mobile-gallery min-h-screen bg-black text-white flex flex-col">
          {/* Current artwork display */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              {/* Artwork image */}
              <div className="relative bg-black rounded-lg overflow-hidden mb-4 shadow-2xl flex items-center justify-center min-h-[400px] max-h-[70vh]">
                <NextImage
                  src={artworksWithDimensions[currentIndex]?.imagePath || ''}
                  alt={artworksWithDimensions[currentIndex]?.title || ''}
                  width={400}
                  height={500}
                  className="object-contain max-w-full max-h-full"
                  sizes="(max-width: 768px) 90vw, 400px"
                  style={{ 
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
                
                {/* Tap to view details overlay */}
                <div 
                  className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => setSelectedArtwork(artworksWithDimensions[currentIndex])}
                >
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-medium">
                    Tap for details
                  </div>
                </div>
              </div>
              
              {/* Artwork info */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{artworksWithDimensions[currentIndex]?.title}</h3>
                <p className="text-gray-400 text-sm">
                  {currentIndex + 1} of {artworksWithDimensions.length}
                </p>
              </div>
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="p-6 bg-gray-900/50">
            {/* Swipe instruction */}
            <div className="text-center mb-4">
              <p className="text-amber-200 text-sm mb-2">
                👈 Swipe left/right or use buttons 👉
              </p>
            </div>
            
            {/* Navigation buttons */}
            <div className="flex justify-between items-center max-w-md mx-auto">
              <button
                onClick={goToPrevious}
                className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Dots indicator */}
              <div className="flex space-x-2">
                {artworksWithDimensions.slice(0, Math.min(5, artworksWithDimensions.length)).map((_, index) => {
                  const actualIndex = currentIndex >= artworksWithDimensions.length - 2 
                    ? artworksWithDimensions.length - 5 + index 
                    : Math.max(0, currentIndex - 2) + index;
                  
                  if (actualIndex >= artworksWithDimensions.length) return null;
                  
                  return (
                    <button
                      key={actualIndex}
                      onClick={() => setCurrentIndex(actualIndex)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        actualIndex === currentIndex ? 'bg-amber-400' : 'bg-gray-600'
                      }`}
                    />
                  );
                })}
              </div>
              
              <button
                onClick={goToNext}
                className="bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* View details button */}
            <div className="text-center mt-4">
              <button
                onClick={() => setSelectedArtwork(artworksWithDimensions[currentIndex])}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-2 rounded-full transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        </main>
      ) : (
        /* Desktop: 3D Gallery */
        <main className="gallery-main">
          <section className="gallery-section">
            {artworksWithDimensions.map((artwork, i) => (
              <article
                key={artwork.id}
                className="gallery-article cursor-pointer"
                style={{
                  '--i': i,
                  '--url': `url("${encodeURI(artwork.imagePath)}")`,
                  '--pos': 'center',
                  '--r': artwork.aspectRatio || 3/4,
                  aspectRatio: artwork.aspectRatio || 3/4
                } as React.CSSProperties}
                onClick={() => setSelectedArtwork(artwork)}
              >
                {/* Back face - Article info */}
                <header className="gallery-article-header">
                  <div className="p-4 flex flex-col justify-center items-center text-center h-full">
                    <h2 className="gallery-h2 font-bold mb-2">
                      {artwork.title}
                    </h2>
                    {artwork.medium && (
                      <em className="gallery-em text-sm opacity-80">
                        {artwork.medium}
                      </em>
                    )}
                  </div>
                </header>

                {/* Front face - Image */}
                <figure className="gallery-figure">
                  <NextImage
                    src={artwork.imagePath}
                    alt={artwork.title}
                    className="gallery-img"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {artwork.caption && (
                    <figcaption className="gallery-figcaption">
                      {artwork.caption}
                    </figcaption>
                  )}
                </figure>
              </article>
            ))}
          </section>
        </main>
      )}

      {/* Footer */}
      <footer className="p-4 text-center text-xs opacity-60">
        <p>© Rafael Acevedo • Interactive 3D Gallery Experience</p>
      </footer>

      {/* Floating Help Indicator */}
      {showFloatingHelp && !isMobile && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="bg-gradient-to-r from-amber-500/90 to-amber-600/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-2xl border border-amber-400/30 flex items-center gap-3 max-w-xs">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">️</span>
            </div>
            <div className="text-white">
              <p className="font-semibold text-sm">Try scrolling!</p>
              <p className="text-xs opacity-90">Use mouse wheel to explore</p>
            </div>
            <button 
              onClick={() => setShowFloatingHelp(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Browser Support Notice */}
      <aside className="gallery-aside">
        <div className="box-info-scrollani">
          Sorry, your browser does not support scroll-driven animations. 
          This gallery works best in modern Chrome, Firefox, or Edge browsers.
        </div>
      </aside>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300 p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <div 
            className={`flex ${isMobile ? 'flex-col' : 'flex-row'} max-w-7xl max-h-[95vh] bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 animate-in zoom-in-95 duration-300 w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className={`${isMobile ? 'w-full h-[60vh] flex-shrink-0' : 'flex-1'} relative ${isMobile ? 'min-h-[300px]' : 'min-h-[500px]'} bg-gradient-to-br from-black to-gray-900 flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <NextImage
                  src={selectedArtwork.imagePath}
                  alt={selectedArtwork.title}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl"
                  width={isMobile ? 400 : 800}
                  height={isMobile ? 300 : 600}
                  sizes={isMobile ? "95vw" : "(max-width: 768px) 90vw, 60vw"}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              
              {/* Subtle frame effect */}
              <div className="absolute inset-4 border border-white/10 rounded-lg pointer-events-none"></div>
            </div>
            
            {/* Details Section */}
            <div className={`${isMobile ? 'w-full p-6 flex-1 min-h-0' : 'w-96 p-10'} flex flex-col justify-start text-white relative overflow-y-auto`}>
              {/* Close button */}
              <button
                onClick={() => setSelectedArtwork(null)}
                className={`absolute ${isMobile ? 'top-4 right-4' : 'top-6 right-6'} w-10 h-10 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 rounded-full text-white hover:text-red-400 text-xl transition-all duration-200 backdrop-blur-sm border border-gray-600/50 z-20`}
              >
                ×
              </button>
              
              {/* Title with decorative element */}
              <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
                <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mb-4"></div>
                <h2 className={`${isMobile ? 'text-2xl' : 'text-4xl'} font-bold font-cinzel mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight`}>
                  {selectedArtwork.title}
                </h2>
              </div>
              
              {/* Metadata cards */}
              <div className={`space-y-4 ${isMobile ? 'mb-4' : 'mb-8'}`}>
                {selectedArtwork.dimensions && (
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                    <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Dimensions</span>
                    <p className="text-white text-lg font-medium">{selectedArtwork.dimensions}</p>
                  </div>
                )}
              </div>
              
              {/* Story section */}
              {selectedArtwork.story && (
                <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
                  <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wide mb-3">Artist&apos;s Story</h3>
                  <div className="bg-gray-800/20 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
                    <p className={`text-gray-200 leading-relaxed ${isMobile ? 'text-sm' : 'text-base'} italic`}>
                      &quot;{selectedArtwork.story}&quot;
                    </p>
                  </div>
                </div>
              )}
              
              {/* Painting's Story */}
              {selectedArtwork.caption && (
                <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
                  <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wide mb-3">Painting&apos;s Story</h3>
                  <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/20 backdrop-blur-sm rounded-lg p-6 border border-amber-700/30">
                    <p className={`text-amber-100 italic leading-relaxed ${isMobile ? 'text-sm' : 'text-base'}`}>
                      &quot;{selectedArtwork.caption}&quot;
                    </p>
                  </div>
                </div>
              )}
              
              {/* Tags */}
              {selectedArtwork.tags && selectedArtwork.tags.length > 0 && (
                <div>
                  <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wide mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedArtwork.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-gray-700 to-gray-600 rounded-full text-gray-200 text-sm font-medium border border-gray-600/50 hover:from-gray-600 hover:to-gray-500 transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
