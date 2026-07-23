/* Continues the hero's blue wash down over the top of the following section and
   fades it to transparent, so the SolutionHero and the section beneath it read
   as one continuous blue band — the same handoff the home hero makes into
   CustomerLogos (and resources/about into their first sections). The start
   values (0.24 light / 0.5 dark) match the hero gradient's solid-blue bottom so
   there's no seam.

   Usage: drop as the first child of a `relative overflow-hidden` section and
   keep that section's real content in a `relative z-10` wrapper so it paints
   above this overlay. */
export function HeroBlend() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[linear-gradient(180deg,rgba(20,71,230,0.24)_0%,rgba(20,71,230,0.08)_42%,transparent_78%)] dark:bg-[linear-gradient(180deg,rgba(20,71,230,0.5)_0%,rgba(20,71,230,0.16)_42%,transparent_78%)]"
    />
  );
}

export default HeroBlend;
