/* Generic "how it works" flow diagram — three panels joined by connector
   wires with a travelling data-flow dot: inputs/workloads → CloudVerse
   decision layer (chips + a converging hub) → destinations/infrastructure.
   Extracted from the FinOps "how compute economics works" diagram so every
   Solutions page can reuse the same visual language with domain-specific
   content. cv-* tokens, theme-aware. Server component. */

import type { IconWeight } from "@solar-icons/react";

type IconCmp = React.ComponentType<{ weight?: IconWeight; size?: number }>;

export type FlowChip = { label: string; color: string; Icon: IconCmp };
export type FlowWorkload = { label: string; sub: string; color: string; Icon: IconCmp };
export type FlowLogoNode = { kind: "logo"; src: string; name: string; invert?: boolean };
export type FlowTileNode = { kind: "tile"; label: string; color: string; Icon: IconCmp };
export type FlowRightNode = FlowLogoNode | FlowTileNode;

const PANEL = "relative overflow-hidden rounded-2xl border border-cv-line bg-cv-surface2 p-5 dark:border-white/10 dark:bg-[#0D0D0D]";

function CardLightEdge() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
        style={{
          padding: "1.5px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.18) 22%, rgba(255,255,255,0) 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,218,255,0.12), transparent 70%)", filter: "blur(28px)" }}
      />
    </>
  );
}

function Wire({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative hidden shrink-0 items-center self-center lg:flex lg:w-12" aria-hidden>
      <span className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border border-cv-line bg-cv-surface dark:border-white/20 dark:bg-black" />
      <span className="relative h-px flex-1 bg-cv-line dark:bg-white/15">
        <span
          className="cv-wire-flow absolute top-1/2 h-[2px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#22D3EE] shadow-[0_0_8px_2px_rgba(34,211,238,0.75)]"
          style={{ animationDelay: `${delay}s` }}
        />
      </span>
      <span className="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border border-cv-line bg-cv-surface dark:border-white/20 dark:bg-black" />
    </div>
  );
}

export function HowItWorksFlow({
  workloads,
  chips,
  hubLabel,
  hubSub,
  right,
  bottomRows,
}: {
  workloads: FlowWorkload[];
  chips: FlowChip[];
  hubLabel: string;
  hubSub: string;
  right: FlowRightNode[];
  bottomRows: string[];
}) {
  return (
    <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-stretch lg:gap-0">
      {/* LEFT — inputs / workloads */}
      <div className={`${PANEL} flex flex-col lg:flex-1`}>
        <CardLightEdge />
        <div className="relative z-[2] flex flex-1 flex-col gap-2.5">
          {workloads.map((w) => (
            <div
              key={w.label}
              className="flex flex-1 items-center gap-3 rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] px-3.5 dark:border-white/[0.07] dark:bg-white/[0.02]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ color: w.color, background: `${w.color}1A` }}>
                <w.Icon weight="Bold" size={17} />
              </span>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-cv-ink">{w.label}</div>
                <div className="text-[11px] text-cv-muted">{w.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Wire />

      {/* MIDDLE — CloudVerse decision layer */}
      <div className={`${PANEL} flex flex-col lg:flex-[1.35]`}>
        <CardLightEdge />
        <div className="relative z-[2] grid grid-cols-2 gap-2.5">
          {chips.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-2.5 rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] px-3 py-2.5 dark:border-white/[0.07] dark:bg-white/[0.02]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ color: c.color, background: `${c.color}1A` }}>
                <c.Icon weight="Bold" size={15} />
              </span>
              <span className="text-[13px] font-medium text-cv-ink">{c.label}</span>
            </div>
          ))}
        </div>

        <div className="relative z-[2] mt-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] p-6 min-h-[150px] dark:border-white/[0.07] dark:bg-white/[0.02]">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 42%, rgba(34,211,238,0.16), transparent 65%)" }} />
          <div className="relative flex h-24 w-24 items-center justify-center">
            <span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-cv-line/60 dark:border-white/10" />
            <span aria-hidden className="absolute inset-[16px] rounded-full border border-dashed border-cv-line/50 dark:border-white/[0.08]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cv-logo.png" alt="CloudVerse" className="relative h-11 w-auto drop-shadow-[0_4px_16px_rgba(34,211,238,0.35)]" />
          </div>
          <div className="relative mt-3 text-center">
            <div className="text-sm font-semibold text-cv-ink">{hubLabel}</div>
            <div className="mt-0.5 text-[11px] text-cv-muted">{hubSub}</div>
          </div>
        </div>
      </div>

      <Wire delay={1} />

      {/* RIGHT — destinations / infrastructure */}
      <div className={`${PANEL} flex flex-col lg:flex-1`}>
        <CardLightEdge />
        <div className="relative z-[2] grid grid-cols-3 gap-2">
          {right.map((n) =>
            n.kind === "logo" ? (
              <div key={n.name} className="flex aspect-square items-center justify-center rounded-xl border border-cv-line/60 bg-cv-surface dark:border-white/[0.07] dark:bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={n.src} alt={n.name} loading="lazy" className={`h-7 w-7 object-contain${n.invert ? " dark:invert" : ""}`} />
              </div>
            ) : (
              <div
                key={n.label}
                className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border border-cv-line/60 bg-cv-surface p-1 text-center dark:border-white/[0.07] dark:bg-black"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ color: n.color, background: `${n.color}1A` }}>
                  <n.Icon weight="Bold" size={13} />
                </span>
                <span className="text-[9px] leading-tight text-cv-ink/70">{n.label}</span>
              </div>
            )
          )}
        </div>
        <div className="relative z-[2] mt-3 space-y-2">
          {bottomRows.map((r) => (
            <div key={r} className="rounded-lg border border-cv-line/60 bg-cv-surface py-2.5 text-center text-xs font-medium text-cv-ink/75 dark:border-white/[0.07] dark:bg-black">
              {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorksFlow;
