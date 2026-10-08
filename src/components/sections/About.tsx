"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { aboutCards } from "@/data/about";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { techCount } from "@/data/stats";
import Reveal from "@/components/ui/Reveal";
import DownloadCVButton from "@/components/ui/DownloadCVButton";
import { useApp } from "@/context/AppProviders";


export default function About() {
  const { t } = useApp();
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-px">
        {/* Heading (start-aligned) */}
        <Reveal className="mb-12 max-w-2xl text-start sm:mb-16">
          <span className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent-glow">
            {t.about.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {t.about.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-14">
          {/* Manifesto + stats + CTA */}
          <div>
            <ScrollLitText text={t.about.text} still={!!reduceMotion} />

            <div className="mt-10 grid grid-cols-3 divide-x divide-card/10 border-y border-card/10 py-6 rtl:divide-x-reverse">
              <Stat value={projects.length} suffix="+" label={t.about.stats[0].label} />
              <Stat value={techCount} suffix="+" label={t.about.stats[1].label} />
              <Stat text={t.about.stats[2].value ?? "Full Stack"} label={t.about.stats[2].label} />
            </div>

            <DownloadCVButton href={site.cvUrl} label={t.about.download} />
          </div>

          {/* Bento */}
          <div className="grid grid-cols-2 gap-4">
            <Reveal direction="up" className="col-span-2">
              <BentoTile className="p-0">
                <CodeCard />
              </BentoTile>
            </Reveal>

            <Reveal direction="up" delay={0.06}>
              <BentoTile className="h-full overflow-hidden">
                <LocationMap />
                <TileText
                  icon={aboutCards[0].icon}
                  label={t.about.cards[0].label}
                  value={t.about.cards[0].value}
                />
              </BentoTile>
            </Reveal>

            <Reveal direction="up" delay={0.12}>
              <BentoTile className="h-full">
                {/* Live status light */}
                <span aria-hidden="true" className="absolute end-5 top-5 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                </span>
                <TileText
                  icon={aboutCards[3].icon}
                  label={t.about.cards[3].label}
                  value={t.about.cards[3].value}
                />
              </BentoTile>
            </Reveal>

            {[1, 2].map((i, k) => (
              <Reveal key={i} direction="up" delay={0.18 + k * 0.06}>
                <BentoTile className="h-full">
                  <TileText
                    icon={aboutCards[i].icon}
                    label={t.about.cards[i].label}
                    value={t.about.cards[i].value}
                  />
                </BentoTile>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Manifesto: words light up as you scroll past them ───────── */

function ScrollLitText({ text, still }: { text: string; still: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className="max-w-xl text-xl font-medium leading-[1.75] sm:text-2xl sm:leading-[1.7]">
      {words.map((w, i) => (
        <Word
          key={i}
          word={w}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={still}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  progress,
  range,
  still,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity: still ? 1 : opacity }} className="text-fg">
        {word}
      </motion.span>{" "}
    </>
  );
}

/* ───────── Stat with count-up ───────── */

function Stat({ value, suffix = "", text, label }: { value?: number; suffix?: string; text?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || value === undefined) return;
    if (!inView || reduceMotion) {
      el.textContent = `${inView || reduceMotion ? value : 0}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, reduceMotion]);

  return (
    <div className="px-3 text-center first:ps-0 last:pe-0 sm:px-5">
      <span
        ref={ref}
        className={`block whitespace-nowrap bg-gradient-to-b from-fg to-fg/55 bg-clip-text font-bold tabular-nums leading-[1.25] tracking-tight text-transparent ${
          text ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl"
        }`}
        dir="ltr"
      >
        {text ?? `${value}${suffix}`}
      </span>
      <span className="mt-1.5 block text-xs leading-snug text-muted sm:text-sm">{label}</span>
    </div>
  );
}

/* ───────── Bento tiles ───────── */

// Tile with a light border that follows the cursor.
function BentoTile({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={onMove}
      className={`bento-tile surface relative flex min-h-[9.5rem] flex-col rounded-2xl border border-card/10 bg-card/[0.02] p-5 ${className}`}
    >
      {children}
    </div>
  );
}

function TileText({ icon: Icon, label, value }: { icon: (typeof aboutCards)[number]["icon"]; label: string; value: string }) {
  return (
    <div className="relative mt-auto">
      <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-card/10 bg-night-900/60 text-accent-glow">
        <Icon size={16} />
      </span>
      <p className="text-xs text-muted-faint">{label}</p>
      <p className="mt-1 text-sm font-semibold text-fg sm:text-base">{value}</p>
    </div>
  );
}

// Stylised dotted map with a pulse on Palestine.
function LocationMap() {
  return (
    <div aria-hidden="true" className="about-map pointer-events-none absolute inset-0">
      <span className="about-map-ping" />
      <span className="about-map-dot" />
      <span className="absolute end-3 top-3 font-mono text-[10px] text-muted-faint" dir="ltr">
        31.9°N 35.2°E
      </span>
    </div>
  );
}

// "Developer as code" editor card; lines type in once when it scrolls in.
function CodeCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const lines: ReactNode[] = [
    <>
      <span className="text-[#c084fc]">const</span> <span className="text-[#7dd3fc]">developer</span> = {"{"}
    </>,
    <>
      {"  "}name: <span className="text-[#fcd34d]">&quot;{site.name}&quot;</span>,
    </>,
    <>
      {"  "}role: <span className="text-[#fcd34d]">&quot;{site.role}&quot;</span>,
    </>,
    <>
      {"  "}location: <span className="text-[#fcd34d]">&quot;{site.contact.location}&quot;</span>,
    </>,
    <>
      {"  "}stack: [<span className="text-[#fcd34d]">&quot;React&quot;</span>, <span className="text-[#fcd34d]">&quot;Next.js&quot;</span>,{" "}
      <span className="text-[#fcd34d]">&quot;Laravel&quot;</span>],
    </>,
    <>
      {"  "}available: <span className="text-[#34d399]">true</span>,
    </>,
    <>
      {"}"};<span className="about-caret" />
    </>,
  ];

  return (
    <div ref={ref} className="about-code" data-in={inView} dir="ltr">
      <div className="flex items-center gap-1.5 border-b border-card/10 px-4 py-2.5">
        <i className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
        <span className="ms-3 font-mono text-[11px] text-muted-faint">developer.ts</span>
      </div>
      <pre className="whitespace-pre-wrap px-4 py-4 font-mono text-[12px] leading-[1.8] text-fg/90 sm:text-[13px]">
        {lines.map((line, i) => (
          <span key={i} className="about-code-line" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
            <span className="me-4 inline-block w-4 select-none text-end text-muted-faint/60">{i + 1}</span>
            {line}
            {"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}
