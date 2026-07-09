/**
 * Generated pixel-mosaic texture — a strict, uniform grid of equal-size squares
 * separated by a thin "grout" gap. Two coverage models:
 *
 *  - sparse (default, CTA band): most cells sit at the base colour (blend in);
 *    a scattered ~13% get a subtle lighter/darker shade, so the field reads as
 *    a faint tile texture with sparse accents.
 *  - full (`full` prop, footer): every cell renders a square at a varied
 *    brightness, giving a continuous woven texture. Pair with a directional
 *    `maskImage` (e.g. top→bottom) to fade it out across the section.
 *
 * A subset of cells twinkle via SMIL `<animate>` (not CSS) because CSS
 * animation inside an SVG <pattern> does not repaint the tiled output in
 * Safari/WebKit — SMIL does, in every browser.
 *
 * Deterministic (computed once at module load) so server markup is stable.
 */

const TILE = 320; // pattern tile size (px) — 320 / PITCH must be a whole number
const PITCH = 16; // grid cell size (square + grout)
const SQUARE = 13; // square size — leaves a consistent ~3px grout line

// Sparse model: share of cells that get a visible shade.
const ACCENT_RATIO = 0.16;

type Role = "base" | "light" | "dark";
type Flick = "dim" | "glow" | null;
type Cell = { x: number; y: number; o: number; role: Role; flick: Flick; dur: number; delay: number };

function buildCells(mode: "sparse" | "full"): Cell[] {
  const cells: Cell[] = [];
  let seed = mode === "full" ? 99811 : 20240607;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  const n = TILE / PITCH;
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let o: number;
      let role: Role = "base";
      let flick: Flick = null;
      let dur = 0;
      let delay = 0;

      if (mode === "full") {
        // Full coverage: every cell filled, brightness varies per cell. The
        // top→bottom fade is applied by the caller's mask, not baked in here.
        o = 0.2 + rand() * 0.5; // 0.20–0.70
        role = "light";
        if (rand() < 0.15) {
          flick = "dim";
          dur = 3 + rand() * 3;
          delay = rand() * 4;
        }
      } else {
        const r = rand();
        if (r < ACCENT_RATIO) {
          // Sparse accent: semi-transparent so it blends into the band (paired
          // with a multiply blend on the layer) rather than sitting as a block.
          const dark = rand() < 0.5;
          role = dark ? "dark" : "light";
          o = 0.5 + rand() * 0.28; // 0.50–0.78
          flick = dark ? "dim" : "glow";
          dur = 3 + rand() * 3;
          delay = rand() * 4;
        } else {
          o = 0.26 + rand() * 0.16; // 0.26–0.42 base tiles — soft woven grid
        }
      }
      cells.push({ x: x * PITCH, y: y * PITCH, o, role, flick, dur, delay });
    }
  }
  return cells;
}

const SPARSE_CELLS = buildCells("sparse");
const FULL_CELLS = buildCells("full");

// Gentle opacity keyframe endpoints for a twinkling cell.
function flickValues(c: Cell): string {
  if (c.flick === "glow") return `${c.o};${Math.min(1, c.o * 1.9).toFixed(3)};${c.o}`;
  return `${c.o};${(c.o * 0.45).toFixed(3)};${c.o}`;
}

export interface PixelMosaicProps {
  /** Unique SVG pattern id (must differ between instances on the same page). */
  patternId: string;
  /** Colour for lighter squares (and, in `full` mode, every square). */
  lightColor?: string;
  /** Colour for darker accent squares (sparse mode). */
  darkColor?: string;
  /** Colour for the majority "base" tiles (sparse mode; defaults to lightColor). */
  baseColor?: string;
  /** Fill every cell at a varied brightness instead of sparse accents. */
  full?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function PixelMosaic({
  patternId,
  lightColor = "#FFFFFF",
  darkColor = "#0A2E8C",
  baseColor,
  full = false,
  className,
  style,
}: PixelMosaicProps) {
  const base = baseColor ?? lightColor;
  const cells = full ? FULL_CELLS : SPARSE_CELLS;
  const fillFor = (role: Role) => (role === "dark" ? darkColor : role === "light" ? lightColor : base);
  return (
    <svg aria-hidden className={className} style={style}>
      <defs>
        <pattern id={patternId} width={TILE} height={TILE} patternUnits="userSpaceOnUse">
          {cells.map((c, i) => (
            <rect
              key={i}
              x={c.x}
              y={c.y}
              width={SQUARE}
              height={SQUARE}
              rx="1"
              fill={fillFor(c.role)}
              opacity={c.o}
            >
              {c.flick && (
                <animate
                  attributeName="opacity"
                  values={flickValues(c)}
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
                  dur={`${c.dur}s`}
                  begin={`${c.delay}s`}
                  repeatCount="indefinite"
                />
              )}
            </rect>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
