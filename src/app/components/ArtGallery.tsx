'use client';

import React, { useEffect, useState } from 'react';
import { useArtworkByCategory, useArtwork } from '@/hooks/useArtwork';
import { Artwork } from '@/types/artwork';

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
  subtitle = 'Scroll up & down or use arrow keys',
  className = '' 
}: ArtGalleryProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkWithDimensions | null>(null);
  const [showFloatingHelp, setShowFloatingHelp] = useState(false);
  const categoryArtworks = useArtworkByCategory(category);
  const { artwork: allArtworks } = useArtwork();
  const [artworksWithDimensions, setArtworksWithDimensions] = useState<ArtworkWithDimensions[]>([]);
  
  // Use provided images, artworks, or fall back to category/all artworks
  let displayArtworks: Artwork[] = [];
  
  if (images) {
    // Convert image paths to artwork objects
    displayArtworks = images.map((imagePath, index) => {
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
    displayArtworks = artworks || categoryArtworks || allArtworks;
  }
  
  const n = displayArtworks.length;

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

  // Set up scroll-driven animations
  useEffect(() => {
    const itemCount = artworksWithDimensions.length;
    if (itemCount === 0) return;
    
    console.log('Setting up scroll with', itemCount, 'items'); // Debug log
    
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
    setTimeout(() => {
      // Improved scroll wheel functionality
      function f(k: number) {
        if (Math.abs(k) > 0.5) {
          scrollTo(0, 0.5 * (k - Math.sign(k) + 1) * (document.documentElement.offsetHeight - window.innerHeight));
        }
      }

      // Initial position
      f(-1);

      // Handle scroll events
      const handleScroll = () => {
        const k = +getComputedStyle(document.body).getPropertyValue('--k');
        f(k);
        hideHelpOnScroll();
      };

      addEventListener('scroll', handleScroll);
      addEventListener('wheel', hideHelpOnScroll);
      
      // Store cleanup function
      return () => {
        removeEventListener('scroll', handleScroll);
        removeEventListener('wheel', hideHelpOnScroll);
        clearTimeout(helpTimer);
      };
    }, 100);
    
    return () => {
      // Reset styles when component unmounts
      document.documentElement.style.removeProperty('--n');
      document.documentElement.classList.remove('gallery-html');
      document.body.classList.remove('gallery-body');
      clearTimeout(helpTimer);
    };
  }, [artworksWithDimensions.length]); // Only depend on length, not the entire array

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
        
        {/* More prominent instructions */}
        <div className="bg-gradient-to-r from-amber-900/30 to-amber-800/20 backdrop-blur-sm rounded-lg p-4 mb-4 border border-amber-700/30 max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 bg-amber-400/20 rounded-full flex items-center justify-center">
              <span className="text-amber-400 text-sm">ℹ</span>
            </div>
            <strong className="text-amber-200 text-base font-semibold">How to Navigate</strong>
          </div>
          <div className="space-y-1 text-sm text-amber-100/90">
            <p className="flex items-center gap-2">
              <span className="text-amber-400">🖱️</span>
              <span>Scroll with mouse wheel to rotate gallery</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-amber-400">⌨️</span>
              <span>Use ↑↓ arrow keys for precise navigation</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-amber-400">👆</span>
              <span>Click any artwork to view details</span>
            </p>
          </div>
        </div>
        
        <em className="gallery-em text-sm opacity-70">
          3D circular gallery • {artworksWithDimensions.length} artworks
        </em>
      </header>

      {/* Main Gallery */}
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
                '--r': artwork.aspectRatio || 3/4, // Use individual aspect ratio
                aspectRatio: artwork.aspectRatio || 3/4 // Also set CSS aspect-ratio directly
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
                <img
                  src={artwork.imagePath}
                  alt={artwork.title}
                  className="gallery-img"
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

      {/* Footer */}
      <footer className="p-4 text-center text-xs opacity-60">
        <p>© Rafael Acevedo • Interactive 3D Gallery Experience</p>
      </footer>

      {/* Floating Help Indicator */}
      {showFloatingHelp && (
        <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="bg-gradient-to-r from-amber-500/90 to-amber-600/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-2xl border border-amber-400/30 flex items-center gap-3 max-w-xs">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-lg">👆</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setSelectedArtwork(null)}
        >
          <div 
            className="flex max-w-7xl max-h-[95vh] bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700/50 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left side - Image */}
            <div className="flex-1 relative min-h-[500px] bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20"></div>
              <img
                src={selectedArtwork.imagePath}
                alt={selectedArtwork.title}
                className="max-w-full max-h-full object-contain drop-shadow-2xl relative z-10"
              />
              
              {/* Subtle frame effect */}
              <div className="absolute inset-4 border border-white/10 rounded-lg pointer-events-none"></div>
            </div>
            
            {/* Right side - Details */}
            <div className="w-96 p-10 flex flex-col justify-center text-white relative overflow-y-auto">
              {/* Close button */}
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-800/80 hover:bg-gray-700/80 rounded-full text-white hover:text-red-400 text-xl transition-all duration-200 backdrop-blur-sm border border-gray-600/50"
              >
                ×
              </button>
              
              {/* Title with decorative element */}
              <div className="mb-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 mb-4"></div>
                <h2 className="text-4xl font-bold font-cinzel mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
                  {selectedArtwork.title}
                </h2>
              </div>
              
              {/* Metadata cards */}
              <div className="space-y-4 mb-8">
                {selectedArtwork.dimensions && (
                  <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                    <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">Dimensions</span>
                    <p className="text-white text-lg font-medium">{selectedArtwork.dimensions}</p>
                  </div>
                )}
              </div>
              
              {/* Story section */}
              {selectedArtwork.story && (
                <div className="mb-8">
                  <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wide mb-3">Artist's Story</h3>
                  <div className="bg-gray-800/20 backdrop-blur-sm rounded-lg p-6 border border-gray-700/30">
                    <p className="text-gray-200 leading-relaxed text-base italic">
                      "{selectedArtwork.story}"
                    </p>
                  </div>
                </div>
              )}
              
              {/* Painting's Story */}
              {selectedArtwork.caption && (
                <div className="mb-8">
                  <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wide mb-3">Painting's Story</h3>
                  <div className="bg-gradient-to-r from-amber-900/20 to-amber-800/20 backdrop-blur-sm rounded-lg p-6 border border-amber-700/30">
                    <p className="text-amber-100 italic leading-relaxed text-base">
                      "{selectedArtwork.caption}"
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
