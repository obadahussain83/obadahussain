"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import Reveal from "@/components/ui/Reveal";
import ProjectRing from "@/components/ui/ProjectRing";
import { useApp } from "@/context/AppProviders";

type Filter = "all" | "company" | "personal";
const FILTERS: Filter[] = ["all", "company", "personal"];

export default function Projects() {
  const { t } = useApp();
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

        <ProjectRing key={filter} items={visible} />
      </div>
    </section>
  );
}
