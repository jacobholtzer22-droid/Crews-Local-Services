/**
 * Photo registry. Every photo on the site is declared here with its real pixel
 * dimensions, its alt text, and the URL it came from.
 *
 * RULES
 *  - These are the CLIENT'S OWN published photos, pulled from their Yahoo/Networx
 *    listings. No stock, no generated images, ever. If a photo is missing the
 *    fallback is the end-grain panel, never a substitute picture.
 *  - Dimensions are the real encoded dimensions and are passed to next/image so
 *    the browser reserves the box before the bytes arrive. Getting these wrong
 *    reintroduces layout shift, which is the one metric this site has at zero.
 *  - Nothing is upscaled. Each WebP was resized DOWN from its source or left at
 *    source width.
 *  - Alt text describes what is actually visible plus the area, written from
 *    looking at the photo rather than from the listing caption.
 *
 * Provenance for each file is also recorded in seo/FACTS.md so launch can swap in
 * the Google Business Profile originals without guessing which is which.
 */
export type Photo = {
  src: string
  width: number
  height: number
  alt: string
  /** Original URL this was downloaded from. */
  source: string
}

export const PHOTOS = {
  /**
   * Hero backdrop only. Deliberately downscaled to 640px, pre-blurred and encoded
   * at low quality: it sits under a blur and an ~82% bark overlay, so it is
   * atmosphere rather than an image, and shipping it sharp would be paying full
   * price for pixels nobody can resolve. 8KB.
   */
  heroBackdrop: {
    src: '/photos/hero-crew-on-stump.webp',
    width: 640,
    height: 640,
    alt: '',
    source: 'https://s.yimg.com/bj/68c5/68c5e666681320eea169c5b915c92a68.jpg',
  },
  treeRemoval: {
    src: '/photos/tree-removal-bucking-trunk.webp',
    width: 750,
    height: 1000,
    alt: 'Crews Local Services cutting a felled trunk into rounds with a chainsaw in a Battle Creek, Michigan back yard, fresh-cut end grain visible on the stump',
    source: 'https://s.yimg.com/bj/a81d/a81db2a5ca02eb382e007a30761a2d58.jpg',
  },
  treeTrimming: {
    src: '/photos/tree-trimming-brush-cleared.webp',
    width: 750,
    height: 1000,
    alt: 'A multi-stem tree beside a Battle Creek, Michigan property with the cut brush stacked at its base after trimming',
    source: 'https://s.yimg.com/bj/536c/536c025b75ddc5a8d0ecfbfaf8d82f32.jpg',
  },
  stumpGrinding: {
    src: '/photos/stump-grinding-fresh-stump.webp',
    width: 960,
    height: 960,
    alt: 'A large freshly cut tree stump beside the water near Battle Creek, Michigan, with a member of the Crews Local Services crew standing on it holding a chainsaw',
    source: 'https://s.yimg.com/bj/68c5/68c5e666681320eea169c5b915c92a68.jpg',
  },
  stormDown: {
    src: '/photos/storm-pine-down-playground.webp',
    width: 1000,
    height: 750,
    alt: 'A large pine blown down across a daycare playground and onto the building roof near Battle Creek, Michigan, with a Crews Local Services worker holding a chainsaw beneath it',
    source: 'https://s.yimg.com/bj/cf69/cf69b09b96b583f7f920bddab3870ce6.jpg',
  },
  stormCleared: {
    src: '/photos/storm-playground-cleared.webp',
    width: 1000,
    height: 750,
    alt: 'The same daycare playground near Battle Creek, Michigan cleared after the storm-damaged pine was cut up and removed, with saws and fuel cans still on the grass',
    source: 'https://s.yimg.com/bj/7f83/7f83ad74eebaa0524ba070099133f231.jpg',
  },
  aboutOwner: {
    src: '/photos/about-crew-bucking-hardwood.webp',
    width: 703,
    height: 584,
    alt: 'Crews Local Services cutting a large hardwood trunk into rounds with a chainsaw near Battle Creek, Michigan, sawdust across the work area and the truck and trailer behind',
    source: 'https://s.yimg.com/bj/536a/536a0268202c4ebb437d54309a17bdb3.jpg',
  },
} as const satisfies Record<string, Photo>

export type PhotoKey = keyof typeof PHOTOS
