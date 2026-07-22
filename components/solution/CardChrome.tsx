/* Shared card chrome for solution-page bento/feature grids — the
   image-topped-card idiom from the home/AixGovernance section: a bordered
   panel with a lit top-left edge + ambient glow on a dark surface, content
   fading at the bottom. Theme-aware via cv-* tokens. Reused across every
   Solutions page so the illustration language matches FinOps Teams. */

/* Shared accent palette for the data-mock visuals inside FeatureCard slots
   (tables, charts, meters, badges). Blue is the neutral accent; green =
   proof/reconciled/active; violet = a third category; amber = anomaly/
   expiring; red = restricted/negative; gray = shared/neutral. Kept
   identical across every vertical so the mocks read as one family. */
export const VIZ_BLUE = "#2278E0";
export const VIZ_OK = "#0E9E7A";
export const VIZ_VIOLET = "#6954D4";
export const VIZ_AMBER = "#D97706";
export const VIZ_RED = "#EF4444";
export const VIZ_GRAY = "#94969C";

export const EDGE_FADE = {
  WebkitMaskImage: "linear-gradient(to bottom,#000 82%,transparent 100%)",
  maskImage: "linear-gradient(to bottom,#000 82%,transparent 100%)",
} as const;

export function CardLightEdge() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 22%, rgba(255,255,255,0) 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,218,255,0.13), transparent 70%)", filter: "blur(26px)" }}
      />
    </>
  );
}

/* `chrome` renders a muted macOS-style window titlebar (traffic-light dots
   + a mono label) above the content — the cue that reads "captured
   screenshot of real software" instead of "a colored UI widget in a box". */
export function Panel({
  children,
  className = "",
  chrome,
}: {
  children: React.ReactNode;
  className?: string;
  chrome?: string;
}) {
  return (
    <div
      className="relative flex flex-1 flex-col overflow-hidden rounded-t-[14px] rounded-b-none border border-cv-line/70 bg-white shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/[0.08] dark:bg-black dark:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
      style={EDGE_FADE}
    >
      <CardLightEdge />
      {chrome && (
        <div className="relative flex shrink-0 items-center gap-1.5 border-b border-cv-line/50 px-3 py-2 dark:border-white/[0.07]">
          <span className="h-2 w-2 rounded-full bg-cv-ink/15 dark:bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-cv-ink/15 dark:bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-cv-ink/15 dark:bg-white/15" />
          <span className="ml-2 truncate font-mono text-[10px] text-cv-muted/70">{chrome}</span>
        </div>
      )}
      <div className={`relative flex flex-1 flex-col ${className}`}>{children}</div>
    </div>
  );
}

export function FeatureCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-cv-line/60 bg-cv-surface2 dark:border-white/10 dark:bg-[#111114]">
      <div className="relative flex h-64 shrink-0 items-center justify-center overflow-hidden bg-cv-surface2 p-6 dark:bg-[#0a0a0c]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(34,120,224,0.18), transparent 70%)" }}
        />
        <div className="relative flex h-full w-full flex-col justify-center">{children}</div>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-6 pb-6 md:px-6 md:pb-7">
        <h3 className="mb-2 text-base font-semibold text-cv-ink md:text-lg">{title}</h3>
        <p className="text-sm text-cv-muted md:text-base">{desc}</p>
      </div>
    </div>
  );
}

export function Pill({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span className="justify-self-start rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ color, background: `${color}1A` }}>
      {children}
    </span>
  );
}

export function Tab({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      className="rounded-md border px-2.5 py-1 text-[11px] font-medium"
      style={
        active
          ? { color: VIZ_BLUE, borderColor: `${VIZ_BLUE}80`, background: `${VIZ_BLUE}1a` }
          : { color: "hsl(var(--cv-muted))", borderColor: "hsl(var(--cv-line))" }
      }
    >
      {label}
    </span>
  );
}

export function ShieldCheck({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      <path d="M12 3l7 3v6c0 4-3 6.6-7 8-4-1.4-7-4-7-8V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* Real settings-UI primitives — pill toggle, radio dot, green check badge,
   a line-numbered code row, and a pointer-tipped tooltip callout — modeled
   directly on Laravel Cloud's dashboard chrome (soft shadow, thin neutral
   borders, true white/black surfaces). Theme-aware via cv-* tokens. */

export function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={`inline-flex h-[18px] w-8 shrink-0 items-center rounded-full p-[3px] transition-colors ${
        on ? "justify-end bg-cv-blue" : "justify-start bg-cv-ink/15 dark:bg-white/15"
      }`}
    >
      <span className="h-3 w-3 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
    </span>
  );
}

export function RadioDot({ active }: { active: boolean }) {
  return (
    <span
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
        active ? "border-cv-blue" : "border-cv-ink/20 dark:border-white/20"
      }`}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-cv-blue" />}
    </span>
  );
}

export function CheckBadge({ children, color = VIZ_OK }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color }}>
      <svg viewBox="0 0 16 16" width={13} height={13} fill="none">
        <circle cx="8" cy="8" r="7" fill={`${color}22`} stroke={color} strokeWidth="1" />
        <path d="M5 8.2l2 2 4-4.2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}

export function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 px-3 py-1 font-mono text-[11px] leading-relaxed">
      <span className="w-3 shrink-0 select-none text-right text-cv-muted/50">{n}</span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
    </div>
  );
}

/* Rounded card with a small pointer tip peeking off its top edge — the
   inline-tooltip idiom from Laravel Cloud's "overwriting injected variable"
   callout. */
export function Callout({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-lg border border-cv-line/70 bg-white px-3 py-2 text-[11px] shadow-[0_6px_16px_-6px_rgba(16,24,40,0.18)] dark:border-white/10 dark:bg-[#141414] ${className}`}
    >
      <span
        aria-hidden
        className="absolute -top-[5px] left-5 h-2.5 w-2.5 rotate-45 border-l border-t border-cv-line/70 bg-white dark:border-white/10 dark:bg-[#141414]"
      />
      {children}
    </div>
  );
}
