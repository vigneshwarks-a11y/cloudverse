import { ShieldCheck } from "@/lib/solar-icons";
import type { ReactNode } from "react";

/* Vendor sovereignty - ported from Tailark's 3-column "features" block: one
   bordered card split into three subgrid columns, each with an illustration on
   top (row 1) and eyebrow/title/description below (row 2), so the text baselines
   line up across columns. Adapted from the shadcn/Tailwind-v4 original to this
   project: cv-* design tokens (theme-aware), solar icons, Tailwind 3.4 subgrid. */

type Pillar = { eyebrow: string; title: string; body: string; illustration: ReactNode };

/* ---- illustrations ------------------------------------------------------- */

// A versioned prompt served from your control plane, policy-checked.
function PromptIllustration() {
  return (
    <div
      aria-hidden
      className="mx-auto w-fit max-w-[15rem] rounded-2xl border border-cv-line bg-cv-surface2 p-3 dark:border-white/10 dark:bg-white/[0.03]"
    >
      <div className="flex items-center gap-2 text-xs text-cv-muted">
        <span className="size-2 rounded-full bg-[#0E9E7A]" />
        Prompt library · v12
      </div>
      <div className="mt-2 rounded-lg bg-cv-ink/[0.05] px-3 py-2 text-sm text-cv-ink dark:bg-white/[0.06]">
        Summarize the <span className="text-cv-blue dark:text-cv-blue-light">@quarterly-report</span> for finance.
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#0E7A5F] dark:text-[#4ADE80]">
        <ShieldCheck size={13} weight="Linear" />
        Policy passed · your control plane
      </div>
    </div>
  );
}

// The model as a routing decision: swappable providers, one active route.
function RoutingIllustration() {
  const rows = [
    { name: "gpt-4o", meta: "$0.9 · 240ms", active: true },
    { name: "claude-3.5", meta: "$1.1 · 210ms", active: false },
    { name: "llama-3-70b", meta: "$0.2 · 180ms", active: false },
  ];
  return (
    <div aria-hidden className="mx-auto w-full max-w-[15rem] space-y-2">
      {rows.map((r) => (
        <div
          key={r.name}
          className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${
            r.active
              ? "border-cv-blue/50 bg-cv-blue/10"
              : "border-cv-line bg-cv-surface2 dark:border-white/10 dark:bg-white/[0.03]"
          }`}
        >
          <span className="flex items-center gap-2">
            <span
              className={`flex size-4 items-center justify-center rounded-full border ${
                r.active ? "border-cv-blue bg-cv-blue text-white" : "border-cv-line"
              }`}
            >
              {r.active && (
                <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="font-medium text-cv-ink">{r.name}</span>
          </span>
          <span className="font-mono text-[11px] text-cv-muted">{r.meta}</span>
        </div>
      ))}
    </div>
  );
}

// An append-only ledger: every execution logged on a timeline you control.
function LedgerIllustration() {
  const events = [
    { time: "06:02", label: "Request logged", strong: false },
    { time: "06:02", label: "Policy applied · 14 checks", strong: true },
    { time: "06:02", label: "Retained · your terms", strong: false },
  ];
  return (
    <div aria-hidden className="relative mx-auto w-fit py-2">
      {/* dotted spine */}
      <div
        className="absolute inset-y-2 left-0 w-px opacity-25"
        style={{ backgroundImage: "linear-gradient(180deg, hsl(var(--cv-ink)) 1px, transparent 1px)", backgroundSize: "1px 4px" }}
      />
      <div className="space-y-2 pl-5">
        {events.map((e, i) => (
          <div
            key={i}
            className={`relative inline-flex items-center gap-2 text-sm font-medium text-cv-ink before:absolute before:-left-[22px] before:inset-y-0 before:my-auto before:size-[6px] before:rounded-full before:border before:ring-2 before:ring-cv-surface ${
              e.strong ? "before:border-cv-blue before:bg-cv-blue" : "before:border-cv-muted before:bg-cv-surface"
            } ${e.strong ? "rounded-lg border border-cv-line bg-cv-surface2 px-3 py-1.5 dark:bg-white/[0.03]" : ""}`}
          >
            <span className="text-xs text-cv-muted">{e.time}</span>
            {e.label}
          </div>
        ))}
      </div>
    </div>
  );
}

const PILLARS: Pillar[] = [
  {
    eyebrow: "Your prompts",
    title: "Under your policy",
    body: "The distilled know-how of your business, versioned and served from your control plane, not siloed inside a vendor's platform.",
    illustration: <PromptIllustration />,
  },
  {
    eyebrow: "Your model choice",
    title: "A routing decision, not a lock-in",
    body: "The model is a routing decision under your constraints: swap providers, stay cloud-agnostic, and keep your own SLAs.",
    illustration: <RoutingIllustration />,
  },
  {
    eyebrow: "Your data & metrics",
    title: "An append-only ledger",
    body: "Every execution recorded on an audit trail you control, retained on your terms, closed to any single vendor's roadmap.",
    illustration: <LedgerIllustration />,
  },
];

export function VendorSovereignty() {
  return (
    <section className="cv-section bg-cv-surface" data-testid="section-vendor-sovereignty">
      <div className="cv-container">
        {/* lead-in - two-column: heading left, description right */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
              Governance
            </span>
            <h2 className="cv-h2 text-balance text-cv-ink">Own your stuff, or your vendor owns your advantage.</h2>
          </div>
          <p className="cv-body text-cv-ink/70 lg:self-end">
            A frontier model going dark by government order. A price shock. A deprecation. Model access is now
            conditional infrastructure. When the vendor changes, your prompts, your data policy, your routes, and your
            audit trail have to keep working, because they live in your control plane, not theirs.
          </p>
        </div>

        {/* 3-column subgrid card - full layout width */}
        <div className="mt-12 w-full overflow-hidden rounded-2xl border border-cv-line/60 bg-cv-surface dark:border-white/10 dark:bg-[#0D0D0D] max-lg:mx-auto max-lg:max-w-sm">
          <div className="grid divide-cv-line/60 dark:divide-white/10 max-lg:divide-y lg:grid-cols-3 lg:divide-x">
            {PILLARS.map((p) => (
              <div key={p.title} className="row-span-2 grid grid-rows-subgrid gap-8 p-8">
                <div className="self-center">{p.illustration}</div>
                <div className="mx-auto max-w-sm text-center">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-cv-muted">{p.eyebrow}</div>
                  <h3 className="text-balance text-base font-semibold text-cv-ink">{p.title}</h3>
                  <p className="mt-3 text-balance cv-body text-cv-ink/65">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center italic text-cv-ink/70">
          &quot;Switching models without losing institutional learning is the sovereignty test.&quot;
        </p>
      </div>
    </section>
  );
}
