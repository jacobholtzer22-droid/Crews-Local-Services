# FACTS — Crews Local Services

Every business fact on this site traces to a row in this file. If it is not here and
not in `site.config.ts`, it does not go on the site.

Last updated: 2026-08-30 (Phase 1)

## Status legend

- **CONFIRMED** — Brandon or Jacob stated it directly.
- **CONFIRM** — sourced from a real directory listing and used provisionally. The
  Google Business Profile is canonical and overrides it.
- **TODO** — unknown. Renders nothing. Never guessed.

---

## Blockers (site cannot launch)

| Fact | Status | Where it is used | Note |
|---|---|---|---|
| `businessSlug` | **TODO — BLOCKER** | `site.config.ts:businessSlug`, Phase 3 form POST | As of 2026-08-30 there is **no Crews row in the Align and Acquire CRM database**. Queried directly: 21 businesses, no name or slug match on "crew". Jacob must create the Business row and paste the exact slug. Without it `/api/contact` returns 404, the lead is never stored, and the CRM fires its throttled dropped-lead alert instead. The form refuses to submit while this is empty. |
| `url` (domain) | **TODO — BLOCKER** | `site.config.ts:url`; canonicals, sitemap, JSON-LD `@id`, OG URLs | Currently the placeholder `https://TODO.example.com`. Phase 5 flags it. |

## Contact

| Fact | Value | Status | Source |
|---|---|---|---|
| Phone | (231) 729-1915 | **CONFIRM** | Yahoo Local (Yelp feed), 2026-08-30. ⚠️ 231 is a northern/western Michigan area code; Battle Creek is **269**. Plausible if Brandon moved, but it is also exactly what a bad directory scrape looks like, and a non-local area code costs trust on a local search. Verify against the GBP. Also decide: this number or a Telnyx tracking number? GBP and site must match. |
| `smsEnabled` | false | **TODO** | Unknown whether the number receives texts. The mobile Text button is hidden while false — a text to a landline vanishes and the customer never learns it did. |
| Email | — | **TODO** | Not supplied. Footer and privacy page omit it entirely. |

## Identity

| Fact | Value | Status | Source |
|---|---|---|---|
| Display name | Crews Local Services | **CONFIRM** | Display shortening of the legal name. Directories disagree: "Crews Local Services LLC" (Networx), "Crews Local Service" (Angi, HomeAdvisor, Yahoo), "Crewslocalservice" (Yelp). **The exact GBP name is canonical** and must match the site and the schema character for character. |
| Legal name | Crews Local Services LLC | **CONFIRM** | Networx listing. |
| Owner | Brandon Crew | **CONFIRMED** | Jacob. |

## Place

| Fact | Value | Status | Source |
|---|---|---|---|
| City / State / ZIP | Battle Creek, MI 49015 | **CONFIRM** | Networx, Yahoo, Angi all agree. |
| Street address | none | **CONFIRMED** | Jacob: service-area business, no published street address. Angi shows 442 Washington Ave South; it is **not** published on the site and **not** in the schema. |
| Geo coordinates | — | **TODO** | Omitted from schema entirely while null. |
| Service areas | Battle Creek, Bedford, Ceresco, Galesburg, East Leroy, Climax, Augusta, Fulton, Burlington, Scotts, Athens | **CONFIRM** | Networx listing. Used provisionally so `/service-area` is not an empty page. Reviews also reference Concord, Hillsdale, Reading and Vicksburg; Yelp files the business under Coldwater/Sturgis. **The GBP service area is canonical.** |

## Hours and availability

| Fact | Value | Status | Source |
|---|---|---|---|
| Hours | null | **TODO** | Angi and Yahoo both self-report open all day every day. Angi **separately reports NO emergency services**. That is a direct contradiction and it is not resolved by picking the more flattering one. No hours render and no `openingHoursSpecification` is emitted while null. |
| `emergency` | false | **TODO** | Gates every "24/7" and "emergency" phrasing site-wide. `/storm-damage-cleanup` says "call first and we'll tell you how fast we can get there" instead. Phase 5 greps for violations. |

