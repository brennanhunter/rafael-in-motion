/**
 * Utility functions for generating canonical URLs and handling SEO-related URL normalization
 */

export function generateCanonicalUrl(pathname: string, baseUrl: string = 'https://rafaelrafael.com'): string {
  // Remove trailing slashes (except for root)
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  
  // Remove query parameters and fragments for canonical URL
  const pathOnly = cleanPath.split('?')[0].split('#')[0];
  
  // Handle special cases and redirects
  const normalizedPath = normalizePathForCanonical(pathOnly);
  
  return `${baseUrl}${normalizedPath}`;
}

function normalizePathForCanonical(path: string): string {
  // Convert common variations to canonical form
  const pathMappings: Record<string, string> = {
    '/home': '/',
    '/index': '/',
    '/gallery/art-deco': '/elegant-contemporary',
    '/gallery/elegant-contemporary': '/elegant-contemporary',
    '/gallery/abstract': '/abstract',
    '/gallery/interiors': '/interiors',
    '/artdeco': '/elegant-contemporary', // Handle URL variations
    '/art_deco': '/elegant-contemporary',
    '/art-deco': '/elegant-contemporary', // Handle legacy URLs
    '/art-gallery': '/interactive-gallery',
  };
  
  return pathMappings[path] || path;
}

export function generateAlternateUrls(pathname: string): Array<{ rel: string; href: string; hreflang?: string }> {
  const baseUrl = 'https://rafaelrafael.com';
  const canonicalPath = normalizePathForCanonical(pathname);
  
  return [
    {
      rel: 'canonical',
      href: generateCanonicalUrl(canonicalPath, baseUrl)
    },
    // Add alternate language versions if needed in the future
    {
      rel: 'alternate',
      href: generateCanonicalUrl(canonicalPath, baseUrl),
      hreflang: 'en'
    },
    // Add mobile-specific canonical if needed
    {
      rel: 'alternate',
      href: generateCanonicalUrl(canonicalPath, baseUrl),
    }
  ];
}

export const SEO_CONFIG = {
  baseUrl: 'https://rafaelrafael.com',
  siteName: 'RafaelRafael - Contemporary Artist',
  defaultTitle: 'RafaelRafael Artist | Rafael Rafael Painter & Contemporary Art by Rafael Acevedo',
  titleTemplate: '%s | RafaelRafael Artist - Rafael Rafael Art',
  description: 'RafaelRafael artist official website - Rafael Rafael contemporary painter creating Elegant Contemporary art, sophisticated modern paintings, and interior design pieces. Formerly known for Art Deco style, now evolved into refined contemporary elegance. Browse Rafael Rafael art collection by Rafael Acevedo.',
  keywords: [
    // Primary brand keywords
    'RafaelRafael artist',
    'Rafael Rafael painter',
    'Rafael Rafael art',
    'Rafael Rafael artist website',
    'Rafael Rafael contemporary art',
    'Rafael Acevedo artist',
    'Rafael Rafael paintings',
    'RafaelRafael painter',
    
    // Primary style keywords - Elegant Contemporary
    'Elegant Contemporary paintings',
    'elegant contemporary art',
    'contemporary elegance',
    'sophisticated contemporary art',
    'refined modern paintings',
    'luxury contemporary art',
    'elegant modern art',
    
    // Secondary style keywords - Art Deco (for legacy SEO)
    'Art Deco paintings',
    'art deco style',
    'art deco contemporary',
    'modern art deco',
    'contemporary art deco',
    
    // General art keywords
    'contemporary artist',
    'abstract art',
    'interior design art',
    'original paintings',
    'visual storytelling',
    'fine art',
    'modern art',
    'luxury art',
    'sophisticated paintings',
    'geometric art',
    'decorative art',
    
    // Portfolio and gallery keywords
    'artist portfolio',
    'Rafael Rafael gallery',
    'Rafael Rafael artwork',
    'Miami artist',
    'contemporary art collection'
  ] as string[],
  socialImage: '/images/elegant-contemporary/FlyingKitesRunningCats.jpg',
  twitterHandle: '@rafaelartinmotion',
};

/**
 * Generate metadata with canonical URL for a specific page
 */
export function generatePageMetadata(pathname: string, pageTitle?: string, pageDescription?: string) {
  const canonical = generateCanonicalUrl(pathname);
  
  return {
    title: pageTitle || SEO_CONFIG.defaultTitle,
    description: pageDescription || SEO_CONFIG.description,
    alternates: {
      canonical,
      languages: {
        'en': canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      url: canonical,
      title: pageTitle || SEO_CONFIG.defaultTitle,
      description: pageDescription || SEO_CONFIG.description,
      siteName: SEO_CONFIG.siteName,
      images: [SEO_CONFIG.socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle || SEO_CONFIG.defaultTitle,
      description: pageDescription || SEO_CONFIG.description,
      images: [SEO_CONFIG.socialImage],
      creator: SEO_CONFIG.twitterHandle,
    },
  };
}
