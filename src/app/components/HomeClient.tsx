"use client";

import { useEffect } from "react";

export default function HomeClient() {
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

  return null;
}
