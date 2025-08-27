import React from 'react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-cinzel font-bold text-white tracking-wider mb-8">
            CONTACT
          </h1>
          <div className="w-24 h-0.5 bg-white mx-auto"></div>
        </div>

        {/* Artist Photo */}
        <div className="mb-12">
          <div className="relative w-48 h-48 mx-auto mb-8">
            <Image
              src="/images/artista.jpg"
              alt="Rafael - Artist"
              fill
              className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-cinzel font-light tracking-wider mb-4">
            Rafael
          </h2>
          <p className="text-lg text-gray-300 font-light">
            Contemporary Artist & Creator
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <p className="text-xl md:text-2xl font-light mb-8 text-gray-300">
            For inquiries, commissions, or to view available works
          </p>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 mb-8">
            <a 
              href="mailto:26ticiano26@gmail.com"
              className="text-2xl md:text-3xl font-cinzel font-light text-white hover:text-gray-300 transition-colors duration-300 underline decoration-1 underline-offset-8"
            >
              26ticiano26@gmail.com
            </a>
          </div>

          <p className="text-gray-400 text-lg">
            I welcome discussions about my art, potential collaborations, and custom commissions.
          </p>
        </div>

        {/* Gallery Location Note */}
        <div className="mb-16">
          <p className="text-gray-500 text-sm">
            Artwork available for viewing by appointment
          </p>
        </div>

        {/* Xtremery Credit */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs">
            <a
              href="https://xtremery.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-pulse hover:animate-shimmer"
            >
              canvas rendered and pixel-polished by Xtremery · Deland, FL
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
