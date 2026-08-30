import { RingMark } from '@/components/RingMark'
import { cn } from '@/lib/cn'

/**
 * Section divider: a hairline rule broken by the ring mark. The site's one
 * recurring flourish — everything else stays quiet so this reads as deliberate.
 */
export function RingDivider({
  className,
  tone = 'light',
}: {
  className?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)} aria-hidden="true">
      <span className={cn('h-px flex-1', tone === 'dark' ? 'bg-bark-500' : 'bg-sawdust-dim')} />
      <RingMark className={cn('h-7 w-7', tone === 'dark' ? 'text-blaze' : 'text-moss')} />
      <span className={cn('h-px flex-1', tone === 'dark' ? 'bg-bark-500' : 'bg-sawdust-dim')} />
    </div>
  )
}
