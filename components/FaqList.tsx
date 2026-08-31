import { ChevronDown } from 'lucide-react'
import type { Faq } from '@/content/faq-types'
import { SITE } from '@/site.config'

/**
 * Built on native <details>/<summary> rather than a JS accordion. Three reasons,
 * all of which matter more than the animation we give up:
 *   - keyboard and screen-reader behaviour is the browser's, so it is correct
 *   - it works with JS disabled or still loading
 *   - the answer text is in the DOM either way, so crawlers and AI answer engines
 *     read it whether or not it is expanded — which is the entire point of an FAQ
 *     block on a page like this
 *
 * Gating: an FAQ with `requires` renders only when that flag is true in
 * site.config.ts. "Are you insured?" must never appear while SITE.insured is
 * false — an insurance question with a dodged answer is worse than no question.
 */
export function visibleFaqs(faqs: Faq[]): Faq[] {
  return faqs.filter((f) => {
    if (f.requires === 'insured') return SITE.insured
    if (f.requires === 'emergency') return SITE.emergency
    return true
  })
}

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const shown = visibleFaqs(faqs)
  if (shown.length === 0) return null

  return (
    <div className="mt-10 divide-y divide-sawdust-dim border-y border-sawdust-dim">
      {shown.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl font-bold uppercase tracking-tight [&::-webkit-details-marker]:hidden">
            {faq.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-moss transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-prose pb-5 text-base leading-relaxed text-ink-soft">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
