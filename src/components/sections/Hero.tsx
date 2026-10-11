"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiArrowRight, FiChevronDown, FiMail } from "react-icons/fi";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";
import { usePointerParallax } from "@/components/ui/HeroExtras";
import { useApp } from "@/context/AppProviders";

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// The intro is plain CSS (.hero-in-* in globals.css) so it starts with the
// first paint instead of waiting for hydration. Delays are passed as --d;
// <html class="intro-seen"> (set by the inline script) skips it on repeat visits.
const delay = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

export default function Hero() {
  const { t, lang } = useApp();
  const reduceMotion = useReducedMotion();
  const { x: px, y: py } = usePointerParallax();

  // Name drifts against the pointer, the portrait drifts with it: cheap depth.
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  // Kept small so the head never drifts out of the gap between the words.
  const nameX = useTransform(sx, (v) => v * -8);
  const photoX = useTransform(sx, (v) => v * 6);

  // Scrolling away, the name rises and fades faster than the portrait moves:
  // the depth cue that phones get (they have no pointer parallax).
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const lift = reduceMotion ? 0 : 1;
  const nameY = useTransform([sy, scrollYProgress], ([p, s]: number[]) => p * -10 + s * -160 * lift);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.55], [1, reduceMotion ? 1 : 0]);

  // Highlights one role at a time in the strip along the bottom.
  const roles = t.hero.roles;
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % roles.length), 2200);
    return () => clearInterval(id);
  }, [reduceMotion, roles.length]);

  // Arabic letters must stay joined, so the name animates word by word there.
  const words = [t.hero.firstName, t.hero.lastName];
  const pieces = (word: string) => (lang === "ar" ? [word] : Array.from(word));
  let letterIndex = 0;

  return (
    <section
      ref={sectionRef}
      id="home"
      className="hero-stage relative flex min-h-[100svh] flex-col overflow-hidden pt-20 sm:pt-24"
    >
      {/* Background: grid + soft light behind the portrait */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-pattern bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div className="hero-stage-glow absolute left-1/2 top-[38%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      {/* Fade the bottom of the stage into the page (behind the portrait) */}
      <div aria-hidden="true" className="hero-stage-fade pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[38svh]" />

      {/* Giant name behind the portrait. From sm up it's a 3-column grid whose
          middle column is the gap the head sits in, always at page centre. */}
      <motion.h1
        aria-label={`${t.hero.firstName} ${t.hero.lastName}`}
        style={{ x: nameX, y: nameY, opacity: nameOpacity }}
        className="hero-stage-name pointer-events-none relative z-0 mt-[6svh] flex flex-wrap justify-center gap-x-[0.22em] px-4 text-center font-black uppercase leading-[0.9] tracking-tight sm:mt-[8svh] sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-x-0"
      >
        {words.map((word, w) => (
          <Fragment key={w}>
            {w > 0 && <span aria-hidden="true" className="hero-stage-gap hidden sm:block" />}
            <span
              aria-hidden="true"
              className={`hero-stage-word inline-flex whitespace-nowrap ${
                w === 0 ? "sm:justify-self-end" : "sm:justify-self-start"
              }`}
            >
              {pieces(word).map((ch, i) => (
                <span
                  key={i}
                  className="hero-stage-letter hero-in-letter inline-block"
                  style={delay(0.1 + letterIndex++ * 0.04)}
                >
                  {ch}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </motion.h1>

      {/* Cut-out portrait, rising into place in front of the name */}
      <div className="hero-stage-photo-box pointer-events-none absolute bottom-0 z-10">
        <motion.div style={{ x: photoX }} className="h-full w-full">
          <div className="hero-in-photo relative h-full w-full origin-bottom" style={delay(0.35)}>
            <Image
              src="/profile-cutout.png"
              alt={`${t.hero.firstName} ${t.hero.lastName}`}
              fill
              priority
              sizes="(max-width: 640px) 92vw, 520px"
              className="hero-stage-photo object-contain object-bottom"
            />
          </div>
        </motion.div>
      </div>

      {/* Intro copy + actions, bottom-start corner */}
      <div className="container-px relative z-30 mt-auto pb-20 sm:pb-28">
        <div className="mx-auto max-w-sm text-center lg:mx-0 lg:text-start">
          <p
            className="hero-in-up hero-copy-over text-lg font-bold uppercase leading-tight tracking-wide text-fg sm:text-2xl"
            style={delay(0.8)}
          >
            {t.hero.role}
          </p>
          <p
            className="hero-in-up hero-copy-over mt-1 text-sm font-medium sm:hidden"
            style={delay(0.9)}
          >
            {t.hero.tagline}
          </p>
          <p
            className="hero-in-up hero-copy-over mt-2 hidden text-sm leading-relaxed text-muted sm:block"
            style={delay(0.9)}
          >
            {t.hero.description}
          </p>
          <div
            className="hero-in-up mt-4 flex flex-row sm:mt-5 items-center justify-center gap-3 lg:justify-start"
            style={delay(1)}
          >
            <Button onClick={() => scrollTo("#projects")} className="flex-1 whitespace-nowrap sm:flex-none">
              {t.hero.cta1}
              <FiArrowRight className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
            </Button>
            <Button variant="secondary" onClick={() => scrollTo("#contact")} className="hero-btn-over flex-1 whitespace-nowrap sm:flex-none">
              <FiMail className="text-accent-glow" />
              {t.hero.cta2}
            </Button>
          </div>
        </div>

        {/* Socials: bottom-end corner on desktop; a slim column on the
            portrait's edge below lg, so the copy can stay low. */}
        <div className="hero-in-up absolute bottom-28 end-12 hidden lg:block" style={delay(1.1)}>
          <SocialLinks />
        </div>
      </div>
      <div
        className="hero-in-up absolute bottom-[42svh] end-3 z-30 sm:end-6 lg:hidden"
        style={delay(1.1)}
      >
        <SocialLinks className="hero-socials-over flex-col !gap-2" size={16} />
      </div>

      {/* Role strip along the bottom edge: a looping marquee on phones,
          a row with the active role highlighted from sm up. */}
      <div
        aria-hidden="true"
        style={delay(1.2)}
        className="hero-in-fade hero-marquee absolute inset-x-0 bottom-10 z-30 overflow-hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-muted sm:hidden"
        dir="ltr"
      >
        <div className="hero-marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {roles.map((role) => (
                <li key={role} className="flex items-center gap-2 px-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-glow" />
                  {role}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <ul
        dir="ltr"
        style={delay(1.2)}
        className="hero-in-fade absolute inset-x-0 bottom-8 z-30 hidden flex-wrap items-center justify-center gap-x-10 gap-y-1 px-4 text-sm font-semibold uppercase tracking-[0.18em] sm:flex"
      >
        {roles.map((role, i) => (
          <li
            key={role}
            className={`flex items-center gap-2 transition-colors duration-500 ${
              i === active ? "text-fg" : "text-muted-faint"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                i === active ? "bg-accent-glow" : "bg-current"
              }`}
            />
            {role}
          </li>
        ))}
      </ul>

      {/* Scroll cue (phones) */}
      <button
        type="button"
        onClick={() => scrollTo("#about")}
        aria-label={t.nav.about}
        style={delay(1.3)}
        className="hero-in-fade absolute bottom-2 left-1/2 z-30 -translate-x-1/2 p-1 text-accent-glow sm:hidden"
      >
        <FiChevronDown size={20} className="hero-scroll-cue" />
      </button>
    </section>
  );
}
