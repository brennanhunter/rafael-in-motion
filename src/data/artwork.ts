import { Artwork, ArtworkCollection, ArtworkFilters } from '@/types/artwork';

// Centralized artwork data
export const artworkData: ArtworkCollection = [
  // Art Deco Collection
  {
    id: 'afternoon-bath',
    title: 'Afternoon Bath',
    filename: 'Afternoon Bath.jpg',
    imagePath: '/images/art-deco/Afternoon Bath.jpg',
    category: 'art-deco',
    story: 'Three women, three directions of flowing hair: one reaching up, one cascading down, and one stretching sideways capturing a moment of elegance in every direction.'
  },
  {
    id: 'anatomy-i',
    title: 'Anatomy I',
    filename: 'AnatomyI.png',
    imagePath: '/images/abstracts/AnatomyI.png',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'anatomy-ii',
    title: 'Anatomy II',
    filename: 'AnatomyII.png',
    imagePath: '/images/abstracts/AnatomyII.png',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'bath-behind-doors',
    title: 'Bath Behind Doors',
    filename: 'Bath Behind Doors.jpg',
    imagePath: '/images/art-deco/Bath Behind Doors.jpg',
    category: 'art-deco',
    story: 'The water element expressing differently in the picture: the river with its cadence and sinuosity in the asian screens, and the stillness of the blue, glassy surface in the quiet of the pool.'
  },
  {
    id: 'black-red-and-gold',
    title: 'Black Red and Gold',
    filename: 'Black Red and Gold.jpg',
    imagePath: '/images/art-deco/Black Red and Gold.jpg',
    category: 'art-deco',
    story: 'Story coming soon'
  },
  {
    id: 'catwoman',
    title: 'Catwoman',
    filename: 'Catwoman.jpg',
    imagePath: '/images/art-deco/Catwoman.jpg',
    category: 'art-deco',
    story: 'Pairs a sensuous woman and her feline in elegant harmony, their forms united by sleek lines and a shimmering gold leaf backdrop.'
  },
  {
    id: 'drapes-of-love',
    title: 'Drapes of Love',
    filename: 'Drapes of Love.jpg',
    imagePath: '/images/art-deco/Drapes of Love.jpg',
    category: 'art-deco',
    story: 'The image captures a reclining woman and her partner: their arms entwined like flowing drapes. The central knot of their embrace forms the heart of the piece.'
  },
  {
    id: 'finding-yourself',
    title: 'Finding Yourself',
    filename: 'Finding Yourself.jpg',
    imagePath: '/images/art-deco/Finding Yourself.jpg',
    category: 'art-deco',
    story: 'Unfolds like a visual matryoshka doll each woman opens a box only to reveal another version of herself. It\'s a layered journey of self-discovery: each box within a box revealing yet another hidden self.'
  },
  {
    id: 'ghosts',
    title: 'Ghosts',
    filename: 'Ghosts.jpg',
    imagePath: '/images/abstracts/Ghosts.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'happiness',
    title: 'Happiness',
    filename: 'Happiness.jpg',
    imagePath: '/images/art-deco/Happiness.jpg',
    category: 'art-deco',
    story: 'A mischievous kitty leads to a delightful surprise as it playfully breaks a porcelain egg and an origami chick emerges from it.'
  },
  {
    id: 'happiness-2',
    title: 'Happiness 2',
    filename: 'Happiness 2.jpg',
    imagePath: '/images/art-deco/Happiness 2.jpg',
    category: 'art-deco',
    story: 'Story coming soon'
  },
  {
    id: 'horses-from-heaven',
    title: 'Horses From Heaven',
    filename: 'HorsesFromHeaven.png',
    imagePath: '/images/art-deco/HorsesFromHeaven.png',
    category: 'art-deco',
    story: 'The power, the motion and the energy of the black horses galloping across the infinite sky.'
  },
  {
    id: 'imminent',
    title: 'Imminent',
    filename: 'Imminent.jpg',
    imagePath: '/images/art-deco/Imminent.jpg',
    category: 'art-deco',
    story: 'One of the raven had discovered a dragonfly drawing the attention of his companions. In just moments the scene is poised to unfold.'
  },
  {
    id: 'irruption',
    title: 'Irruption',
    filename: 'Irruption.jpg',
    imagePath: '/images/abstracts/Irruption.jpg',
    category: 'abstracts',
    story: 'In this theatrical scene a medieval musician, a doctor with a seated woman and a friend, all seem disconnected - except for one simple factor that creates a link to all of them: From the buffon\'s plate emerges a dramatic raven expecting to scare everyone.'
  },
  {
    id: 'irruption-ii',
    title: 'Irruption II',
    filename: 'IrruptionII.png',
    imagePath: '/images/abstracts/IrruptionII.png',
    category: 'abstracts',
    story: 'In this golden triptych, each panel is touched by an unexpected irruption: A couple engulfed by dragonflies, a doctor startling a scene with a raven and finally, a lone figure unsettled by the whimsical presence of fairy-like beings. These moments of disruption transform the ordinary into something enchantingly strange.'
  },
  {
    id: 'japanese-night',
    title: 'Japanese Night',
    filename: 'Japanese Night.jpg',
    imagePath: '/images/art-deco/Japanese Night.jpg',
    category: 'art-deco',
    story: 'A woman stands outside a yellow slit of light, while a man\'s face peers from the luminous interior, breaking the uniformity of the brownish color of the image.'
  },
  {
    id: 'loving-letter',
    title: 'Loving Letter',
    filename: 'Loving Letter.jpg',
    imagePath: '/images/art-deco/Loving Letter.jpg',
    category: 'art-deco',
    story: 'She opens an envelope and out soar origami birds, carrying her message into the air.'
  },
  {
    id: 'origami-bird',
    title: 'Origami Bird',
    filename: 'Origami Bird.jpg',
    imagePath: '/images/art-deco/Origami Bird.jpg',
    category: 'art-deco',
    story: 'A broken porcelain egg reveals a tiny origami chick - just a hint of whimsy in a world of elegance.'
  },
  {
    id: 'soleil',
    title: 'Soleil',
    filename: 'Soleil.jpg',
    imagePath: '/images/art-deco/Soleil.jpg',
    category: 'art-deco',
    story: 'Painted during a summer in Provence, this piece captures not just the visual impact of the Mediterranean sun, but its emotional resonance. "Soleil" represents those moments when sunlight doesn\'t just illuminate the world around us, but transforms our inner landscape, filling us with a warmth that stays long after the sun has set.'
  },
  {
    id: 'tea-house',
    title: 'Tea House',
    filename: 'Tea House.jpg',
    imagePath: '/images/art-deco/Tea House.jpg',
    category: 'art-deco',
    story: 'Following the ritual, a woman is serving tea: you cannot see the teacups, but the raising steam going up, visually suggest a beautiful turquoise curtain.'
  },
  {
    id: 'the-great-wave',
    title: 'The Great Wave',
    filename: 'The Great Wave.jpg',
    imagePath: '/images/art-deco/The Great Wave.jpg',
    category: 'art-deco',
    story: 'The man\'s sweeping cape and the woman\'s red accents mirror a wave and canoes in motion as they dance together.'
  },
  {
    id: 'the-kiss',
    title: 'The Kiss',
    filename: 'The Kiss.jpg',
    imagePath: '/images/art-deco/The Kiss.jpg',
    category: 'art-deco',
    story: 'Love and anatomy intertwined as two figures merge into a single embrace, capturing both affection and the unity of their figures.'
  },
  {
    id: 'the-nap',
    title: 'The Nap',
    filename: 'TheNap.png',
    imagePath: '/images/art-deco/TheNap.png',
    category: 'art-deco',
    story: 'A woman rests in a vivid red dreamscape. In the meantime the pages from her book fly away in the form of origami birds.'
  },
  {
    id: 'the-prey',
    title: 'The Prey',
    filename: 'ThePrey.png',
    imagePath: '/images/art-deco/ThePrey.png',
    category: 'art-deco',
    story: 'Same story as The Prey II - While in her sleep, the tigers in her kimono are chasing the fish in her tatoo. The golden river in her black garment continues its path in the skin of her leg.'
  },
  {
    id: 'the-prey-ii',
    title: 'The Prey II',
    filename: 'ThePreyII.png',
    imagePath: '/images/art-deco/ThePreyII.png',
    category: 'art-deco',
    story: 'While in her sleep, the tigers in her kimono are chasing the fish in her tatoo. The golden river in her black garment continues its path in the skin of her leg.'
  },
  {
    id: 'origami-birds',
    title: '101 Origami Birds',
    filename: '101OrigamiBirds.jpg',
    imagePath: '/images/art-deco/101OrigamiBirds.jpg',
    category: 'art-deco',
    story: 'A cascade of folded birds fills each panel, transforming simple moments into a quiet flight of imagination.'
  },
  {
    id: 'blue-lotus',
    title: 'Blue Lotus',
    filename: 'BlueLotus.jpg',
    imagePath: '/images/art-deco/BlueLotus.jpg',
    category: 'art-deco',
    story: 'The blue lotus represents rebirth and spiritual awakening in many cultures. This painting was created during a period of personal transformation, when I felt myself emerging from a difficult time like a lotus rising from muddy waters. The blue represents the peace that comes after struggle.'
  },
  {
    id: 'cranes-and-dragonflies',
    title: 'Cranes and Dragonflies',
    filename: 'CranesAndDragonflies.jpg',
    imagePath: '/images/art-deco/CranesAndDragonflies.jpg',
    category: 'art-deco',
    story: 'Story coming soon'
  },
  {
    id: 'flying-kites-running-cats',
    title: 'Flying Kites Running Cats',
    filename: 'FlyingKitesRunningCats.jpg',
    imagePath: '/images/art-deco/FlyingKitesRunningCats.jpg',
    category: 'art-deco',
    story: 'In a playful game cats running alongside horses, but when you look up, you discover vibrant fish seemingly alive, flaming through the air held by the women.'
  },
  {
    id: 'reaching-the-beach',
    title: 'Reaching the Beach',
    filename: 'ReachingTheBeach.jpg',
    imagePath: '/images/art-deco/ReachingTheBeach.jpg',
    category: 'art-deco',
    story: 'Story coming soon'
  },
  {
    id: 'the-blue-romans',
    title: 'The Blue Romance',
    filename: 'TheBlueRomans.jpg',
    imagePath: '/images/art-deco/TheBlueRomans.jpg',
    category: 'art-deco',
    story: 'In this piece, an intimate human embrace breaks through painted screens, revealing a parallel world of blue tigers. A silent observer watches the harmony between these two couples, blending human affection and wild grace.'
  },
  {
    id: 'the-chase',
    title: 'The Chase',
    filename: 'TheChase.jpg',
    imagePath: '/images/art-deco/TheChase.jpg',
    category: 'art-deco',
    story: 'In this piece a gang of tigers races after a flock of cranes, only to realize they have being pursued by origami birds themselves. It\'s a playful chase within a chase.'
  },

  // Abstract Collection
  {
    id: 'a-hundred-bells-and-one-flute',
    title: 'A Hundred Bells and One Flute',
    filename: 'A-Hundred-Bells-and-One-Flute.jpg',
    imagePath: '/images/abstracts/A-Hundred-Bells-and-One-Flute.jpg',
    category: 'abstracts',
    story: 'This piece was inspired by a dream I had where I was walking through a forest of musical instruments. The sound was overwhelming at first - a hundred bells ringing at once - but then I heard a single flute cutting through the chaos, bringing order and melody to the cacophony. The painting captures that moment when chaos transforms into harmony.'
  },
  {
    id: 'the-abstract-forest',
    title: 'The Abstract Forest',
    filename: 'The-Abstract-Forest.jpg',
    imagePath: '/images/abstracts/The-Abstract-Forest.jpg',
    category: 'abstracts',
    story: 'During a meditation retreat in the mountains, I became fascinated by how trees looked different each time I observed them - sometimes solid and grounded, other times ethereal and flowing. This painting represents the forest as I experienced it in those moments of deep contemplation, where the boundary between the physical and spiritual worlds dissolved.'
  },
  {
    id: 'three-chapters',
    title: 'Three Chapters',
    filename: 'Three-Chapters.jpg.webp',
    imagePath: '/images/abstracts/Three-Chapters.jpg.webp',
    category: 'abstracts',
    story: 'This piece represents three pivotal moments in my artistic journey: the confusion of beginning, the struggle of growth, and the clarity of understanding. Each "chapter" uses different color palettes and textures to show how my perception of art has evolved over the years.'
  },
  {
    id: 'dancing-in-the-shadows',
    title: 'Dancing in the Shadows',
    filename: 'Dancing-in-the-Shadows.jpg',
    imagePath: '/images/abstracts/Dancing-in-the-Shadows.jpg',
    category: 'abstracts',
    story: 'Inspired by a flamenco performance I witnessed in Seville, this painting captures not the dancers themselves, but the shadows they cast and the energy they left in the air. The interplay of light and dark represents the passion and melancholy inherent in flamenco.'
  },
  {
    id: 'lost-in-the-red-garden',
    title: 'Lost in the Red Garden',
    filename: 'Lost-in-the-Red-Garden.jpg',
    imagePath: '/images/abstracts/Lost-in-the-Red-Garden.jpg',
    category: 'abstracts',
    story: 'This painting emerged from a period of intense emotional upheaval. I found myself painting obsessively with red - the color of passion, anger, and love all at once. The "garden" represents the maze of feelings I was navigating, where being lost was not frightening but necessary for growth.'
  },
  {
    id: 'blue-accents',
    title: 'Blue Accents',
    filename: 'Blue-Accents.jpg',
    imagePath: '/images/abstracts/Blue-Accents.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'the-duel',
    title: 'The Duel',
    filename: 'The-Duel.jpg',
    imagePath: '/images/abstracts/The-Duel.jpg',
    category: 'abstracts',
    story: 'This piece represents the eternal struggle between order and chaos, light and dark, creation and destruction. The "duel" is not violent but philosophical - two forces of nature engaged in an eternal dance that creates the world we know.'
  },
  {
    id: 'crossing-winter',
    title: 'Crossing Winter',
    filename: 'Crossing-Winter.jpg',
    imagePath: '/images/abstracts/Crossing-Winter.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'dimensions',
    title: 'Dimensions',
    filename: 'Dimensions.jpg',
    imagePath: '/images/abstracts/Dimensions.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'dont-just-fly-soar',
    title: "Don't Just Fly, Soar",
    filename: 'Dont-Just-Fly-Soar.jpg',
    imagePath: '/images/abstracts/Dont-Just-Fly-Soar.jpg',
    category: 'abstracts',
    story: 'This painting was created during a time when I felt limited by conventional expectations. The title came to me as I watched eagles over the canyon - they weren\'t just flying from point A to point B, they were dancing with the wind, playing with the currents. It reminds us to approach life not just with purpose, but with joy and abandon.'
  },
  {
    id: 'bandits',
    title: 'Bandits',
    filename: 'Bandits.jpg',
    imagePath: '/images/abstracts/Bandits.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'a-little-man-in-the-center',
    title: 'A Little Man in the Center',
    filename: 'A-Little-Man-in-the-Center.jpg',
    imagePath: '/images/abstracts/A-Little-Man-in-the-Center.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'abstract-and-crochet',
    title: 'Abstract and Crochet',
    filename: 'Abstract-and-Crochet.jpg.webp',
    imagePath: '/images/abstracts/Abstract-and-Crochet.jpg.webp',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'beige-and-blue',
    title: 'Beige and Blue',
    filename: 'Beige-and-Blue.jpg',
    imagePath: '/images/abstracts/Beige-and-Blue.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'birds-in-baroque',
    title: 'Birds in Baroque',
    filename: 'Birds-in-Baroque.jpg.webp',
    imagePath: '/images/abstracts/Birds-in-Baroque.jpg.webp',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'blue-and-white-margins',
    title: 'Blue and White Margins',
    filename: 'Blue-and-White-Margins.jpg',
    imagePath: '/images/abstracts/Blue-and-White-Margins.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'fading-monks-in-red',
    title: 'Fading Monks in Red',
    filename: 'Fading-Monks-in-Red.jpg',
    imagePath: '/images/abstracts/Fading-Monks-in-Red.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'ford-monks',
    title: 'Ford Monks',
    filename: 'Ford-Monks.jpg',
    imagePath: '/images/abstracts/Ford-Monks.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'is-in-the-air',
    title: 'Is in the Air',
    filename: 'Is-in-the-Air.jpg',
    imagePath: '/images/abstracts/Is-in-the-Air.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'jumping-the-bridge',
    title: 'Jumping the Bridge',
    filename: 'Jumping-the-Bridge.jpg',
    imagePath: '/images/abstracts/Jumping-the-Bridge.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'jungle-in-black-and-white',
    title: 'Jungle in Black and White',
    filename: 'Jungle-in-Black-and-White.jpg',
    imagePath: '/images/abstracts/Jungle-in-Black-and-White.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'letters-numbers-and-other-details',
    title: 'Letters, Numbers and Other Details',
    filename: 'Letters-Numbers-and-Other-Details.jpg.webp',
    imagePath: '/images/abstracts/Letters-Numbers-and-Other-Details.jpg.webp',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'pushing',
    title: 'Pushing',
    filename: 'Pushing.jpg',
    imagePath: '/images/abstracts/Pushing.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'reaching-the-top',
    title: 'Reaching the Top',
    filename: 'Reaching-the-Top.jpg.webp',
    imagePath: '/images/abstracts/Reaching-the-Top.jpg.webp',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'red-and-ocre',
    title: 'Red and Ocre',
    filename: 'Red-and-Ocre.jpg.webp',
    imagePath: '/images/abstracts/Red-and-Ocre.jpg.webp',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'sunrise',
    title: 'Sunrise',
    filename: 'Sunrise.jpg.webp',
    imagePath: '/images/abstracts/Sunrise.jpg.webp',
    category: 'abstracts',
    story: 'This painting was born from those magical moments just before dawn when I would wake early to paint outdoors. There\'s something about the way light gradually transforms the world that cannot be captured literally - only through the emotion and energy of abstract form. Each brushstroke represents a moment of that slow, beautiful awakening.'
  },
  {
    id: 'the-music-is-at-the-bottom',
    title: 'The Music is at the Bottom',
    filename: 'The-Music-is-at-the-Bottom.jpg',
    imagePath: '/images/abstracts/The-Music-is-at-the-Bottom.jpg',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'the-puzzle',
    title: 'The Puzzle',
    filename: 'The-Puzzle.jpg.webp',
    imagePath: '/images/abstracts/The-Puzzle.jpg.webp',
    category: 'abstracts',
    story: 'Story coming soon'
  },
  {
    id: 'the-unfinished-picture',
    title: 'The Unfinished Picture',
    filename: 'The-Unfinished-Picture.jpg',
    imagePath: '/images/abstracts/The-Unfinished-Picture.jpg',
    category: 'abstracts',
    story: 'Sometimes the most honest art is the kind that admits it\'s not finished. This piece represents my acceptance that growth and creation are ongoing processes. The "unfinished" quality is not a flaw but the very essence of being alive and constantly evolving.'
  }
  // You can add more collections here (interiors, etc.)
];

