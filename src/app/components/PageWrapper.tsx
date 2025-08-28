'use client';

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

interface PageWrapperProps {
  children: React.ReactNode;
}

interface NavigationContextType {
  triggerStairsNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationContext');
  }
  return context;
};

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
  const [exitingColumns, setExitingColumns] = useState<number[]>([]);
  const [stairsTriggered, setStairsTriggered] = useState(false);
  const pathname = usePathname();
  const previousPathname = useRef<string>('');
  const isFirstRender = useRef(true);

  const triggerStairsNavigation = () => {
    console.log('Stairs navigation triggered immediately');
    setStairsTriggered(true);
    setIsLoading(true);
    setExitingColumns([]);
  };

  useEffect(() => {
    // Skip on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousPathname.current = pathname;
      return;
    }

    // Only show loading if pathname actually changed OR stairs triggered
    if (previousPathname.current !== pathname) {
      // If stairs wasn't triggered, this is a normal navigation
      if (!stairsTriggered) {
        // Select random painting
        const randomIndex = Math.floor(Math.random() * paintings.length);
        setRandomPainting(paintings[randomIndex]);
        
        // Show loading IMMEDIATELY - no delay
        setIsLoading(true);
        setExitingColumns([]); // Reset exit columns
      }
      
      // Reset stairs trigger flag
      setStairsTriggered(false);

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
        // Start exit animation before hiding loading
        const timeouts: NodeJS.Timeout[] = [];
        
        // Exit animation in reverse order (5, 4, 3, 2, 1)
        for (let i = 4; i >= 0; i--) {
          const timeout = setTimeout(() => {
            setExitingColumns(prev => [...prev, i]);
            console.log(`PageWrapper Column ${i + 1} exiting`);
          }, (4 - i) * 150);
          
          timeouts.push(timeout);
        }
        
        // Hide loading after exit animation completes
        const hideTimeout = setTimeout(() => {
          setIsLoading(false);
          setExitingColumns([]);
        }, 5 * 150 + 600); // All delays + transition time
        
        timeouts.push(hideTimeout);
      }, 600);

      // Update previous pathname
      previousPathname.current = pathname;

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <NavigationContext.Provider value={{ triggerStairsNavigation }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-transparent flex">
          {/* 5 Column Structure */}
          <div className="w-full h-full flex">
            {/* Column 1 */}
            <div style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#000000', // Black
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: exitingColumns.includes(0) ? 'translateY(100%)' : 'translateY(0)',
              transition: 'transform 0.6s ease-out'
            }}>
            </div>
            
            {/* Column 2 */}
            <div style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#000000', // Black
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: exitingColumns.includes(1) ? 'translateY(100%)' : 'translateY(0)',
              transition: 'transform 0.6s ease-out'
            }}>
            </div>
            
            {/* Column 3 - Center column */}
            <div style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#000000', // Black
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              position: 'relative',
              transform: exitingColumns.includes(2) ? 'translateY(100%)' : 'translateY(0)',
              transition: 'transform 0.6s ease-out'
            }}>
            </div>
            
            {/* Column 4 */}
            <div style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#000000', // Black
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: exitingColumns.includes(3) ? 'translateY(100%)' : 'translateY(0)',
              transition: 'transform 0.6s ease-out'
            }}>
            </div>
            
            {/* Column 5 */}
            <div style={{
              flex: 1,
              height: '100%',
              backgroundColor: '#000000', // Black
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: exitingColumns.includes(4) ? 'translateY(100%)' : 'translateY(0)',
              transition: 'transform 0.6s ease-out'
            }}>
            </div>
          </div>

          {/* Loading Content - Positioned above all columns */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <div className="mb-4 sm:mb-8">
              <Image
                src="/images/logo.png"
                alt="Rafael Logo"
                width={80}
                height={80}
                className="mx-auto object-contain animate-pulse sm:w-[120px] sm:h-[120px]"
                priority
              />
            </div>
            
            {/* Loading Spinner */}
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
            
            <div className="text-center px-4">
              <h2 className="text-2xl sm:text-4xl font-cinzel font-light text-white tracking-wider">
                Loading
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Page Content - always visible, positioned behind columns */}
      <div className="relative z-0">
        {children}
      </div>
    </NavigationContext.Provider>
  );
}
