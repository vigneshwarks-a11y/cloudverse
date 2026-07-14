import type { ReactNode } from "react";

/* "Three steps to go live" — three feature cards, each with a rich illustration
   panel on top and a title + description below. Composition is modelled on the
   pasted Novu-style reference (app-UI card, node/branch diagrams, glow) but
   recoloured entirely to the CloudVerse palette. The illustration panel is
   theme-aware via the .cv-viz tokens (see app/globals.css): it reads as a light
   product screenshot in light mode and keeps the deep-navy look in dark mode.
   Neutral ink / lines / tracks come from --viz-* vars; the brand accents
   (teal #0E9E7A, violet #6954D4, amber, blue) read on both themes. */

const BLUE = "#2278E0";
const BLUE_LIGHT = "#7CB8F8";
const TEAL = "#0E9E7A";
const VIOLET = "#6954D4";
const AMBER = "#D9982E";

const INK = "var(--viz-ink)";
const INK_45 = "var(--viz-ink-45)";
const TRACK = "var(--viz-track)";
const ACCENT = "var(--viz-accent)";

function CMark({ size = 20 }: { size?: number }) {
  return (
    <img
      src="/cv-logo.png"
      alt="CloudVerse"
      className="w-auto object-contain"
      style={{ height: size }}
    />
  );
}

/* ── 1 · Connect providers — app settings card with toggles ─────────────── */

function ProviderRow({
  logo,
  invert,
  name,
  on,
}: {
  logo: string;
  invert?: boolean;
  name: string;
  on?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--viz-fill)]">
        <img src={logo} alt="" className={`h-3.5 w-3.5 object-contain${invert ? " dark:invert" : ""}`} />
      </span>
      <span className="text-[12px] font-medium text-[var(--viz-ink-70)]">{name}</span>
      <span
        className="ml-auto flex h-4 w-7 items-center rounded-full px-0.5 transition-colors"
        style={{ background: on ? BLUE : "var(--viz-track)", justifyContent: on ? "flex-end" : "flex-start" }}
      >
        <span className="h-3 w-3 rounded-full bg-white shadow-sm" />
      </span>
    </div>
  );
}

