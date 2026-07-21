/* FinOps UI kit — small, reusable presentational primitives used to compose the
   product-scene mockups across the FinOps platform page. All theme-aware via
   cv-* tokens, motion is CSS-only (safe in server components). Nothing here is a
   full dashboard: each piece is one cropped slice of product UI. */

import type { CSSProperties, ReactNode } from "react";

export const C = {
  blue: "#1664C0",
  blueLt: "#7CB8F8",
  teal: "#0E9E7A",
  purple: "#6954D4",
  amber: "#D97706",
  red: "#E5484D",
} as const;

/* Glassmorphic floating card. `glow` adds a tinted ambient bloom behind it,
   `rotate` gives the subtle 2–5° tilt for layered product scenes. */
export function GlassCard({
  children,
  className = "",
  glow,
  rotate = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
  rotate?: number;
  style?: CSSProperties;
}) {
  return (
    <div className="relative" style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px]"
          style={{ background: `radial-gradient(closest-side, ${glow}, transparent 75%)`, filter: "blur(28px)" }}
        />
      )}
      <div
        className={
          "cv-visual-well relative overflow-hidden rounded-2xl border border-cv-line/70 bg-white/80 shadow-[0_18px_44px_-24px_rgba(16,24,40,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-black dark:shadow-[0_30px_70px_-28px_rgba(0,0,0,0.75)] " +
          className
        }
      >
        {/* top sheen */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/25" />
        {children}
      </div>
    </div>
  );
}

/* Compact window/card header: colored dot + mono title + optional right slot. */
export function CardHead({ title, dot = C.blue, right }: { title: string; dot?: string; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-cv-line/60 px-3.5 py-2.5 dark:border-white/[0.07]">
      <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-cv-ink/55">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
        {title}
      </span>
      {right}
    </div>
  );
}

export function StatusPill({ label, color = C.teal, dot = true }: { label: string; color?: string; dot?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold"
      style={{ color, background: `${color}1A` }}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />}
      {label}
    </span>
  );
}

export function Tag({ children, color = C.blue }: { children: ReactNode; color?: string }) {
  return (
    <span className="rounded-md px-2 py-0.5 font-mono text-[10px]" style={{ color, background: `${color}14` }}>
      {children}
    </span>
  );
}

/* KPI tile: label, big value, optional delta. */
export function Kpi({ label, value, delta, up, accent = C.blue }: { label: string; value: string; delta?: string; up?: boolean; accent?: string }) {
  const dc = up ? C.red : C.teal; // spend up = red, down = good/teal
  return (
    <div className="rounded-xl border border-cv-line/60 bg-cv-surface/50 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.02]">
      <div className="text-[10px] uppercase tracking-wide text-cv-muted">{label}</div>
      <div className="mt-0.5 flex items-baseline gap-1.5">
        <span className="font-mono text-lg font-semibold tracking-tight text-cv-ink" style={accent ? undefined : undefined}>{value}</span>
        {delta && (
          <span className="font-mono text-[11px] font-semibold" style={{ color: dc }}>
            {up ? "▲" : "▼"} {delta}
          </span>
        )}
      </div>
    </div>
  );
}

/* Labelled progress meter. */
export function Meter({ label, pct, right, color = C.blue }: { label: string; pct: number; right?: string; color?: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-cv-ink/75">{label}</span>
        <span className="font-mono text-cv-muted">{right ?? `${pct}%`}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.08] dark:bg-white/[0.08]">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

/* Catmull-Rom → cubic-bézier smoothing so the sampled points read as one
   continuous curve rather than a jagged polyline. Runs in viewBox space; the
   affine viewBox stretch preserves the béziers, so it stays smooth at any width. */
function smoothPath(pts: number[][], tension = 0.16) {
  if (pts.length < 3) {
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ");
  }
  const d = [`M${pts[0][0].toFixed(2)},${pts[0][1].toFixed(2)}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + ((p2[0] - p0[0]) * tension);
    const c1y = p1[1] + ((p2[1] - p0[1]) * tension);
    const c2x = p2[0] - ((p3[0] - p1[0]) * tension);
    const c2y = p2[1] - ((p3[1] - p1[1]) * tension);
    d.push(`C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`);
  }
  return d.join(" ");
}

/* Inline SVG area chart: smoothed curve, soft gradient fill, and an optional
   true-circle end marker rendered as an HTML overlay (so the `preserveAspectRatio
   none` stretch can't distort it into an ellipse). `grid` adds faint baseline
   rules for the larger, standalone charts; sparklines leave it off. Values 0–100. */
export function AreaChart({
  values,
  color = C.blue,
  height = 56,
  markLast,
  grid = false,
}: {
  values: number[];
  color?: string;
  height?: number;
  markLast?: boolean;
  grid?: boolean;
}) {
  const w = 100;
  const pad = 3;
  const max = Math.max(...values, 1);
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * w,
    height - (v / max) * (height - pad * 2) - pad,
  ]);
  const line = smoothPath(pts);
  const area = `${line} L${w},${height} L0,${height} Z`;
  const gid = `ac-${color.replace("#", "")}-${values.length}`;
  const last = pts[pts.length - 1];
  const gridLines = grid ? [0.25, 0.5, 0.75] : [];
  return (
    <div className="relative h-full w-full">
      <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="55%" stopColor={color} stopOpacity="0.06" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {gridLines.map((f) => (
          <line
            key={f}
            x1="0"
            x2={w}
            y1={height * f}
            y2={height * f}
            stroke="hsl(var(--cv-ink) / 0.09)"
            strokeWidth="1"
            strokeDasharray="2 4"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={area} fill={`url(#${gid})`} />
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      {markLast && (
        <span
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${last[0]}%`, top: `${(last[1] / height) * 100}%` }}
        >
          <span
            className="cv-dot-pulse absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: color }}
          />
          <span
            className="relative block h-[7px] w-[7px] rounded-full ring-2 ring-cv-surface2 dark:ring-black"
            style={{ background: color, boxShadow: `0 0 8px ${color}cc` }}
          />
        </span>
      )}
    </div>
  );
}

/* Mini bar chart, values 0–100, optional highlighted index (e.g. an anomaly). */
export function Bars({ values, color = C.blue, flag, height = 56 }: { values: number[]; color?: string; flag?: number; height?: number }) {
  return (
    <div className="flex items-end gap-1" style={{ height }}>
      {values.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${v}%`,
            background: i === flag ? C.amber : color,
            opacity: flag != null && i !== flag ? 0.45 : 1,
            boxShadow: i === flag ? `0 0 12px ${C.amber}99` : undefined,
          }}
        />
      ))}
    </div>
  );
}

/* Circular initials avatar. */
export function Avatar({ initials, color = C.blue }: { initials: string; color?: string }) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
      style={{ background: `${color}22`, color }}
    >
      {initials}
    </span>
  );
}

/* Small pill button (non-interactive, for scenes). */
export function MiniBtn({ children, solid, color = C.teal }: { children: ReactNode; solid?: boolean; color?: string }) {
  return solid ? (
    <span className="rounded-md px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: color }}>
      {children}
    </span>
  ) : (
    <span className="rounded-md border border-cv-line/70 px-2.5 py-1 text-[11px] font-medium text-cv-ink/70 dark:border-white/12">
      {children}
    </span>
  );
}
