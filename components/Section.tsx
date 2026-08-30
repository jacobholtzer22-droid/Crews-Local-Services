import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'

/**
 * Vertical rhythm tiers: py-16 mobile / py-24 desktop between major sections.
 * Every section is a real <section> with an accessible name where it has a heading.
 */
export function Section({
  id,
  tone = 'light',
  className,
  children,
  labelledBy,
}: {
  id?: string
  /** light = sawdust surface. dark = bark surface (adds .on-bark for focus rings). */
  tone?: 'light' | 'dark' | 'dim'
  className?: string
  children: React.ReactNode
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'py-16 sm:py-24',
        tone === 'dark' && 'on-bark bg-bark text-sawdust',
        tone === 'dim' && 'bg-sawdust-dim',
        tone === 'light' && 'bg-sawdust',
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  )
}
