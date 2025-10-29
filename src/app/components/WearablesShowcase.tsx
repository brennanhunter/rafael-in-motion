'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function WearablesShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black"
    >
      <div className="container mx-auto px-8 py-20">
        {/* Title */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wider mb-4">
            Wearable Art
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 tracking-wide">
            Where Canvas Meets Couture
          </p>
        </div>

        <div className="flex items-center justify-center min-h-[70vh]">
          {/* Image with fade-in animation */}
          <div 
            className={`relative w-full max-w-2xl transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 scale-115' : 'opacity-0 scale-100'
            }`}
          >
            <Image
              src="/images/wearables/canva-creation.png"
              alt="Wearable Art"
              width={800}
              height={1200}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
