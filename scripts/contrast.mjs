/**
 * WCAG 2.1 contrast checker for the palette in tailwind.config.ts.
 *
 * Run: npm run contrast
 *
 * This exists because "it looks fine" is not a contrast test. Safety orange in
 * particular reads as high-contrast to the eye while measuring poorly against
 * white — which is why CTA buttons on this site use dark text on orange rather
 * than the white-on-orange every other contractor site ships.
 *
 * Exits non-zero if any REQUIRED pair fails, so it can gate a build.
 */

const PALETTE = {
  bark: '#1A1512',
  'bark-700': '#2E2620',
  'bark-500': '#4A3F36',
  sawdust: '#F4EFE6',
  'sawdust-dim': '#E6DDCD',
  'sawdust-muted': '#BFB3A2',
  blaze: '#E4610F',
  'blaze-hover': '#C8520B',
  moss: '#4A5D3A',
  'moss-dim': '#6E8256',
  ink: '#14100D',
  'ink-soft': '#3E3933',
  'ink-muted': '#5E5850',
  'ink-faint': '#726C63',
}

/**
 * Alpha-modified foregrounds.
 *
 * These are the ones that bite. Tailwind's `text-ink/60` is not the `ink` token —
 * it is ink composited over whatever is behind it, and the palette passing says
 * nothing about whether the 60% variant does. Lighthouse caught two failures here
 * that this script originally missed because it only tested solid tokens.
 *
 * [foregroundToken, alphaPercent, backgroundToken, label, minRatio]
 */
const ALPHA_PAIRS = []

/** [foreground, background, label, minimum ratio] */
const PAIRS = [
  ['ink', 'sawdust', 'Body text on light surface', 4.5],
  ['ink', 'sawdust-dim', 'Body text on secondary light surface', 4.5],
  ['bark', 'blaze', 'CTA button label on safety orange', 4.5],
  ['sawdust', 'bark', 'Body text on dark surface', 4.5],
  ['sawdust', 'bark-700', 'Body text on elevated dark surface', 4.5],
  ['sawdust-muted', 'bark', 'Secondary text on dark surface', 4.5],
  ['sawdust-muted', 'bark-700', 'Secondary text on elevated dark', 4.5],
  ['moss', 'sawdust', 'Accent text / icons on light', 4.5],
  ['blaze', 'bark', 'Orange eyebrow + links on dark', 4.5],
  ['moss-dim', 'bark', 'Muted green accent on dark', 3.0],
  ['blaze', 'sawdust', 'Orange on light (LARGE TEXT / borders only)', 3.0],
  ['bark-500', 'bark', 'Border on dark surface (non-text)', 1.4],
  ['sawdust-dim', 'sawdust', 'Border on light surface (non-text)', 1.15],

  // Secondary text tokens, checked against sawdust-dim — the DARKER of the two
  // light surfaces and therefore the harder test. Passing here means passing on
  // sawdust too, which is why these replaced the old text-ink/NN opacity classes.
  ['ink-soft', 'sawdust-dim', 'Secondary body text on dim surface', 4.5],
  ['ink-soft', 'sawdust', 'Secondary body text on light surface', 4.5],
  ['ink-muted', 'sawdust-dim', 'Captions / small print on dim surface', 4.5],
  ['ink-muted', 'sawdust', 'Captions / small print on light surface', 4.5],
  ['ink-faint', 'sawdust', 'Input placeholder (3:1 bar for placeholders)', 3.0],
]

const srgb = (c) => {
  const v = c / 255
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
}

function luminance(hex) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)
}

function ratio(a, b) {
  const l1 = luminance(a)
  const l2 = luminance(b)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}

/** Composite `hex` at `alpha` over `bg` — what the eye and Lighthouse actually see. */
function composite(hex, alpha, bg) {
  const h = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
  const [fr, fg_, fb] = h(hex)
  const [br, bg_, bb] = h(bg)
  const a = alpha / 100
  const mix = (f, b) => Math.round(f * a + b * (1 - a))
  const to2 = (n) => n.toString(16).padStart(2, '0')
  return `#${to2(mix(fr, br))}${to2(mix(fg_, bg_))}${to2(mix(fb, bb))}`
}

const rows = [
  ...PAIRS.map(([fg, bg, label, min]) => {
    const r = ratio(PALETTE[fg], PALETTE[bg])
    return { fg, bg, label, min, ratio: r, pass: r >= min }
  }),
  ...ALPHA_PAIRS.map(([fg, alpha, bg, label, min]) => {
    const composited = composite(PALETTE[fg], alpha, PALETTE[bg])
    const r = ratio(composited, PALETTE[bg])
    return { fg: `${fg}/${alpha}`, bg, label, min, ratio: r, pass: r >= min }
  }),
]

const w = (s, n) => String(s).padEnd(n)
console.log('')
console.log(
  w('FOREGROUND', 15) + w('BACKGROUND', 15) + w('RATIO', 9) + w('MIN', 7) + w('', 7) + 'USE',
)
console.log('─'.repeat(112))
for (const r of rows) {
  console.log(
    w(`${r.fg}`, 15) +
      w(`${r.bg}`, 15) +
      w(`${r.ratio.toFixed(2)}:1`, 9) +
      w(`${r.min.toFixed(2)}`, 7) +
      w(r.pass ? 'PASS' : 'FAIL', 7) +
      r.label,
  )
}

const failed = rows.filter((r) => !r.pass)
console.log('')
if (failed.length) {
  console.error(`${failed.length} pair(s) below the required ratio.`)
  process.exit(1)
}
console.log(`All ${rows.length} pairs meet their required ratio.`)
