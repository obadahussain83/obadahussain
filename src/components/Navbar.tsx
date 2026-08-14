"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "@/data/navigation";
import { site } from "@/data/site";
import { useApp } from "@/context/AppProviders";
import ToggleControls from "@/components/ui/ToggleControls";

// Maps a nav href to its translation key.
const navKey: Record<string, keyof ReturnType<typeof useApp>["t"]["nav"]> = {
  "#home": "home",
  "#about": "about",
  "#skills": "skills",
  "#projects": "projects",
  "#services": "services",
  "#contact": "contact",
};

export default function Navbar() {
  const { t } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible section that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      // Center band of the viewport so the active link flips mid-section.
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-accent/10 bg-night-900/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between sm:h-20">
        {/* Brand */}
        <button
          onClick={() => handleNav("#home")}
          className="group flex items-center gap-2 text-lg font-bold tracking-tight text-fg"
          aria-label="Go to home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gradient font-serif text-sm font-bold text-night-900 shadow-glow-sm">
            OH
          </span>
          <span className="hidden font-serif sm:inline">{site.name}</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNav(link.href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-accent-glow"
                      : "text-fg/80 hover:text-accent-glow"
                  }`}
                >
                  {t.nav[navKey[link.href]] ?? link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-gradient"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Controls + CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <ToggleControls className="hidden sm:flex" />

          <button
            onClick={() => handleNav("#contact")}
            className="hidden rounded-full bg-accent-gradient px-5 py-2.5 text-sm font-semibold text-night-900 shadow-glow-sm transition-transform duration-200 hover:scale-105 lg:inline-flex"
          >
            {t.nav.cta}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.05] text-fg md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-accent/10 bg-night-900/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-px flex flex-col gap-1 py-4">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNav(link.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex w-full items-center gap-2 rounded-lg px-4 py-3 text-start text-base font-medium transition-colors ${
                        isActive
                          ? "bg-accent/[0.08] text-accent-glow"
                          : "text-fg/90 hover:bg-accent/[0.06] hover:text-fg"
                      }`}
                    >
                      {isActive && (
                        <span className="h-4 w-0.5 rounded-full bg-accent-gradient" />
                      )}
                      {t.nav[navKey[link.href]] ?? link.label}
                    </button>
                  </li>
                );
              })}
              <li className="mt-3 flex items-center justify-between gap-3">
                <ToggleControls />
                <button
                  onClick={() => handleNav("#contact")}
                  className="rounded-full bg-accent-gradient px-5 py-2.5 text-center text-sm font-semibold text-night-900 shadow-glow-sm"
                >
                  {t.nav.cta}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
