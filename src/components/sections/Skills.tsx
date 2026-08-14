"use client";

import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useApp } from "@/context/AppProviders";

export default function Skills() {
  const { t } = useApp();
  const reduceMotion = useReducedMotion();
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Soft background accent */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-ambient absolute left-1/2 top-1/2 -ml-48 -mt-48 h-96 w-96 rounded-full bg-accent/20 blur-[140px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow={t.skills.eyebrow}
          title={t.skills.title}
          description={t.skills.description}
        />

        <div className="space-y-10">
          {skills.map((group, groupIndex) => (
            <div key={group.category}>
              <Reveal>
                <h3 className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-muted">
                  <span className="h-px w-6 bg-accent/60" />
                  {t.skills.categories[group.category] ?? group.category}
                </h3>
              </Reveal>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.items.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : {
                            duration: 0.4,
                            delay: (i % 6) * 0.05 + groupIndex * 0.02,
                          }
                    }
                    className="group relative flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-accent/15 bg-card/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card/[0.05] hover:shadow-glow-sm"
                  >
                    <span
                      className="text-3xl text-fg/80 transition-colors duration-300 sm:text-4xl"
                      style={{ ["--tw" as string]: skill.color }}
                    >
                      <skill.icon
                        className="transition-colors duration-300 group-hover:[color:var(--brand)]"
                        style={{ ["--brand" as string]: skill.color }}
                      />
                    </span>
                    <span className="text-center text-xs font-medium text-muted transition-colors group-hover:text-fg sm:text-sm">
                      {skill.name}
                    </span>
                    {/* Hover glow */}
                    <span
                      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20"
                      style={{ backgroundColor: skill.color }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
