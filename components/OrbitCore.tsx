"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu, DollarMinimalistic, FileText, Global, Ranking, Route } from "@solar-icons/react";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, useGSAP);

/* OrbitCore - an atom-style diagram: a 3D isometric cube at the centre, three
   orbiting ellipses and six labelled pills that pop in. Fires once on scroll
   into view (respects reduced-motion). Ported from the vanilla GSAP preview to
   a React client component and made theme-aware: the cube keeps its brand blue
   while orbit lines and pills read from the cv-* design tokens so it works in
   light+dark. */

const VB_W = 1200;
const VB_H = 840;
const CX = 600;
const CY = 400;
const RX = 340;
const RY = 150;
const ORBITS = [90, 30, 150];

const PILL_POS = [
  { x: 600, y: 92 },
  { x: 925, y: 245 },
  { x: 900, y: 505 },
  { x: 600, y: 680 },
  { x: 325, y: 505 },
  { x: 300, y: 245 },
];
const POP_ORDER = [4, 2, 5, 1, 0, 3];

const DEFAULT_LABELS = [
  "Model selection",
  "Provider scoring",
  "Cost controls",
  "Residency rules",
  "Latency routing",
  "Compliance log",
];

// One icon per pill (clockwise from top), matching the default labels.
const DEFAULT_ICONS: ReactNode[] = [
  <Cpu key="i0" weight="Linear" size={20} />,
  <Ranking key="i1" weight="Linear" size={20} />,
  <DollarMinimalistic key="i2" weight="Linear" size={20} />,
  <Global key="i3" weight="Linear" size={20} />,
  <Route key="i4" weight="Linear" size={20} />,
  <FileText key="i5" weight="Linear" size={20} />,
];

// Cube face + edge colours (brand blue - legible on both themes).
const FACE_TOP = "#2545FF";
const FACE_RIGHT = "#1E38D6";
const FACE_LEFT = "#1B32BE";
const EDGE = "#9FB0FF";

function cubePolys(cx: number, cy: number, s: number, h: number) {
  return {
    top: `${cx},${cy - h / 2 - s * 0.5} ${cx + s},${cy - h / 2} ${cx},${cy - h / 2 + s * 0.5} ${cx - s},${cy - h / 2}`,
    right: `${cx},${cy - h / 2 + s * 0.5} ${cx + s},${cy - h / 2} ${cx + s},${cy + h / 2} ${cx},${cy + h / 2 + s * 0.5}`,
    left: `${cx},${cy - h / 2 + s * 0.5} ${cx - s},${cy - h / 2} ${cx - s},${cy + h / 2} ${cx},${cy + h / 2 + s * 0.5}`,
  };
}

