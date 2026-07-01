"use client";

import { useState } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

export type FaqItem = { q: string; a: string };

function FaqCard({ item, isOpen, onToggle, index }: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`rounded-2xl border transition-colors duration-200 ${
        isOpen ? "border-cv-line/80 bg-cv-ink/[0.04]" : "border-cv-line bg-cv-card"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className="w-full text-left flex items-center justify-between gap-4 px-5 py-4"
      >
        <span className="text-sm font-medium text-cv-ink leading-snug">
          {item.q}
        </span>
        <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-cv-line/60 text-cv-muted">
          {isOpen
            ? <IconMinus size={13} stroke={1.5} />
            : <IconPlus size={13} stroke={1.5} />
          }
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

export function FaqBlock({ items }: { items: FaqItem[]; accent?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        {items.map((it, i) => (
          <FaqCard
            key={it.q}
            item={it}
            index={i}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
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
