import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Buildings, Code2, Cpu, Database, UsersGroupRounded } from "@solar-icons/react";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Solutions. CloudVerse",
  description: "Persona-built solutions for FinOps, AI Engineering, Platform Engineering, Data teams, and Enterprise.",
  alternates: { canonical: "/solutions" },
};

const SOLUTIONS = [
  { href: "/solutions/finops-teams",   icon: UsersGroupRounded,          label: "FinOps Teams",          desc: "Allocation, anomaly response, commitments, and chargeback on one model.", color: "#1664C0" },
  { href: "/solutions/ai-engineering", icon: Cpu,            label: "AI Engineering",        desc: "Live cost-quality routing across 8+ GPU and LLM providers.", color: "#6954D4" },
  { href: "/solutions/platform-eng",   icon: Code2, label: "Platform Engineering", desc: "PR-level cost diffs, policy-as-code, native CI integration.", color: "#0E9E7A" },
  { href: "/solutions/data-teams",     icon: Database,       label: "Data Teams",            desc: "Query-level attribution and safe automation across 6 warehouses.", color: "#D97706" },
  { href: "/solutions/enterprise",     icon: Buildings,      label: "Enterprise",            desc: "One control plane across the estate, with SSO, RBAC, and residency.", color: "#1664C0" },
];

export default function Page() {
  return (
    <>
      <section className="cv-hero-bg pt-[240px] pb-12 lg:pt-[240px] lg:pb-16 relative">
        <div className="cv-container relative z-10">
          <div className="cv-label mb-4">Solutions</div>
          <h1 className="cv-h1 text-cv-ink max-w-3xl">Built for the Teams Accountable for the Bill.</h1>
          <p className="cv-body mt-6 text-cv-ink/75 max-w-2xl">
            Five persona-built solution paths backed by one control plane.
          </p>
        </div>
      </section>

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group rounded-xl border border-cv-line/10 bg-cv-ink/[0.02] p-6 hover:bg-cv-ink/[0.04] transition-colors"
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

      <CTABand heading="Not sure which fits?" sub="Book a 20-minute call. we'll route you to the right starting point." />
    </>
  );
}
