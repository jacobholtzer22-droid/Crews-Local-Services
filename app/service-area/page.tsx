import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { CITY_STATE, SITE } from '@/site.config'

// PHASE 2: county grouping (if Jacob supplies counties) and the honest paragraph
// about travel distance. Per-town pages are deliberately NOT built — one real
// service area does not support ten pages of distinct content, and thin near-
// duplicate town pages are a liability, not a ranking strategy. Noted as a
// phase-2 option in seo/HANDOFF.md.
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Where we work"
        title={`Tree Service Areas Around ${CITY_STATE}`}
        lead={`We work out of ${SITE.city} and cover the towns around it. If you are not on this list, call anyway — if we can get there, we will tell you, and the estimate is free either way.`}
      />
      <Section>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.serviceAreas.map((town) => (
            <li key={town} className="border-b border-sawdust-dim pb-3 font-display text-xl font-semibold uppercase tracking-tight">
              {town}, {SITE.state}
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
