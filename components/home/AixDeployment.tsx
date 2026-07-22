/* "In the call path. Deployed in your environment." — a premium, floating
   product-style composition of the Agentry call path: AI surfaces → CloudVerse Agentry
   (focal, glowing, layered) → model providers, joined by animated connector
   lines. The Agentry core shows live-looking product widgets (policy routing +
   failover, budget reservation, request settlement, audit ledger) rather than a
   static list. Glassmorphism via translucent cards + backdrop blur over ambient
   gradient blobs. cv-* tokens, theme-aware, reduced-motion friendly.
   Server component (CSS-only motion). */

import {
  Server,
  LockKeyhole,
  DocumentText,
  UsersGroupRounded,
  Routing,
  Wallet,
  ShieldCheck,
  Shield,
  Bolt,
  Cpu,
  Code2,
  Database,
  ChatRound,
  Cloud,
  CheckCircle,
  Widget,
} from "@/lib/solar-icons";
import type { IconWeight } from "@solar-icons/react";
import { CardLightEdge } from "@/components/home/cardChrome";

type IconType = React.ComponentType<{ weight?: IconWeight; size?: number; className?: string }>;

const BLUE = "#1664C0";
const PURPLE = "#6954D4";
const GREEN = "#0E9E7A";

const SURFACES: { label: string; Icon: IconType }[] = [
  { label: "Agents", Icon: Cpu },
  { label: "Apps", Icon: Widget },
  { label: "IDEs", Icon: Code2 },
  { label: "RAG pipelines", Icon: Database },
  { label: "Copilots", Icon: ChatRound },
];

const PROVIDERS: { label: string; meta: string; Icon: IconType }[] = [
  { label: "Commercial APIs", meta: "OpenAI · Anthropic", Icon: Cloud },
  { label: "Cloud-hosted", meta: "Bedrock · Vertex", Icon: Server },
  { label: "Sovereign / local", meta: "In-region · air-gapped", Icon: LockKeyhole },
];

type Guarantee = {
  title: string;
  body: string;
  Icon: React.ComponentType<{ weight?: IconWeight; size?: number }>;
};

const GUARANTEES: Guarantee[] = [
  {
    Icon: Server,
    title: "Runs in your environment",
    body: "Your government or commercial cloud tenancy, or on-premises. The data plane stays inside your boundary.",
  },
  {
    Icon: DocumentText,
    title: "Prompt capture is a policy, per workload",
    body: "Full capture, redacted, or metadata-only. Your choice, per scope.",
  },
  {
    Icon: UsersGroupRounded,
    title: "Six-role RBAC across every surface",
    body: "Reading a prompt is itself a governed, permissioned action.",
  },
  {
    Icon: LockKeyhole,
    title: "Hash-verified records",
    body: "Every prompt view logged. “Who read this” and “what did it cost” are both queryable.",
  },
];

/* ---- reusable pieces ------------------------------------------------ */

// Uppercase stage caption above each floating card.
function StageLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="mb-3 px-1 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color }}>
      {children}
    </div>
  );
}

// Product-mock well: solid surface + single hairline border + soft neutral
// shadow, matching the "Day one" (AixGovernance) instrument treatment. No
// glassmorphism — depth comes from the border and the ambient stage glow.
function PanelCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border border-cv-line bg-white shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/10 dark:bg-black dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] " +
        className
      }
    >
      <CardLightEdge />
      {children}
    </div>
  );
}

// A single surface / provider row inside its glass card.
function NodeRow({
  Icon,
  label,
  meta,
  accent,
}: {
  Icon: IconType;
  label: string;
  meta?: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-cv-line/50 bg-cv-surface/60 px-3 py-2.5 dark:border-white/[0.06] dark:bg-white/[0.03]">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
        style={{ background: `${accent}1A`, color: accent }}
      >
        <Icon weight="Linear" size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13px] font-medium leading-tight text-cv-ink">{label}</span>
        {meta && <span className="block truncate text-[10px] leading-tight text-cv-muted">{meta}</span>}
      </span>
      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} />
    </div>
  );
}

