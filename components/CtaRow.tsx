import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Container } from '@/components/Container'
import { SITE, TEL_HREF } from '@/site.config'
import { cn } from '@/lib/cn'

/**
 * A mid-page CTA. Never more than two actions, and never placed adjacent to
 * another CTA band: a wall of buttons reads as pressure, and a homeowner who has
 * just been told what drives the price is at the exact point where one clear next
 * step helps and three do not.
 */
export function CtaRow({
  heading,
  sub,
  tone = 'dim',
  className,
}: {
  heading: string
  sub?: string
  tone?: 'dim' | 'dark'
  className?: string
}) {
  return (
    <section
      className={cn(tone === 'dark' ? 'on-bark bg-bark text-sawdust' : 'bg-sawdust-dim', className)}
    >
      <Container className="flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl">
            {heading}
          </h2>
          {sub && (
            <p className={cn('mt-1.5 text-base', tone === 'dark' ? 'text-sawdust-muted' : 'text-ink-soft')}>
              {sub}
            </p>
          )}
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a href={TEL_HREF} data-cta="call" className="btn-primary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {SITE.phoneDisplay}
          </a>
          <Link href="/free-estimate" className={tone === 'dark' ? 'btn-secondary-dark' : 'btn-secondary'}>
            Free estimate
          </Link>
        </div>
      </Container>
    </section>
  )
}

/** Single Call action, for the end of an FAQ section. */
export function CallOut({ label }: { label: string }) {
  return (
    <div className="mt-10 flex flex-col items-start gap-4 border-t border-sawdust-dim pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-display text-xl font-bold uppercase tracking-tight">{label}</p>
      <a href={TEL_HREF} data-cta="call" className="btn-primary shrink-0">
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call {SITE.phoneDisplay}
      </a>
    </div>
  )
}
