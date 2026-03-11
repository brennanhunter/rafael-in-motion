/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

const studioStyles = `
  /* ── Publish button: larger and glowing when active ── */
  [data-testid="action-publish"] {
    font-size: 1.1rem !important;
    padding: 0.75rem 2rem !important;
    min-height: 48px !important;
    font-weight: 600 !important;
    transition: box-shadow 0.3s ease, transform 0.15s ease !important;
  }
  [data-testid="action-publish"]:not([data-disabled="true"]):not(:disabled) {
    box-shadow:
      0 0 10px rgba(67, 220, 128, 0.5),
      0 0 25px rgba(67, 220, 128, 0.3),
      0 0 50px rgba(67, 220, 128, 0.15) !important;
    animation: publishGlow 2s ease-in-out infinite alternate !important;
  }
  [data-testid="action-publish"]:not([data-disabled="true"]):not(:disabled):hover {
    box-shadow:
      0 0 15px rgba(67, 220, 128, 0.7),
      0 0 35px rgba(67, 220, 128, 0.5),
      0 0 60px rgba(67, 220, 128, 0.25) !important;
    transform: scale(1.02) !important;
  }
  @keyframes publishGlow {
    from {
      box-shadow:
        0 0 10px rgba(67, 220, 128, 0.4),
        0 0 25px rgba(67, 220, 128, 0.2),
        0 0 50px rgba(67, 220, 128, 0.1);
    }
    to {
      box-shadow:
        0 0 15px rgba(67, 220, 128, 0.6),
        0 0 30px rgba(67, 220, 128, 0.35),
        0 0 55px rgba(67, 220, 128, 0.18);
    }
  }

  /* ── "+" button → "Add Artwork" ── */
  [data-testid="action-intent-button"] {
    font-size: 0 !important;
    min-width: 140px !important;
    padding: 0.5rem 1rem !important;
    min-height: 40px !important;
    border: 2px solid #fff !important;
    border-radius: 6px !important;
  }
  [data-testid="action-intent-button"] svg { display: none !important; }
  [data-testid="action-intent-button"]::after {
    content: "＋ Add Artwork";
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  [data-testid="multi-action-intent-button"] {
    font-size: 0 !important;
    min-width: 140px !important;
    padding: 0.5rem 1rem !important;
    min-height: 40px !important;
    border: 2px solid #fff !important;
    border-radius: 6px !important;
  }
  [data-testid="multi-action-intent-button"] svg { display: none !important; }
  [data-testid="multi-action-intent-button"]::after {
    content: "＋ Add Artwork";
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
`

export default function StudioPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: studioStyles }} />
      <NextStudio config={config} scheme="dark" />
    </>
  )
}
