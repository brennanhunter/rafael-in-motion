// src/app/components/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['ARTIST', 'CREATOR', 'VISIONARY', 'STORYTELLER', 'MASTER'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, [words.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.getElementById('parallax-bg');
      const heroText = document.getElementById('hero-text');
      
      if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
      }
      
      if (heroText) {
        const textSpeed = scrolled * 0.3;
        heroText.style.transform = `translateY(${textSpeed}px)`;
        heroText.style.opacity = `${1 - scrolled / 800}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background Image */}
      <div id="parallax-bg" className="absolute inset-0 scale-110">
        <Image
          src="/images/artista.jpg"
          alt="Rafael - Artist"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Text Content */}
      <div id="hero-text" className="relative z-20 h-full flex items-center justify-center text-center">
        <div className="space-y-8">
          {/* Main Name */}
          <h1 className="hero-title text-8xl md:text-9xl lg:text-[12rem] font-cinzel font-bold text-white tracking-wider">
            RAFAEL
          </h1>
          
          {/* Animated Subtitle */}
          <div className="h-24 flex items-center justify-center">
            <h2 className="hero-subtitle text-4xl md:text-5xl lg:text-6xl font-cinzel font-light text-amber-400 tracking-widest transition-all duration-1000 ease-in-out transform">
              {words[currentWordIndex]}
            </h2>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
            <p className="text-white/60 text-sm mt-2 tracking-wider">SCROLL</p>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10"></div>
    </section>
  );
};

export default Hero;