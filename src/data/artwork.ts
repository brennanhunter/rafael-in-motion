import { Artwork, ArtworkCollection, ArtworkFilters } from '@/types/artwork';

// Centralized artwork data
export const artworkData: ArtworkCollection = [
  // Art Deco Collection
  {
    id: 'afternoon-bath',
    title: 'Afternoon Bath',
    filename: 'Afternoon Bath.jpg',
    imagePath: '/images/art-deco/Afternoon Bath.jpg',
    category: 'art-deco',
    story: 'Three women, three directions of flowing hair: one reaching up, one cascading down, and one stretching sideways capturing a moment of elegance in every direction.'
  },
  {
    id: 'anatomy-i',
    title: 'Anatomy I',
    filename: 'AnatomyI.png',
    imagePath: '/images/abstracts/AnatomyI.png',
    category: 'abstracts',
    story: 'During my medical studies, I became fascinated by the beauty hidden within anatomical drawings. This piece explores the intersection of science and art, where precise medical observation transforms into emotional expression. The skeletal forms dissolve into flowing gestures, suggesting that beneath our physical structure lies something indefinable and poetic.'
  },
  {
    id: 'anatomy-ii',
    title: 'Anatomy II',
    filename: 'AnatomyII.png',
    imagePath: '/images/abstracts/AnatomyII.png',
    category: 'abstracts',
    story: 'The sequel to my anatomical exploration, this piece delves deeper into the emotional landscape of the human form. Here, the clinical precision gives way to pure feeling - bones become rivers, muscles transform into mountains, and the heart emerges as the central sun around which everything orbits. It\'s anatomy reimagined through the lens of love and loss.'
  },
  {
    id: 'bath-behind-doors',
    title: 'Bath Behind Doors',
    filename: 'Bath Behind Doors.jpg',
    imagePath: '/images/art-deco/Bath Behind Doors.jpg',
    category: 'art-deco',
    story: 'The water element expressing differently in the picture: the river with its cadence and sinuosity in the asian screens, and the stillness of the blue, glassy surface in the quiet of the pool.'
  },
  {
    id: 'black-red-and-gold',
    title: 'Black Red and Gold',
    filename: 'Black Red and Gold.jpg',
    imagePath: '/images/art-deco/Black Red and Gold.jpg',
    category: 'art-deco',
    story: 'These three colors hold the power of empire and revolution. Painted during a contemplative evening, I was struck by how these particular hues have appeared in flags, royal courts, and rebel banners throughout history. The composition explores the tension between luxury and rebellion, elegance and passion - all contained within this timeless palette.'
  },
  {
    id: 'catwoman',
    title: 'Catwoman',
    filename: 'Catwoman.jpg',
    imagePath: '/images/art-deco/Catwoman.jpg',
    category: 'art-deco',
    story: 'Pairs a sensuous woman and her feline in elegant harmony, their forms united by sleek lines and a shimmering gold leaf backdrop.'
  },
  {
    id: 'drapes-of-love',
    title: 'Drapes of Love',
    filename: 'Drapes of Love.jpg',
    imagePath: '/images/art-deco/Drapes of Love.jpg',
    category: 'art-deco',
    story: 'The image captures a reclining woman and her partner: their arms entwined like flowing drapes. The central knot of their embrace forms the heart of the piece.'
  },
  {
    id: 'finding-yourself',
    title: 'Finding Yourself',
    filename: 'Finding Yourself.jpg',
    imagePath: '/images/art-deco/Finding Yourself.jpg',
    category: 'art-deco',
    story: 'Unfolds like a visual matryoshka doll each woman opens a box only to reveal another version of herself. It\'s a layered journey of self-discovery: each box within a box revealing yet another hidden self.'
  },
  {
    id: 'ghosts',
    title: 'Ghosts',
    filename: 'Ghosts.jpg',
    imagePath: '/images/abstracts/Ghosts.jpg',
    category: 'abstracts',
    story: 'Some paintings paint themselves. I began this piece intending to create something entirely different, but as I worked, ghostly figures began emerging from the canvas - not supernatural, but emotional spirits of memory and nostalgia. Each translucent form represents a moment that has passed but refuses to be forgotten, lingering in the spaces between conscious thought.'
  },
  {
    id: 'happiness',
    title: 'Happiness',
    filename: 'Happiness.jpg',
    imagePath: '/images/art-deco/Happiness.jpg',
    category: 'art-deco',
    story: 'A mischievous kitty leads to a delightful surprise as it playfully breaks a porcelain egg and an origami chick emerges from it.'
  },
  {
    id: 'happiness-2',
    title: 'Happiness 2',
    filename: 'Happiness 2.jpg',
    imagePath: '/images/art-deco/Happiness 2.jpg',
    category: 'art-deco',
    story: 'A continuation of my exploration of joy, this piece captures the quieter moments of contentment. Unlike its predecessor\'s playful energy, this painting finds happiness in stillness - in the gentle curve of a sleeping cat, the soft fold of fabric, the way afternoon light settles into corners. Sometimes the deepest joy is found not in laughter, but in peaceful silence.'
  },
  {
    id: 'horses-from-heaven',
    title: 'Horses From Heaven',
    filename: 'HorsesFromHeaven.png',
    imagePath: '/images/art-deco/HorsesFromHeaven.png',
    category: 'art-deco',
    story: 'The power, the motion and the energy of the black horses galloping across the infinite sky.'
  },
  {
    id: 'imminent',
    title: 'Imminent',
    filename: 'Imminent.jpg',
    imagePath: '/images/art-deco/Imminent.jpg',
    category: 'art-deco',
    story: 'One of the raven had discovered a dragonfly drawing the attention of his companions. In just moments the scene is poised to unfold.'
  },
  {
    id: 'irruption',
    title: 'Irruption',
    filename: 'Irruption.jpg',
    imagePath: '/images/abstracts/Irruption.jpg',
    category: 'abstracts',
    story: 'In this theatrical scene a medieval musician, a doctor with a seated woman and a friend, all seem disconnected - except for one simple factor that creates a link to all of them: From the buffon\'s plate emerges a dramatic raven expecting to scare everyone.'
  },
  {
    id: 'irruption-ii',
    title: 'Irruption II',
    filename: 'IrruptionII.png',
    imagePath: '/images/abstracts/IrruptionII.png',
    category: 'abstracts',
    story: 'In this golden triptych, each panel is touched by an unexpected irruption: A couple engulfed by dragonflies, a doctor startling a scene with a raven and finally, a lone figure unsettled by the whimsical presence of fairy-like beings. These moments of disruption transform the ordinary into something enchantingly strange.'
  },
  {
    id: 'japanese-night',
    title: 'Japanese Night',
    filename: 'Japanese Night.jpg',
    imagePath: '/images/art-deco/Japanese Night.jpg',
    category: 'art-deco',
    story: 'A woman stands outside a yellow slit of light, while a man\'s face peers from the luminous interior, breaking the uniformity of the brownish color of the image.'
  },
  {
    id: 'loving-letter',
    title: 'Loving Letter',
    filename: 'Loving Letter.jpg',
    imagePath: '/images/art-deco/Loving Letter.jpg',
    category: 'art-deco',
    story: 'She opens an envelope and out soar origami birds, carrying her message into the air.'
  },
  {
    id: 'origami-bird',
    title: 'Origami Bird',
    filename: 'Origami Bird.jpg',
    imagePath: '/images/art-deco/Origami Bird.jpg',
    category: 'art-deco',
    story: 'A broken porcelain egg reveals a tiny origami chick - just a hint of whimsy in a world of elegance.'
  },
  {
    id: 'soleil',
    title: 'Soleil',
    filename: 'Soleil.jpg',
    imagePath: '/images/art-deco/Soleil.jpg',
    category: 'art-deco',
    story: 'Painted during a summer in Provence, this piece captures not just the visual impact of the Mediterranean sun, but its emotional resonance. "Soleil" represents those moments when sunlight doesn\'t just illuminate the world around us, but transforms our inner landscape, filling us with a warmth that stays long after the sun has set.'
  },
  {
    id: 'tea-house',
    title: 'Tea House',
    filename: 'Tea House.jpg',
    imagePath: '/images/art-deco/Tea House.jpg',
    category: 'art-deco',
    story: 'Following the ritual, a woman is serving tea: you cannot see the teacups, but the raising steam going up, visually suggest a beautiful turquoise curtain.'
  },
  {
    id: 'the-great-wave',
    title: 'The Great Wave',
    filename: 'The Great Wave.jpg',
    imagePath: '/images/art-deco/The Great Wave.jpg',
    category: 'art-deco',
    story: 'The man\'s sweeping cape and the woman\'s red accents mirror a wave and canoes in motion as they dance together.'
  },
  {
    id: 'the-kiss',
    title: 'The Kiss',
    filename: 'The Kiss.jpg',
    imagePath: '/images/art-deco/The Kiss.jpg',
    category: 'art-deco',
    story: 'Love and anatomy intertwined as two figures merge into a single embrace, capturing both affection and the unity of their figures.'
  },
  {
    id: 'the-nap',
    title: 'The Nap',
    filename: 'TheNap.png',
    imagePath: '/images/art-deco/TheNap.png',
    category: 'art-deco',
    story: 'A woman rests in a vivid red dreamscape. In the meantime the pages from her book fly away in the form of origami birds.'
  },
  {
    id: 'the-prey',
    title: 'The Prey',
    filename: 'ThePrey.png',
    imagePath: '/images/art-deco/ThePrey.png',
    category: 'art-deco',
    story: 'While in her sleep, the tigers in her kimono are chasing the fish in her tatoo. The golden river in her black garment continues its path in the skin of her leg.'
  },
  {
    id: 'the-prey-ii',
    title: 'The Prey II',
    filename: 'ThePreyII.png',
    imagePath: '/images/art-deco/ThePreyII.png',
    category: 'art-deco',
    story: 'While in her sleep, the tigers in her kimono are chasing the fish in her tatoo. The golden river in her black garment continues its path in the skin of her leg.'
  },
  {
    id: 'origami-birds',
    title: '101 Origami Birds',
    filename: '101OrigamiBirds.jpg',
    imagePath: '/images/art-deco/101OrigamiBirds.jpg',
    category: 'art-deco',
    story: 'A cascade of folded birds fills each panel, transforming simple moments into a quiet flight of imagination.'
  },
  {
    id: 'blue-lotus',
    title: 'Blue Lotus',
    filename: 'BlueLotus.jpg',
    imagePath: '/images/art-deco/BlueLotus.jpg',
    category: 'art-deco',
    story: 'The blue lotus represents rebirth and spiritual awakening in many cultures. This painting was created during a period of personal transformation, when I felt myself emerging from a difficult time like a lotus rising from muddy waters. The blue represents the peace that comes after struggle.'
  },
  {
    id: 'cranes-and-dragonflies',
    title: 'Cranes and Dragonflies',
    filename: 'CranesAndDragonflies.jpg',
    imagePath: '/images/art-deco/CranesAndDragonflies.jpg',
    category: 'art-deco',
    story: 'Inspired by Japanese poetry, this piece explores the delicate balance between the majestic and the ephemeral. The cranes represent longevity and wisdom, while the dragonflies embody the fleeting beauty of each moment. Together, they create a meditation on time - how we must honor both permanence and change, finding grace in the dance between what endures and what passes.'
  },
  {
    id: 'flying-kites-running-cats',
    title: 'Flying Kites Running Cats',
    filename: 'FlyingKitesRunningCats.jpg',
    imagePath: '/images/art-deco/FlyingKitesRunningCats.jpg',
    category: 'art-deco',
    story: 'In a playful game cats running alongside horses, but when you look up, you discover vibrant fish seemingly alive, flaming through the air held by the women.'
  },
  {
    id: 'reaching-the-beach',
    title: 'Reaching the Beach',
    filename: 'ReachingTheBeach.jpg',
    imagePath: '/images/art-deco/ReachingTheBeach.jpg',
    category: 'art-deco',
    story: 'This painting captures that moment of anticipation before arrival - when you can smell the salt air and hear the distant waves, but haven\'t yet felt sand beneath your feet. The figures stretch forward with longing, their bodies already moving toward the promise of ocean and freedom. It\'s about the journey being as beautiful as the destination.'
  },
  {
    id: 'the-blue-romans',
    title: 'The Blue Romance',
    filename: 'TheBlueRomans.jpg',
    imagePath: '/images/art-deco/TheBlueRomans.jpg',
    category: 'art-deco',
    story: 'In this piece, an intimate human embrace breaks through painted screens, revealing a parallel world of blue tigers. A silent observer watches the harmony between these two couples, blending human affection and wild grace.'
  },
  {
    id: 'the-chase',
    title: 'The Chase',
    filename: 'TheChase.jpg',
    imagePath: '/images/art-deco/TheChase.jpg',
    category: 'art-deco',
    story: 'In this piece a gang of tigers races after a flock of cranes, only to realize they have being pursued by origami birds themselves. It\'s a playful chase within a chase.'
  },

  // Abstract Collection
  {
    id: 'a-hundred-bells-and-one-flute',
    title: 'A Hundred Bells and One Flute',
    filename: 'A-Hundred-Bells-and-One-Flute.jpg',
    imagePath: '/images/abstracts/A-Hundred-Bells-and-One-Flute.jpg',
    category: 'abstracts',
    story: 'This piece was inspired by a dream I had where I was walking through a forest of musical instruments. The sound was overwhelming at first - a hundred bells ringing at once - but then I heard a single flute cutting through the chaos, bringing order and melody to the cacophony. The painting captures that moment when chaos transforms into harmony.'
  },
  {
    id: 'the-abstract-forest',
    title: 'The Abstract Forest',
    filename: 'The-Abstract-Forest.jpg',
    imagePath: '/images/abstracts/The-Abstract-Forest.jpg',
    category: 'abstracts',
    story: 'During a meditation retreat in the mountains, I became fascinated by how trees looked different each time I observed them - sometimes solid and grounded, other times ethereal and flowing. This painting represents the forest as I experienced it in those moments of deep contemplation, where the boundary between the physical and spiritual worlds dissolved.'
  },
  {
    id: 'three-chapters',
    title: 'Three Chapters',
    filename: 'Three-Chapters.jpg.webp',
    imagePath: '/images/abstracts/Three-Chapters.jpg.webp',
    category: 'abstracts',
    story: 'This piece represents three pivotal moments in my artistic journey: the confusion of beginning, the struggle of growth, and the clarity of understanding. Each "chapter" uses different color palettes and textures to show how my perception of art has evolved over the years.'
  },
  {
    id: 'dancing-in-the-shadows',
    title: 'Dancing in the Shadows',
    filename: 'Dancing-in-the-Shadows.jpg',
    imagePath: '/images/abstracts/Dancing-in-the-Shadows.jpg',
    category: 'abstracts',
    story: 'Inspired by a flamenco performance I witnessed in Seville, this painting captures not the dancers themselves, but the shadows they cast and the energy they left in the air. The interplay of light and dark represents the passion and melancholy inherent in flamenco.'
  },
  {
    id: 'lost-in-the-red-garden',
    title: 'Lost in the Red Garden',
    filename: 'Lost-in-the-Red-Garden.jpg',
    imagePath: '/images/abstracts/Lost-in-the-Red-Garden.jpg',
    category: 'abstracts',
    story: 'This painting emerged from a period of intense emotional upheaval. I found myself painting obsessively with red - the color of passion, anger, and love all at once. The "garden" represents the maze of feelings I was navigating, where being lost was not frightening but necessary for growth.'
  },
  {
    id: 'blue-accents',
    title: 'Blue Accents',
    filename: 'Blue-Accents.jpg',
    imagePath: '/images/abstracts/Blue-Accents.jpg',
    category: 'abstracts',
    story: 'Sometimes a single color can change everything. I was working on a predominantly warm composition when I added just a few touches of blue - suddenly the entire painting transformed. This piece explores how small interventions can create dramatic shifts, both in art and in life. The blue accents don\'t dominate; they illuminate, creating depth and breathing space within the warmth.'
  },
  {
    id: 'the-duel',
    title: 'The Duel',
    filename: 'The-Duel.jpg',
    imagePath: '/images/abstracts/The-Duel.jpg',
    category: 'abstracts',
    story: 'This piece represents the eternal struggle between order and chaos, light and dark, creation and destruction. The "duel" is not violent but philosophical - two forces of nature engaged in an eternal dance that creates the world we know.'
  },
  {
    id: 'crossing-winter',
    title: 'Crossing Winter',
    filename: 'Crossing-Winter.jpg',
    imagePath: '/images/abstracts/Crossing-Winter.jpg',
    category: 'abstracts',
    story: 'Winter has its own logic - everything essential becomes visible when the excess falls away. This painting emerged during the coldest months, when I was learning to find beauty in bareness, strength in what survives the frost. The crossing isn\'t just through season, but through a state of mind, emerging with a clearer understanding of what truly matters.'
  },
  {
    id: 'dimensions',
    title: 'Dimensions',
    filename: 'Dimensions.jpg',
    imagePath: '/images/abstracts/Dimensions.jpg',
    category: 'abstracts',
    story: 'What if we could see the fourth dimension? This painting attempts to visualize the unseen layers of reality that exist beyond our three-dimensional perception. Each overlapping plane suggests depth beyond depth, spaces within spaces. It was inspired by late-night conversations about physics and philosophy, when the boundaries between art and science dissolve into pure wonder.'
  },
  {
    id: 'dont-just-fly-soar',
    title: "Don't Just Fly, Soar",
    filename: 'Dont-Just-Fly-Soar.jpg',
    imagePath: '/images/abstracts/Dont-Just-Fly-Soar.jpg',
    category: 'abstracts',
    story: 'This painting was created during a time when I felt limited by conventional expectations. The title came to me as I watched eagles over the canyon - they weren\'t just flying from point A to point B, they were dancing with the wind, playing with the currents. It reminds us to approach life not just with purpose, but with joy and abandon.'
  },
  {
    id: 'bandits',
    title: 'Bandits',
    filename: 'Bandits.jpg',
    imagePath: '/images/abstracts/Bandits.jpg',
    category: 'abstracts',
    story: 'Not all rebels wear masks - some hide in plain sight, disguised as ordinary moments. This piece celebrates the quiet revolutionaries who steal time for beauty, who pilfer moments for reflection in our hurried world. The "bandits" here are thoughts and dreams that refuse to be captured by routine, always escaping to wilder territories of imagination.'
  },
  {
    id: 'a-little-man-in-the-center',
    title: 'A Little Man in the Center',
    filename: 'A-Little-Man-in-the-Center.jpg',
    imagePath: '/images/abstracts/A-Little-Man-in-the-Center.jpg',
    category: 'abstracts',
    story: 'Sometimes we all feel like the little figure at the center of overwhelming chaos. This painting captures that universal moment of feeling small in the face of life\'s complexity. But there\'s power in that smallness - the little man isn\'t being crushed by the swirling forces around him; he\'s the still point around which everything else orbits, the calm eye of his own storm.'
  },
  {
    id: 'abstract-and-crochet',
    title: 'Abstract and Crochet',
    filename: 'Abstract-and-Crochet.jpg.webp',
    imagePath: '/images/abstracts/Abstract-and-Crochet.jpg.webp',
    category: 'abstracts',
    story: 'My grandmother\'s hands working crochet hooks inspired this piece - the way patient, repetitive motions create intricate patterns, how individual stitches accumulate into something beautiful and useful. I wanted to capture that meditative rhythm in paint, where each brushstroke is like a stitch, building texture and meaning through persistent, loving attention to detail.'
  },
  {
    id: 'beige-and-blue',
    title: 'Beige and Blue',
    filename: 'Beige-and-Blue.jpg',
    imagePath: '/images/abstracts/Beige-and-Blue.jpg',
    category: 'abstracts',
    story: 'This color combination reminds me of desert meetings sky - that moment at dusk when earth and heaven seem to touch. I was drawn to these muted tones during a period of seeking balance, when I needed to find harmony between groundedness and aspiration. The beige anchors while the blue lifts, creating a visual breathing space between ambition and acceptance.'
  },
  {
    id: 'birds-in-baroque',
    title: 'Birds in Baroque',
    filename: 'Birds-in-Baroque.jpg.webp',
    imagePath: '/images/abstracts/Birds-in-Baroque.jpg.webp',
    category: 'abstracts',
    story: 'While visiting European cathedrals, I became fascinated by how birds would fly through these ornate spaces, their simple grace contrasting with the elaborate human architecture. This painting captures that juxtaposition - natural freedom moving through constructed beauty, the eternal dialogue between what we build and what remains wild within and around us.'
  },
  {
    id: 'blue-and-white-margins',
    title: 'Blue and White Margins',
    filename: 'Blue-and-White-Margins.jpg',
    imagePath: '/images/abstracts/Blue-and-White-Margins.jpg',
    category: 'abstracts',
    story: 'Inspired by marginalia in ancient manuscripts, this piece explores the idea that the most important thoughts often happen in the spaces between - in the margins of our official lives. The blue and white create a sense of infinite possibility, like looking at clouds or ocean waves, where the eye can rest and the mind can wander freely.'
  },
  {
    id: 'fading-monks-in-red',
    title: 'Fading Monks in Red',
    filename: 'Fading-Monks-in-Red.jpg',
    imagePath: '/images/abstracts/Fading-Monks-in-Red.jpg',
    category: 'abstracts',
    story: 'During a visit to a monastery, I was struck by how the monks seemed to fade into their environment, becoming part of the walls and shadows through their stillness. This painting captures that dissolution of ego, where individual identity merges with something larger. The red suggests both passion and sacrifice - the fire of devotion that burns away the unnecessary self.'
  },
  {
    id: 'ford-monks',
    title: 'Ford Monks',
    filename: 'Ford-Monks.jpg',
    imagePath: '/images/abstracts/Ford-Monks.jpg',
    category: 'abstracts',
    story: 'The name emerged from a dream where ancient wisdom met modern pragmatism - monks who cross rivers not by walking on water, but by understanding exactly where to step. This piece explores the intersection of mysticism and practicality, suggesting that true spirituality isn\'t about escaping the world but navigating it with deeper awareness and purpose.'
  },
  {
    id: 'is-in-the-air',
    title: 'Is in the Air',
    filename: 'Is-in-the-Air.jpg',
    imagePath: '/images/abstracts/Is-in-the-Air.jpg',
    category: 'abstracts',
    story: 'Sometimes you can feel change before you can see it - it\'s just there, suspended in the atmosphere like electricity before a storm. This painting captures those moments of anticipation when something significant is about to shift, but we don\'t yet know what. The air itself becomes charged with possibility, thick with the weight of transformation.'
  },
  {
    id: 'jumping-the-bridge',
    title: 'Jumping the Bridge',
    filename: 'Jumping-the-Bridge.jpg',
    imagePath: '/images/abstracts/Jumping-the-Bridge.jpg',
    category: 'abstracts',
    story: 'Why cross a bridge when you can leap over it entirely? This piece celebrates those moments when we bypass the expected path and find our own way forward. It\'s about the courage to take shortcuts through difficulty, to trust in our ability to clear obstacles that seem impossibly wide. Sometimes the direct route isn\'t the obvious one.'
  },
  {
    id: 'jungle-in-black-and-white',
    title: 'Jungle in Black and White',
    filename: 'Jungle-in-Black-and-White.jpg',
    imagePath: '/images/abstracts/Jungle-in-Black-and-White.jpg',
    category: 'abstracts',
    story: 'Stripping away color revealed the jungle\'s true architecture - the complex patterns of growth and decay, light and shadow that exist beneath the seductive green surface. This monochromatic exploration discovers that when we remove the obvious beauty, deeper structures emerge: the geometry of survival, the rhythm of seasons, the elegant mathematics of chaos.'
  },
  {
    id: 'letters-numbers-and-other-details',
    title: 'Letters, Numbers and Other Details',
    filename: 'Letters-Numbers-and-Other-Details.jpg.webp',
    imagePath: '/images/abstracts/Letters-Numbers-and-Other-Details.jpg.webp',
    category: 'abstracts',
    story: 'Our lives are composed of countless small symbols - the letters we write, numbers we calculate, tiny details we notice and forget. This painting celebrates the poetry hidden in everyday notation, the way meaning accumulates through small marks and measurements. Each element seems mundane alone, but together they create the complex text of human experience.'
  },
  {
    id: 'pushing',
    title: 'Pushing',
    filename: 'Pushing.jpg',
    imagePath: '/images/abstracts/Pushing.jpg',
    category: 'abstracts',
    story: 'Sometimes progress isn\'t about breaking through but about the sustained effort of pushing - the continuous application of pressure that gradually reshapes reality. This piece captures that patient persistence, the way change happens not in dramatic moments but through consistent force applied over time. It\'s a meditation on endurance and the quiet power of not giving up.'
  },
  {
    id: 'reaching-the-top',
    title: 'Reaching the Top',
    filename: 'Reaching-the-Top.jpg.webp',
    imagePath: '/images/abstracts/Reaching-the-Top.jpg.webp',
    category: 'abstracts',
    story: 'The summit is never what we expect - it\'s smaller, quieter, more ordinary than the struggle to reach it. This painting explores that paradox of achievement, how the peak moment is often less about triumph and more about the simple relief of arrival. The real transformation happened during the climb; the top is just where we pause to appreciate how far we\'ve traveled.'
  },
  {
    id: 'red-and-ocre',
    title: 'Red and Ocre',
    filename: 'Red-and-Ocre.jpg.webp',
    imagePath: '/images/abstracts/Red-and-Ocre.jpg.webp',
    category: 'abstracts',
    story: 'These are the colors of ancient cave paintings, of the first human attempts to capture reality on stone. Working with red and ochre connects me to something primal - the fundamental urge to make marks, to say "I was here, I saw this, this mattered." The painting becomes a bridge across millennia, linking my hand to the first artists who mixed earth with vision.'
  },
  {
    id: 'sunrise',
    title: 'Sunrise',
    filename: 'Sunrise.jpg.webp',
    imagePath: '/images/abstracts/Sunrise.jpg.webp',
    category: 'abstracts',
    story: 'This painting was born from those magical moments just before dawn when I would wake early to paint outdoors. There\'s something about the way light gradually transforms the world that cannot be captured literally - only through the emotion and energy of abstract form. Each brushstroke represents a moment of that slow, beautiful awakening.'
  },
  {
    id: 'the-music-is-at-the-bottom',
    title: 'The Music is at the Bottom',
    filename: 'The-Music-is-at-the-Bottom.jpg',
    imagePath: '/images/abstracts/The-Music-is-at-the-Bottom.jpg',
    category: 'abstracts',
    story: 'We often look up for transcendence, but sometimes the most beautiful melodies emerge from the depths. This piece suggests that profound beauty often lies in the foundation, in the bass notes of existence rather than the soaring highs. The music at the bottom is steady, grounding, the heartbeat that everything else dances above.'
  },
  {
    id: 'the-puzzle',
    title: 'The Puzzle',
    filename: 'The-Puzzle.jpg.webp',
    imagePath: '/images/abstracts/The-Puzzle.jpg.webp',
    category: 'abstracts',
    story: 'Life doesn\'t come with a picture on the box showing what the completed puzzle should look like. This painting embraces that uncertainty - pieces that might fit together, spaces that refuse to be filled, the satisfaction of finding connections and the beauty of accepting incompleteness. Sometimes the puzzle is more interesting when it remains unsolved.'
  },
  {
    id: 'the-unfinished-picture',
    title: 'The Unfinished Picture',
    filename: 'The-Unfinished-Picture.jpg',
    imagePath: '/images/abstracts/The-Unfinished-Picture.jpg',
    category: 'abstracts',
    story: 'Sometimes the most honest art is the kind that admits it\'s not finished. This piece represents my acceptance that growth and creation are ongoing processes. The "unfinished" quality is not a flaw but the very essence of being alive and constantly evolving.'
  }
  // You can add more collections here (interiors, etc.)
];

