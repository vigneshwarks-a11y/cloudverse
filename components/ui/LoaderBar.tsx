"use client";

const DURATION_MS = 5000;

interface LoaderBarProps {
  /** Whether this item is active — shows the animated fill */
  active?: boolean;
  /** Duration in ms — defaults to 5000 */
  duration?: number;
  /** Key to remount and restart the animation */
  animKey?: number | string;
  paused?: boolean;
}

/**
 * Animated progress bar using brand blue scale from design-tokens.md.
 * Track always visible. Fill animates only when active=true.
 * blue-400 (#4D9AEF) → blue-500 (#2278E0) → blue-400 (#4D9AEF)
 */
export function LoaderBar({ active = false, duration = DURATION_MS, animKey, paused }: LoaderBarProps) {
  return (
    <div className="mt-4 h-px w-full bg-cv-line/60 relative overflow-visible rounded-full">
      {active && (
        <div
          key={animKey}
          className="absolute left-0 origin-left rounded-full"
          style={{
            top: "-0.5px",
            height: "2px",
            width: "100%",
            background: "linear-gradient(to right, #4D9AEF, #2278E0, #4D9AEF)",
            boxShadow: "none",
            transform: "scaleX(0)",
            animation: `cv-loader-fill ${duration}ms linear forwards`,
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      )}
    </div>
  );
}
