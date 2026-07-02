"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CheckCircle } from "@solar-icons/react";

const BLUE = "#007CFF";

function Card1Visual() {
  return (
    <div className="mt-5 rounded-xl border border-cv-line bg-cv-card dark:bg-[#050505] p-4 font-mono text-xs">
      <div className="flex items-center justify-between text-cv-ink/50">
        <span>instance_type</span>
        <span>monthly</span>
      </div>
      <div className="mt-2 flex items-center justify-between rounded px-2 py-1 bg-cv-ink/[0.05] text-cv-ink/60">
        <span>- t3.large</span>
        <span>$2,400</span>
      </div>
      <div
        className="mt-1 flex items-center justify-between rounded px-2 py-1"
        style={{ background: `${BLUE}1F`, color: "#7CB8F8" }}
      >
        <span>+ t3.medium</span>
        <span>$1,200</span>
      </div>
      <div
        className="mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={{ background: `${BLUE}26`, color: "#7CB8F8" }}
      >
        ↓ saves $1,200/mo
      </div>
    </div>
  );
}

function Card2Visual() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-cv-line bg-cv-card dark:bg-[#050505]">
      <div className="grid grid-cols-[1fr_1.4fr] text-xs">
        <div className="border-b border-cv-line px-3 py-2 font-medium text-cv-ink/50">Mode</div>
        <div className="border-b border-cv-line px-3 py-2 font-medium text-cv-ink/50">Trigger</div>

        <div className="border-b border-cv-line px-3 py-2">
          <span className="rounded-full bg-cv-ink/[0.06] px-2 py-0.5 text-cv-ink/70">advisory</span>
        </div>
        <div className="border-b border-cv-line px-3 py-2 text-cv-ink/70">estimate only</div>

        <div className="px-3 py-2">
          <span
            className="rounded-full px-2 py-0.5 font-medium"
            style={{ background: `${BLUE}26`, color: "#7CB8F8" }}
          >
            required
          </span>
        </div>
        <div className="px-3 py-2 text-cv-ink/70">approval over threshold</div>
      </div>
    </div>
  );
}

function Card3Visual() {
  const platforms = ["GitHub Actions", "GitLab CI", "Azure Pipelines", "Jenkins", "Argo"];
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {platforms.map((p) => (
        <span
          key={p}
          className="rounded-full border px-3 py-1 text-xs text-cv-ink/80"
          style={{ borderColor: `${BLUE}40`, background: `${BLUE}12` }}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

function Card4Visual() {
  const tools = ["Terraform", "OpenTofu", "Pulumi", "CloudFormation", "Helm", "Kubernetes"];
  return (
    <div className="mt-5">
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        {tools.map((t) => (
          <div key={t} className="flex items-center gap-2 text-cv-ink/80">
            <span
              className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
              style={{ background: `${BLUE}26` }}
            >
              <CheckCircle weight="Linear" className="h-2.5 w-2.5" style={{ color: "#7CB8F8" }} />
            </span>
            {t}
          </div>
        ))}
      </div>
      <div className="mt-3 text-[11px] font-semibold" style={{ color: "#7CB8F8" }}>
        7+ formats supported
      </div>
    </div>
  );
}

type Card = { title: string; body: string; visual: ReactNode };

const CARDS: Card[] = [
  {
    title: "PR cost diff",
    body: "Every infra PR gets an inline cost impact estimate before reviewers see it. The engineer sees what their change costs. Their reviewer sees it too. The conversation happens in the PR, not in a cost review meeting three weeks later.",
    visual: <Card1Visual />,
  },
  {
    title: "Policy-as-code",
    body: "Cost guardrails versioned in your repo. Applied as advisory or required checks. Advisory mode: the PR gets an estimate, the engineer decides. Required mode: PRs over a defined cost threshold need explicit approval before merge. Both modes live in your repo as code: version controlled, reviewable, auditable.",
    visual: <Card2Visual />,
  },
  {
    title: "Native CI integration",
    body: "GitHub Actions, GitLab CI, Azure Pipelines, Jenkins, Argo. No new pipeline required. DevX slots into what your teams already use.",
    visual: <Card3Visual />,
  },
  {
    title: "Multi-IaC support",
    body: "Terraform, OpenTofu, Pulumi, CloudFormation, Helm, Kubernetes, raw Kubernetes manifests. 7+ formats supported.",
    visual: <Card4Visual />,
  },
];

export default function CostGates() {
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

  return (
    <section className="cv-section">
      <div className="cv-container">
        <div className="mb-10">
          <h2 className="cv-h2 text-cv-ink whitespace-nowrap">Cost gates engineers actually want to use.</h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {CARDS.map(({ title, body, visual }, i) => (
            <div
              key={title}
              className="flex flex-col rounded-2xl border border-cv-line/40 p-7 transition-all duration-700 ease-out"
              style={{
                background: `linear-gradient(160deg, hsl(var(--cv-card)) 0%, ${BLUE}10 100%)`,
                opacity: visible || reduceMotion ? 1 : 0,
                transform: reduceMotion || visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: reduceMotion ? "0ms" : `${i * 110}ms`,
              }}
            >
              <h3 className="cv-h3 text-cv-ink">{title}</h3>
              <p className="text-cv-ink/75 mt-3 leading-relaxed">{body}</p>
              <div aria-hidden className="mt-auto">{visual}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
