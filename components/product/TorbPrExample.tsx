"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, CheckSquare, Code2, DangerTriangle, Wallet } from "@/lib/solar-icons";
import { CardLightEdge, KIND_COLOR } from "@/components/product/BentoChrome";

/* Diff line coloring: a leading "-" tints the whole row red (removed), "+"
   tints it teal/green (added), matching the site's ok/blocked status palette
   (see BentoChrome's KIND_COLOR) instead of flat monochrome text. */
function DiffLine({ line }: { line: string }) {
  const removed = line.startsWith("-");
  const added = line.startsWith("+");
  const color = removed ? KIND_COLOR.blocked : added ? KIND_COLOR.ok : undefined;
  return (
    <div
      className="whitespace-pre px-2 -mx-2 rounded"
      style={color ? { color, background: `${color}14` } : undefined}
    >
      {line || " "}
    </div>
  );
}

/* Icon-chip row used in place of a plain bullet — colour-codes each line to
   its meaning (driver / risk / fix) the same way status rows read elsewhere
   on the site. */
function ChipRow({ Icon, color, children }: { Icon: typeof Wallet; color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md"
        style={{ color, background: `${color}1A` }}
      >
        <Icon weight="Bold" size={12} />
      </span>
      <span className="text-sm leading-relaxed text-cv-ink/80">{children}</span>
    </div>
  );
}

export default function TorbPrExample({ diff }: { diff: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

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
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const rise = (i: number): React.CSSProperties => ({
    opacity: visible || reduceMotion ? 1 : 0,
    transform: reduceMotion || visible ? "translateY(0)" : "translateY(24px)",
    transition: "opacity 700ms ease-out, transform 700ms ease-out",
    transitionDelay: reduceMotion ? "0ms" : `${i * 120}ms`,
  });

  const lines = diff.split("\n");

  return (
    <section id="pr-example" className="cv-section bg-cv-surface2 dark:bg-black">
      <div className="cv-container">
        <div ref={ref}>
          <div className="max-w-3xl mb-8 text-left" style={rise(0)}>
            <h2 className="cv-h2 text-cv-ink">This is what a Torb PR comment looks like.</h2>
            <p className="text-cv-ink/75 mt-4">
              This is a real Torb output. An infrastructure change that looked routine. NAT gateway flag and a compute resize.
            </p>
          </div>

          {/* Equal-height left/right split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* LEFT: code window with Mac chrome + filename tab + coloured diff */}
            <div className="h-full" style={rise(1)}>
              <div className="relative h-full rounded-2xl p-[1.5px]">
                <div aria-hidden className="cv-ring-blue absolute inset-0 rounded-2xl" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-cv-line bg-cv-card dark:bg-[#0D0D0D]">
                  {/* Mac chrome + filename tab */}
                  <div className="flex items-center gap-3 border-b border-cv-line bg-cv-ink/[0.03] px-4 py-3 dark:bg-white/[0.03]">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                      <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                      <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="flex items-center gap-1.5 rounded-md border border-cv-line bg-cv-surface px-2 py-0.5 font-mono text-[11px] text-cv-ink/70 dark:border-white/10 dark:bg-white/[0.04]">
                      <Code2 weight="Linear" size={12} className="text-cv-blue dark:text-cv-blue-light" />
                      main.tf
                    </span>
                  </div>
                  <pre className="flex-1 overflow-auto p-6 font-mono text-xs leading-relaxed text-cv-ink/85">
                    {lines.map((line, i) => (
                      <DiffLine key={i} line={line} />
                    ))}
                  </pre>
                </div>
              </div>
            </div>

            {/* RIGHT: two stacked cards, equal combined height to code window */}
            <div className="flex h-full flex-col gap-6">
              {/* TOP: cost estimate — CardLightEdge panel, icon-chip header */}
              <div className="relative overflow-hidden rounded-2xl border border-cv-line bg-cv-surface dark:border-white/10 dark:bg-[#0D0D0D] p-6" style={rise(2)}>
                <CardLightEdge />
                <div className="relative flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1664C0]/12 text-[#1664C0] dark:bg-[#7CB8F8]/15 dark:text-[#7CB8F8]">
                    <Wallet weight="Bold" size={15} />
                  </span>
                  <span className="cv-label text-[#1664C0] dark:text-[#7CB8F8]">Torb cost estimate</span>
                </div>
                <div className="relative mt-4 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-semibold text-cv-ink">+$1.1k to $1.4k</span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ color: KIND_COLOR.flag, background: `${KIND_COLOR.flag}1A` }}
                  >
                    per month
                  </span>
                </div>
                <div className="relative mt-5 space-y-2 border-t border-cv-line/60 pt-4 dark:border-white/10">
                  <ChipRow Icon={ArrowUp} color={KIND_COLOR.flag}>Instance size increase</ChipRow>
                  <ChipRow Icon={ArrowUp} color={KIND_COLOR.flag}>Always-on scheduling</ChipRow>
                </div>
              </div>

              {/* BOTTOM: why this matters + suggested fix — CardLightEdge panel */}
              <div className="relative flex-1 overflow-hidden rounded-2xl border border-cv-line bg-cv-surface dark:border-white/10 dark:bg-[#0D0D0D] p-6" style={rise(3)}>
                <CardLightEdge />
                <div className="relative">
                  <span className="cv-label text-[#1664C0] dark:text-[#7CB8F8]">Why this matters</span>
                  <div className="mt-3 space-y-2">
                    <ChipRow Icon={DangerTriangle} color={KIND_COLOR.blocked}>Recurring monthly cost</ChipRow>
                    <ChipRow Icon={DangerTriangle} color={KIND_COLOR.blocked}>No attached owner or budget line</ChipRow>
                  </div>
                </div>
                <div className="relative mt-5 border-t border-cv-line/60 pt-4 dark:border-white/10">
                  <span className="cv-label text-[#1664C0] dark:text-[#7CB8F8]">Suggested fix</span>
                  <div className="mt-3 space-y-2">
                    <ChipRow Icon={CheckSquare} color={KIND_COLOR.ok}>Drop one instance tier</ChipRow>
                    <ChipRow Icon={CheckSquare} color={KIND_COLOR.ok}>Add an auto-stop schedule for non-prod</ChipRow>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs text-cv-muted mt-6 italic" style={rise(4)}>
            Estimates are directional. They do not affect billing. They inform decisions before billing happens.
          </p>
        </div>
      </div>
    </section>
  );
}
