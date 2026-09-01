import Image from 'next/image'
import { RingMark } from '@/components/RingMark'
import type { Photo } from '@/content/photos'
import { cn } from '@/lib/cn'

/**
 * A real photo where we have one, the end-grain panel where we do not.
 *
 * The fallback is deliberate and permanent: if a photo is missing, the answer is
 * the textured panel, never a stock image of somebody else's crew and somebody
 * else's truck. That is how every interchangeable tree service site on the first
 * page looks, and a homeowner can tell.
 *
 * width/height come from the registry and are the real encoded dimensions, so the
 * browser reserves the box before the bytes land. This is what keeps CLS at 0.
 */
export function PhotoSlot({
  photo,
  alt,
  className,
  priority = false,
  /** Tailwind aspect ratio for the frame. Portrait photos get a portrait frame. */
  aspect,
  /**
   * Real rendered width, not a vw guess. The photo column is 2 of 5 in a
   * max-w-6xl (1152px) grid, so it renders at roughly 460px. Left as a vw
   * fraction, Next asked the optimizer for a 3840px variant of a 750px source:
   * a pointless round trip for an image that can never be that big.
   */
  sizes = '(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw',
}: {
  /** Omit to render the end-grain fallback. */
  photo?: Photo
  /** Fallback-only label, kept for the no-photo case. */
  alt?: string
  className?: string
  priority?: boolean
  aspect?: string
  sizes?: string
}) {
  if (!photo) {
    return (
      <div
        className={cn(
          'end-grain relative flex items-center justify-center overflow-hidden rounded-lg border border-bark-500',
          aspect ?? 'aspect-[4/3]',
          className,
        )}
        data-photo-alt={alt}
      >
        <RingMark variant="field" className="h-2/3 w-2/3 text-sawdust/[0.09]" />
      </div>
    )
  }

  const ratio = photo.width / photo.height
  const frame = aspect ?? (ratio < 0.95 ? 'aspect-[3/4]' : ratio > 1.15 ? 'aspect-[4/3]' : 'aspect-square')

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-bark-500/30 bg-bark',
        frame,
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        // Everything below the fold waits its turn; only the hero is eager.
        loading={priority ? undefined : 'lazy'}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
