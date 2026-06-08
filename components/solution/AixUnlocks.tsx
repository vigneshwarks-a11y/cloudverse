"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { Route, ShieldCheck, Cpu, Tag, Database } from "lucide-react";

const BLUE = "#007CFF";

type Card = {
  title: string;
  body: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number; style?: React.CSSProperties }>;
  span: string;
};

const CARDS: Card[] = [
  {
    title: "Multi-provider routing",
    body: "Score every request across OpenAI, Anthropic, Bedrock, Vertex, Cohere, Groq, HuggingFace, and self-hosted infrastructure. Route to the best fit based on cost, latency, and quality requirements for that specific task type. Automatically.",
    Icon: Route,
    span: "md:col-span-2",
  },
  {
    title: "Policy guardrails",
    body: "Compliance, content, latency, and budget guardrails enforced before execution. PII handling rules, data residency constraints, and provider allowlists applied at the routing layer, not retrofitted in application code.",
    Icon: ShieldCheck,
    span: "md:col-span-1",
  },
  {
    title: "Right-sized GPU economics",
    body: "Move workloads between hosted and dedicated GPU pools without rewriting code. AIX handles the routing logic. Your engineers handle the model.",
    Icon: Cpu,
    span: "md:col-span-1",
  },
  {
    title: "Token and GPU attribution",
    body: "Spend tied back to team, product, and unit revenue. Automatic. No separate AI cost report reconstructed from billing data after the fact.",
    Icon: Tag,
    span: "md:col-span-2",
  },
  {
    title: "Model registry",
    body: "Track model versions, provider options, and performance benchmarks. Multi-region failover built in. Primary and fallback routes generated on every request.",
    Icon: Database,
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
          <h2 className="cv-h2 text-cv-ink">What AIX unlocks for AI engineering teams</h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-5 lg:gap-6">
          {CARDS.map(({ title, body, Icon, span }, i) => (
            <div
              key={title}
              className={`${span} flex flex-col rounded-xl border bg-cv-surface p-7 md:p-8 transition-all duration-700 ease-out`}
              style={{
                borderColor: `${BLUE}80`,
                opacity: visible || reduceMotion ? 1 : 0,
                transform: reduceMotion || visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: reduceMotion ? "0ms" : `${i * 100}ms`,
              }}
            >
              <span
                className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: `${BLUE}1A`, border: `1px solid ${BLUE}33` }}
              >
                <Icon className="h-8 w-8" strokeWidth={1.75} style={{ color: BLUE }} />
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white">{title}</h3>
              <p className="text-cv-ink/75 mt-3 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
