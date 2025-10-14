// src/app/components/Hero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const words = ['ARTIST', 'CREATOR', 'STORYTELLER', 'VISIONARY'];

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        const nextIndex = (prev + 1) % words.length;
        // Stop animation after showing VISIONARY
        if (nextIndex === 0) {
          setIsAnimating(false);
          return 3; // Stay on VISIONARY
        }
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnimating]);

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
          <motion.h1 
            className="hero-title text-8xl md:text-9xl lg:text-[12rem] font-cinzel font-bold text-white tracking-wider"
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            RAFAEL
          </motion.h1>
          
          {/* Animated Subtitle */}
          <div className="h-24 flex items-center justify-center">
            <h2 className="hero-subtitle text-4xl md:text-5xl lg:text-6xl font-cinzel font-light text-amber-400 tracking-widest transition-all duration-1000 ease-in-out transform">
              {words[currentWordIndex]}
            </h2>
          </div>
          
          
        </div>
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 z-10"></div>
    </section>
  );
};

export default Hero;