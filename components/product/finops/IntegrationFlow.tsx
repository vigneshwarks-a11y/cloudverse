/* "Connects to the stack" flow — integration sources feed into the CloudVerse
   core, which emits a unified spend view. Three floating layers joined by
   animated connectors. Reuses brand marks under /icons. Server component. */

import { GlassCard, CardHead, StatusPill, AreaChart, C } from "@/components/product/finops/kit";

const SOURCES: { name: string; src: string; invert?: boolean }[] = [
  { name: "AWS", src: "/icons/aws.svg" },
  { name: "Azure", src: "/icons/azure.svg" },
  { name: "Google Cloud", src: "/icons/googlecloud.svg" },
  { name: "Snowflake", src: "/icons/snowflake.svg" },
  { name: "OpenAI", src: "/icons/openai.svg", invert: true },
  { name: "Datadog", src: "/icons/datadog.svg" },
];

function Connector() {
  return (
    <div className="relative hidden h-24 w-10 shrink-0 self-center lg:block xl:w-14">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cv-ink/25 to-transparent dark:via-white/25" />
      <span className="cv-wire-flow absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ background: C.blue, boxShadow: `0 0 8px 2px ${C.blue}88` }} />
    </div>
  );
}

export function IntegrationFlow() {
  return (
    <div className="relative mt-14">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `radial-gradient(circle, ${C.blue}26, transparent 70%)`, filter: "blur(55px)" }} />

      <div className="relative z-10 flex flex-col items-stretch gap-5 lg:flex-row lg:items-center lg:gap-0">
        {/* sources */}
        <div className="flex-1">
          <div className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: C.blue }}>Your stack</div>
          <GlassCard className="p-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
              {SOURCES.map((s) => (
                <div key={s.name} className="flex items-center gap-2 rounded-xl border border-cv-line/50 bg-cv-surface/60 px-2.5 py-2 dark:border-white/[0.06] dark:bg-white/[0.03]">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white">
                    <img src={s.src} alt={s.name} className="h-4 w-4 object-contain" loading="lazy" />
                  </span>
                  <span className="truncate text-[12px] font-medium text-cv-ink/80">{s.name}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <Connector />

        {/* CloudVerse core */}
        <div className="flex shrink-0 flex-col items-center lg:w-[168px]">
          <div className="relative">
            <div aria-hidden className="cv-glow-pulse pointer-events-none absolute -inset-5 -z-10 rounded-full" style={{ background: `radial-gradient(circle, ${C.blue}55, transparent 70%)`, filter: "blur(20px)" }} />
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-[#1664C0]/30 bg-white/80 text-center shadow-[0_20px_50px_-20px_rgba(22,100,192,0.6)] backdrop-blur-xl ring-1 ring-[#1664C0]/20 dark:bg-[#101014]/85">
              <img src="/cv-logo.png" alt="CloudVerse" className="h-7 w-7 object-contain" />
              <span className="mt-1.5 text-[11px] font-semibold text-cv-ink">CloudVerse</span>
              <span className="text-[9px] text-cv-muted">one data model</span>
            </div>
          </div>
          <StatusPill label="Read-only by default" color={C.teal} />
        </div>

        <Connector />

        {/* unified spend output */}
        <div className="flex-1">
          <div className="mb-3 px-1 text-right text-[10px] font-semibold uppercase tracking-[0.16em] lg:text-left" style={{ color: C.teal }}>Unified spend</div>
          <GlassCard glow="rgba(14,158,122,0.18)">
            <CardHead title="unified spend" dot={C.teal} right={<StatusPill label="reconciled" color={C.teal} />} />
            <div className="p-3.5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-cv-muted">All domains · 30d</div>
                  <div className="mt-0.5 font-mono text-2xl font-semibold tracking-tight text-cv-ink">$1.28M</div>
                </div>
                <StatusPill label="4 clouds · SaaS · AI" color={C.blue} dot={false} />
              </div>
              <div className="mt-3 h-12"><AreaChart values={[42, 48, 45, 58, 54, 66, 70, 82]} color={C.teal} height={48} markLast /></div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default IntegrationFlow;
