import Link from 'next/link'
import { RingMark } from '@/components/RingMark'
import { SERVICES } from '@/content/services'
import { CITY_STATE, SITE, TEL_HREF } from '@/site.config'

/**
 * The NAP block. This markup is the crawlable, citable copy of the business's
 * name, area and phone — it must match the Google Business Profile character for
 * character. If the GBP name, phone or service area changes, this and the JSON-LD
 * in app/layout.tsx change in the same commit.
 *
 * Every block below is conditional on real data. An unknown email, unknown hours or
 * unknown Facebook page renders nothing at all.
 */
export function SiteFooter() {
  const year = new Date().getFullYear()
  const hasSocial = Boolean(SITE.social.facebook || SITE.social.google)

  return (
    <footer className="on-bark border-t border-bark-500 bg-bark text-sawdust">
      <div className="container-page py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* NAP */}
          <div>
            <div className="flex items-center gap-2.5">
              <RingMark className="h-8 w-8 shrink-0 text-blaze" />
              <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight">
                {SITE.name}
              </span>
            </div>

            <address className="mt-4 not-italic text-sawdust-muted">
              <p>
                {CITY_STATE} {SITE.zip}
              </p>
              {SITE.streetAddress && <p>{SITE.streetAddress}</p>}
              <p className="mt-2">
                <a
                  href={TEL_HREF}
                  data-cta="call"
                  className="font-display text-lg font-bold tracking-wide text-sawdust hover:text-blaze"
                >
                  {SITE.phoneDisplay}
                </a>
              </p>
              {SITE.email && (
                <p className="mt-1">
                  <a href={`mailto:${SITE.email}`} className="hover:text-blaze">
                    {SITE.email}
                  </a>
                </p>
              )}
            </address>

            {SITE.hours && (
              <dl className="mt-4 space-y-1 text-sm text-sawdust-muted">
                {SITE.hours.map((h) => (
                  <div key={h.days.join('-')} className="flex gap-2">
                    <dt className="font-semibold text-sawdust">{h.days.join(', ')}</dt>
                    <dd>
                      {h.open}–{h.close}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {/* Services */}
          <nav aria-labelledby="footer-services">
            <h2
              id="footer-services"
              className="font-display text-sm font-bold uppercase tracking-[0.18em] text-blaze"
            >
              Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sawdust-muted">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-blaze">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service area — crawlable text, not an image or a map embed. */}
          <nav aria-labelledby="footer-area">
            <h2
              id="footer-area"
              className="font-display text-sm font-bold uppercase tracking-[0.18em] text-blaze"
            >
              Service Area
            </h2>
            <p className="mt-4 text-sawdust-muted">
              {SITE.serviceAreas.join(', ')}
            </p>
            <Link href="/service-area" className="mt-3 inline-block text-sawdust hover:text-blaze">
              See all areas
            </Link>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h2
              id="footer-company"
              className="font-display text-sm font-bold uppercase tracking-[0.18em] text-blaze"
            >
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sawdust-muted">
              <li>
                <Link href="/about" className="hover:text-blaze">
                  About
                </Link>
              </li>
              <li>
                <Link href="/free-estimate" className="hover:text-blaze">
                  Free Estimate
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blaze">
                  Privacy Policy
                </Link>
              </li>
              {hasSocial && SITE.social.facebook && (
                <li>
                  <a
                    href={SITE.social.facebook}
                    className="hover:text-blaze"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-bark-500 pt-6 text-sm text-sawdust-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.legalName} · {CITY_STATE}
          </p>
          {SITE.agencyCredit && (
            <p>
              Website by{' '}
              <a
                href="https://www.alignandacquire.com"
                className="text-sawdust hover:text-blaze"
                rel="noopener"
              >
                Align and Acquire
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
