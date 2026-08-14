"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypedNameProps {
  first: string;
  last: string;
}

/**
 * Types the hero name out — first name (accent) then last name — when the page
 * loads. A hidden full-name copy reserves the exact two-line box so nothing
 * below shifts while typing (zero layout jitter).
 * Accessibility: the whole name is exposed via aria-label; the animated glyphs
 * are aria-hidden, and reduce-motion shows the full name instantly.
 */
export default function TypedName({ first, last }: TypedNameProps) {
  const reduceMotion = useReducedMotion();
  const total = first.length + last.length;
  const [count, setCount] = useState(reduceMotion ? total : 0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(total);
      return;
    }
    setCount(0);
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setCount(i);
      if (i < total) timer = setTimeout(tick, 90);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [first, last, total, reduceMotion]);

  const firstShown = first.slice(0, Math.min(count, first.length));
  const lastShown = last.slice(0, Math.max(0, count - first.length));
  const onLastLine = count > first.length;
  const done = count >= total;

  const caret =
    !reduceMotion ? (
      <span
        aria-hidden="true"
        className={`ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] rounded-full bg-accent-glow align-baseline ${
          done ? "animate-caret-blink" : "opacity-100"
        }`}
      />
    ) : null;

  return (
    <span className="relative inline-block" aria-label={`${first} ${last}`}>
      {/* Invisible spacer: reserves the full two-line box */}
      <span aria-hidden="true" className="invisible">
        <span>{first}</span>
        <br />
        {last}
      </span>

      {/* Visible typed overlay */}
      <span
        aria-hidden="true"
        className="absolute inset-0"
      >
        <span className="text-accent">{firstShown}</span>
        {onLastLine && <br />}
        {lastShown}
        {caret}
      </span>
    </span>
  );
}
