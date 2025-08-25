// Example component showing how to use the artwork system

import React from 'react';
import Image from 'next/image';
import { useFeaturedArtwork, useArtworkSearch, useRandomArtwork } from '@/hooks/useArtwork';

// Example 1: Display featured artwork
export const FeaturedArtwork: React.FC = () => {
  const featuredPieces = useFeaturedArtwork();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredPieces.map((artwork) => (
        <div key={artwork.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={artwork.imagePath}
              alt={artwork.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{artwork.title}</h3>
            {artwork.caption && (
              <p className="text-gray-600 text-sm mb-2">{artwork.caption}</p>
            )}
            {artwork.medium && (
              <p className="text-gray-500 text-xs">{artwork.medium}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Example 2: Searchable artwork gallery
export const ArtworkGallery: React.FC = () => {
  const {
    artwork,
    loading,
    total,
    filters,
    updateFilters,
    clearFilters
  } = useArtworkSearch();

  return (
    <div className="space-y-6">
      {/* Search Controls */}
      <div className="bg-gray-100 p-4 rounded-lg space-y-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search artwork..."
            value={filters.searchTerm || ''}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="px-3 py-2 border rounded-md"
          />
          
          <select
            value={filters.category || ''}
            onChange={(e) => updateFilters({ 
              category: e.target.value as any || undefined 
            })}
            className="px-3 py-2 border rounded-md"
          >
            <option value="">All Categories</option>
            <option value="art-deco">Art Deco</option>
            <option value="abstracts">Abstracts</option>
            <option value="portraits">Portraits</option>
          </select>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.featured || false}
              onChange={(e) => updateFilters({ 
                featured: e.target.checked || undefined 
              })}
            />
            <span>Featured only</span>
          </label>
          
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Clear Filters
          </button>
        </div>
        
        <p className="text-sm text-gray-600">
          {loading ? 'Loading...' : `${total} artwork(s) found`}
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {artwork.map((piece) => (
          <div key={piece.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={piece.imagePath}
                alt={piece.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <h4 className="font-medium text-sm">{piece.title}</h4>
              {piece.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {piece.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-200 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example 3: Random artwork showcase
export const RandomShowcase: React.FC = () => {
  const { artwork: randomPieces, refresh } = useRandomArtwork(3);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Random Artworks</h3>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {randomPieces.map((artwork) => (
          <div key={artwork.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative aspect-video">
              <Image
                src={artwork.imagePath}
                alt={artwork.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="font-medium">{artwork.title}</h4>
              {artwork.caption && (
                <p className="text-gray-600 text-sm mt-1">{artwork.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
