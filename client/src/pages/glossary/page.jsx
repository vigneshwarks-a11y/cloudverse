import React, { useCallback, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { BaseLayout } from "@/layouts/BaseLayout";
import { glossaryEntries } from "./components/data";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const buildGroupedEntries = (entries) => {
  const groups = ALPHABET.reduce((acc, letter) => {
    acc[letter] = [];
    return acc;
  }, {});

  entries.forEach((entry) => {
    const letterKey =
      entry.letter?.toUpperCase() ||
      entry.term?.charAt(0)?.toUpperCase() ||
      "";

    if (!letterKey) return;

    if (!groups[letterKey]) {
      groups[letterKey] = [];
    }

    groups[letterKey].push(entry);
  });

  Object.values(groups).forEach((list) => {
    list.sort((a, b) => a.term.localeCompare(b.term));
  });

  return groups;
};

function GlossaryAccordionItem({
  entry,
  isOpen,
  onToggle,
  registerContentRef,
  contentRefs,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-cv-line bg-cv-surface2">
      <button
        type="button"
        onClick={() => onToggle(entry.id)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-cv-line/30"
      >
        <span className="text-[15px] sm:text-base font-semibold text-cv-ink">
          {entry.term}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cv-surface border border-cv-line">
          <ChevronDown
            className={`h-4 w-4 text-cv-muted transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      <div
        ref={registerContentRef(entry.id)}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isOpen
            ? `${contentRefs.current[entry.id]?.scrollHeight ?? 0}px`
            : "0px",
        }}
      >
        <div className="px-5 pb-4">
          <p className="whitespace-pre-line text-sm sm:text-[15px] leading-7 text-cv-muted">
            {entry.definition}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GlossaryPage() {
  const groupedEntries = useMemo(() => buildGroupedEntries(glossaryEntries), []);

  const lettersWithTerms = useMemo(
    () => ALPHABET.filter((letter) => groupedEntries[letter]?.length > 0),
    [groupedEntries]
  );

  const [activeLetter, setActiveLetter] = useState(
    lettersWithTerms[0] ?? ALPHABET[0]
  );
  const [expandedId, setExpandedId] = useState(null);

  const contentRefs = useRef({});

  const handleLetterClick = useCallback((event, letter) => {
    event.preventDefault();
    setActiveLetter(letter);

    const target = document.getElementById(`group-${letter}`);
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(top - 120, 0), behavior: "smooth" });
  }, []);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const registerContentRef = useCallback(
    (id) => (el) => {
      if (el) contentRefs.current[id] = el;
      else delete contentRefs.current[id];
    },
    []
  );

  return (
    <BaseLayout>
      <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 border-b border-cv-line">
        <div className="cv-container-full">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-cv-muted mb-4 inline-block">
              CloudVerse Resources
            </span>
            <h1 className="cv-h1 mb-4">Glossary</h1>
            <p className="text-[15px] sm:text-[16px] lg:text-[17px] leading-[24px] sm:leading-[26px] lg:leading-[28px] text-cv-muted">
              Key terms used across Cloud, FinOps, Kubernetes, AI cost management, and
              governance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-14">
        <div className="cv-container-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-10">
          <aside className="lg:sticky lg:top-28 h-fit rounded-xl border border-cv-line bg-cv-surface2 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-cv-muted mb-4">
              Filter by letter
            </h2>
            <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-5 gap-2">
              {ALPHABET.map((letter) => {
                const hasEntries = groupedEntries[letter]?.length > 0;
                const isActive = activeLetter === letter;

                if (!hasEntries) {
                  return (
                    <span
                      key={letter}
                      className="flex h-9 items-center justify-center rounded-md border border-cv-line bg-cv-surface text-xs font-medium text-cv-muted/50"
                    >
                      {letter}
                    </span>
                  );
                }

                return (
                  <a
                    key={letter}
                    href={`#group-${letter}`}
                    onClick={(e) => handleLetterClick(e, letter)}
                    className={`flex h-9 items-center justify-center rounded-md border text-xs font-semibold transition-colors ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-cv-line bg-cv-surface text-cv-muted hover:text-cv-ink hover:bg-cv-line/30"
                    }`}
                  >
                    {letter}
                  </a>
                );
              })}
            </div>
          </aside>

          <section className="space-y-10">
            {ALPHABET.filter((letter) => groupedEntries[letter]?.length > 0).map(
              (letter) => (
                <div key={letter} id={`group-${letter}`} className="scroll-mt-28">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="cv-h2 !text-2xl">{letter}</h2>
                    <span className="text-sm text-cv-muted">
                      {groupedEntries[letter].length} {groupedEntries[letter].length === 1 ? "term" : "terms"}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {groupedEntries[letter].map((entry) => (
                      <GlossaryAccordionItem
                        key={entry.id}
                        entry={entry}
                        isOpen={expandedId === entry.id}
                        onToggle={handleToggle}
                        registerContentRef={registerContentRef}
                        contentRefs={contentRefs}
                      />
                    ))}
                  </div>
                </div>
              )
            )}
          </section>
        </div>
      </section>
    </BaseLayout>
  );
}
