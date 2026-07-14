/* Content visual for "Most FinOps tools show dashboards. This one changes what
   happens next." — a before → after product mock: a passive dashboard panel
   (spend went up, that's all it says) transformed into an actionable CloudVerse
   variance investigation (driver + owner, a ranked fix, approve). Home-page
   window chrome (near-black panel, lit top-right edge, soft ring/shadow);
   theme-aware via cv-* tokens. Static — safe in a server component. */

const BLUE = "#1664C0";
const OK = "#0E9E7A";
const AMBER = "#D97706";
const RED = "#E5484D";

function CornerEdge() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
      style={{
        padding: "1px",
        background:
          "linear-gradient(225deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.16) 20%, rgba(255,255,255,0) 46%)",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    />
  );
}

function Frame({ title, dot, meta, children }: { title: string; dot: string; meta: string; children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-cv-line bg-white shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/10 dark:bg-[#111114] dark:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.6)]">
      <CornerEdge />
      <div className="relative z-[2] flex items-center justify-between border-b border-cv-line px-4 py-2.5 dark:border-white/[0.07]">
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-cv-ink/60">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />
          {title}
        </span>
        <span className="text-[10px] text-cv-muted">{meta}</span>
      </div>
      <div className="relative z-[2] flex flex-1 flex-col p-5">{children}</div>
    </div>
  );
}

function Chip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px]">
      <span className="w-12 shrink-0 text-cv-muted">{label}</span>
      <span className="rounded-md px-2 py-0.5 font-mono text-[11px]" style={{ color, background: `${color}14` }}>
        {value}
      </span>
    </div>
  );
}

export function FinopsVarianceMock() {
  const bars = [38, 44, 40, 52, 49, 63, 96];
  return (
    <div className="mt-12 grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-3">
      {/* ── Panel A — the passive dashboard ── */}
      <Frame title="spend / overview" dot="#8A8F98" meta="Last 30d">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wide text-cv-muted">Total spend</div>
            <div className="mt-1 font-mono text-2xl font-semibold text-cv-ink">$128,400</div>
          </div>
          <span className="flex items-center gap-1 text-[13px] font-semibold" style={{ color: RED }}>
            ▲ 18%
          </span>
        </div>
        <div className="mt-5 flex flex-1 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{ height: `${h}%`, background: i === bars.length - 1 ? RED : "hsl(var(--cv-ink) / 0.14)" }}
            />
          ))}
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-cv-muted">
          Spend went up. It doesn&apos;t say which team, which change, or what to do.
        </p>
      </Frame>

      {/* ── connector ── */}
      <div className="flex items-center justify-center">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full border text-cv-ink dark:text-white"
          style={{ borderColor: `${BLUE}66`, background: `${BLUE}14` }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 rotate-90 md:rotate-0" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* ── Panel B — CloudVerse turns it into an action ── */}
      <Frame title="variance / investigation" dot={OK} meta="auto-attributed">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: AMBER }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />
            +$18,400 variance
          </span>
          <span className="text-[10px] text-cv-muted">vs. forecast</span>
        </div>

        <div className="mt-3.5 space-y-2">
          <Chip label="Driver" value="Snowflake full-table scans" color={BLUE} />
          <Chip label="Owner" value="team:data-eng" color={BLUE} />
        </div>

        {/* ranked fix */}
        <div className="mt-3.5 rounded-lg border border-cv-line p-3 dark:border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-cv-ink">Right-size warehouse</span>
            <span className="font-mono text-[12px] font-semibold" style={{ color: OK }}>−$4.2k/mo</span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-1 text-[10px] text-cv-muted">
              Impact
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: i < 3 ? OK : "hsl(var(--cv-ink) / 0.15)" }} />
              ))}
            </span>
            <span className="rounded-md px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: OK }}>
              Approve &amp; apply
            </span>
          </div>
        </div>

        <p className="mt-3 text-[12px] leading-relaxed text-cv-muted">
          Traced to a driver and an owner, ranked by impact, ready to apply. Reversible · audited.
        </p>
      </Frame>
    </div>
  );
}
