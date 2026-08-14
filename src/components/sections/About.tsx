"use client";

import { aboutCards } from "@/data/about";
import { site } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Typewriter from "@/components/ui/Typewriter";
import DownloadCVButton from "@/components/ui/DownloadCVButton";
import { useApp } from "@/context/AppProviders";

export default function About() {
  const { t } = useApp();
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-px">
        {/* About: intro + magnetic CV CTA */}
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Text + CTA */}
          <Reveal direction="right">
            <p className="text-lg leading-relaxed text-fg/80 sm:text-xl">
              <Typewriter text={t.about.text} speed={22} />
            </p>

            <DownloadCVButton href={site.cvUrl} label={t.about.download} />
          </Reveal>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4">
            {aboutCards.map((card, i) => (
              <Reveal key={i} direction="up" delay={i * 0.08}>
                <div className="glass glass-hover h-full rounded-2xl p-5">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent-glow">
                    <card.icon size={20} />
                  </div>
                  <p className="text-xs uppercase tracking-wider text-muted-faint">
                    {t.about.cards[i]?.label ?? card.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-fg sm:text-base">
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
