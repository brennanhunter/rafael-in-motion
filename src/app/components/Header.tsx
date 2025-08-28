'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Stairs from './stairs/Stairs';

const Header: React.FC = () => {
  const [isStairsOpen, setIsStairsOpen] = useState<boolean>(false);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      // Consider "at top" if scroll position is less than 10px to account for minor scroll variations
      setIsAtTop(window.scrollY < 10);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-50 mix-blend-difference">
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-between items-center">
            {/* Logo - Only visible at top of screen */}
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Rafael Logo"
                  width={80}
                  height={80}
                  className={`object-contain cursor-pointer mix-blend-difference transition-opacity duration-300 ${
                    isAtTop ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </Link>
            </div>

            {/* Navigation - Hamburger Menu */}
            <nav className="flex">
              <button 
                onClick={() => setIsStairsOpen(true)}
                className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 group"
              >
                <span className="block w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-gray-300 mix-blend-difference"></span>
                <span className="block w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-gray-300 mix-blend-difference"></span>
                <span className="block w-6 h-0.5 bg-white transition-all duration-300 group-hover:bg-gray-300 mix-blend-difference"></span>
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Stairs Component */}
      <Stairs isOpen={isStairsOpen} onClose={() => setIsStairsOpen(false)} />
    </>
  );
};

export default Header;