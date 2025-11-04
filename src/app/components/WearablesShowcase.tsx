'use client';

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
          {/* Centered Text */}
          <div 
            className={`flex flex-col justify-center items-center space-y-6 max-w-4xl mx-auto text-center transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="space-y-8 text-gray-100">
              <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed">
                In Art In Motion, painting leaves the canvas to flow across fabric.
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed">
                Each garment, printed with details drawn from the original artworks, transforms into movement and movement into presence.
              </p>
              <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed">
                Touches of silk, blended with other fine materials, lend a quiet luminosity — a softness that allows the art to move with grace and breath.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
