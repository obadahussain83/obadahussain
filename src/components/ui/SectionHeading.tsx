"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  /** Kept for backwards compatibility; no longer rendered. */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const reduceMotion = useReducedMotion();

  return (
    <Reveal
      className={`mb-12 max-w-2xl sm:mb-16 ${
        isCenter ? "mx-auto text-center" : "text-left"
      }`}
    >
      <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {/* Underline draws itself in from the start edge (RTL-aware) once in view */}
      <motion.span
        aria-hidden="true"
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }
        }
        className={`mt-5 block h-px w-24 origin-left rounded-full bg-gradient-to-r from-accent/60 to-transparent rtl:origin-right ${
          isCenter
            ? "mx-auto from-accent/60 via-accent/30 to-accent/0"
            : ""
        }`}
      />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
