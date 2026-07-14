/* Before / After comparison cards — the AIX platform signature: a static,
   "before" card (faint node pattern, muted CloseCircle rows) beside a dynamic,
   "after" card (blue grid + glow, CheckCircle rows). Shared across the platform
   pages so each reads with the same layout. cv-* tokens, theme-aware. */

import { Bolt, CheckCircle, CloseCircle, TrashBin2 } from "@solar-icons/react";

export type BeforeAfterRow = { k: string; before: string; after: string };

export function BeforeAfterCards({
  beforeLabel,
  beforeSub,
  afterLabel,
  afterSub,
  rows,
}: {
  beforeLabel: string;
  beforeSub: string;
  afterLabel: string;
  afterSub: string;
  rows: BeforeAfterRow[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 items-stretch">
      {/* Before - legacy / static */}
      <div className="relative overflow-hidden rounded-2xl border border-cv-line/50 bg-cv-card dark:bg-[#0D0D0D]">
        {/* Faint static node pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--cv-ink) / 0.05) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* Header */}
        <div className="relative flex items-center gap-2.5 border-b border-cv-line/50 px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cv-ink/[0.06] text-cv-muted dark:bg-white/[0.06]">
            <TrashBin2 weight="Linear" size={18} />
          </span>
          <div>
            <div className="text-[15px] font-semibold text-cv-ink">{beforeLabel}</div>
            <div className="text-xs text-cv-muted">{beforeSub}</div>
          </div>
        </div>
        {/* Rows */}
        <ul className="relative divide-y divide-cv-line/40">
          {rows.map((r) => (
            <li key={r.k} className="flex items-start gap-3 px-5 py-3.5">
              <span className="w-24 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-cv-muted/70">
                {r.k}
              </span>
              <span className="flex flex-1 items-start gap-2 text-[15px] text-cv-ink/55">
                <CloseCircle weight="Linear" size={15} className="mt-0.5 shrink-0 text-cv-muted/60" />
                <span>{r.before}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* After - dynamic / active */}
      <div className="relative overflow-hidden rounded-2xl border border-[#2278E0]/25 bg-cv-card dark:bg-[#0D0D0D] shadow-[0_0_50px_-24px_rgba(34,120,224,0.5)]">
        {/* Dynamic blue grid pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,120,224,0.13) 1px, transparent 1px), linear-gradient(90deg, rgba(34,120,224,0.13) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 85% 80% at 75% 0%, #000 10%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 75% 0%, #000 10%, transparent 75%)",
          }}
        />
        {/* Blue blend glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 right-0 h-48 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(34,120,224,0.28), transparent 70%)" }}
        />
        {/* Header */}
        <div className="relative flex items-center gap-2.5 border-b border-[#2278E0]/20 px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2278E0]/15 text-[#1664C0] dark:text-[#7CB8F8]">
            <Bolt weight="Bold" size={18} />
          </span>
          <div>
            <div className="text-[15px] font-semibold text-cv-ink">{afterLabel}</div>
            <div className="text-xs text-[#1664C0] dark:text-[#7CB8F8]">{afterSub}</div>
          </div>
        </div>
        {/* Rows */}
        <ul className="relative divide-y divide-cv-line/40">
          {rows.map((r) => (
            <li key={r.k} className="flex items-start gap-3 px-5 py-3.5">
              <span className="w-24 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-cv-muted">
                {r.k}
              </span>
              <span className="flex flex-1 items-start gap-2 text-[15px] text-cv-ink/90">
                <CheckCircle weight="Bold" size={15} className="mt-0.5 shrink-0 text-[#1664C0] dark:text-[#7CB8F8]" />
                <span>{r.after}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BeforeAfterCards;
