export function SectionEyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-[#1664C0]/15 dark:bg-[#7CB8F8]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#1664C0] dark:text-[#7CB8F8] ${className}`}
    >
      {children}
    </span>
  );
}
