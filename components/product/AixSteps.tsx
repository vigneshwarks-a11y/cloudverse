"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  BranchingPathsDown,
  Eye,
  PlugCircle,
  Scale,
  ShieldCheck,
  Target,
  type IconProps,
} from "@solar-icons/react";
import type { ComponentType } from "react";
import { Dashboard } from "@/components/home/AixOrchestration";

/* "How AIX controls every AI request" — a horizontal step tab-bar (each step a
   title + subtitle) with a dashed line above and a solid line below, and a
   content holder underneath (dashed top/bottom) that cross-fades to the active
   step. Steps auto-advance and are tappable; respects reduced-motion. */

type Step = {
  key: string;
  title: string;
  subtitle: string;
  body: string;
  detail: string[];
  Icon: ComponentType<IconProps>;
};

const STEPS: Step[] = [
  {
    key: "connect",
    title: "Connect",
    subtitle: "any provider",
    body: "Add your provider API keys and endpoints. Minutes per provider, no application change.",
    detail: ["OpenAI · Anthropic · Google", "Bedrock · Azure · self-hosted", "No app rewrite"],
    Icon: PlugCircle,
  },
  {
    key: "govern",
    title: "Govern",
    subtitle: "before it runs",
    body: "Set the constraints: latency ceiling, budget cap, allowed providers, residency, quality floor.",
    detail: ["Budget caps", "Residency + provider allow-lists", "Quality floor"],
    Icon: ShieldCheck,
  },
  {
    key: "score",
    title: "Score",
    subtitle: "every route live",
    body: "Each route is evaluated live on cost, latency distribution, and quality fit.",
    detail: ["Cost per token", "Latency distribution", "Quality fit"],
    Icon: Target,
  },
  {
    key: "route",
    title: "Route",
    subtitle: "to the best fit",
    body: "Policy filters the scored routes; the best-fit wins and a fallback stands ready.",
    detail: ["Best-fit wins", "Fallback attached", "<15ms overhead"],
    Icon: BranchingPathsDown,
  },
  {
    key: "measure",
    title: "Measure",
    subtitle: "every dollar",
    body: "Cost per request, per feature, and per tenant, tracked as it happens.",
    detail: ["Per request", "Per feature", "Per tenant"],
    Icon: Scale,
  },
  {
    key: "audit",
    title: "Audit",
    subtitle: "every decision",
    body: "Every decision logged: constraints active, routes considered, and why one won.",
    detail: ["Constraints active", "Routes considered", "Why one won"],
    Icon: Eye,
  },
];

const ACCENT = "#2278E0";
const DWELL_MS = 5000;

function Line({ variant = "dashed" }: { variant?: "dashed" | "solid" }) {
  return (
    <div
      aria-hidden
      className={`w-full border-t border-cv-line ${variant === "dashed" ? "border-dashed" : "border-solid"}`}
    />
  );
}

export default function AixSteps() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [reduced, setReduced] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const startTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    if (reduced) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % STEPS.length), DWELL_MS);
  }, [reduced]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [startTimer]);

  const select = (i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
    startTimer();
  };

  return (
    <div>
      {/* ── Step tab-bar: dashed line on top, solid line below ── */}
      <div className="relative">
        <Line variant="dashed" />
        <div role="tablist" aria-label="How AIX controls a request" className="flex overflow-x-auto">
          {STEPS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                className="group relative flex min-w-[130px] flex-1 flex-col items-start gap-0.5 px-4 py-4 text-left sm:min-w-0"
              >
                {/* left divider between tabs (skip first) */}
                {i > 0 && <span aria-hidden className="absolute left-0 top-3 bottom-3 w-px bg-cv-line" />}
                <span
                  className="text-sm font-semibold transition-colors duration-300 sm:text-base"
                  style={{ color: isActive ? "hsl(var(--cv-ink))" : "hsl(var(--cv-muted))" }}
                >
                  {s.title}
                </span>
                <span className="text-xs text-cv-muted sm:text-sm">{s.subtitle}</span>

                {/* auto-advance progress fill sitting on the solid line below */}
                {isActive && (
                  <span className="absolute -bottom-px left-0 h-[2px] w-full overflow-hidden">
                    {reduced ? (
                      <span className="absolute inset-0" style={{ background: ACCENT }} />
                    ) : (
                      <motion.span
                        key={`${active}-${cycle}`}
                        className="absolute inset-y-0 left-0"
                        style={{ background: ACCENT }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: DWELL_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <Line variant="solid" />
      </div>

      {/* ── Content holder: dashed line top + bottom ── */}
      <div className="relative">
        <div className="relative overflow-hidden">
          {/* soft accent glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(70% 90% at 78% 20%, rgba(34,120,224,0.12), transparent 70%)" }}
          />
          {/* CloudVerse product screen (the "One system of record" dashboard),
              full-width edge to edge */}
          <div className="relative px-1 py-8 md:px-6 md:py-12">
            <Dashboard />
          </div>
        </div>
        <Line variant="dashed" />
      </div>
    </div>
  );
}
