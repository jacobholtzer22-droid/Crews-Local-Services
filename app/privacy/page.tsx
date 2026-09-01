import type { Metadata } from 'next'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { SITE, TEL_HREF } from '@/site.config'
import { JsonLd } from '@/components/JsonLd'
import { pageMeta } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = pageMeta({
  title: `Privacy Policy | ${SITE.name}`,
  description: `How ${SITE.legalName} handles the information you send through this website, including text message consent and who else sees your enquiry.`,
  path: '/privacy',
})

/**
 * The SMS consent language here must stay identical in substance to the checkbox
 * label in components/EstimateForm.tsx. If one changes, change the other in the
 * same commit, a policy that describes a different consent from the one the
 * customer actually ticked is worse than no policy.
 *
 * The analytics section is conditional on SITE.tracking.gtagId, which is null, so
 * no tracking claim is made while no tracking script loads.
 */
export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`How ${SITE.legalName} handles the information you send through this website.`}
      />

      <Section>
        <div className="max-w-prose space-y-8">
          <Block title="What we collect">
            <p>
              Only what you type into the estimate form: your name, your phone number, your
              email address if you choose to give one, which service you selected, and what
              you write about the work you need. Email is optional and the form works
              without it.
            </p>
          </Block>

          <Block title="Why we collect it">
            <p>
              To contact you about the work you asked about, arrange a time to come and look
              at it, and give you a price. That is the whole purpose.
            </p>
          </Block>

          <Block title="Text messages">
            <p>
              The SMS box on the estimate form is unchecked by default and it is optional.
              Leaving it unchecked will not hold up your estimate. If you do check it, you
              are agreeing to receive text messages from {SITE.legalName} about your estimate
              request. Message frequency varies. Message and data rates may apply. Reply STOP
              to any message to stop receiving them, or HELP for help. We do not send
              marketing texts to people who have not asked for them.
            </p>
          </Block>

          <Block title="Who else sees it">
            <p>
              Your submission is sent to Align and Acquire, who run the customer enquiry
              system {SITE.legalName} uses, and who pass it to us. That is the only place it
              goes.
            </p>
            <p className="mt-3">
              <strong className="font-semibold">We do not sell your information</strong>, and
              we do not share it with anyone for advertising.
            </p>
          </Block>

          {/* Renders only if analytics is actually installed. Currently it is not:
              SITE.tracking.gtagId is null and no tracking script loads at all. */}
          {SITE.tracking.gtagId && (
            <Block title="Analytics">
              <p>
                This site uses Google Analytics to understand which pages people find useful.
                It records things like which pages were visited and roughly where in the
                world the visit came from. It is not tied to the details you enter in the
                estimate form.
              </p>
            </Block>
          )}

          <Block title="How long we keep it">
            <p>
              We keep enquiries for as long as we need them to do the work and keep our own
              records straight. If you want yours deleted, ask and we will delete it.
            </p>
          </Block>

          <Block title="Cookies">
            <p>
              This site does not set advertising or tracking cookies.
            </p>
          </Block>

          <Block title="Getting in touch about your information">
            <p>
              If you want to know what we hold, correct it, or have it deleted, call{' '}
              <a
                href={TEL_HREF}
                data-cta="call"
                className="font-semibold text-moss underline underline-offset-4"
              >
                {SITE.phoneDisplay}
              </a>
              {SITE.email ? (
                <>
                  {' '}
                  or email{' '}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-semibold text-moss underline underline-offset-4"
                  >
                    {SITE.email}
                  </a>
                </>
              ) : null}
              .
            </p>
          </Block>
        </div>
      </Section>
    </>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight">{title}</h2>
      <div className="prose-body mt-3 text-ink-soft">{children}</div>
    </section>
  )
}
