export interface Artwork {
  id: string;
  title: string;
  filename: string;
  imagePath: string;
  caption?: string;
  category: 'art-deco' | 'abstracts' | 'portraits' | 'other';
  year?: number;
  medium?: string;
  dimensions?: string;
  description?: string;
  story?: string;
  featured?: boolean;
  tags?: string[];
}

export type ArtworkCollection = Artwork[];

export interface ArtworkFilters {
  category?: Artwork['category'];
  featured?: boolean;
  tags?: string[];
  searchTerm?: string;
}
