import Link from 'next/link'
import { MessageSquare, Phone, ClipboardList } from 'lucide-react'
import { SITE, SMS_HREF, TEL_HREF } from '@/site.config'

/**
 * Fixed bottom bar, mobile only. The whole site exists to produce a call or a form
 * submission, and on a phone that decision happens with one thumb.
 *
 * The Text button renders ONLY when SITE.smsEnabled — a text to a landline goes
 * nowhere and the customer never finds out, which is worse than not offering it.
 *
 * `body { padding-bottom: var(--mobile-cta-h) }` in globals.css reserves the space
 * so this never covers the last section. pb-[env(safe-area-inset-bottom)] keeps it
 * clear of the iPhone home indicator.
 */
export function MobileCtaBar() {
  const cols = SITE.smsEnabled ? 'grid-cols-3' : 'grid-cols-2'

  return (
    <div
      className={`on-bark fixed inset-x-0 bottom-0 z-50 grid ${cols} gap-px border-t border-bark-500 bg-bark-500 pb-[env(safe-area-inset-bottom)] md:hidden`}
    >
      <a
        href={TEL_HREF}
        data-cta="call"
        className="flex min-h-[64px] flex-col items-center justify-center gap-1 bg-blaze font-display text-sm font-bold uppercase tracking-wide text-bark"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Call
      </a>

      {SITE.smsEnabled && (
        <a
          href={SMS_HREF}
          className="flex min-h-[64px] flex-col items-center justify-center gap-1 bg-bark font-display text-sm font-bold uppercase tracking-wide text-sawdust"
        >
          <MessageSquare className="h-5 w-5" aria-hidden="true" />
          Text
        </a>
      )}

      <Link
        href="/free-estimate"
        className="flex min-h-[64px] flex-col items-center justify-center gap-1 bg-bark font-display text-sm font-bold uppercase tracking-wide text-sawdust"
      >
        <ClipboardList className="h-5 w-5" aria-hidden="true" />
        Estimate
      </Link>
    </div>
  )
}
