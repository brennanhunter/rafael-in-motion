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
          <p className="text-xl text-gray-300">See how Rafael&apos;s artwork transforms living spaces</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
          {interiorImages.map((image, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative w-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={image.src}
                  alt={image.title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  style={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