## Claims

| Fact | Value | Status | Source |
|---|---|---|---|
| `insured` | false | **TODO** | Not verifiable from any listing. Michigan does not license tree services, so **insurance is the claim that matters** to a homeowner letting someone drop a limb next to their roof. It stays off the site entirely until Brandon confirms. The "Are you insured?" FAQ only appears when this is true. |
| `yearsInBusiness` | null | **TODO** | Networx says 7, Angi says 6, oldest Angi review is Nov 2022. Three sources, three answers. Renders nothing. |
| Free estimates | true | **CONFIRM** | Angi. |
| Accepts cards | true | **CONFIRM** | Angi. |
| **Wood haul-off policy** | — | **TODO** | **Does Brandon take the wood, brush and stump chips off the site, and is it included or charged separately?** Not evidenced anywhere. Every mention of disposal in the site copy was rewritten to promise nothing: the site says cleanup and raking are part of the job (which the review themes do evidence) and that what happens to the wood is *settled on the estimate*. Once Brandon confirms, the copy can state it plainly — the affected strings are the tree-removal summary/description/intro/`whatsIncluded`/`priceFactors`/`onTheDay`/FAQ, the trimming `whatsIncluded` and cleanup FAQ, the stump-grinding chips copy, the storm summary/description/intro/`whatsIncluded`/`onTheDay`, and the homepage "How it works" step 3. |

## Reviews

| Fact | Status | Note |
|---|---|---|
| `content/reviews.ts` | **EMPTY — TODO** | The reviews section renders **nothing** while empty — no fallback, no paraphrase, no empty state. Only real Google reviews Brandon actually received go in, verbatim, with first name and source. |
| Angi/Networx paraphrases | **INTERNAL ONLY** | The themes below informed the site copy but are **not published**. We have the substance of those reviews, not their wording or their authors, so putting them on the page with a platform byline would be dressing up a paraphrase as a citation. The "Why Crews" section states the same qualities as the business's own plain claims, with no attribution. |
| Angi rating | 4.4 from 8 reviews, incl. one 1-star (June 2025) | **CONFIRM** | Not displayed. Only Google reviews Jacob pastes in get shown. |
| Google rating / count | **TODO** | From the GBP. |
| ⛔ Review / AggregateRating schema | **NEVER** | Self-serving review markup on your own site violates Google's structured data guidelines. Not a "we'll add it later" item — a permanent no. |

### Review themes safe to write copy around

These are patterns across the real reviews, and they are what the on-site copy is built
from — not invented benefits:

- Fair / reasonable pricing
- Fast turnaround (one Networx review: work done within 24 hours; an Angi review: quoted and completed in two days)
- Careful work around obstacles (Angi: two large pines removed working around wires and a wheelchair ramp)
- Thorough cleanup, down to the sawdust
- Owner is friendly and works the job himself

## Services

| Fact | Status | Source |
|---|---|---|
| Tree removal, tree trimming, stump grinding | **CONFIRM** | Yelp/Yahoo business description. |
| Storm damage cleanup | **CONFIRM** | Listing photo captioned as a fallen tree cleared at a church/daycare. |
| Full GBP services list | **TODO** | Canonical. |
| Secondary services (mowing, power washing, deck staining, painting, gutters, leaf removal, snow removal, junk removal) | **EXCLUDED** | Seen on Networx. Deliberately **not** on the site: this positions Crews as a tree service, and a scattered list dilutes both the ranking signal and the customer's read on what Brandon actually does. Add to `SITE.secondaryServices` only if Jacob decides otherwise. |

## Social

| Fact | Status | Note |
|---|---|---|
| Facebook page URL | **TODO** | A page exists (Networx links a share URL) but the real URL is unknown. Only non-empty values are emitted into schema `sameAs`. |
| Google profile URL | **TODO** | |

## Photos

| Fact | Status | Note |
|---|---|---|
| `public/photos/` | **PLACED, from the client's own listings** | Seven WebP files, all derived from the client's own published photos on their Yahoo and Networx listings. **No stock photos of other people's crews, trucks or trees, ever.** Provenance table below. These are listing-resolution (640 to 1000px); swap in the Google Business Profile originals at launch, using the table to match them up. |

