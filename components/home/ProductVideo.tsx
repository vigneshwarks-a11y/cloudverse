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
      className="relative overflow-hidden pb-24 sm:pb-28 lg:pb-36"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--cv-surface)) 0%, #08080d 45%, #0a0a0f 100%)",
      }}
      data-testid="section-product-video"
    >
      <div className="cv-container">
        <div
          ref={ref}
          className="relative mx-auto max-w-4xl -mt-24 lg:-mt-40"
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

          {/* Video window with rotating gradient ring */}
          <div
            className={`relative rounded-2xl p-[2px] cv-video-ring border border-white/10 shadow-[0_40px_120px_-30px_rgba(34,119,224,0.55)] ${
              visible ? "cv-video-rise" : "opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-[14px] bg-[#070710]">
              <video
                className="block h-auto w-full"
                src="/product-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                data-testid="video-product"
              />
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