// Helper function to get artwork by category
// Helper function to get artwork by category (shuffled to avoid alphabetical order)
export const getArtworkByCategory = (category: Artwork['category']): Artwork[] => {
  const filtered = artworkData.filter(artwork => artwork.category === category);
  
  // Special ordering for art-deco category
  if (category === 'art-deco') {
    const desiredOrder = [
      'flying-kites-running-cats',
      'bath-behind-doors',
      'tea-house',
      'horses-from-heaven',
      'the-prey-ii',
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
      'the-chase',
      'cranes-and-dragonflies',
      'blue-lotus',
      'the-prey',
      'reaching-the-beach',
      'afternoon-bath',
      'japanese-night',
      'loving-letter',
      'soleil',
      'the-great-wave',
      'the-kiss',
      'irruption-ii'
    ];

    // Create ordered array based on desired order
    const orderedArtwork: Artwork[] = [];
    
    // Add artwork in specified order
    desiredOrder.forEach(id => {
      const artwork = filtered.find(piece => piece.id === id);
      if (artwork) {
        orderedArtwork.push(artwork);
      }
    });
    
    // Add any remaining artwork not in the order list
    filtered.forEach(artwork => {
      if (!desiredOrder.includes(artwork.id)) {
        orderedArtwork.push(artwork);
      }
    });
    
    return orderedArtwork;
  }
  
  // Special ordering for abstracts category
  if (category === 'abstracts') {
    const desiredOrder = [
      'irruption-ii',
      'red-and-ocre',
      'blue-and-white-margins',
      'abstract-and-crochet',
      'bandits',
      'beige-and-blue',
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
      'ghosts'
    ];

    // Create ordered array based on desired order
    const orderedArtwork: Artwork[] = [];
    
    // Add artwork in specified order
    desiredOrder.forEach(id => {
      const artwork = filtered.find(piece => piece.id === id);
      if (artwork) {
        orderedArtwork.push(artwork);
      }
    });
    
    // Add any remaining artwork not in the order list
    filtered.forEach(artwork => {
      if (!desiredOrder.includes(artwork.id)) {
        orderedArtwork.push(artwork);
      }
    });
    
    return orderedArtwork;
  }
  
  // Shuffle other categories to avoid alphabetical ordering
  return filtered.sort(() => Math.random() - 0.5);
};

