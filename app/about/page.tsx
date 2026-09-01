import Link from 'next/link'
import { Phone } from 'lucide-react'
import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { PhotoSlot } from '@/components/PhotoSlot'
import { Container } from '@/components/Container'
import { CITY_STATE, SITE, TEL_HREF } from '@/site.config'
import { JsonLd } from '@/components/JsonLd'
import { pageMeta } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: `About ${SITE.name} | ${CITY_STATE} Tree Service`,
  description: `${SITE.owner} runs ${SITE.legalName} out of ${CITY_STATE} and works the jobs himself. Removals, trimming, stump grinding and storm cleanup.`,
  path: '/about',
})

/**
 * Deliberately short. There is no invented backstory here and there will not be
 * one: tenure is disputed across three directories (Networx 7 years, Angi 6,
 * oldest review Nov 2022), so nothing about how long Brandon has been doing this
 * appears until he confirms it. See seo/FACTS.md.
 */
export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageHero
        eyebrow="About"
        title={`About ${SITE.name}`}
        lead={`${SITE.owner} runs ${SITE.legalName} out of ${CITY_STATE}, and works the jobs himself.`}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="prose-body">
              It is a small operation on purpose. When you call, you get the person who is
              going to be standing in your yard, not a call centre, and not a salesman who
              hands you off to a crew he has never met.
            </p>
            <p className="prose-body mt-5">
              That is also why the estimate is free and done in person. {SITE.owner} would
              rather look at the tree than guess at it, and most of what decides a price does
              not show up in a photo: what is underneath the tree, whether equipment can reach
              it, and what it has grown into.
            </p>
            <p className="prose-body mt-5">
              The work is tree work: removals, trimming, stump grinding, and clearing up
              after storms. We are not trying to be a landscaping company that also owns a
              chainsaw.
            </p>
            <p className="prose-body mt-5">
              If a tree does not need cutting this year, we will tell you that. It is a
              shorter conversation than the alternative, and it is the reason most of our
              work comes from people who have called us before.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={TEL_HREF} data-cta="call" className="btn-primary">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {SITE.phoneDisplay}
              </a>
              <Link href="/free-estimate" className="btn-secondary">
                Get a free estimate
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            {/* TODO: photo of Brandon or the crew, see public/photos/README.md */}
            <PhotoSlot
              alt={`${SITE.owner}, owner of ${SITE.legalName}, on a job in ${CITY_STATE}`}
            />
          </div>
        </div>
      </Section>

      <section className="bg-blaze">
        <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bark sm:text-4xl">
            Free estimates in {SITE.city}
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
