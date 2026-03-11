/**
 * Fix displayOrder to match the live site's curated ordering.
 *
 * Usage:
 *   SANITY_TOKEN="<your-token>" npx tsx scripts/fix-order.ts
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '2ttjh66o',
  dataset: 'production',
  apiVersion: '2026-02-06',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

// These are the exact curated orders from the live site's getArtworkByCategory()
const elegantContemporaryOrder = [
  'the-prey',
  'flying-kites-running-cats',
  'bath-behind-doors',
  'tea-house',
  'horses-from-heaven',
  'origami-birds',
  'the-nap',
  'imminent',
  'happiness',
  'the-blue-romans',
  'origami-bird',
  'black-red-and-gold',
  'catwoman',
  'drapes-of-love',
  'finding-yourself',
  'happiness-2',
  'the-chase',
  'cranes-and-dragonflies',
  'blue-lotus',
  'reaching-the-beach',
  'afternoon-bath',
  'japanese-night',
  'loving-letter',
  'soleil',
  'the-great-wave',
  'the-kiss',
];

const abstractsOrder = [
  'irruption-ii',
  'abstract-and-crochet',
  'bandits',
  'a-little-man-in-the-center',
  'birds-in-baroque',
  'blue-accents',
  'dancing-in-the-shadows',
  'dimensions',
  'crossing-winter',
  'dont-just-fly-soar',
  'fading-monks-in-red',
  'ford-monks',
  'is-in-the-air',
  'jumping-the-bridge',
  'jungle-in-black-and-white',
  'letters-numbers-and-other-details',
  'lost-in-the-red-garden',
  'pushing',
  'sunrise',
  'reaching-the-top',
  'the-abstract-forest',
  'irruption',
  'the-duel',
  'the-music-is-at-the-bottom',
  'the-puzzle',
  'the-unfinished-picture',
  'three-chapters',
  'a-hundred-bells-and-one-flute',
  'anatomy-i',
  'anatomy-ii',
  'ghosts',
  // These 3 were recategorized from EC to abstracts (based on image folder)
  'beige-and-blue',
  'blue-and-white-margins',
  'red-and-ocre',
];

// Homepage featured pieces in order (all 31 from the live site's elegant-contemporary carousel)
// Note: blue-and-white-margins, red-and-ocre, and beige-and-blue are now in abstracts category
// but they should still appear on homepage as featured
const homepageFeatured = [
  'the-prey',
  'flying-kites-running-cats',
  'bath-behind-doors',
  'tea-house',
  'horses-from-heaven',
  'blue-and-white-margins',
  'red-and-ocre',
  'origami-birds',
  'irruption',
  'the-nap',
  'imminent',
  'happiness',
  'the-blue-romans',
  'origami-bird',
  'black-red-and-gold',
  'catwoman',
  'drapes-of-love',
  'finding-yourself',
  'happiness-2',
  'beige-and-blue',
  'the-chase',
  'cranes-and-dragonflies',
  'blue-lotus',
  'reaching-the-beach',
  'afternoon-bath',
  'japanese-night',
  'loving-letter',
  'soleil',
  'the-great-wave',
  'the-kiss',
  'irruption-ii',
];

async function fixOrder() {
  console.log('Fixing displayOrder to match live site curated order...\n');

  let patched = 0;
  let notFound = 0;

  for (const [orderList, label] of [
    [elegantContemporaryOrder, 'Elegant Contemporary'],
    [abstractsOrder, 'Abstracts'],
  ] as const) {
    console.log(`--- ${label} ---`);
    for (let i = 0; i < orderList.length; i++) {
      const slug = orderList[i];
      const displayOrder = i + 1;

      const doc = await client.fetch(
        `*[_type == "artwork" && slug.current == $slug][0]{ _id, displayOrder }`,
        { slug }
      );

      if (!doc) {
        console.log(`  "${slug}" — NOT FOUND in Sanity`);
        notFound++;
        continue;
      }

      if (doc.displayOrder === displayOrder) {
        continue; // already correct
      }

      await client.patch(doc._id).set({ displayOrder }).commit();
      console.log(`  #${displayOrder} ${slug} (was #${doc.displayOrder})`);
      patched++;
    }
  }

  // Set homepage featured pieces
  console.log(`\n--- Homepage Featured ---`);
  for (let i = 0; i < homepageFeatured.length; i++) {
    const slug = homepageFeatured[i];
    const featuredOrder = i + 1;

    const doc = await client.fetch(
      `*[_type == "artwork" && slug.current == $slug][0]{ _id, featured, featuredOrder }`,
      { slug }
    );

    if (!doc) {
      console.log(`  "${slug}" — NOT FOUND`);
      notFound++;
      continue;
    }

    if (doc.featured === true && doc.featuredOrder === featuredOrder) {
      continue;
    }

    await client.patch(doc._id).set({ featured: true, featuredOrder }).commit();
    console.log(`  ⭐ #${featuredOrder} ${slug}`);
    patched++;
  }

  console.log(`\nDone. Patched: ${patched}, Not found: ${notFound}`);
}

fixOrder().catch(console.error);
