import type { Metadata } from "next";
import { Scale, FileCheck2, TrendingUp, AlertTriangle } from "lucide-react";
import { SolutionHero } from "@/components/solution/SolutionHero";
import { Outcomes } from "@/components/solution/Outcomes";
import { ModulesUsed } from "@/components/solution/ModulesUsed";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "For FinOps Teams — CloudVerse",
  description: "An allocation, anomaly, and optimization control plane that finance and engineering both trust. Berkshire Hathaway recovered $738,983 annualised.",
  alternates: { canonical: "/solutions/finops-teams" },
};

const FAQ = [
  { q: "How is this different from cost-explorer style dashboards?", a: "Dashboards explain the invoice. CloudVerse governs the decisions that shape it — allocation, optimization, AI/GPU economics, PR-level cost checks, and warehouse query attribution on one model." },
  { q: "Can we keep our current allocation logic?", a: "Yes. Bring any tag, account, BU, or shared-service split you already use and reconcile it back to finance reporting." },
  { q: "How long until our team is using it day-to-day?", a: "Most FinOps teams are using CloudVerse for daily anomaly triage and monthly chargeback inside two weeks." },
  { q: "Do you support multi-currency and tax?", a: "Yes — multi-currency reporting, tax layers, and per-BU discount logic are first-class." },
];

export default function Page() {
  return (
    <>
      <SolutionHero
        eyebrow="For FinOps Teams"
        h1={<>The control plane your <span className="text-cv-blue-light">finance and engineering teams both trust.</span></>}
        sub="Allocation, anomaly response, commitments, chargeback — all on one model that reconciles to finance and explains itself to engineering."
        proof={[
          { value: "$738,983", label: "Annualised savings", cite: "Berkshire Hathaway HomeServices" },
          { value: "<30 min", label: "First account connected" },
          { value: "Same day", label: "First finding surfaced" },
          { value: "5+", label: "Cloud providers unified" },
        ]}
      />

      <Outcomes
        heading="What FinOps teams ship faster with CloudVerse."
        items={[
          { icon: Scale,         title: "Allocation everyone agrees on", body: "One model with tags, accounts, BUs, and shared-service splits, reconciled to finance." },
          { icon: AlertTriangle, title: "Anomalies with attribution",     body: "Spikes surfaced with the team, env, and change that drove them — within hours." },
          { icon: TrendingUp,    title: "Commitments with payback proof", body: "RI, SP, and CSP coverage modelled with explicit payback before you commit." },
          { icon: FileCheck2,    title: "Audit-ready chargeback",         body: "Showback and chargeback wired to BU reporting with multi-currency and tax." },
        ]}
      />

      <ModulesUsed keys={["finops", "devx", "datax"]} />

      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">FAQ</div>
            <h2 className="cv-h2 text-white">FinOps team questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} />
        </div>
      </section>

      <CTABand heading="Bring your FinOps program onto one control plane." />
    </>
  );
}
