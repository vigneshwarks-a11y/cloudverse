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
// 10 of 17 logos below are pulled from Brandfetch's CDN (verified domain
// matches, see brandId in each URL's path). Infogain, PiChain, Optimile,
// Aura ML, Autoflow, and Doqfy use real logo files supplied directly, after
// Brandfetch's own scrapes for Aura ML and Optimile turned out wrong
// (Webflow's mark for Aura ML, a generic sun icon for Optimile). Skylark
// still has no confident domain match at all (generic name), so it's on its
// original placeholder /logos/ asset.
//
// Several logos carry a light/dark pair and swap per theme via `srcDark` —
// two stacked <img>s toggled with the dark: variant, no JS theme detection
// needed. Two kinds of pair are in use:
//   - Local supplied files (Infogain, Doqfy, Optimile, Aura ML): a real
//     dark-ink asset for light mode + white asset for dark mode.
//   - Brandfetch theme pair (Dr. Reddy's, Berkshire/EWM, Ginesys): these
//     brands' logos are dark/near-black, so the default `theme/dark` asset
//     (dark-COLOURED, meant for light backgrounds) was invisible on the
//     black dark-mode surface and left blank gaps in the marquee. Their
//     `theme/light` (white) variant is used as `srcDark` so they show up in
//     dark mode. Brandfetch logos that are already mid-toned/colourful
//     (Axis Max, SISL, Ken42, PiChain, Climaty, XLSMART, Carlsberg,
//     Redington) stay single-asset — they read fine on black in colour, and
//     their `theme/light` version is pure white, which would drop the brand
//     colour.
// Every logo renders bare on cv-surface. NOTE: Autoflow's single asset is
// white-on-transparent, so it reads well in dark mode but is nearly invisible
// on the light surface — it still needs a light-mode (dark-ink) variant.

type LogoItem = { name: string; src: string; srcDark?: string };

const LOGOS: LogoItem[] = [
  { name: "Dr. Reddy's",             src: "https://cdn.brandfetch.io/idOmE7g2cc/theme/dark/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX", srcDark: "https://cdn.brandfetch.io/idOmE7g2cc/theme/light/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "Infogain",                src: "/logos/Infogain_B.svg", srcDark: "/logos/Infogain_W.svg" },
  { name: "Axis Max Life Insurance", src: "https://cdn.brandfetch.io/id84WPaTnV/theme/dark/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "Berkshire Hathaway HomeServices EWM Realty", src: "https://cdn.brandfetch.io/idEiIx5A8Y/w/470/h/109/theme/dark/logo.png?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX", srcDark: "https://cdn.brandfetch.io/idEiIx5A8Y/w/470/h/109/theme/light/logo.png?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "SISL Infotech",           src: "https://cdn.brandfetch.io/idd_1Ax5DU/w/126/h/35/theme/dark/logo.png?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "Ginesys",                 src: "https://cdn.brandfetch.io/idkMnF4l3t/theme/dark/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX", srcDark: "https://cdn.brandfetch.io/idkMnF4l3t/theme/light/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "Ken42",                   src: "https://cdn.brandfetch.io/idbv-H_Oqk/theme/dark/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "PiChain",                 src: "/logos/PiChain.webp" },
  { name: "Optimile",                src: "/logos/optimile-logo-b.svg", srcDark: "/logos/optimile-logo-w.svg" },
  { name: "Aura ML",                 src: "/logos/AuraML-B.png", srcDark: "/logos/AuraML-W.png" },
  { name: "Autoflow",                src: "/logos/autoflow.png" },
  { name: "Climaty AI",              src: "https://cdn.brandfetch.io/idEReYQXhd/theme/dark/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "Doqfy",                   src: "/logos/DOQFY-B.svg", srcDark: "/logos/DOQFY-W.svg" },
  { name: "Skylark",                 src: "/logos/bf-skylark.png" },
  { name: "XLSMART",                 src: "https://cdn.brandfetch.io/idbeI2bHG3/theme/dark/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "Carlsberg Group",         src: "https://cdn.brandfetch.io/id0vDuqpCP/theme/dark/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
  { name: "Redington Limited",       src: "https://cdn.brandfetch.io/id2gu3PiO0/theme/dark/logo.svg?c=1bxcp1ff0nd3xb7v4zxxu48381x3shpjwQX" },
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
