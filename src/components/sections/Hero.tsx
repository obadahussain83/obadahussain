"use client";

import Image from "next/image";
import { FiArrowRight, FiMail } from "react-icons/fi";
import { site } from "@/data/site";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";
import TypedName from "@/components/ui/TypedName";
import { useApp } from "@/context/AppProviders";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const { t } = useApp();
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-10 sm:pt-32 sm:pb-16"
    >
      {/* Decorative background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        {/* Warm gold light pools */}
        <div className="absolute -left-16 top-10 h-52 w-52 rounded-full bg-accent/16 blur-[56px] sm:-left-24 sm:h-72 sm:w-72 sm:bg-accent/20 sm:blur-[120px]" />
        <div className="absolute right-0 top-1/3 h-56 w-56 rounded-full bg-accent-violet/10 blur-[64px] sm:h-80 sm:w-80 sm:bg-accent-violet/15 sm:blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-accent-blue/10 blur-[56px] sm:h-64 sm:w-64 sm:bg-accent-blue/15 sm:blur-[120px]" />
      </div>

      <div className="container-px grid grid-cols-1 items-center gap-6 sm:gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Text column */}
        <div className="hero-mobile-rise hero-mobile-rise-delay order-2 min-w-0 text-center lg:order-1 lg:text-start">
          <p
            className="font-sans text-sm font-medium uppercase tracking-[0.35em] text-muted"
          >
            {t.hero.hello}
          </p>

          {/* The name — the star of the page */}
          <h1
            className="mt-3 text-5xl font-bold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl"
          >
            <TypedName first={t.hero.firstName} last={t.hero.lastName} />
          </h1>

          <div className="mx-auto mt-4 flex max-w-full items-center gap-3 sm:mt-6 sm:max-w-md sm:gap-4 lg:mx-0">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:from-accent/50 lg:via-accent/30" />
            <span className="min-w-0 break-words text-center font-sans text-xs font-semibold uppercase tracking-[0.22em] text-accent-glow sm:whitespace-nowrap sm:text-sm sm:tracking-[0.3em]">
              {t.hero.role}
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-accent/40 to-transparent" />
          </div>

          <p
            className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted sm:mt-7 sm:text-lg lg:mx-0"
          >
            {t.hero.description}
          </p>

          <div
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row lg:justify-start"
          >
            <Button
              onClick={() => scrollTo("#projects")}
              className="w-full sm:w-auto"
            >
              {t.hero.cta1}
              <FiArrowRight className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Button>
            <Button
              variant="secondary"
              onClick={() => scrollTo("#contact")}
              className="w-full sm:w-auto"
            >
              <FiMail className="text-accent-glow" />
              {t.hero.cta2}
            </Button>
          </div>

          <div
            className="mt-6 flex justify-center sm:mt-9 lg:justify-start"
          >
            <SocialLinks />
          </div>
        </div>

        {/* Image column */}
        <div className="hero-mobile-photo order-1 flex justify-center lg:order-2">
          <div className="group relative">
            {/* Rotating gold glow ring behind photo */}
            <div
              className="hero-photo-ring absolute -inset-4 -z-10 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.5),rgba(34,211,238,0.35),transparent_45%)] opacity-70 blur-md"
            />
            {/* Soft glow */}
            <div className="absolute inset-0 -z-10 scale-110 rounded-[2rem] bg-accent-gradient opacity-25 blur-2xl" />

            {/* Photo frame with gold hairline */}
            <div className="relative h-52 w-44 overflow-hidden rounded-[2rem] border border-accent/25 bg-night-700 shadow-glow-lg transition-transform duration-500 group-hover:scale-[1.02] sm:h-96 sm:w-80 lg:h-[30rem] lg:w-[24rem]">
              <Image
                src={site.profileImage}
                alt="Obada Hussein — Full Stack Developer"
                fill
                priority
                sizes="(max-width: 640px) 18rem, (max-width: 1024px) 20rem, 24rem"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              {/* Cinematic gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-900/70 via-transparent to-night-900/10" />
              {/* Inner hairline ring */}
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            </div>
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
