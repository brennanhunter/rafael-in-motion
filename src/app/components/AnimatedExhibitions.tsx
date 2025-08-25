'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Exhibition {
  id: string;
  title: string;
  location: string;
  year?: string;
  description?: string;
  image?: string;
  featured?: boolean;
}

const exhibitions: Exhibition[] = [
  {
    id: 'quinquela-martin',
    title: 'Quinquela Martín Museum',
    location: 'Buenos Aires, Argentina',
    year: '2023',
    description: 'A prestigious showcase of contemporary art in Argentina\'s cultural heart, celebrating the legacy of Benito Quinquela Martín',
    image: '/images/exhibitions/BuenosAiresMartin.jpg',
    featured: true
  },
  {
    id: 'tokyo-embassy',
    title: 'Argentinian Embassy',
    location: 'Tokyo, Japan',
    year: '2022',
    description: 'Cultural exchange through artistic expression, bridging Argentine and Japanese artistic traditions',
    image: '/images/exhibitions/TokyoEmbassy.jpg'
  },
  {
    id: 'salon-marquez',
    title: 'Salón Marquez Luis Díez de Oñate',
    location: 'Algeciras, Spain',
    year: '2023',
    description: 'European debut showcasing Rafael\'s distinctive style in this prestigious Spanish salon',
    image: '/images/exhibitions/Generic.jpg'
  },
  {
    id: 'fiera-milano',
    title: 'Fiera da Milano',
    location: 'Milan, Italy',
    year: '2022',
    description: 'International art fair featuring contemporary masters in the fashion capital of the world',
    image: '/images/exhibitions/FieraMilano.jpeg',
    featured: true
  },
  {
    id: 'morikami-museum',
    title: 'Morikami Museum',
    location: 'Boca Raton, USA',
    year: '2023',
    description: 'Celebrating artistic heritage and innovation in this renowned Japanese cultural center',
    image: '/images/exhibitions/MorikamiMuseum.jpg'
  },
  {
    id: 'art-deco-miami',
    title: 'Annual Art Deco Exhibition',
    location: 'Miami Beach, USA',
    year: '2023',
    description: 'Perfect harmony between Rafael\'s style and Art Deco legacy in the iconic Miami Beach district',
    image: '/images/exhibitions/ArtDecoMiami.jpg',
    featured: true
  },
  {
    id: 'polo-club',
    title: 'Polo Club Art Exhibition',
    location: 'Miami, USA',
    year: '2022',
    description: 'Exclusive showcase for distinguished collectors in an elegant equestrian setting',
    image: '/images/exhibitions/PoloClub.jpg'
  },
  {
    id: 'jockey-club',
    title: 'Jockey Club of Miami',
    location: 'Miami, USA',
    year: '2023',
    description: 'Elite gathering of art enthusiasts and connoisseurs in this prestigious venue',
    image: '/images/exhibitions/JockeyClub.jpg'
  },
  {
    id: 'palace-vizcaya',
    title: 'Palace of Vizcaya Art Exhibition',
    location: 'Coral Gables, USA',
    year: '2022',
    description: 'Stunning exhibition in the historic Vizcaya Museum & Gardens, blending art with architectural grandeur',
    image: '/images/exhibitions/VizcayaMuseum.jpg',
    featured: true
  },
  {
    id: 'feria-sevilla',
    title: 'Feria de Sevilla – Pabellón Argentino',
    location: 'Seville, Spain',
    year: '2023',
    description: 'Representing Argentine culture and artistry at Spain\'s most famous fair',
    image: '/images/exhibitions/Generic.jpg'
  },
  {
    id: 'feria-campo',
    title: 'Feria del Campo – Pabellón Argentino',
    location: 'Madrid, Spain',
    year: '2022',
    description: 'Showcasing Argentine artistic talent in Spain\'s vibrant capital city',
    image: '/images/exhibitions/Generic.jpg'
  },
  {
    id: 'feria-naciones',
    title: 'Feria de las Naciones',
    location: 'Bari, Italy',
    year: '2023',
    description: 'International cultural exchange celebrating diverse artistic expressions from around the world',
    image: '/images/exhibitions/Generic.jpg'
  }
];

