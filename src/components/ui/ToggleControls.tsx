"use client";

import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useApp } from "@/context/AppProviders";

const LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "ar", label: "ع", name: "العربية" },
] as const;

export default function ToggleControls({
  className = "",
}: {
  className?: string;
}) {
  const { lang, theme, toggleTheme, toggleLang } = useApp();
  const isDark = theme === "dark";

  return (
    <div
      className={`glass-capsule flex items-center gap-1 rounded-full p-1 ${className}`}
    >
      {/* Language: segmented switch with a sliding pill */}
      <div role="radiogroup" aria-label="Language" className="flex items-center">
        {LANGS.map(({ code, label, name }) => {
          const active = lang === code;
          return (
            <button
              key={code}
              role="radio"
              aria-checked={active}
              aria-label={name}
              onClick={() => !active && toggleLang()}
              className={`relative h-8 min-w-[2.25rem] rounded-full px-2.5 text-xs font-bold tracking-wide transition-colors duration-300 sm:h-9 sm:min-w-[2.5rem] ${
                active ? "text-night-900" : "text-muted hover:text-fg"
              } ${code === "ar" ? "font-serif text-sm" : ""}`}
            >
              {active && (
                <motion.span
                  layoutId="lang-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 rounded-full bg-accent-gradient shadow-glow-sm"
                />
              )}
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>

      <span aria-hidden="true" className="h-5 w-px bg-card/10" />

      {/* Theme: sun/moon crossfade */}
      <button
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full text-accent-glow transition-colors duration-300 hover:bg-card/[0.06] sm:h-9 sm:w-9"
      >
        <FiMoon
          size={16}
          className={`absolute transition-all duration-500 ease-out ${
            isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
          }`}
        />
        <FiSun
          size={16}
          className={`absolute transition-all duration-500 ease-out ${
            isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </button>
    </div>
  );
}
