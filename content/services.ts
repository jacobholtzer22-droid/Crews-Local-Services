import type { ServiceSlug } from '@/site.config'

/**
 * Service metadata — labels, routes and one-line summaries used by the nav, the
 * homepage cards and each service page's metadata.
 *
 * Full page copy lands in Phase 2. Nothing here states a capability Crews has not
 * been shown to perform: removal, trimming and stump grinding come from the
 * Yelp/Yahoo business description, and storm cleanup from a listing photo of a
 * fallen tree cleared at a church/daycare. See seo/FACTS.md.
 */
export type Service = {
  slug: ServiceSlug
  /** Nav + card label. */
  label: string
  /** Used in H1s and titles: "{noun} in Battle Creek, MI". */
  noun: string
  /** One line, homeowner's-side, on the service card. */
  summary: string
}

export const SERVICES: Service[] = [
  {
    slug: 'tree-removal',
    label: 'Tree Removal',
    noun: 'Tree Removal',
    summary:
      'Whole trees taken down and hauled off, including tight spots near wires, fences and roofs.',
  },
  {
    slug: 'tree-trimming',
    label: 'Tree Trimming',
    noun: 'Tree Trimming',
    summary:
      'Deadwood, low limbs and branches over the roof or driveway cut back before they come down on their own.',
  },
  {
    slug: 'stump-grinding',
    label: 'Stump Grinding',
    noun: 'Stump Grinding',
    summary:
      'The leftover stump ground below grade so you can mow straight over it.',
  },
  {
    slug: 'storm-damage-cleanup',
    label: 'Storm Cleanup',
    noun: 'Storm Damage Cleanup',
    summary:
      'Trees and limbs down after a storm cleared out and hauled away.',
  },
]

export const SERVICE_BY_SLUG = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s]),
) as Record<ServiceSlug, Service>
