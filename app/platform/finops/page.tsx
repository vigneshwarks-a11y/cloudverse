import type { Metadata } from "next";
import { BarChart3, Layers, AlertTriangle, TrendingUp, FileCheck2, Network, Tag, Wallet, LineChart } from "lucide-react";
import { ProductHero } from "@/components/product/Hero";
import { SplitMockup } from "@/components/product/Mockup";
import { FeatureShowcase, type FeatureState } from "@/components/product/FeatureShowcase";
import { Capabilities } from "@/components/product/Capabilities";
import { Lifecycle } from "@/components/product/Lifecycle";
import { WhoUsesIt } from "@/components/product/WhoUsesIt";
import { IntegrationsStrip } from "@/components/product/IntegrationsStrip";
import { ExpandInto } from "@/components/product/ExpandInto";
import { FaqBlock } from "@/components/FaqBlock";
import { CTABand } from "@/components/CTABand";
import { MODULES } from "@/lib/modules";

const M = MODULES.finops;

export const metadata: Metadata = {
  title: "FinOps Platform — Multi-Cloud Cost Intelligence",
  description:
    "Unified cost visibility, allocation, anomaly detection, and optimization across AWS, Azure, GCP, and more. Berkshire Hathaway realised $738,983 in annualised savings.",
  alternates: { canonical: "/platform/finops" },
};

const FEATURES: FeatureState[] = [
  {
    title: "Cost variance explanation",
    desc: "Every spike attributed to a team, service, or change — within hours, not weeks.",
    mockTitle: "cloudverse.ai/finops/variance",
    mockBody: <MockVariance />,
  },
  {
    title: "Allocation & chargeback",
    desc: "Shared services, tag governance, and chargeback that finance and engineering both agree on.",
    mockTitle: "cloudverse.ai/finops/allocation",
    mockBody: <MockAllocation />,
  },
  {
    title: "Anomaly detection",
    desc: "Spend anomalies surfaced with full attribution and recommended actions.",
    mockTitle: "cloudverse.ai/finops/anomalies",
    mockBody: <MockAnomalies />,
  },
  {
    title: "Optimization",
    desc: "Right-sizing, commitment guidance, and savings plan modeling with payback proof.",
    mockTitle: "cloudverse.ai/finops/optimize",
    mockBody: <MockOptimize />,
  },
];

const FAQ = [
  { q: "Which clouds does FinOps Platform support?", a: "AWS, Microsoft Azure, Google Cloud, Alibaba Cloud, Huawei Cloud, plus VMware and Kubernetes for hybrid estates. All connections are read-only by default." },
  { q: "How long does it take to connect an account?", a: "Most teams connect their first cloud account in under 30 minutes. Initial findings — anomalies, commitment gaps, untagged spend — typically surface the same day." },
  { q: "How is CloudVerse different from a legacy FinOps tool?", a: "Legacy tools explain the invoice after it lands. CloudVerse governs the decisions that create it. Allocation, optimization, AI/GPU economics, PR-level cost checks, and warehouse query attribution all run on a single shared control plane." },
  { q: "Can we run our own allocation model?", a: "Yes. You can express any allocation logic — tags, accounts, namespaces, business units, shared service splits — and reconcile it back to finance reporting without engineering changes." },
  { q: "Do you handle commitments and savings plans?", a: "We model coverage, utilisation, and break-even payback across Reserved Instances, Savings Plans, Compute Savings Plans, and Azure RIs — with explicit recommendations and ownership trails." },
  { q: "What about multi-currency and chargeback to business units?", a: "Multi-currency reporting, showback, and chargeback are first-class. Tax and discount layers can be applied per account or per business unit." },
  { q: "Where does Berkshire Hathaway's $738,983 number come from?", a: "Berkshire Hathaway HomeServices (2026): $101,736/month identified, $61,582/month realised, $738,984 annualised. Numbers tracked in CloudVerse and reconciled against cloud invoices." },
];

