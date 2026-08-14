"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dict, type Lang } from "@/i18n/dict";

type Theme = "dark" | "light";

interface AppContextValue {
  lang: Lang;
  theme: Theme;
  toggleLang: () => void;
  toggleTheme: () => void;
  t: (typeof dict)["en"];
}

const AppContext = createContext<AppContextValue | null>(null);

const applyDocument = (lang: Lang, theme: Theme) => {
  const el = document.documentElement;
  el.setAttribute("data-theme", theme);
  el.setAttribute("lang", lang);
  el.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
};

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("dark");

  // Hydrate from the values the inline script already applied to <html>.
  useEffect(() => {
    const el = document.documentElement;
    const savedLang = (el.getAttribute("lang") as Lang) || "ar";
    const savedTheme = (el.getAttribute("data-theme") as Theme) || "dark";
    setLang(savedLang);
    setTheme(savedTheme);
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next: Lang = prev === "en" ? "ar" : "en";
      try {
        localStorage.setItem("lang", next);
      } catch {}
      applyDocument(next, theme);
      return next;
    });
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {}
      applyDocument(lang, next);
      return next;
    });
  }, [lang]);

  const value = useMemo<AppContextValue>(
    () => ({
      lang,
      theme,
      toggleLang,
      toggleTheme,
      t: dict[lang] as (typeof dict)["en"],
    }),
    [lang, theme, toggleLang, toggleTheme]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProviders");
  return ctx;
}
