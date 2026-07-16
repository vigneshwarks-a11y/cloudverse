"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@/lib/solar-icons";

const CYCLE_MS = 5000;

type Surface = {
  name: string;
  href: string;
  color: string;
  body: string;
  image: string;
};

const SURFACES: Surface[] = [
  {
    name: "AIX",
    href: "/platform/aix",
    color: "#6954D4",
    body: "Routes every AI request to the lowest-cost model that meets your quality and latency requirements. Budget caps applied before spend occurs. Full decision trace on every request.",
    image: "/legacy/platform/dash-vis.svg",
  },
  {
    name: "DataX",
    href: "/platform/datax",
    color: "#D97706",
    body: "Finds the queries running up your warehouse bill. Attributes cost to the query, pipeline, and team that ran it. Suggests the fix. Automates it when you're ready.",
    image: "/legacy/platform/dash-opti.svg",
  },
  {
    name: "DevX",
    href: "/platform/devx",
    color: "#0E9E7A",
    body: "Catches infrastructure cost regressions in pull requests before they reach production. Engineers see what their changes cost at the moment they can still change something.",
    image: "/legacy/platform/dash-main.svg",
  },
  {
    name: "FinOps Platform",
    href: "/platform/finops",
    color: "#1664C0",
    body: "Multi-cloud cost intelligence across AWS, Azure, and GCP. Allocation, anomaly detection, commitment planning, and variance reporting on one model that reconciles to finance.",
    image: "/legacy/platform/dash-main.svg",
  },
];

export function PlatformSurfaces() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);
  const runIdRef = useRef(0);

  const select = (i: number) => {
    runIdRef.current += 1;
    setActive(i);
    setCycle((c) => c + 1);
  };

  useEffect(() => {
    const bar = barRef.current;
    if (bar) bar.style.width = "0%";

    const myRun = runIdRef.current;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      if (myRun !== runIdRef.current) return;
      const p = Math.min((now - start) / CYCLE_MS, 1);
      if (bar) bar.style.width = `${p * 100}%`;
      if (p >= 1) {
        setActive((a) => (a + 1) % SURFACES.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, cycle]);

  return (
    <section className="cv-section bg-cv-surface" data-testid="section-platform-surfaces">
      <div className="cv-container">
        <div className="max-w-3xl mb-12">
          <div className="cv-label mb-3">Platform overview</div>
          <h2 className="cv-h2 text-cv-ink">One control plane. Four compute surfaces.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-8 lg:gap-12 items-stretch">
          {/* LEFT interactive menu */}
          <div className="flex flex-col">
            {SURFACES.map((s, i) => {
              const isActive = i === active;
              const slug = s.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={s.name} className="relative border-b border-cv-line">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    className={`flex w-full items-center gap-3 py-5 text-left transition-colors ${
                      isActive ? "" : "hover:opacity-80"
                    }`}
                    aria-expanded={isActive}
                    aria-controls={`surface-panel-${slug}`}
                    data-testid={`surface-tab-${slug}`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                    <h3 className={`cv-h3 transition-colors ${isActive ? "text-cv-ink" : "text-cv-ink/60"}`}>
                      {s.name}
                    </h3>
                  </button>

                  {/* Expandable body */}
                  <div
                    id={`surface-panel-${slug}`}
                    role="region"
                    aria-label={`${s.name} details`}
                    inert={!isActive}
                    className="grid transition-all duration-500 ease-out"
                    style={{
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-cv-ink/75 leading-relaxed pl-[22px] pb-1">{s.body}</p>
                      <Link
                        href={s.href}
                        className="mt-4 mb-5 ml-[22px] inline-flex items-center gap-1.5 text-sm text-[#1664C0] dark:text-[#7CB8F8] hover:gap-2.5 transition-all"
                        data-testid={`surface-link-${slug}`}
                      >
                        Learn more <ArrowRight weight="Linear" size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Animated blue progress bar under the active item */}
                  {isActive && (
                    <span
                      ref={barRef}
                      className="pointer-events-none absolute bottom-[-1px] left-0 h-[3px] rounded-full"
                      style={{
                        width: "0%",
                        background: "#0066CC",
                        boxShadow: "0 0 12px 1px rgba(0, 102, 204, 0.6)",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* RIGHT floating dashboard */}
          <div className="relative min-h-[320px] lg:min-h-0">
            <div className="relative h-full rounded-2xl border border-cv-line bg-cv-card p-3 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl bg-cv-card">
                {SURFACES.map((s, i) => (
                  <Image
                    key={s.name}
                    src={s.image}
                    alt={i === active ? `${s.name} cost intelligence dashboard` : ""}
                    fill
                    className="object-cover object-top transition-opacity duration-700 ease-in-out"
                    style={{ opacity: i === active ? 1 : 0 }}
                    aria-hidden={i !== active}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading={i === 0 ? "eager" : "lazy"}
                    data-testid={`surface-image-${s.name.toLowerCase().replace(/\s+/g, "-")}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
