"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  /** Distance in px the element travels while fading in. */
  distance?: number;
}

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Lightweight scroll-reveal wrapper.
 * Fades + slides its children into view once, when scrolled near.
 * Respects the user's "reduce motion" OS setting: motion is skipped and the
 * content renders in its final position, so it never distracts assistive tech.
 */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  distance = 28,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, ...offsetFor(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
