import type { ReactNode } from "react";

/* "Three mechanisms" — a divided three-step layout. Each column carries a
   hatched number badge, a small illustration, and a title + description, with
   divider lines between columns and cross-marks at the grid corners.

   Illustrations reuse the home-page governance mock-card style: each sits in a
   polished frame (CardLightEdge bright-gradient stroke + ambient corner glow on
   a bg-white / dark:bg-black surface), so these visuals match the ones on the
   homepage. Content is inline markup — no external assets. */

const ACCENT = "#2278E0";

function NumberBadge({ n }: { n: string }) {
  return (
    <span className="relative inline-flex size-6 items-center justify-center rounded-full font-mono text-xs text-cv-ink">
      <span
        aria-hidden
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, currentColor 0, currentColor 0.5px, transparent 0.5px, transparent 3px)",
          maskImage: "radial-gradient(circle at center, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at center, #000 40%, transparent 100%)",
        }}
      />
      <span className="relative">{n}</span>
    </span>
  );
}

/* corner cross-mark */
function Corner({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-10 size-3 ${className}`}>
      <span className="absolute inset-0 m-auto h-px w-full bg-cv-ink/25" />
      <span className="absolute inset-0 m-auto h-full w-px bg-cv-ink/25" />
    </span>
  );
}

/* ── Shared mock-card chrome (matches home-page governance visuals) ─────────── */

// Gradient top-bright stroke + ambient top-left glow, layered inside the frame.
function CardLightEdge() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[14px]"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 22%, rgba(255,255,255,0) 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,218,255,0.13), transparent 70%)", filter: "blur(26px)" }}
      />
    </>
  );
}

// Polished frame around each illustration — same border/shadow/surface as the
// home-page mock cards.
function MockFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full overflow-hidden rounded-[14px] border border-cv-line bg-white p-4 shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/10 dark:bg-black dark:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]">
      <CardLightEdge />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ── Step illustrations ─────────────────────────────────────────────────── */

// 1 · Cost arbitrage: a route-decision card, premium model struck for a cheaper fit.
function CostIllo() {
  return (
    <MockFrame>
      <div className="mb-3 text-sm font-semibold text-cv-ink">Route decision</div>
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between rounded-lg border border-cv-line/70 bg-cv-ink/[0.02] px-3 py-2 dark:border-white/[0.07] dark:bg-white/[0.02]">
          <span className="flex items-center gap-2 font-mono text-cv-muted line-through decoration-cv-muted/40">
            gpt-4o
          </span>
          <span className="font-mono text-cv-muted line-through decoration-cv-muted/40">$12.40</span>
        </div>
        <div
          className="flex items-center justify-between rounded-lg border px-3 py-2"
          style={{ borderColor: "rgba(34,120,224,0.35)", background: "rgba(34,120,224,0.08)" }}
        >
          <span className="flex items-center gap-2 font-mono font-medium text-cv-ink">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
            gpt-4o-mini
          </span>
          <span className="font-mono font-semibold text-[#1664C0] dark:text-[#7CB8F8]">$3.60</span>
        </div>
      </div>
      <p className="mt-3 text-xs text-cv-muted">
        Cleared the <span className="font-medium text-cv-ink">quality floor</span> at{" "}
        <span className="font-medium text-cv-ink">-71%</span>.
      </p>
    </MockFrame>
  );
}

// 2 · Latency wins: a request timeline with the best-fit route highlighted.
function LatencyIllo() {
  return (
    <MockFrame>
      <div className="mb-3 text-sm font-semibold text-cv-ink">Request timeline</div>
      <div className="relative pl-5">
        <span aria-hidden className="absolute inset-y-1 left-0 w-px bg-cv-ink/15" />
        <div className="space-y-2">
          <div className="relative inline-flex items-center gap-2 text-sm font-medium text-cv-ink">
            <span className="absolute -left-[22px] my-auto size-[6px] rounded-full border border-cv-muted bg-cv-surface" />
            <span className="font-mono text-xs text-cv-muted">00 ms</span> Request in
          </div>
          <div
            className="relative flex items-center gap-2 rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: "rgba(34,120,224,0.3)", background: "rgba(34,120,224,0.06)" }}
          >
            <span className="absolute -left-[7px] my-auto size-[6px] rounded-full" style={{ background: ACCENT }} />
            <span className="font-medium text-cv-ink">Best-fit route</span>
            <span className="ml-auto font-mono text-[#1664C0] dark:text-[#7CB8F8]">312 ms</span>
          </div>
          <div className="relative inline-flex items-center gap-2 text-sm font-medium text-cv-ink">
            <span className="absolute -left-[22px] my-auto size-[6px] rounded-full border border-cv-muted bg-cv-surface" />
            <span className="font-mono text-xs text-cv-muted">312 ms</span> Response out
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

// 3 · Waste elimination: premium-model usage falling as work is rerouted.
function WasteIllo() {
  return (
    <MockFrame>
      <span className="block text-sm font-semibold text-cv-ink">Premium-model usage</span>
      <div className="mt-3 flex justify-between text-sm">
        <span className="text-cv-muted">rerouted to smaller models</span>
        <span className="text-cv-ink">-55%</span>
      </div>
      <div className="relative my-2 h-1.5 rounded-full bg-cv-ink/[0.06] dark:bg-white/[0.08]">
        <div
          className="absolute inset-y-0 left-0 w-[45%] rounded-full"
          style={{ background: `linear-gradient(to right, ${ACCENT}, #6954D4)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-cv-muted">
        <span>45% still premium</span>
        <span className="font-mono">$61.2K saved / mo</span>
      </div>
    </MockFrame>
  );
}

type Step = { n: string; title: string; body: string; illo: ReactNode };

const STEPS: Step[] = [
  {
    n: "1",
    title: "Cost arbitrage",
    body: "AIX routes to the lowest-cost model that clears your quality floor.",
    illo: <CostIllo />,
  },
  {
    n: "2",
    title: "Latency wins",
    body: "A faster route cuts the compute you pay for while a request waits.",
    illo: <LatencyIllo />,
  },
  {
    n: "3",
    title: "Waste elimination",
    body: "Stops premium models running work a smaller model handles just as well.",
    illo: <WasteIllo />,
  },
];

export default function AixMechanismsSteps() {
  return (
    <div className="relative w-full">
      {/* corner cross-marks */}
      <Corner className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
      <Corner className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
      <Corner className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
      <Corner className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

      <div className="grid divide-y divide-cv-line/50 border border-cv-line/50 md:grid-cols-3 md:divide-x md:divide-y-0">
        {STEPS.map((s) => (
          <div key={s.n} className="flex flex-col p-8">
            <NumberBadge n={s.n} />
            {/* fixed-height illustration so titles align across all columns */}
            <div className="mt-6 flex h-48 items-center">{s.illo}</div>
            <div className="mt-6">
              <h4 className="font-display font-semibold text-cv-ink">{s.title}</h4>
              <p className="mt-2 text-[15px] leading-relaxed text-cv-muted">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
