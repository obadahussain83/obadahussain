"use client";

import { useRef } from "react";
import { FiDownload } from "react-icons/fi";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

interface DownloadCVButtonProps {
  href: string;
  label: string;
}

/**
 * Primary "Download CV" call-to-action.
 *
 * Craft notes (why it pulls the eye without being annoying):
 *  - Magnetic: the button eases toward the cursor via a spring, so it feels
 *    "alive" and invites the click. Decorative only — gated behind a fine
 *    pointer and disabled under reduce-motion.
 *  - A slow ambient glow breathes underneath to draw attention at rest.
 *  - A light sheen sweeps across on hover.
 *  - scale(0.97) on press for instant, responsive feedback.
 */
export default function DownloadCVButton({
  href,
  label,
}: DownloadCVButtonProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  // Raw pointer offset from the button center.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Spring-smoothed so the motion has momentum instead of tracking 1:1.
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    // Pull ~30% of the distance toward the cursor.
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download="Obada-Hussein-CV.pdf"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className="group relative mt-8 inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-night-900 shadow-glow transition-shadow duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:shadow-glow-lg"
    >
      {/* Ambient breathing glow behind the button (attention at rest) */}
      {!reduceMotion && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-accent-gradient opacity-50 blur-lg animate-pulse-glow"
        />
      )}

      {/* Sheen that sweeps across on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-full motion-reduce:hidden"
      />

      <FiDownload className="relative text-base transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0.5 motion-reduce:transition-none" />
      <span className="relative">{label}</span>
    </motion.a>
  );
}
