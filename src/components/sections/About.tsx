"use client";

import { aboutCards } from "@/data/about";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import Reveal from "@/components/ui/Reveal";
import DownloadCVButton from "@/components/ui/DownloadCVButton";
import { useApp } from "@/context/AppProviders";

const techCount = skills.reduce((n, g) => n + g.items.length, 0);

export default function About() {
  const { t } = useApp();

  const statValues = [
    `${projects.length}+`,
    `${Math.floor(techCount / 5) * 5}+`,
    t.about.stats[2].value ?? "Full Stack",
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-px">
        {/* Heading (start-aligned) */}
        <Reveal className="mb-12 max-w-2xl text-start sm:mb-16">
          <span className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent-glow">
            {t.about.eyebrow}
            <span className="h-px w-8 bg-accent-glow/50" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {t.about.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
          {/* Text + stats + CTA */}
          <Reveal direction="up">
            <p className="max-w-xl text-lg leading-[1.8] text-fg/85 sm:text-xl">
              {t.about.text}
            </p>

            {/* Stat strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-card/10 pt-8">
              {t.about.stats.map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                    {statValues[i]}
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <DownloadCVButton href={site.cvUrl} label={t.about.download} />
          </Reveal>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4">
            {aboutCards.map((card, i) => (
              <Reveal key={i} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-xl border border-card/10 bg-card/[0.02] p-5 transition-colors duration-300 hover:border-accent/30 hover:bg-card/[0.04]">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-card/10 text-accent-glow">
                    <card.icon size={18} />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-muted-faint">
                    {t.about.cards[i]?.label ?? card.label}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-fg sm:text-base">
                    {t.about.cards[i]?.value ?? card.value}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
