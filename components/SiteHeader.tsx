'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { RingMark } from '@/components/RingMark'
import { SERVICES } from '@/content/services'
import { SITE, TEL_HREF } from '@/site.config'
import { cn } from '@/lib/cn'

const NAV = [
  ...SERVICES.map((s) => ({ href: `/${s.slug}`, label: s.label })),
  { href: '/service-area', label: 'Service Area' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close the drawer on route change, or it stays open over the new page.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="on-bark sticky top-0 z-40 border-b border-bark-500 bg-bark text-sawdust">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded"
          aria-label={`${SITE.name}, home`}
        >
          <RingMark className="h-9 w-9 shrink-0 text-blaze" />
          <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight sm:text-2xl">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded font-display text-base font-semibold uppercase tracking-wide transition-colors',
                  active ? 'text-blaze' : 'text-sawdust hover:text-blaze',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={TEL_HREF}
            data-cta="call"
            className="hidden min-h-[44px] items-center gap-2 rounded px-2 font-display text-lg font-bold tracking-wide text-sawdust transition-colors hover:text-blaze sm:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>

          <Link href="/free-estimate" className="btn-primary hidden text-base sm:inline-flex">
            Free Estimate
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded text-sawdust lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-bark-500 bg-bark lg:hidden"
        >
          <ul className="container-page flex flex-col py-2">
            {NAV.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-[52px] items-center rounded font-display text-lg font-semibold uppercase tracking-wide',
                      active ? 'text-blaze' : 'text-sawdust',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li className="py-3">
              <Link href="/free-estimate" className="btn-primary w-full">
                Free Estimate
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
