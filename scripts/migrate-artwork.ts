/**
 * Migration script: Uploads all artwork from src/data/artwork.ts to Sanity
 *
 * Usage:
 *   SANITY_TOKEN="<your-token>" npx tsx scripts/migrate-artwork.ts
 *
 * Create a token at: https://www.sanity.io/manage/project/2ttjh66o/api#tokens
 *   - Give it "Editor" permissions
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';

// ---- inline artwork data import (avoids @/ path alias issues with tsx) ----
import { artworkData } from '../src/data/artwork';

const projectId = '2ttjh66o';
const dataset = 'production';
const apiVersion = '2026-02-06';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('ERROR: SANITY_TOKEN environment variable is required.');
  console.error(
    'Create a token at: https://www.sanity.io/manage/project/2ttjh66o/api#tokens'
  );
  console.error(
    'Then run:\n  SANITY_TOKEN="<your-token>" npx tsx scripts/migrate-artwork.ts'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const publicDir = resolve(process.cwd(), 'public');

async function uploadImage(filePath: string) {
  const fullPath = join(publicDir, filePath);

  if (!existsSync(fullPath)) {
    console.warn(`  WARNING: File not found: ${fullPath}`);
    return null;
  }

  const imageBuffer = readFileSync(fullPath);
  const filename = filePath.split('/').pop()!;

  try {
    const asset = await client.assets.upload('image', imageBuffer, {
      filename,
    });
    return asset;
  } catch (err: any) {
    console.error(`  ERROR uploading ${filename}:`, err.message);
    return null;
  }
}

async function migrate() {
  console.log(`\nMigrating ${artworkData.length} artworks to Sanity...\n`);

  let success = 0;
  let patched = 0;
  let skipped = 0;
  let failed = 0;

  // Track per-category order so array position becomes displayOrder
  const categoryCounters: Record<string, number> = {};

  for (const artwork of artworkData) {
    process.stdout.write(`Migrating: "${artwork.title}"... `);

    // Derive category from image folder path (source of truth) rather than artwork.ts category field
    let cat = artwork.category;
    if (artwork.imagePath) {
      if (artwork.imagePath.includes('/abstracts/')) {
        cat = 'abstracts';
      } else if (artwork.imagePath.includes('/elegant-contemporary/')) {
        cat = 'elegant-contemporary';
      }
    }

    if (cat !== artwork.category) {
      console.log(`  NOTE: category corrected from "${artwork.category}" to "${cat}" (based on image folder)`);
    }

    // Increment order counter per category
    categoryCounters[cat] = (categoryCounters[cat] || 0) + 1;
    const displayOrder = categoryCounters[cat];

    // Check if already exists by slug
    const existing = await client.fetch(
      `*[_type == "artwork" && slug.current == $slug][0]{ _id, category, displayOrder, story }`,
      { slug: artwork.id }
    );

    if (existing) {
      // Patch existing document if category, displayOrder, or story differ
      const patches: Record<string, any> = {};

      if (existing.category !== cat) {
        patches.category = cat;
      }
      if (existing.displayOrder !== displayOrder) {
        patches.displayOrder = displayOrder;
      }
      if (artwork.story && existing.story !== artwork.story) {
        patches.story = artwork.story;
      }

      if (Object.keys(patches).length > 0) {
        try {
          await client.patch(existing._id).set(patches).commit();
          const changed = Object.keys(patches).join(', ');
          console.log(`PATCHED (${changed})`);
          patched++;
        } catch (err: any) {
          console.log(`PATCH FAILED: ${err.message}`);
          failed++;
        }
      } else {
        console.log('UP TO DATE');
        skipped++;
      }
      continue;
    }

    // Upload image
    const asset = artwork.imagePath
      ? await uploadImage(artwork.imagePath)
      : null;
    if (!asset) {
      console.log('FAILED (image not found)');
      failed++;
      continue;
    }

    // Create document
    try {
      const doc = await client.create({
        _type: 'artwork',
        title: artwork.title,
        slug: {
          _type: 'slug',
          current: artwork.id,
        },
        mainImage: {
          _type: 'image',
          alt: artwork.title,
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
        category: cat,
        story: artwork.story || '',
        displayOrder,
        featured: false,
        featuredOrder: undefined,
      });

      console.log(`OK (${doc._id}) — order: ${displayOrder}`);
      success++;
    } catch (err: any) {
      console.log(`FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n--- Migration Complete ---`);
  console.log(`Created: ${success}`);
  console.log(`Patched: ${patched}`);
  console.log(`Up to date: ${skipped}`);
  console.log(`Failed:  ${failed}`);
  console.log(`Total:   ${artworkData.length}`);
  console.log(`\nPer-category counts:`);
  for (const [cat, count] of Object.entries(categoryCounters)) {
    console.log(`  ${cat}: ${count}`);
  }
  console.log(`\nNext steps:`);
  console.log(`  1. Open /studio and review artwork ordering`);
  console.log(`  2. Mark homepage featured pieces: toggle "Show on Homepage" and set "Homepage Order"`);
}

migrate().catch(console.error);
