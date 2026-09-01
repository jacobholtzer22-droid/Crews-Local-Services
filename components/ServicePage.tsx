import Link from 'next/link'
import { Check, Phone } from 'lucide-react'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { PageHero } from '@/components/PageHero'
import { PhotoSlot } from '@/components/PhotoSlot'
import { FaqList } from '@/components/FaqList'
import { RingDivider } from '@/components/RingDivider'
import type { Service } from '@/content/services'
import { CITY_STATE, SITE, TEL_HREF } from '@/site.config'

/**
 * One renderer for all four service pages. The pages themselves are three lines
 * each, everything lives in content/services.ts, so copy edits never touch JSX
 * and the four pages cannot drift structurally.
 */
export function ServicePage({ service }: { service: Service }) {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title={`${service.noun} in ${CITY_STATE}`}
        lead={service.intro}
      />

      {/* Body + photo */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {service.body.map((para) => (
              <p key={para.slice(0, 32)} className="prose-body mt-0 first:mt-0 [&+p]:mt-5">
                {para}
              </p>
            ))}

            <h2 className="h-section mt-12">What&rsquo;s included</h2>
            <ul className="mt-6 space-y-3">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-blaze" aria-hidden="true" />
                  <span className="text-base leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <PhotoSlot alt={service.photoAlt} />
            <div className="card mt-6">
              <h2 className="font-display text-xl font-bold uppercase tracking-tight">
                Free estimate, in person
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                We come look at it and give you a price. No charge, no obligation.
              </p>
              <a href={TEL_HREF} data-cta="call" className="btn-primary mt-4 w-full text-base">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {SITE.phoneDisplay}
              </a>
              <Link href="/free-estimate" className="btn-secondary mt-3 w-full text-base">
                Send the form
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* When you need it */}
      <Section tone="dark" labelledBy={`when-${service.slug}`}>
        <Reveal>
          <p className="eyebrow-dark">Signs to look for</p>
          <h2 id={`when-${service.slug}`} className="h-section mt-3">
            When you need it
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {service.whenYouNeedIt.map((item, i) => (
            <Reveal as="li" key={item.heading} delay={i * 60}>
              <div className="card-dark h-full">
                <h3 className="font-display text-lg font-bold uppercase tracking-tight text-blaze">
                  {item.heading}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sawdust-muted">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* What affects the price */}
      <Section labelledBy={`price-${service.slug}`}>
        <Reveal>
          <p className="eyebrow">Pricing</p>
          <h2 id={`price-${service.slug}`} className="h-section mt-3">
            What affects the price
          </h2>
          <p className="prose-body mt-4 text-ink-soft">
            We do not publish prices, because a number that ignores your particular tree
            would be a made-up number. Here is what actually moves it.
          </p>
        </Reveal>
        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {service.priceFactors.map((f) => (
            <div key={f.heading} className="border-t border-sawdust-dim pt-4">
              <dt className="font-display text-lg font-bold uppercase tracking-tight">
                {f.heading}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{f.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Container>
        <RingDivider />
      </Container>

      {/* On the day */}
      <Section labelledBy={`day-${service.slug}`}>
        <Reveal>
          <p className="eyebrow">On the day</p>
          <h2 id={`day-${service.slug}`} className="h-section mt-3">
            What to expect
          </h2>
        </Reveal>
        <ol className="mt-8 max-w-prose space-y-4">
          {service.onTheDay.map((step, i) => (
            <li key={step.slice(0, 30)} className="flex gap-4">
              <span className="font-display text-2xl font-extrabold leading-none text-blaze">
                {i + 1}
              </span>
              <span className="text-base leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      {/* FAQ */}
      <Section tone="dim" labelledBy={`faq-${service.slug}`}>
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 id={`faq-${service.slug}`} className="h-section mt-3">
            {service.noun} questions
          </h2>
        </Reveal>
        <FaqList faqs={service.faqs} />
      </Section>

      {/* CTA */}
      <section className="bg-blaze">
        <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bark sm:text-4xl">
              Get a free estimate
            </h2>
            <p className="mt-2 text-base font-semibold text-bark">
              {service.noun} in {SITE.city} and the surrounding towns.
            </p>
          </div>
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
