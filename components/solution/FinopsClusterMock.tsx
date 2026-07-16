/* Customer-proof visual — a "Connect your K8s cluster" product mock with a
   potential-savings summary. Static (illustrative) selection state. cv-* tokens,
   theme-aware. Server component. */

import { Planet } from "@/lib/solar-icons";

/* Home product-screenshot chrome: hairline ring + soft shadow. */
const CARD =
  "relative overflow-hidden rounded-2xl bg-white p-5 shadow-[0_0_0_1px_rgba(15,23,42,0.06),0_10px_30px_rgba(15,23,42,0.06)] dark:bg-[#0D0D0D] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_18px_44px_rgba(0,0,0,0.55)]";

/* Top-left linear light stroke + ambient glow — the home visuals treatment. */
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
    <div className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 ${p.on ? "border-cv-blue/60 bg-cv-blue/[0.06]" : "border-cv-line/70 dark:border-white/[0.07]"}`}>
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

export function FinopsClusterMock() {
  return (
    <div className="flex flex-col gap-3">
      {/* Connect card */}
      <div className={CARD}>
        <CardLightEdge />
        <div className="relative z-[2] text-[15px] font-semibold text-cv-ink">Connect your K8s cluster</div>

        <div className="relative z-[2] mt-4 grid grid-cols-3 gap-2">
          {ROW1.map((p) => <ProviderOption key={p.label} p={p} />)}
        </div>
        <div className="relative z-[2] mt-2 grid grid-cols-2 gap-2">
          {ROW2.map((p) => <ProviderOption key={p.label} p={p} />)}
        </div>

        <div className="relative z-[2] mt-5 text-[10px] font-semibold uppercase tracking-widest text-cv-muted">Select current autoscaling tool</div>
        <div className="relative z-[2] mt-2 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2.5 rounded-xl border border-cv-blue/60 bg-cv-blue/[0.06] px-3 py-2.5">
            <Radio on />
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cv-blue text-[10px] font-bold text-white">K</span>
            <span className="text-[13px] font-semibold text-cv-blue dark:text-cv-blue-light">Karpenter</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-cv-line/70 px-3 py-2.5 dark:border-white/[0.07]">
            <Radio on={false} />
            <span className="text-[13px] font-medium text-cv-ink">Other</span>
          </div>
        </div>
      </div>

      {/* Savings card */}
      <div className={CARD}>
        <CardLightEdge />
        <div className="relative z-[2] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-cv-muted">Potential savings</div>
            <div className="mt-1 font-mono text-3xl font-bold tracking-tight text-cv-teal lg:text-4xl">
              $545,341 <span className="text-base font-medium text-cv-muted">/mo</span>
            </div>
          </div>
          <div className="space-y-1.5 sm:text-right">
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="text-[11px] uppercase tracking-wide text-cv-muted">Current cluster cost</span>
              <span className="font-mono text-sm font-bold text-cv-ink">$123,200</span>
            </div>
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <span className="text-[11px] uppercase tracking-wide text-cv-muted">Optimal cluster cost</span>
              <span className="font-mono text-sm font-bold text-cv-teal">$72,922</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinopsClusterMock;
