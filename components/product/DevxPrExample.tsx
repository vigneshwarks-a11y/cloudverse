"use client";

import { useEffect, useRef, useState } from "react";

export default function DevxPrExample({ diff }: { diff: string }) {
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
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="pr-example" className="cv-section bg-cv-surface2">
      <div className="cv-container">
        <div ref={ref} className={visible ? "cv-video-rise" : "opacity-0"}>
          <div className="max-w-3xl mb-8">
            <h2 className="cv-h2 text-cv-ink">This is what a DevX PR comment looks like.</h2>
            <p className="text-cv-ink/75 mt-4">
              This is a real DevX output. An infrastructure change that looked routine. NAT gateway flag and a compute resize.
            </p>
          </div>

          {/* Code block in animated blue border with Mac chrome */}
          <div className="relative rounded-2xl p-[1.5px]">
            <div aria-hidden className="cv-ring-blue absolute inset-0 rounded-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070710]">
              {/* Mac chrome */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-xs leading-relaxed text-cv-ink/85">
                {diff}
              </pre>
            </div>
          </div>

          {/* Comparison cards */}
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            {/* Left: dark background, thin border */}
            <div className="rounded-2xl border border-cv-line bg-cv-surface p-6">
              <div className="cv-label mb-2" style={{ color: "#3FD0A3" }}>DevX cost estimate</div>
              <div className="text-2xl font-display font-semibold text-cv-ink">+$1.1k to $1.4k</div>
              <div className="text-sm text-cv-muted">per month</div>
              <div className="cv-label mt-5 mb-2">Primary drivers</div>
              <ul className="text-sm text-cv-ink/80 space-y-1">
                <li>• NAT Gateway hourly + data processing charges</li>
                <li>• Over-provisioned compute for observed utilisation</li>
              </ul>
            </div>

            {/* Right: dark background, blue border */}
            <div
              className="rounded-2xl border bg-cv-surface p-6"
              style={{ borderColor: "#007CFF" }}
            >
              <div className="cv-label mb-2">Why this matters</div>
              <ul className="text-sm text-cv-ink/80 space-y-1">
                <li>• Always-on NAT in non-prod is a recurring cost with no production benefit</li>
                <li>• Instance size exceeds observed utilisation</li>
              </ul>
              <div className="cv-label mt-5 mb-2">Suggested fix</div>
              <ul className="text-sm text-cv-ink/80 space-y-1">
                <li>• Disable NAT Gateway in non-prod environments</li>
                <li>• Use VPC endpoints for S3 and DynamoDB access</li>
                <li>• Right-size compute for non-prod workloads</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-cv-muted mt-6 italic">
            Estimates are directional. They do not affect billing. They inform decisions before billing happens.
          </p>
        </div>
      </div>
    </section>
  );
}
