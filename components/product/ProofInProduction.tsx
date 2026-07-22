/* "Proof in production" — the real deployment story (a 100+ app cloud estate for
   a Southeast Asian telco) told as a 2×3 grid of floating cards. Each card pairs
   one distinct product-UI mockup with a bold title + 2-line description. cv-*
   tokens, theme-aware. Server component (kit pieces are pure presentational
   SVG/CSS — safe with no client hooks). */

import type { ReactNode } from "react";
import { CardLightEdge } from "@/components/product/BentoChrome";
import { AreaChart, Bars, Meter, StatusPill, C } from "@/components/product/finops/kit";
import { ShieldCheck, DangerTriangle, CheckCircle } from "@/lib/solar-icons";

/* Shared card chrome: floating surface, soft depth, no harsh border, subtle lift.
   Container stays a lifted surface (not pure black) so the black visual card
   inside it reads as a distinct framed panel. */
function Card({ children }: { children: ReactNode }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface p-5 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-cv-line motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/[0.07] dark:bg-white/[0.03] dark:hover:border-white/[0.16] lg:p-6">
      {children}
    </article>
  );
}

/* Fixed-height mockup stage — a framed black visual card carrying the top-left
   light edge; content is cropped and dissolved into the panel at the bottom. */
function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative mb-6 h-[188px] overflow-hidden rounded-xl border border-cv-line/60 bg-cv-surface2 p-3.5 dark:border-white/[0.08] dark:bg-black">
      <CardLightEdge />
      <div className="relative h-full">{children}</div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-cv-surface2 to-transparent dark:from-black"
      />
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold leading-snug text-cv-ink">{children}</h3>;
}

function Desc({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-[15px] leading-relaxed text-cv-ink/70">{children}</p>;
}

/* Small framed sub-panel used inside a few of the mockups. */
function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"rounded-xl border border-cv-line/60 bg-cv-surface2/70 dark:border-white/[0.06] dark:bg-white/[0.02] " + className}>
      {children}
    </div>
  );
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-cv-line/50 bg-cv-surface/60 px-3 py-2 dark:border-white/[0.06] dark:bg-white/[0.02]">
      {children}
    </div>
  );
}

/* ── 1 · Applications mapped → cost-allocation list ─────────────────────── */
const APPS: [string, string][] = [
  ["payments-api", "Platform"],
  ["billing-web", "Revenue"],
  ["ml-inference", "Data"],
];
function CardApplications() {
  return (
    <Card>
      <Stage>
        <div className="flex items-center justify-between px-0.5 pb-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wide text-cv-muted">Cost allocation</span>
          <span className="font-mono text-[11px] text-cv-ink/70">129 apps</span>
        </div>
        <div className="space-y-1.5">
          {APPS.map(([app, team]) => (
            <Row key={app}>
              <span className="flex items-center gap-2 font-mono text-[12px] text-cv-ink/80">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.blue }} />
                {app}
              </span>
              <span className="flex items-center gap-2">
                <span className="rounded-md px-1.5 py-0.5 font-mono text-[10px]" style={{ color: C.blue, background: `${C.blue}14` }}>{team}</span>
                <span className="text-[11px] font-medium" style={{ color: C.teal }}>Mapped</span>
              </span>
            </Row>
          ))}
        </div>
      </Stage>
      <Title>129 applications mapped</Title>
      <Desc>Every application in the estate tied to a team, an owner, and full cost economics.</Desc>
    </Card>
  );
}

/* ── 2 · Cloud spend under management → area chart ──────────────────────── */
function CardUnderManagement() {
  return (
    <Card>
      <Stage>
        <div className="flex items-baseline justify-between px-0.5">
          <span className="font-mono text-[10px] uppercase tracking-wide text-cv-muted">Cloud spend · managed</span>
          <StatusPill label="Live" color={C.teal} />
        </div>
        <div className="mt-1 px-0.5 font-mono text-2xl font-bold tracking-tight text-cv-ink">Rp8.77B</div>
        <div className="mt-3 h-[104px]">
          <AreaChart values={[38, 44, 41, 50, 54, 52, 61, 66, 70, 79]} color={C.blue} height={104} grid markLast />
        </div>
      </Stage>
      <Title>Rp8.77B under management</Title>
      <Desc>Direct cloud cost across a 100+ application estate, tracked live on one model.</Desc>
    </Card>
  );
}

