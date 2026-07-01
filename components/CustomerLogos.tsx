"use client";

const LOGOS = [
  { name: "Dr. Reddy's",        src: "/logos/dr-reddys.svg" },
  { name: "Infogain",           src: "/logos/infogain.svg" },
  { name: "Max Life Insurance", src: "/logos/axis-max-life-insurance-logo.svg" },
  { name: "Shaw Industries",    src: "/logos/logo-dark-Shaw.png" },
  { name: "SISL Infotech",      src: "/logos/logo-light-sisl.svg" },
  { name: "Ginesys",            src: "/logos/ginesys-light.svg" },
  { name: "Ken42",              src: "/logos/ken42-dark.png" },
  { name: "PiChain",            src: "/logos/pichain.png" },
  { name: "Optimile",           src: "/logos/optimile.png" },
  { name: "Aura ML",            src: "/logos/aura-ml.png" },
  { name: "Autoflow",           src: "/logos/autoflow.png" },
  { name: "Climaty AI",         src: "/logos/climaty-ai.png" },
  { name: "Doqfy",              src: "/logos/doqfy.png" },
  { name: "Skylark",            src: "/logos/skylark.png" },
];

export function CustomerLogos() {
  return (
    <section className="bg-cv-surface py-14 lg:py-20" data-testid="section-customer-logos">
      <div className="cv-container">
        <p className="text-center text-sm text-cv-muted mb-12 tracking-wide">
          The teams trusting us with their cloud and AI spend
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 lg:gap-x-16 lg:gap-y-12">
          {LOGOS.map((l) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={l.name}
              src={l.src}
              alt={l.name}
              loading="lazy"
              decoding="async"
              className="h-8 w-auto max-h-8 object-contain brightness-0 dark:invert opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
