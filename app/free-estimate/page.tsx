import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { EstimateForm } from '@/components/EstimateForm'
import { CITY_STATE, SITE, TEL_HREF } from '@/site.config'
import { JsonLd } from '@/components/JsonLd'
import { pageMeta } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: `Free Tree Estimate in ${CITY_STATE} | Crews Local`,
  description: `Get a free, no-obligation tree estimate in ${CITY_STATE}. Tell us about the tree and ${SITE.owner} will come out and look at it in person.`,
  path: '/free-estimate',
})

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Free Estimate', path: '/free-estimate' },
        ])}
      />
      <PageHero
        eyebrow="Free estimate"
        title="Get a Free Estimate"
        lead="Tell us what tree, where it sits on the property, and what it is near. We come look at it in person — no charge for the estimate and no obligation attached to it."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <EstimateForm />
          </div>

          <aside className="lg:col-span-2">
            <h2 className="h-section text-2xl sm:text-3xl">What happens next</h2>
            <ol className="mt-6 space-y-5">
              {[
                {
                  t: 'We get back to you',
                  d: `${SITE.owner} will call or text to sort out a time to come out.`,
                },
                {
                  t: 'We look at the tree',
                  d: 'In person, on site. Most of what decides the price is not visible in a photo.',
                },
                {
                  t: 'You get a price',
                  d: 'Free, and with no obligation to book anything.',
                },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="font-display text-2xl font-extrabold leading-none text-blaze">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold uppercase tracking-tight">
                      {s.t}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="card mt-8">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                Need it sorted faster?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Calling is always quicker than the form, especially for anything storm-related.
              </p>
              <a href={TEL_HREF} data-cta="call" className="btn-primary mt-4 w-full text-base">
                {SITE.phoneDisplay}
              </a>
              <p className="mt-4 text-sm text-ink-muted">
                Serving {CITY_STATE} and the surrounding towns.{' '}
                <Link
                  href="/service-area"
                  className="font-semibold text-moss underline underline-offset-4"
                >
                  See the area
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
