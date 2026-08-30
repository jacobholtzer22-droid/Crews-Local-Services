import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Container } from '@/components/Container'
import { RingMark } from '@/components/RingMark'
import { SITE, TEL_HREF } from '@/site.config'

export default function NotFound() {
  return (
    <section className="on-bark end-grain relative overflow-hidden bg-bark text-sawdust">
      <RingMark
        variant="field"
        className="pointer-events-none absolute -right-20 -top-20 h-[26rem] w-[26rem] text-sawdust/[0.06]"
      />
      <Container className="relative py-24 sm:py-32">
        <p className="eyebrow-dark">404</p>
        <h1 className="h-display mt-4 max-w-2xl">Page not found</h1>
        <p className="prose-body mt-5 text-lg text-sawdust-muted">
          That page does not exist. If you are trying to get a tree looked at, the fastest
          way is to call.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={TEL_HREF} data-cta="call" className="btn-primary">
            <Phone className="h-5 w-5" aria-hidden="true" />
            Call {SITE.phoneDisplay}
          </a>
          <Link href="/" className="btn-secondary-dark">
            Back to home
          </Link>
        </div>
      </Container>
    </section>
  )
}
