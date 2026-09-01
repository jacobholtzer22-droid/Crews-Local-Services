import { RingMark } from '@/components/RingMark'

/**
 * Where a real photo goes.
 *
 * There are ZERO photos of Brandon's work available, so rather than fill the space
 * with a stock image of somebody else's crew and somebody else's truck, which is
 * how every interchangeable tree service site on the first page looks, this
 * renders the end-grain panel.
 *
 * TODO (Jacob): drop real photos into public/photos/ and replace this component's
 * body with a next/image carrying explicit width and height (CLS) and the alt text
 * passed in below. See public/photos/README.md and seo/FACTS.md → Photos.
 */
export function PhotoSlot({ alt, className }: { alt: string; className?: string }) {
  return (
    <div
      className={`end-grain relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-bark-500 ${className ?? ''}`}
      // The alt text is already written and lives with the content, so swapping in
      // a real <Image> later is a one-line change rather than a copy exercise.
      data-photo-alt={alt}
    >
      <RingMark variant="field" className="h-2/3 w-2/3 text-sawdust/[0.09]" />
    </div>
  )
}
