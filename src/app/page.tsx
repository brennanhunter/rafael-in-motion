// src/app/page.tsx
"use client";

import { useEffect } from "react";
import About from "./components/About";
import AnimatedExhibitions from "./components/AnimatedExhibitions";
import ArtDeco from "./components/ArtDeco";
import Hero from "./components/Hero";

export default function Home() {
  useEffect(() => {
    // Ensure clean scroll state on home page
    (window as typeof window & { __activeGallery?: boolean }).__activeGallery = false;
    document.body.style.removeProperty('--k');
    document.documentElement.style.removeProperty('--k');
    document.documentElement.style.removeProperty('--n');
    document.documentElement.classList.remove('gallery-html');
    document.body.classList.remove('gallery-body');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <About />
      <AnimatedExhibitions />
      <ArtDeco />
    </main>
  );
}