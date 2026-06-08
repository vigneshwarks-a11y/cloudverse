"use client";

import { useEffect, useRef, useState } from "react";

const BLUE = "#007CFF";

/* ---------- per-feature visuals (all same fixed height) ---------- */

function VizFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-auto flex h-32 flex-col justify-center overflow-hidden rounded-lg border p-4"
      style={{ borderColor: `${BLUE}26`, background: `${BLUE}0d` }}
    >
      {children}
    </div>
  );
}

/* 1. One model — single allocation feeding three matching views */
function ModelViz() {
  const views = ["FinOps", "Engineering", "Finance"];
  return (
    <div className="w-full">
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        <div style={{ width: "44%", background: "rgba(0,124,255,1)" }} />
        <div style={{ width: "33%", background: "rgba(0,124,255,0.7)" }} />
        <div style={{ width: "23%", background: "rgba(0,124,255,0.45)" }} />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {views.map((v) => (
          <div
            key={v}
            className="rounded-md border py-1.5 text-center text-[10px] text-cv-ink/70"
            style={{ borderColor: `${BLUE}33`, background: `${BLUE}12` }}
          >
            {v}
            <div className="mt-0.5 text-[9px] text-cv-ink/45">matches</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Identity and audit — security control checklist */
function IdentityViz() {
  const items = ["SSO", "SCIM", "RBAC", "Audit logs", "Encryption keys"];
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
      {items.map((it) => (
        <div key={it} className="flex items-center gap-1.5">
          <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" fill="none">
            <circle cx="8" cy="8" r="7" fill={`${BLUE}22`} stroke={BLUE} strokeWidth="1" />
            <path d="M5 8.2l2 2 4-4.2" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-cv-ink/70">{it}</span>
        </div>
      ))}
    </div>
  );
}

/* 3. Regional residency — region pills with deployment options */
function RegionViz() {
  const regions = ["US", "EU", "APAC"];
  return (
    <div className="w-full">
      <div className="flex justify-between gap-2">
        {regions.map((r) => (
          <div
            key={r}
            className="flex-1 rounded-md border py-2 text-center"
            style={{ borderColor: `${BLUE}33`, background: `${BLUE}12` }}
          >
            <div className="text-xs font-semibold" style={{ color: BLUE }}>
              {r}
            </div>
            <div className="mt-0.5 flex justify-center gap-0.5">
              <span className="h-1 w-1 rounded-full" style={{ background: BLUE }} />
              <span className="h-1 w-1 rounded-full" style={{ background: BLUE }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2.5 flex justify-center gap-3 text-[10px] text-cv-ink/55">
        <span>Private-link</span>
        <span>·</span>
        <span>VPC</span>
      </div>
    </div>
  );
}

/* 4. Marketplace and procurement — cloud provider listings */
function MarketplaceViz() {
  const providers = ["AWS", "Azure", "Google Cloud"];
  return (
    <div className="space-y-1.5 text-[11px]">
      {providers.map((p) => (
        <div
          key={p}
          className="flex items-center justify-between rounded-md border px-2.5 py-1.5"
          style={{ borderColor: `${BLUE}26`, background: `${BLUE}0a` }}
        >
          <span className="text-cv-ink/75">{p} Marketplace</span>
          <span
            className="rounded px-1.5 py-0.5 text-[9px] font-semibold"
            style={{ background: `${BLUE}1f`, color: BLUE }}
          >
            Committed spend
          </span>
        </div>
      ))}
    </div>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  "One model across the estate": ModelViz,
  "Identity and audit": IdentityViz,
  "Regional residency": RegionViz,
  "Marketplace and procurement": MarketplaceViz,
};

export type EnterpriseItem = [title: string, desc: string];

export function EnterpriseDayOne({ items }: { items: EnterpriseItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rise = (i: number): React.CSSProperties => ({
    opacity: visible || reduceMotion ? 1 : 0,
    transform: reduceMotion || visible ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 700ms ease-out, transform 700ms ease-out",
    transitionDelay: reduceMotion ? "0ms" : `${i * 120}ms`,
  });

  return (
    <div ref={ref} className="grid auto-rows-fr gap-5 md:grid-cols-2">
      {items.map(([t, b], i) => {
        const Viz = VISUALS[t];
        return (
          <div key={t} style={rise(i)}>
            <div className="flex h-full flex-col rounded-xl border border-white/10 bg-black p-7">
              <h3 className="cv-h3 font-semibold text-cv-ink">{t}</h3>
              <p className="text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              {Viz ? (
                <VizFrame>
                  <Viz />
                </VizFrame>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
