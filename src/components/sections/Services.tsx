"use client";

import { services } from "@/data/services";
import Reveal from "@/components/ui/Reveal";
import { useApp } from "@/context/AppProviders";

export default function Services() {
  const { t } = useApp();

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="container-px">
        {/* Heading (start-aligned) */}
        <Reveal className="mb-12 max-w-2xl text-start sm:mb-16">
          <span className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent-glow">
            {t.services.eyebrow}
            <span className="h-px w-8 bg-accent-glow/50" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-5 text-base leading-[1.7] text-muted sm:text-lg">
            {t.services.description}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-card/10 bg-card/10 sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={i} direction="up" delay={(i % 2) * 0.08}>
              <div className="group relative h-full bg-night-900 p-7 transition-colors duration-300 hover:bg-night-800/60 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-card/10 text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent-glow">
                    <service.icon size={20} />
                  </span>
                  <span className="font-mono text-sm text-muted-faint transition-colors group-hover:text-accent-glow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-fg">
                  {t.services.items[i]?.title ?? service.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-muted">
                  {t.services.items[i]?.description ?? service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