### Photo provenance

Every placed photo, where it appears, and the URL it came from. All are the
client's own published images, downloaded 2026-09-01.

| File in `public/photos/` | Placed on | Source URL |
|---|---|---|
| `hero-crew-on-stump.webp` | Home hero, blurred backdrop only | `s.yimg.com/bj/68c5/68c5e666681320eea169c5b915c92a68.jpg` |
| `tree-removal-bucking-trunk.webp` | `/tree-removal` | `s.yimg.com/bj/a81d/a81db2a5ca02eb382e007a30761a2d58.jpg` |
| `tree-trimming-brush-cleared.webp` | `/tree-trimming` | `s.yimg.com/bj/536c/536c025b75ddc5a8d0ecfbfaf8d82f32.jpg` |
| `stump-grinding-fresh-stump.webp` | `/stump-grinding` | `s.yimg.com/bj/68c5/68c5e666681320eea169c5b915c92a68.jpg` |
| `storm-pine-down-playground.webp` | `/storm-damage-cleanup`, before | `s.yimg.com/bj/cf69/cf69b09b96b583f7f920bddab3870ce6.jpg` |
| `storm-playground-cleared.webp` | `/storm-damage-cleanup`, after | `s.yimg.com/bj/7f83/7f83ad74eebaa0524ba070099133f231.jpg` |
| `about-crew-bucking-hardwood.webp` | `/about` | `s.yimg.com/bj/536a/536a0268202c4ebb437d54309a17bdb3.jpg` |

**Notes for launch:**

- **No photo in the supplied set was hero-grade.** Nothing was 1200px+ wide AND tree
  work, so the hero uses the crew-on-stump shot as a pre-blurred, heavily darkened
  backdrop (8KB) rather than upscaling a 960px image into visible mush. A GBP
  original at 1600px+ makes this a real hero: replace the file and its dimensions
  in `content/photos.ts`, nothing else changes.
- **`about-crew-bucking-hardwood.webp` was rotated and levelled.** The source had no
  EXIF orientation tag and was stored 90 degrees off with a further ~12 degree tilt.
  Corrected to 78 degrees with a centre crop, verified corner by corner so no black
  rotation wedge survives.
- **Five supplied photos were rejected and are not on the site:** three show deck and
  porch carpentry rather than tree work, one shows a house with a legible street
  number, and one Networx file is a cabin exterior.
- **`public/photos/reference/` holds two files placed nowhere:** the Networx cabin
  photo, and the Networx file expected to be the client's logo, which is in fact a
  duplicate of the crew-on-stump photo. **There is no logo in the supplied set**, so
  the site keeps its built identity by default rather than by decision.

## Tracking

| Fact | Status | Note |
|---|---|---|
| Google Ads gtag + conversion labels | **SKIPPED** | Jacob: "skip, tracking stays null." No gtag script is loaded at all while `SITE.tracking.gtagId` is null. `data-cta="call"` attributes are already on every tel: link so wiring it later is a one-file change. |

## Platform decisions (not Crews gaps)

| Decision | Note |
|---|---|
| **No Turnstile** | Approved by Jacob. No form on the Align and Acquire platform or on any client site emits a Turnstile token, and `TURNSTILE_SECRET_KEY` / `TURNSTILE_ENFORCE` are absent from production. A missing token now scores zero, so a widget here would be dead weight. Platform-level, noted in HANDOFF.md. |
| **Honeypot field is `hp_7d3a_ref`** | The CRM's current honeypot name. The legacy `website` name is still accepted at the same weight but Chrome autofills it, which has killed real leads before. |
| **Direct browser POST, no server route** | The CRM sets `Access-Control-Allow-Origin: *` with an OPTIONS handler, so cross-origin works. Phase 3 ports the two protections from the proven server-side pattern into the client handler: verify the response body actually contains `"success":true` (the CRM answers 200 even when it drops a lead it cannot attribute) and retry 3× on network throw or 5xx. Final failure shows the phone number. |
