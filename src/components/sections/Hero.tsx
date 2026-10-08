"use client";

import { useRef, type PointerEvent } from "react";
import HangingProfileCard from "@/components/ui/HangingProfileCard";
import { FiArrowRight, FiMail } from "react-icons/fi";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";
import TypedName from "@/components/ui/TypedName";
import { RoleTicker, TechChips, usePointerParallax } from "@/components/ui/HeroExtras";
import { projects } from "@/data/projects";
import { techCount } from "@/data/stats";
import { useApp } from "@/context/AppProviders";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const { t } = useApp();
  const { x: px, y: py } = usePointerParallax();
  const spotRef = useRef<HTMLDivElement>(null);

  // Cursor spotlight across the hero (only the spotlight layer's vars change).
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const el = spotRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="home"
      onPointerMove={onPointerMove}
      className="relative flex min-h-screen items-center overflow-hidden pt-20 pb-8 sm:pt-32 sm:pb-16"
    >
      {/* Decorative background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        {/* Warm gold light pools */}
        <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-accent/16 blur-[56px] sm:-left-24 sm:h-72 sm:w-72 sm:bg-accent/20 sm:blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-56 w-56 rounded-full bg-accent-violet/10 blur-[64px] sm:h-80 sm:w-80 sm:bg-accent-violet/15 sm:blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-accent-blue/10 blur-[56px] sm:h-64 sm:w-64 sm:bg-accent-blue/15 sm:blur-[120px]" />
        {/* Cursor spotlight (desktop) */}
        <div ref={spotRef} className="hero-spotlight absolute inset-0 hidden lg:block" />
      </div>

      <div className="container-px grid grid-cols-1 items-center gap-3 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Text column */}
        <div className="hero-mobile-rise hero-mobile-rise-delay order-2 min-w-0 text-center lg:order-1 lg:text-start">
          <p
            className="font-sans text-sm font-medium uppercase tracking-normal text-muted sm:tracking-[0.35em]"
          >
            {t.hero.hello}
          </p>

          {/* The name — the star of the page */}
          <h1
            className="mt-2 text-[2.6rem] font-bold leading-[1.02] tracking-tight text-fg sm:mt-3 sm:text-6xl lg:text-7xl"
          >
            <TypedName first={t.hero.firstName} last={t.hero.lastName} />
          </h1>

          <div className="mx-auto mt-4 flex max-w-full items-center justify-center gap-3 sm:mt-6 lg:justify-start sm:max-w-md sm:gap-4 lg:mx-0">
            <span className="hidden h-px w-10 bg-gradient-to-l from-accent-glow to-transparent lg:block rtl:bg-gradient-to-r" aria-hidden="true" />
            <span className="min-w-0 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent-glow sm:text-sm sm:tracking-[0.3em]">
              <RoleTicker roles={t.hero.roles} />
            </span>
          </div>

          <p
            className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted sm:mt-7 sm:text-lg lg:mx-0"
          >
            {t.hero.description}
          </p>

          <div
            className="mt-4 flex flex-row items-center justify-center gap-3 sm:mt-9 lg:justify-start"
          >
            <Button
              onClick={() => scrollTo("#projects")}
              className="flex-1 sm:flex-none"
            >
              {t.hero.cta1}
              <FiArrowRight className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => scrollTo("#contact")}
              className="flex-1 sm:flex-none"
            >
              <FiMail className="text-accent-glow" />
              {t.hero.cta2}
            </Button>
          </div>

          <div
            className="mt-4 flex items-center justify-center gap-6 sm:mt-9 lg:justify-start"
          >
            <SocialLinks />
            {/* Quick proof points (desktop) */}
            <div className="hidden items-center gap-5 border-s border-card/15 ps-6 lg:flex">
              <span className="text-start">
                <b className="block text-xl font-bold tabular-nums text-fg" dir="ltr">{projects.length}+</b>
                <span className="text-xs text-muted">{t.about.stats[0].label}</span>
              </span>
              <span className="text-start">
                <b className="block text-xl font-bold tabular-nums text-fg" dir="ltr">{techCount}+</b>
                <span className="text-xs text-muted">{t.about.stats[1].label}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Suspended, interactive profile badge */}
        <div className="relative order-1 flex min-w-0 justify-center lg:order-2">
          {/* Slowly turning aurora behind the badge */}
          <div aria-hidden="true" className="hero-aurora pointer-events-none absolute left-1/2 top-[42%] -z-10" />
          <TechChips px={px} py={py} />
          <div className="relative z-10 flex w-full justify-center">
            <HangingProfileCard />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-faint">
          {t.hero.scroll}
        </span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-accent/30 p-1">
          <span
            className="h-1.5 w-1 rounded-full bg-accent"
          />
        </span>
      </div>
    </section>
  );
}
