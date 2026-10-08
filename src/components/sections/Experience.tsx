"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { journey } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import { useApp } from "@/context/AppProviders";

/**
 * "My Journey" as a circuit trace: a glowing path winds through the
 * milestones and draws itself with scroll. A comet rides its tip; each node
 * ignites as the comet reaches it and its card comes into focus.
 */

interface Geometry {
  w: number;
  h: number;
  d: string;
  nodeYs: number[];
}

// Smooth, alternating S-curve through every node centre.
function buildPath(points: { x: number; y: number }[], h: number, amp: number) {
  if (!points.length) return "";
  const pts = [{ x: points[0].x, y: 0 }, ...points, { x: points[points.length - 1].x, y: h }];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dy = b.y - a.y;
    const s = i % 2 === 0 ? 1 : -1;
    // The first/last stubs stay straight; the runs between nodes swing out.
    const bend = i === 1 || i === pts.length - 1 ? 0 : amp * s;
    d += ` C ${a.x + bend} ${a.y + dy * 0.4}, ${b.x + bend} ${b.y - dy * 0.4}, ${b.x} ${b.y}`;
  }
  return d;
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Experience() {
  const { t } = useApp();
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [geo, setGeo] = useState<Geometry>({ w: 0, h: 0, d: "", nodeYs: [] });
  const [lit, setLit] = useState(0);

  // Measure node centres (layout offsets, so transforms don't skew them).
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const box = track.getBoundingClientRect();
    const points = nodeRefs.current
      .filter((el): el is HTMLSpanElement => !!el)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
    const amp = box.width >= 768 ? 70 : 12;
    setGeo({
      w: box.width,
      h: box.height,
      d: buildPath(points, box.height, amp),
      nodeYs: points.map((p) => p.y),
    });
  }, []);

  useIsoLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.6 });

  // Comet position along the path; nodes it has passed are lit.
  const headX = useMotionValue(0);
  const headY = useMotionValue(-50);
  const place = (p: number) => {
    const path = pathRef.current;
    if (!path || !geo.d) return;
    const pt = path.getPointAtLength(path.getTotalLength() * Math.min(Math.max(p, 0), 1));
    headX.set(pt.x);
    headY.set(pt.y);
    const count = geo.nodeYs.filter((y) => pt.y >= y - 6).length;
    setLit((prev) => (prev === count ? prev : count));
  };
  useMotionValueEvent(progress, "change", (p) => {
    if (!reduceMotion) place(p);
  });
  useEffect(() => {
    if (reduceMotion) setLit(journey.length + 1);
    else place(progress.get());
  }, [geo, reduceMotion]);

  const lastIndex = journey.length; // the "next chapter" node

  return (
    <section id="experience" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-ambient absolute left-1/2 top-1/3 -ml-48 h-96 w-96 rounded-full bg-accent/20 blur-[150px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          description={t.experience.description}
        />

        <div ref={trackRef} className="relative mx-auto max-w-5xl">
          {/* The trace: faint track + scroll-drawn glowing line + comet */}
          {geo.d && (
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-visible"
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
            >
              <defs>
                <linearGradient id="journey-trace" x1="0" y1="0" x2="0" y2={geo.h} gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#7c3aed" />
                  <stop offset="0.5" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
              <path d={geo.d} fill="none" stroke="rgb(var(--fg) / 0.1)" strokeWidth="1.5" strokeDasharray="4 6" />
              <motion.path
                ref={pathRef}
                d={geo.d}
                fill="none"
                stroke="url(#journey-trace)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  pathLength: reduceMotion ? 1 : progress,
                  filter: "drop-shadow(0 0 6px rgb(34 211 238 / 0.55))",
                }}
              />
              {!reduceMotion && (
                <g>
                  <motion.circle r="14" cx={headX} cy={headY} fill="rgb(34 211 238 / 0.18)" />
                  <motion.circle
                    r="5"
                    cx={headX}
                    cy={headY}
                    fill="#e0faff"
                    style={{ filter: "drop-shadow(0 0 8px #22d3ee) drop-shadow(0 0 16px #3b82f6)" }}
                  />
                </g>
              )}
            </svg>
          )}

          <ol className="relative space-y-12 md:space-y-20">
            {journey.map((entry, i) => {
              const tr = t.experience.items[i];
              const period = tr?.period ?? entry.period;
              const active = lit > i;
              const cardStart = i % 2 === 0; // desktop: card on the start side
              const Icon = entry.icon;

              const card = (
                <motion.div
                  initial={false}
                  animate={
                    active
                      ? { opacity: 1, x: 0, filter: "blur(0px)" }
                      : { opacity: 0.28, x: cardStart ? -18 : 18, filter: "blur(3px)" }
                  }
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className={`surface group relative overflow-hidden rounded-3xl border bg-card/[0.02] p-6 transition-[border-color,box-shadow] duration-500 sm:p-7 ${
                    active ? "border-accent/30 shadow-glow-sm" : "border-card/10"
                  }`}
                >
                  {/* Watermark index */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-6 end-3 font-mono text-[7rem] font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--fg)/0.06)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/20 to-accent-glow/5 text-accent-glow">
                      <Icon size={20} />
                    </span>
                    {entry.current ? (
                      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        {t.experience.now}
                      </span>
                    ) : (
                      period && (
                        <span className="rounded-full border border-card/10 px-3 py-1 text-xs font-medium text-muted md:hidden">
                          {period}
                        </span>
                      )
                    )}
                  </div>

                  <h3 className="relative mt-5 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                    {tr?.title ?? entry.title}
                  </h3>
                  <p className="relative mt-1 text-sm font-semibold text-accent-glow">
                    {tr?.subtitle ?? entry.subtitle}
                  </p>
                  <p className="relative mt-3 text-[15px] leading-[1.75] text-muted">
                    {tr?.description ?? entry.description}
                  </p>
                  <div className="relative mt-5 flex flex-wrap gap-2">
                    {entry.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-card/10 bg-card/[0.03] px-3 py-1 text-xs font-medium text-fg/80"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );

              // Desktop-only: big outlined chapter label opposite the card.
              const meta = (
                <motion.div
                  initial={false}
                  animate={{ opacity: active ? 1 : 0.2 }}
                  transition={{ duration: 0.6 }}
                  className={`hidden md:block ${cardStart ? "text-start" : "text-end"}`}
                >
                  <p className="font-mono text-sm tracking-[0.3em] text-accent-glow" dir="ltr">
                    {String(i + 1).padStart(2, "0")} / {String(journey.length).padStart(2, "0")}
                  </p>
                  <p className="mt-2 bg-gradient-to-b from-fg/45 to-fg/5 bg-clip-text pb-2 text-5xl font-bold leading-tight tracking-tight text-transparent lg:text-6xl">
                    {period}
                  </p>
                </motion.div>
              );

              return (
                <li
                  key={i}
                  className="relative grid grid-cols-[2.5rem_1fr] items-center gap-4 md:grid-cols-[1fr_7rem_1fr] md:gap-0"
                >
                  <div className={`col-start-2 md:row-start-1 ${cardStart ? "md:col-start-1" : "md:col-start-3"}`}>
                    {card}
                  </div>
                  <div className={`hidden md:row-start-1 md:block ${cardStart ? "md:col-start-3" : "md:col-start-1"}`}>
                    {meta}
                  </div>
                  <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                    <JourneyNode
                      nodeRef={(el) => {
                        nodeRefs.current[i] = el;
                      }}
                      active={active}
                      label={String(i + 1).padStart(2, "0")}
                    />
                  </div>
                </li>
              );
            })}

            {/* Final node: the next chapter */}
            <li className="relative grid grid-cols-[2.5rem_1fr] items-center gap-4 md:grid-cols-[1fr_7rem_1fr] md:gap-0">
              <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                <JourneyNode
                  nodeRef={(el) => {
                    nodeRefs.current[lastIndex] = el;
                  }}
                  active={lit > lastIndex}
                  label="+"
                />
              </div>
              <div className="col-start-2 row-start-1 md:col-span-3 md:col-start-1 md:row-start-2 md:mt-6 md:flex md:justify-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-fg transition-[transform,background-color,border-color] duration-200 ease-out hover:border-accent/60 hover:bg-accent/20 active:scale-[0.97]"
                >
                  {t.experience.next}
                  <FiArrowUpRight className="text-accent-glow transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                </a>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

interface JourneyNodeProps {
  active: boolean;
  label: string;
  nodeRef: (el: HTMLSpanElement | null) => void;
}

const JourneyNode = ({ active, label, nodeRef }: JourneyNodeProps) => (
  <span ref={nodeRef} className="relative z-10 flex h-11 w-11 items-center justify-center">
    {/* Ignition ring, plays once when the comet arrives */}
    {active && (
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0.7, scale: 0.6 }}
        animate={{ opacity: 0, scale: 2.2 }}
        transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        className="absolute inset-0 rounded-full border-2 border-accent-glow"
      />
    )}
    <motion.span
      initial={false}
      animate={active ? { scale: 1 } : { scale: 0.85 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.35 }}
      className={`relative flex h-11 w-11 items-center justify-center rounded-full border font-mono text-xs font-bold transition-[background-color,border-color,color,box-shadow] duration-500 ${
        active
          ? "border-accent-glow/70 bg-gradient-to-br from-accent to-accent-glow text-night-900 shadow-[0_0_24px_rgb(34_211_238/0.55)]"
          : "border-card/15 bg-night-900 text-muted"
      }`}
    >
      {label}
    </motion.span>
  </span>
);
