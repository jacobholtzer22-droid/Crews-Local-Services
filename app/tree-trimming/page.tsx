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
        title={`Tree Trimming in ${CITY_STATE}`}
        lead="Deadwood, low limbs, and branches hanging over the roof or the driveway — cut back on purpose now, instead of coming down on their own in the next storm."
      />
      <Section>
        <p className="prose-body">
          Trimming is the cheapest tree work you will ever pay for, because it is the work
          that stops the expensive kind. We come out to {SITE.city} and the surrounding
          towns, look at what you have got, and tell you straight whether it needs cutting
          this year or not.
        </p>
      </Section>
    </>
  )
}
