import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { REVIEWS } from '@/content/reviews'

/**
 * Real Google reviews only.
 *
 * The whole section returns null while REVIEWS is empty — no fallback, no
 * paraphrase of reviews left elsewhere, no empty state. A tree service quoting
 * itself is worth nothing to a homeowner; the honest options are real reviews or
 * silence, and silence is the one we can stand behind today.
 *
 * The Angi/Networx material stays in seo/FACTS.md as internal provenance for the
 * copy. It is not published.
 *
 * ⛔ Never add Review or AggregateRating JSON-LD here. Self-serving review markup
 * on your own site violates Google's structured data guidelines. Permanent.
 */
export function ReviewsSection() {
  if (REVIEWS.length === 0) return null

  return (
    <Section tone="dim" labelledBy="reviews-heading">
      <Reveal>
        <p className="eyebrow">Reviews</p>
        <h2 id="reviews-heading" className="h-section mt-3">
          What customers say
        </h2>
      </Reveal>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {REVIEWS.map((r) => (
          <li key={r.quote.slice(0, 40)} className="card">
            <blockquote className="text-base leading-relaxed text-ink-soft">
              &ldquo;{r.quote}&rdquo;
            </blockquote>
            <p className="mt-4 font-display text-sm font-bold uppercase tracking-wide text-moss">
              {r.name}
              {r.town ? ` · ${r.town}` : ''} · {r.source}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
