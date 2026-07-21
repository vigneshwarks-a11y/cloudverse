/* "Domain depth" — the five domain capabilities as frosted glass cards in a
   2-up (Cloud · AI) / 3-up (Data · SaaS · Shared) grid. Each card reads top to
   bottom: a live product-UI mockup, an icon-badge eyebrow, a bold title, and a
   short muted description. Mockups are the in-repo instrument panels
   (DomainWidgets); the card carries a soft module-tinted glass wash and a lit
   top edge, with content dissolving into the surface at the bottom rather than
   a hard cut. cv-* tokens, theme-aware. Server component (widgets are client). */

import type { ReactNode } from "react";
import { CloudWidget, AIWidget, DataWidget, SaasWidget } from "@/components/product/finops/DomainWidgets";

/* module hue + AA-tuned text token per domain */
type Tone = { hue: string; text: string };
const TONE = {
  cloud: { hue: "#2278E0", text: "cv-blue-text" },
  ai: { hue: "#6954D4", text: "cv-purple-text" },
  data: { hue: "#D97706", text: "cv-amber-text" },
  saas: { hue: "#0E9E7A", text: "cv-teal-text" },
  shared: { hue: "#8891A5", text: "text-cv-ink/70" },
} satisfies Record<string, Tone>;

/* ultra-light domain glyphs (1.6 stroke, currentColor) */
const ICON = {
  cloud: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 18a4 4 0 0 1-.5-7.97 5.5 5.5 0 0 1 10.6-1.06A3.75 3.75 0 0 1 17 18Z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="7.5" y="7.5" width="9" height="9" rx="2.2" />
      <path d="M10.5 3.5v2M13.5 3.5v2M10.5 18.5v2M13.5 18.5v2M3.5 10.5h2M3.5 13.5h2M18.5 10.5h2M18.5 13.5h2" />
    </svg>
  ),
  data: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <ellipse cx="12" cy="6" rx="6.5" ry="2.4" />
      <path d="M5.5 6v6c0 1.33 2.9 2.4 6.5 2.4s6.5-1.07 6.5-2.4V6" />
      <path d="M5.5 12v6c0 1.33 2.9 2.4 6.5 2.4s6.5-1.07 6.5-2.4v-6" />
    </svg>
  ),
  saas: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4.5" y="4.5" width="6.2" height="6.2" rx="1.4" />
      <rect x="13.3" y="4.5" width="6.2" height="6.2" rx="1.4" />
      <rect x="4.5" y="13.3" width="6.2" height="6.2" rx="1.4" />
      <rect x="13.3" y="13.3" width="6.2" height="6.2" rx="1.4" />
    </svg>
  ),
  shared: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 4 7l8 4 8-4-8-4Z" />
      <path d="M4 12l8 4 8-4M4 17l8 4 8-4" />
    </svg>
  ),
};

/* One frosted card: lit top edge, soft corner wash, mockup that dissolves into
   the surface, then eyebrow → title → description. */
