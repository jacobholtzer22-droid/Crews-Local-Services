'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'

/**
 * One scroll reveal, on section entry. Hand-rolled on IntersectionObserver rather
 * than pulling in framer-motion (~35kB gz) — this site is judged on how fast it
 * opens on a phone with two bars of signal, and a fade-up does not justify a
 * animation runtime.
 *
 * Content is present in the DOM and readable from the first byte either way; this
 * only animates opacity/transform, so a JS failure or a crawler sees everything.
 * `prefers-reduced-motion` is honored globally in globals.css, which zeroes the
 * duration — the element still ends up visible.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  /** ms. Use 60-90ms steps for sibling cards; never more than ~4 steps. */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // No IntersectionObserver (very old browser): show immediately rather than
    // leaving content invisible forever.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      // Fire a little before the element reaches the viewport so the motion has
      // finished by the time the user is actually looking at it.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={cn(shown ? 'animate-reveal' : 'opacity-0', className)}
      style={shown && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
