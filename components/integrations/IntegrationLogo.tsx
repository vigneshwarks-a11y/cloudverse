"use client";

import { useState } from "react";

interface IntegrationLogoProps {
  name: string;
  logo?: { src: string; alt: string; invert?: boolean };
  size?: number;
}

function getInitials(name: string): string {
  const words = name.replace(/[:\-()]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export function IntegrationLogo({ name, logo, size = 22 }: IntegrationLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = getInitials(name);

  if (!logo?.src || imgFailed) {
    return (
      <div
        className="rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center text-[10px] font-semibold text-white/65 shrink-0"
        style={{ height: size, width: size }}
        aria-label={`${name} logo`}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.alt}
      className="object-contain shrink-0 brightness-0 invert"
      style={{ height: size, width: size }}
      onError={() => setImgFailed(true)}
    />
  );
}