const AnimatedExhibitions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentExhibition, setCurrentExhibition] = useState(0);
  const [visibleExhibitions, setVisibleExhibitions] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    // GSAP ScrollTrigger for each exhibition
    exhibitions.forEach((_, index) => {
      const exhibitionElement = container.querySelector(`[data-exhibition="${index}"]`);
      if (!exhibitionElement) return;

      // Determine animation direction (alternating left/right)
      const fromLeft = index % 2 === 0;
      const fromDirection = fromLeft ? -100 : 100;
      const toDirection = fromLeft ? 100 : -100;

      // Set initial state
      gsap.set(exhibitionElement, {
        x: `${fromDirection}vw`,
        opacity: 0,
        scale: 0.8,
        rotation: fromLeft ? -15 : 15
      });

      // Create scroll trigger
      ScrollTrigger.create({
        trigger: exhibitionElement,
        start: 'top 85%',
        end: 'bottom 15%',
        onEnter: () => {
          setVisibleExhibitions(prev => new Set([...prev, index]));
          setCurrentExhibition(index);
          
          // Fly in animation
          gsap.to(exhibitionElement, {
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.1
          });
        },
        onLeave: () => {
          // Fly out animation
          gsap.to(exhibitionElement, {
            x: `${toDirection}vw`,
            opacity: 0,
            scale: 0.9,
            rotation: fromLeft ? 15 : -15,
            duration: 1.2,
            ease: 'power3.in'
          });
        },
        onEnterBack: () => {
          setVisibleExhibitions(prev => new Set([...prev, index]));
          setCurrentExhibition(index);
          
          // Fly back in
          gsap.to(exhibitionElement, {
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: 'power3.out'
          });
        },
        onLeaveBack: () => {
          // Fly back out
          gsap.to(exhibitionElement, {
            x: `${fromDirection}vw`,
            opacity: 0,
            scale: 0.8,
            rotation: fromLeft ? -15 : 15,
            duration: 1.2,
            ease: 'power3.in'
          });
        },
        markers: false, // Set to true for debugging
        refreshPriority: -1 // Ensure this runs after layout
      });
    });

    // Refresh ScrollTrigger after a short delay to ensure proper layout calculation
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-20 relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 font-playfair">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
            Exhibitions
          </span>
        </h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-playfair">
          A journey through galleries worldwide, showcasing Rafael's artistic evolution and cultural impact
        </p>
        <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto mt-6 rounded-full"></div>
      </motion.div>

      {/* Exhibitions Container */}
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 space-y-40">
        {exhibitions.map((exhibition, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div
              key={exhibition.id}
              data-exhibition={index}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
            >
              {/* Content Side */}
              <div className={`flex-1 ${isEven ? 'lg:text-left' : 'lg:text-right'}`}>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Glassmorphism container */}
                  <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                    {/* Exhibition number */}
                    <div className={`flex ${isEven ? 'justify-start' : 'justify-end'} mb-4`}>
                      <span className="text-6xl font-bold text-amber-400/30 font-playfair">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title and location */}
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 font-playfair leading-tight">
                      {exhibition.title}
                    </h3>
                    
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                      <p className="text-xl text-amber-300 font-medium font-playfair">
                        {exhibition.location}
                      </p>
                      {exhibition.year && (
                        <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-sm rounded-full font-playfair">
                          {exhibition.year}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {exhibition.description && (
                      <p className="text-lg text-gray-300 leading-relaxed mb-6 font-playfair">
                        {exhibition.description}
                      </p>
                    )}

                    {/* Featured badge */}
                    {exhibition.featured && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400/20 to-orange-500/20 border border-amber-400/30 rounded-full">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        <span className="text-amber-300 text-sm font-medium font-playfair">Featured Exhibition</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Image Side */}
              <div className="flex-1">
                <motion.div
                  className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: isEven ? 5 : -5,
                    rotateX: 2
                  }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <Image
                    src={exhibition.image || '/images/artista.jpg'}
                    alt={`${exhibition.title} Exhibition`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Floating location tag */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                      <span className="text-white text-sm font-medium font-playfair">
                        {exhibition.location.split(',')[1]?.trim() || exhibition.location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <div className="bg-black/60 backdrop-blur-sm p-4 rounded-lg border border-white/10">
          <div className="flex flex-col space-y-1 max-h-96 overflow-y-auto">
            {exhibitions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-6 rounded-full transition-all duration-300 ${
                  visibleExhibitions.has(index)
                    ? 'bg-amber-400'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <div className="text-white text-xs mt-3 font-playfair text-center">
            {currentExhibition + 1}/{exhibitions.length}
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
    </section>
  );
};

export default AnimatedExhibitions;
