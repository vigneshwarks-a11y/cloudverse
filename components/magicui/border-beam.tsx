"use client";

import { motion, type Transition } from "framer-motion";
import type { CSSProperties } from "react";

/* Magic UI BorderBeam - a light beam that travels around the border of its
   (relatively-positioned, overflow-hidden, rounded) parent. Ported to use the
   project's framer-motion. Defaults to a white beam. */

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: Transition;
  className?: string;
  style?: CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
}

export function BorderBeam({
  className = "",
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffffff",
  colorTo = "#ffffff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent"
      style={{
        // Canonical "gradient border" mask: reveal only the 1px border ring so
        // the travelling beam reads as a thin stroke, not a soft square.
        WebkitMask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
        mask: "linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <motion.div
        className={
          "absolute aspect-square bg-gradient-to-l from-[var(--beam-from)] via-[var(--beam-to)] to-transparent " +
          className
        }
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--beam-from": colorFrom,
            "--beam-to": colorTo,
            ...style,
          } as CSSProperties
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
}
