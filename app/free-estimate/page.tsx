import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { CITY_STATE, SITE, TEL_HREF } from '@/site.config'

// PHASE 3 drops the EstimateForm component in here (browser POST to the A&A CRM,
// hp_7d3a_ref honeypot, success:true verification, 3x retry, unchecked SMS consent).
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Free estimate"
        title="Get a Free Estimate"
        lead={`Tell us what tree, where it sits on the property, and what it is near. We will come look at it in person — there is no charge for the estimate and no obligation.`}
      />
      <Section>
        <p className="prose-body">
          Prefer to just talk it through? Call{' '}
          <a href={TEL_HREF} data-cta="call" className="font-semibold text-moss underline underline-offset-4 hover:text-blaze">
            {SITE.phoneDisplay}
          </a>
          . We cover {CITY_STATE} and the surrounding towns.
        </p>
      </Section>
    </>
  )
}
