"use client";

import { useEffect, useRef, useState } from "react";

export function ProductVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-x-clip pb-24 sm:pb-28 lg:pb-36"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--cv-surface)) 0%, #08080d 45%, #0a0a0f 100%)",
      }}
      data-testid="section-product-video"
    >
      <div className="cv-container">
        <div
          ref={ref}
          className="relative -mt-24 lg:-mt-40"
        >
          {/* Soft blue glow underneath */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-10 bottom-[-60px] h-48 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(34, 119, 224, 0.45) 0%, rgba(105, 84, 212, 0.18) 45%, transparent 75%)",
            }}
          />

          {/* Outer frame */}
          <div
            className={`relative rounded-[20px] border border-white/10 bg-white/[0.02] p-2 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] ${
              visible ? "cv-video-rise" : "opacity-0"
            }`}
          >
            {/* Video window */}
            <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[#070710] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)]">
              <div
                className="flex aspect-video w-full items-center justify-center"
                data-testid="video-product"
              >
                <span className="text-sm text-white/30">Product video coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dissolve into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, #0a0a0f)",
        }}
      />
    </section>
  );
}
