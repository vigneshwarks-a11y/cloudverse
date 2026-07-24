"use client";

/* Pinned, one-pass stacked-card scroll section — wraps N full-viewport
   "panels" (each panel is whatever section content is passed as a child)
   and, on desktop with motion allowed, pins the group to the viewport while
   the user scrolls through it. Panels arrive one at a time, sliding up from
   below and landing on top of the stack — like pulling books out of a box
   one by one and setting each on top of the pile. The sequence runs
   1 → 2 → … → N exactly once (reversing the same way, un-stacking, on
   scroll-up), then releases the pin and lets the page continue normally
   below. Panel 1 never comes back around after the last panel — this is a
   single pass, not a loop.

   This module owns 100% of the animation/layout math. It knows nothing about
   what's inside a panel — HardcodeCost, CostOfNotRouting, etc. don't import
   GSAP or know they're inside this component. That separation is
   deliberate: it's the cleanest way to guarantee this component's own
   transform/opacity tweens never fight a panel's own internal animation —
   which is also why those three components were stripped back to static
   server components before being used here (a nested ScrollTrigger keyed to
   an element's own scroll position breaks the moment that element lives
   inside a pin: while pinned, the section never "scrolls into view" again in
   the normal sense, so a count-up or fade-in keyed that way plays once,
   hidden, behind opacity 0, and is never seen).

   ── The height problem ──
   The three panels have very different natural content heights (a dense
   table vs. three short cards), and each panel is itself a heading/eyebrow +
   a "visual" (the mockup UI — cards, table, comparison). Only the VISUAL
   portion should grow or shrink to fill the stage; the heading/eyebrow/copy
   must stay at their normal, designed size regardless of viewport height —
   scaling body text up or down to fit a viewport reads as broken, not
   deliberate. So each content component marks its own visual portion with a
   `data-fit-visual` attribute (the only thing panel content needs to know
   about this component — a plain HTML attribute, not a GSAP/animation
   concern). FitLayer below measures the panel's fixed (non-visual) height at
   its natural size, then scales ONLY the `data-fit-visual` element by
   whatever factor makes the whole panel exactly fill the stage:
     scale = (stageHeight − fixedHeight) / visualElement'sNaturalHeight
   capped at MAX_SCALE so an unusually tall monitor doesn't blow the mockup
   up to a comical size, and floored at MIN_SCALE so an unusually short one
   doesn't shrink it to illegibility.
   Scaling up would normally overflow the stage horizontally too, since
   transform:scale affects both axes — that's why the visual element's width
   is set to `100/scale%` before the transform: pre-shrinking (or
   pre-growing) the box by the inverse factor means the on-screen rendered
   width always lands back at exactly 100% of its column, no matter which
   direction the scale goes. This is the same ResizeObserver +
   transform:scale technique already used elsewhere in this codebase (see
   ScaledDashboard in AgentryOrchestration.tsx) — chosen over cropping
   (would silently hide real content — a table row, a stat — on a page whose
   entire job is presenting numbers people need to read) or per-panel
   internal scrolling (needs its own wheel-capture logic to coexist with the
   page-wide ScrollSmoother without fighting it; fragile to get right).
   Mobile and tablet never pin at all (see the breakpoint gate below), so
   they never deal with any of this — content just flows at its natural size.

   ── Responsive / fallback behavior ──
   Below the lg breakpoint, with prefers-reduced-motion, or if GSAP/JS never
   runs at all, this component never switches into pinned/overlay mode: the
   panels render in normal position:relative document flow, one after
   another, exactly like any other stack of sections. That IS the fallback —
   it's the default render, not a special case bolted on afterward, so there
   is nothing to "recover" if JS fails: the enhanced (pinned, sliding)
   behavior only switches on once GSAP has actually mounted and confirmed a
   matching, motion-safe, desktop viewport (`ready` below flips true only
   inside that confirmed branch). */

