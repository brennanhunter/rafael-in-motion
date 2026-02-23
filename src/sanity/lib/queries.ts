import { defineQuery } from 'next-sanity'

// Query all artworks by category
export const ARTWORKS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "artwork" && category == $category] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt,
      hotspot,
      crop
    },
    category,
    story,
    year,
    medium,
    dimensions,
    featured
  }
`)

// Query all artworks
export const ALL_ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt,
      hotspot,
      crop
    },
    category,
    story,
    year,
    medium,
    dimensions,
    featured
  }
`)

// Query single artwork by slug
export const ARTWORK_BY_SLUG_QUERY = defineQuery(`
  *[_type == "artwork" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt,
      hotspot,
      crop
    },
    category,
    story,
    year,
    medium,
    dimensions,
    featured
  }
`)