function ellipsePath(rx: number, ry: number) {
  return `M ${CX - rx} ${CY} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
}

const SOLID = cubePolys(CX, CY, 78, 108);
const GS = 78 * 2.4;
const GH = 108 * 2.4;
const GHOST = cubePolys(CX, CY, GS, GH);

type OrbitCoreProps = {
  brand?: string;
  labels?: string[];
  icons?: ReactNode[];
  className?: string;
};

export default function OrbitCore({
  brand = "AIX",
  labels = DEFAULT_LABELS,
  icons = DEFAULT_ICONS,
  className = "",
}: OrbitCoreProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const solid = ".oc-solid";
      const ghost = ".oc-ghost";
      const brandEl = ".oc-brand";
      const orbits = gsap.utils.toArray<SVGPathElement>(".oc-orbit");
      const pills = gsap.utils.toArray<HTMLElement>(".oc-pill");

      gsap.set(solid, { transformOrigin: "center center" });
      gsap.set(ghost, { transformOrigin: "center center" });

      if (reduce) {
        gsap.set(solid, { scale: 1, opacity: 1 });
        gsap.set(brandEl, { opacity: 1 });
        gsap.set(ghost, { opacity: 0.18, scale: 1 });
        gsap.set(orbits, { opacity: 0.35 });
        gsap.set(pills, { opacity: 1, scale: 1, xPercent: -50, yPercent: -50 });
        return;
      }

      // Gentle, continuous cube "breathing" that runs after the entrance.
      const startAmbient = () => {
        gsap.to(solid, { y: -6, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(ghost, { opacity: 0.2, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      };

      const prime = (arr: SVGPathElement[]) =>
        arr.forEach((e) => {
          const len = e.getTotalLength();
          gsap.set(e, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
        });
      prime(orbits);

      gsap.set(solid, { scale: 1.9, opacity: 0 });
      gsap.set(brandEl, { opacity: 0 });
      gsap.set(ghost, { scale: 1.15, opacity: 0 });
      gsap.set(pills, { opacity: 0, scale: 0.25, xPercent: -50, yPercent: -50 });
      gsap.set(stageRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: stageRef.current, start: "top 80%", once: true },
      });
      tl.to(stageRef.current, { opacity: 1, duration: 0.35 }, 0)
        .to(solid, { scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.1)
        .to(brandEl, { opacity: 1, duration: 0.5 }, 0.55)
        .to(orbits, { strokeDashoffset: 0, opacity: 0.35, duration: 1.1, ease: "power2.inOut", stagger: 0.12 }, 0.3)
        .to(ghost, { opacity: 0.18, scale: 1, duration: 0.4, ease: "power2.out" }, 0.9);

      POP_ORDER.forEach((idx, k) => {
        const at = 1.1 + k * 0.15;
        const dx = (CX - PILL_POS[idx].x) * 0.12;
        const dy = (CY - PILL_POS[idx].y) * 0.12;
        tl.fromTo(
          pills[idx],
          { opacity: 0, scale: 0.25, x: dx, y: dy, xPercent: -50, yPercent: -50 },
          { opacity: 1, scale: 1, x: 0, y: 0, xPercent: -50, yPercent: -50, duration: 0.6, ease: "back.out(1.7)" },
          at
        );
      });

      tl.add(startAmbient, 1.2);
    },
    { scope: stageRef }
  );

  return (
    <div className={`relative w-full origin-center scale-[0.7] -my-[10%] ${className}`}>
      <div
        ref={stageRef}
        className="relative mx-auto w-full max-w-[1200px]"
        style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          aria-hidden
        >
          {/* orbits */}
          {ORBITS.map((rot, i) => (
            <path
              key={`orbit-${i}`}
              className="oc-orbit"
              d={ellipsePath(RX, RY)}
              transform={`rotate(${rot} ${CX} ${CY})`}
              fill="none"
              strokeWidth={1}
              style={{ stroke: "hsl(var(--cv-ink))" }}
            />
          ))}

          {/* ghost cube */}
          <g className="oc-ghost">
            <polygon points={GHOST.top} fill={FACE_TOP} />
            <polygon points={GHOST.left} fill={FACE_TOP} />
            <polygon points={GHOST.right} fill={FACE_TOP} />
          </g>

          {/* solid cube */}
          <g className="oc-solid">
            <polygon points={SOLID.left} fill={FACE_LEFT} stroke={EDGE} strokeOpacity={0.6} />
            <polygon points={SOLID.right} fill={FACE_RIGHT} stroke={EDGE} strokeOpacity={0.6} />
            <polygon points={SOLID.top} fill={FACE_TOP} stroke={EDGE} strokeOpacity={0.6} />

            {/* wordmark laid flat on the isometric top face, centred on the face.
                matrix maps the label's x/y axes onto the two edges of the top
                rhombus (unit vectors ±(0.894, 0.447)) so it reads as painted on. */}
            <g className="oc-brand" transform={`translate(${CX},${CY - 54}) matrix(0.894,-0.447,0.894,0.447,0,0)`}>
              <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fontSize={17} fontWeight={800} fill="#fff" letterSpacing={0.5}>
                {brand}
              </text>
            </g>
          </g>
        </svg>

        {/* pills (HTML, absolutely positioned over the SVG) */}
        {PILL_POS.map((p, i) => (
          <div
            key={`pill-${i}`}
            className="oc-pill absolute flex h-[52px] items-center gap-2.5 whitespace-nowrap rounded-full border border-cv-line bg-cv-card px-[18px] text-[16px] font-medium text-cv-ink shadow-[0_2px_12px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
            style={{ left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%`, opacity: 0 }}
          >
            <span className="text-[#2545FF] dark:text-[#7CB8F8]">{icons[i] ?? DEFAULT_ICONS[i]}</span>
            <span>{labels[i] ?? DEFAULT_LABELS[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