function ConnectViz() {
  return (
    <div className="absolute inset-0">
      {/* app window (bleeds off the bottom) */}
      <div className="absolute inset-x-7 top-9 overflow-hidden rounded-t-2xl border border-[var(--viz-line)] bg-[var(--viz-fill)]">
        {/* bright top edge */}
        <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${BLUE_LIGHT}b3, transparent)` }} />
        {/* header */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="flex items-center gap-2 text-[13px] font-semibold text-[var(--viz-ink)]">
            <CMark size={18} /> cloudverse
          </span>
          <div className="flex items-center gap-3 text-[var(--viz-ink-45)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
          </div>
        </div>
        {/* body */}
        <div className="px-4 pb-5">
          <div className="text-[13px] font-medium text-[var(--viz-ink)]">Provider connections</div>
          <div className="mt-3 rounded-xl border border-[var(--viz-line)] bg-[var(--viz-fill)] p-3.5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12.5px] font-medium text-[var(--viz-ink)]">Model providers</div>
                <div className="mt-0.5 text-[10.5px] text-[var(--viz-ink-45)]">OpenAI, Anthropic, Google, Mistral</div>
              </div>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[var(--viz-ink-45)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M6 15l6-6 6 6" /></svg>
            </div>
            <div className="mt-3.5 space-y-3">
              <ProviderRow logo="/icons/openai.svg" invert name="OpenAI" on />
              <ProviderRow logo="/icons/anthropic.svg" invert name="Anthropic" />
              <ProviderRow logo="/icons/gemini.svg" name="Google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2 · Define constraints — branch/graph diagram ──────────────────────── */

function Node({ cx, cy, color }: { cx: number; cy: number; color: string }) {
  return (
    <>
      <circle cx={cx} cy={cy} r="9" fill={color} opacity="0.28" />
      <circle cx={cx} cy={cy} r="5" fill={color} />
      <circle cx={cx} cy={cy} r="5" fill="none" stroke={INK} strokeOpacity="0.3" />
    </>
  );
}

function ConstraintsViz() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 340 250" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <pattern id="cs-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="var(--viz-dot)" />
          </pattern>
          <radialGradient id="cs-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={BLUE_LIGHT} stopOpacity="0.9" />
            <stop offset="100%" stopColor={BLUE_LIGHT} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="340" height="250" fill="url(#cs-dots)" />

        {/* channels */}
        <g fill="none" stroke={TRACK} strokeWidth="7" strokeLinecap="round">
          <path d="M28 125 H312" />
          <path d="M120 125 C150 125 150 78 180 78 H250 C280 78 280 125 300 125" />
          <path d="M120 125 C150 125 150 176 180 176 H210" />
        </g>

        {/* center glow streak */}
        <ellipse cx="205" cy="125" rx="46" ry="4" fill="url(#cs-glow)" />

        {/* nodes + labels */}
        <text x="28" y="112" fill={INK_45} fontSize="10" fontFamily="monospace" textAnchor="middle">request</text>
        <Node cx={28} cy={125} color={BLUE} />

        <text x="180" y="64" fill={INK_45} fontSize="10" fontFamily="monospace" textAnchor="middle">latency</text>
        <Node cx={180} cy={78} color={TEAL} />

        <text x="250" y="64" fill={INK_45} fontSize="10" fontFamily="monospace" textAnchor="middle">budget</text>
        <Node cx={250} cy={78} color={BLUE} />

        <text x="205" y="112" fill={INK} fontSize="10" fontFamily="monospace" textAnchor="middle">policy</text>
        <Node cx={205} cy={125} color={VIOLET} />

        <text x="210" y="199" fill={INK_45} fontSize="10" fontFamily="monospace" textAnchor="middle">region</text>
        <Node cx={210} cy={176} color={AMBER} />

        <text x="312" y="112" fill={INK_45} fontSize="10" fontFamily="monospace" textAnchor="middle">route</text>
        <Node cx={312} cy={125} color={BLUE} />
      </svg>
    </div>
  );
}

/* ── 3 · Route through CloudVerse — hub routing diagram ──────────────────── */

function RouteViz() {
  const pill = (y: number, label: string) => (
    <g>
      <rect x="16" y={y} width="92" height="30" rx="8" fill="rgba(34,120,224,0.10)" stroke={ACCENT} strokeOpacity="0.4" />
      <text x="62" y={y + 19} fill={ACCENT} fontSize="11" fontFamily="monospace" textAnchor="middle">{label}</text>
    </g>
  );
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 340 220" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="rt-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.85" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* connectors: pills -> hub */}
        <g fill="none" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 4">
          <path d="M108 55 H150 V104" />
          <path d="M108 110 H162" />
          <path d="M108 165 H150 V116" />
          {/* hub -> right panel */}
          <path d="M186 110 H250" />
        </g>
        {/* connector dots */}
        <g fill={ACCENT}>
          <circle cx="150" cy="55" r="2" /><circle cx="150" cy="165" r="2" /><circle cx="250" cy="110" r="2" />
        </g>

        {/* left source pills */}
        {pill(40, "Chat")}
        {pill(95, "Agents")}
        {pill(150, "RAG")}

        {/* hub */}
        <circle cx="168" cy="110" r="34" fill="url(#rt-glow)" />
        <circle cx="168" cy="110" r="18" fill="var(--viz-panel2)" stroke={ACCENT} strokeOpacity="0.6" />
        <image href="/cv-logo.png" x="156" y="102.5" width="24" height="15" preserveAspectRatio="xMidYMid meet" />

        {/* right endpoint tags */}
        <g>
          <rect x="240" y="66" width="86" height="26" rx="8" fill="rgba(34,120,224,0.9)" />
          <text x="283" y="83" fill="#fff" fontSize="10.5" fontFamily="monospace" textAnchor="middle">GPT-4o-mini</text>
        </g>
        <g>
          <rect x="236" y="132" width="86" height="26" rx="8" fill="rgba(105,84,212,0.9)" />
          <text x="279" y="149" fill="#fff" fontSize="10.5" fontFamily="monospace" textAnchor="middle">Claude-Haiku</text>
        </g>
        {/* cursor */}
        <path d="M250 150 l0 15 l4 -4 l3 6 l3 -1 l-3 -6 l6 0 z" fill={INK} stroke="var(--viz-panel)" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

type Step = { title: string; body: string; Viz: () => ReactNode };

const STEPS: Step[] = [
  {
    title: "Connect providers",
    body: "Add API keys and endpoints. Minutes per provider, no application change.",
    Viz: ConnectViz,
  },
  {
    title: "Define constraints",
    body: "Set latency, budget, compliance, and provider rules per workload.",
    Viz: ConstraintsViz,
  },
  {
    title: "Route through CloudVerse",
    body: "Point model calls at the CloudVerse endpoint. Routing is handled from there.",
    Viz: RouteViz,
  },
];

export default function IntegrationSteps() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {STEPS.map(({ title, body, Viz }, i) => (
        <div
          key={title}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface shadow-sm shadow-black/[0.04] dark:bg-[#0B0B0F]"
        >
          {/* illustration panel — theme-aware via .cv-viz tokens */}
          <div className="cv-viz relative h-60 overflow-hidden bg-[var(--viz-panel)]">
            {/* soft lens-flare glow, top-left */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-10 -top-16 h-52 w-64 rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(80,150,255,0.30), rgba(34,120,224,0.08) 55%, transparent 78%)", filter: "blur(26px)" }}
            />
            <Viz />
          </div>
          {/* copy */}
          <div className="p-6 lg:p-7">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#1664C0] dark:text-[#7CB8F8]">0{i + 1}</span>
              <h3 className="font-display text-lg font-semibold text-cv-ink">{title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-cv-muted">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
