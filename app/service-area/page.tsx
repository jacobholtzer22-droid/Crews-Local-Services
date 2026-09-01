import Link from 'next/link'
import { Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { SERVICES } from '@/content/services'
import { CITY_STATE, SITE, TEL_HREF } from '@/site.config'
import { JsonLd } from '@/components/JsonLd'
import { pageMeta } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: `Tree Service Areas Near ${CITY_STATE} | Crews Local`,
  description: `${SITE.name} covers ${SITE.serviceAreas.slice(0, 4).join(', ')} and more around ${SITE.city}. Free estimates wherever you are in the area.`,
  path: '/service-area',
})

/**
 * One page listing every town in crawlable text.
 *
 * NO per-town pages, deliberately. Ten near-identical pages differing only in a
 * swapped town name is thin content: it is a liability with Google rather than a
 * ranking strategy, and it gives a homeowner nothing they did not already have.
 * If Brandon later has genuinely town-specific material, real jobs, real photos,
 * real local detail, that changes the calculation. Logged as an option in
 * seo/HANDOFF.md.
 */
export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Service Area', path: '/service-area' },
        ])}
      />
      <PageHero
        eyebrow="Where we work"
        title={`Tree Service Areas Around ${CITY_STATE}`}
        lead={`We work out of ${SITE.city} and cover the towns around it. If you are not on this list, call anyway. If we can get to you we will tell you, and the estimate is free either way.`}
      />

      <Section labelledBy="towns-heading">
        <h2 id="towns-heading" className="h-section">
          Towns we cover
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.serviceAreas.map((town) => (
            <li
              key={town}
              className="border-b border-sawdust-dim pb-3 font-display text-xl font-semibold uppercase tracking-tight"
            >
              {town}, {SITE.state}
            </li>
          ))}
        </ul>

        <p className="prose-body mt-10 text-ink-soft">
          Travel is part of what an estimate accounts for, so a job an hour out is priced
          differently from one across town, but the estimate itself is free wherever you
          are, and we will tell you up front if you are further than we can sensibly reach.
        </p>
      </Section>

      <Section tone="dim" labelledBy="area-services-heading">
        <h2 id="area-services-heading" className="h-section">
          What we do across the area
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/${s.slug}`}
                className="group flex h-full flex-col rounded-lg border border-sawdust-dim bg-white/60 p-5 transition-colors hover:border-blaze"
              >
                <h3 className="font-display text-lg font-bold uppercase tracking-tight">
                  {s.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <section className="bg-blaze">
        <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bark sm:text-4xl">
            Not sure if you&rsquo;re in range? Call and ask.
          </h2>
          <a
            href={TEL_HREF}
            data-cta="call"
            className="btn inline-flex shrink-0 bg-bark text-sawdust hover:bg-bark-700"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
        </Container>
      </section>
    </>
  )
}
