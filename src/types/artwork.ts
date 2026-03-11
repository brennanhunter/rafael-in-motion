export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  hotspot?: Record<string, unknown>;
  crop?: Record<string, unknown>;
}

export interface Artwork {
  _id?: string;
  id?: string;
  title: string;
  slug?: string;
  mainImage?: SanityImage;
  filename?: string;
  imagePath?: string;
  caption?: string;
  category: 'elegant-contemporary' | 'abstracts' | 'portraits' | 'other';
  year?: number;
  medium?: string;
  dimensions?: string;
  description?: string;
  story?: string;
  featured?: boolean;
  displayOrder?: number;
  featuredOrder?: number;
  tags?: string[];
}

export type ArtworkCollection = Artwork[];

export interface ArtworkFilters {
  category?: Artwork['category'];
  featured?: boolean;
  tags?: string[];
  searchTerm?: string;
}
