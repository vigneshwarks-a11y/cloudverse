"use client";

import { useEffect, useRef, useState } from "react";

// Single-request comparison rows. `delta` renders an inline teal reduction figure.
const WITHOUT: { k: string; v: string }[] = [
  { k: "Model", v: "Claude Sonnet" },
  { k: "Latency", v: "5,537 ms" },
  { k: "Cost / request", v: "$0.00298" },
];

const WITH: { k: string; v: string; delta?: string }[] = [
  { k: "Model", v: "GPT-4o-mini" },
  { k: "Latency", v: "3,962 ms", delta: "-28.5%" },
  { k: "Cost / request", v: "$0.00010", delta: "-96.8%" },
];

function CompareCard({
  label,
  tone,
  rows,
}: {
  label: string;
  tone: "without" | "with";
  rows: { k: string; v: string; delta?: string }[];
}) {
  const withAix = tone === "with";
  return (
    <div
      className={`flex flex-1 flex-col rounded-2xl border p-5 ${
        withAix
          ? "border-[#6954D4]/40 bg-[#6954D4]/[0.06] dark:border-[#A99CF0]/25 dark:bg-[#6954D4]/[0.12]"
          : "border-cv-line/60 bg-cv-card/60 dark:border-white/[0.07] dark:bg-[#0D0D0D]"
      }`}
    >
      <div
        className={`text-xs font-semibold uppercase tracking-widest ${
          withAix ? "text-[#6954D4] dark:text-[#A99CF0]" : "text-cv-muted"
        }`}
      >
        {label}
      </div>
      <dl className="mt-4 space-y-3">
        {rows.map((r) => (
          <div key={r.k} className="flex items-baseline justify-between gap-3">
            <dt className="text-sm text-cv-muted">{r.k}</dt>
            <dd className="flex items-baseline gap-1.5 text-right">
              <span className="font-mono text-sm font-semibold text-cv-ink">{r.v}</span>
              {r.delta && (
                <span className="font-mono text-[11px] font-semibold text-cv-teal">{r.delta}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function AixRoiSplit({ roi }: { roi: string[][] }) {
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
    <div ref={ref}>
      <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr] lg:gap-5">
        {/* At-scale monthly savings table */}
        <div
          className="overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface dark:border-white/[0.07] dark:bg-[#0D0D0D]"
          style={rise(0)}
        >
          <div className="border-b border-cv-line/50 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-cv-muted dark:border-white/10">
            At scale (monthly)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[440px] text-sm">
              <thead>
                <tr className="border-b border-cv-line/50 text-left text-[11px] uppercase tracking-wider text-cv-muted dark:border-white/10">
                  <th className="px-5 py-3 font-medium">Monthly volume</th>
                  <th className="px-5 py-3 text-right font-medium">Hardcoded spend</th>
                  <th className="px-5 py-3 text-right font-medium">With Agentry</th>
                  <th className="px-5 py-3 text-right font-medium">Monthly saving</th>
                </tr>
              </thead>
              <tbody>
                {roi.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-cv-line/30 last:border-0 dark:border-white/[0.06]"
                  >
                    <td className="px-5 py-3.5 text-cv-ink/80">{row[0]}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-cv-ink/70">{row[1]}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-cv-ink">{row[2]}</td>
                    <td className="px-5 py-3.5 text-right font-mono font-semibold text-cv-teal">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="px-5 py-3 text-[11px] leading-relaxed text-cv-muted">
            Assumption: 40&ndash;90% reduction applied at an 89% average. Your mix will differ; the audit
            measures yours.
          </p>
        </div>

        {/* Single-request Without / With comparison */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-1" style={rise(1)}>
            <CompareCard label="Example · without Agentry" tone="without" rows={WITHOUT} />
          </div>
          <div className="flex flex-1" style={rise(2)}>
            <CompareCard label="Example · with Agentry" tone="with" rows={WITH} />
          </div>
        </div>
      </div>

      {/* Result banner */}
      <div
        className="mt-5 flex flex-col items-center gap-1 rounded-2xl border border-cv-teal/30 bg-cv-teal/[0.06] px-6 py-5 text-center sm:flex-row sm:justify-center sm:gap-3"
        style={rise(3)}
      >
        <span className="font-mono text-lg font-bold text-cv-teal">
          40&ndash;90% lower cost, depending on workload mix.
        </span>
        <span className="text-sm text-cv-ink/70">
          The example above is one workload; the audit measures yours.
        </span>
      </div>
    </div>
  );
}
