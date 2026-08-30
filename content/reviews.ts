/**
 * Real Google reviews only.
 *
 * ⛔ EMPTY ON PURPOSE. Nothing renders in the reviews section while this array is
 * empty — that is correct behavior, not a bug to work around.
 *
 * Rules:
 *  - Only reviews Brandon or Jacob has actually received. No paraphrasing, no
 *    composites, no "representative" examples.
 *  - First name + last initial at most, plus the source and the town if known.
 *  - NEVER add Review or AggregateRating JSON-LD for these. Self-serving review
 *    markup on your own site violates Google's structured data guidelines, and the
 *    rich result it is meant to buy has not been granted for local service sites
 *    for years. They are displayed as plain text because that is the honest way.
 *
 * To add one: paste the review text verbatim, don't tidy the grammar.
 */
export type Review = {
  /** Verbatim review text. */
  quote: string
  /** First name, or first name + last initial. */
  name: string
  /** Where it was left, e.g. "Google". */
  source: string
  /** Town, if the reviewer stated one. Optional. */
  town?: string
}

export const REVIEWS: Review[] = []
