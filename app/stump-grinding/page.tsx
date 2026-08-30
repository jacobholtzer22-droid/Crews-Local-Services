import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { CITY_STATE } from '@/site.config'

// PHASE 2 fills in: what's included, when you need it, what drives the price,
// what to expect on the day, photo slot, and 4-6 FAQs. Metadata lands in Phase 4.
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Service"
        title={`Stump Grinding in ${CITY_STATE}`}
        lead="The stump ground out below grade so you can run a mower straight over it and put grass back where the tree was."
      />
      <Section>
        <p className="prose-body">
          A stump left in the ground gets softer, not smaller — it holds water, feeds
          carpenter ants, and throws suckers up through the lawn for years. Grinding it out
          ends that in an afternoon. We grind stumps we took down ourselves and stumps
          somebody else left behind.
        </p>
      </Section>
    </>
  )
}
