'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

const wearablesImages = [
  { src: '/images/wearables/black-and-white-hand-on-door.jpg', alt: 'Black and White Hand on Door' },
  { src: '/images/wearables/blue-on-blue-seat.jpg', alt: 'Blue on Blue Seat' },
  { src: '/images/wearables/blue-regal.jpg', alt: 'Blue Regal' },
  { src: '/images/wearables/horses-jacket-back.jpg', alt: 'Horses Jacket Back' },
  { src: '/images/wearables/horses-jacket.jpg', alt: 'Horses Jacket' },
  { src: '/images/wearables/orange-at-table.jpg', alt: 'Orange at Table' },
  { src: '/images/wearables/orange-from-back.jpg', alt: 'Orange from Back' },
  { src: '/images/wearables/orange-staring-out-window.jpg', alt: 'Orange Staring Out Window' },
  { src: '/images/wearables/sash-and-black-dress.jpg', alt: 'Sash and Black Dress' },
  { src: '/images/wearables/woman-at-round-table.jpg', alt: 'Woman at Round Table' },
  { src: '/images/wearables/woman-on-ladder.jpg', alt: 'Woman on Ladder' },
];

export default function WearablesGallery() {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the images appearing
          wearablesImages.forEach((_, index) => {
            setTimeout(() => {
              setVisibleImages(prev => [...prev, index]);
            }, index * 100);
          });
        }
      },
      {
        threshold: 0.1,
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
      className="relative w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-20"
    >
      <div className="container mx-auto px-8">
        {/* Grid of Images - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wearablesImages.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl transition-all duration-700 ease-out ${
                visibleImages.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
