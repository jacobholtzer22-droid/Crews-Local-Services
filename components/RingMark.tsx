/**
 * THE signature element: an end-grain tree ring, drawn as inline SVG.
 *
 * Deliberately OFF-CENTER. Real trunks are — a tree leaning into prevailing wind
 * lays down wider growth rings on one side (reaction wood), so the pith sits off
 * to one side and the rings bunch on the other. A perfectly concentric target
 * reads as a logo template; this reads as something Brandon has cut through.
 *
 * Used in exactly three places and nowhere else, so it still registers:
 *   1. the hero, large and faint, bleeding off the edge  (variant="field")
 *   2. the section divider, small and solid              (variant="mark")
 *   3. the favicon
 *
 * Decorative in every placement, so it is aria-hidden with no title.
 */

type Props = {
  className?: string
  /** "mark" = crisp small logo. "field" = large faint background texture. */
  variant?: 'mark' | 'field'
}

/** Pith (growth center), pushed up and right of the geometric center. */
const PITH_X = 57
const PITH_Y = 43

/**
 * Ring radii. Spacing widens outward the way real growth rings do, with two
 * tight pairs standing in for slow-growth years.
 */
const RINGS = [3.5, 7, 9.5, 14, 19, 21, 27, 34, 39, 47, 55, 64, 74, 85]

export function RingMark({ className, variant = 'mark' }: Props) {
  const isField = variant === 'field'
  const strokeBase = isField ? 0.9 : 1.5

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Clip everything to the log's outer edge so the off-center rings get cut
          off asymmetrically — which is what makes it read as a real cross-section. */}
      <defs>
        <clipPath id={`ring-clip-${variant}`}>
          <circle cx="50" cy="50" r="48" />
        </clipPath>
      </defs>

      <g clipPath={`url(#ring-clip-${variant})`}>
        {RINGS.map((r, i) => (
          <circle
            key={r}
            cx={PITH_X}
            cy={PITH_Y}
            r={r}
            stroke="currentColor"
            strokeWidth={strokeBase * (i % 3 === 0 ? 1.25 : 0.8)}
            opacity={isField ? 0.55 : 0.85 - i * 0.028}
          />
        ))}

        {/* The pith itself. */}
        <circle cx={PITH_X} cy={PITH_Y} r="1.4" fill="currentColor" opacity={isField ? 0.6 : 0.9} />

        {/* A radial check — the split that opens from the center as a round dries.
            One only. Two starts to look like a logo of a broken thing. */}
        <path
          d={`M ${PITH_X} ${PITH_Y} L ${PITH_X - 30} ${PITH_Y + 54} L ${PITH_X - 25} ${PITH_Y + 55} Z`}
          fill="currentColor"
          opacity={isField ? 0.35 : 0.55}
        />
      </g>

      {/* Bark edge. */}
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="currentColor"
        strokeWidth={strokeBase * 1.6}
        opacity={isField ? 0.5 : 1}
      />
    </svg>
  )
}
