/* "Before / After Agentry" — two comparison cards: a static, hardcoded setup
   (faint node pattern, muted CloseCircle rows) versus a dynamic, per-request
   setup (blue grid + glow, CheckCircle rows). Design ported from the Agentry
   platform page. cv-* tokens, theme-aware.

   Renders statically — this is panel content inside PinnedLoopCarousel, which
   owns all scroll-driven animation for the group. See that component's header
   comment for why panel content must not carry its own ScrollTrigger. Server
   component. */

import { TrashBin2, Bolt, CloseCircle, CheckCircle } from "@/lib/solar-icons";

const ROWS: { k: string; before: string; after: string }[] = [
  { k: "Model", before: "One, chosen once", after: "Best fit, per request" },
  { k: "Provider", before: "Fixed", after: "Scored live, with a fallback" },
  { k: "Region", before: "Fixed", after: "Chosen by residency rule" },
  { k: "Routing", before: "None. Every request goes the same place", after: "Cost, latency, quality, and compliance" },
  { k: "Cost", before: "An assumption, not a measurement", after: "Attributed, capped, and on the record" },
];

export function BeforeAfterAgentry() {
  return (
    <section className="pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-28 bg-cv-surface2 dark:bg-black" data-testid="section-before-after-agentry">
      <div className="cv-container">
        <div data-fit-visual className="grid gap-6 lg:gap-8 md:grid-cols-2 items-stretch">
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
            <div className="relative flex items-center gap-2.5 border-b border-cv-line/50 px-5 py-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cv-ink/[0.06] text-cv-muted dark:bg-white/[0.06]">
                <TrashBin2 weight="Linear" size={18} />
              </span>
              <div>
                <div className="text-[15px] font-semibold text-cv-ink">Before Agentry</div>
                <div className="text-xs text-cv-muted">Hardcoded, static</div>
              </div>
            </div>
            {/* Rows */}
            <ul className="relative divide-y divide-cv-line/40">
              {ROWS.map((r) => (
                <li key={r.k} className="flex items-start gap-3 px-5 py-5">
                  <span className="w-16 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-cv-subtle">
                    {r.k}
                  </span>
                  <span className="flex flex-1 items-start gap-2 text-[15px] text-cv-subtle">
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
            <div className="relative flex items-center gap-2.5 border-b border-[#2278E0]/20 px-5 py-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2278E0]/15 text-[#1664C0] dark:text-[#7CB8F8]">
                <Bolt weight="Bold" size={18} />
              </span>
              <div>
                <div className="text-[15px] font-semibold text-cv-ink">After Agentry</div>
                <div className="text-xs text-[#1664C0] dark:text-[#7CB8F8]">Dynamic, per request</div>
              </div>
            </div>
            {/* Rows */}
            <ul className="relative divide-y divide-cv-line/40">
              {ROWS.map((r) => (
                <li key={r.k} className="flex items-start gap-3 px-5 py-5">
                  <span className="w-16 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-wider text-cv-muted">
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
      </div>
    </section>
  );
}

export default BeforeAfterAgentry;
