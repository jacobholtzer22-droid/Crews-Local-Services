import type { Metadata } from 'next'
import { abs } from '@/lib/schema'
import { SITE } from '@/site.config'

/**
 * Page metadata helper.
 *
 * Titles here are mostly ABSOLUTE rather than run through the layout's
 * "%s | Crews Local Services" template. The template adds 22 characters, which
 * pushes several of these past the ~60-character mark where Google truncates in
 * the SERP — and a truncated title loses the city, which is the most important
 * word on a local page. Where the template fits, it is used.
 *
 * Descriptions are 140-160 characters and written as a direct answer, not a
 * slogan, because that is what gets lifted into an AI answer or a snippet.
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = true,
}: {
  title: string
  description: string
  path: string
  absoluteTitle?: boolean
}): Metadata {
  const url = abs(path)
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      images: [{ url: abs('/og.png'), width: 1200, height: 630, alt: SITE.name }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [abs('/og.png')],
    },
  }
}
