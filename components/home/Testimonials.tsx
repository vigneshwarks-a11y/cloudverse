"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Testimonial = {
  slot: string;
  quote: string;
  name: string;
  title: string;
  initials: string;
  product: string;
  tags: string[];
};

const TESTIMONIALS: Testimonial[] = [
  {
    slot: "Testimonial slot 1",
    quote: "[TESTIMONIAL SLOT 1 FinOps leader, financial services or tech]",
    name: "FinOps Leader",
    title: "Financial services / tech",
    initials: "F1",
    product: "FinOps",
    tags: ["Cost attribution", "Anomaly detection", "Finance-grade reporting"],
  },
  {
    slot: "Testimonial slot 2",
    quote: "[TESTIMONIAL SLOT 2 Engineering leader, platform or cloud team]",
    name: "Engineering Leader",
    title: "Platform / cloud team",
    initials: "E2",
    product: "DevX",
    tags: ["Automation paths", "Policy guardrails", "Rollback readiness"],
  },
  {
    slot: "Testimonial slot 3",
    quote: "[TESTIMONIAL SLOT 3 Data team or analytics engineering]",
    name: "Data Leader",
    title: "Analytics engineering",
    initials: "D3",
    product: "DataX",
    tags: ["Warehouse spend", "Query attribution", "Workload tuning"],
  },
];

const CYCLE_MS = 6000;

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const focusMainRef = useRef(false);
  const len = TESTIMONIALS.length;
  const paused = hovered || focusWithin;

  function advance(i: number) {
    setActive((a) => (a === i ? (a + 1) % len : a));
  }

  function select(i: number) {
    if (i === active) return;
    focusMainRef.current = true;
    setActive(i);
  }

  useEffect(() => {
    if (focusMainRef.current) {
      focusMainRef.current = false;
      mainCardRef.current?.focus();
    }
  }, [active]);

  return (
    <section
      className="cv-testimonials cv-section relative overflow-hidden bg-cv-surface"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      {/* Soft blue glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/3 h-72 w-[40rem] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(22,100,192,0.22), transparent 70%)" }}
      />

      <div className="cv-container relative z-10">
        <div className="mb-6 flex items-baseline gap-3">
          <span className="cv-label">Testimonials</span>
          <span className="text-sm text-cv-muted">Trusted by the teams who own the spend.</span>
        </div>

        <div className="flex h-[280px] items-stretch gap-3 sm:h-[380px] lg:h-[480px]">
          {TESTIMONIALS.map((t, i) => {
            const isActive = i === active;
            const cardClass = `group relative overflow-hidden rounded-3xl border text-left transition-[flex-grow,flex-basis] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isActive
                ? "border-cv-line"
                : "cursor-pointer border-cv-line bg-cv-ink/[0.03] hover:border-cv-line hover:bg-cv-ink/[0.06]"
            }`;
            const cardStyle = isActive
              ? { flexGrow: 1, flexBasis: 0, minWidth: 0 }
              : { flexGrow: 0, flexBasis: "4.5rem", flexShrink: 0 };

            const content = (
              <>
                {/* ACTIVE layer */}
                <div
                  className={`absolute inset-0 flex flex-col transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  {/* Blue fading into black */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(22,100,192,0.55) 0%, rgba(22,100,192,0.28) 30%, hsl(var(--cv-card) / 0.92) 66%, hsl(var(--cv-card)) 100%)",
                    }}
                  />
                  {/* Subtle grid overlay */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, hsl(var(--cv-ink) / 0.05) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--cv-ink) / 0.05) 1px, transparent 1px)",
                      backgroundSize: "44px 44px",
                      maskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
                      WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 75%)",
                    }}
                  />

                  {/* Top row: logo + loader */}
                  <div className="relative flex items-center justify-between p-4 sm:p-8 lg:px-10">
                    <Image
                      src="/legacy/logo/whitelogo.svg"
                      alt="CloudVerse"
                      width={120}
                      height={28}
                      className="h-6 w-auto opacity-90 sm:h-7"
                      priority={false}
                    />
                    <div
                      className="h-1.5 w-20 overflow-hidden rounded-full bg-cv-ink/15 sm:w-28"
                      aria-hidden
                    >
                      {isActive && (
                        <div
                          key={active}
                          className="h-full w-full origin-left rounded-full bg-[#1664C0]"
                          style={{
                            transform: "scaleX(0)",
                            animation: `cv-loader-fill ${CYCLE_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }}
                          onAnimationEnd={() => advance(i)}
                        />
                      )}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative flex flex-1 items-center overflow-hidden px-4 sm:px-8 lg:px-10">
                    <blockquote className="max-w-3xl font-display text-base leading-snug text-cv-ink sm:text-2xl lg:text-4xl">
                      {t.quote}
                    </blockquote>
                  </div>

                  {/* Bottom strip */}
                  <div className="relative mt-2 flex flex-col gap-3 border-t border-cv-line bg-cv-surface/40 p-4 backdrop-blur-sm sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-6 lg:px-10">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1664C0]/50 bg-[#1664C0]/20 text-sm font-semibold text-[#7C9BFF]">
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-cv-ink">{t.name}</div>
                        <div className="text-sm text-cv-muted">{t.title}</div>
                      </div>
                      <span className="ml-2 hidden items-center rounded-full border border-[#1664C0]/50 bg-[#1664C0]/15 px-3 py-1 text-xs font-medium text-[#7C9BFF] sm:inline-flex">
                        {t.product}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border border-cv-blue/30 bg-cv-blue/10 px-3 py-1 text-xs text-cv-ink/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* INACTIVE layer */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-between gap-4 py-5 transition-opacity duration-300 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="flex flex-1 items-center text-xs font-semibold uppercase tracking-widest text-cv-muted group-hover:text-cv-ink/80 [writing-mode:vertical-rl] rotate-180">
                    {t.name}
                  </span>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cv-line bg-cv-ink/[0.06] text-xs font-semibold text-cv-muted transition-colors group-hover:text-cv-ink/80">
                    {t.initials}
                  </div>
                </div>
              </>
            );

            return isActive ? (
              <div
                key={t.slot}
                ref={mainCardRef}
                tabIndex={-1}
                aria-live="polite"
                aria-label={`Testimonial from ${t.name}`}
                data-testid="testimonial-active"
                className={`${cardClass} bg-cv-card focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1664C0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0F]`}
                style={cardStyle}
              >
                {content}
              </div>
            ) : (
              <button
                key={t.slot}
                type="button"
                onClick={() => select(i)}
                aria-label={`Show testimonial from ${t.name}`}
                data-testid={`testimonial-card-${i}`}
                className={cardClass}
                style={cardStyle}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