// Helper function to get artwork by category
// Helper function to get artwork by category (shuffled to avoid alphabetical order)
export const getArtworkByCategory = (category: Artwork['category']): Artwork[] => {
  const filtered = artworkData.filter(artwork => artwork.category === category);
  
  // Special ordering for art-deco category
  if (category === 'art-deco') {
    const desiredOrder = [
      'flying-kites-running-cats',
      'bath-behind-doors',
      'tea-house',
      'horses-from-heaven',
      'the-prey-ii',
      'origami-birds',
      'irruption',
      'the-nap',
      'imminent',
      'the-prey',
      'happiness',
      'the-blue-romans',
      'origami-bird',
      'black-red-and-gold',
      'catwoman',
      'drapes-of-love',
      'finding-yourself',
      'happiness-2',
      'the-chase',
      'cranes-and-dragonflies',
      'blue-lotus',
      'reaching-the-beach',
      'afternoon-bath',
      'japanese-night',
      'loving-letter',
      'soleil',
      'the-great-wave',
      'the-kiss',
      'irruption-ii'
    ];

    // Create ordered array based on desired order
    const orderedArtwork: Artwork[] = [];
    
    // Add artwork in specified order
    desiredOrder.forEach(id => {
      const artwork = filtered.find(piece => piece.id === id);
      if (artwork) {
        orderedArtwork.push(artwork);
      }
    });
    
    // Add any remaining artwork not in the order list
    filtered.forEach(artwork => {
      if (!desiredOrder.includes(artwork.id)) {
        orderedArtwork.push(artwork);
      }
    });
    
    return orderedArtwork;
  }
  
  // Special ordering for abstracts category
  if (category === 'abstracts') {
    const desiredOrder = [
      'irruption-ii',
      'red-and-ocre',
      'blue-and-white-margins',
      'abstract-and-crochet',
      'bandits',
      'beige-and-blue',
      'a-little-man-in-the-center',
      'birds-in-baroque',
      'blue-accents',
      'dancing-in-the-shadows',
      'dimensions',
      'crossing-winter',
      'dont-just-fly-soar',
      'fading-monks-in-red',
      'ford-monks',
      'is-in-the-air',
      'jumping-the-bridge',
      'jungle-in-black-and-white',
      'letters-numbers-and-other-details',
      'lost-in-the-red-garden',
      'pushing',
      'sunrise',
      'reaching-the-top',
      'the-abstract-forest',
      'irruption',
      'the-duel',
      'the-music-is-at-the-bottom',
      'the-puzzle',
      'the-unfinished-picture',
      'three-chapters',
      'a-hundred-bells-and-one-flute',
      'anatomy-i',
      'anatomy-ii',
      'ghosts'
    ];

    // Create ordered array based on desired order
    const orderedArtwork: Artwork[] = [];
    
    // Add artwork in specified order
    desiredOrder.forEach(id => {
      const artwork = filtered.find(piece => piece.id === id);
      if (artwork) {
        orderedArtwork.push(artwork);
      }
    });
    
    // Add any remaining artwork not in the order list
    filtered.forEach(artwork => {
      if (!desiredOrder.includes(artwork.id)) {
        orderedArtwork.push(artwork);
      }
    });
    
    return orderedArtwork;
  }
  
  // Shuffle other categories to avoid alphabetical ordering
  return filtered.sort(() => Math.random() - 0.5);
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
