"use client";

import { useState } from "react";
import Image from "next/image";

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
        className="rounded-md bg-cv-ink/[0.05] border border-cv-line/10 flex items-center justify-center text-[10px] font-semibold text-cv-ink/65 shrink-0"
        style={{ height: size, width: size }}
        aria-label={`${name} logo`}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className="shrink-0 rounded-md bg-cv-ink/95 border border-black/5 flex items-center justify-center p-1"
      style={{ height: size, width: size }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={size}
        height={size}
        className="object-contain max-h-full max-w-full"
        onError={() => setImgFailed(true)}
        unoptimized={logo.src.endsWith(".svg")}
      />
    </div>
  );
}
