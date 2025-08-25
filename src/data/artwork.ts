import { Artwork, ArtworkCollection, ArtworkFilters } from '@/types/artwork';

// Centralized artwork data
export const artworkData: ArtworkCollection = [
  // Art Deco Collection
  {
    id: 'afternoon-bath',
    title: 'Afternoon Bath',
    filename: 'Afternoon Bath.jpg',
    imagePath: '/images/art-deco/Afternoon Bath.jpg',
    caption: 'A sensual exploration of intimacy and solitude in warm afternoon light',
    category: 'art-deco',
    featured: true,
    tags: ['intimate', 'warm-tones', 'figurative'],
    medium: 'Acrylic on Canvas',
    description: 'This piece captures the quiet vulnerability of a private moment, rendered in Rafael\'s signature style with rich, warm tones and flowing lines.'
  },
  {
    id: 'anatomy-i',
    title: 'Anatomy I',
    filename: 'AnatomyI.png',
    imagePath: '/images/art-deco/AnatomyI.png',
    caption: 'A study in form and expression through anatomical abstraction',
    category: 'art-deco',
    tags: ['anatomical', 'abstract', 'study'],
    medium: 'Mixed Media'
  },
  {
    id: 'anatomy-ii',
    title: 'Anatomy II',
    filename: 'AnatomyII.png',
    imagePath: '/images/art-deco/AnatomyII.png',
    caption: 'Continuation of the anatomical series exploring human form',
    category: 'art-deco',
    tags: ['anatomical', 'abstract', 'study'],
    medium: 'Mixed Media'
  },
  {
    id: 'bath-behind-doors',
    title: 'Bath Behind Doors',
    filename: 'Bath Behind Doors.jpg',
    imagePath: '/images/art-deco/Bath Behind Doors.jpg',
    caption: 'Privacy and vulnerability explored through architectural framing',
    category: 'art-deco',
    featured: true,
    tags: ['intimate', 'architectural', 'privacy'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'black-red-and-gold',
    title: 'Black Red and Gold',
    filename: 'Black Red and Gold.jpg',
    imagePath: '/images/art-deco/Black Red and Gold.jpg',
    caption: 'Bold color palette expressing passion and elegance',
    category: 'art-deco',
    tags: ['bold-colors', 'passion', 'elegant'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'catwoman',
    title: 'Catwoman',
    filename: 'Catwoman.jpg',
    imagePath: '/images/art-deco/Catwoman.jpg',
    caption: 'Feline grace and feminine mystery in art deco style',
    category: 'art-deco',
    featured: true,
    tags: ['feline', 'mystery', 'feminine'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'drapes-of-love',
    title: 'Drapes of Love',
    filename: 'Drapes of Love.jpg',
    imagePath: '/images/art-deco/Drapes of Love.jpg',
    caption: 'Romantic intimacy veiled in flowing fabric and soft light',
    category: 'art-deco',
    tags: ['romantic', 'intimate', 'fabric'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'finding-yourself',
    title: 'Finding Yourself',
    filename: 'Finding Yourself.jpg',
    imagePath: '/images/art-deco/Finding Yourself.jpg',
    caption: 'A journey of self-discovery through introspective imagery',
    category: 'art-deco',
    tags: ['introspective', 'self-discovery', 'journey'],
    medium: 'Mixed Media'
  },
  {
    id: 'ghosts',
    title: 'Ghosts',
    filename: 'Ghosts.jpg',
    imagePath: '/images/art-deco/Ghosts.jpg',
    caption: 'Ethereal figures dancing between memory and reality',
    category: 'art-deco',
    tags: ['ethereal', 'memory', 'spiritual'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'happiness',
    title: 'Happiness',
    filename: 'Happiness.jpg',
    imagePath: '/images/art-deco/Happiness.jpg',
    caption: 'Pure joy expressed through vibrant colors and flowing forms',
    category: 'art-deco',
    featured: true,
    tags: ['joy', 'vibrant', 'positive'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'happiness-2',
    title: 'Happiness 2',
    filename: 'Happiness 2.jpg',
    imagePath: '/images/art-deco/Happiness 2.jpg',
    caption: 'A second exploration of joy and celebration',
    category: 'art-deco',
    tags: ['joy', 'celebration', 'positive'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'horses-from-heaven',
    title: 'Horses From Heaven',
    filename: 'HorsesFromHeaven.png',
    imagePath: '/images/art-deco/HorsesFromHeaven.png',
    caption: 'Celestial equines descending with divine grace',
    category: 'art-deco',
    featured: true,
    tags: ['celestial', 'equine', 'divine'],
    medium: 'Mixed Media'
  },
  {
    id: 'imminent',
    title: 'Imminent',
    filename: 'Imminent.jpg',
    imagePath: '/images/art-deco/Imminent.jpg',
    caption: 'Anticipation and tension captured in dramatic composition',
    category: 'art-deco',
    tags: ['tension', 'dramatic', 'anticipation'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'irruption',
    title: 'Irruption',
    filename: 'Irruption.jpg',
    imagePath: '/images/art-deco/Irruption.jpg',
    caption: 'Sudden emergence of passion breaking through barriers',
    category: 'art-deco',
    tags: ['passion', 'breakthrough', 'dynamic'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'irruption-ii',
    title: 'Irruption II',
    filename: 'IrruptionII.png',
    imagePath: '/images/art-deco/IrruptionII.png',
    caption: 'Second movement in the passionate breakthrough series',
    category: 'art-deco',
    tags: ['passion', 'breakthrough', 'dynamic'],
    medium: 'Mixed Media'
  },
  {
    id: 'japanese-night',
    title: 'Japanese Night',
    filename: 'Japanese Night.jpg',
    imagePath: '/images/art-deco/Japanese Night.jpg',
    caption: 'Oriental mystique under the cover of darkness',
    category: 'art-deco',
    tags: ['oriental', 'mystique', 'night'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'loving-letter',
    title: 'Loving Letter',
    filename: 'Loving Letter.jpg',
    imagePath: '/images/art-deco/Loving Letter.jpg',
    caption: 'Intimate communication through written word and visual poetry',
    category: 'art-deco',
    tags: ['intimate', 'communication', 'poetry'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'origami-bird',
    title: 'Origami Bird',
    filename: 'Origami Bird.jpg',
    imagePath: '/images/art-deco/Origami Bird.jpg',
    caption: 'Delicate paper art symbolizing freedom and transformation',
    category: 'art-deco',
    tags: ['delicate', 'freedom', 'transformation'],
    medium: 'Mixed Media'
  },
  {
    id: 'soleil',
    title: 'Soleil',
    filename: 'Soleil.jpg',
    imagePath: '/images/art-deco/Soleil.jpg',
    caption: 'Solar energy and warmth radiating through golden hues',
    category: 'art-deco',
    featured: true,
    tags: ['solar', 'warmth', 'golden'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'tea-house',
    title: 'Tea House',
    filename: 'Tea House.jpg',
    imagePath: '/images/art-deco/Tea House.jpg',
    caption: 'Peaceful contemplation in a traditional setting',
    category: 'art-deco',
    tags: ['peaceful', 'traditional', 'contemplation'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'the-great-wave',
    title: 'The Great Wave',
    filename: 'The Great Wave.jpg',
    imagePath: '/images/art-deco/The Great Wave.jpg',
    caption: 'Rafael\'s interpretation of the classic Japanese masterpiece',
    category: 'art-deco',
    featured: true,
    tags: ['wave', 'japanese', 'classic'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'the-kiss',
    title: 'The Kiss',
    filename: 'The Kiss.jpg',
    imagePath: '/images/art-deco/The Kiss.jpg',
    caption: 'Passionate embrace captured in flowing art deco lines',
    category: 'art-deco',
    featured: true,
    tags: ['passionate', 'embrace', 'romantic'],
    medium: 'Acrylic on Canvas'
  },
  {
    id: 'the-nap',
    title: 'The Nap',
    filename: 'TheNap.png',
    imagePath: '/images/art-deco/TheNap.png',
    caption: 'Peaceful rest and dreaming in soft, muted tones',
    category: 'art-deco',
    tags: ['peaceful', 'rest', 'dreaming'],
    medium: 'Mixed Media'
  },
  {
    id: 'the-prey',
    title: 'The Prey',
    filename: 'ThePrey.png',
    imagePath: '/images/art-deco/ThePrey.png',
    caption: 'Tension between hunter and hunted in nature',
    category: 'art-deco',
    tags: ['tension', 'nature', 'predator'],
    medium: 'Mixed Media'
  },
  {
    id: 'the-prey-ii',
    title: 'The Prey II',
    filename: 'ThePreyII.png',
    imagePath: '/images/art-deco/ThePreyII.png',
    caption: 'Continuation of the predator-prey dynamic exploration',
    category: 'art-deco',
    tags: ['tension', 'nature', 'predator'],
    medium: 'Mixed Media'
  }
  // You can add more collections here (abstracts, portraits, etc.)
];

// Helper function to get artwork by category
export const getArtworkByCategory = (category: Artwork['category']): Artwork[] => {
  return artworkData.filter(artwork => artwork.category === category);
};

// Helper function to get featured artwork
export const getFeaturedArtwork = (): Artwork[] => {
  return artworkData.filter(artwork => artwork.featured === true);
};

// Helper function to search artwork
export const searchArtwork = (filters: ArtworkFilters): Artwork[] => {
  return artworkData.filter(artwork => {
    // Category filter
    if (filters.category && artwork.category !== filters.category) {
      return false;
    }
    
    // Featured filter
    if (filters.featured !== undefined && artwork.featured !== filters.featured) {
      return false;
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        artwork.tags?.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }
    
    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const titleMatch = artwork.title.toLowerCase().includes(searchLower);
      const captionMatch = artwork.caption?.toLowerCase().includes(searchLower);
      const descriptionMatch = artwork.description?.toLowerCase().includes(searchLower);
      const tagMatch = artwork.tags?.some(tag => 
        tag.toLowerCase().includes(searchLower)
      );
      
      if (!titleMatch && !captionMatch && !descriptionMatch && !tagMatch) {
        return false;
      }
    }
    
    return true;
  });
};

// Helper function to get artwork by ID
export const getArtworkById = (id: string): Artwork | undefined => {
  return artworkData.find(artwork => artwork.id === id);
};

// Helper function to get random artwork
export const getRandomArtwork = (count: number = 1, excludeIds: string[] = []): Artwork[] => {
  const availableArtwork = artworkData.filter(artwork => 
    !excludeIds.includes(artwork.id)
  );
  
  const shuffled = [...availableArtwork].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
