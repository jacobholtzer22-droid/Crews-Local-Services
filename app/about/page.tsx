import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { CITY_STATE, SITE } from '@/site.config'

// PHASE 2: photo slot for Brandon / the crew. Kept deliberately short — there is
// no invented backstory here and there will not be one. Years in business is
// disputed across directories, so nothing about tenure appears until confirmed.
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={`About ${SITE.name}`}
        lead={`${SITE.owner} runs ${SITE.legalName} out of ${CITY_STATE}, and works the jobs himself.`}
      />
      <Section>
        <p className="prose-body">
          It is a small operation on purpose. When you call, you get the person who is going
          to be standing in your yard — not a call center, and not a salesman who hands you
          off to a crew he has never met. That is also why the estimate is free and done in
          person: {SITE.owner} would rather look at the tree than guess at it.
        </p>
      </Section>
    </>
  )
}
