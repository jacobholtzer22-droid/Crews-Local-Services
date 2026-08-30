import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { SITE } from '@/site.config'

// PHASE 3/4: the SMS consent language (frequency varies, msg & data rates apply,
// STOP to cancel, HELP for help) is written alongside the actual form so the
// policy and the checkbox label cannot describe two different things. Tracking
// disclosure is conditional on SITE.tracking.gtagId, which is currently null.
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`How ${SITE.legalName} handles the information you send through this website.`}
      />
      <Section>
        <p className="prose-body">
          We collect only what you type into the estimate form — your name, phone number,
          email address if you give one, and a description of the work you need. We use it
          to contact you about that work. We do not sell it.
        </p>
      </Section>
    </>
  )
}