// Helper function to get featured artwork
export const getFeaturedArtwork = (): Artwork[] => {
  return artworkData.filter(artwork => artwork.featured === true);
};

// Helper function to search artwork
export const searchArtwork = (filters: ArtworkFilters): Artwork[] => {
  return artworkData.filter(artwork => {
    // Category filter
    if (filters.category && artwork.category !== filters.category) {
      return false;
    }
    
    // Featured filter
    if (filters.featured !== undefined && artwork.featured !== filters.featured) {
      return false;
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        artwork.tags?.includes(tag)
      );
      if (!hasMatchingTag) return false;
    }
    
    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const titleMatch = artwork.title.toLowerCase().includes(searchLower);
      const captionMatch = artwork.caption?.toLowerCase().includes(searchLower);
      const descriptionMatch = artwork.description?.toLowerCase().includes(searchLower);
      const tagMatch = artwork.tags?.some(tag => 
        tag.toLowerCase().includes(searchLower)
      );
      
      if (!titleMatch && !captionMatch && !descriptionMatch && !tagMatch) {
        return false;
      }
    }
    
    return true;
  });
};

// Helper function to get artwork by ID
export const getArtworkById = (id: string): Artwork | undefined => {
  return artworkData.find(artwork => artwork.id === id);
};

// Helper function to get random artwork
export const getRandomArtwork = (count: number = 1, excludeIds: string[] = []): Artwork[] => {
  const availableArtwork = artworkData.filter(artwork => 
    !excludeIds.includes(artwork.id)
  );
  
  const shuffled = [...availableArtwork].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
