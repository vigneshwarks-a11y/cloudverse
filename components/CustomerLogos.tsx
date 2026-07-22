"use client";

// Two-row infinite logo marquee: row 1 scrolls right-to-left, row 2 scrolls
// left-to-right for visual rhythm. Each row holds two identical copies of its
// logo list so translating -50% loops seamlessly (shared .cv-marquee-track /
// .cv-marquee-track-reverse / cv-marquee keyframes in globals.css).
//
// Logos sit directly on cv-surface (no chip), at their original brand
// colours, all normalised to the same rendered height so the rows line up
// evenly.
//
// All logos are now self-hosted under /public/logos (no runtime Brandfetch
// CDN dependency — the CDN could serve an attribution/placeholder mark and
// added a third-party request on every page load). The `cv-*` files were
// pulled once from Brandfetch's verified brand records and committed to the
// repo; the rest (Infogain, PiChain, Optimile, Aura ML, Autoflow, Doqfy,
// Skylark) are supplied assets.
//
// Logos sit directly on cv-surface (no chip), at their original brand
// colours, all normalised to the same rendered height so the rows line up.
//
// Several carry a light/dark pair swapped per theme via `srcDark` — two
// stacked <img>s toggled with the dark: variant, no JS theme detection.
// Dark-inked marks (Dr. Reddy's, Berkshire/EWM, Ginesys, Infogain, Doqfy,
// Optimile, Aura ML) pair a dark asset for light mode with a white asset for
// dark mode. Colourful/mid-toned marks stay single-asset (they read on both).
// NOTE: Autoflow's single asset is white-on-transparent — fine in dark mode,
// nearly invisible on the light surface; still needs a light-mode variant.

type LogoItem = { name: string; src: string; srcDark?: string };

const LOGOS: LogoItem[] = [
  { name: "Dr. Reddy's",             src: "/logos/cv-drreddys.svg" },
  { name: "Infogain",                src: "/logos/Infogain_B.svg", srcDark: "/logos/Infogain_W.svg" },
  { name: "Axis Max Life Insurance", src: "/logos/cv-axismaxlife.svg" },
  { name: "Berkshire Hathaway HomeServices EWM Realty", src: "/logos/cv-bhhs-b.png", srcDark: "/logos/cv-bhhs-w.png" },
  { name: "SISL Infotech",           src: "/logos/cv-sisl.png" },
  { name: "Ginesys",                 src: "/logos/cv-ginesys-b.svg", srcDark: "/logos/cv-ginesys-w.svg" },
  { name: "Ken42",                   src: "/logos/cv-ken42.svg" },
  { name: "PiChain",                 src: "/logos/PiChain.webp" },
  { name: "Optimile",                src: "/logos/optimile-logo-b.svg", srcDark: "/logos/optimile-logo-w.svg" },
  { name: "Aura ML",                 src: "/logos/AuraML-B.png", srcDark: "/logos/AuraML-W.png" },
  { name: "Autoflow",                src: "/logos/autoflow.png" },
  { name: "Climaty AI",              src: "/logos/cv-climaty.svg" },
  { name: "Doqfy",                   src: "/logos/DOQFY-B.svg", srcDark: "/logos/DOQFY-W.svg" },
  { name: "Skylark",                 src: "/logos/bf-skylark.png" },
  { name: "XLSMART",                 src: "/logos/cv-xlsmart.svg" },
  { name: "Carlsberg Group",         src: "/logos/cv-carlsberg.svg" },
  { name: "Redington Limited",       src: "/logos/cv-redington.svg" },
];

const MASK = {
  maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
} as const;

function Logo({ item, dup }: { item: LogoItem; dup?: boolean }) {
  const imgClass = "h-9 w-auto max-w-[110px] object-contain";
  return (
    <div className="flex h-9 shrink-0 items-center justify-center">
      {item.srcDark ? (
        <>
          <img src={item.src} alt={dup ? "" : item.name} loading="lazy" className={`dark:hidden ${imgClass}`} />
          <img src={item.srcDark} alt="" aria-hidden loading="lazy" className={`hidden dark:block ${imgClass}`} />
        </>
      ) : (
        <img src={item.src} alt={dup ? "" : item.name} loading="lazy" className={imgClass} />
      )}
    </div>
  );
}

function Row({ items, reverse }: { items: LogoItem[]; reverse?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden" style={MASK}>
      <div className={`flex w-max gap-14 sm:gap-20 ${reverse ? "cv-marquee-track-reverse" : "cv-marquee-track"}`}>
        <div className="flex items-center gap-14 sm:gap-20">
          {items.map((l) => (
            <Logo key={l.name} item={l} />
          ))}
        </div>
        <div className="flex items-center gap-14 sm:gap-20" aria-hidden="true">
          {items.map((l) => (
            <Logo key={`${l.name}-dup`} item={l} dup />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CustomerLogos() {
  const mid = Math.ceil(LOGOS.length / 2);
  const row1 = LOGOS.slice(0, mid);
  const row2 = LOGOS.slice(mid);

  return (
    <section className="bg-cv-surface py-14 lg:py-20" data-testid="section-customer-logos">
      <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-cv-muted mb-12 tracking-wide">
          The teams trusting us with their cloud and AI spend
        </p>
        <div className="space-y-6">
          <Row items={row1} />
          <Row items={row2} reverse />
        </div>
      </div>
    </section>
  );
}
