import { SERVICES, type Service } from '@/content/services'
import { visibleFaqs } from '@/components/FaqList'
import type { Faq } from '@/content/faq-types'
import { CITY_STATE, SITE } from '@/site.config'

/**
 * Structured data.
 *
 * HARD RULES, all of which the Phase 5 validator enforces:
 *
 *  1. Only real schema.org types. "TreeService" and "LandscapeService" DO NOT
 *     EXIST — plenty of tree-service sites emit them and they are silently
 *     ignored. The correct type for this business is HomeAndConstructionBusiness.
 *  2. Every property must trace to site.config.ts. Nothing is asserted here that
 *     is not asserted on the page, and nothing is asserted on either that we do
 *     not actually know.
 *  3. An unknown fact emits NO property, rather than an empty or placeholder one.
 *     No street address (service-area business), no geo, no hours and no sameAs
 *     until those exist.
 *  4. NEVER add Review or AggregateRating. Self-serving review markup on your own
 *     site violates Google's structured data guidelines. Permanent.
 *  5. FAQPage is built from the SAME array the page renders, filtered through the
 *     SAME visibility gate — so schema and visible content cannot drift, which is
 *     a requirement, not a nicety.
 */

export const BUSINESS_ID = `${SITE.url}/#business`
export const WEBSITE_ID = `${SITE.url}/#website`
export const ORG_ID = `${SITE.url}/#organization`

export function abs(path: string): string {
  return path === '/' ? `${SITE.url}/` : `${SITE.url}${path}`
}

/** The primary entity. Referenced by @id from every Service node. */
export function businessSchema(): Record<string, unknown> {
  const node: Record<string, unknown> = {
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: abs('/'),
    telephone: SITE.phoneE164,
    image: abs('/og.png'),
    logo: abs('/logo.png'),
    description: `Tree removal, tree trimming, stump grinding and storm damage cleanup in ${CITY_STATE} and the surrounding towns.`,
    // City/state/zip only. No streetAddress: this is a service-area business and
    // publishing an address it does not operate a storefront from is both wrong
    // and a Google Business Profile problem.
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      postalCode: SITE.zip,
      addressCountry: 'US',
    },
    areaServed: SITE.serviceAreas.map((town) => ({
      '@type': 'City',
      name: `${town}, ${SITE.state}`,
    })),
    knowsAbout: SERVICES.map((s) => s.noun),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Tree services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.noun, url: abs(`/${s.slug}`) },
      })),
    },
  }

  // Only emitted when the value actually exists.
  if (SITE.streetAddress) {
    ;(node.address as Record<string, unknown>).streetAddress = SITE.streetAddress
  }

  if (SITE.geo) {
    node.geo = {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    }
  }

  if (SITE.hours) {
    node.openingHoursSpecification = SITE.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    }))
  }

  const sameAs = [SITE.social.facebook, SITE.social.google].filter(Boolean)
  if (sameAs.length > 0) node.sameAs = sameAs

  if (SITE.email) node.email = SITE.email

  return node
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: abs('/'),
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  }
}

export function organizationSchema(): Record<string, unknown> {
  const node: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.legalName,
    url: abs('/'),
    logo: abs('/logo.png'),
    telephone: SITE.phoneE164,
  }
  const sameAs = [SITE.social.facebook, SITE.social.google].filter(Boolean)
  if (sameAs.length > 0) node.sameAs = sameAs
  return node
}

/** Site-wide graph, rendered once in the root layout. */
export function siteGraph(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': [businessSchema(), websiteSchema(), organizationSchema()],
  }
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  }
}

export function serviceSchema(service: Service): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.noun} in ${CITY_STATE}`,
    serviceType: service.noun,
    description: service.description,
    url: abs(`/${service.slug}`),
    provider: { '@id': BUSINESS_ID },
    areaServed: SITE.serviceAreas.map((town) => ({
      '@type': 'City',
      name: `${town}, ${SITE.state}`,
    })),
  }
}

/**
 * Built from the same array the page renders, through the same gate. If an FAQ is
 * hidden on the page (e.g. "Are you insured?" while SITE.insured is false) it is
 * absent from the schema too. Returns null when nothing is visible, so we never
 * emit an empty FAQPage.
 */
export function faqSchema(faqs: Faq[]): Record<string, unknown> | null {
  const shown = visibleFaqs(faqs)
  if (shown.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: shown.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}
