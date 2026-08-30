import Link from 'next/link'
import { Check, Phone } from 'lucide-react'
import { Container } from '@/components/Container'
import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { RingMark } from '@/components/RingMark'
import { RingDivider } from '@/components/RingDivider'
import { SERVICES } from '@/content/services'
import { CITY_STATE, SITE, TEL_HREF } from '@/site.config'

/**
 * PHASE 1 — design-system shakeout. Structure and system are final; the full copy,
 * FAQ, reviews block, service-area block and metadata land in Phase 2 / Phase 4.
 *
 * The copy already on this page is real, not filler: every claim traces to
 * seo/FACTS.md. Nothing here is lorem, and nothing needs to be thrown away.
 */
export default function HomePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────────
          NO PHOTO YET. Ships as the end-grain panel rather than a stock photo of
          somebody else's crew. Drop a real photo of Brandon's work into
          public/photos/ and this becomes a next/image with explicit dimensions.
          See seo/FACTS.md → "Photos". */}
      <section className="on-bark end-grain relative overflow-hidden bg-bark text-sawdust">
        {/* Signature ring, large and faint, bleeding off the right edge. */}
        <RingMark
          variant="field"
          className="pointer-events-none absolute -right-24 -top-16 h-[34rem] w-[34rem] text-sawdust/[0.07] sm:-right-20 lg:right-[-6rem] lg:h-[44rem] lg:w-[44rem]"
        />

        <Container className="relative py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow-dark">{CITY_STATE}</p>

            <h1 className="h-display mt-4">
              Tree removal, trimming, and stump grinding in {CITY_STATE}
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

            {/* Trust strip — TRUE ITEMS ONLY. Each entry is gated on site.config.ts,
                so a fact we don't have simply doesn't appear. */}
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sawdust-muted">
              {SITE.freeEstimates && <TrustItem>Free estimates</TrustItem>}
              {SITE.serviceAreas.length > 0 && (
                <TrustItem>
                  {SITE.city} + {SITE.serviceAreas.length - 1} nearby towns
                </TrustItem>
              )}
              {/* Renders only once Brandon confirms — see site.config.ts. */}
              {SITE.insured && <TrustItem>Fully insured</TrustItem>}
              {SITE.yearsInBusiness !== null && (
                <TrustItem>{SITE.yearsInBusiness} years in business</TrustItem>
              )}
            </ul>
          </div>
        </Container>
      </section>

      {/* ── SERVICES ──────────────────────────────────────────────────────────── */}
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
                <p className="mt-2 text-sm leading-relaxed text-ink/75">{service.summary}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Container>
        <RingDivider />
      </Container>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
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
              d: 'The tree comes down, the debris goes with us, and the site gets raked.',
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

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="bg-blaze">
        <Container className="flex flex-col items-start gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight tracking-tight text-bark sm:text-4xl">
              Got a tree that needs to come down?
            </h2>
            <p className="mt-2 text-base font-semibold text-bark/80">
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
