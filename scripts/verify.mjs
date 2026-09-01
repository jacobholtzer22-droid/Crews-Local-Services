/**
 * Phase 5 verification. Runs against the PRERENDERED HTML in .next/server/app,
 * i.e. exactly what a crawler with no JavaScript receives.
 *
 * Run: npm run build && npm run verify
 *
 * Four independent checks, each of which can fail the run:
 *   1. SSR content        — title, description, canonical, exactly one H1, phone, city
 *   2. JSON-LD            — parses, real schema.org types only, no banned nodes,
 *                           no fact absent from site.config.ts
 *   3. Forbidden strings  — unearned claims ("insured", "24/7"), placeholder text,
 *                           and the fake schema types other tree sites emit
 *   4. Outstanding TODOs  — reported, not failed
 *
 * ⛔ THIS IS A PRODUCTION DEPLOY GATE. It runs as `postbuild`, so it is part of
 * `npm run build`, which is what Vercel runs.
 *
 * It only ever FAILS the build on a Vercel PRODUCTION deploy
 * (process.env.VERCEL_ENV === 'production'). Locally and on preview deploys it
 * prints the identical report with FAIL relabelled WARN, and exits 0.
 *
 * Why the split: the two gated conditions are invisible on the rendered page, so
 * only a build failure catches them before they reach a customer. But blocking
 * every local build and every preview deploy on facts we are still waiting for
 * from the client makes the site impossible to work on and impossible to show
 * anyone, and a gate people route around stops being a gate. Preview keeps the
 * warning loud; production keeps the refusal absolute.
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const DIR = '.next/server/app'
const cfg = readFileSync('site.config.ts', 'utf8')
const cfgStr = (k) => cfg.match(new RegExp(`${k}:\\s*'([^']*)'`))?.[1] ?? ''
const cfgBool = (k) => new RegExp(`${k}:\\s*true`).test(cfg)

const PHONE = cfgStr('phoneDisplay')
const CITY = cfgStr('city')
const NAME = cfgStr('name')
const INSURED = cfgBool('insured')
const EMERGENCY = cfgBool('emergency')

/**
 * Vercel sets VERCEL_ENV to 'production' | 'preview' | 'development'. It is unset
 * on a local machine, which we treat exactly like preview: report, do not block.
 */
const IS_VERCEL_PRODUCTION = process.env.VERCEL_ENV === 'production'
const LABEL = IS_VERCEL_PRODUCTION ? 'FAIL' : 'WARN'

let failures = 0
const fail = (msg) => {
  failures++
  console.log(`  ${LABEL}  ${msg}`)
}
const pass = (msg) => console.log(`  pass  ${msg}`)

const files = readdirSync(DIR)
  .filter((f) => f.endsWith('.html'))
  .sort()

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&rsquo;|&#x2019;/g, '’')
    .replace(/&ldquo;/g, '“')
    .replace(/&rdquo;/g, '”')
    .replace(/&rarr;/g, '→')
    .replace(/&nbsp;/g, ' ')

const strip = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ')

// ─────────────────────────────────────────────────────────── 1. SSR CONTENT ──
console.log('\n=== 1. SSR CONTENT (no JavaScript) ===\n')

const rows = []
for (const file of files) {
  const html = readFileSync(join(DIR, file), 'utf8')
  const route = file === 'index.html' ? '/' : '/' + file.replace(/\.html$/, '')

  const title = decode(html.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? '')
  const desc = decode(
    html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '',
  )
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? ''
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) =>
    strip(m[1]).trim(),
  )
  const text = strip(html)

  rows.push({ route, title, desc, canonical, h1s, text, html })

  const is404 = route === '/_not-found'

  if (!title) fail(`${route}: no <title>`)
  if (!is404 && !desc) fail(`${route}: no meta description`)
  if (!is404 && !canonical) fail(`${route}: no canonical`)
  if (h1s.length !== 1) fail(`${route}: expected exactly 1 <h1>, found ${h1s.length}`)
  if (!text.includes(PHONE)) fail(`${route}: phone number "${PHONE}" not in rendered HTML`)
  if (!is404 && !text.includes(CITY)) fail(`${route}: city "${CITY}" not in rendered HTML`)

  // Title length is a warning, not a failure — Google truncates on pixel width,
  // not characters, so the number is a guide.
  if (title.length > 62) console.log(`  warn  ${route}: title is ${title.length} chars`)
  if (!is404 && desc && (desc.length < 120 || desc.length > 170))
    console.log(`  warn  ${route}: description is ${desc.length} chars (target 140-160)`)
}
pass(`${files.length} pages checked for title/description/canonical/H1/phone/city`)

// ───────────────────────────────────────────────────────────────── 2. JSON-LD ──
console.log('\n=== 2. JSON-LD ===\n')

/**
 * Types this site is allowed to emit. Anything else is either a typo or invented.
 * "TreeService" and "LandscapeService" are the classic invented ones — plenty of
 * competitors emit them and Google silently ignores the node.
 */