import { useEffect, useLayoutEffect, useRef, useState, Children, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ---- tunables -------------------------------------------------------- */

// The pin is a sequence of alternating phases, each measured in scroll px:
//   HOLD_PX  — the panel sits completely still (reading time). This is the
//              lever that makes the section feel slow enough to actually read
//              content: the higher it is, the longer you dwell on each panel
//              before anything moves.
//   MOVE_PX  — the next panel slides up and lands (the transition itself).
// Total pin distance = n holds + (n-1) moves. Tuned so most of the scroll is
// spent holding-still on readable content, not mid-animation.
const HOLD_PX = 440;
const MOVE_PX = 300;

// Debug: flip true to see ScrollTrigger's start/end/pin markers while tuning.
const SHOW_MARKERS = false;

// How much a panel's visual portion may grow/shrink to exactly fill the
// leftover stage height after the heading/copy's own natural size is
// reserved. Kept deliberately modest on the growth side (1.12) — a panel
// with noticeably shorter natural content (e.g. three short cards next to a
// dense table) needs a much bigger multiplier to fully close the gap, but at
// that point the enlarged padding/icons/text read as an accidental zoom
// rather than a deliberate layout; a small, consistent nudge across every
// panel looks intentional, a large one on just the shortest panel doesn't.
// 0.6 is a floor against illegible shrinkage on an unusually short viewport.
const MAX_SCALE = 1.12;
const MIN_SCALE = 0.6;

/* ------------------------------------------------------------------------ */

export function PinnedLoopCarousel({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [ready, setReady] = useState(false);

  const panels = Children.toArray(children);
  const n = panels.length;

  // useLayoutEffect (not useEffect) so the cleanup runs synchronously in
  // React's mutation phase — before the DOM node is detached on navigation.
  // pin: true wraps this section in a GSAP pin-spacer; if the revert ran in a
  // passive useEffect cleanup (after React already detached the node), React
  // would call removeChild on a section still nested in the spacer and throw
  // "removeChild … not a child of this node". Layout-effect cleanup unwraps
  // the spacer first, so the node is back where React expects it.
  useLayoutEffect(() => {
    // gsap.context scopes every ScrollTrigger/tween created inside it to this
    // component, and ctx.revert() on cleanup kills the pin, its pin-spacer,
    // and every tween — so a re-render or route change never leaves a
    // dangling ScrollTrigger (or a panel permanently stuck at opacity 0)
    // behind.
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only ever pin on desktop, and only with motion allowed. If this
      // query stops matching later (e.g. the window is resized narrower),
      // gsap.matchMedia automatically runs the function this callback
      // returns, which kills the trigger and flips `ready` back off — panels
      // fall back to plain stacked flow with no extra code needed.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        setReady(true);

        // Total pin length: every panel gets a HOLD (reading dwell); each
        // gap between panels gets a MOVE (the slide-in transition).
        const pinDistance = n * HOLD_PX + (n - 1) * MOVE_PX;

        // Maps raw scroll pixels (0…pinDistance) to a continuous `pos` in
        // [0, n-1] where an integer k means "panel k fully at rest" and a
        // fractional k + t (t in 0…1) means "panel k+1 is t-of-the-way through
        // sliding in". The key point: during a HOLD phase `pos` stays pinned
        // to an integer, so nothing moves and the panel is readable; `pos`
        // only ramps during the shorter MOVE phases. That flat-then-ramp
        // staircase is what turns continuous scrolling into read / advance /
        // read / advance instead of one nonstop drift.
        const posFromPx = (px: number) => {
          let acc = 0;
          for (let k = 0; k < n; k++) {
            if (px <= acc + HOLD_PX) return k; // holding on panel k
            acc += HOLD_PX;
            if (k < n - 1) {
              if (px <= acc + MOVE_PX) return k + (px - acc) / MOVE_PX; // moving k → k+1
              acc += MOVE_PX;
            }
          }
          return n - 1;
        };

        // Paints every panel's position/z-order for a given `pos`.
        // Panel i slides from below (translateY 100%) to rest (0%) as `pos`
        // travels i-1 → i; panel 0 has nothing before it so it just rests.
        // Each panel stays VISIBLE from the moment it starts arriving until
        // the NEXT panel has fully landed (pos reaches i+1) — that one-unit
        // overlap keeps a solid backdrop under the arriving panel the whole
        // time, so the stage never flashes empty between two panels. zIndex =
        // panel index, so later panels naturally stack over earlier ones and
        // scrolling back up just un-stacks them in reverse.
        const paint = (pos: number) => {
          panelRefs.current.forEach((el, i) => {
            if (!el) return;
            const t = Math.min(1, Math.max(0, pos - (i - 1))); // 0 below → 1 landed
            const translateY = i === 0 ? 0 : (1 - t) * 100;
            const isLast = i === n - 1;
            const visible = pos > i - 1 && (isLast || pos < i + 1);
            el.style.transform = `translateY(${translateY}%)`;
            el.style.opacity = visible ? "1" : "0";
            // Mirrors gsap's autoAlpha: a covered/not-yet-arrived panel also
            // gets visibility:hidden, so it can't be focused, clicked, or read
            // by a screen reader while off-stage or buried under a later panel.
            el.style.visibility = visible ? "visible" : "hidden";
            el.style.zIndex = String(i);
          });
        };

        paint(0); // paint the resting state before any scroll, avoids a flash

        const st = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: "+=" + pinDistance,
          pin: true,
          scrub: 1,
          markers: SHOW_MARKERS,
          onUpdate: (self) => paint(posFromPx(self.progress * pinDistance)),
        });

        return () => {
          setReady(false);
          st.kill();
        };
      });
    }, rootRef);

    // The pin's start/end must be measured against FINAL layout. When and how
    // to trigger that differs by how the page was reached:
    //
    //  • Hard load / refresh: readyState isn't "complete" yet, so wait for the
    //    window `load` event — by then fonts, images, and ScrollSmoother have
    //    all settled and a single refresh lands correctly. (This path already
    //    worked, which is why a manual refresh always fixed it.)
    //
    //  • Client-side navigation (Next router): the document loaded long ago,
    //    so readyState is ALREADY "complete" and `load` will never fire again.
    //    The old code called refresh() synchronously here — but that runs in
    //    the same tick this effect mounts, BEFORE the new page's layout and
    //    ScrollSmoother's content-height recalc have flushed, so the pin was
    //    measured against stale geometry and stuck (the black screen that only
    //    a manual refresh cleared). Instead, defer the refresh across a couple
    //    of animation frames (+ a timeout backstop) so it runs after layout
    //    and the smoother have caught up with the freshly-mounted page.
    let cancelled = false;
    const raf: number[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    const onLoad = () => refresh();

    if (document.readyState === "complete") {
      raf.push(requestAnimationFrame(() => raf.push(requestAnimationFrame(refresh))));
      timeouts.push(setTimeout(refresh, 200)); // backstop if the smoother lags a frame
    } else {
      window.addEventListener("load", onLoad);
    }
    // Self-hosted fonts can resolve after either path and shift heights.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(refresh);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      raf.forEach(cancelAnimationFrame);
      timeouts.forEach(clearTimeout);
      ctx.revert();
    };
  }, [n]);

  return (
    // `isolate` gives the stacked panels their own z-index context.
    // `overflow-hidden` (only while pinned) clips a panel while it's still
    // translated below the stage, so it doesn't visually bleed into
    // whatever comes after this section on the page.
    <section
      ref={rootRef}
      className={ready ? "relative isolate h-screen overflow-hidden" : "relative isolate"}
    >
      {panels.map((child, i) => (
        <FitLayer
          key={i}
          ready={ready}
          setRef={(el) => {
            panelRefs.current[i] = el;
          }}
        >
          {child}
        </FitLayer>
      ))}
    </section>
  );
}

