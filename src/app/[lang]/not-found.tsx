"use client";

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useApp } from "@/context/AppProviders";

const copy = {
  en: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has been moved.",
    cta: "Back to home",
  },
  ar: {
    title: "الصفحة غير موجودة",
    text: "الصفحة اللي بتدوّر عليها مش موجودة أو انتقلت لمكان تاني.",
    cta: "الرجوع للرئيسية",
  },
} as const;

export default function NotFound() {
  const { lang } = useApp();
  const c = copy[lang] ?? copy.en;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Ambient glow, consistent with the rest of the site */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[150px]" />
      </div>

      <div className="text-center">
        <p className="bg-accent-gradient bg-clip-text font-serif text-8xl font-bold leading-none text-transparent sm:text-9xl">
          404
        </p>
        <h1 className="mt-6 text-2xl font-bold text-fg sm:text-3xl">{c.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          {c.text}
        </p>

        <Link
          href="/"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-night-900 shadow-glow transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-[0.97]"
        >
          <FiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5 rtl:rotate-180" />
          {c.cta}
        </Link>
      </div>
    </main>
  );
}
