# HANDOFF — Crews Local Services

Next.js 14 App Router, TypeScript, Tailwind. Every page is static (SSG); the only network
call the site makes is the browser POST from the estimate form.

## What's built

- 10 pages: home, 4 service pages, about, service area, free estimate, privacy, 404
- Estimate form → `POST https://www.alignandacquire.com/api/contact` (direct from the
  browser; verifies `"success":true`, retries 3× on throw/5xx, every failure shows the phone)
- Metadata + JSON-LD (HomeAndConstructionBusiness, WebSite, Organization, BreadcrumbList,
  Service, FAQPage), robots.txt with AI crawlers, sitemap.xml, llms.txt
- Brand assets generated from the ring mark: logo, OG image, favicon, apple icon
- Lighthouse mobile: perf 96, a11y 100, best practices 100, SEO 100, CLS 0

## ⛔ Two blockers — a PRODUCTION deploy cannot succeed until both are fixed

`npm run verify` runs as `postbuild`. It warns and exits 0 locally and on preview deploys,
and fails the build only when `VERCEL_ENV=production`, so neither of these reaches a customer:

1. **`SITE.businessSlug` is empty.** No Crews row exists in the Align and Acquire CRM
   (verified by direct query, 2026-08-30). Create the Business row and copy the slug
   character-for-character into `site.config.ts`. Without it the form refuses to submit.
2. **`SITE.url` is `https://TODO.example.com`.** Set the real domain (with `www`).

## Commands

    npm run dev / build / start     # build runs the verify gate (see above)
    npm run verify                  # the gate on its own
    npm run contrast                # WCAG check, 18 pairs
    npm run typecheck / lint
    npm run assets                  # regenerate logo/OG/favicon from the ring geometry
    npm run llms                    # regenerate public/llms.txt

## Facts still needed from Brandon

Everything below renders **nothing** until set — the site never guesses. Full provenance
for each one is in `seo/FACTS.md`.

| Set in `site.config.ts` | Effect when set |
|---|---|
| `insured: true` | Trust-strip item + "Are you insured?" FAQ both appear |
| `yearsInBusiness: 7` | Trust-strip item appears (sources disagree: 6 vs 7) |
| `hours: [...]` | Footer hours + `openingHoursSpecification` in schema |
| `emergency: true` | Un-gates all 24/7 language (currently blocked site-wide) |
| `smsEnabled: true` | "Text" button appears in the mobile bar |
| `email`, `social.facebook` | Footer/privacy contact, schema `sameAs` |
| `geo: {lat,lng}` | `GeoCoordinates` in schema |
| `phoneDisplay` / `phoneE164` | **CONFIRM: 231 is not a Battle Creek area code (269 is)** |
| `name` / `serviceAreas` | Must match the GBP exactly; areas are currently the Networx list |

**Wood haul-off policy** — not evidenced anywhere, so 24 copy locations promise nothing
about material leaving the site. `seo/FACTS.md` lists every affected string.

## Where to drop things

- **Photos** → `public/photos/`. Real photos only, never stock. Until then every photo slot
  renders the end-grain panel and the hero is weak: highest-value item after the blockers.
  Swap `PhotoSlot` for `next/image` with explicit width/height (CLS); alt text already written.
- **Google reviews** → `content/reviews.ts`, verbatim, first name + source. The section
  renders nothing while empty — no fallback, by design. **Never add Review or
  AggregateRating schema**; self-serving review markup breaks Google's guidelines.

## Deliberate decisions, not omissions

- **No Turnstile.** Platform-level: no client site emits a token and the keys are absent
  from production, so a widget here is dead weight.
- **No per-town pages.** Ten near-identical pages differing by a swapped town name is thin
  content and a liability. Revisit only with genuinely town-specific material.
- **No secondary services** (mowing, gutters, snow, junk removal — all on Networx): the
  site positions Crews as a tree service and a scattered list dilutes the ranking signal.
- **Alpha text colours are banned.** Use the solid `ink-soft` / `ink-muted` / `ink-faint`
  tokens. `text-ink/60` shipped once and failed contrast on the darker light surface.

## Phase 2 options

Per-town pages (with real local content), before/after gallery, secondary-services page,
Google Ads conversion labels (`data-cta="call"` is already on every tel: link, so gtag is
a one-file change), Search Console verification + sitemap submission.
