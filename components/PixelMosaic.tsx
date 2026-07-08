import type { CSSProperties } from "react";

/**
 * Generated pixel-mosaic texture — a dense grid of small squares at pseudo-random
 * opacities (mostly lighter, some darker, a few empty cells). Rendered as an inline
 * SVG pattern so it inherits any color and needs no static asset.
 *
 * Deterministic (computed once at module load) so server markup is stable.
 * Fade it by passing a CSS `maskImage` via `style`; caller positions/sizes it.
 */

const TILE = 320; // pattern tile size (px)
const PITCH = 20; // grid cell size (spacing between pixels — unchanged)
const SQUARE = 11; // square size — smaller pixels, same pitch

const PATTERN_CELLS = (() => {
  const cells: { x: number; y: number; o: number; dark: boolean }[] = [];
  let seed = 20240607;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const n = TILE / PITCH;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (rand() < 0.1) continue; // ~10% empty cells
      const dark = rand() > 0.62; // ~38% darker, rest lighter
      const o = dark ? 0.05 + rand() * 0.13 : 0.04 + rand() * 0.2;
      cells.push({ x: x * PITCH, y: y * PITCH, o, dark });
    }
  }
  return cells;
})();

export interface PixelMosaicProps {
  /** Unique SVG pattern id (must differ between instances on the same page). */
  patternId: string;
  lightColor?: string;
  darkColor?: string;
  className?: string;
  style?: CSSProperties;
}

export function PixelMosaic({
  patternId,
  lightColor = "#FFFFFF",
  darkColor = "#0A2E8C",
  className,
  style,
}: PixelMosaicProps) {
  return (
    <svg aria-hidden className={className} style={style}>
      <defs>
        <pattern id={patternId} width={TILE} height={TILE} patternUnits="userSpaceOnUse">
          {PATTERN_CELLS.map((c, i) => (
            <rect
              key={i}
              x={c.x}
              y={c.y}
              width={SQUARE}
              height={SQUARE}
              rx="1"
              fill={c.dark ? darkColor : lightColor}
              opacity={c.o}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
