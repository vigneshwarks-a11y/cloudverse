"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { AltArrowLeft, AltArrowRight } from "@/lib/solar-icons";
import type { IconProps } from "@solar-icons/react";
import { BorderBeam } from "@/components/magicui/border-beam";

const ACCENT = "#1664C0";
const AUTO_ADVANCE_MS = 5000;

export type MockupTab = {
  id: string;
  label: string;
  copy: string;
  icon: ComponentType<IconProps>;
};

export function PlatformHeroMockup({ tabs }: { tabs: MockupTab[] }) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const Icon = tab.icon;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [highlight, setHighlight] = useState<{ left: number; width: number } | null>(null);

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % tabs.length);
    }, AUTO_ADVANCE_MS);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs.length]);

  const selectTab = (i: number) => {
    setActive(i);
    restartTimer();
  };

  useLayoutEffect(() => {
    const measure = () => {
      const el = tabRefs.current[active];
      if (el) setHighlight({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, tabs.length]);

  return (
    <div className="relative">
      {/* Continues the hero's blue gradient down over the mockup so it reads as
          one band with the hero above (blue at top → fades to the page base). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-full"
        style={{ background: "linear-gradient(180deg, rgba(20,71,230,0.50) 0%, rgba(20,71,230,0.16) 42%, transparent 78%)" }}
      />
      <div className="cv-container relative pb-10 lg:pb-16">
      <div className="relative mx-auto w-full">
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
          {/* Placeholder frame */}
          <div
            className="relative flex items-center justify-center overflow-hidden rounded-[16px] border bg-black sm:rounded-[23px]"
            style={{ aspectRatio: "16 / 9", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(22,100,192,0.18), transparent 70%)" }}
            />
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
                <Icon size={26} weight="Linear" style={{ color: ACCENT }} />
              </div>
              <p className="text-sm font-medium text-white/50">{tab.label} preview</p>
              <p className="text-xs text-white/30">Video coming soon</p>
            </div>
          </div>

          {/* White light beam travelling around the frame border */}
          <BorderBeam duration={8} size={140} colorFrom="#ffffff" colorTo="#ffffff" />
        </div>

        {/* Mobile carousel nav */}
        <div className="relative z-20 -mt-[18px] flex sm:hidden justify-center px-4">
          <div
            className="flex w-full items-center gap-3 rounded-2xl border border-cv-line px-3 py-2 backdrop-blur-md"
            style={{ background: "rgba(8,11,20,0.85)" }}
          >
            <button
              type="button"
              onClick={() => selectTab((active - 1 + tabs.length) % tabs.length)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10"
              aria-label="Previous tab"
            >
              <AltArrowLeft weight="Linear" size={16} />
            </button>
            <div className="flex flex-1 items-center justify-center gap-2">
              <Icon size={16} weight="Linear" style={{ color: ACCENT }} />
              <span className="text-sm font-semibold text-white">{tab.label}</span>
            </div>
            <button
              type="button"
              onClick={() => selectTab((active + 1) % tabs.length)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10"
              aria-label="Next tab"
            >
              <AltArrowRight weight="Linear" size={16} />
            </button>
          </div>
        </div>

        {/* Desktop pill tabs */}
        <div className="relative z-20 -mt-[28px] hidden sm:flex justify-center px-2">
          <div
            className="relative flex flex-nowrap gap-1 rounded-full border border-cv-line p-1.5 backdrop-blur-md"
            style={{ background: "rgba(8,11,20,0.85)" }}
          >
            {highlight && (
              <div
                aria-hidden
                className="absolute top-1.5 bottom-1.5 rounded-full transition-[left,width] duration-300 ease-out"
                style={{ left: highlight.left, width: highlight.width, background: ACCENT }}
              />
            )}
            {tabs.map((t, i) => {
              const isActive = i === active;
              const TabIcon = t.icon;
              return (
                <button
                  key={t.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  type="button"
                  onClick={() => selectTab(i)}
                  className="relative z-10 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300"
                  style={{ color: isActive ? "#fff" : "rgba(229,233,242,0.6)" }}
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
          className="cv-hero-fade mx-auto mt-6 sm:mt-[28px] px-4 text-cv-ink dark:text-white text-center text-sm sm:text-base lg:text-lg"
          style={{ maxWidth: "640px" }}
        >
          {tab.copy}
        </p>
      </div>
      </div>
    </div>
  );
}
