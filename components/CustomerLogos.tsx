"use client";

// Single-line infinite logo marquee scrolling right-to-left. The track holds
// two identical copies of the logo list so translating -50% loops seamlessly
// (shared .cv-marquee-track / cv-marquee keyframes in globals.css).
//
// Logos keep their original brand colours on a uniform white rounded chip (a
// chip is used because cv-surface flips pure-white ↔ pure-black between themes,
// which would otherwise wash out or hide a coloured mark).
//
// `bf-*` assets are official brand logos pulled from Brandfetch. `dk-*` assets
// are repo logos that ship built for dark backgrounds (colour icon + white
// wordmark); their near-white wordmarks were recoloured to dark ink so they
// read on the white chip while the colour icon is preserved (Brandfetch had no
// colour-on-light logo for these).

type LogoItem = { name: string; src: string };

const LOGOS: LogoItem[] = [
  { name: "Dr. Reddy's",             src: "/logos/bf-drreddys.svg" },
  { name: "Infogain",                src: "/logos/dk-infogain.png" },
  { name: "Axis Max Life Insurance", src: "/logos/bf-axismaxlife.svg" },
  { name: "Berkshire Hathaway HomeServices EWM Realty", src: "/logos/bf-bhhs-ewm.png" },
  { name: "SISL Infotech",           src: "/logos/bf-sisl.png" },
  { name: "Ginesys",                 src: "/logos/bf-ginesys.svg" },
  { name: "Ken42",                   src: "/logos/bf-ken42.png" },
  { name: "PiChain",                 src: "/logos/dk-pichain.png" },
  { name: "Optimile",                src: "/logos/dk-optimile.png" },
  { name: "Aura ML",                 src: "/logos/dk-aura-ml.png" },
  { name: "Autoflow",                src: "/logos/dk-autoflow.png" },
  { name: "Climaty AI",              src: "/logos/Climaty-logo.svg" },
  { name: "Doqfy",                   src: "/logos/bf-doqfy.svg" },
  { name: "Skylark",                 src: "/logos/bf-skylark.png" },
];

const MASK = {
  maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
} as const;

function Logo({ item, dup }: { item: LogoItem; dup?: boolean }) {
  return (
    <div className="mx-4 flex h-20 w-40 shrink-0 items-center justify-center rounded-xl bg-white px-6 shadow-sm ring-1 ring-black/5 sm:mx-5">
      <img
        src={item.src}
        alt={dup ? "" : item.name}
        loading="lazy"
        className="max-h-10 max-w-full object-contain"
      />
    </div>
  );
}

export function CustomerLogos() {
  return (
    <section className="bg-cv-surface py-14 lg:py-20" data-testid="section-customer-logos">
      <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-cv-muted mb-12 tracking-wide">
          The teams trusting us with their cloud and AI spend
        </p>
        <div className="relative w-full overflow-hidden" style={MASK}>
          <div className="cv-marquee-track flex w-max">
            <div className="flex items-center">
              {LOGOS.map((l) => (
                <Logo key={l.name} item={l} />
              ))}
            </div>
            <div className="flex items-center" aria-hidden="true">
              {LOGOS.map((l) => (
                <Logo key={`${l.name}-dup`} item={l} dup />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
