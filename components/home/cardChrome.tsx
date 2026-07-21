import type { CSSProperties } from "react";

/* Shared "Day one" mock-well chrome, factored out of AixGovernance so every
   product visual on the home page reads with the same treatment:
   a black/white well with a top-left light edge (bright gradient stroke +
   faint ambient blue corner bloom), and an optional bottom dissolve. */

// Gentle fade on just the bottom edge so a visual dissolves into the card
// surface without running off it. Use on wells whose content is meant to
// dissolve at the bottom; skip it on wells that fill edge-to-edge.
export const EDGE_FADE: CSSProperties = {
  WebkitMaskImage: "linear-gradient(to bottom,#000 82%,transparent 100%)",
  maskImage: "linear-gradient(to bottom,#000 82%,transparent 100%)",
};

// Top-left light edge: a bright gradient border stroke fading to transparent,
// plus a soft ambient blue bloom in the top-left corner. Render as the first
// child of a `relative overflow-hidden` well; content paints on top.
export function CardLightEdge() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          padding: "1.5px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 22%, rgba(255,255,255,0) 50%)",
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 -top-6 h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(200,218,255,0.13), transparent 70%)", filter: "blur(26px)" }}
      />
    </>
  );
}