export default PinnedLoopCarousel;

/* One panel's stage anchor + scale-to-fit layer. Only the panel's own
   `[data-fit-visual]` element is scaled — the heading/eyebrow/copy above it
   stays at natural size. See the height-problem note at the top of this
   file for the full reasoning. */
function FitLayer({
  ready,
  setRef,
  children,
}: {
  ready: boolean;
  setRef: (el: HTMLDivElement | null) => void;
  children: ReactNode;
}) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ready) return; // fallback flow: nothing to measure, nothing to scale
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const measure = () => {
      const visual = inner.querySelector<HTMLElement>("[data-fit-visual]");
      if (!visual) return; // no marked visual portion — leave at natural size

      // Reset any compensation from a previous measure before reading sizes,
      // so naturalVisualH/inner.scrollHeight below are always against a
      // clean, unscaled, unpadded, un-narrowed layout — otherwise a leftover
      // width/margin from the last measure would leak into this one's
      // numbers and the scale could drift instead of converging.
      visual.style.width = "100%";
      visual.style.marginBottom = "0px";

      const stageH = outer.clientHeight;
      // scrollHeight reflects layout size, which transform never changes —
      // so this is always the visual element's true natural height, even
      // after we've already applied a scale to it on a previous measure.
      const naturalVisualH = visual.scrollHeight;
      const fixedH = inner.scrollHeight - naturalVisualH; // heading/copy/gaps, at natural size
      const availableForVisual = stageH - fixedH;
      if (naturalVisualH <= 0 || availableForVisual <= 0) return;

      const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, availableForVisual / naturalVisualH));
      // "top left" (not "center"): the pre-scaled box is narrower/wider than
      // 100% and left-aligned (its left edge already sits at the column's
      // left edge), so anchoring the scale at its own top-left corner keeps
      // that corner fixed and grows the box outward to exactly 0–100% of
      // the column. Anchoring at "center" would scale around the NARROWED
      // box's own midpoint instead of the column's true center, shifting
      // the result off to one side and clipping the opposite edge.
      visual.style.transformOrigin = "top left";
      visual.style.transform = `scale(${scale})`;
      // Pre-compensate width by the inverse of the scale so the on-screen
      // rendered width always lands back at exactly 100% of its column —
      // otherwise scaling up to fill height would also scale the visual
      // wider than its box (transform:scale affects both axes).
      visual.style.width = `${100 / scale}%`;
      // transform never changes layout size, only paint — so without this,
      // scaling UP leaves the document reserving only the ORIGINAL (smaller)
      // space, and whatever sits after this element in the panel's own
      // markup (e.g. the result banner below the table) gets positioned
      // where the small, unscaled box would have ended, while the visually
      // larger box paints right over it. Push (or, if shrinking, pull) the
      // next sibling by exactly the delta between scaled and natural height
      // so the reserved space actually matches what's on screen.
      visual.style.marginBottom = `${naturalVisualH * (scale - 1)}px`;
    };

    measure();
    // Only observe `outer` — its size comes purely from the stage (the
    // section's viewport height, via absolute inset-0), never from anything
    // inside it, so it only fires on a genuine window/layout resize. Do NOT
    // also observe `inner`/`visual`: measure() itself changes their width and
    // margin every time it runs, so observing them would mean our own write
    // re-triggers the same observer — a feedback loop that fires every
    // frame, fighting the scroll-driven paint() for the same frame budget
    // and reading as visible jank/flicker while scrolling.
    const ro = new ResizeObserver(measure);
    ro.observe(outer);
    // Fonts/images settling after mount can still change the visual's
    // natural height once, after `outer` has already stopped resizing —
    // re-measure on window load to catch that, same pattern as the pin's
    // own ScrollTrigger.refresh() in the parent component.
    const onLoad = () => measure();
    if (document.readyState === "complete") measure();
    else window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      ro.disconnect();
    };
  }, [ready]);

  return (
    <div
      ref={(el) => {
        outerRef.current = el;
        setRef(el);
      }}
      className={
        ready
          ? // flex + justify-center: when a panel's natural height (after
            // fit-scaling) still falls short of the stage, split the
            // leftover space evenly above/below instead of leaving it all
            // stacked at the bottom under top-aligned content.
            "absolute inset-0 flex flex-col justify-center overflow-hidden"
          : "relative"
      }
    >
      <div ref={innerRef} className="w-full">
        {children}
      </div>
    </div>
  );
}