function GlassCard({
  tone,
  icon,
  eyebrow,
  tag,
  title,
  children,
  mockup,
  wide,
}: {
  tone: Tone;
  icon: ReactNode;
  eyebrow: string;
  tag?: string;
  title: string;
  children: ReactNode;
  mockup: ReactNode;
  wide?: boolean;
}) {
  return (
    <article className="cv-visual-well relative flex h-full flex-col overflow-hidden rounded-[22px] border border-cv-line/50 bg-cv-surface2 p-6 shadow-[0_20px_50px_-30px_rgba(16,24,40,0.28)] dark:border-white/[0.07] dark:bg-black dark:shadow-[0_38px_84px_-34px_rgba(0,0,0,0.82)] lg:p-7">
      {/* mockup — static (non-interactive). Wide cards flex-fill; narrow cards
          use a fixed height so all three visuals match regardless of copy. */}
      <div
        className={
          "pointer-events-none relative mb-6 flex flex-col overflow-hidden select-none " +
          (wide ? "min-h-0 flex-1" : "h-[240px]")
        }
      >
        {mockup}
      </div>

      {/* eyebrow: icon badge + short label */}
      <div className={"flex items-center gap-2.5 " + tone.text}>
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
          style={{ background: `${tone.hue}1f`, boxShadow: `inset 0 0 0 1px ${tone.hue}33` }}
        >
          {icon}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">{eyebrow}</span>
        {tag && (
          <span className="ml-1 rounded-full border border-cv-line/70 px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-wide text-cv-ink/55 dark:border-white/15">
            {tag}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-[19px] font-semibold leading-snug tracking-[-0.01em] text-cv-ink">{title}</h3>
      <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-cv-ink/70">{children}</p>
    </article>
  );
}

/* Shared card mockup — the "one model" instrument: four domain chips over two
   audit rows, framed like the other panels. */
const SHARED_CHIPS: [string, string][] = [
  ["Cloud", TONE.cloud.hue],
  ["AI", TONE.ai.hue],
  ["Data", TONE.data.hue],
  ["SaaS", TONE.saas.hue],
];
function SharedMockup() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-cv-line/70 bg-cv-surface/70 shadow-[0_10px_30px_-20px_rgba(16,24,40,0.35)] dark:border-white/[0.08] dark:bg-white/[0.035]">
      <div className="flex items-center justify-between border-b border-cv-line/60 px-3.5 py-2.5 dark:border-white/[0.06]">
        <span className="font-mono text-[10px] uppercase tracking-wide text-cv-ink/70">one data model</span>
        <span className="font-mono text-[10px] text-cv-ink/50">4 domains</span>
      </div>
      <div className="flex flex-1 flex-col justify-center p-3.5">
        <div className="flex flex-wrap gap-1.5">
          {SHARED_CHIPS.map(([name, hue]) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 rounded-full border border-cv-line/70 px-2.5 py-1 text-[12px] font-medium text-cv-ink/80 dark:border-white/10"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: hue }} />
              {name}
            </span>
          ))}
        </div>
        <div className="mt-3.5 space-y-1.5 border-t border-cv-line/50 pt-3.5 dark:border-white/[0.06]">
          {[
            ["Tag coverage", "98.6%"],
            ["Chargeback", "Reconciled"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-cv-ink/65">{k}</span>
              <span className="font-semibold" style={{ color: TONE.saas.hue }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DomainDepth() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-domain-depth">
      <div className="cv-container">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="cv-h2 mx-auto max-w-3xl text-cv-ink">What each domain gets, in depth.</h2>
          <p className="mt-5 cv-body-lg text-cv-ink/70">
            The same model runs across every domain, with capabilities tuned to how each one actually
            spends.
          </p>
        </div>

        {/* Row 1 — two wide cards */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <GlassCard
            tone={TONE.cloud}
            icon={ICON.cloud}
            eyebrow="Cloud"
            title="Architecture-level cost intelligence"
            mockup={<CloudWidget />}
            wide
          >
            Cost, performance, and Well-Architected posture at the application level, with ML anomaly
            detection and Kubernetes attribution by namespace, workload, and environment.
          </GlassCard>

          <GlassCard
            tone={TONE.ai}
            icon={ICON.ai}
            eyebrow="AI"
            title="Every model and provider on the books"
            mockup={<AIWidget />}
            wide
          >
            Spend by model, provider, and workload reconciled to the actual bill, with budgets and
            chargeback attributed to team and product the same way cloud spend is.
          </GlassCard>
        </div>

        {/* Row 2 — three narrower cards */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <GlassCard
            tone={TONE.data}
            icon={ICON.data}
            eyebrow="Data"
            title="Behavioral cost intelligence"
            mockup={<DataWidget />}
          >
            Repeat queries grouped into cost-amplifying patterns, with spikes predicted across pipelines
            before they hit the bill.
          </GlassCard>

          <GlassCard
            tone={TONE.saas}
            icon={ICON.saas}
            eyebrow="SaaS"
            tag="Coming soon"
            title="Usage and ownership mapping"
            mockup={<SaasWidget />}
          >
            Which teams use which tools, and at what utilization, across every business unit.
          </GlassCard>

          <GlassCard
            tone={TONE.shared}
            icon={ICON.shared}
            eyebrow="Shared"
            title="One model across all four"
            mockup={<SharedMockup />}
          >
            Automated tagging, normalization, and audit-ready chargeback, consistent across every domain.
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

export default DomainDepth;
