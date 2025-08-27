'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {
  const [showArtworkDropdown, setShowArtworkDropdown] = useState<boolean>(false);

  return (
    <header className="fixed top-0 w-full z-50 mix-blend-difference">
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Rafael Logo"
                width={80}
                height={80}
                className="object-contain cursor-pointer mix-blend-difference"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link
              href="/"
              className="text-white hover:text-gray-300 transition-colors duration-200 text-sm tracking-wide font-light mix-blend-difference"
            >
              Home
            </Link>
            
            {/* Artwork Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setShowArtworkDropdown(true)}
              onMouseLeave={() => setShowArtworkDropdown(false)}
            >
              <button className="text-white hover:text-gray-300 transition-colors duration-200 text-sm tracking-wide font-light flex items-center mix-blend-difference">
                Artwork
                <svg 
                  className={`ml-1 w-4 h-4 transition-transform duration-200 ${showArtworkDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 mt-2 w-48 bg-black/95 backdrop-blur-md border border-white/20 rounded-lg shadow-xl transition-all duration-200 ${
                showArtworkDropdown ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
              }`}>
                <div className="py-2">
                  <Link
                    href="/art-deco"
                    className="block px-4 py-3 text-white hover:text-gray-300 hover:bg-white/10 transition-all duration-200 text-sm tracking-wide font-light"
                  >
                    Art Deco
                  </Link>
                  <Link
                    href="/abstract"
                    className="block px-4 py-3 text-white hover:text-gray-300 hover:bg-white/10 transition-all duration-200 text-sm tracking-wide font-light"
                  >
                    Abstract
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/interactive-gallery"
              className="text-white hover:text-gray-300 transition-colors duration-200 text-sm tracking-wide font-light mix-blend-difference"
            >
              Showcase
            </Link>

            <Link
              href="/interiors"
              className="text-white hover:text-gray-300 transition-colors duration-200 text-sm tracking-wide font-light mix-blend-difference"
            >
              Interiors
            </Link>
            <a
              href="#contact"
              className="text-white hover:text-gray-300 transition-colors duration-200 text-sm tracking-wide font-light mix-blend-difference"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;