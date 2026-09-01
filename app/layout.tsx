import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed } from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { MobileCtaBar } from '@/components/MobileCtaBar'
import { JsonLd } from '@/components/JsonLd'
import { siteGraph } from '@/lib/schema'
import { IS_LAUNCH_READY } from '@/lib/launch-state'
import { CITY_STATE, SITE } from '@/site.config'
import './globals.css'

/**
 * Barlow Condensed for display, Barlow for body.
 *
 * Barlow is drawn from Californian industrial/transit signage, it reads as work-truck
 * lettering and equipment decals rather than as a brochure face. The condensed cut
 * matters practically as well as tonally: the H1 "Tree removal, trimming, and stump
 * grinding in Battle Creek, MI" has to hold at hero size on a 375px screen, and a
 * normal-width grotesque forces it down to a size that stops being a headline.
 *
 * Self-hosted by next/font (no runtime request to Google), display:swap so text is
 * never invisible, and the CSS variables are consumed by tailwind.config.ts.
 */
const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const body = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  // Every relative URL in metadata (canonicals, OG images) resolves against this.
  metadataBase: new URL(SITE.url),
  title: {
    default: `Tree Service in ${CITY_STATE} | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description: `Tree removal, tree trimming and stump grinding in ${CITY_STATE}. Free on-site estimates, full cleanup. Call ${SITE.phoneDisplay}.`,
  openGraph: {
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  /**
   * A build without the real domain has TODO.example.com in every canonical, OG
   * URL and schema @id. It is safe to look at and unsafe to index, so until the
   * domain and CRM slug are set the whole site is noindex. Set them and this
   * flips to indexable automatically. See lib/launch-state.ts.
   */
  ...(IS_LAUNCH_READY ? {} : { robots: { index: false, follow: false } }),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // No maximumScale / userScalable:false, never disable pinch zoom.
  themeColor: '#1A1512',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-blaze focus:px-4 focus:py-2 focus:font-display focus:font-bold focus:uppercase focus:text-bark"
        >
          Skip to main content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1">
          {children}
        </main>

        <SiteFooter />
        <MobileCtaBar />

        {/* Site-wide graph: HomeAndConstructionBusiness + WebSite + Organization.
            Per-page BreadcrumbList / Service / FAQPage nodes live on their pages. */}
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  )
}
