"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

  return (
    <section className="cv-section bg-cv-surface2" data-testid="section-platform-surfaces">
      <div className="cv-container">
        <div className="max-w-3xl mb-12">
          <div className="cv-label mb-3">Platform overview</div>
          <h2 className="cv-h2 text-cv-ink">One control plane. Four compute surfaces.</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-8 lg:gap-12 items-stretch">
          {/* LEFT — interactive menu */}
          <div className="flex flex-col">
            {SURFACES.map((s, i) => {
              const isActive = i === active;
              const slug = s.name.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={s.name} className="relative border-b border-cv-line">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
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
                        className="mt-4 mb-5 ml-[22px] inline-flex items-center gap-1.5 text-sm text-cv-blue-light hover:gap-2.5 transition-all"
                        data-testid={`surface-link-${slug}`}
                      >
                        Learn more <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Glowing underline for active item */}
                  <span
                    className="pointer-events-none absolute bottom-[-1px] left-0 h-[2px] transition-all duration-500 ease-out"
                    style={{
                      width: isActive ? "100%" : "0%",
                      background: "#0066CC",
                      boxShadow: isActive ? "0 0 12px 1px rgba(0, 102, 204, 0.6)" : "none",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* RIGHT — floating dashboard */}
          <div className="relative min-h-[320px] lg:min-h-0">
            <div className="relative h-full rounded-2xl border border-white/10 bg-[#070710] p-3 shadow-[0_30px_80px_-30px_rgba(34,119,224,0.45),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-xl bg-[#0a0a0f]">
                {SURFACES.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s.name}
                    src={s.image}
                    alt={`${s.name} dashboard`}
                    className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ease-in-out"
                    style={{ opacity: i === active ? 1 : 0 }}
                    aria-hidden={i !== active}
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
