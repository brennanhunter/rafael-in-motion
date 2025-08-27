'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface PageWrapperProps {
  children: React.ReactNode;
}

// Array of painting paths for random selection
const paintings = [
  '/images/art-deco/Tea House.jpg',
  '/images/art-deco/TheChase.jpg',
  '/images/art-deco/FlyingKitesRunningCats.jpg',
  '/images/art-deco/101OrigamiBirds.jpg',
  '/images/art-deco/Bath Behind Doors.jpg',
  '/images/art-deco/HorsesFromHeaven.png',
  '/images/art-deco/The Great Wave.jpg',
  '/images/art-deco/The Kiss.jpg',
  '/images/art-deco/BlueLotus.jpg',
  '/images/art-deco/Soleil.jpg',
  '/images/abstracts/A-Hundred-Bells-and-One-Flute.jpg',
  '/images/abstracts/The-Abstract-Forest.jpg',
  '/images/abstracts/Dancing-in-the-Shadows.jpg',
  '/images/abstracts/Lost-in-the-Red-Garden.jpg',
  '/images/abstracts/The-Duel.jpg',
  '/images/abstracts/Sunrise.jpg.webp'
];

export default function PageWrapper({ children }: PageWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [randomPainting, setRandomPainting] = useState('');
  const pathname = usePathname();
  const previousPathname = useRef<string>('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPathname.current = pathname;
      return;
    }

    // Only show loading if pathname actually changed
    if (previousPathname.current !== pathname) {
      // Select random painting
      const randomIndex = Math.floor(Math.random() * paintings.length);
      setRandomPainting(paintings[randomIndex]);
      
      // Show loading
      setIsLoading(true);

      // Clean up any gallery scroll behavior and reset to top
      (window as typeof window & { __activeGallery?: boolean }).__activeGallery = false;
      document.body.style.removeProperty('--k');
      document.documentElement.style.removeProperty('--k');
      document.documentElement.style.removeProperty('--n');
      document.documentElement.classList.remove('gallery-html');
      document.body.classList.remove('gallery-body');
      
      // Stop the CSS animation that drives the --k value
      document.body.style.animation = 'none';
      (document.body.style as CSSStyleDeclaration & { animationTimeline?: string }).animationTimeline = 'none';
      
      // Force the --k value to 0 explicitly
      document.body.style.setProperty('--k', '0');
      document.documentElement.style.setProperty('--k', '0');
      
      // Force scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      
      // Force repaint
      void document.body.offsetHeight;
      
      // Remove the forced values after repaint
      setTimeout(() => {
        document.body.style.removeProperty('--k');
        document.documentElement.style.removeProperty('--k');
        document.body.style.removeProperty('animation');
        (document.body.style as CSSStyleDeclaration & { animationTimeline?: string }).animationTimeline = '';
      }, 10);
      
      // Additional cleanup for any lingering scroll locks
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 50);

      // Hide loading after short delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      // Update previous pathname
      previousPathname.current = pathname;

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
          {/* Random Painting Background */}
          {randomPainting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative max-w-4xl max-h-4xl w-full h-full">
                <Image
                  src={randomPainting}
                  alt="Loading artwork"
                  fill
                  className="object-contain opacity-40"
                  priority
                />
              </div>
            </div>
          )}

          {/* Logo and Loading Text */}
          <div className="relative z-10 text-center">
            <div className="mb-8 mix-blend-difference">
              <Image
                src="/images/logo.png"
                alt="Rafael Logo"
                width={120}
                height={120}
                className="mx-auto object-contain"
                priority
              />
            </div>
            
            <div className="mix-blend-difference">
              <h2 className="text-6xl font-cinzel font-light text-white tracking-wider">
                Loading
              </h2>
            </div>
          </div>

          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}

      {/* Page Content */}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}
