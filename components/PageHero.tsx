import { Container } from '@/components/Container'
import { RingMark } from '@/components/RingMark'

/**
 * Interior page hero. Same end-grain treatment as the homepage but shorter, so a
 * service page gets to its content fast.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead: string
}) {
  return (
    <section className="on-bark end-grain relative overflow-hidden bg-bark text-sawdust">
      <RingMark
        variant="field"
        className="pointer-events-none absolute -right-20 -top-24 h-[26rem] w-[26rem] text-sawdust/[0.06] lg:h-[32rem] lg:w-[32rem]"
      />
      <Container className="relative py-14 sm:py-20">
        <p className="eyebrow-dark">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="prose-body mt-5 text-lg text-sawdust-muted">{lead}</p>
      </Container>
    </section>
  )
}
