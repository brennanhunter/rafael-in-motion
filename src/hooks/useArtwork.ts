'use client';
import { useState, useEffect, useCallback } from 'react';
import { Artwork, ArtworkFilters } from '@/types/artwork';
import { client } from '@/sanity/lib/client';
import { ARTWORKS_BY_CATEGORY_QUERY, ALL_ARTWORKS_QUERY } from '@/sanity/lib/queries';

export const useArtwork = (filters?: ArtworkFilters) => {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        setLoading(true);
        setError(null);
        
        let query: string = ALL_ARTWORKS_QUERY;
        let params = {};
        
        if (filters?.category) {
          query = ARTWORKS_BY_CATEGORY_QUERY;
          params = { category: filters.category };
        }
        
        const data = await client.fetch(query, params);
        setArtwork(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setArtwork([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArtworks();
  }, [filters]);

  return {
    artwork,
    loading,
    error,
    total: artwork.length
  };
};

export const useArtworkByCategory = (category: Artwork['category']) => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtworks() {
      try {
        setLoading(true);
        const data = await client.fetch(ARTWORKS_BY_CATEGORY_QUERY, { category });
        setArtworks(data || []);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArtworks();
  }, [category]);

  return artworks;
};

export const useFeaturedArtwork = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedArtworks() {
      try {
        setLoading(true);
        const data = await client.fetch(`*[_type == "artwork" && featured == true] | order(_createdAt desc) {
          _id, title, "slug": slug.current, mainImage { asset->{ _id, url, metadata { lqip, dimensions { width, height } } }, alt, hotspot, crop },
          category, story, year, medium, dimensions, featured
        }`);
        setArtworks(data || []);
      } catch (error) {
        console.error('Error fetching featured artworks:', error);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFeaturedArtworks();
  }, []);

  return artworks;
};

export const useArtworkById = (id: string) => {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtwork() {
      try {
        setLoading(true);
        const data = await client.fetch(`*[_type == "artwork" && _id == $id][0] {
          _id, title, "slug": slug.current, mainImage { asset->{ _id, url, metadata { lqip, dimensions { width, height } } }, alt, hotspot, crop },
          category, story, year, medium, dimensions, featured
        }`, { id });
        setArtwork(data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchArtwork();
  }, [id]);

  return { artwork, loading };
};

// Hook for artwork slider/gallery with navigation
export const useArtworkSlider = (artworkList: Artwork[], autoAdvance: boolean = false, interval: number = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentArtwork = artworkList[currentIndex];
  const nextArtwork = artworkList[(currentIndex + 1) % artworkList.length];

  const goToNext = useCallback(() => {
    if (!isTransitioning) {
      setCurrentIndex((prev) => (prev + 1) % artworkList.length);
    }
  }, [isTransitioning, artworkList.length]);

  const goToPrevious = useCallback(() => {
    if (!isTransitioning) {
      setCurrentIndex((prev) => (prev - 1 + artworkList.length) % artworkList.length);
    }
  }, [isTransitioning, artworkList.length]);

  const goToIndex = useCallback((index: number) => {
    if (!isTransitioning && index >= 0 && index < artworkList.length) {
      setCurrentIndex(index);
    }
  }, [isTransitioning, artworkList.length]);

  // Auto-advance functionality
  useEffect(() => {
    if (!autoAdvance || isTransitioning) return;

    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoAdvance, interval, isTransitioning, goToNext]);

  return {
    currentArtwork,
    nextArtwork,
    currentIndex,
    isTransitioning,
    setIsTransitioning,
    goToNext,
    goToPrevious,
    goToIndex,
    total: artworkList.length
  };
};

// Hook for artwork search with debouncing
export const useArtworkSearch = (initialFilters?: ArtworkFilters, debounceMs: number = 300) => {
  const [filters, setFilters] = useState<ArtworkFilters>(initialFilters || {});
  const [debouncedFilters, setDebouncedFilters] = useState<ArtworkFilters>(filters);

  // Debounce the filters
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [filters, debounceMs]);

  const { artwork, loading, error, total } = useArtwork(debouncedFilters);

  const updateFilters = (newFilters: Partial<ArtworkFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    artwork,
    loading,
    error,
    total,
    filters,
    updateFilters,
    clearFilters
  };
};
