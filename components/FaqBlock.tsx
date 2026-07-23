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
        <span className="text-[18px] font-semibold text-cv-ink leading-snug">
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
            className="px-5 pb-4 text-[16px] text-cv-ink/70 leading-relaxed"
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
  previewCount,
}: {
  items: FaqItem[];
  accent?: string;
  title?: string;
  subtitle?: string;
  /** Show only the first N rows behind a "Show all" button. Omit to show all. */
  previewCount?: number;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const canCollapse = typeof previewCount === "number" && items.length > previewCount;
  const visible = canCollapse && !showAll ? items.slice(0, previewCount) : items;

  return (
    <>
      {/* Section breathing room around the FAQ card + its backing */}
      <div className="py-8 sm:py-12">
      {/* Backing-layer card (split-backdrop, 3 sides): solid blue backing shifted
          DOWN and wider so it's revealed on the left, right, and bottom while the
          content card overhangs it at the top. Bold blue, same in light & dark. */}
      <div className="relative mx-auto w-full">
        {/* Solid-colour backing layer. On mobile it aligns to the container
            edge (inside the layout padding) and the card is inset instead, so
            the blue reveal sits within the layout gutters. At sm+ it bleeds the
            full 24px into the gutter as designed. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-3 -bottom-3 rounded-[18px] bg-[#0059FF] sm:-inset-x-[24px] sm:top-[24px] sm:-bottom-[24px] sm:rounded-[24px]"
        />

        {/* Main content card */}
        <div className="relative mx-3 rounded-[18px] border-[1.5px] border-cv-ink/20 bg-white p-6 dark:border-white/10 dark:bg-black sm:mx-0 sm:rounded-[24px] sm:p-10">
          {(title || subtitle) && (
            <div className="mb-8 flex flex-col items-center gap-4 text-center">
              {title && <h2 className="cv-h2 text-cv-ink">{title}</h2>}
              {subtitle && <p className="cv-body max-w-xl text-cv-muted">{subtitle}</p>}
            </div>
          )}

          <div className="grid grid-cols-1 gap-2.5">
            {visible.map((it, i) => (
              <FaqRow
                key={it.q}
                item={it}
                index={i}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
            {canCollapse && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="flex w-full items-center justify-between gap-4 rounded-xl border border-cv-ink/10 px-5 py-4 text-left transition-colors hover:border-cv-ink/20 hover:bg-cv-ink/[0.02] dark:border-white/[0.08] dark:hover:border-white/15 dark:hover:bg-white/[0.03]"
              >
                <span className="text-[18px] font-semibold text-cv-ink leading-snug">
                  Show all {items.length} FAQs
                </span>
                <span className="shrink-0 flex items-center justify-center w-6 h-6 text-cv-blue dark:text-cv-blue-light text-xl leading-none font-normal">
                  +
                </span>
              </button>
            )}
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
