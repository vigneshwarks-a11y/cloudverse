"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { CheckCircle, Cpu, Database, Route, ShieldCheck, Tag, type IconProps } from "@solar-icons/react";

const BLUE = "#007CFF";
const VALUE = "#7CB8F8";

type Text = ComponentType<IconProps>;

function VHead({ Icon, label }: { Icon: Text; label: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
        style={{ background: `${BLUE}1A`, border: `1px solid ${BLUE}33` }}
      >
        <Icon weight="Linear" className="h-[18px] w-[18px]" style={{ color: BLUE }} />
      </span>
      <span className="text-xs font-medium uppercase tracking-wide text-cv-ink/50">{label}</span>
    </div>
  );
}

function Panel({ children }: { children: ReactNode }) {
  return <div className="rounded-lg border border-cv-line bg-cv-card p-4">{children}</div>;
}

function RoutingVisual() {
  const providers: [string, boolean][] = [
    ["OpenAI", true],
    ["Anthropic", false],
    ["Bedrock", false],
    ["Vertex", false],
  ];
  return (
    <Panel>
      <VHead Icon={Route} label="Cost-aware routing" />
      <div className="flex items-center gap-3">
        <div
          className="shrink-0 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-[#1664C0] dark:text-[#7CB8F8]"
          style={{ background: `${BLUE}1A`, border: `1px solid ${BLUE}40` }}
        >
          Request
        </div>
        <span className="text-cv-ink/30">→</span>
        <div className="flex-1 space-y-1.5">
          {providers.map(([name, best]) => (
            <div
              key={name}
              className={`flex items-center justify-between rounded-md border px-2.5 py-1 text-[11px] ${best ? "text-[#1664C0] dark:text-[#7CB8F8]" : ""}`}
              style={
                best
                  ? { borderColor: `${BLUE}59`, background: `${BLUE}1A` }
                  : { borderColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.55)" }
              }
            >
              <span>{name}</span>
              {best && (
                <span className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: `${BLUE}33` }}>
                  best fit
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function GuardrailsVisual() {
  const rules = ["PII handling", "Data residency", "Provider allowlist"];
  return (
    <Panel>
      <VHead Icon={ShieldCheck} label="Pre-execution" />
      <div className="space-y-1.5">
        {rules.map((r) => (
          <div key={r} className="flex items-center gap-2 text-[11px] text-cv-ink/70">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: `${BLUE}26` }}>
              <CheckCircle weight="Linear" className="h-2.5 w-2.5 text-[#1664C0] dark:text-[#7CB8F8]" />
            </span>
            {r}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function GpuVisual() {
  const pools: [string, number][] = [
    ["Hosted", 62],
    ["Dedicated", 38],
  ];
  return (
    <Panel>
      <VHead Icon={Cpu} label="GPU pools" />
      <div className="space-y-2.5">
        {pools.map(([name, pct]) => (
          <div key={name}>
            <div className="mb-1 flex items-center justify-between text-[11px]">
              <span className="text-cv-ink/60">{name}</span>
              <span className="font-medium text-[#1664C0] dark:text-[#7CB8F8]">{pct}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-cv-ink/[0.06]">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: BLUE }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AttributionVisual() {
  const segments: [string, number, string][] = [
    ["Team", 45, BLUE],
    ["Product", 30, "#3F95F2"],
    ["Workload", 25, VALUE],
  ];
  return (
    <Panel>
      <VHead Icon={Tag} label="Spend attribution" />
      <div className="flex h-2.5 w-full overflow-hidden rounded-full">
        {segments.map(([name, pct, color]) => (
          <div key={name} style={{ width: `${pct}%`, background: color }} />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {segments.map(([name, pct, color]) => (
          <div key={name} className="flex items-center gap-1.5 text-[11px] text-cv-ink/60">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            {name}
            <span className="font-medium text-[#1664C0] dark:text-[#7CB8F8]">{pct}%</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function TokenGpuVisual() {
  const rows: [string, string][] = [
    ["Tokens (24h)", "2.4M"],
    ["GPU utilization", "71%"],
    ["Avg. latency", "312ms"],
  ];
  return (
    <Panel>
      <VHead Icon={Cpu} label="Per-run telemetry" />
      <div className="space-y-1.5">
        {rows.map(([label, val]) => (
          <div key={label} className="flex items-center justify-between text-[11px] text-cv-ink/60">
            <span>{label}</span>
            <span className="font-medium text-[#1664C0] dark:text-[#7CB8F8]">{val}</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function RegistryVisual() {
  const models: { name: string; version: string; status: string; dot: string }[] = [
    { name: "gpt-4o", version: "v2.1", status: "Primary", dot: BLUE },
    { name: "claude-3.5", version: "v1.4", status: "Fallback", dot: "rgba(255,255,255,0.35)" },
    { name: "llama-3", version: "v3.0", status: "Active", dot: VALUE },
  ];
  return (
    <Panel>
      <VHead Icon={Database} label="Model registry" />
      <div className="grid grid-cols-[1.4fr_0.8fr_1fr] gap-x-3 text-[10px] font-medium uppercase tracking-wide text-cv-ink/40">
        <span>Model</span>
        <span>Version</span>
        <span className="text-right">Status</span>
      </div>
      <div className="mt-2 space-y-1.5">
        {models.map((m) => (
          <div key={m.name} className="grid grid-cols-[1.4fr_0.8fr_1fr] items-center gap-x-3 text-[11px]">
            <span className="font-mono text-cv-ink/75">{m.name}</span>
            <span className="text-[#1664C0] dark:text-[#7CB8F8]">{m.version}</span>
            <span className="flex items-center justify-end gap-1.5 text-cv-ink/60">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: m.dot }} />
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

type Card = { title: string; body: string; visual: ReactNode; span: string };

const CARDS: Card[] = [
  {
    title: "Multi-provider routing",
    body: "Every request scored across providers on cost, latency, and quality. Best-fit wins, fallback attached.",
    visual: <RoutingVisual />,
    span: "md:col-span-2",
  },
  {
    title: "Policy guardrails",
    body: "Allowed providers, residency, and budget enforced before execution.",
    visual: <GuardrailsVisual />,
    span: "md:col-span-2",
  },
  {
    title: "Right-sized GPU economics",
    body: "Move workloads between hosted APIs and dedicated GPU pools as price and load change.",
    visual: <GpuVisual />,
    span: "md:col-span-2",
  },
  {
    title: "Spend attribution",
    body: "Cost allocated to the team, product, and workload that ran it, automatically.",
    visual: <AttributionVisual />,
    span: "md:col-span-2",
  },
  {
    title: "Token and GPU visibility",
    body: "Token-level tracking and GPU utilization in one view, per model and per run.",
    visual: <TokenGpuVisual />,
    span: "md:col-span-2",
  },
  {
    title: "Model registry and failover",
    body: "Versioned models with automatic failover when a provider degrades.",
    visual: <RegistryVisual />,
    span: "md:col-span-2",
  },
];

export default function AixUnlocks() {
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
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="cv-section bg-cv-surface2">
      <div className="cv-container">
        <div className="max-w-3xl mb-10">
          <h2 className="cv-h2 text-cv-ink">What AIX unlocks for AI engineering teams.</h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-6 gap-5 lg:gap-6">
          {CARDS.map(({ title, body, visual, span }, i) => (
            <div
              key={title}
              className={`${span} flex flex-col rounded-xl border border-cv-line p-7 md:p-8 transition-all duration-700 ease-out`}
              style={{
                background: "#0a0a0a",
                opacity: visible || reduceMotion ? 1 : 0,
                transform: reduceMotion || visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: reduceMotion ? "0ms" : `${i * 100}ms`,
              }}
            >
              <div aria-hidden className="mb-5">{visual}</div>
              <h3 className="text-xl md:text-2xl font-bold text-cv-ink">{title}</h3>
              <p className="text-cv-ink/75 mt-3 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
