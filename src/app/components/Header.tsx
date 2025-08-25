'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-sm border-b border-white/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Rafael Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {['Home', 'Artwork', 'Interiors', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm tracking-wide font-light"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;