const ALLOWED_TYPES = new Set([
  'HomeAndConstructionBusiness',
  'WebSite',
  'Organization',
  'BreadcrumbList',
  'ListItem',
  'Service',
  'FAQPage',
  'Question',
  'Answer',
  'PostalAddress',
  'GeoCoordinates',
  'OpeningHoursSpecification',
  'City',
  'OfferCatalog',
  'Offer',
])

/** Never allowed, for reasons documented in lib/schema.ts and content/reviews.ts. */
const BANNED_TYPES = new Set([
  'Review',
  'AggregateRating',
  'Rating',
  'TreeService',
  'LandscapeService',
])

const collectTypes = (node, out = new Set()) => {
  if (Array.isArray(node)) {
    node.forEach((n) => collectTypes(n, out))
  } else if (node && typeof node === 'object') {
    if (typeof node['@type'] === 'string') out.add(node['@type'])
    if (Array.isArray(node['@type'])) node['@type'].forEach((t) => out.add(t))
    Object.values(node).forEach((v) => collectTypes(v, out))
  }
  return out
}

const schemaTable = []
for (const row of rows) {
  const blocks = [
    ...row.html.matchAll(
      /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].map((m) => m[1].replace(/\\u003c/g, '<'))

  const types = new Set()
  let parsed = 0

  for (const raw of blocks) {
    let data
    try {
      data = JSON.parse(raw)
    } catch (e) {
      fail(`${row.route}: JSON-LD does not parse — ${e.message}`)
      continue
    }
    parsed++

    if (!data['@context']) fail(`${row.route}: JSON-LD block missing @context`)
    if (!data['@type'] && !data['@graph'])
      fail(`${row.route}: JSON-LD block has neither @type nor @graph`)

    for (const t of collectTypes(data)) {
      types.add(t)
      if (BANNED_TYPES.has(t)) fail(`${row.route}: BANNED schema type "${t}"`)
      else if (!ALLOWED_TYPES.has(t)) fail(`${row.route}: unrecognised schema type "${t}"`)
    }

    // Every FAQ question and answer in schema must be visible on the page.
    const walkFaq = (n) => {
      if (Array.isArray(n)) return n.forEach(walkFaq)
      if (!n || typeof n !== 'object') return
      if (n['@type'] === 'Question') {
        const q = String(n.name ?? '')
        const a = String(n.acceptedAnswer?.text ?? '')
        if (q && !row.text.includes(q))
          fail(`${row.route}: FAQ question in schema but not visible: "${q.slice(0, 50)}"`)
        if (a && !row.text.includes(a.slice(0, 60)))
          fail(`${row.route}: FAQ answer in schema but not visible: "${a.slice(0, 50)}"`)
      }
      Object.values(n).forEach(walkFaq)
    }
    walkFaq(data)

    // No schema may assert a phone number other than the configured one.
    const phones = [...raw.matchAll(/"telephone":"([^"]+)"/g)].map((m) => m[1])
    for (const p of phones) {
      if (p.replace(/\D/g, '').slice(-10) !== PHONE.replace(/\D/g, '').slice(-10))
        fail(`${row.route}: schema telephone "${p}" does not match site.config.ts`)
    }
  }

  schemaTable.push({ route: row.route, blocks: parsed, types: [...types].sort() })
}

console.log(
  '\n  ROUTE'.padEnd(28) + 'BLOCKS'.padEnd(9) + 'TYPES',
)
console.log('  ' + '─'.repeat(110))
for (const r of schemaTable) {
  console.log(
    '  ' + r.route.padEnd(26) + String(r.blocks).padEnd(9) + r.types.join(', '),
  )
}

// ──────────────────────────────────────────────────────── 3. FORBIDDEN STRINGS ──
console.log('\n=== 3. FORBIDDEN STRINGS + DEPLOY GATES ===\n')

const forbidden = [
  { re: /\blicensed\b/i, why: 'Michigan does not license tree services' },
  ...(INSURED ? [] : [{ re: /\binsured\b/i, why: 'SITE.insured is false' }]),
  ...(EMERGENCY
    ? []
    : [
        { re: /24\/7/, why: 'SITE.emergency is false' },
        { re: /\bemergenc(y|ies)\b/i, why: 'SITE.emergency is false' },
      ]),
  { re: /\blorem\b/i, why: 'placeholder text' },
  { re: /\bplaceholder\b/i, why: 'placeholder text' },
  { re: /\bcoming soon\b/i, why: 'placeholder text' },
  // The placeholder domain is handled separately below — it has one root cause
  // and reporting it once per page buries everything else.
  { re: /\bTODO\b(?!\.example\.com)/, why: 'TODO marker leaked into rendered output' },
  { re: /TreeService/, why: 'invented schema.org type' },
  { re: /\b\d+\+?\s+years\b/i, why: 'SITE.yearsInBusiness is null' },
]

let forbiddenHits = 0
for (const row of rows) {
  // Search the rendered TEXT plus the JSON-LD, not raw HTML: class names and
  // build hashes produce false positives that train you to ignore this check.
  const ld = [
    ...row.html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ]
    .map((m) => m[1])
    .join(' ')
  const haystack = `${row.text} ${decode(ld)}`

  for (const f of forbidden) {
    const m = haystack.match(f.re)
    if (m) {
      forbiddenHits++
      const i = haystack.indexOf(m[0])
      fail(
        `${row.route}: "${m[0]}" (${f.why}) — …${haystack.slice(Math.max(0, i - 45), i + 45)}…`,
      )
    }
  }
}
// ── DEPLOY GATES ───────────────────────────────────────────────────────────
// Two conditions that must never reach production. Both are invisible on the
// rendered page, so nothing but a build failure catches them.

// 1. Empty CRM slug. lib/submit-estimate.ts refuses to POST without it, so the
//    form fails closed rather than losing leads silently — but a site whose only
//    conversion path is a dead form should not deploy at all.
if (!cfgStr('businessSlug')) {
  fail(
    'SITE.businessSlug is EMPTY. The estimate form cannot submit, so the site has no working ' +
      'lead path. Create the Business row in the Align and Acquire CRM and set the slug in site.config.ts.',
  )
}

// 2. Placeholder domain, reported once with its blast radius rather than once
//    per page. Shipping it puts a dead hostname into every canonical, every OG
//    image URL and every schema @id on the site.
const placeholderPages = rows.filter((r) => r.html.includes('TODO.example.com'))
if (placeholderPages.length > 0) {
  fail(
    `placeholder domain "https://TODO.example.com" appears in ${placeholderPages.length}/${rows.length} pages ` +
      `(canonicals, OG image URLs, schema @id, sitemap, llms.txt). Set SITE.url in site.config.ts.`,
  )
}

if (forbiddenHits === 0)
  pass(`0 forbidden strings across ${rows.length} pages (${forbidden.length} patterns)`)

// ─────────────────────────────────────────────────────────────── 4. TODO LIST ──
console.log('\n=== 4. OUTSTANDING TODO / CONFIRM (reported, not failed) ===\n')

const openItems = []
if (!cfgStr('businessSlug')) openItems.push(['BLOCKER', 'businessSlug is empty', 'site.config.ts → lib/submit-estimate.ts refuses to submit'])
if (cfgStr('url').includes('TODO')) openItems.push(['BLOCKER', 'url is a placeholder', 'site.config.ts → canonicals, sitemap, JSON-LD @id, OG image URLs'])
if (!cfgStr('email')) openItems.push(['TODO', 'email is empty', 'site.config.ts → footer + privacy page omit it'])
if (!cfg.match(/facebook:\s*'[^']+'/)) openItems.push(['TODO', 'social.facebook is empty', 'site.config.ts → omitted from schema sameAs'])
if (/hours:\s*null/.test(cfg)) openItems.push(['TODO', 'hours is null', 'site.config.ts → footer hours + openingHoursSpecification omitted'])
if (/yearsInBusiness:\s*null/.test(cfg)) openItems.push(['TODO', 'yearsInBusiness is null', 'site.config.ts → trust strip item omitted'])
if (!INSURED) openItems.push(['TODO', 'insured is false', 'site.config.ts → trust strip + "Are you insured?" FAQ both hidden'])
if (!cfg.match(/geo:\s*\{/)) openItems.push(['TODO', 'geo is null', 'site.config.ts → GeoCoordinates omitted from schema'])
if (readFileSync('content/reviews.ts', 'utf8').includes('export const REVIEWS: Review[] = []'))
  openItems.push(['TODO', 'no real Google reviews', 'content/reviews.ts → reviews section renders nothing at all'])
if (readdirSync('public/photos').filter((f) => !f.startsWith('README')).length === 0)
  openItems.push(['TODO', 'no photos', 'public/photos/ → every PhotoSlot renders the end-grain panel'])

console.log('  ' + 'STATUS'.padEnd(10) + 'ITEM'.padEnd(32) + 'WHERE IT BITES')
console.log('  ' + '─'.repeat(110))
for (const [status, item, where] of openItems) {
  console.log('  ' + status.padEnd(10) + item.padEnd(32) + where)
}

// ───────────────────────────────────────────────────────────────────── RESULT ──
console.log('')
console.log(
  `environment: VERCEL_ENV=${process.env.VERCEL_ENV ?? '(unset, treated as local)'} ` +
    `-> problems are ${IS_VERCEL_PRODUCTION ? 'BLOCKING' : 'non-blocking warnings'}`,
)

if (failures > 0) {
  if (IS_VERCEL_PRODUCTION) {
    console.error(
      `VERIFY FAILED: ${failures} problem(s). This is a production deploy, so the build ` +
        `is blocked. Fix the items above (or the BLOCKERs in the table) and redeploy.`,
    )
    process.exit(1)
  }
  console.warn(
    `VERIFY WARNED: ${failures} problem(s). Not a production deploy, so the build ` +
      `continues. These WILL block a production deploy until they are fixed.`,
  )
  process.exit(0)
}
console.log(
  `VERIFY PASSED: ${rows.length} pages, 0 problems, ${openItems.length} open TODO/CONFIRM item(s).`,
)
