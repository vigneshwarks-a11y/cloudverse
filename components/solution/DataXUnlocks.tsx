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

/* 1. Query attribution workload → owner → cost rows */
function AttributionViz() {
  const rows: [string, string, number][] = [
    ["dash_revenue", "Analytics", 82],
    ["model_churn", "DS team", 54],
    ["etl_nightly", "Data Eng", 38],
  ];
  return (
    <VizFrame>
      <div className="space-y-2">
        {rows.map(([q, owner, pct]) => (
          <div key={q} className="flex items-center gap-2 text-[11px]">
            <span className="w-20 truncate font-mono text-cv-ink/70">{q}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cv-ink/10">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: BLUE, boxShadow: `0 0 8px ${BLUE}99` }}
              />
            </div>
            <span className="w-14 text-right text-cv-ink/55">{owner}</span>
          </div>
        ))}
      </div>
    </VizFrame>
  );
}

/* 2. Pattern detection grouped patterns with run counts */
function PatternViz() {
  const rows: [string, string][] = [
    ["full-scan", "×127"],
    ["fan-out join", "×88"],
    ["missing prune", "×64"],
  ];
  return (
    <VizFrame>
      <div className="space-y-2">
        {rows.map(([label, count]) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-md border px-2.5 py-1.5 text-[11px]"
            style={{ borderColor: `${BLUE}26` }}
          >
            <span className="font-mono text-cv-ink/70">{label}</span>
            <span
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold tabular-nums"
              style={{ color: BLUE, background: `${BLUE}1a`, border: `1px solid ${BLUE}40` }}
            >
              {count}
            </span>
          </div>
        ))}
      </div>
    </VizFrame>
  );
}

/* 3. Predictive signals sparkline with a forecast spike */
function PredictiveViz() {
  return (
    <VizFrame>
      <svg viewBox="0 0 200 56" className="h-full w-full" preserveAspectRatio="none">
        {/* baseline history */}
        <polyline
          points="0,42 26,38 52,40 78,34 104,36 130,30"
          fill="none"
          stroke={BLUE}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* forecast (dashed, rising spike) */}
        <polyline
          points="130,30 156,26 182,8"
          fill="none"
          stroke={BLUE}
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        {/* predicted spike marker */}
        <circle cx="182" cy="8" r="4" fill={BLUE} />
        <circle cx="182" cy="8" r="8" fill="none" stroke={BLUE} strokeWidth="1.5" opacity="0.4" />
      </svg>
    </VizFrame>
  );
}

/* 4. Safe automation scoped fixes with toggles */
function AutomationViz() {
  const fixes = ["Partition prune", "Right-size cluster", "Reversible · audited"];
  return (
    <VizFrame>
      <div className="space-y-2">
        {fixes.map((label, i) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-md border px-2.5 py-1.5 text-[11px]"
            style={{ borderColor: `${BLUE}26` }}
          >
            <span className="text-cv-ink/70">{label}</span>
            <span
              className="flex h-3.5 w-6 items-center rounded-full p-0.5"
              style={{ background: BLUE, justifyContent: i === 2 ? "flex-start" : "flex-end", opacity: i === 2 ? 0.4 : 1 }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </span>
          </div>
        ))}
      </div>
    </VizFrame>
  );
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  "Query attribution": AttributionViz,
  "Pattern detection": PatternViz,
  "Predictive signals": PredictiveViz,
  "Safe automation": AutomationViz,
};

export type UnlockItem = [title: string, desc: string];

export function DataXUnlocks({ items }: { items: UnlockItem[] }) {
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
            <div
              className="flex h-full flex-col rounded-xl border border-cv-line p-7"
              style={{ background: "#0a0a0a" }}
            >
              <h3 className="cv-h3 font-semibold text-cv-ink">{t}</h3>
              <p className="text-cv-ink/75 mt-3 leading-relaxed">{b}</p>
              {Viz ? <Viz /> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
