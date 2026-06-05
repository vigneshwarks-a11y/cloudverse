"use client";

import { useEffect, useRef, useState } from "react";

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function CountUpStat({
  value,
  className,
  durationMs = 1600,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [progress, setProgress] = useState(0);

  const tokens = value.split(/(\d+\.?\d*)/);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / durationMs, 1);
        setProgress(easeOutExpo(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            run();
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [durationMs]);

  return (
    <div ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {tokens.map((tok, i) => {
        if (/^\d+\.?\d*$/.test(tok)) {
          const decimals = tok.includes(".") ? tok.split(".")[1].length : 0;
          const current = (parseFloat(tok) * progress).toFixed(decimals);
          return <span key={i}>{current}</span>;
        }
        return <span key={i}>{tok}</span>;
      })}
    </div>
  );
}
