import { ReactNode } from "react";

interface MotionHeroProps {
  children: ReactNode;
}

export function MotionHero({ children }: MotionHeroProps) {
  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 pb-12 sm:pb-14 lg:pb-16 relative overflow-hidden">
      <div className="hero-motion-bg absolute inset-0 -z-10" aria-hidden="true" />
      <div className="max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-20 relative z-10">
        {children}
      </div>
    </section>
  );
}
