import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { CITY_STATE } from '@/site.config'

// PHASE 2 fills in: what's included, what to do first, what drives the price,
// photo slot, and 4-6 FAQs. Metadata lands in Phase 4.
//
// ⚠️ SITE.emergency is false. This page must NOT promise 24/7 or emergency
// response anywhere. "Call first and we'll tell you how fast we can get there"
// is the honest version and it is what ships until Brandon says otherwise.
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title={`Storm Damage Cleanup in ${CITY_STATE}`}
        lead="Trees and limbs down after a storm, cleared out and hauled away."
      />
      <Section>
        <p className="prose-body">
          After a storm the yard is usually worse than it looks from the window — split
          trunks, hangers caught up in what is left standing, and limbs across the drive.
          Call us and we will tell you honestly how soon we can get to you. If a line is
          down or a tree is on the house, call the utility and your insurer first; that part
          is not ours to touch.
        </p>
      </Section>
    </>
  )
}
