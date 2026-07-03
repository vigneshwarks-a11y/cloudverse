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

/* 1. Allocation 100% stacked split by team/BU */
function AllocationViz() {
  const segs: [string, number][] = [
    ["Engineering", 46],
    ["Data", 28],
    ["Platform", 18],
    ["Shared", 8],
  ];
  const shade = (i: number) => `rgba(0,124,255,${1 - i * 0.22})`;
  return (
    <div className="w-full">
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        {segs.map(([label, pct], i) => (
          <div key={label} style={{ width: `${pct}%`, background: shade(i) }} title={`${label} ${pct}%`} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
        {segs.map(([label, pct], i) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: shade(i) }} />
            <span className="text-cv-ink/70">{label}</span>
            <span className="ml-auto tabular-nums text-cv-ink/55">{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 2. Anomalies trend line with a flagged spike */
function AnomalyViz() {
  return (
    <svg viewBox="0 0 200 56" className="h-full w-full" preserveAspectRatio="none">
      <polyline
        points="0,42 24,40 48,43 72,38 96,41 108,12 120,39 144,40 168,37 200,38"
        fill="none"
        stroke={BLUE}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* spike marker */}
      <circle cx="108" cy="12" r="4" fill={BLUE} />
      <circle cx="108" cy="12" r="8" fill="none" stroke={BLUE} strokeWidth="1.5" opacity="0.4" />
    </svg>
  );
}

/* 3. Commitments coverage bars with payback proof */
function CommitmentViz() {
  const rows: [string, number][] = [
    ["RI", 72],
    ["SP", 64],
    ["CSP", 58],
  ];
  return (
    <div className="space-y-2">
      {rows.map(([label, pct]) => (
        <div key={label} className="flex items-center gap-2 text-[11px]">
          <span className="w-8 font-mono text-cv-ink/70">{label}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cv-ink/10">
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: BLUE, boxShadow: `0 0 8px ${BLUE}99` }}
            />
          </div>
          <span className="w-9 text-right tabular-nums" style={{ color: BLUE }}>
            {pct}%
          </span>
        </div>
      ))}
      <div className="pt-0.5 text-[10px] text-cv-ink/55">Payback ~7.4 mo</div>
    </div>
  );
}

/* 4. Chargeback multi-currency BU report rows */
function ChargebackViz() {
  const rows: [string, string][] = [
    ["EMEA", "€12.4k"],
    ["APAC", "¥9.8k"],
    ["Americas", "$21.1k"],
  ];
  return (
    <div className="overflow-hidden rounded-md border text-[11px]" style={{ borderColor: `${BLUE}26` }}>
      <div
        className="flex items-center justify-between px-2.5 py-1.5 text-[10px] uppercase tracking-wide text-cv-ink/45"
        style={{ borderBottom: `1px solid ${BLUE}26` }}
      >
        <span>Business unit</span>
        <span>Net + tax</span>
      </div>
      {rows.map(([bu, amt]) => (
        <div
          key={bu}
          className="flex items-center justify-between px-2.5 py-1.5"
          style={{ borderTop: `1px solid ${BLUE}14` }}
        >
          <span className="text-cv-ink/70">{bu}</span>
          <span className="font-mono tabular-nums" style={{ color: BLUE }}>
            {amt}
          </span>
        </div>
      ))}
    </div>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  "Allocation everyone agrees on": AllocationViz,
  "Anomalies with attribution": AnomalyViz,
  "Commitments with payback proof": CommitmentViz,
  "Audit-ready chargeback": ChargebackViz,
};

export type ShipItem = [title: string, desc: string];

export function FinopsShips({ items }: { items: ShipItem[] }) {
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
    <div ref={ref} className="grid auto-rows-fr gap-4 sm:gap-5 sm:grid-cols-2">
      {items.map(([t, b], i) => {
        const Viz = VISUALS[t];
        return (
          <div key={t} style={rise(i)}>
            <div className="flex h-full flex-col rounded-xl border border-cv-line bg-cv-surface dark:bg-[#0D0D0D] p-7">
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
