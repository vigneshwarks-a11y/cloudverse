"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Bolt, BranchingPathsUp, Cpu, Eye, Shield } from "@solar-icons/react";
import { LoaderBar } from "@/components/ui/LoaderBar";

const CYCLE_MS = 5000;

const FEATURES = [
  {
    id: "visibility",
    title: "See every model, token, team, and agent in one view",
    body: "One view of all of it: models, tokens, teams, projects, agents, subscriptions, APIs.",
    href: "/platform/aix",
    color: "#1664C0",
    icon: Eye,
  },
  {
    id: "routing",
    title: "Route each workload to the right model automatically",
    body: "AIX scores every request live on cost, latency, quality, and compliance. The best-fit model wins automatically.",
    href: "/platform/aix",
    color: "#6954D4",
    icon: BranchingPathsUp,
  },
  {
    id: "optimization",
    title: "Catch oversized models, wasteful prompts, and duplicate subscriptions",
    body: "Find the oversized model, the wasteful prompt, the subscription you're paying for twice. See the saving before you commit.",
    href: "/platform/aix",
    color: "#0E9E7A",
    icon: Shield,
  },
  {
    id: "unit-economics",
    title: "Cost per request, per feature, per tenant",
    body: "AIX gives AI its own unit economics instead of numbers borrowed from infrastructure. Every run lands against a team, a feature, and a use case, so “is this worth it?” has an answer you can defend.",
    href: "/platform/aix",
    color: "#1664C0",
    icon: Cpu,
  },
  {
    id: "no-code-change",
    title: "No code change when prices or providers move",
    body: "Every route is scored live on cost, latency, quality, and compliance. When prices shift or a provider goes down, AIX reroutes automatically.",
    href: "/platform/aix",
    color: "#E05A2B",
    icon: Bolt,
  },
];

const PROVIDERS = [
  { name: "OpenAI",      logo: "OA",  color: "#10A37F", cost: "$12.99", desc: "Safe and innovative AI solutions for everyone.",          latency: "300–500ms", score: 94 },
  { name: "Deepseek",   logo: "DS",  color: "#4C6EF5", cost: "$8.99",  desc: "AI-driven insights for deeper data exploration.",         latency: "200–400ms", score: 89 },
  { name: "Anthropic",  logo: "AN",  color: "#C96442", cost: "$15.49", desc: "AI research prioritising safety and alignment.",           latency: "350–600ms", score: 91 },
  { name: "Azure AI",   logo: "AZ",  color: "#0078D4", cost: "$11.49", desc: "Powerful AI services seamlessly integrated with Azure.",   latency: "250–450ms", score: 88 },
  { name: "Gemini",     logo: "GM",  color: "#4285F4", cost: "$14.99", desc: "Dual-natured, curious, adaptable, witty, and energetic.", latency: "300–500ms", score: 87 },
  { name: "Cohere",     logo: "CO",  color: "#D95B5B", cost: "$17.49", desc: "Cohere empowers enterprise-grade language AI.",           latency: "280–480ms", score: 85 },
];

function ModelCatalog({ activeColor }: { activeColor: string }) {
  return (
    <div className="rounded-2xl border border-cv-line bg-cv-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-cv-line px-5 py-4">
        <div className="text-sm font-semibold text-cv-ink mb-3">Model Catalog</div>
        <div className="flex items-center gap-4 text-xs">
          <button className="text-cv-ink font-medium pb-1" style={{ borderBottom: `2px solid ${activeColor}` }}>AI Providers</button>
          <button className="text-cv-muted">Models</button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-x sm:divide-y divide-cv-line">
        {PROVIDERS.map((p, i) => (
          <div
            key={p.name}
            className={`p-4 text-xs flex flex-col gap-2 ${i >= 3 ? "opacity-40" : ""}`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white text-xs font-bold"
                style={{ background: p.color }}
              >
                {p.logo}
              </div>
              <div className="flex items-center gap-1 rounded-full border border-[#0E9E7A]/40 bg-[#0E9E7A]/10 px-2 py-0.5 text-[10px] text-[#4ADE80]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                Active
              </div>
            </div>

            {/* Name + cost */}
            <div className="flex items-center gap-2 mt-1">
              <span className="font-semibold text-cv-ink text-[13px]">{p.name}</span>
              <span className="rounded-full border border-cv-blue/30 bg-cv-blue/10 px-1.5 py-0.5 text-[10px] text-cv-muted">{p.cost}</span>
            </div>

            {/* Desc */}
            <p className="text-cv-muted leading-snug line-clamp-2">{p.desc}</p>

            {/* Stats */}
            <div className="mt-1 space-y-1 text-[10px]">
              <div className="flex justify-between text-cv-muted/70">
                <span>Safety Score</span>
                <span className="text-cv-ink/70">{p.score}%</span>
              </div>
              <div className="flex justify-between text-cv-muted/70">
                <span>Latency</span>
                <span className="text-cv-ink/70">{p.latency}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AixOrchestration() {
  const [active, setActive] = useState(0);
  const current = FEATURES[active];

  useEffect(() => {
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % FEATURES.length);
    }, CYCLE_MS);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="cv-section bg-cv-surface">
      <div className="cv-container">

        {/* Section heading */}
        <h2 className="cv-h2 text-cv-ink mb-4 max-w-2xl">
          Enterprise AI is fragmented. AIX makes it one system of record.
        </h2>
        <p className="text-cv-ink/70 leading-relaxed max-w-2xl mb-12">
          Not a gateway that runs your routing rules. Not observability that tells you what a request
          cost after it ran. AIX gives every asset — agent, app, RAG system, model — an identity, a
          contract, an operational record, and measurable economics. Discover · Govern · Value.
        </p>

        <div
          className="flex flex-col lg:flex-row lg:items-start lg:gap-16"
        >

          {/* Left: accordion */}
          <div className="lg:w-[42%] shrink-0">
            {FEATURES.map((f, i) => {
              const isActive = i === active;
              return (
                <button
                  key={f.id}
                  onClick={() => setActive(i)}
                  className="w-full text-left"
                >
                  <div className={`py-5 transition-colors ${isActive ? "" : "hover:opacity-80"}`}>
                    <h3 className={`text-base font-semibold tracking-tight transition-colors ${isActive ? "text-cv-ink" : "text-cv-ink/50"}`}>
                      {f.title}
                    </h3>

                    {/* Expanded content */}
                    <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                      <p className="text-sm text-cv-ink/60 leading-relaxed">{f.body}</p>
                      <Link
                        href={f.href}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#1664C0] hover:text-[#0e4fa0] dark:text-[#7CB8F8] dark:hover:text-[#A9C8F8] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn More <ArrowRight weight="Linear" size={12} />
                      </Link>

                      {/* Mobile-only: image inline inside expanded item */}
                      <div className="lg:hidden mt-4 rounded-2xl border border-cv-line bg-cv-card overflow-hidden aspect-[4/3] flex items-center justify-center">
                        <span className="text-sm text-cv-muted">Image coming soon</span>
                      </div>
                    </div>

                    {/* Progress bar — track always visible, fill only on active */}
                    <LoaderBar animKey={isActive ? active : undefined} duration={CYCLE_MS} active={isActive} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: mock UI — desktop only */}
          <div className="hidden lg:block mt-8 lg:mt-0 flex-1 min-w-0 overflow-hidden">
            <div className="rounded-2xl border border-cv-line bg-cv-card overflow-hidden aspect-[4/3] flex items-center justify-center">
              <span className="text-sm text-cv-muted">Image coming soon</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
