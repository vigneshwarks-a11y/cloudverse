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

/* 1. PR cost diff diff lines with an inline cost delta */
function PrDiffViz() {
  return (
    <div className="font-mono text-[11px] leading-relaxed">
      <div className="text-cv-ink/45">infra/ec2.tf</div>
      <div className="mt-1 flex items-center gap-2 rounded-sm bg-[#E5484D]/10 px-1.5">
        <span className="text-[#E5484D]">-</span>
        <span className="text-cv-ink/65">instance_type = m5.large</span>
      </div>
      <div className="flex items-center gap-2 rounded-sm bg-[#0E9E7A]/10 px-1.5">
        <span className="text-[#0E9E7A]">+</span>
        <span className="text-cv-ink/65">instance_type = m5.2xlarge</span>
      </div>
      <div className="mt-2">
        <span
          className="rounded-md px-2 py-0.5 font-sans text-[10px] font-semibold"
          style={{ background: `${BLUE}1f`, color: BLUE }}
        >
          Cost impact +$1,240 / mo
        </span>
      </div>
    </div>
  );
}

/* 2. Policy-as-code versioned rule with advisory/required modes */
function PolicyViz() {
  return (
    <div className="font-mono text-[11px] leading-relaxed">
      <div className="text-cv-ink/65">
        <span style={{ color: BLUE }}>rule</span> cost_guard {"{"}
      </div>
      <div className="pl-3 text-cv-ink/55">if delta &gt; $500 → block</div>
      <div className="text-cv-ink/65">{"}"}</div>
      <div className="mt-2 flex gap-1.5 font-sans text-[10px]">
        <span className="rounded-md border px-2 py-0.5 text-cv-ink/55" style={{ borderColor: `${BLUE}33` }}>
          Advisory
        </span>
        <span
          className="rounded-md px-2 py-0.5 font-semibold"
          style={{ background: `${BLUE}1f`, color: BLUE }}
        >
          Required
        </span>
      </div>
    </div>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((c) => (
        <span
          key={c}
          className="rounded-md border px-2 py-1 text-[10px] text-cv-ink/70"
          style={{ borderColor: `${BLUE}33`, background: `${BLUE}12` }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

/* 3. Native CI integration pipeline providers */
function CiViz() {
  return <Chips items={["GitHub Actions", "GitLab CI", "Azure Pipelines", "Jenkins", "Argo"]} />;
}

/* 4. Multi-IaC support supported formats */
function IacViz() {
  return <Chips items={["Terraform", "OpenTofu", "Pulumi", "CloudFormation", "Helm", "Kubernetes"]} />;
}

const VISUALS: Record<string, () => React.JSX.Element> = {
  "PR cost diff": PrDiffViz,
  "Policy-as-code": PolicyViz,
  "Native CI integration": CiViz,
  "Multi-IaC support": IacViz,
};

export type PlatformShipItem = [title: string, desc: string];

export function PlatformShips({ items }: { items: PlatformShipItem[] }) {
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
