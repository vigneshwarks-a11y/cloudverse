import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { CustomerLogos } from "@/components/CustomerLogos";
import { InvoiceEfficiency } from "@/components/home/InvoiceEfficiency";
import { DEMO_URL } from "@/lib/links";

const LOGOS = ["Berkshire Hathaway", "SISL", "Dr. Reddy's", "Axis Max Life", "Ginesys"];

const MODULES = [
  {
    name: "FinOps Platform",
    href: "/platform/finops",
    color: "#1664C0",
    tagline: "Unified visibility, allocation, and optimization across every cloud.",
    proof: "$738,983 annualised",
    cite: "Berkshire Hathaway HomeServices, 2026",
  },
  {
    name: "AIX",
    href: "/platform/aix",
    color: "#6954D4",
    tagline: "Cost-aware routing across GPUs, LLMs, and inference providers.",
    proof: "8+ GPU providers",
    cite: "Live cost-quality routing",
  },
  {
    name: "DevX",
    href: "/platform/devx",
    color: "#0E9E7A",
    tagline: "PR-level cost checks before regressions reach production.",
    proof: "+$2.9k/mo PR",
    cite: "Single pull request, 2026",
  },
  {
    name: "DataX",
    href: "/platform/datax",
    color: "#D97706",
    tagline: "Query and pipeline attribution for the modern warehouse.",
    proof: "$117.16 full scan",
    cite: "BigQuery, 2026",
  },
];

