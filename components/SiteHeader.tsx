'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { RingMark } from '@/components/RingMark'
import { SERVICES } from '@/content/services'
import { SITE, TEL_HREF } from '@/site.config'
import { cn } from '@/lib/cn'

const SERVICE_HREFS = SERVICES.map((s) => `/${s.slug}`)

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const servicesRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const onServices = SERVICE_HREFS.includes(pathname)

  // Close everything on route change, or a menu stays open over the new page.
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /** Header gains depth once the page has moved. Passive listener, no layout reads. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeServices = useCallback((refocus = false) => {
    setServicesOpen(false)
    if (refocus) triggerRef.current?.focus()
  }, [])

  // Escape closes and returns focus to the trigger; a click or a focus move
  // outside closes without stealing focus. Both are required for a dropdown to
  // be usable by keyboard and by screen reader, not just by mouse.
  useEffect(() => {
    if (!servicesOpen) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeServices(true)
    }
    const onOutside = (e: Event) => {
      const el = servicesRef.current
      if (el && !el.contains(e.target as Node)) closeServices()
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onOutside)
    document.addEventListener('focusin', onOutside)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onOutside)
      document.removeEventListener('focusin', onOutside)
    }
  }, [servicesOpen, closeServices])

  return (
    <header
      className={cn(
        'on-bark sticky top-0 z-40 border-b bg-bark text-sawdust transition-shadow duration-300',
        scrolled
          ? 'border-bark-500 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.7)]'
          : 'border-bark-500/40',
      )}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 rounded" aria-label={`${SITE.name}, home`}>
          <RingMark className="h-9 w-9 shrink-0 text-blaze" />
          <span className="font-display text-xl font-extrabold uppercase leading-none tracking-tight sm:text-2xl">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          <div ref={servicesRef} className="relative">
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="services-menu"
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className={cn(
                'flex min-h-[44px] items-center gap-1.5 rounded font-display text-base font-semibold uppercase tracking-wide transition-colors',
                onServices || servicesOpen ? 'text-blaze' : 'text-sawdust hover:text-blaze',
              )}
            >
              Services
              <ChevronDown
                className={cn('h-4 w-4 transition-transform duration-200', servicesOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </button>

            {servicesOpen && (
              <div
                id="services-menu"
                className="absolute left-0 top-full z-50 mt-2 w-64 animate-reveal rounded-lg border border-bark-500 bg-bark-700 p-2 shadow-[0_20px_40px_-16px_rgb(0_0_0/0.8)]"
              >
                <ul>
                  {SERVICES.map((s) => {
                    const href = `/${s.slug}`
                    const active = pathname === href
                    return (
                      <li key={s.slug}>
                        <Link
                          href={href}
                          aria-current={active ? 'page' : undefined}
                          className={cn(
                            'flex min-h-[44px] items-center rounded px-3 font-display text-base font-semibold uppercase tracking-wide transition-colors',
                            active ? 'text-blaze' : 'text-sawdust hover:bg-bark hover:text-blaze',
                          )}
                        >
                          {s.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>

          {[
            { href: '/service-area', label: 'Areas' },
            { href: '/about', label: 'About' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              className={cn(
                'rounded font-display text-base font-semibold uppercase tracking-wide transition-colors',
                pathname === item.href ? 'text-blaze' : 'text-sawdust hover:text-blaze',
              )}
            >
              {item.label}
            </Link>
          ))}
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
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded text-sawdust lg:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-bark-500 bg-bark lg:hidden">
          <ul className="container-page flex flex-col py-2">
            <li className="pt-2">
              <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-blaze">
                Services
              </span>
            </li>
            {/* Indented group, still 44px+ targets. */}
            {SERVICES.map((s) => {
              const href = `/${s.slug}`
              return (
                <li key={s.slug}>
                  <Link
                    href={href}
                    aria-current={pathname === href ? 'page' : undefined}
                    className={cn(
                      'flex min-h-[48px] items-center rounded pl-4 font-display text-lg font-semibold uppercase tracking-wide',
                      pathname === href ? 'text-blaze' : 'text-sawdust',
                    )}
                  >
                    {s.label}
                  </Link>
                </li>
              )
            })}

            {[
              { href: '/service-area', label: 'Areas' },
              { href: '/about', label: 'About' },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={cn(
                    'flex min-h-[48px] items-center rounded font-display text-lg font-semibold uppercase tracking-wide',
                    pathname === item.href ? 'text-blaze' : 'text-sawdust',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}

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
