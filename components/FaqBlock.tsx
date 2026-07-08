"use client";

import { useState } from "react";

export type FaqItem = { q: string; a: string };

function FaqRow({ item, isOpen, onToggle, index }: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        isOpen
          ? "border-cv-ink/20 bg-cv-ink/[0.02] dark:border-white/15 dark:bg-white/[0.03]"
          : "border-cv-ink/10 dark:border-white/[0.08]"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="w-full text-left flex items-center justify-between gap-4 px-5 py-4"
      >
        <span className="text-sm font-semibold text-cv-ink leading-snug">
          {item.q}
        </span>
        <span className="shrink-0 flex items-center justify-center w-6 h-6 text-cv-blue dark:text-cv-blue-light text-xl leading-none font-normal">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {/* Smooth height + fade */}
      <div
        id={`faq-answer-${index}`}
        role="region"
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 260ms ease-in-out",
        }}
      >
        <div className="overflow-hidden">
          <div
            className="px-5 pb-4 text-sm text-cv-ink/60 leading-relaxed"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-4px)",
              transition: "opacity 200ms ease-in-out, transform 200ms ease-in-out",
            }}
          >
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FaqBlock({
  items,
  title,
  subtitle,
}: {
  items: FaqItem[];
  accent?: string;
  title?: string;
  subtitle?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      {/* Section breathing room around the FAQ card + its backing */}
      <div className="py-8 sm:py-12">
      {/* Backing-layer card (split-backdrop, 3 sides): solid blue backing shifted
          DOWN and wider so it's revealed on the left, right, and bottom while the
          content card overhangs it at the top. Bold blue, same in light & dark. */}
      <div className="relative mx-auto w-full">
        {/* Solid-colour backing layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-[24px] top-[24px] bottom-[-24px] rounded-[24px] bg-cv-blue-bright"
        />

        {/* Main content card */}
        <div className="relative rounded-[24px] border-[1.5px] border-cv-ink/20 bg-white p-6 dark:border-white/10 dark:bg-[#151619] sm:p-10">
          {(title || subtitle) && (
            <div className="mb-8 text-center">
              {title && <h2 className="cv-h2 text-cv-ink">{title}</h2>}
              {subtitle && <p className="mt-3 cv-body text-cv-muted">{subtitle}</p>}
            </div>
          )}

          <div className="grid grid-cols-1 gap-2.5">
            {items.map((it, i) => (
              <FaqRow
                key={it.q}
                item={it}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          }),
        }}
      />
    </>
  );
}
