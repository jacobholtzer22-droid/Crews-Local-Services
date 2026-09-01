import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Phone } from 'lucide-react'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { RingMark } from '@/components/RingMark'
import { RingDivider } from '@/components/RingDivider'
import { FaqList } from '@/components/FaqList'
import { ReviewsSection } from '@/components/ReviewsSection'
import { SERVICES } from '@/content/services'
import { HOME_FAQS } from '@/content/faqs'
import { JsonLd } from '@/components/JsonLd'
import { pageMeta } from '@/lib/metadata'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { CITY_STATE, SITE, TEL_HREF } from '@/site.config'

/**
 * Absolute title, 61 characters, keeping the full "and" phrasing (the H1 uses the
 * ampersand to save a line on a phone; the title has no such constraint and "and"
 * reads better in a SERP). Front-loaded with the three services and the city.
 */
export const metadata: Metadata = pageMeta({
  title: `Tree Removal, Trimming and Stump Grinding in ${CITY_STATE}`,
  description: `${SITE.name} takes down, trims and grinds out trees in ${CITY_STATE} and nearby towns. Free on-site estimates, full cleanup. Call ${SITE.phoneDisplay}.`,
  path: '/',
})

/**
 * Every claim on this page traces to seo/FACTS.md. The trust strip renders only
 * the items that are actually true in site.config.ts, so insurance and
 * years-in-business are simply absent rather than softened.
 *
 * Nothing here promises that wood or brush leaves the site. Brandon has not
 * confirmed a haul-off policy, so every mention of disposal is framed as
 * something settled on the estimate. See seo/FACTS.md → "Wood haul-off policy".
 */
