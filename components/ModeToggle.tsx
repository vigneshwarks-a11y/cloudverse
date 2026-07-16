"use client";

import { Moon, Sun } from "@/lib/solar-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-md text-cv-ink/70 hover:text-cv-ink hover:bg-cv-ink/5 transition-colors"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      data-testid="button-mode-toggle"
      type="button"
      suppressHydrationWarning
    >
      {isDark ? <Sun weight="Linear" size={18} /> : <Moon weight="Linear" size={18} />}
    </button>
  );
}
