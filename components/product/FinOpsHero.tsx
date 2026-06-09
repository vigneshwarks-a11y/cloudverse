"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { DEMO_URL } from "@/lib/links";

const ACCENT = "#1664C0";

type Tab = { id: string; label: string; copy: string; src: string };

const TABS: Tab[] = [
  {
    id: "anomalies",
    label: "Anomalies",
    copy: "Identify the team and charge that drove the spike within hours.",
    src: "/finops/anomalies.mp4",
  },
  {
    id: "recommendations",
    label: "Recommendations",
    copy: "Ranked by impact. Specific enough to act on.",
    src: "/finops/recommendations.mp4",
  },
  {
    id: "allocation",
    label: "Allocation",
    copy: "One model that covers all three clouds. Reconciles to finance.",
    src: "/finops/allocation.mp4",
  },
  {
    id: "platform-ai",
    label: "Platform AI",
    copy: "Ask questions about spend, trends, and opportunities in plain English.",
    src: "/finops/platform-ai.mp4",
  },
];

export function FinOpsHero() {
  const [active, setActive] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
  };

  const tab = TABS[active];

  return (
    <section className="cv-hero-bg relative overflow-x-clip pb-[72px] pt-[88px] lg:pb-24">
      <div className="cv-container relative z-10 flex flex-col items-center text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
          style={{ borderColor: `${ACCENT}66`, color: "#7CB8F8" }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
          FinOps Platform
        </div>

        {/* Heading */}
        <h1
          className="mt-[18px] font-display font-semibold tracking-tight text-cv-ink"
          style={{ maxWidth: "1000px", fontSize: "clamp(52px, 5.4vw, 86px)", lineHeight: 1.02 }}
        >
          Multi-Cloud Cost Intelligence for Every Team
        </h1>

        {/* Subheading */}
        <p className="cv-body-lg mt-5 text-cv-ink/75" style={{ maxWidth: "720px" }}>
          See every dollar by team, product, and provider. One model that reconciles to finance and explains itself to engineering.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href={DEMO_URL} className="cv-btn-primary w-full sm:w-auto">
            <span>Book a Demo</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/integrations" className="cv-btn-ghost w-full sm:w-auto">
            Explore the Platform
          </Link>
        </div>

        {/* Video frame */}
        <div className="relative mt-12 w-full" style={{ maxWidth: "1100px" }}>
          {/* Soft blue glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -bottom-10 top-6 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(22,100,192,0.40) 0%, rgba(34,119,224,0.16) 45%, transparent 75%)",
            }}
          />

          {/* Outer glowing shell */}
          <div
            className="relative mx-auto rounded-[22px] p-2 sm:rounded-[33px] sm:p-[9px]"
            style={{
              background: "linear-gradient(160deg, rgba(124,184,248,0.45), rgba(22,100,192,0.18) 40%, rgba(255,255,255,0.04))",
              boxShadow:
                "0 40px 80px -32px rgba(0,0,0,0.75), 0 0 60px -20px rgba(22,100,192,0.55)",
            }}
          >
            {/* Thin top highlight line */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-px w-[78%] -translate-x-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.85), rgba(124,184,248,0.7), transparent)",
              }}
            />

            {/* Inner video frame */}
            <div
              className="relative overflow-hidden rounded-[16px] border bg-[#05070E] sm:rounded-[23px]"
              style={{ aspectRatio: "16 / 9", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <video
                ref={videoRef}
                key={tab.src}
                className="cv-hero-fade absolute inset-0 h-full w-full"
                style={{ objectFit: "contain" }}
                src={tab.src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                data-testid={`video-finops-${tab.id}`}
              />
            </div>
          </div>

          {/* Tabs — overlap bottom of the video */}
          <div className="relative z-20 -mt-[18px] flex justify-center px-2 sm:-mt-[28px]">
            <div
              className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 p-1.5 backdrop-blur-md"
              style={{ background: "rgba(8,11,20,0.85)", scrollbarWidth: "none" }}
            >
              {TABS.map((t, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => select(i)}
                    className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors"
                    style={
                      isActive
                        ? { background: ACCENT, color: "#fff" }
                        : { color: "rgba(229,233,242,0.6)" }
                    }
                    data-testid={`tab-finops-${t.id}`}
                    aria-pressed={isActive}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab copy */}
          <p
            key={tab.id}
            className="cv-hero-fade mx-auto mt-[28px] text-cv-ink/70"
            style={{ maxWidth: "640px" }}
            data-testid="text-finops-tab-copy"
          >
            {tab.copy}
          </p>
        </div>
      </div>
    </section>
  );
}
