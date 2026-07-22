"use client";

/* "How Agentry works — Discover, Govern, Prove" — the three things that have to be
   true before you can trust AI spend, as three numbered capability cards with an
   accent per step. Matches the home card design language: cv-* tokens,
   pill chip, rounded-2xl bordered cards.

   Motion: the three cards stagger in (fade + slide up) once the section enters
   the viewport (plays once; reduced-motion shows them in place). */

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { IconFileSearch, IconShield, IconReceipt } from "nucleo-isometric";
import { SectionHeading } from "@/components/SectionHeading";

type Step = {
  n: string;
  title: string;
  body: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

const STEPS: Step[] = [
  {
    n: "01",
    title: "Discover",
    color: "#1664C0",
    Icon: IconFileSearch,
    body: "Find every AI asset in one governed inventory: agents on Bedrock, Azure AI Foundry, and Vertex; SaaS agents like Copilot Studio and Agentforce; Kubernetes and in-house builds. Shadow AI included.",
  },
  {
    n: "02",
    title: "Govern",
    color: "#6954D4",
    Icon: IconShield,
    body: "Enforcement lives in the execution path, not in a report after the fact: budgets reserved and settled per call, policy and human-approval gates, model routing and failover, a kill switch that works mid-incident.",
  },
  {
    n: "03",
    title: "Prove",
    color: "#0E9E7A",
    Icon: IconReceipt,
    body: "An execution ledger records every call, route decision, token, and cost, with policy-governed prompt and response capture, so your spend and value claims are evidence, not estimates.",
  },
];

export function HowAgentryWorks() {
  const scope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      // Scope the query to THIS section — [data-reveal] is also used by other
      // sections, and an unscoped toArray would grab (and prematurely reveal)
      // their cards too.
      const cards = gsap.utils.toArray<HTMLElement>("[data-reveal]", scope.current!);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.from(cards, {
        autoAlpha: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 78%",
          toggleActions: "play none none none", // one-time reveal
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="cv-section bg-cv-surface" data-testid="section-how-agentry-works">
      <div className="cv-container">
        <SectionHeading eyebrow="How Agentry works" title="Three things have to be true before you can trust AI spend.">
          Agentry does all three: discover what&apos;s running, govern it in the execution path, and
          prove the economics after.
        </SectionHeading>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.title}
              data-reveal
              className="relative flex flex-col overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface2 p-7 dark:border-white/10 dark:bg-[#0D0D0D]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl"
                style={{ background: `radial-gradient(circle, ${s.color}26, transparent 70%)` }}
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: `${s.color}1A`, color: s.color }}
                >
                  <s.Icon size={30} />
                </span>
                <span className="font-mono text-sm font-semibold" style={{ color: s.color }}>
                  {s.n}
                </span>
              </div>
              <h3 className="relative mt-5 text-xl font-semibold text-cv-ink">{s.title}</h3>
              <p className="relative mt-3 cv-body text-cv-ink/65">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowAgentryWorks;