export default function Page() {
  return (
    <>
      <ProductHero
        eyebrow="FinOps Platform"
        color={M.color}
        h1={<>Multi-cloud cost intelligence <span style={{ color: M.color }}>for every team.</span></>}
        sub="Unified cost, allocation, and optimization across AWS, Azure, GCP, and the rest of your estate — governed in one place."
        stats={[
          { value: "$738,983", label: "Annualised savings", cite: "Berkshire Hathaway HomeServices, 2026" },
          { value: "$61,582", label: "Realised / month", cite: "Berkshire Hathaway, 2026" },
          { value: "$101,736", label: "Identified / month", cite: "Berkshire Hathaway, 2026" },
          { value: "5+", label: "Cloud providers" },
        ]}
      />

      <SplitMockup
        color={M.color}
        label="Cost overview"
        heading="See every dollar by team, product, and provider."
        body="A live cost overview that ties every line item back to the team, environment, or product driving it — with explicit anomaly attribution when something changes."
        stat={{ value: "$101,736 / mo", label: "Identified savings" }}
        mockTitle="cloudverse.ai/finops/overview"
        mockBody={<MockOverview />}
      />

      <FeatureShowcase
        label="Platform"
        heading="Four product surfaces. One unified view."
        color={M.color}
        states={FEATURES}
      />

      {/* Berkshire case study */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3" style={{ color: M.color }}>Customer story</div>
            <h2 className="cv-h2 text-white">How Berkshire Hathaway HomeServices recovered $738,983.</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <div className="grid sm:grid-cols-3 gap-6 p-7 sm:p-9 bg-cv-navy">
              <MetricBlock value="$101,736" label="Monthly identified" />
              <MetricBlock value="$61,582" label="Monthly realised" />
              <MetricBlock value="$738,984" label="Annualised savings" />
            </div>
            <div className="p-7 sm:p-9 bg-white/[0.02] text-white/80 text-[15px] leading-relaxed">
              A growing multi-cloud Azure and AWS estate produced significant monthly variance without a shared allocation model. CloudVerse connected both accounts in under a day, surfaced commitment gaps and stranded App Service capacity, and produced an actionable savings backlog within the first week.
            </div>
          </div>
        </div>
      </section>

      <Capabilities
        label="Capabilities"
        heading="Everything finance and engineering need on day one."
        color={M.color}
        items={[
          { icon: Layers,        title: "Allocation",        desc: "Express any model — tags, accounts, BU, shared services — reconciled to finance." },
          { icon: AlertTriangle, title: "Anomaly detection", desc: "Spend anomalies surfaced with attribution and recommended remediation." },
          { icon: TrendingUp,    title: "Forecasting",       desc: "Run-rate forecasts by team, env, and product — explained, not just charted." },
          { icon: BarChart3,     title: "Unit economics",    desc: "Cost per customer, per request, per workload — tied to revenue signals." },
          { icon: Wallet,        title: "Commitments",       desc: "RI, SP, CSP coverage and utilisation modelling with payback proof." },
          { icon: Tag,           title: "Tag governance",    desc: "Untagged spend ownership, enforcement policies, and remediation paths." },
          { icon: FileCheck2,    title: "Showback / chargeback", desc: "Finance-ready reports with multi-currency, tax, and discount logic." },
          { icon: Network,       title: "Multi-cloud",       desc: "AWS, Azure, GCP, Alibaba, Huawei, Kubernetes, and VMware on one model." },
          { icon: LineChart,     title: "Variance reporting",desc: "Period-over-period variance with attribution, not just colour-coded cells." },
        ]}
      />

      <Lifecycle
        color={M.color}
        stages={[
          { title: "Inform",   bullets: ["Connect AWS, Azure, GCP in under 30 minutes", "Cost, usage, and unit views per team / product", "Anomalies with attribution within hours", "Read-only by default — no production access"] },
          { title: "Optimize", bullets: ["Right-size, schedule, and commit with proof", "Modelled payback per recommendation", "Tag and ownership remediation playbooks", "Approval workflows with audit logs"] },
          { title: "Operate",  bullets: ["Policy-bound automation as workloads evolve", "Chargeback and showback wired to BU reporting", "Multi-cloud variance reporting", "Continuous governance, not one-time clean-up"] },
        ]}
      />

      <WhoUsesIt
        color={M.color}
        items={[
          { team: "FinOps",        role: "FinOps Manager",  desc: "Owns allocation, anomaly response, and the savings backlog across providers." },
          { team: "Engineering",   role: "Cloud Engineer",  desc: "Acts on right-sizing, commitment, and waste recommendations without breaking workloads." },
          { team: "Finance",       role: "CFO / VP Finance",desc: "Gets accurate showback, predictable run-rate forecasts, and audit-ready reporting." },
        ]}
      />

      <IntegrationsStrip
        color={M.color}
        items={["AWS", "Microsoft Azure", "Google Cloud", "Alibaba Cloud", "Huawei Cloud", "Kubernetes", "VMware / vCenter", "Datadog", "OpenTelemetry"]}
      />

      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3" style={{ color: M.color }}>FAQ</div>
            <h2 className="cv-h2 text-white">FinOps Platform questions, answered.</h2>
          </div>
          <FaqBlock items={FAQ} accent={M.color} />
        </div>
      </section>

      <ExpandInto current="finops" />
      <CTABand
        heading="See where your cloud bill is actually going."
        sub="Connect your first account in under 30 minutes. Most teams have their first non-obvious finding the same day."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "CloudVerse FinOps Platform",
            applicationCategory: "BusinessApplication",
            description: metadata.description,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </>
  );
}

function MetricBlock({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display font-bold text-white text-3xl sm:text-4xl tabular-nums">{value}</div>
      <div className="text-white/60 text-xs uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
}

/* ——— Mock UIs ——— */

function MockOverview() {
  const bars = [
    { name: "AWS · EC2", v: 92 },
    { name: "Azure · VMs", v: 71 },
    { name: "Snowflake", v: 54 },
    { name: "AWS · S3", v: 38 },
    { name: "Databricks", v: 28 },
  ];
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] text-white/55 uppercase tracking-wider">
        <span>Top cost drivers · last 30 days</span>
        <span>Δ vs. prior</span>
      </div>
      {bars.map((b) => (
        <div key={b.name} className="flex items-center gap-3">
          <div className="text-white/85 text-xs w-28 shrink-0">{b.name}</div>
          <div className="flex-1 h-6 rounded bg-white/8 overflow-hidden">
            <div className="h-full" style={{ width: `${b.v}%`, background: "#1664C0" }} />
          </div>
          <div className="text-white/65 text-xs tabular-nums w-12 text-right">+{Math.round(b.v / 6)}%</div>
        </div>
      ))}
      <div className="mt-4 p-3 rounded border border-cv-blue/30 bg-cv-blue/10 text-xs text-white/85">
        <span className="text-cv-blue-light font-medium">Anomaly detected — </span>
        EC2 spend +37% vs. 7-day avg. Attributed to <span className="text-white font-medium">team-data-platform</span> (i-0a4e…b21).
      </div>
    </div>
  );
}

