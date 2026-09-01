import type { MetadataRoute } from 'next'
import { SERVICES } from '@/content/services'
import { abs } from '@/lib/schema'

/**
 * Every real, indexable page. There are no excluded routes on this site, nothing
 * is noindexed, because everything here is public marketing content.
 *
 * lastModified is intentionally omitted rather than stamped with the build date:
 * a lastModified that changes on every deploy whether or not the content did is
 * noise, and Google discounts it once it notices.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: '/', priority: 1.0 },
    { path: '/free-estimate', priority: 0.9 },
    { path: '/service-area', priority: 0.7 },
    { path: '/about', priority: 0.6 },
    { path: '/privacy', priority: 0.3 },
  ]

  return [
    ...staticPaths.map((p) => ({
      url: abs(p.path),
      changeFrequency: 'monthly' as const,
      priority: p.priority,
    })),
    ...SERVICES.map((s) => ({
      url: abs(`/${s.slug}`),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