/* ── 3 · Savings surfaced → prioritized recommendations w/ meters ───────── */
function CardSavings() {
  return (
    <Card>
      <Stage>
        <div className="flex items-baseline justify-between px-0.5">
          <span className="font-mono text-[10px] uppercase tracking-wide text-cv-muted">Savings identified</span>
        </div>
        <div className="mt-1 px-0.5 font-mono text-2xl font-bold tracking-tight" style={{ color: C.teal }}>Rp964.80M</div>
        <Panel className="mt-3 space-y-3 p-3">
          <Meter label="Rightsizing" pct={58} right="58%" color={C.teal} />
          <Meter label="Idle & orphaned" pct={27} right="27%" color={C.teal} />
          <Meter label="Commitment gaps" pct={15} right="15%" color={C.teal} />
        </Panel>
      </Stage>
      <Title>Rp964.80M in savings surfaced</Title>
      <Desc>Concrete optimization opportunities identified and ranked by dollar impact.</Desc>
    </Card>
  );
}

/* ── 4 · Anomalies → detection panel with severity + spike bars ─────────── */
function CardAnomalies() {
  return (
    <Card>
      <Stage>
        <div className="flex items-center justify-between px-0.5 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-wide text-cv-muted">Anomaly detection</span>
          <StatusPill label="46 high" color={C.red} />
        </div>
        <div className="h-[68px]">
          <Bars values={[24, 30, 20, 28, 34, 26, 92, 30, 22, 26, 32, 24]} color={C.blue} flag={6} height={68} />
        </div>
        <Row>
          <span className="flex items-center gap-2 text-[12px] text-cv-ink/80">
            <DangerTriangle weight="Bold" size={13} style={{ color: C.amber }} />
            Spend spike · us-east-1
          </span>
          <span className="font-mono text-[11px] font-semibold" style={{ color: C.red }}>+312%</span>
        </Row>
      </Stage>
      <Title>50 anomalies detected</Title>
      <Desc>Spend spikes caught as they happen, each traced to a driver and an owner.</Desc>
    </Card>
  );
}

/* ── 5 · Live regions → deployment status list ──────────────────────────── */
const REGIONS = ["ap-southeast-1", "ap-south-1", "us-east-1"];
function CardRegions() {
  return (
    <Card>
      <Stage>
        <div className="flex items-center justify-between px-0.5 pb-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wide text-cv-muted">Deployment status</span>
          <StatusPill label="Healthy" color={C.teal} />
        </div>
        <div className="space-y-1.5">
          {REGIONS.map((r) => (
            <Row key={r}>
              <span className="flex items-center gap-2 font-mono text-[12px] text-cv-ink/80">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.teal, boxShadow: `0 0 6px 1px ${C.teal}` }} />
                {r}
              </span>
              <span className="text-[11px] font-medium" style={{ color: C.teal }}>Live</span>
            </Row>
          ))}
        </div>
      </Stage>
      <Title>Live in production</Title>
      <Desc>Running across three cloud regions with continuous health monitoring.</Desc>
    </Card>
  );
}

/* ── 6 · Governance & compliance → badge grid + policy pill ─────────────── */
const BADGES = ["SOC 2", "ISO 27001", "GDPR"];
function CardGovernance() {
  return (
    <Card>
      <Stage>
        <div className="flex items-center justify-between px-0.5 pb-3">
          <span className="font-mono text-[10px] uppercase tracking-wide text-cv-muted">Governance</span>
          <StatusPill label="Policy enforced" color={C.teal} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {BADGES.map((b) => (
            <div
              key={b}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-cv-line/60 bg-cv-surface2/70 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              <ShieldCheck weight="Bold" size={18} style={{ color: C.teal }} />
              <span className="text-[11px] font-medium text-cv-ink/75">{b}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] font-medium text-cv-ink" style={{ background: `${C.teal}12` }}>
          <CheckCircle weight="Bold" size={14} style={{ color: C.teal }} />
          Every action scoped, logged, and audit-ready
        </div>
      </Stage>
      <Title>Governed and compliant</Title>
      <Desc>SOC 2, ISO 27001, and GDPR aligned, with policy enforced in the execution path.</Desc>
    </Card>
  );
}

export function ProofInProduction() {
  return (
    <section className="cv-section bg-cv-surface2 dark:bg-black" data-testid="section-proof-in-production">
      <div className="cv-container">
        <div className="max-w-3xl text-left">
          <p className="cv-label mb-4">Proof in production</p>
          <h2 className="cv-h2 text-balance text-cv-ink">Real numbers from a live cloud deployment.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty cv-body-lg text-cv-ink/70">
            A leading Southeast Asian telecommunications group, running full cloud spend management across a
            100+ application estate.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <CardApplications />
          <CardUnderManagement />
          <CardSavings />
          <CardAnomalies />
          <CardRegions />
          <CardGovernance />
        </div>

        <p className="mt-8 max-w-2xl text-left text-sm text-cv-muted">
          Figures from a production deployment, anonymized per client NDA.
        </p>
      </div>
    </section>
  );
}

export default ProofInProduction;
