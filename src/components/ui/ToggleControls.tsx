"use client";

import { FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useApp } from "@/context/AppProviders";

export default function ToggleControls({
  className = "",
}: {
  className?: string;
}) {
  const { theme, toggleTheme, toggleLang, t } = useApp();

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2 ${className}`}>
      {/* Language toggle */}
      <button
        onClick={toggleLang}
        className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-gradient-to-b from-night-600 to-night-800 px-3 py-2 text-[11px] font-bold tracking-wide text-fg shadow-glow-sm ring-1 ring-inset ring-white/5 transition-all duration-200 hover:border-accent hover:from-accent/20 hover:to-accent/10 hover:text-accent-glow hover:shadow-glow active:scale-95 sm:gap-2 sm:px-4 sm:text-xs"
        aria-label="Toggle language"
      >
        <FiGlobe
          size={15}
          className="text-accent-glow transition-transform duration-300 group-hover:rotate-[25deg]"
        />
        <span className="min-w-[3ch] text-center sm:min-w-[3.5ch]">{t.toggles.lang}</span>
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-gradient-to-b from-night-600 to-night-800 text-accent-glow shadow-glow-sm ring-1 ring-inset ring-white/5 transition-all duration-200 hover:border-accent hover:from-accent/20 hover:to-accent/10 hover:shadow-glow active:scale-95 sm:h-10 sm:w-10"
        aria-label="Toggle dark / light mode"
      >
        {theme === "dark" ? <FiMoon size={16} /> : <FiSun size={16} />}
      </button>
    </div>
  );
}
