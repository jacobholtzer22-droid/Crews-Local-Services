/**
 * Generates public/llms.txt from site.config.ts and content/, so it can never
 * describe a site different from the one that shipped.
 *
 * Future-proofing, not a headline item — llms.txt is a proposed convention, not a
 * standard anyone is required to honour. The real work for AI answer engines is
 * the on-page content and the JSON-LD; this is cheap insurance on top.
 *
 * Run: npm run llms  (also run by npm run assets:all)
 */
import { readFileSync, writeFileSync } from 'node:fs'

const cfg = readFileSync('site.config.ts', 'utf8')
const pick = (key) => cfg.match(new RegExp(`${key}:\\s*'([^']*)'`))?.[1] ?? ''

const NAME = pick('name')
const CITY = pick('city')
const STATE = pick('state')
const PHONE = pick('phoneDisplay')
const URL = pick('url')

const services = [...readFileSync('content/services.ts', 'utf8').matchAll(
  /slug: '([^']+)',\s*\n\s*label: '([^']+)',\s*\n\s*noun: '([^']+)',\s*\n\s*summary:\s*\n?\s*'([^']+)'/g,
)].map(([, slug, , noun, summary]) => ({ slug, noun, summary }))

if (services.length === 0) {
  console.error('llms.txt: parsed 0 services from content/services.ts — refusing to write a file that describes nothing.')
  process.exit(1)
}

const out = `# ${NAME}

> Tree service in ${CITY}, ${STATE}. Tree removal, tree trimming, stump grinding and
> storm damage cleanup for homeowners in ${CITY} and the surrounding towns.
> Free on-site estimates. Phone: ${PHONE}

## Services

${services.map((s) => `- [${s.noun}](${URL}/${s.slug}): ${s.summary}`).join('\n')}

## Pages

- [Home](${URL}/): Overview, how it works, common questions.
- [Free Estimate](${URL}/free-estimate): Request form for a free on-site estimate.
- [Service Area](${URL}/service-area): Towns covered around ${CITY}.
- [About](${URL}/about): Who runs the business.
- [Privacy Policy](${URL}/privacy): How enquiry information is handled.

## Notes

- Estimates are free, done in person, and carry no obligation.
- Prices are not published: they depend on the size of the tree, what is beneath
  it, access for equipment, and proximity to wires or structures.
- For a downed power line or a tree contacting a line, the electric utility must
  make it safe first.
`

writeFileSync('public/llms.txt', out)
console.log(`wrote public/llms.txt (${services.length} services)`)
