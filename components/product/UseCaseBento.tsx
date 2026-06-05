const BLUE = "#2E86FF";
const PURPLE = "#6954D4";
const RED = "#E5484D";

type UseCase = {
  n: string;
  title: string;
  sit: string;
  prob: string;
  how: string;
  after: string;
};

function Block({
  label,
  text,
  accent,
  highlight,
}: {
  label: string;
  text: string;
  accent?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <div className="cv-label mb-1.5" style={accent ? { color: accent } : undefined}>
        {label}
      </div>
      <p className={`text-sm leading-relaxed ${highlight ? "text-cv-ink/90" : "text-cv-ink/75"}`}>
        {text}
      </p>
    </div>
  );
}

function CardShell({
  n,
  title,
  glow,
  glowCorner,
  className,
  children,
}: {
  n: string;
  title: string;
  glow: string;
  glowCorner: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-8 ${className ?? ""}`}
    >
      {/* soft ambient glow */}
      <div
        aria-hidden
        className={`pointer-events-none absolute h-64 w-64 rounded-full blur-3xl ${glowCorner}`}
        style={{ background: `radial-gradient(circle, ${glow}33, transparent 70%)` }}
      />
      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-semibold"
            style={{ color: glow, background: `${glow}1a`, border: `1px solid ${glow}40` }}
          >
            {n}
          </span>
          <h3 className="cv-h3 text-cv-ink">{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Product UI mockups ---------- */

function MockHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
      <span className="text-[11px] font-medium text-cv-ink/70">{label}</span>
      <span className="flex items-center gap-1.5 text-[10px] text-cv-ink/40">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
        live
      </span>
    </div>
  );
}

/* 1. Cost analytics dashboard */
function CostDashboard() {
  const bars = [62, 48, 40, 33, 28, 22];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A0C11]">
      <MockHeader label="Cost analytics" accent={BLUE} />
      <div className="p-4">
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase tracking-wide text-cv-ink/40">Before</div>
            <div className="mt-1 font-display text-lg font-semibold" style={{ color: RED }}>
              $44,700
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase tracking-wide text-cv-ink/40">After</div>
            <div className="mt-1 font-display text-lg font-semibold" style={{ color: BLUE }}>
              $12,600
            </div>
          </div>
        </div>
        <div className="mb-3 flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{
                height: `${h}%`,
                background: `linear-gradient(to top, ${BLUE}, ${BLUE}66)`,
                boxShadow: `0 0 10px ${BLUE}33`,
              }}
            />
          ))}
        </div>
        <div className="flex h-2.5 overflow-hidden rounded-full">
          <div style={{ width: "30%", background: PURPLE }} />
          <div style={{ width: "70%", background: BLUE }} />
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-cv-ink/50">
          <span style={{ color: PURPLE }}>● 30% premium</span>
          <span style={{ color: BLUE }}>● 70% cost-optimised</span>
        </div>
      </div>
    </div>
  );
}

/* 2. Compliance policy engine + audit log */
function CompliancePolicy() {
  const regions = ["EU", "UK", "Singapore"];
  const logs = [
    ["req_e4f1", "Azure EU-West", "EU"],
    ["req_a93c", "Anthropic UK", "UK"],
    ["req_77bd", "AWS ap-southeast", "SG"],
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A0C11]">
      <MockHeader label="Policy engine" accent={PURPLE} />
      <div className="p-4">
        <div className="mb-4 space-y-1.5">
          {regions.map((r) => (
            <div
              key={r}
              className="flex items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-xs"
            >
              <span className="text-cv-ink/80">{r} residency</span>
              <span
                className="rounded px-1.5 py-0.5 text-[10px]"
                style={{ color: PURPLE, background: `${PURPLE}1a`, border: `1px solid ${PURPLE}40` }}
              >
                allowlist enforced
              </span>
            </div>
          ))}
        </div>
        <div className="text-[10px] uppercase tracking-wide text-cv-ink/40">Audit trace</div>
        <div className="mt-1.5 space-y-1 font-mono text-[10px]">
          {logs.map(([id, prov, reg]) => (
            <div key={id} className="flex items-center gap-2 text-cv-ink/55">
              <span style={{ color: PURPLE }}>✓</span>
              <span className="text-cv-ink/70">{id}</span>
              <span className="text-cv-ink/40">→</span>
              <span>{prov}</span>
              <span className="ml-auto rounded bg-white/5 px-1.5 py-0.5">{reg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 3. GPU cost / budget monitoring panel */
function GpuMonitor() {
  const meters: [string, number, string][] = [
    ["agent-ingest", 58, RED],
    ["agent-summ", 41, BLUE],
    ["agent-ops", 73, RED],
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A0C11]">
      <MockHeader label="GPU budget control" accent={RED} />
      <div className="p-4">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-cv-ink/40">Spend variance</div>
            <div className="mt-1 font-display text-sm font-semibold">
              <span style={{ color: RED }}>3×</span>
              <span className="mx-1.5 text-cv-ink/40">→</span>
              <span style={{ color: BLUE }}>&lt; 15%</span>
            </div>
          </div>
          <span
            className="rounded px-1.5 py-0.5 text-[10px]"
            style={{ color: BLUE, background: `${BLUE}1a`, border: `1px solid ${BLUE}40` }}
          >
            caps enforced
          </span>
        </div>
        <div className="space-y-2.5">
          {meters.map(([name, pct, color]) => (
            <div key={name}>
              <div className="mb-1 flex justify-between text-[10px] text-cv-ink/60">
                <span className="font-mono">{name}</span>
                <span className="tabular-nums">{pct}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}80` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 4. Multi-model routing diagram */
function RoutingDiagram() {
  const routes: [string, string][] = [
    ["Search", "GPT-4o-mini"],
    ["Summarise", "Claude Haiku"],
    ["Chat", "Llama-3-70B"],
    ["Rerank", "Mistral-S"],
    ["Vision", "Gemini Flash"],
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A0C11]">
      <MockHeader label="Multi-model routing" accent={BLUE} />
      <div className="p-4">
        <div className="space-y-2">
          {routes.map(([feature, model]) => (
            <div key={feature} className="flex items-center gap-2 text-[11px]">
              <span className="w-20 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 text-cv-ink/75">
                {feature}
              </span>
              <span className="flex-1 border-t border-dashed border-white/15" />
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: BLUE, boxShadow: `0 0 8px ${BLUE}` }}
              />
              <span className="flex-1 border-t border-dashed border-white/15" />
              <span
                className="w-28 rounded-md px-2 py-1.5 text-right font-mono"
                style={{ color: BLUE, background: `${BLUE}12`, border: `1px solid ${BLUE}33` }}
              >
                {model}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center text-[10px] text-cv-ink/40">
          routing updated at the constraint layer — no deploy
        </div>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */

export default function UseCaseBento({ useCases }: { useCases: UseCase[] }) {
  const [c1, c2, c3, c4] = useCases;

  const blocks = (uc: UseCase) => (
    <>
      <Block label="Situation" text={uc.sit} />
      <Block label="The problem" text={uc.prob} accent={RED} />
      <Block label="How AIX solves it" text={uc.how} accent={BLUE} />
      <Block label="After AIX" text={uc.after} accent="#A99CE8" highlight />
    </>
  );

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Card 1 — large feature */}
      <CardShell
        n={c1.n}
        title={c1.title}
        glow={BLUE}
        glowCorner="-top-16 -left-16"
        className="lg:col-span-6"
      >
        <div className="grid gap-7 md:grid-cols-2 md:items-center">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1">{blocks(c1)}</div>
          <CostDashboard />
        </div>
      </CardShell>

      {/* Card 2 — large feature (mirrored) */}
      <CardShell
        n={c2.n}
        title={c2.title}
        glow={PURPLE}
        glowCorner="-top-16 -right-16"
        className="lg:col-span-6"
      >
        <div className="grid gap-7 md:grid-cols-2 md:items-center">
          <div className="md:order-2 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1">
            {blocks(c2)}
          </div>
          <div className="md:order-1">
            <CompliancePolicy />
          </div>
        </div>
      </CardShell>

      {/* Card 3 — narrower */}
      <CardShell
        n={c3.n}
        title={c3.title}
        glow={RED}
        glowCorner="-bottom-16 -left-16"
        className="lg:col-span-5"
      >
        <GpuMonitor />
        <div className="mt-6 grid gap-5">{blocks(c3)}</div>
      </CardShell>

      {/* Card 4 — wider */}
      <CardShell
        n={c4.n}
        title={c4.title}
        glow={BLUE}
        glowCorner="-bottom-16 -right-16"
        className="lg:col-span-7"
      >
        <div className="grid gap-7 md:grid-cols-2 md:items-center">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1">{blocks(c4)}</div>
          <RoutingDiagram />
        </div>
      </CardShell>
    </div>
  );
}
