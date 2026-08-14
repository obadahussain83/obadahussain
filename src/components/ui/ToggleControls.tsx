"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiSun, FiMoon, FiGlobe } from "react-icons/fi";
import { useApp } from "@/context/AppProviders";

// Deeper, clearly-visible press. Spring so an interrupted tap reverses smoothly.
const press = { scale: 0.82 } as const;
const spring = { type: "spring" as const, stiffness: 400, damping: 17 };

export default function ToggleControls({
  className = "",
}: {
  className?: string;
}) {
  const { theme, toggleTheme, toggleLang, t } = useApp();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Language toggle */}
      <motion.button
        onClick={toggleLang}
        whileTap={press}
        transition={spring}
        className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-gradient-to-b from-night-600 to-night-800 px-4 py-2 text-xs font-bold tracking-wide text-fg shadow-glow-sm ring-1 ring-inset ring-white/5 transition-all duration-200 hover:border-accent hover:from-accent/20 hover:to-accent/10 hover:text-accent-glow hover:shadow-glow"
        aria-label="Toggle language"
      >
        <FiGlobe
          size={15}
          className="text-accent-glow transition-transform duration-300 group-hover:rotate-[25deg]"
        />
        <span className="min-w-[3.5ch] text-center">{t.toggles.lang}</span>
      </motion.button>

      {/* Theme toggle */}
      <motion.button
        onClick={toggleTheme}
        whileTap={press}
        transition={spring}
        className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-gradient-to-b from-night-600 to-night-800 text-accent-glow shadow-glow-sm ring-1 ring-inset ring-white/5 transition-all duration-200 hover:border-accent hover:from-accent/20 hover:to-accent/10 hover:shadow-glow"
        aria-label="Toggle dark / light mode"
      >
        <AnimatePresence initial={false} mode="wait">
          {theme === "dark" ? (
            <motion.span
              key="moon"
              initial={{ y: 14, rotate: -90, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: -14, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inline-flex"
            >
              <FiMoon size={16} />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ y: 14, rotate: -90, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: -14, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inline-flex"
            >
              <FiSun size={16} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
