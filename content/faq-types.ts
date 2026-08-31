/**
 * FAQ shape, shared by the homepage and every service page.
 *
 * CRITICAL: whatever renders on the page is what goes into the FAQPage JSON-LD,
 * built from this same array. There is no second copy of the copy. Google requires
 * schema to match visible content, and the reliable way to guarantee that is to
 * have exactly one source — see app/components/JsonLd usage in Phase 4.
 */
export type Faq = {
  question: string
  /** 2-4 sentences. Direct answer FIRST, then the caveat. Never invents a fact. */
  answer: string
  /**
   * Gate. The FAQ renders only when the named flag in site.config.ts is true.
   * "Are you insured?" must not appear at all while SITE.insured is false —
   * an unanswered insurance question is worse than no question.
   */
  requires?: 'insured' | 'emergency'
}
