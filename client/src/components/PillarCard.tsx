import { LucideIcon } from "lucide-react";
import { Link } from "wouter";

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  outcome?: string;
}

export function PillarCard({ icon: Icon, title, description, outcome }: PillarCardProps) {
  return (
    <div className="rounded-2xl border border-cv-line bg-cv-surface2/50 dark:bg-white/5 p-6 sm:p-7 hover:bg-cv-surface2 dark:hover:bg-white/[0.06] transition-all duration-300 h-full flex flex-col">
      <Icon className="w-10 h-10 text-blue-400 mb-4" />
      <h3 className="text-lg sm:text-xl font-semibold text-cv-ink mb-3">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-cv-muted leading-relaxed mb-4">
        {description}
      </p>
      {outcome && (
        <p className="text-xs sm:text-sm text-cv-muted/70 italic mt-auto pt-2 border-t border-cv-line/30">
          {outcome}
        </p>
      )}
    </div>
  );
}
