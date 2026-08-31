/**
 * Real Google reviews, verbatim, with the reviewer's first name.
 *
 * ⛔ EMPTY. The reviews section renders NOTHING while this array is empty — no
 * fallback, no paraphrase of reviews left on other platforms, no empty state.
 * That is deliberate: a business quoting a summary of itself is worth nothing to
 * a homeowner, and the honest options are real reviews or silence.
 *
 * Rules for adding:
 *  - Only reviews Brandon or Jacob actually received. No paraphrasing, no
 *    composites, no "representative" examples, no invented first names.
 *  - Paste the text verbatim. Do not tidy the grammar.
 *  - First name, or first name + last initial. Town only if the reviewer said one.
 *
 * ⛔ NEVER add Review or AggregateRating JSON-LD for these. Self-serving review
 * markup on your own site violates Google's structured data guidelines. This is
 * permanent, not a "later" item.
 *
 * The Angi/Networx review themes that informed the site copy live in
 * seo/FACTS.md as internal provenance. They are not published.
 */
export type Review = {
  /** Verbatim. Do not correct spelling or grammar. */
  quote: string
  /** First name, or first name + last initial. */
  name: string
  /** Where it was left, e.g. "Google". */
  source: string
  /** Town, if the reviewer stated one. */
  town?: string
}

export const REVIEWS: Review[] = []
