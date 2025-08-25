'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div 
          className={`text-center mb-16 transform transition-all duration-1000 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 relative">
            About the
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-pulse">
              Artist
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-60"></div>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            Unveiling the Palette of Rafael: Sensuality, Diversity, and the Artistic Tapestry of Cultures
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <div 
            ref={textRef}
            className={`space-y-8 transform transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/30 shadow-2xl">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Meet Rafael, an internationally acclaimed artist born in Buenos Aires, Argentina, whose artistic journey began with a passion for fine art. Trained in Buenos Aires and Oxford, England, Rafael's distinctive style captures figurative shapes, characters, and diverse cultural elements.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                His paintings, rendered through a unique mixed media technique of acrylics on canvas or treated paper, exude sensuality, exoticism, and a touch of mysticism.
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 backdrop-blur-sm p-8 rounded-2xl border border-amber-700/30 shadow-2xl">
              <p className="text-lg text-gray-300 leading-relaxed">
                Each stroke on the canvas tells a tale of playfulness, nostalgia, drama, or mystique, creating an intriguing visual challenge that transcends cultural boundaries. Explore Rafael's world where abstract and graphic elements converge, offering a captivating blend of ancient aesthetics and contemporary expression.
              </p>
            </div>
          </div>

          {/* Artist Portrait */}
          <div 
            className={`relative transform transition-all duration-1000 ease-out delay-500 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/images/artista.jpg"
                alt="Rafael - Artist at work"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating elements around the image */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-40 animate-pulse"></div>
            </div>
          </div>
        </div>

        

        {/* Bottom decorative element */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
      </div>
    </section>
  );
};

export default About;