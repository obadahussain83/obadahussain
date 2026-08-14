"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  /** The full text to type out. */
  text: string;
  className?: string;
  /** Milliseconds between each character. */
  speed?: number;
  /** Delay in ms before typing starts once in view. */
  startDelay?: number;
  /** Show a blinking caret while (and briefly after) typing. */
  caret?: boolean;
}

/**
 * Types its text out one character at a time when it scrolls into view.
 * Accessibility:
 *  - The full text is always present for screen readers (aria-label), and the
 *    animated characters are hidden from them, so nothing is read letter-by-letter.
 *  - Respects the "reduce motion" OS setting: the full text appears at once.
 */
export default function Typewriter({
  text,
  className,
  speed = 28,
  startDelay = 150,
  caret = true,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  const done = count >= text.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Restart cleanly if the text changes (e.g. language toggle).
    setCount(0);

    let started = false;
    let timer: ReturnType<typeof setTimeout>;

    const startTyping = () => {
      if (started) return;
      started = true;
      if (reduceMotion) {
        setCount(text.length);
        return;
      }
      let i = 0;
      const tick = () => {
        i += 1;
        setCount(i);
        if (i < text.length) timer = setTimeout(tick, speed);
      };
      timer = setTimeout(tick, startDelay);
    };

    // Native IntersectionObserver — fires immediately if already on screen.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          startTyping();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [text, speed, startDelay, reduceMotion]);

  return (
    <span ref={ref} className={className} aria-label={text} role="text">
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {caret && !reduceMotion && (
        <span
          aria-hidden="true"
          className={`ml-0.5 inline-block w-[2px] self-stretch bg-accent-glow align-middle ${
            done ? "animate-caret-blink" : "opacity-100"
          }`}
          style={{ height: "1em" }}
        />
      )}
    </span>
  );
}
