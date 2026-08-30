/**
 * SINGLE SOURCE OF TRUTH for every business fact on this site.
 *
 * Rules that keep this file honest:
 *  - Nothing here may be guessed. Every value traces to a real source (the Google
 *    Business Profile, Brandon directly, or a directory listing noted in seo/FACTS.md).
 *  - A fact we do not have is `null` / `''` / `false`, and the UI renders NOTHING for it.
 *    It never renders a plausible placeholder. A wrong claim on a contractor's site is
 *    worse than a missing one: "insured" and "24/7" are promises customers act on.
 *  - `businessSlug` is hardcoded, never an env var. `NEXT_PUBLIC_*` bakes in at build
 *    time anyway, so an env var buys nothing and adds a way to deploy a broken form.
 *
 * Anything marked CONFIRM is a real sourced value being used provisionally until the
 * Google Business Profile settles it. See seo/FACTS.md for the source of each one.
 */
export const SITE = {
  /**
   * Align and Acquire CRM tenant slug. The contact form POSTs this to
   * https://www.alignandacquire.com/api/contact.
   *
   * ⛔ EMPTY ON PURPOSE — as of 2026-08-30 no Crews row exists in the CRM database
   * (queried directly; 21 businesses, no name/slug match on "crew"). Jacob must create
   * the Business row and paste the exact slug here. Until then the form refuses to
   * submit and tells the customer to call instead — a visible failure, never a silent one.
   */
  businessSlug: '',

  // ── Identity ────────────────────────────────────────────────────────────────
  /** CONFIRM against GBP. Display shortening of the legal name below. */
  name: 'Crews Local Services',
  /** Sourced: Networx listing. */
  legalName: 'Crews Local Services LLC',
  owner: 'Brandon Crew',

  // ── Contact ─────────────────────────────────────────────────────────────────
  /**
   * CONFIRM. Sourced from Yahoo Local (Yelp feed). Note: 231 is a northern/western
   * Michigan area code; Battle Creek is 269. Plausible if Brandon moved, but it is
   * also what a bad directory scrape looks like, and a non-local area code costs
   * trust on a local search. Verify against the GBP before launch.
   */
  phoneDisplay: '(231) 729-1915',
  phoneE164: '+12317291915',
  /** Only true if the number above can actually receive texts. Gates the mobile Text button. */
  smsEnabled: false,
  /** TODO — no email supplied. Footer and privacy page omit it entirely while empty. */
  email: '',

  /** TODO — no domain supplied. Phase 5 flags this; canonicals and sitemap depend on it. */
  url: 'https://TODO.example.com',

  // ── Place ───────────────────────────────────────────────────────────────────
  city: 'Battle Creek',
  state: 'MI',
  zip: '49015',
  /** Service-area business: no published street address. Confirmed "none" by Jacob. */
  streetAddress: null as string | null,
  /** TODO — no coordinates supplied. Omitted from schema entirely while null. */
  geo: null as { lat: number; lng: number } | null,

  /**
   * CONFIRM — sourced from the Networx listing, used provisionally so /service-area
   * is not an empty page. The GBP service area is canonical and overrides this.
   */
  serviceAreas: [
    'Battle Creek',
    'Bedford',
    'Ceresco',
    'Galesburg',
    'East Leroy',
    'Climax',
    'Augusta',
    'Fulton',
    'Burlington',
    'Scotts',
    'Athens',
  ] as string[],

  /**
   * TODO — null until Brandon confirms. Angi and Yahoo both self-report open 24/7
   * while Angi separately reports NO emergency service; that contradiction is not
   * something to resolve by picking one. No hours render and no
   * openingHoursSpecification is emitted while this is null.
   */
  hours: null as null | Array<{ days: string[]; open: string; close: string }>,

  // ── Claims (each one is a promise a customer acts on) ────────────────────────
  /** Not verifiable from any listing. Michigan does not license tree services, so
   *  insurance is the claim that matters — it stays off the site until confirmed. */
  insured: false,
  /** Gates every "24/7" / "emergency" phrasing site-wide. See the hours note above. */
  emergency: false,
  /** Networx says 7, Angi says 6, oldest Angi review is Nov 2022. Renders nothing while null. */
  yearsInBusiness: null as number | null,
  /** Sourced: Angi. */
  freeEstimates: true,
  /** Sourced: Angi. */
  acceptsCards: true,

  // ── Services ────────────────────────────────────────────────────────────────
  services: ['tree-removal', 'tree-trimming', 'stump-grinding', 'storm-damage-cleanup'] as const,
  /**
   * Networx also lists mowing, power washing, deck staining, painting, gutters, leaf
   * removal, snow removal and junk removal. Deliberately EMPTY: this site positions
   * Crews as a tree service, and a scattered service list dilutes both the ranking
   * signal and the customer's read on what Brandon actually does.
   */
  secondaryServices: [] as string[],

  // ── Social ──────────────────────────────────────────────────────────────────
  /** TODO both. A Facebook page exists (Networx links a share URL) but the real page
   *  URL is unknown. Only non-empty values are emitted into schema `sameAs`. */
  social: { facebook: '', google: '' },

  // ── Tracking ────────────────────────────────────────────────────────────────
  /** Jacob: "skip, tracking stays null." No gtag script loads while gtagId is null. */
  tracking: {
    gtagId: null as string | null,
    formSubmitLabel: null as string | null,
    clickToCallLabel: null as string | null,
  },

  /** "Website by Align and Acquire" credit in the footer. */
  agencyCredit: true,
} as const

export type ServiceSlug = (typeof SITE.services)[number]

/** Convenience: `tel:` href built from the E.164 number so no page hardcodes it. */
export const TEL_HREF = `tel:${SITE.phoneE164}`

/** Convenience: `sms:` href, only meaningful when SITE.smsEnabled. */
export const SMS_HREF = `sms:${SITE.phoneE164}`

/** "Battle Creek, MI" — used in headings, metadata and schema so it can never drift. */
export const CITY_STATE = `${SITE.city}, ${SITE.state}`