function MockVariance() {
  return (
    <div>
      <div className="text-[11px] text-white/55 uppercase tracking-wider mb-3">Period variance · Nov vs Oct</div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[{ k: "Compute", v: "+$18.2k" }, { k: "Storage", v: "−$2.1k" }, { k: "Egress", v: "+$5.6k" }].map((x) => (
          <div key={x.k} className="rounded border border-white/10 p-3">
            <div className="text-white/55 text-[11px]">{x.k}</div>
            <div className="text-white font-display font-semibold mt-1 tabular-nums">{x.v}</div>
          </div>
        ))}
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between p-2 rounded bg-white/[0.03]"><span className="text-white/80">team-ml-training scaled p3.16xlarge fleet</span><span className="text-white tabular-nums">+$11,420</span></div>
        <div className="flex justify-between p-2 rounded bg-white/[0.03]"><span className="text-white/80">prod-eu egress spike (CDN failover)</span><span className="text-white tabular-nums">+$5,612</span></div>
        <div className="flex justify-between p-2 rounded bg-white/[0.03]"><span className="text-white/80">Reserved Instance refresh applied</span><span className="text-emerald-400 tabular-nums">−$2,140</span></div>
      </div>
    </div>
  );
}

function MockAllocation() {
  return (
    <div>
      <div className="text-[11px] text-white/55 uppercase tracking-wider mb-3">Chargeback · October</div>
      <table className="w-full text-xs">
        <thead className="text-white/55">
          <tr><th className="text-left font-normal pb-2">Business unit</th><th className="text-right font-normal pb-2">Direct</th><th className="text-right font-normal pb-2">Shared</th><th className="text-right font-normal pb-2">Total</th></tr>
        </thead>
        <tbody className="text-white/85">
          {[
            ["Consumer apps", "$42,180", "$8,440", "$50,620"],
            ["Data platform", "$28,920", "$11,210", "$40,130"],
            ["AI / ML", "$19,440", "$6,810", "$26,250"],
            ["Internal IT", "$7,120", "$3,090", "$10,210"],
          ].map((r) => (
            <tr key={r[0]} className="border-t border-white/10">
              <td className="py-2">{r[0]}</td>
              <td className="text-right tabular-nums py-2">{r[1]}</td>
              <td className="text-right tabular-nums py-2 text-white/55">{r[2]}</td>
              <td className="text-right tabular-nums py-2 font-medium">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-[11px] text-white/50">Allocation model: tag-based with shared-service split. Reconciled to NetSuite.</div>
    </div>
  );
}

function MockAnomalies() {
  return (
    <div className="space-y-2">
      {[
        { sev: "high", text: "Snowflake — warehouse SCALEUP_L burning $1,920/day", time: "12m ago", color: "#DC2626" },
        { sev: "med",  text: "EKS prod-east — pod requests 4.2× actual usage", time: "1h ago", color: "#D97706" },
        { sev: "high", text: "S3 egress spike to ap-southeast-1 (+$3,400)", time: "3h ago", color: "#DC2626" },
        { sev: "low",  text: "Azure SQL Elastic Pool underutilised (12%)", time: "6h ago", color: "#1664C0" },
      ].map((a) => (
        <div key={a.text} className="flex items-start gap-3 p-3 rounded border border-white/10 bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full mt-1.5" style={{ background: a.color }} />
          <div className="flex-1">
            <div className="text-white text-xs">{a.text}</div>
            <div className="text-white/45 text-[10px] mt-0.5">{a.time}</div>
          </div>
          <button className="text-cv-blue-light text-[11px] font-medium">Investigate</button>
        </div>
      ))}
    </div>
  );
}

function MockOptimize() {
  return (
    <div className="space-y-2">
      {[
        { name: "Savings Plan — Compute, 1yr no-upfront", est: "$40,000/mo", payback: "Immediate" },
        { name: "Azure Reserved Instances refresh", est: "$14,962/mo", payback: "2 months" },
        { name: "Consolidate App Service Plans", est: "$4,000/mo", payback: "4 weeks" },
        { name: "Right-size m5.4xlarge → m5.2xlarge ×24", est: "$2,310/mo", payback: "Immediate" },
      ].map((r) => (
        <div key={r.name} className="flex items-center justify-between p-3 rounded border border-white/10 bg-white/[0.02]">
          <div>
            <div className="text-white text-xs">{r.name}</div>
            <div className="text-white/45 text-[10px] mt-0.5">Payback · {r.payback}</div>
          </div>
          <div className="text-white tabular-nums text-sm font-medium">{r.est}</div>
        </div>
      ))}
    </div>
  );
}
