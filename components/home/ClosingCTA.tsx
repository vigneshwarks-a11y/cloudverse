"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "@solar-icons/react";
import { DEMO_URL } from "@/lib/links";


export function ClosingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cv-surface py-16 lg:py-24"
    >
      {/* Center content */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 600ms ease 150ms, transform 600ms cubic-bezier(0.22,1,0.36,1) 150ms",
        }}
      >
        {/* Headline */}
        <h2 className="text-cv-ink font-bold tracking-tight" style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.1 }}>
          <span className="whitespace-nowrap">Your Cloud and AI Spend is Growing.</span>{" "}
          <span className="whitespace-nowrap">Find Out Exactly Where.</span>
        </h2>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-closing-demo">
            Book a Demo <ArrowRight weight="Linear" size={15} />
          </Link>
          <Link href="/contact" className="cv-btn-ghost" data-testid="link-closing-audit">
            Request a free AI cost audit
          </Link>
        </div>
      </div>
    </section>
  );
}
