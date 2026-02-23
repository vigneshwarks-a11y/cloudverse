'use client';

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import { glossaryEntries } from './components/data';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const buildGroupedEntries = (entries) => {
  const groups = ALPHABET.reduce((acc, letter) => {
    acc[letter] = [];
    return acc;
  }, {});

  entries.forEach((entry) => {
    const letterKey =
      entry.letter?.toUpperCase() ||
      entry.term?.charAt(0)?.toUpperCase() ||
      '';

    if (!letterKey) {
      return;
    }

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

const GlossaryAccordionItem = ({
  entry,
  isOpen,
  onToggle,
  registerContentRef,
  contentRefs,
}) => (
  <div className="overflow-hidden rounded-xl border border-[#d7e5ff] bg-white shadow-[0_8px_24px_rgba(17,125,250,0.08)]">
    <button
      type="button"
      onClick={() => onToggle(entry.id)}
      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-[#f6f9ff]"
    >
      <span className="text-base font-medium text-[#0a1f63]">
        {entry.term}
      </span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9f2ff]">
        <BiSolidDownArrow
          className={`text-[#117DFA] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
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
          : '0px',
      }}
    >
      <div className="px-6 pb-5 leading-relaxed">
        <p className="whitespace-pre-line text-base text-[#344054] pt-2">
          {entry.definition.replace(/\. (Ken42\b)/, '.\n$1')}
        </p>
      </div>
    </div>
  </div>
);

const GlossaryPage = () => {
  const groupedEntries = useMemo(
    () => buildGroupedEntries(glossaryEntries),
    []
  );

  const lettersWithTerms = useMemo(
    () =>
      ALPHABET.filter(
        (letter) => groupedEntries[letter]?.length > 0
      ),
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

    const targetId = `group-${letter}`;
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    const elementTop =
      targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetTop = Math.max(elementTop - 96, 0); // aligns with sticky filter offset

    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth',
    });
  }, []);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const registerContentRef = useCallback(
    (id) => (element) => {
      if (element) {
        contentRefs.current[id] = element;
      } else {
        delete contentRefs.current[id];
      }
    },
    []
  );

  return (
    <div className="mt-20">
      <div className="relative bg-gradient-to-r from-[#005b97] to-[#363795]">
        <div className="blog-bg">
          <div className="section-width 2xl:pt-44 xl:pt-40 lg:pt-36 md:pt-32 pt-28 pb-16">
            <h1 className="mb-0 text-center text-white xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold leading-tight">
              Glossary
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-b from-[#f4f8ff] via-white to-[#f7fbff] py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        <aside className="w-full max-w-xs self-center space-y-8 rounded-2xl border border-[#d7e5ff] bg-white p-6 shadow-[0_10px_30px_rgba(17,125,250,0.08)] lg:sticky lg:top-40 lg:self-start xl:top-44">
          <div>
            <h1 className="mb-0 text-left text-3xl font-semibold text-[#0a1f63]">
              Stay up to date with institutional terms
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-[#4d5b7c]">
              This glossary helps you quickly understand key higher-education
              and campus operations terms used across Ken42 modules.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#117DFA]">
              Filter
            </p>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {ALPHABET.map((letter) => {
                const hasEntries =
                  groupedEntries[letter]?.length > 0;

                if (!hasEntries) {
                  return (
                    <span
                      key={letter}
                      className="flex h-10 items-center justify-center rounded-md border border-[#d9e5fb] bg-[#f8fbff] text-sm font-medium text-[#a2a9bc]"
                    >
                      {letter}
                    </span>
                  );
                }

                const isActive = activeLetter === letter;

                return (
                  <a
                    key={letter}
                    href={`#group-${letter}`}
                    onClick={(event) =>
                      handleLetterClick(event, letter)
                    }
                    className={`flex h-10 items-center justify-center rounded-md border text-sm font-medium transition-colors ${isActive
                      ? 'border-[#117DFA] bg-[#117DFA] text-white'
                      : 'border-[#d9e5fb] bg-white text-[#0a1f63] hover:border-[#117DFA] hover:text-[#117DFA]'
                      }`}
                  >
                    {letter}
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        <section className="flex-1 space-y-12">
          {ALPHABET.filter(
            (letter) => groupedEntries[letter]?.length > 0
          ).map((letter) => (
            <div
              key={letter}
              id={`group-${letter}`}
              className="scroll-mt-32"
            >
              <div className="flex items-baseline gap-4">
                <h2 className="mb-0 text-2xl font-semibold text-[#0a1f63]">
                  {letter}
                </h2>
                <span className="text-sm text-[#4d5b7c]">
                  ({groupedEntries[letter].length}{' '}
                  {groupedEntries[letter].length === 1
                    ? 'term'
                    : 'terms'}
                  )
                </span>
              </div>

              <div className="mt-4 space-y-4">
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
          ))}
        </section>
      </div>
      </div>
    </div>
  );
};

export default GlossaryPage;
