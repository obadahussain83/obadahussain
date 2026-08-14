"use client";

import { site } from "@/data/site";
import SocialLinks from "@/components/ui/SocialLinks";
import { useApp } from "@/context/AppProviders";

const scrollTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="border-t border-accent/15 bg-night-800/40 py-10">
      <div className="container-px flex flex-col items-center justify-between gap-6 sm:flex-row">
        <button
          onClick={scrollTop}
          className="flex items-center gap-3 text-start"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-gradient font-serif text-sm font-bold text-night-900 shadow-glow-sm">
            OH
          </span>
          <span className="text-start">
            <span className="block font-serif text-sm font-bold text-fg">
              {site.name}
            </span>
            <span className="block text-xs text-muted">{t.hero.role}</span>
          </span>
        </button>

        <SocialLinks />
      </div>

      <div className="container-px mt-8 border-t border-card/5 pt-6 text-center">
        <p className="text-sm text-muted-faint">
          © 2026 {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
