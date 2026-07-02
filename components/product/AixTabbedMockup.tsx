"use client";

import { useState } from "react";
import { Route, ShieldCheck, DollarMinimalistic, FileText } from "@solar-icons/react";

const ACCENT = "#1664C0";

const TABS = [
  {
    id: "routing",
    label: "Routing",
    copy: "Every request scored live on cost, latency, and quality. Best-fit route wins, with a fallback attached.",
    icon: Route,
  },
  {
    id: "governance",
    label: "Governance",
    copy: "Budget caps, provider allowlists, and residency rules enforced at the routing layer, before a request goes out.",
    icon: ShieldCheck,
  },
  {
    id: "attribution",
    label: "Cost Attribution",
    copy: "Cost lands against the request, the feature, and the tenant automatically. No spreadsheet reconstruction.",
    icon: DollarMinimalistic,
  },
  {
    id: "audit",
    label: "Audit Trail",
    copy: "Every routing decision logged: constraints active, routes evaluated, route selected, and why.",
    icon: FileText,
  },
];

export function AixTabbedMockup() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const Icon = tab.icon;

  return (
    <div className="cv-container pb-10 lg:pb-16">
      <div className="relative mx-auto w-full" style={{ maxWidth: "1100px" }}>
        {/* Soft blue glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -bottom-10 top-6 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(22,100,192,0.35) 0%, rgba(34,120,224,0.14) 45%, transparent 75%)",
          }}
        />

        {/* Outer glowing shell */}
        <div
          className="relative mx-auto overflow-hidden rounded-[22px] p-2 sm:rounded-[33px] sm:p-[9px]"
          style={{
            background: "linear-gradient(160deg, rgba(124,184,248,0.35), rgba(22,100,192,0.18) 40%, rgba(255,255,255,0.04))",
            boxShadow: "0 40px 80px -32px rgba(0,0,0,0.75), 0 0 60px -20px rgba(22,100,192,0.5)",
          }}
        >
          {/* Travelling light sweep along the outer top edge, left to right */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 h-px w-[30%] cv-border-sweep"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.95) 40%, rgba(124,184,248,0.8) 60%, transparent)",
              zIndex: 10,
            }}
          />

          {/* Thin top highlight line */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-px w-[78%] -translate-x-1/2 rounded-full"
            style={{
              background: "linear-gradient(to right, transparent, rgba(255,255,255,0.85), rgba(124,184,248,0.7), transparent)",
            }}
          />

          {/* Placeholder frame — no video asset yet for AIX */}
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-[16px] border bg-black sm:rounded-[23px]"
            style={{ aspectRatio: "16 / 9", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(22,100,192,0.18), transparent 70%)" }}
            />
            {/* Side vignette fade — dark gradient on left and right edges */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-1/4"
              style={{ background: "linear-gradient(to right, rgba(0,0,0,0.85), transparent)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-1/4"
              style={{ background: "linear-gradient(to left, rgba(0,0,0,0.85), transparent)" }}
            />
            <div key={tab.id} className="cv-hero-fade relative flex flex-col items-center gap-3 px-6 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl border"
                style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
              >
                <Icon size={26} weight="Linear" style={{ color: "#1664C0" }} />
              </div>
              <p className="text-sm font-medium text-white/50">{tab.label} preview</p>
              <p className="text-xs text-white/30">Video coming soon</p>
            </div>
          </div>
        </div>


        {/* Tabs overlap bottom of the frame */}
        <div className="relative z-20 -mt-[18px] flex justify-center px-2 sm:-mt-[28px]">
          <div
            className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-cv-line p-1.5 backdrop-blur-md"
            style={{ background: "rgba(8,11,20,0.85)", scrollbarWidth: "none" }}
          >
            {TABS.map((t, i) => {
              const isActive = i === active;
              const TabIcon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
                  style={isActive ? { background: ACCENT, color: "#fff" } : { color: "rgba(229,233,242,0.6)" }}
                  data-testid={`tab-aix-${t.id}`}
                  aria-pressed={isActive}
                >
                  <TabIcon size={14} weight="Linear" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab copy */}
        <p
          key={tab.id}
          className="cv-hero-fade mx-auto mt-[28px] text-cv-ink dark:text-white text-center"
          style={{ maxWidth: "640px" }}
          data-testid="text-aix-tab-copy"
        >
          {tab.copy}
        </p>
      </div>
    </div>
  );
}
