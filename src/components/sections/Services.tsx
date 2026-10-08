"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { services, type Service } from "@/data/services";
import Reveal from "@/components/ui/Reveal";
import ServiceVisualFor from "@/components/ui/ServiceVisuals";
import { useApp } from "@/context/AppProviders";

/**
 * Sticky stacking cards: each service pins below the navbar and the next
 * one slides up over it, while the ones underneath shrink back slightly.
 */
export default function Services() {
  const { t } = useApp();
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const n = services.length;

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-px">
        {/* Heading (start-aligned) */}
        <Reveal className="mb-12 max-w-2xl text-start sm:mb-16">
          <span className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent-glow">
            {t.services.eyebrow}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-muted sm:text-lg">
            {t.services.description}
          </p>
        </Reveal>

        <div ref={stackRef} className="relative">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={i}
              total={n}
              progress={scrollYProgress}
              title={t.services.items[i]?.title ?? service.title}
              description={t.services.items[i]?.description ?? service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  description: string;
}

function ServiceCard({ service, index, total, progress, title, description }: ServiceCardProps) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { margin: "-10% 0px" });
  const isLast = index === total - 1;

  // Once the next cards start covering this one, ease it back a little.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045]);
  const Icon = service.icon;

  return (
    <div
      className={`sticky ${isLast ? "" : "mb-[22vh] sm:mb-[28vh]"}`}
      style={{ top: `calc(5.5rem + ${index * 14}px)` }}
    >
      <motion.article
        ref={cardRef}
        style={{ scale: reduceMotion ? 1 : scale }}
        className="surface group origin-top overflow-hidden rounded-3xl border border-card/10 bg-card/[0.02] shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.8)]"
      >
        {/* Tinted glow in the corner */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
          style={{ background: service.tint }}
        />

        <div className="relative grid grid-cols-1 gap-6 p-5 sm:p-8 md:grid-cols-[1fr_1.05fr] md:items-center md:gap-10 md:p-10">
          {/* Live illustration */}
          <div className="relative h-52 overflow-hidden rounded-2xl border border-card/10 bg-night-900/60 sm:h-60 md:order-2 md:h-72">
            <ServiceVisualFor kind={service.visual} play={inView && !reduceMotion} />
          </div>

          {/* Copy */}
          <div className="relative md:order-1">
            <div className="flex items-center justify-between">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-card/10 bg-card/[0.03]"
                style={{ color: service.tint }}
              >
                <Icon size={20} />
              </span>
              <span className="font-mono text-5xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgb(var(--fg)/0.18)] sm:text-6xl">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-bold tracking-tight text-fg sm:text-3xl">{title}</h3>
            <p className="mt-3 text-[15px] leading-[1.75] text-muted sm:text-base">{description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {service.stack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-card/10 bg-card/[0.03] px-3 py-1 text-xs font-medium text-fg/80"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
