"use client";

import { motion, useReducedMotion } from "framer-motion";
import { journey } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import { useApp } from "@/context/AppProviders";

export default function Experience() {
  const { t } = useApp();
  const reduceMotion = useReducedMotion();

  return (
    <section id="experience" className="relative overflow-hidden py-24 sm:py-32">
      {/* Soft ambient glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-ambient absolute left-1/2 top-1/3 -ml-48 h-96 w-96 rounded-full bg-accent/20 blur-[150px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow={t.experience.eyebrow}
          title={t.experience.title}
          description={t.experience.description}
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Rail: faint track (start on mobile, centered on desktop) */}
          <span className="absolute start-5 top-0 h-full w-px bg-card/10 sm:start-1/2 sm:-translate-x-1/2 rtl:sm:translate-x-1/2" />
          {/* Rail: animated progress line */}
          <motion.span
            initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }
            }
            className="absolute start-5 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-glow to-accent/0 sm:start-1/2 sm:-translate-x-1/2 rtl:sm:translate-x-1/2"
          />

          <div className="space-y-6 sm:space-y-10">
            {journey.map((entry, i) => {
              const tr = t.experience.items[i];
              const period = tr?.period ?? entry.period;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.6,
                          delay: i * 0.12,
                          ease: [0.22, 1, 0.36, 1],
                        }
                  }
                  className={`relative ps-16 sm:w-1/2 sm:ps-0 ${
                    isLeft
                      ? "sm:pe-9 sm:text-end"
                      : "sm:ms-auto sm:ps-9 sm:text-start"
                  }`}
                >
                  {/* Node: numbered, glowing, pulsing */}
                  <span
                    className={`absolute start-5 top-2 z-10 -translate-x-1/2 rtl:translate-x-1/2 ${
                      isLeft
                        ? "sm:start-auto sm:end-0 sm:translate-x-1/2 sm:rtl:-translate-x-1/2"
                        : "sm:start-0 sm:-translate-x-1/2 sm:rtl:translate-x-1/2"
                    }`}
                  >
                    <span className="relative flex h-10 w-10 items-center justify-center">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/30 [animation-duration:2.5s]" />
                      <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 bg-night-800 font-mono text-xs font-bold text-accent-glow shadow-glow-sm">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </span>

                  {/* Horizontal connector from rail to card (mobile only) */}
                  <span className="absolute start-10 top-6 z-0 h-px w-6 bg-gradient-to-r from-accent/60 to-transparent rtl:bg-gradient-to-l sm:hidden" />

                  {/* Card */}
                  <div className="group relative overflow-hidden rounded-2xl border border-card/10 bg-night-800/50 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-glow-sm sm:p-6">
                    {/* Top accent sweep on hover */}
                    <span className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                    {period && (
                      <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-accent-glow">
                        {period}
                      </span>
                    )}
                    <h3 className="mt-3 text-lg font-bold text-fg">
                      {tr?.title ?? entry.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-accent/90">
                      {tr?.subtitle ?? entry.subtitle}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                      {tr?.description ?? entry.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
