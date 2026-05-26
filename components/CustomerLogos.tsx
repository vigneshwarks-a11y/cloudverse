"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

type Logo = {
  name: string;
  srcLight?: string;
  srcDark?: string;
  src?: string;
  className?: string;
};

const LOGOS: Logo[] = [
  { name: "Dr. Reddy's",         src: "/logos/dr-reddys.svg",                                                                        className: "brightness-110" },
  { name: "Infogain",            src: "/logos/infogain.svg",                                                                          className: "brightness-110" },
  { name: "Max Life Insurance",  src: "/logos/axis-max-life-insurance-logo.svg",                                                      className: "brightness-110" },
  { name: "Shaw Industries",     src: "/logos/logo-dark-Shaw.png",                                                                    className: "invert dark:invert-0 brightness-150 h-12 sm:h-16" },
  { name: "SISL Infotech",       srcLight: "/logos/logo-1-1-sisl.svg",       srcDark: "/logos/logo-light-sisl.svg" },
  { name: "Ginesys",             srcLight: "/logos/ginesys-dark.png",        srcDark: "/logos/ginesys-light.svg" },
  { name: "Ken42",               srcLight: "/logos/ken42.png",               srcDark: "/logos/ken42-dark.png" },
  { name: "PiChain",             src: "/logos/pichain.png",                                                                           className: "invert dark:invert-0" },
  { name: "Optimile",            src: "/logos/optimile.png",                                                                          className: "invert dark:invert-0" },
  { name: "Aura ML",             src: "/logos/aura-ml.png",                                                                           className: "invert dark:invert-0" },
  { name: "Autoflow",            src: "/logos/autoflow.png",                                                                          className: "invert dark:invert-0" },
  { name: "Climaty AI",          src: "/logos/climaty-ai.png",                                                                        className: "invert dark:invert-0 h-7 sm:h-8" },
  { name: "Doqfy",               src: "/logos/doqfy.png",                                                                             className: "invert dark:invert-0 brightness-125 h-9 sm:h-10" },
  { name: "Skylark",             src: "/logos/skylark.png",                                                                           className: "invert dark:invert-0" },
];

function srcFor(l: Logo, isDark: boolean) {
  if (isDark) return l.srcDark || l.src || l.srcLight || "";
  return l.srcLight || l.src || l.srcDark || "";
}

export function CustomerLogos() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <section className="py-10 sm:py-12 lg:py-14 overflow-hidden bg-cv-surface" data-testid="section-customer-logos">
      <div className="cv-container">
        <div className="relative overflow-hidden" suppressHydrationWarning>
          <div className="flex">
            <Strip isDark={isDark} grayscale={!isDark} />
            <Strip isDark={isDark} grayscale={!isDark} aria-hidden />
          </div>
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-cv-surface to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cv-surface to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Strip({ isDark, grayscale, ...rest }: { isDark: boolean; grayscale: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="flex items-center gap-x-12 sm:gap-x-16 lg:gap-x-20 animate-marquee shrink-0 pr-12 sm:pr-16 lg:pr-20"
      {...rest}
    >
      {LOGOS.map((l, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${l.name}-${i}`}
          src={srcFor(l, isDark)}
          alt={l.name}
          loading="lazy"
          decoding="async"
          className={`h-10 sm:h-12 w-auto object-contain opacity-90 shrink-0 ${grayscale ? "grayscale" : ""} ${l.className || ""}`}
        />
      ))}
    </div>
  );
}
