import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { CITY_STATE, SITE } from '@/site.config'

// PHASE 2 fills in: what's included, when you need it, what drives the price,
// what to expect on the day, photo slot, and 4-6 FAQs. Metadata lands in Phase 4.
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title={`Tree Removal in ${CITY_STATE}`}
        lead={`We take down whole trees in ${SITE.city} and the surrounding towns — including the awkward ones close to wires, fences, sheds and rooflines — and haul the wood off when we go.`}
      />
      <Section>
        <p className="prose-body">
          Most removals start the same way: you call, we come out and look at the tree in
          person, and you get a price before anything gets cut. Nobody can quote a tree
          honestly from a photo, so the estimate is free and it happens on site.
        </p>
      </Section>
    </>
  )
}