// Horizontal animated connector (desktop) — gradient hairline + travelling dot.
function Connector() {
  return (
    <div className="relative hidden h-16 w-8 shrink-0 self-center lg:block xl:w-12">
      <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cv-ink/25 to-transparent dark:via-white/25" />
      <span
        className="cv-wire-flow absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
        style={{ background: PURPLE, boxShadow: `0 0 8px 2px ${PURPLE}88` }}
      />
    </div>
  );
}

// Small widget frame used inside the Agentry core.
function Tile({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={
        "rounded-xl border border-cv-line/50 bg-cv-surface/70 p-3 dark:border-white/[0.06] dark:bg-white/[0.035] " +
        className
      }
    >
      {children}
    </div>
  );
}

function WidgetHead({ Icon, label }: { Icon: IconType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cv-muted">
      <Icon weight="Linear" size={12} />
      {label}
    </div>
  );
}

/* ---- Agentry focal core ------------------------------------------------- */

function AixCore() {
  return (
    <div className="relative w-full">
      {/* breathing glow */}
      <div
        aria-hidden
        className="cv-glow-pulse pointer-events-none absolute -inset-6 -z-10 rounded-[34px]"
        style={{ background: `radial-gradient(circle at 50% 42%, ${PURPLE}44, transparent 70%)`, filter: "blur(26px)" }}
      />
      {/* layered depth: faint card stacked behind */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-3 -bottom-3 top-3 -z-10 rounded-2xl border border-[#6954D4]/20 bg-[#6954D4]/[0.04]"
      />

      <PanelCard className="p-4 sm:p-5">
        {/* top-edge sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[#B7A9F5]/70 to-transparent"
        />

        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: PURPLE }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: PURPLE, boxShadow: `0 0 8px 2px ${PURPLE}88` }} />
            </span>
            <span className="text-[14px] font-semibold text-cv-ink">CloudVerse Agentry</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[#6954D4]/30 bg-[#6954D4]/[0.08] px-2 py-0.5 text-[10px] font-medium text-[#6954D4] dark:text-[#B7A9F5]">
            <Shield weight="Linear" size={11} /> Inside your boundary
          </span>
        </div>

        {/* Routing + failover */}
        <Tile>
          <div className="flex items-center justify-between">
            <WidgetHead Icon={Routing} label="Policy route" />
            <span className="inline-flex items-center gap-1 rounded-full bg-[#0E9E7A]/12 px-2 py-0.5 text-[10px] font-semibold text-[#0E9E7A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E9E7A]" /> Failover ready
            </span>
          </div>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1664C0]/30 bg-[#1664C0]/[0.08] px-2.5 py-1 text-[12px] font-medium text-cv-ink">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: BLUE }} /> gpt-4o
            </span>
            <span className="text-cv-muted">→</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-cv-line/60 bg-cv-ink/[0.03] px-2.5 py-1 text-[12px] text-cv-muted dark:border-white/10 dark:bg-white/[0.04]">
              claude-3 <span className="text-[10px]">standby</span>
            </span>
          </div>
        </Tile>

        {/* Budget reservation + request settlement */}
        <div className="mt-2.5 grid grid-cols-2 gap-2.5">
          <Tile>
            <WidgetHead Icon={Wallet} label="Budget reserved" />
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-mono text-[17px] font-semibold text-cv-ink">$0.42</span>
              <span className="text-[10px] text-cv-muted">/ call</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cv-ink/[0.08] dark:bg-white/[0.08]">
              <div className="h-full rounded-full" style={{ width: "62%", background: `linear-gradient(90deg, ${PURPLE}, ${PURPLE}CC)` }} />
            </div>
          </Tile>

          <Tile>
            <WidgetHead Icon={Bolt} label="Request" />
            <div className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-cv-ink">
              <CheckCircle weight="Bold" size={16} className="text-[#0E9E7A]" />
              Settled
            </div>
            <div className="mt-1.5 font-mono text-[11px] text-cv-muted">42ms · reserved → settled</div>
          </Tile>
        </div>

        {/* Audit ledger */}
        <Tile className="mt-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[12px] font-medium text-cv-ink">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#6954D4]/12 text-[#6954D4] dark:text-[#B7A9F5]">
                <ShieldCheck weight="Linear" size={14} />
              </span>
              Logged to ledger
            </span>
            <span className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-cv-muted">0x9f3a…c1</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E9E7A]" />
            </span>
          </div>
        </Tile>
      </PanelCard>
    </div>
  );
}

export function AixDeployment() {
  return (
    <section className="cv-section bg-cv-surface2 dark:bg-black" data-testid="section-architecture">
      <div className="cv-container">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#6954D4]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#6954D4] dark:text-[#B7A9F5]">
            Architecture
          </span>
          <h2 className="cv-h2 text-balance text-cv-ink">In the call path. Deployed in your environment.</h2>
          <p className="cv-body mt-4 text-cv-ink/70">
            Agentry sits between your AI surfaces (agents, apps, IDEs, RAG pipelines, copilots)
            and your model providers, whether commercial APIs, cloud-hosted, or sovereign/local models.
          </p>
        </div>

        {/* Floating call-path composition */}
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface2 p-6 sm:p-10 dark:border-white/10 dark:bg-[#0D0D0D]">
          {/* ambient gradient blobs behind the glass */}
          <div aria-hidden className="pointer-events-none absolute -left-16 top-1/4 h-64 w-64 rounded-full" style={{ background: `radial-gradient(circle, ${BLUE}22, transparent 70%)`, filter: "blur(50px)" }} />
          <div aria-hidden className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rounded-full" style={{ background: `radial-gradient(circle, ${GREEN}22, transparent 70%)`, filter: "blur(50px)" }} />
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full" style={{ background: `radial-gradient(circle, ${PURPLE}22, transparent 70%)`, filter: "blur(60px)" }} />
          {/* faint dot grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.5] dark:opacity-100"
            style={{
              backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              color: "rgba(120,120,140,0.10)",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 100%)",
            }}
          />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0">
            {/* AI surfaces */}
            <div className="flex flex-1 flex-col">
              <StageLabel color={BLUE}>Your AI surfaces</StageLabel>
              <div className="flex flex-1 items-center">
                <PanelCard className="w-full space-y-2 p-3">
                  {SURFACES.map((s) => (
                    <NodeRow key={s.label} Icon={s.Icon} label={s.label} accent={BLUE} />
                  ))}
                </PanelCard>
              </div>
            </div>

            <Connector />

            {/* Agentry focal core */}
            <div className="flex flex-[1.55] flex-col">
              <StageLabel color={PURPLE}>CloudVerse Agentry</StageLabel>
              <div className="flex flex-1 items-center">
                <AixCore />
              </div>
            </div>

            <Connector />

            {/* Model providers */}
            <div className="flex flex-1 flex-col">
              <StageLabel color={GREEN}>Model providers</StageLabel>
              <div className="flex flex-1 items-center">
                <PanelCard className="w-full space-y-2 p-3">
                  {PROVIDERS.map((p) => (
                    <NodeRow key={p.label} Icon={p.Icon} label={p.label} meta={p.meta} accent={GREEN} />
                  ))}
                </PanelCard>
              </div>
            </div>
          </div>
        </div>

        {/* Deployment guarantees */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {GUARANTEES.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-cv-line/60 bg-cv-surface p-5 dark:border-white/10 dark:bg-[#0D0D0D]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1664C0]/12 text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
                <g.Icon weight="Linear" size={20} />
              </span>
              <h3 className="mt-4 text-base font-semibold text-cv-ink">{g.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cv-ink/65">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AixDeployment;
