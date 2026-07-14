/* Shared bento chrome — the AIX GovernanceBento visual language, factored out so
   every platform page's "what you get" grid reads in the same design:
   an image-topped FeatureCard whose top slot holds a polished Panel mock
   (white/black surface, top-left light edge, ambient corner glow, soft bottom
   fade + drop shadow) with title + description in the footer below.
   cv-* tokens, theme-aware. Presentational only (no hooks). */

import type { ReactNode } from "react";

export const BLUE = "#2278E0";

// Semantic status palette surfaced as small rounded pills.
export type Kind = "ok" | "blocked" | "flag" | "info";
export const KIND_COLOR: Record<Kind, string> = {
  ok: "#0E9E7A",
  blocked: "#EF4444",
  flag: "#D97706",
  info: BLUE,
};

export function StatusPill({ kind, label }: { kind: Kind; label: string }) {
  const c = KIND_COLOR[kind];
  return (
    <span
      className="justify-self-start rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{ color: c, background: `${c}1A` }}
    >
      {label}
    </span>
  );
}

// Neutral tag for modes/scopes that aren't pass/fail states.
export function ScopeTag({ children }: { children: ReactNode }) {
  return (
    <span className="shrink-0 rounded-full border border-cv-line px-2.5 py-1 text-[11px] font-medium text-cv-ink/80 dark:border-white/15">
      {children}
    </span>
  );
}

// Soft bottom fade so mock panels dissolve into the screenshot slot.
const EDGE_FADE = {
  WebkitMaskImage: "linear-gradient(to bottom,#000 88%,transparent 100%)",
  maskImage: "linear-gradient(to bottom,#000 88%,transparent 100%)",
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

// Polished product-screenshot panel used inside a FeatureCard's top slot.
export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className="relative flex flex-1 flex-col overflow-hidden rounded-[14px] border border-cv-line bg-white shadow-[0_10px_28px_-14px_rgba(16,24,40,0.10)] dark:border-white/10 dark:bg-black dark:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)]"
      style={EDGE_FADE}
    >
      <CardLightEdge />
      <div className={`relative flex flex-1 flex-col justify-center ${className}`}>{children}</div>
    </div>
  );
}

// Image-topped card: illustration fills a top "screenshot" slot; title + desc
// sit in a padded footer below. Same card shape repeats for every feature.
export function FeatureCard({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-cv-line/60 bg-cv-surface dark:border-white/10 dark:bg-[#0D0D0D]">
      <div className="relative flex h-64 shrink-0 items-center justify-center overflow-hidden bg-cv-surface2 p-6 dark:bg-black">
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
