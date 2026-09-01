import type { Config } from 'tailwindcss'

/**
 * Palette derived from the actual material of the work: bark and charcoal, the
 * cream of a fresh-cut end grain, hi-vis safety orange, and a muted Michigan moss.
 *
 * Every foreground/background pair used in the UI is verified by `npm run contrast`.
 * Two results from that check constrain the design and must not be undone:
 *
 *   1. CTA buttons are `blaze` background with `bark` TEXT, never white text.
 *      bark-on-blaze = 5.19:1 (AA at any size). White-on-blaze = ~3.5:1 (fails AA
 *      for normal text). Dark-on-orange is also the real hi-vis convention.
 *   2. `blaze` on `sawdust` is only 3.05:1 — orange on the light background is
 *      restricted to LARGE text (>=24px bold) and borders. Never small orange body text.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /** Deepest brown-black. Page base for dark bands, hero, footer. */
        bark: {
          DEFAULT: '#1A1512',
          700: '#2E2620', // elevated dark surface (cards on dark)
          500: '#4A3F36', // borders/dividers on dark (non-text)
        },
        /** Fresh-cut wood cream. The light surface — deliberately not white. */
        sawdust: {
          DEFAULT: '#F4EFE6',
          dim: '#E6DDCD', // secondary light fill, borders on light
          muted: '#BFB3A2', // secondary TEXT on dark surfaces (8.78:1 on bark)
        },
        /** Safety orange. CTAs only — never decorative, never a section background fill. */
        blaze: {
          DEFAULT: '#E4610F',
          hover: '#C8520B',
        },
        /** Quiet secondary. Icons, accents, dividers. Never a CTA. */
        moss: {
          DEFAULT: '#4A5D3A',
          dim: '#6E8256',
        },
        /**
         * Body text on light surfaces.
         *
         * These are SOLID tokens on purpose. Tailwind's `text-ink/60` is not the
         * ink token — it is ink composited over whatever happens to be behind it,
         * so the same class passes contrast on `sawdust` and fails on
         * `sawdust-dim`. That exact bug shipped here once and Lighthouse caught
         * it. Use these instead of an opacity modifier for any TEXT; the ratios
         * below are against `sawdust-dim`, the harder of the two light surfaces,
         * and `npm run contrast` re-verifies them.
         */
        ink: {
          DEFAULT: '#14100D', // primary body text        — 14.05:1
          soft: '#3E3933', //    secondary body text      —  8.48:1
          muted: '#5E5850', //   captions and small print —  5.22:1
          faint: '#726C63', //   input placeholders only  —  3.86:1
        },
      },
      fontFamily: {
        // Injected by next/font in app/layout.tsx — no network <link>, no FOIT.
        display: ['var(--font-display)', 'Barlow Condensed', 'Oswald', 'Impact', 'sans-serif'],
        sans: ['var(--font-body)', 'Barlow', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      /**
       * 1.25 (major third) scale off a 17px base. 17px because 16px is the floor
       * that stops iOS auto-zooming form inputs, and this audience reads on a phone
       * outdoors, often one-handed, often over 45.
       */
      fontSize: {
        '2xs': ['0.75rem', { lineHeight: '1.1rem' }], // 12 — legal/footnote only
        xs: ['0.8125rem', { lineHeight: '1.2rem' }], // 13
        sm: ['0.9375rem', { lineHeight: '1.45rem' }], // 15
        base: ['1.0625rem', { lineHeight: '1.7rem' }], // 17 — body, 1.6 leading
        lg: ['1.1875rem', { lineHeight: '1.9rem' }], // 19 — lead paragraphs
        xl: ['1.375rem', { lineHeight: '2rem' }], // 22
        '2xl': ['1.75rem', { lineHeight: '2.1rem' }], // 28
        '3xl': ['2.1875rem', { lineHeight: '2.4rem' }], // 35
        '4xl': ['2.75rem', { lineHeight: '2.9rem' }], // 44
        '5xl': ['3.4375rem', { lineHeight: '3.5rem' }], // 55
        '6xl': ['4.3125rem', { lineHeight: '4.3rem' }], // 69 — hero only
      },
      maxWidth: {
        prose: '68ch', // 60-75 char measure for body copy
      },
      borderRadius: {
        // Restrained. This is a work truck, not a wellness app.
        DEFAULT: '3px',
        md: '5px',
        lg: '8px',
      },
      keyframes: {
        // Every keyframe below animates opacity and transform ONLY. Nothing here
        // touches width, height, top or left, so none of it can trigger layout
        // and none of it can move CLS off zero.
        reveal: {
          from: { opacity: '0', transform: 'translate3d(0, 12px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        heroIn: {
          from: { opacity: '0', transform: 'translate3d(0, 14px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        /** The one looping animation on the site. 120s per revolution: felt, not seen. */
        ringDrift: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        barUp: {
          from: { transform: 'translate3d(0, 100%, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
        faqOpen: {
          from: { opacity: '0', transform: 'translate3d(0, -6px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        reveal: 'reveal 420ms cubic-bezier(0.16, 1, 0.3, 1) both',
        heroIn: 'heroIn 560ms cubic-bezier(0.16, 1, 0.3, 1) both',
        ringDrift: 'ringDrift 120s linear infinite',
        barUp: 'barUp 420ms cubic-bezier(0.16, 1, 0.3, 1) both 300ms',
        faqOpen: 'faqOpen 220ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
