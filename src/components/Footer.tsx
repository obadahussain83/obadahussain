"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { FiArrowUp, FiGithub, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { site } from "@/data/site";
import { navLinks } from "@/data/navigation";
import { useApp } from "@/context/AppProviders";
import BrandMark from "@/components/ui/BrandMark";

const scrollTo = (href: string) => {
  if (href === "#home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const navKey: Record<string, "home" | "about" | "projects" | "services" | "experience" | "contact"> = {
  "#home": "home",
  "#about": "about",
  "#projects": "projects",
  "#services": "services",
  "#experience": "experience",
  "#contact": "contact",
};

const socials = [
  { label: "GitHub", href: site.socials.github, icon: FiGithub },
  { label: "LinkedIn", href: site.socials.linkedin, icon: FiLinkedin },
  { label: "Instagram", href: site.socials.instagram, icon: FiInstagram },
];

export default function Footer() {
  const { t } = useApp();
  const markRef = useRef<HTMLDivElement>(null);
  const markInView = useInView(markRef, { once: true, margin: "0px 0px -10% 0px" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden pt-20">
      {/* Horizon: a glowing line with a pulse travelling along it */}
      <div aria-hidden="true" className="footer-horizon absolute inset-x-0 top-0 h-px" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-[60rem] max-w-full -translate-x-1/2 rounded-[100%] bg-accent/15 blur-[90px]"
      />

      <div className="container-px relative">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
          {/* Brand */}
          <div className="order-1 col-span-2 md:order-none md:col-span-1">
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-3 text-start"
              title={t.footer.top}
            >
              <BrandMark className="h-12 w-12" />
              <span>
                <span className="block font-serif text-base font-bold text-fg">{site.name}</span>
                <span className="block text-xs text-muted">{t.hero.role}</span>
              </span>
            </button>
            <p className="mt-5 max-w-xs text-sm leading-[1.75] text-muted">{t.footer.tagline}</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.08] px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {t.contact.status}
            </span>
          </div>

          {/* Explore */}
          <nav aria-label={t.footer.explore} className="order-2 md:order-none">
            <h3 className="footer-heading">{t.footer.explore}</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="footer-link"
                  >
                    {t.nav[navKey[link.href]] ?? link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact (full width on phones so the email fits) */}
          <div className="order-4 col-span-2 md:order-none md:col-span-1">
            <h3 className="footer-heading">{t.footer.contact}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`} className="footer-link inline-flex items-center gap-2">
                  <FiMail className="shrink-0 text-accent-glow" size={14} />
                  <span>
                    {site.contact.email.split("@")[0]}@<wbr />
                    {site.contact.email.split("@")[1]}
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone}`} className="footer-link inline-flex items-center gap-2">
                  <FiPhone className="shrink-0 text-accent-glow" size={14} />
                  <span dir="ltr">{site.contact.phone}</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-muted">
                <FiMapPin className="shrink-0 text-accent-glow" size={14} />
                {t.about.cards[0].value}
              </li>
            </ul>
          </div>

          {/* Follow */}
          <div className="order-3 md:order-none">
            <h3 className="footer-heading">{t.footer.follow}</h3>
            <div className="mt-4 flex gap-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-card/15 text-fg/75 transition-[transform,border-color,color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-glow hover:shadow-glow-sm active:scale-[0.96]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Signature wordmark: outline, then a gradient fill wipes across */}
      <div ref={markRef} aria-hidden="true" className="relative mt-16 select-none" dir="ltr">
        <div className="footer-mark" data-in={markInView}>
          <span className="footer-mark-outline">{site.name.toUpperCase()}</span>
          <span className="footer-mark-fill">{site.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-card/10">
        <div className="container-px flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-faint sm:flex-row">
          <p>
            © {year} {site.name}. {t.footer.rights}
          </p>
          <p className="hidden md:block">{t.footer.built}</p>
          <button
            onClick={() => scrollTo("#home")}
            className="group inline-flex items-center gap-2 rounded-full border border-card/15 px-4 py-2 text-xs font-medium text-fg/80 transition-[border-color,color,transform] duration-200 ease-out hover:border-accent/50 hover:text-accent-glow active:scale-[0.96]"
          >
            {t.footer.top}
            <FiArrowUp className="transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
