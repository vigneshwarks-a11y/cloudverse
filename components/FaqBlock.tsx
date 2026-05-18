"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export function FaqBlock({ items, accent = "#0071E3" }: { items: FaqItem[]; accent?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/10">
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <button
              key={it.q}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              className="w-full text-left p-5 sm:p-6 group"
              data-testid={`faq-item-${i}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="font-display text-white text-base sm:text-lg font-semibold pr-4" style={isOpen ? { color: accent } : undefined}>
                  {it.q}
                </div>
                <ChevronDown
                  size={20}
                  className={`shrink-0 mt-1 text-white/60 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
              {isOpen && (
                <p className="text-white/70 text-[15px] leading-relaxed mt-3" data-testid={`faq-answer-${i}`}>
                  {it.a}
                </p>
              )}
            </button>
          );
        })}
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