export default function HomePage() {
  const faq = faqSchema(HOME_FAQS)

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />
      {faq && <JsonLd data={faq} />}

      {/* ── HERO ───────────────────────────────────────────────────────────────
          NO PHOTO YET, ships as the end-grain panel rather than a stock photo of
          somebody else's crew. See public/photos/README.md. */}
      <section className="on-bark end-grain relative overflow-hidden bg-bark text-sawdust">
        <RingMark
          variant="field"
          className="pointer-events-none absolute -right-24 -top-16 h-[34rem] w-[34rem] text-sawdust/[0.07] sm:-right-20 lg:right-[-6rem] lg:h-[44rem] lg:w-[44rem]"
        />

        <Container className="relative py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-dark">{CITY_STATE}</p>

            {/* Ampersand, not "and", one step shorter on a 375px screen while
                keeping the full search phrase intact. The <title> keeps "and",
                which has no line-length constraint and reads better in a SERP.
                text-3xl is a MOBILE-ONLY step down from the h-display default:
                at text-4xl this still wrapped to four lines at 375px and pushed
                the call button toward the fold. sm: and lg: are unchanged. */}
            <h1 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[1.0] tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Tree removal, trimming &amp; stump grinding in {CITY_STATE}
            </h1>

            <p className="prose-body mt-6 text-lg text-sawdust-muted">
              Fair price, straight answer on when we can get there, and we rake up the
              sawdust before we leave.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={TEL_HREF} data-cta="call" className="btn-primary">
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {SITE.phoneDisplay}
              </a>
              <Link href="/free-estimate" className="btn-secondary-dark">
                Get a free estimate
              </Link>
            </div>

            {/* TRUE ITEMS ONLY, each gated on site.config.ts. */}
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sawdust-muted">
              {SITE.freeEstimates && <TrustItem>Free estimates</TrustItem>}
              {SITE.serviceAreas.length > 0 && (
                <TrustItem>
                  {SITE.city} + {SITE.serviceAreas.length - 1} nearby towns
                </TrustItem>
              )}
              {SITE.acceptsCards && <TrustItem>Cards accepted</TrustItem>}
              {SITE.insured && <TrustItem>Fully insured</TrustItem>}
              {SITE.yearsInBusiness !== null && (
                <TrustItem>{SITE.yearsInBusiness} years in business</TrustItem>
              )}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── SERVICES ───────────────────────────────────────────────────────── */}
      <Section labelledBy="services-heading" id="services">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 id="services-heading" className="h-section mt-3">
            Four things, done properly
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 70}>
              <Link
                href={`/${service.slug}`}
                className="group flex h-full flex-col rounded-lg border border-sawdust-dim bg-white/60 p-6 transition-colors hover:border-blaze"
              >
                <RingMark className="h-8 w-8 text-moss transition-colors group-hover:text-blaze" />
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight">
                  {service.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.summary}</p>
                <span className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-moss group-hover:text-blaze">
                  More on {service.label.toLowerCase()} &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Container>
        <RingDivider />
      </Container>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <Section tone="dark" labelledBy="how-heading">
        <Reveal>
          <p className="eyebrow-dark">How it works</p>
          <h2 id="how-heading" className="h-section mt-3">
            Three steps, no runaround
          </h2>
        </Reveal>

        <ol className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              t: 'Call or send the form',
              d: 'Tell us what tree, where it is on the property, and what it is near.',
            },
            {
              t: 'Free on-site estimate',
              d: 'We come look at it in person. Nobody can price a tree off a photo.',
            },
            {
              t: 'Job done and cleaned up',
              d: 'The tree comes down and the work area gets cleared and raked before we leave.',
            },
          ].map((step, i) => (
            <Reveal as="li" key={step.t} delay={i * 70}>
              <div className="card-dark h-full">
                <span className="font-display text-4xl font-extrabold leading-none text-blaze">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight">
                  {step.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sawdust-muted">{step.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── WHY CREWS ──────────────────────────────────────────────────────────
          The business's own claims, stated plainly in its own voice. These are
          informed by recurring themes in real reviews (logged in seo/FACTS.md as
          internal provenance) but they are NOT presented as reviews and carry no
          platform attribution, we do not have those reviewers' words or names,
          so citing them on the page would be dressing up a paraphrase. */}
      <Section labelledBy="why-heading">
        <Reveal>
          <p className="eyebrow">Why Crews</p>
          <h2 id="why-heading" className="h-section mt-3">
            How we work
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              t: 'The price is fair',
              d: 'You get a real number for your tree, not a padded one you are meant to negotiate down.',
            },
            {
              t: 'We turn up when we say',
              d: 'You get a straight answer about which week we can be there, and if that changes you hear it from us first.',
            },
            {
              t: 'Careful around obstacles',
              d: 'Wires, fences, ramps, sheds and rooflines. Where a straight drop would put something at risk, the tree comes down in sections instead.',
            },
            {
              t: 'Cleanup is part of the job',
              d: 'The work area gets cleared and raked before we leave, down to the sawdust, not just the big pieces.',
            },
            {
              t: 'You get the owner',
              d: `${SITE.owner} works the jobs himself, so the person who quotes your tree is the person standing in your yard.`,
            },
            {
              t: 'A straight answer',
              d: 'If a tree does not need cutting this year, we will say so. It is a shorter conversation and it is why people call back.',
            },
          ].map((item) => (
            <div key={item.t} className="border-t border-sawdust-dim pt-5">
              <h3 className="font-display text-lg font-bold uppercase tracking-tight">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── REVIEWS ────────────────────────────────────────────────────────── */}
      <ReviewsSection />

      {/* ── SERVICE AREA ───────────────────────────────────────────────────── */}
      <Section labelledBy="area-heading">
        <Reveal>
          <p className="eyebrow">Where we work</p>
          <h2 id="area-heading" className="h-section mt-3">
            {SITE.city} and the towns around it
          </h2>
        </Reveal>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
          {SITE.serviceAreas.map((town) => (
            <li key={town} className="font-display text-lg font-semibold uppercase tracking-tight">
              {town}
            </li>
          ))}
        </ul>
        <p className="prose-body mt-6 text-ink-soft">
          Not on the list? Call anyway. If we can get to you we will say so, and the estimate
          is free either way.{' '}
          <Link
            href="/service-area"
            className="font-semibold text-moss underline underline-offset-4 hover:text-blaze"
          >
            See the full service area
          </Link>
          .
        </p>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <Section tone="dim" labelledBy="faq-heading">
        <Reveal>
          <p className="eyebrow">Questions</p>
          <h2 id="faq-heading" className="h-section mt-3">
            Common questions
          </h2>
        </Reveal>
        <FaqList faqs={HOME_FAQS} />
      </Section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section className="bg-blaze">
        <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bark sm:text-4xl">
              Got a tree that needs to come down?
            </h2>
            <p className="mt-2 text-base font-semibold text-bark">
              Free estimates in {SITE.city} and the surrounding towns.
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

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-2">
      <Check className="h-4 w-4 shrink-0 text-blaze" aria-hidden="true" />
      <span className="text-sm font-semibold">{children}</span>
    </li>
  )
}
