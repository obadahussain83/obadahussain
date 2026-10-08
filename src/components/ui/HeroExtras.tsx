"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { IconType } from "react-icons";
import { SiLaravel, SiNextdotjs, SiNodedotjs, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";

/* ───────── Role ticker: one line that flips through roles ───────── */

export function RoleTicker({ roles }: { roles: readonly string[] }) {
  // The first role is repeated at the end so the loop wraps seamlessly.
  const list = [...roles, roles[0]];
  return (
    <span className="hero-ticker">
      <span className="sr-only">{roles.join(", ")}</span>
      <span className="hero-ticker-list" aria-hidden="true">
        {list.map((r, i) => (
          <span key={i} className="hero-ticker-item">
            {r}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ───────── Pointer → normalised motion values for parallax ───────── */

export function usePointerParallax() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1);
      y.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, x, y]);

  return { x, y };
}

/* ───────── Tech chips floating around the badge (desktop) ───────── */

interface Chip {
  name: string;
  icon: IconType;
  color: string;
  pos: React.CSSProperties;
  depth: number;
}

// Positioned from the badge's centre line (the badge is 300px wide), so
// they always sit just outside its edges whatever the column width.
const side = (offset: number) => `calc(50% + 150px + ${offset}px)`;
const chips: Chip[] = [
  { name: "React", icon: SiReact, color: "#61DAFB", pos: { top: "20%", right: side(14) }, depth: 26 },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", pos: { top: "46%", right: side(40) }, depth: 14 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", pos: { top: "72%", right: side(6) }, depth: 32 },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", pos: { top: "16%", left: side(8) }, depth: 18 },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", pos: { top: "43%", left: side(36) }, depth: 30 },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", pos: { top: "69%", left: side(12) }, depth: 20 },
];

export function TechChips({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      {chips.map((chip, i) => (
        <FloatingChip key={chip.name} chip={chip} index={i} px={px} py={py} />
      ))}
    </div>
  );
}

function FloatingChip({
  chip,
  index,
  px,
  py,
}: {
  chip: Chip;
  index: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  // Nearer chips (higher depth) drift further with the cursor.
  const x = useSpring(useTransform(px, (v) => v * chip.depth), { stiffness: 60, damping: 18 });
  const y = useSpring(useTransform(py, (v) => v * chip.depth), { stiffness: 60, damping: 18 });
  const Icon = chip.icon;

  return (
    <motion.div className="absolute" style={{ ...chip.pos, x, y }}>
      <span
        className="hero-chip"
        style={{
          animationDelay: `${0.9 + index * 0.08}s, ${index * -0.9}s`,
          ["--chip" as string]: chip.color,
        }}
      >
        <Icon size={16} style={{ color: chip.color }} />
        {chip.name}
      </span>
    </motion.div>
  );
}
