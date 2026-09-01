'use client'

import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { visibleFaqs, type Faq } from '@/content/faq-types'

/**
 * Still native <details>/<summary>. Keyboard and screen-reader behaviour is the
 * browser's, it works before JS loads, and the answer text is in the DOM whether
 * or not it is expanded, which is the entire point of an FAQ block for crawlers
 * and AI answer engines.
 *
 * The JS below is a pure enhancement for the CLOSING animation only. A native
 * <details> sets display:none the instant `open` is removed, so a close cannot be
 * animated by CSS alone. On close we cancel the default, tag the element so the
 * reverse keyframe runs, then remove `open` when it finishes. With JS disabled,
 * or with prefers-reduced-motion (which zeroes the duration), it degrades to the
 * native instant toggle.
 */
const CLOSE_MS = 180

export function FaqList({ faqs }: { faqs: Faq[] }) {
  const shown = visibleFaqs(faqs)
  const closing = useRef<WeakSet<HTMLDetailsElement>>(new WeakSet())

  if (shown.length === 0) return null

  function onSummaryClick(e: React.MouseEvent<HTMLElement>) {
    const details = e.currentTarget.parentElement as HTMLDetailsElement | null
    if (!details || !details.open) return // opening: let the browser do it

    // Already animating out: let the timeout finish the job.
    if (closing.current.has(details)) return

    e.preventDefault()
    closing.current.add(details)
    details.classList.add('is-closing')

    window.setTimeout(() => {
      details.classList.remove('is-closing')
      details.open = false
      closing.current.delete(details)
    }, CLOSE_MS)
  }

  return (
    <div className="mt-10 divide-y divide-sawdust-dim border-y border-sawdust-dim">
      {shown.map((faq) => (
        <details key={faq.question} className="group">
          <summary
            onClick={onSummaryClick}
            className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl font-bold uppercase tracking-tight transition-colors hover:text-moss [&::-webkit-details-marker]:hidden"
          >
            {faq.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-moss transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="faq-body max-w-prose pb-5 text-base leading-relaxed text-ink-soft">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
