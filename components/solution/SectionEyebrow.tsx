import { Eyebrow, type EyebrowAccent } from "@/components/Eyebrow";

/* Thin wrapper over the shared Eyebrow so every /solutions/* page gets the
   same pill shape and GSAP scramble-in animation as the rest of the site,
   instead of the plain, non-animated <span> this used to render. */
export function SectionEyebrow({
  children,
  accent = "blue",
  className = "",
}: {
  children: string;
  accent?: EyebrowAccent;
  className?: string;
}) {
  return (
    <Eyebrow accent={accent} className={className}>
      {children}
    </Eyebrow>
  );
}
