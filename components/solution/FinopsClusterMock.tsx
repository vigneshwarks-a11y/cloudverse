/* Customer-proof visual — a "Connect your K8s cluster" product mock with a
   potential-savings summary. The savings card turns the raw current/optimal
   figures into a before→after comparison so the reduction reads at a glance
   (design principle: show the product, don't describe it). Static, illustrative
   selection state. cv-* tokens, theme-aware. Server component. */

import { Planet, CheckCircle, AltArrowDown } from "@/lib/solar-icons";

/* Home product-screenshot chrome: hairline border + soft shadow, matching
   components/home/cardChrome.tsx exactly. */
const CARD =
  "relative overflow-hidden rounded-2xl border border-cv-line bg-white p-5 shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/10 dark:bg-black dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]";

/* Top-left linear light stroke + ambient glow — the home visuals treatment.
   `glow` toggles the diffuse top-left light blob; the border stroke always
   stays for edge definition. */
function CardLightEdge({ hue = "rgba(200,218,255,0.13)", glow = true }: { hue?: string; glow?: boolean }) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
        style={{
          padding: "1.5px",
          background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 22%, rgba(255,255,255,0) 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full"
          style={{ background: `radial-gradient(circle, ${hue}, transparent 70%)`, filter: "blur(26px)" }}
        />
      )}
    </>
  );
}

function Radio({ on }: { on: boolean }) {
  return (
    <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${on ? "border-cv-blue" : "border-cv-line dark:border-white/25"}`}>
      {on && <span className="h-1.5 w-1.5 rounded-full bg-cv-blue" />}
    </span>
  );
}

type Prov = { label: string; sub?: string; on?: boolean; logo?: string; invert?: boolean; planet?: boolean };

function ProviderOption({ p }: { p: Prov }) {
  return (
    <div
      className={`relative flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors ${
        p.on
          ? "border-cv-blue/70 bg-cv-blue/[0.06] shadow-[0_0_0_1px_rgba(22,100,192,0.25)]"
          : "border-cv-line/70 dark:border-white/15"
      }`}
    >
      <Radio on={!!p.on} />
      {p.planet ? (
        <Planet weight="Bold" size={18} className="shrink-0 text-[#6954D4]" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={p.logo} alt="" aria-hidden className={`h-5 w-5 shrink-0 object-contain${p.invert ? " dark:invert" : ""}`} />
      )}
      <div className="min-w-0">
        <div className="text-[13px] font-semibold text-cv-ink">{p.label}</div>
        {p.sub && <div className="text-[10px] text-cv-muted">{p.sub}</div>}
      </div>
      {p.on && <CheckCircle weight="Bold" size={16} className="ml-auto shrink-0 text-cv-blue" />}
    </div>
  );
}

const ROW1: Prov[] = [
  { label: "EKS", on: true, logo: "/icons/aws.svg" },
  { label: "GKE", logo: "/icons/googlecloud.svg" },
  { label: "AKS", logo: "/icons/azure.svg" },
];
const ROW2: Prov[] = [
  { label: "OpenShift", sub: "on AWS", logo: "/icons/kubernetes.svg" },
  { label: "Anywhere", sub: "any Cloud or On-Prem", planet: true },
];

/* Illustrative cluster economics. Optimal is ~59% of current → a 41% reduction;
   the bar widths are derived from these so the visual stays honest to the copy. */
const CURRENT = 123_200;
const OPTIMAL = 72_922;
const OPTIMAL_PCT = Math.round((OPTIMAL / CURRENT) * 100); // 59
const REDUCTION_PCT = 100 - OPTIMAL_PCT; // 41
const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

function CostBar({ label, value, pct, teal = false }: { label: string; value: string; pct: number; teal?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wide text-cv-muted">{label}</span>
        <span className={`font-mono text-sm font-bold ${teal ? "text-cv-teal" : "text-cv-ink"}`}>{value}</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.06] dark:bg-white/[0.07]">
        <div
          className={`h-full rounded-full ${teal ? "bg-cv-teal shadow-[0_0_12px_-1px_rgba(14,158,122,0.6)]" : "bg-cv-ink/25 dark:bg-white/25"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function FinopsClusterMock() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:gap-4">
      {/* Connect card */}
      <div className={`${CARD} flex flex-col lg:flex-1`}>
        <CardLightEdge />
        <div className="relative z-[2] flex items-center justify-between">
          <div className="text-[15px] font-semibold text-cv-ink">Connect your K8s cluster</div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-cv-muted">Step 1 of 2</span>
        </div>

        <div className="relative z-[2] mt-4 grid grid-cols-3 gap-2">
          {ROW1.map((p) => <ProviderOption key={p.label} p={p} />)}
        </div>
        <div className="relative z-[2] mt-2 grid grid-cols-2 gap-2">
          {ROW2.map((p) => <ProviderOption key={p.label} p={p} />)}
        </div>

        <div className="relative z-[2] mt-5 text-[10px] font-semibold uppercase tracking-widest text-cv-muted">Select current autoscaling tool</div>
        <div className="relative z-[2] mt-2 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2.5 rounded-xl border border-cv-blue/70 bg-cv-blue/[0.06] px-3 py-2.5 shadow-[0_0_0_1px_rgba(22,100,192,0.25)]">
            <Radio on />
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cv-blue text-[10px] font-bold text-white">K</span>
            <span className="text-[13px] font-semibold text-cv-blue dark:text-cv-blue-light">Karpenter</span>
            <CheckCircle weight="Bold" size={16} className="ml-auto shrink-0 text-cv-blue" />
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-cv-line/70 px-3 py-2.5 dark:border-white/15">
            <Radio on={false} />
            <span className="text-[13px] font-medium text-cv-ink">Other</span>
          </div>
        </div>
      </div>

      {/* Savings card — before→after comparison */}
      <div className={`${CARD} flex flex-col lg:flex-1`}>
        <CardLightEdge glow={false} />
        <div className="relative z-[2] flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-cv-muted">Potential savings</span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-cv-teal/12 px-2 py-1 text-[11px] font-semibold text-cv-teal">
              <AltArrowDown weight="Bold" size={12} />
              {REDUCTION_PCT}% cluster cost
            </span>
          </div>

          <div className="mt-1.5 font-mono text-4xl font-bold tracking-tight text-cv-teal lg:text-5xl">
            $545,341 <span className="align-baseline text-base font-medium text-cv-muted">/mo</span>
          </div>

          <div className="mt-6 space-y-4 lg:mt-auto lg:pt-8">
            <CostBar label="Current cluster cost" value={fmt(CURRENT)} pct={100} />
            <CostBar label="Optimal cluster cost" value={fmt(OPTIMAL)} pct={OPTIMAL_PCT} teal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinopsClusterMock;
