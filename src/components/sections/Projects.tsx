"use client";

import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useApp } from "@/context/AppProviders";

export default function Projects() {
  const { t } = useApp();
  return (
    <section id="projects" className="relative overflow-hidden py-20 sm:py-32">
      {/* Ambient breathing glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-ambient absolute left-0 top-1/4 -ml-40 h-96 w-96 rounded-full bg-accent/20 blur-[150px]" />
        <div className="animate-ambient-slow absolute right-0 bottom-1/4 -mr-40 h-96 w-96 rounded-full bg-accent-violet/20 blur-[150px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow={t.projects.eyebrow}
          title={t.projects.title}
          description={t.projects.description}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {projects.map((project, i) => (
            <Reveal key={i} direction="up" delay={(i % 2) * 0.1}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-accent/15 bg-card/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-glow sm:rounded-3xl">
                {/* Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[16/10]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/20 to-transparent" />

                  {/* Type badge (personal / company) */}
                  {project.tag && (
                    <span
                      className={`absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur-md ${
                        project.tag === "company"
                          ? "border-accent/40 bg-accent/15 text-accent-glow"
                          : "border-card/20 bg-night-900/60 text-fg/90"
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
                  <h3 className="text-lg font-bold text-fg sm:text-xl">
                    {t.projects.items[i]?.title ?? project.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
                    {t.projects.items[i]?.description ?? project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-accent/20 bg-accent/[0.06] px-2.5 py-1 text-[11px] font-medium text-accent-glow sm:px-3 sm:text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="mt-5 flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 rounded-full bg-accent-gradient px-4 py-2 text-sm font-semibold text-night-900 transition-transform hover:scale-105"
                      >
                        {t.projects.view}
                        <FiArrowUpRight className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 rtl:-scale-x-100" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-card/10 bg-card/5 text-fg/80 transition-colors hover:border-accent/50 hover:text-fg"
                      >
                        <FiGithub size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
