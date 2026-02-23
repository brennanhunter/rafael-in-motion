/**
 * Migration script: Uploads all artwork from src/data/artwork.ts to Sanity
 *
 * Usage (Windows PowerShell):
 *   $env:SANITY_TOKEN="<your-token>"; npx tsx scripts/migrate-artwork.ts
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
    'Then run:\n  $env:SANITY_TOKEN="<your-token>"; npx tsx scripts/migrate-artwork.ts'
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
  let skipped = 0;
  let failed = 0;

  for (const artwork of artworkData) {
    process.stdout.write(`Migrating: "${artwork.title}"... `);

    // Check if already exists by slug
    const existing = await client.fetch(
      `*[_type == "artwork" && slug.current == $slug][0]._id`,
      { slug: artwork.id }
    );

    if (existing) {
      console.log('SKIPPED (already exists)');
      skipped++;
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
        category: artwork.category,
        story: artwork.story || '',
        featured: false,
      });

      console.log(`OK (${doc._id})`);
      success++;
    } catch (err: any) {
      console.log(`FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n--- Migration Complete ---`);
  console.log(`Success: ${success}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed:  ${failed}`);
  console.log(`Total:   ${artworkData.length}`);
}

migrate().catch(console.error);
