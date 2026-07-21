/* FinOps hero product scene — a cropped, layered composition of live-looking
   product UI that communicates FinOps at a glance: a spend-overview card at the
   centre, with a cost-anomaly alert, an AI savings recommendation, a budget-
   health panel and a policy-status chip floating around it. Desktop floats with
   subtle tilt + ambient glow; stacks cleanly on mobile. Server component. */

import { GlassCard, CardHead, StatusPill, Tag, AreaChart, Meter, MiniBtn, C } from "@/components/product/finops/kit";
import { Bell, ChartSquare, ShieldCheck } from "@/lib/solar-icons";

const PROVIDERS: [string, string][] = [
  ["AWS", "#FF9900"],
  ["Azure", "#0089D6"],
  ["GCP", "#4285F4"],
];

export function FinopsHeroScene() {
  return (
    <div className="cv-container pb-16 lg:pb-24">
      <div className="relative mx-auto max-w-5xl">
        {/* ambient blooms */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 -z-10 h-80 w-[680px] -translate-x-1/2 rounded-full" style={{ background: `radial-gradient(ellipse at center, ${C.blue}33, transparent 70%)`, filter: "blur(60px)" }} />
        <div aria-hidden className="pointer-events-none absolute -right-10 bottom-10 -z-10 h-64 w-64 rounded-full" style={{ background: `radial-gradient(circle, ${C.teal}26, transparent 70%)`, filter: "blur(60px)" }} />

        <div className="grid gap-4 lg:block lg:min-h-[560px]">
          {/* ── Spend overview (focal) ── */}
          <GlassCard
            glow="rgba(22,100,192,0.22)"
            className="lg:absolute lg:left-1/2 lg:top-8 lg:z-20 lg:w-[452px] lg:-translate-x-1/2"
          >
            <CardHead
              title="spend / overview"
              right={<span className="font-mono text-[10px] text-cv-muted">Last 30 days</span>}
            />
            <div className="p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-cv-muted">Total technology spend</div>
                  <div className="mt-1 font-mono text-3xl font-semibold tracking-tight text-cv-ink">$1.28M</div>
                </div>
                <StatusPill label="+12% MoM" color={C.red} />
              </div>
              <div className="mt-4 h-16">
                <AreaChart values={[40, 44, 41, 52, 48, 60, 55, 68, 64, 82, 78, 96]} color={C.blue} height={64} markLast />
              </div>
              <div className="mt-4 flex items-center gap-2">
                {PROVIDERS.map(([name, col]) => (
                  <span key={name} className="inline-flex items-center gap-1.5 rounded-lg border border-cv-line/60 bg-cv-surface/60 px-2 py-1 text-[11px] font-medium text-cv-ink/80 dark:border-white/[0.07] dark:bg-white/[0.03]">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: col }} />
                    {name}
                  </span>
                ))}
                <span className="ml-auto text-[10px] text-cv-muted">+ SaaS · AI</span>
              </div>
            </div>
          </GlassCard>

          {/* ── Cost anomaly alert (top-right) ── */}
          <GlassCard
            glow="rgba(217,119,6,0.20)"
            className="lg:absolute lg:right-0 lg:top-0 lg:z-30 lg:w-[288px] lg:rotate-[3deg]"
          >
            <div className="flex items-start gap-3 p-3.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: `${C.amber}1A`, color: C.amber }}>
                <Bell weight="Bold" size={16} />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-semibold text-cv-ink">Cost anomaly</span>
                  <StatusPill label="3.1×" color={C.amber} dot={false} />
                </div>
                <p className="mt-0.5 text-[11px] leading-snug text-cv-muted">
                  <span className="font-mono text-cv-ink/80">prod-emr</span> spiked <span className="font-mono" style={{ color: C.amber }}>+$4,812</span> · traced to <span className="text-cv-ink/80">team:data-eng</span>
                </p>
              </div>
            </div>
          </GlassCard>

          {/* ── AI recommendation (bottom-right) ── */}
          <GlassCard
            glow="rgba(14,158,122,0.18)"
            className="lg:absolute lg:right-2 lg:top-64 lg:z-30 lg:w-[300px] lg:rotate-[-2deg]"
          >
            <CardHead
              title="ai recommendation"
              dot={C.teal}
              right={<ChartSquare weight="Linear" size={13} className="text-cv-muted" />}
            />
            <div className="p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-cv-ink">Right-size warehouse</span>
                <span className="font-mono text-[13px] font-semibold" style={{ color: C.teal }}>−$4.2k/mo</span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5">
                <Tag color={C.blue}>Snowflake</Tag>
                <Tag color={C.blue}>data-eng</Tag>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-cv-muted">
                  impact
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i < 3 ? C.teal : "currentColor", opacity: i < 3 ? 1 : 0.25 }} />
                  ))}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <MiniBtn solid color={C.teal}>Approve &amp; apply</MiniBtn>
                <MiniBtn>Dismiss</MiniBtn>
              </div>
            </div>
          </GlassCard>

          {/* ── Budget health (bottom-left) ── */}
          <GlassCard className="lg:absolute lg:left-0 lg:top-56 lg:z-30 lg:w-[276px] lg:rotate-[-3deg]">
            <CardHead title="budget health" dot={C.purple} right={<span className="font-mono text-[10px] text-cv-muted">Q2</span>} />
            <div className="space-y-2.5 p-3.5">
              <Meter label="Research" pct={82} right="82%" color={C.amber} />
              <Meter label="Platform" pct={68} right="68%" color={C.blue} />
              <Meter label="Data Eng" pct={54} right="54%" color={C.blue} />
            </div>
          </GlassCard>

          {/* ── Policy status chip (top-left) ── */}
          <GlassCard className="lg:absolute lg:left-6 lg:top-10 lg:z-30 lg:w-auto lg:rotate-[2deg]">
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md" style={{ background: `${C.teal}1A`, color: C.teal }}>
                <ShieldCheck weight="Linear" size={13} />
              </span>
              <span className="text-[11px] font-medium text-cv-ink">Policy enforced</span>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.teal, boxShadow: `0 0 6px 1px ${C.teal}` }} />
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default FinopsHeroScene;
