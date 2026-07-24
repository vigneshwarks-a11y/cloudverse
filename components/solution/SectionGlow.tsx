/* Ambient blue radial wash across the top of a section, behind the header —
   the same treatment as the home "Day one" section (AgentryGovernance). Two
   variants swapped by theme: a stronger blue in dark mode, a softer tint in
   light. Slightly blurred so the glow reads as light, not a hard shape.

   Usage: drop as the first child of a `relative overflow-hidden` section and
   keep the section's real content in a `relative z-10` wrapper so it paints
   above this overlay. */
export function SectionGlow() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[460px] dark:block"
        style={{
          background:
            "radial-gradient(58% 105% at 32% -8%, rgba(46,107,214,0.58) 0%, rgba(22,100,192,0.26) 40%, transparent 74%), radial-gradient(46% 95% at 66% -6%, rgba(77,154,239,0.36) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 block h-[460px] dark:hidden"
        style={{
          background:
            "radial-gradient(58% 105% at 32% -8%, rgba(120,170,255,0.30) 0%, rgba(150,190,255,0.12) 42%, transparent 74%), radial-gradient(46% 95% at 66% -6%, rgba(160,200,255,0.20) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </>
  );
}

export default SectionGlow;
