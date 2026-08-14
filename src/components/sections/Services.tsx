"use client";

import { services } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useApp } from "@/context/AppProviders";

export default function Services() {
  const { t } = useApp();
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-ambient-slow absolute right-0 top-1/4 h-80 w-80 rounded-full bg-accent-violet/20 blur-[140px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          description={t.services.description}
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={i} direction="up" delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-accent/15 bg-card/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:bg-card/[0.05] hover:shadow-glow-sm">
                {/* Accent line on hover */}
                <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-accent-gradient transition-transform duration-300 group-hover:scale-y-100" />

                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-glow transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-glow-sm">
                  <service.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-fg">
                  {t.services.items[i]?.title ?? service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
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
