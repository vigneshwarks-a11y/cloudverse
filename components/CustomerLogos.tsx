"use client";

import Image from "next/image";

const LOGOS = [
  { name: "Dr. Reddy's",        src: "/logos/dr-reddys.svg" },
  { name: "Infogain",           src: "/logos/infogain.svg" },
  { name: "Max Life Insurance", src: "/logos/axis-max-life-insurance-logo.svg", box: "w-[132px] h-[44px]" },
  { name: "Shaw Industries",    src: "/logos/logo-dark-Shaw.png", box: "w-[120px] h-[56px]" },
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
      <div className="max-w-cv mx-auto px-5 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-cv-muted mb-12 tracking-wide">
          The teams trusting us with their cloud and AI spend
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-px border border-cv-line/20 overflow-hidden rounded-2xl bg-cv-line/20">
          {LOGOS.map((l) => (
            <div
              key={l.name}
              className="flex items-center justify-center p-6 lg:p-7 bg-cv-surface hover:bg-cv-ink/[0.03] transition-colors"
            >
              <div className={`relative ${l.box ?? "w-[96px] h-[30px]"}`}>
                <Image
                  src={l.src}
                  alt={l.name}
                  fill
                  sizes="128px"
                  loading="lazy"
                  className="object-contain brightness-0 dark:invert"
                  unoptimized={l.src.endsWith(".svg")}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
