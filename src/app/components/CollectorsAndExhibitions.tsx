'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Collector {
  id: string;
  name: string;
  title?: string;
  location?: string;
  description?: string;
  featured?: boolean;
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

const collectors: Collector[] = [
  {
    id: 'boca-raton-museum',
    name: 'Boca Ratón Museum of Art',
    location: 'Boca Raton, Florida',
    description: 'Prestigious contemporary art collection featuring RafaelRafael\'s elegant contemporary works',
    featured: true
  },
  {
    id: 'john-mcenroe',
    name: 'John McEnroe Art Collection',
    location: 'New York',
    description: 'Tennis legend\'s private collection showcasing exceptional contemporary pieces',
    featured: true
  },
  {
    id: 'tim-hopkins',
    name: 'Tim Hopkins',
    title: 'Judge of New Jersey',
    location: 'New Jersey',
    description: 'Distinguished judicial collector with an eye for sophisticated contemporary art'
  },
  {
    id: 'rolling-stones',
    name: 'The Rolling Stones',
    location: 'London, UK',
    description: 'Legendary rock band\'s exclusive art collection featuring modern masters',
    featured: true
  },
  {
    id: 'jose-arboleya',
    name: 'Jose Arboleya',
    title: 'Vice Chairman of Barnet Bank',
    location: 'Miami, Florida',
    description: 'Banking executive and art patron supporting contemporary Latin American artists'
  },
  {
    id: 'ford-house',
    name: 'The Ford House',
    location: 'Michigan',
    description: 'Historic estate collection showcasing American and international contemporary art'
  },
  {
    id: 'barbara-streisand',
    name: 'Barbara Streisand',
    location: 'California',
    description: 'Iconic entertainer\'s sophisticated private art collection',
    featured: true
  },
  {
    id: 'gloria-estefan',
    name: 'Gloria Estefan',
    location: 'Miami, Florida',
    description: 'Grammy-winning artist\'s collection celebrating Latin American contemporary art',
    featured: true
  },
  {
    id: 'stephen-king',
    name: 'Stephen King',
    location: 'Maine',
    description: 'Acclaimed author\'s personal collection of contemporary and modern art'
  },
  {
    id: 'jacques-cousteau',
    name: 'Jacques Cousteau',
    location: 'France',
    description: 'Legendary oceanographer\'s collection featuring marine-inspired contemporary works'
  }
];

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
    id: 'elegant-contemporary-miami',
    title: 'Annual Elegant Contemporary Exhibition',
    location: 'Miami Beach, USA',
    year: '2023',
    description: 'Perfect harmony between Rafael\'s style and elegant contemporary aesthetics in the iconic Miami Beach district',
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
    description: 'Showcasing Argentine artistic talent in Spain\'s vibrant capital city'
  },
  {
    id: 'feria-naciones',
    title: 'Feria de las Naciones',
    location: 'Bari, Italy',
    year: '2023',
    description: 'International cultural exchange celebrating diverse artistic expressions from around the world'
  }
];

const CollectorsAndExhibitions: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<'collectors' | 'exhibitions'>('collectors');

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-400/3 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <div className="text-center mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 font-cinzel mb-6">
            Collectors & Exhibitions
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mb-8"></div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-6"
        >
          RafaelRafael&apos;s elegant contemporary works are proudly collected by distinguished patrons and showcased in prestigious exhibitions worldwide.
        </motion.p>
      </div>

      {/* Section Tabs */}
      <div className="flex justify-center mb-16">
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 border border-amber-400/20">
          <button
            onClick={() => setActiveSection('collectors')}
            className={`px-8 py-3 rounded-full transition-all duration-300 ${
              activeSection === 'collectors' 
                ? 'bg-amber-400 text-black font-bold' 
                : 'text-amber-400 hover:bg-amber-400/10'
            }`}
          >
            Distinguished Collectors
          </button>
          <button
            onClick={() => setActiveSection('exhibitions')}
            className={`px-8 py-3 rounded-full transition-all duration-300 ${
              activeSection === 'exhibitions' 
                ? 'bg-amber-400 text-black font-bold' 
                : 'text-amber-400 hover:bg-amber-400/10'
            }`}
          >
            Notable Exhibitions
          </button>
        </div>
      </div>

      {/* Collectors Section */}
      {activeSection === 'collectors' && (
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectors.map((collector, index) => (
              <motion.div
                key={collector.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className={`p-8 rounded-2xl border transition-all duration-300 ${
                  collector.featured 
                    ? 'bg-gradient-to-br from-amber-400/10 to-amber-400/5 border-amber-400/30 shadow-lg shadow-amber-400/10' 
                    : 'bg-black/40 border-white/10 hover:border-amber-400/20'
                } backdrop-blur-sm group-hover:transform group-hover:scale-105`}>
                  {collector.featured && (
                    <div className="absolute -top-3 -right-3 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </div>
                  )}
                  
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 font-cinzel group-hover:text-amber-300 transition-colors">
                    {collector.name}
                  </h3>
                  
                  {collector.title && (
                    <p className="text-amber-400 font-medium mb-2">
                      {collector.title}
                    </p>
                  )}
                  
                  {collector.location && (
                    <p className="text-gray-400 text-sm mb-4">
                      {collector.location}
                    </p>
                  )}
                  
                  {collector.description && (
                    <p className="text-gray-300 leading-relaxed">
                      {collector.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Exhibitions Section */}
      {activeSection === 'exhibitions' && (
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {exhibitions.map((exhibition, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={exhibition.id}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-16`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                    <div className="aspect-[4/3] relative bg-gray-800">
                      {exhibition.image ? (
                        <Image
                          src={exhibition.image}
                          alt={exhibition.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-amber-400/20 rounded-full flex items-center justify-center">
                              <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <p className="text-gray-400 text-sm font-medium">No Image Available</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Featured badge */}
                      {exhibition.featured && (
                        <div className="absolute top-4 left-4 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                          Featured
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {exhibition.year && (
                        <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-sm font-medium">
                          {exhibition.year}
                        </span>
                      )}
                      <span className="text-gray-400 text-sm">{exhibition.location}</span>
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white font-cinzel leading-tight">
                      {exhibition.title}
                    </h3>
                    
                    {exhibition.description && (
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {exhibition.description}
                      </p>
                    )}
                  </div>

                  {/* Decorative element */}
                  <div className={`w-20 h-1 bg-gradient-to-r ${isEven ? 'from-amber-400 to-transparent' : 'from-transparent to-amber-400'}`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"></div>
    </section>
  );
};

export default CollectorsAndExhibitions;