const STAGES = [
  {
    n: "01",
    title: "Inform",
    bullets: [
      "Connect cloud, AI, data, and engineering surfaces in under 30 minutes",
      "Unified cost, usage, and unit-economics views per team, product, model",
      "Anomalies and forecast variance surfaced with full attribution",
      "Read-only by default — no production access required",
    ],
  },
  {
    n: "02",
    title: "Optimize",
    bullets: [
      "Right-size, schedule, and route compute against live cost-quality signals",
      "Catch regressions at the PR level before they merge",
      "Commitment, savings plan, and reservation guidance with payback proof",
      "Module-specific actions for FinOps, AIX, DevX, and DataX",
    ],
  },
  {
    n: "03",
    title: "Operate",
    bullets: [
      "Policy-bound automation that holds the line as workloads evolve",
      "Chargeback, showback, and unit-economic reporting wired into the business",
      "Auditable decision logs across every cloud and provider",
      "Continuous governance — not a one-time clean-up",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Section 2 — Hero + Section 3 customer logos (continuous dark) */}
      <section className="cv-hero-bg pt-[120px] pb-20 lg:pt-[160px] lg:pb-28 relative">
        <div className="cv-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cv-blue/40 text-cv-blue-light text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cv-blue-light animate-pulse-dot" />
                Compute Economics Platform
              </div>
              <h1 className="cv-h1 mt-5 text-white">
                The Compute Economics Platform <br className="hidden md:block" />
                <span style={{ color: "#7CB8F8" }}>for the AI Era</span>
              </h1>
              <p className="cv-body-lg mt-6 text-white/75 max-w-2xl">
                CloudVerse<sup className="text-[10px]">™</sup> gives enterprises economic control over AI, cloud, and data infrastructure — governed in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-hero-demo">
                  Book a Demo <ArrowRight size={16} />
                </Link>
                <Link href="/platform/finops" className="cv-btn-ghost" data-testid="link-hero-explore">
                  Explore Platform
                </Link>
              </div>
            </div>

            {/* Outcomes card right */}
            <div className="lg:col-span-5">
              <div
                className="rounded-2xl border border-white/10 p-5 sm:p-6 backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.03)" }}
                data-testid="hero-outcomes"
              >
                <div className="cv-label mb-4">Customer outcomes</div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-5">
                  <OutcomeTile label="Baseline cost shift" value="−18%" />
                  <OutcomeTile label="Avoided compute demand" value="$101k/mo" />
                  <OutcomeTile label="Blended compute rate" value="−24%" />
                  <OutcomeTile label="Volatility control" value="±3%" />
                </div>
                <div className="mt-5 pt-5 border-t border-white/10">
                  <div className="cv-label mb-3">Across</div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-white/70">
                    {["AWS", "Azure", "GCP", "Snowflake", "Databricks", "OpenAI", "Bedrock", "CoreWeave"].map((p) => (
                      <span key={p} className="px-2 py-1 rounded border border-white/10 bg-white/[0.03]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 — Customer logos */}
          <div className="mt-20 pt-10 border-t border-white/8">
            <div className="cv-label text-white/50 mb-5 text-center">Trusted by leading enterprises</div>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-70">
              {LOGOS.map((l) => (
                <div key={l} className="text-white/75 text-sm tracking-wide font-medium" data-testid={`logo-${l.toLowerCase().replace(/[^a-z]+/g, "-")}`}>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="cv-section-break" />

      {/* Customer logos marquee */}
      <CustomerLogos />

      {/* Efficiency Snapshot — gated invoice upload */}
      <InvoiceEfficiency compact />

      {/* Section 4 — Platform architecture flow (Pattern 1) */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">Platform overview</div>
            <h2 className="cv-h2 text-cv-ink">One control plane. Four compute surfaces.</h2>
            <p className="cv-body-lg mt-4 text-cv-ink/70">
              CloudVerse connects your cloud infrastructure, AI workloads, data platforms, and engineering workflows into a single financial intelligence layer.
            </p>
          </div>
          <ArchitectureFlow />
        </div>
      </section>

      <div className="cv-section-break" />

      {/* Section 5 — Industry shift */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mb-12">
            <div className="cv-label mb-3">Why now</div>
            <h2 className="cv-h2 text-cv-ink">
              The tools that governed cloud spend were built for a different era.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="rounded-2xl border border-cv-line/10 p-7 bg-cv-ink/[0.02]">
              <div className="cv-label text-cv-ink/40 mb-3">The legacy approach</div>
              <ul className="space-y-3 text-cv-ink/60 text-[15px]">
                <li>Built from ITAM roots, with FinOps tacked on later</li>
                <li>Explains the bill weeks after it lands</li>
                <li>Heavy implementations and long time-to-value</li>
                <li>AI cost story bolted on as a separate category</li>
                <li>Data optimization living behind a different login</li>
              </ul>
            </div>
            <div className="rounded-2xl border p-7" style={{ borderColor: "rgba(22,100,192,0.35)", background: "rgba(22,100,192,0.08)" }}>
              <div className="cv-label mb-3">The CloudVerse approach</div>
              <ul className="space-y-3 text-cv-ink/90 text-[15px]">
                <li>Built for compute economics from the ground up</li>
                <li>Governs decisions before the bill exists</li>
                <li>First non-obvious findings within 30 minutes of connection</li>
                <li>AI / GPU economics native to the platform (AIX)</li>
                <li>FinOps, AIX, DevX, and DataX on one shared control plane</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="cv-section-break" />

      {/* Section 6 — Platform module cards */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">Modular architecture</div>
            <h2 className="cv-h2 text-cv-ink">Deploy what you need. Expand when ready.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {MODULES.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="group rounded-2xl border border-cv-line/10 bg-cv-ink/[0.02] p-6 hover:bg-cv-ink/[0.04] transition-colors flex flex-col"
                style={{ borderTop: `3px solid ${m.color}` }}
                data-testid={`card-module-${m.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="cv-label mb-4" style={{ color: m.color }}>{m.name}</div>
                <p className="text-cv-ink/80 text-sm leading-relaxed flex-1">{m.tagline}</p>
                <div className="mt-5 pt-5 border-t border-cv-line/10">
                  <div className="text-cv-ink text-xl font-display font-semibold">{m.proof}</div>
                  <div className="text-cv-ink/50 text-[11px] mt-1">{m.cite}</div>
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: m.color }}>
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="cv-section-break" />

      {/* Section 7 — Berkshire Hathaway case study */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mb-10">
            <div className="cv-label mb-3">Customer story</div>
            <h2 className="cv-h2 text-cv-ink">
              How Berkshire Hathaway HomeServices recovered $738,983
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-cv-line/10">
            <div className="p-7 sm:p-9 bg-cv-surface2">
              <div className="grid sm:grid-cols-3 gap-6">
                <Metric value="$101,736" label="Monthly identified" />
                <Metric value="$61,582" label="Monthly realised" />
                <Metric value="$738,984" label="Annualised savings" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-0 bg-cv-surface2">
              <div className="p-7 sm:p-9 md:border-r border-cv-line/10">
                <div className="cv-label text-cv-ink/50 mb-3">The problem</div>
                <p className="text-cv-ink/80 text-[15px] leading-relaxed">
                  A multi-cloud Azure and AWS estate growing 30%+ year over year, with no shared allocation model and limited visibility into the drivers behind monthly variance.
                </p>
              </div>
              <div className="p-7 sm:p-9">
                <div className="cv-label mb-3">The action</div>
                <p className="text-cv-ink/80 text-[15px] leading-relaxed">
                  CloudVerse connected both accounts in under a day, surfaced commitment gaps and stranded App Service capacity, and produced an actionable savings backlog within the first week.
                </p>
              </div>
            </div>
            <div className="p-7 sm:p-9 bg-cv-surface2 border-t border-cv-line/10">
              <div className="cv-label text-cv-ink/60 mb-4">Realised win bars</div>
              <WinBar label="Savings Plan commitment" amount="$40,000/mo" pct={100} />
              <WinBar label="Azure Reserved Instances" amount="$14,962/mo" pct={37} />
              <WinBar label="App Services consolidation" amount="$4,000/mo" pct={10} />
            </div>
            <div className="p-5 text-center text-cv-ink/60 text-sm border-t border-cv-line/10 bg-cv-surface2">
              All proof numbers cited from Berkshire Hathaway HomeServices, 2026.
            </div>
          </div>
        </div>
      </section>

      <div className="cv-section-break" />

      {/* Section 8 — Inform / Optimize / Operate */}
      <section className="cv-section bg-cv-surface2">
        <div className="cv-container">
          <div className="max-w-3xl mb-12">
            <div className="cv-label mb-3">Platform design</div>
            <h2 className="cv-h2 text-cv-ink">Three stages. One control plane.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border-t border-b border-cv-line/10">
            {STAGES.map((s, i) => (
              <div
                key={s.n}
                className={`p-6 sm:p-8 ${i < STAGES.length - 1 ? "md:border-r border-cv-line/10" : ""} ${
                  i > 0 ? "border-t md:border-t-0 border-cv-line/10" : ""
                }`}
              >
                <div className="cv-label text-cv-ink/40">{s.n}</div>
                <div className="font-display font-bold text-cv-ink text-2xl mt-2">{s.title}</div>
                <ul className="mt-5 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="text-cv-ink/65 text-[13px] leading-relaxed flex gap-2">
                      <span className="text-cv-blue mt-1.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cv-section-break" />

      {/* Section 9 — CTA band */}
      <section className="cv-section bg-cv-surface">
        <div className="cv-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="cv-h2 text-cv-ink">See what's driving your cloud bill.</h2>
            <p className="cv-body-lg mt-5 text-cv-ink/70">
              Connect your first account in under 30 minutes. Most teams have their first non-obvious finding the same day.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-cta-demo">
                Get a Demo <ArrowRight size={16} />
              </Link>
              <Link href="/contact" className="cv-btn-ghost">
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Organization JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CloudVerse",
            url: "https://cloudverse.ai",
            description: "Compute Economics Platform for the AI Era — cloud, AI, data, and engineering spend governed in one place.",
          }),
        }}
      />
    </>
  );
}

function OutcomeTile({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display font-bold text-cv-ink text-2xl tabular-nums">{value}</div>
      <div className="text-[11px] uppercase tracking-wider text-cv-ink/50 mt-1">{label}</div>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display font-bold text-cv-ink text-3xl sm:text-4xl tabular-nums">{value}</div>
      <div className="text-cv-ink/60 text-xs uppercase tracking-wider mt-2">{label}</div>
    </div>
  );
}

function WinBar({ label, amount, pct }: { label: string; amount: string; pct: number }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-cv-ink/80">{label}</span>
        <span className="text-cv-ink font-medium tabular-nums">{amount}</span>
      </div>
      <div className="h-2 rounded-full bg-cv-ink/8 overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#1664C0" }} />
      </div>
    </div>
  );
}
