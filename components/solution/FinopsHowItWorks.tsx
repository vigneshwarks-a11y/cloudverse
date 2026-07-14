/* "How compute economics works" flow diagram — three panels joined by connector
   wires with a travelling data-flow dot: Applications/Agents/Data Workloads →
   CloudVerse Compute Economics Layer (the decision capabilities) → Cloud
   Infrastructure & Capacity. cv-* tokens, theme-aware. Server component. */

import { Routing, ShieldCheck, DocumentText, Tuning, Widget, Cpu, Database } from "@solar-icons/react";

type IconCmp = typeof Routing;
const CHIPS: { label: string; color: string; Icon: IconCmp }[] = [
  { label: "Model Routing", color: "#1664C0", Icon: Routing },
  { label: "DevX Guardrails", color: "#0E9E7A", Icon: ShieldCheck },
  { label: "DataX Policies", color: "#D97706", Icon: DocumentText },
  { label: "Commitments Optimizer", color: "#6954D4", Icon: Tuning },
];

const WORKLOADS: { label: string; sub: string; color: string; Icon: IconCmp }[] = [
  { label: "Applications", sub: "Product features & services", color: "#1664C0", Icon: Widget },
  { label: "AI Agents", sub: "Autonomous workflows", color: "#6954D4", Icon: Cpu },
  { label: "Data Workloads", sub: "Pipelines & analytics", color: "#0E9E7A", Icon: Database },
];

const LOGOS: { src: string; name: string; invert?: boolean }[] = [
  { src: "/icons/aws.svg", name: "AWS" },
  { src: "/icons/azure.svg", name: "Azure" },
  { src: "/icons/googlecloud.svg", name: "Google Cloud" },
  { src: "/icons/snowflake.svg", name: "Snowflake" },
  { src: "/icons/kubernetes.svg", name: "Kubernetes" },
  { src: "/icons/openai.svg", name: "OpenAI", invert: true },
];

const PANEL = "relative overflow-hidden rounded-2xl border border-cv-line bg-cv-surface2 p-5 dark:border-white/10 dark:bg-[#0D0D0D]";

/* Top-left linear light stroke + ambient glow — matches the home visuals. */
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

/* connector wire with end ports + travelling data-flow dot (desktop only). */
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

export function FinopsHowItWorks() {
  return (
    <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-stretch lg:gap-0">
      {/* LEFT — applications, agents & data workloads */}
      <div className={`${PANEL} flex flex-col lg:flex-1`}>
        <CardLightEdge />
        <div className="relative z-[2] flex flex-1 flex-col gap-2.5">
          {WORKLOADS.map((w) => (
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

      {/* MIDDLE — CloudVerse compute economics decision layer */}
      <div className={`${PANEL} flex flex-col lg:flex-[1.35]`}>
        <CardLightEdge />
        <div className="relative z-[2] grid grid-cols-2 gap-2.5">
          {CHIPS.map((c) => (
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

        {/* convergence hub — every decision evaluated at one layer */}
        <div className="relative z-[2] mt-3 flex flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-cv-line/70 bg-cv-ink/[0.02] p-6 min-h-[150px] dark:border-white/[0.07] dark:bg-white/[0.02]">
          <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(circle at 50% 42%, rgba(34,211,238,0.16), transparent 65%)" }} />
          <div className="relative flex h-24 w-24 items-center justify-center">
            <span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-cv-line/60 dark:border-white/10" />
            <span aria-hidden className="absolute inset-[16px] rounded-full border border-dashed border-cv-line/50 dark:border-white/[0.08]" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/cv-logo.png" alt="CloudVerse" className="relative h-11 w-auto drop-shadow-[0_4px_16px_rgba(34,211,238,0.35)]" />
          </div>
          <div className="relative mt-3 text-center">
            <div className="text-sm font-semibold text-cv-ink">Cost · Performance · Risk</div>
            <div className="mt-0.5 text-[11px] text-cv-muted">evaluated before it scales</div>
          </div>
        </div>
      </div>

      <Wire delay={1} />

      {/* RIGHT — cloud infrastructure & capacity */}
      <div className={`${PANEL} flex flex-col lg:flex-1`}>
        <CardLightEdge />
        <div className="relative z-[2] grid grid-cols-3 gap-2">
          {LOGOS.map((l) => (
            <div key={l.name} className="flex aspect-square items-center justify-center rounded-xl border border-cv-line/60 bg-cv-surface dark:border-white/[0.07] dark:bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.name} loading="lazy" className={`h-7 w-7 object-contain${l.invert ? " dark:invert" : ""}`} />
            </div>
          ))}
        </div>
        <div className="relative z-[2] mt-3 space-y-2">
          <div className="rounded-lg border border-cv-line/60 bg-cv-surface py-2.5 text-center text-xs font-medium text-cv-ink/75 dark:border-white/[0.07] dark:bg-black">GPU / CPU capacity</div>
          <div className="rounded-lg border border-cv-line/60 bg-cv-surface py-2.5 text-center text-xs font-medium text-cv-ink/75 dark:border-white/[0.07] dark:bg-black">On-prem &amp; private cloud</div>
        </div>
      </div>
    </div>
  );
}

export default FinopsHowItWorks;
