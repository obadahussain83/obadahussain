"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiGithub } from "react-icons/fi";
import type { Project } from "@/data/projects";
import { useApp } from "@/context/AppProviders";

/**
 * Projects as a slowly spinning 3D ring.
 * - Idles with a constant (linear) drift; pauses on hover, off-screen, and
 *   for a few seconds after any interaction.
 * - Drag/flick to spin with momentum, then springs to the nearest card.
 * - Clicking a side card (or the arrows / dots) brings it to the front.
 * Only transform + opacity animate, so it stays on the compositor.
 */

export interface RingItem {
  project: Project;
  /** Original index into projects/translations. */
  i: number;
}

const IDLE_SPEED = 9; // deg per second, a full turn every ~40s
const RESUME_AFTER = 4000; // ms of no interaction before drifting again
const DRAG_RATIO = 0.35; // deg per dragged px
const SNAP = { type: "spring", duration: 0.8, bounce: 0.15 } as const;

const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function ProjectRing({ items }: { items: RingItem[] }) {
  const { t } = useApp();
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { margin: "-15% 0px" });

  const n = items.length;
  const step = 360 / Math.max(n, 1);

  // Card width follows the stage: phones keep a compact card, wider
  // screens get a larger one (text sizes step up at md to match).
  const [cardW, setCardW] = useState(300);
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setCardW(
        Math.round(w >= 720 ? Math.min(460, w * 0.4) : Math.min(320, Math.max(220, w * 0.68)))
      );
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const large = cardW > 320;
  const cardH = Math.round(cardW * 0.625 + (large ? 250 : 210));
  // Scale perspective with the card so big rings don't over-distort.
  const perspective = Math.max(1400, Math.round(cardW * 4.4));
  // Distance from the centre so neighbouring cards just clear each other.
  const radius =
    n >= 3 ? Math.round(cardW / 2 / Math.tan(Math.PI / n) + cardW * 0.18) : Math.round(cardW * 0.6);

  const rot = useMotionValue(0);
  // Push the ring back by its radius so the front card sits on the screen
  // plane at its true width.
  const ringTransform = useTransform(
    rot,
    (r) => `translateZ(${-radius}px) rotateX(-4deg) rotateY(${r}deg)`
  );
  const cardEls = useRef<(HTMLElement | null)[]>([]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(rot, "change", (r) => {
    const idx = mod(Math.round(-r / step), n);
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const hovered = useRef(false);
  const dragging = useRef(false);
  const lastInteract = useRef(0);
  const anim = useRef<ReturnType<typeof animate> | null>(null);

  const touch = () => {
    lastInteract.current = performance.now();
  };

  useAnimationFrame((time, delta) => {
    if (reduceMotion || n < 2 || !inView) return;
    if (hovered.current || dragging.current || anim.current) return;
    if (time - lastInteract.current < RESUME_AFTER) return;
    rot.set(rot.get() - (IDLE_SPEED * delta) / 1000);
  });

  const springTo = (target: number) => {
    anim.current?.stop();
    touch();
    anim.current = animate(rot, target, {
      ...(reduceMotion ? { duration: 0 } : SNAP),
      onComplete: () => {
        anim.current = null;
        touch();
      },
    });
  };

  // Nearest equivalent angle that puts card `idx` at the front.
  const snapTo = (idx: number) => {
    const base = -idx * step;
    const k = Math.round((rot.get() - base) / 360);
    springTo(base + 360 * k);
  };

  const rotateBy = (cards: number) =>
    springTo(Math.round(rot.get() / step) * step + cards * step);

  // Drag handling: distinguish a drag from a click on a card.
  const moved = useRef(0);

  return (
    <div>
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.projects.title}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") rotateBy(1);
          if (e.key === "ArrowRight") rotateBy(-1);
        }}
        className="relative mx-auto w-full select-none rounded-3xl outline-none [perspective-origin:50%_35%] focus-visible:ring-1 focus-visible:ring-accent/40"
        style={{ height: cardH + 70, perspective }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hovered.current = true;
        }}
        onPointerLeave={() => {
          hovered.current = false;
          touch();
        }}
      >
        {/* Soft floor glow under the ring */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[10%] bottom-0 h-24 rounded-[100%] bg-accent/20 blur-3xl"
        />

        <motion.div
          className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          onPointerDown={() => {
            moved.current = 0;
          }}
          onClickCapture={(e) => {
            // A drag that ends over a link must not open it.
            if (moved.current > 6) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          onClick={(e) => {
            // Side cards sit behind the screen plane, so their clicks land
            // here. Find the facing card whose projected box holds the point.
            if (e.target !== e.currentTarget) return;
            let best = -1;
            let bestFacing = 0;
            cardEls.current.forEach((el, idx) => {
              if (!el) return;
              const facing = Math.cos(((idx * step + rot.get()) * Math.PI) / 180);
              const r = el.getBoundingClientRect();
              const inside =
                e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
              if (inside && facing > bestFacing) {
                best = idx;
                bestFacing = facing;
              }
            });
            if (best >= 0) snapTo(best);
          }}
          onPanStart={() => {
            anim.current?.stop();
            anim.current = null;
            dragging.current = true;
          }}
          onPan={(_, info) => {
            moved.current += Math.abs(info.delta.x);
            rot.set(rot.get() + info.delta.x * DRAG_RATIO);
          }}
          onPanEnd={(_, info) => {
            dragging.current = false;
            // Carry the flick's momentum, then land on a card.
            const projected = rot.get() + info.velocity.x * DRAG_RATIO * 0.3;
            springTo(Math.round(projected / step) * step);
          }}
        >
          <motion.div
            className="absolute left-1/2 top-6 [transform-style:preserve-3d]"
            style={{ transform: ringTransform, width: 0, height: cardH }}
          >
            {items.map(({ project, i }, idx) => (
              <RingCard
                key={project.title}
                project={project}
                trIndex={i}
                idx={idx}
                step={step}
                radius={radius}
                width={cardW}
                height={cardH}
                rot={rot}
                isActive={idx === active}
                large={large}
                cardRef={(el) => {
                  cardEls.current[idx] = el;
                }}
                onSelect={() => {
                  if (idx === active) return false;
                  snapTo(idx);
                  return true;
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Controls */}
      {n > 1 && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4" dir="ltr">
            <button
              type="button"
              onClick={() => rotateBy(1)}
              aria-label={t.projects.ring.prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-card/15 text-fg/80 transition-[transform,border-color,color] duration-150 ease-out hover:border-accent/50 hover:text-accent-glow active:scale-[0.96]"
            >
              <FiChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {items.map(({ project, i }, idx) => (
                <button
                  key={project.title}
                  type="button"
                  onClick={() => snapTo(idx)}
                  aria-label={`${t.projects.ring.goTo}: ${t.projects.items[i]?.title ?? project.title}`}
                  aria-current={idx === active}
                  className="group flex h-6 min-w-[1.5rem] items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out ${
                      idx === active ? "w-6 bg-accent-glow" : "w-1.5 bg-fg/25 group-hover:bg-fg/50"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => rotateBy(-1)}
              aria-label={t.projects.ring.next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-card/15 text-fg/80 transition-[transform,border-color,color] duration-150 ease-out hover:border-accent/50 hover:text-accent-glow active:scale-[0.96]"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
          <p className="text-xs text-muted-faint">{t.projects.ring.hint}</p>
        </div>
      )}
    </div>
  );
}

interface RingCardProps {
  project: Project;
  trIndex: number;
  idx: number;
  step: number;
  radius: number;
  width: number;
  height: number;
  rot: MotionValue<number>;
  isActive: boolean;
  large: boolean;
  cardRef: (el: HTMLElement | null) => void;
  /** Returns true when the click was consumed (brought to front). */
  onSelect: () => boolean;
}

function RingCard({
  project,
  trIndex,
  idx,
  step,
  radius,
  width,
  height,
  rot,
  isActive,
  large,
  cardRef,
  onSelect,
}: RingCardProps) {
  const { t } = useApp();
  const tr = t.projects.items[trIndex];
  const angle = idx * step;

  // Fade cards as they turn away from the viewer.
  const opacity = useTransform(rot, (r) => {
    const facing = Math.cos(((angle + r) * Math.PI) / 180);
    return 0.3 + 0.7 * Math.pow(Math.max(facing, 0), 1.4);
  });

  return (
    <motion.article
      ref={cardRef}
      onClickCapture={(e) => {
        if (onSelect()) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      aria-hidden={!isActive}
      className={`surface group absolute top-0 flex flex-col overflow-hidden rounded-2xl border bg-card/[0.02] [backface-visibility:hidden] transition-[border-color,box-shadow] duration-300 ${
        isActive ? "border-accent/40 shadow-glow-sm" : "border-card/10 cursor-pointer"
      }`}
      style={{
        width,
        height,
        left: -width / 2,
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
        opacity,
      }}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
        <Image
          src={project.image}
          alt={tr?.title ?? project.title}
          fill
          draggable={false}
          sizes={large ? "460px" : "320px"}
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-900/70 via-night-900/10 to-transparent" />
        {project.tag && (
          <span
            className={`absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium backdrop-blur-md ${
              project.tag === "company"
                ? "border-accent/40 bg-accent/10 text-accent-glow"
                : "border-card/20 bg-night-900/60 text-fg/85"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                project.tag === "company" ? "bg-accent-glow" : "bg-fg/60"
              }`}
            />
            {t.projects.tags[project.tag]}
          </span>
        )}
      </div>

      <div className={`flex min-h-0 flex-1 flex-col ${large ? "p-7" : "p-5"}`}>
        <h3 className={`line-clamp-1 font-bold text-fg ${large ? "text-2xl" : "text-lg"}`}>{tr?.title ?? project.title}</h3>
        <p className={`line-clamp-2 leading-relaxed text-muted ${large ? "mt-2.5 text-base" : "mt-1.5 text-sm"}`}>
          {tr?.description ?? project.description}
        </p>

        <div className={`flex flex-wrap gap-1.5 overflow-hidden ${large ? "mt-4 max-h-7" : "mt-3 max-h-6"}`}>
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`rounded-md border border-card/10 px-2 py-0.5 font-medium text-fg/75 ${large ? "text-xs" : "text-[11px]"}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-3 pt-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              draggable={false}
              className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-accent-glow"
            >
              {t.projects.view}
              <FiArrowUpRight className="text-accent-glow transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 rtl:-scale-x-100" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              draggable={false}
              aria-label={`${project.title} on GitHub`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-card/10 text-fg/70 transition-colors hover:border-accent/50 hover:text-fg"
            >
              <FiGithub size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
