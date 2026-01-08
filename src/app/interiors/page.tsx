'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const interiorImages = [
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/1Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/1Close.png",
    alt: "Interior Design 1" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/2Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/2Close.png",
    alt: "Interior Design 2" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/3Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/3Close.png",
    alt: "Interior Design 3" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/4Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/4Close.png",
    alt: "Interior Design 4" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/5Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/5Close.png",
    alt: "Interior Design 5" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/6Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/6Close.png",
    alt: "Interior Design 6" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/7Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/7Close.png",
    alt: "Interior Design 7" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/8Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/8Close.png",
    alt: "Interior Design 8" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/9Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/9Close.png",
    alt: "Interior Design 9" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/10Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/10Close.png",
    alt: "Interior Design 10" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/11Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/11Close.png",
    alt: "Interior Design 11" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/12Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/12Close.png",
    alt: "Interior Design 12" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/13Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/13Close.png",
    alt: "Interior Design 13" 
  },
  { 
    wide: "/images/interiors/Cropped%20for%20Printed%20Binder/14Wide.png", 
    close: "/images/interiors/Cropped%20for%20Printed%20Binder/14Close.png",
    alt: "Interior Design 14" 
  }
];

export default function InteriorsPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImage((selectedImage - 1 + interiorImages.length) % interiorImages.length);
      } else if (e.key === 'ArrowRight') {
        setSelectedImage((selectedImage + 1) % interiorImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  const handlePrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + interiorImages.length) % interiorImages.length);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % interiorImages.length);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 font-cinzel mb-4 leading-tight">
            Interiors
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light">
            Rafael&apos;s artwork transforming living spaces
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {interiorImages.map((image, index) => (
            <motion.div 
              key={index} 
              className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-black/50 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image.wide}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-50 p-2 text-white hover:text-amber-200 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 z-50 p-2 text-white hover:text-amber-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
            >
              <ChevronLeftIcon className="w-8 h-8" />
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 z-50 p-2 text-white hover:text-amber-200 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRightIcon className="w-8 h-8" />
            </button>

            {/* Image */}
            <div
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="relative max-w-[90vw] max-h-[90vh]"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <Image
                  src={interiorImages[selectedImage].close}
                  alt={interiorImages[selectedImage].alt}
                  width={1920}
                  height={1440}
                  className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/80 text-sm">
              {selectedImage + 1} / {interiorImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
