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
    '/gallery/art-deco': '/art-deco',
    '/gallery/abstract': '/abstract',
    '/gallery/interiors': '/interiors',
    '/artdeco': '/art-deco', // Handle URL variations
    '/art_deco': '/art-deco',
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
  description: 'RafaelRafael artist official website - Rafael Rafael contemporary painter creating Art Deco, abstract art, and interior design paintings. Browse Rafael Rafael art collection by Rafael Acevedo.',
  keywords: [
    'RafaelRafael artist',
    'Rafael Rafael painter',
    'Rafael Rafael art',
    'Rafael Rafael artist website',
    'Rafael Rafael contemporary art',
    'Rafael Acevedo artist',
    'Rafael Rafael paintings',
    'RafaelRafael painter',
    'contemporary artist',
    'Art Deco paintings',
    'abstract art',
    'interior design art',
    'original paintings',
    'visual storytelling',
    'fine art',
    'modern art',
    'artist portfolio',
    'Rafael Rafael gallery',
    'Rafael Rafael artwork'
  ] as string[],
  socialImage: '/images/art-deco/FlyingKitesRunningCats.jpg',
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
