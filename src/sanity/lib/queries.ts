import { defineQuery } from 'next-sanity'

// Query all artworks by category, ordered by displayOrder
export const ARTWORKS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "artwork" && category == $category] | order(displayOrder asc) {
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
    featured,
    displayOrder,
    featuredOrder
  }
`)

// Query featured artworks for homepage, ordered by featuredOrder
export const FEATURED_ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork" && featured == true] | order(featuredOrder asc) {
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
    featured,
    displayOrder,
    featuredOrder
  }
`)

// Query all artworks
export const ALL_ARTWORKS_QUERY = defineQuery(`
  *[_type == "artwork"] | order(displayOrder asc) {
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
    featured,
    displayOrder,
    featuredOrder
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
    featured,
    displayOrder,
    featuredOrder
  }
`)
