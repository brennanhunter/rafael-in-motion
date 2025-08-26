'use client';
import Image from 'next/image';
import { useEffect } from 'react';

const interiorImages = [
  {
    src: "/images/interiors/art-gallery-wall---20.jpg",
    title: "Gallery Wall 20",
    description: "Modern art display in contemporary setting"
  },
  {
    src: "/images/interiors/art-gallery-wall---37.jpg", 
    title: "Gallery Wall 37",
    description: "Curated artwork collection"
  },
  {
    src: "/images/interiors/kitchen-with-wooden-cabinetry.jpg",
    title: "Kitchen with Wooden Cabinetry", 
    description: "Abstract art enhancing kitchen design"
  },
  {
    src: "/images/interiors/large-open-living-room-with-pillars.jpg",
    title: "Large Open Living Room",
    description: "Statement pieces in spacious architecture"
  },
  {
    src: "/images/interiors/NewRoom.jpg",
    title: "New Room",
    description: "Fresh interior concept"
  },
  {
    src: "/images/interiors/Room1.png",
    title: "Room 1", 
    description: "Elegant room design"
  }
];

export default function InteriorsPage() {
  // Clean up gallery classes that might be interfering with scroll
  useEffect(() => {
    document.documentElement.classList.remove('gallery-html');
    document.body.classList.remove('gallery-body');
    document.documentElement.style.removeProperty('--n');
    
    // Reset any scroll position
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-cinzel mb-4">Interiors</h1>
          <p className="text-xl text-gray-300">See how Rafael's artwork transforms living spaces</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {interiorImages.map((image, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-900">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-gray-300 text-sm">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
