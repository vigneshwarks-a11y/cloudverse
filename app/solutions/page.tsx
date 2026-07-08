import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Buildings, CheckCircle, Code2, Cpu, Database, UsersGroupRounded, Widget2 } from "@solar-icons/react";
import { SolutionHero } from "@/components/solution/SolutionHero";

export const metadata: Metadata = {
  title: "Solutions — CloudVerse",
  description: "Persona-built solutions for FinOps, AI Engineering, Platform Engineering, Data teams, and Enterprise.",
  keywords: ["cloud cost solutions", "FinOps solutions", "AI cost management", "platform engineering cost", "enterprise cloud economics"],
  alternates: { canonical: "/solutions" },
  openGraph: {
    title: "CloudVerse Solutions — Built for Every Team",
    description: "Persona-built solutions for FinOps, AI Engineering, Platform Engineering, Data teams, and Enterprise.",
    url: "/solutions",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "CloudVerse Solutions" }],
  },
  twitter: { card: "summary_large_image", title: "CloudVerse Solutions — Built for Every Team", description: "Solutions for FinOps, AI Engineering, Platform Engineering, Data teams, and Enterprise." },
};

const SOLUTIONS = [
  { href: "/solutions/ai-engineering", icon: Cpu,            label: "AI Engineering",        desc: "Live cost-quality routing across 8+ GPU and LLM providers, policy-bound at execution.", color: "#6954D4" },
  { href: "/solutions/finops-teams",   icon: UsersGroupRounded,          label: "FinOps Teams",          desc: "Allocation, anomaly response, commitments, and chargeback on one model.", color: "#1664C0" },
  { href: "/solutions/platform-eng",   icon: Code2, label: "Platform Engineering", desc: "PR-level cost diffs, policy-as-code, native CI integration.", color: "#0E9E7A" },
  { href: "/solutions/data-teams",     icon: Database,       label: "Data Teams",            desc: "Query-level attribution and safe automation across 6 warehouses.", color: "#D97706" },
  { href: "/solutions/enterprise",     icon: Buildings,      label: "Enterprise",            desc: "One control plane across the estate, with SSO, RBAC, and residency.", color: "#1664C0" },
];

export default function Page() {
  return (
    <>
      <SolutionHero
        eyebrow="Solutions"
        h1="Built for the teams accountable for the bill."
        sub="Five persona-built paths, one control plane underneath. Cloud, AI, data, and engineering spend, owned by the people who create it."
        accent="#1664C0"
        icon={Widget2}
        platformHref="/platform/finops"
        badges={["Cost Attribution", "Policy Enforcement", "Live Routing", "Audit Trails", "Multi-Cloud", "Read-Only by Default"]}
      />

      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-xl border border-cv-line/40 dark:bg-[#0D0D0D] p-6 hover:border-white/20 transition-colors"
                  style={{ borderTop: `3px solid ${s.color}` }}
                  data-testid={`solution-${s.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${s.color}1A`, color: s.color }}>
                    <Icon size={20} />
                  </div>
                  <div className="font-display font-semibold text-cv-ink text-lg">{s.label}</div>
                  <p className="text-cv-ink/65 text-sm mt-2 leading-relaxed">{s.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: s.color }}>
                    Explore <ArrowRight weight="Linear" size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* THE SHARED IDEA */}
      <section className="cv-section">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-5 max-w-2xl">Different jobs. The same missing piece.</h2>
          <p className="cv-body-lg text-cv-ink/80">
            Finance can&apos;t explain the bill. Engineering commits the spend but never sees it. AI runs as a side process no one owns. Every team is accountable for a slice of the same problem: cost decided in one place, felt in another. CloudVerse connects the decision to the dollar, so each team works from one record instead of four tools.
          </p>
        </div>
      </section>

      {/* WHAT CHANGES */}
      <section className="cv-section bg-cv-surface dark:bg-black">
        <div className="cv-container">
          <h2 className="cv-h2 text-cv-ink mb-8 max-w-2xl">What changes when spend has an owner.</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Spend ownership reaches every team, not just the FinOps function.",
              "Engineers meet cost inside the workflows they already use, not in a monthly review.",
              "Finance acts on live signals instead of chasing explanations after close.",
              "Leadership shifts from reviewing spend to deciding what's next.",
            ].map((b) => (
              <li key={b} className="flex items-start gap-3 text-cv-ink/85">
                <CheckCircle weight="Linear" size={18} className="text-cv-teal mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}
