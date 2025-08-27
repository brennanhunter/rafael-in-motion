import { useState, useEffect, useMemo, useCallback } from 'react';
import { Artwork, ArtworkFilters } from '@/types/artwork';
import { 
  artworkData, 
  getArtworkByCategory, 
  getFeaturedArtwork, 
  searchArtwork, 
  getArtworkById,
  getRandomArtwork 
} from '@/data/artwork';

export const useArtwork = (filters?: ArtworkFilters) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get filtered artwork based on provided filters
  const artwork = useMemo(() => {
    try {
      setLoading(true);
      setError(null);
      
      if (!filters) {
        return artworkData;
      }
      
      return searchArtwork(filters);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  }, [filters]);

  return {
    artwork,
    loading,
    error,
    total: artwork.length
  };
};

export const useArtworkByCategory = (category: Artwork['category']) => {
  return useMemo(() => getArtworkByCategory(category), [category]);
};

export const useFeaturedArtwork = () => {
  return useMemo(() => getFeaturedArtwork(), []);
};

export const useArtworkById = (id: string) => {
  return useMemo(() => getArtworkById(id), [id]);
};

export const useRandomArtwork = (count: number = 1, excludeIds: string[] = []) => {
  const [randomArtwork, setRandomArtwork] = useState<Artwork[]>([]);
  
  useEffect(() => {
    setRandomArtwork(getRandomArtwork(count, excludeIds));
  }, [count, excludeIds]);
  
  const refreshRandom = () => {
    setRandomArtwork(getRandomArtwork(count, excludeIds));
  };
  
  return {
    artwork: randomArtwork,
    refresh: refreshRandom
  };
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
