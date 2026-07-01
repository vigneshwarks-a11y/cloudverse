"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
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
      className="relative overflow-hidden bg-cv-surface py-24 lg:py-32"
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
        {/* Eyebrow chip */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] mb-6">
          Get started
        </span>

        {/* Headline */}
        <h2 className="cv-h1 text-cv-ink">
          See what cloudverse<br />can do for your team.
        </h2>

        {/* Description */}
        <p className="mt-5 cv-body-lg text-cv-muted max-w-md">
          Connect your first account in under 30 minutes and find savings you didn&apos;t know existed.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={DEMO_URL} className="cv-btn-primary" data-testid="link-closing-demo">
            Book a Demo <IconArrowRight size={15} stroke={1} />
          </Link>
          <Link href="/contact" className="cv-btn-ghost" data-testid="link-closing-sales">
            Talk to Sales
          </Link>
        </div>

        {/* Sub-link */}
        <Link
          href="/platform/aix"
          className="mt-6 flex items-center gap-1 text-sm text-cv-muted hover:text-cv-ink transition-colors"
        >
          Are you an enterprise? See how AIX works
          <IconArrowRight size={13} stroke={1.5} />
        </Link>
      </div>
    </section>
  );
}
