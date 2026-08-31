/**
 * Generates the brand raster assets from the same end-grain ring geometry used by
 * components/RingMark.tsx: public/logo.png (512x512, for schema.org image/logo)
 * and public/og.png (1200x630, for Open Graph and Twitter).
 *
 * Run: npm run assets
 *
 * These are generated rather than committed-by-hand so the mark can never drift
 * from the component. If you change the ring geometry in RingMark.tsx, change the
 * RINGS/PITH constants here to match and re-run.
 *
 * This is a BRAND asset, not a photo. It makes no claim about the business and it
 * is not a substitute for the real job photos still missing from public/photos/.
 */
import sharp from 'sharp'
import { writeFileSync } from 'node:fs'

const BARK = '#1A1512'
const SAWDUST = '#F4EFE6'
const BLAZE = '#E4610F'

const PITH_X = 57
const PITH_Y = 43
const RINGS = [3.5, 7, 9.5, 14, 19, 21, 27, 34, 39, 47, 55, 64, 74, 85]

/** The ring mark as a standalone <g>, in a 100x100 coordinate space. */
function ringGroup(color, strokeBase = 1.5, idSuffix = 'a') {
  const circles = RINGS.map(
    (r, i) =>
      `<circle cx="${PITH_X}" cy="${PITH_Y}" r="${r}" fill="none" stroke="${color}" stroke-width="${(
        strokeBase * (i % 3 === 0 ? 1.25 : 0.8)
      ).toFixed(2)}" opacity="${Math.max(0.2, 0.85 - i * 0.028).toFixed(3)}"/>`,
  ).join('')

  return `
    <defs><clipPath id="clip-${idSuffix}"><circle cx="50" cy="50" r="48"/></clipPath></defs>
    <g clip-path="url(#clip-${idSuffix})">
      ${circles}
      <circle cx="${PITH_X}" cy="${PITH_Y}" r="1.4" fill="${color}" opacity="0.9"/>
      <path d="M ${PITH_X} ${PITH_Y} L ${PITH_X - 30} ${PITH_Y + 54} L ${PITH_X - 25} ${
        PITH_Y + 55
      } Z" fill="${color}" opacity="0.55"/>
    </g>
    <circle cx="50" cy="50" r="48" fill="none" stroke="${color}" stroke-width="${(
      strokeBase * 1.6
    ).toFixed(2)}"/>`
}

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${BARK}"/>
  <g transform="translate(50 50) scale(0.82) translate(-50 -50)">${ringGroup(BLAZE, 1.5, 'logo')}</g>
</svg>`

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BARK}"/>
  <g transform="translate(840 60) scale(5.4)" opacity="0.10">${ringGroup(SAWDUST, 0.9, 'og')}</g>
  <text x="80" y="180" font-family="Barlow Condensed, Barlow, Impact, sans-serif" font-size="42" font-weight="700" fill="${BLAZE}" letter-spacing="6">BATTLE CREEK, MI</text>
  <text x="80" y="290" font-family="Barlow Condensed, Barlow, Impact, sans-serif" font-size="76" font-weight="800" fill="${SAWDUST}">TREE REMOVAL,</text>
  <text x="80" y="372" font-family="Barlow Condensed, Barlow, Impact, sans-serif" font-size="76" font-weight="800" fill="${SAWDUST}">TRIMMING &amp;</text>
  <text x="80" y="454" font-family="Barlow Condensed, Barlow, Impact, sans-serif" font-size="76" font-weight="800" fill="${SAWDUST}">STUMP GRINDING</text>
  <rect x="80" y="502" width="120" height="7" fill="${BLAZE}"/>
  <text x="80" y="566" font-family="Barlow, Helvetica, sans-serif" font-size="34" font-weight="600" fill="#BFB3A2">Crews Local Services</text>
</svg>`

await sharp(Buffer.from(logoSvg)).png().toFile('public/logo.png')
await sharp(Buffer.from(ogSvg)).png().toFile('public/og.png')

// The favicon and any in-app use come from the vector directly.
writeFileSync(
  'app/icon.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="${BARK}"/><g transform="translate(50 50) scale(0.82) translate(-50 -50)">${ringGroup(
    BLAZE,
    2.2,
    'fav',
  )}</g></svg>`,
)

/**
 * A real .ico for /favicon.ico.
 *
 * app/icon.svg covers modern browsers, but plenty of crawlers, feed readers and
 * older clients request /favicon.ico by path regardless of what the HTML declares,
 * and a 404 there shows up in the console on every page load. Vista-era ICO can
 * embed PNG payloads directly, so this wraps two PNGs in an ICO container rather
 * than pulling in an ico-encoding dependency.
 */
const icoSizes = [32, 48]
const icoPngs = await Promise.all(
  icoSizes.map((size) =>
    sharp(Buffer.from(logoSvg)).resize(size, size).png().toBuffer(),
  ),
)

const HEADER = 6
const ENTRY = 16
const dir = Buffer.alloc(HEADER + ENTRY * icoPngs.length)
dir.writeUInt16LE(0, 0) // reserved
dir.writeUInt16LE(1, 2) // type: icon
dir.writeUInt16LE(icoPngs.length, 4)

let offset = HEADER + ENTRY * icoPngs.length
icoPngs.forEach((png, i) => {
  const at = HEADER + ENTRY * i
  // 256 is encoded as 0; our sizes are well under that.
  dir.writeUInt8(icoSizes[i], at)
  dir.writeUInt8(icoSizes[i], at + 1)
  dir.writeUInt8(0, at + 2) // palette count
  dir.writeUInt8(0, at + 3) // reserved
  dir.writeUInt16LE(1, at + 4) // colour planes
  dir.writeUInt16LE(32, at + 6) // bits per pixel
  dir.writeUInt32LE(png.length, at + 8)
  dir.writeUInt32LE(offset, at + 12)
  offset += png.length
})

writeFileSync('app/favicon.ico', Buffer.concat([dir, ...icoPngs]))

// iOS home-screen icon.
await sharp(Buffer.from(logoSvg)).resize(180, 180).png().toFile('app/apple-icon.png')

console.log(
  'wrote public/logo.png (512x512), public/og.png (1200x630), app/icon.svg, app/favicon.ico (32+48), app/apple-icon.png (180x180)',
)
