"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import { useApp } from "@/context/AppProviders";

type Filter = "all" | "company" | "personal";
const FILTERS: Filter[] = ["all", "company", "personal"];

export default function Projects() {
  const { t } = useApp();
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  // Keep the original index so translations stay aligned after filtering.
  const visible = projects
    .map((project, i) => ({ project, i }))
    .filter(({ project }) => filter === "all" || project.tag === filter);

  return (
    <section id="projects" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-px">
        {/* Heading (start-aligned) */}
        <Reveal className="mb-8 max-w-2xl text-start sm:mb-10">
          <span className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent-glow">
            {t.projects.eyebrow}
            <span className="h-px w-8 bg-accent-glow/50" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {t.projects.title}
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-muted sm:text-lg">
            {t.projects.description}
          </p>
        </Reveal>

        {/* Filter tabs — scrollable on very small screens, no clipping */}
        <Reveal className="mb-10 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mb-12 sm:flex-wrap sm:px-0">
          {FILTERS.map((f) => {
            const isActive = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={isActive}
                className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "border-accent/50 text-fg"
                    : "border-card/10 text-muted hover:border-card/20 hover:text-fg"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {t.projects.filters[f]}
              </button>
            );
          })}
        </Reveal>

        {/* Grid */}
        <motion.div
          layout={!reduceMotion}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map(({ project, i }) => {
              const tr = t.projects.items[i];
              return (
                <motion.article
                  key={project.title}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-card/10 bg-card/[0.02] transition-colors duration-300 hover:border-accent/40"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={tr?.title ?? project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
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

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-bold text-fg">
                        {tr?.title ?? project.title}
                      </h3>
                      <FiArrowUpRight className="mt-1 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-glow rtl:-scale-x-100" />
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {tr?.description ?? project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-card/10 px-2 py-0.5 text-[11px] font-medium text-fg/75"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-fg transition-colors hover:text-accent-glow"
                        >
                          {t.projects.view}
                          <FiArrowUpRight className="text-accent-glow transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 rtl:-scale-x-100" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
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
            })}
        </motion.div>
      </div>
    </section>
  );
}
