"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { IconType } from "react-icons";
import { useInView } from "framer-motion";
import {
  FiCheck,
  FiClock,
  FiCopy,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiArrowUpRight,
  FiZap,
} from "react-icons/fi";
import { site } from "@/data/site";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { useApp } from "@/context/AppProviders";

const whatsappLink = `https://wa.me/${site.contact.whatsapp}`;

const socialItems = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: FiLinkedin },
  { label: "GitHub", href: site.socials.github, icon: FiGithub },
  { label: "Instagram", href: site.socials.instagram, icon: FiInstagram },
];

// Live clock for Palestine; rendered after mount to avoid hydration drift.
function useLocalTime(lang: string) {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    // Latin digits in both languages, matching the rest of the site.
    const fmt = new Intl.DateTimeFormat(lang === "ar" ? "ar-PS-u-nu-latn" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Hebron",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [lang]);
  return time;
}

export default function Contact() {
  const { t, lang } = useApp();
  const c = t.contact;
  const time = useLocalTime(lang);
  const spotRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  // The rotating border repaints every frame, so only run it while visible.
  const portalInView = useInView(portalRef, { margin: "100px" });

  // Cursor spotlight: only the spotlight layer's own vars change.
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = spotRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-ambient-slow absolute left-1/2 top-1/4 -ml-[20rem] h-80 w-[40rem] max-w-full rounded-full bg-accent/20 blur-[150px]" />
      </div>

      <div className="container-px">
        <Reveal direction="up">
          {/* Portal: rotating light border around a solid panel */}
          <div ref={portalRef} data-play={portalInView} className="contact-portal relative rounded-[2rem] p-px">
            <div
              onPointerMove={onPointerMove}
              className="surface relative grid overflow-hidden rounded-[calc(2rem-1px)] bg-card/[0.02] lg:grid-cols-[0.95fr_1.05fr]"
            >
              <div ref={spotRef} aria-hidden="true" className="contact-spotlight pointer-events-none absolute inset-0" />

              {/* Info pane */}
              <div className="relative flex flex-col gap-7 border-card/10 p-6 sm:p-10 lg:border-e">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {c.status}
                  </span>
                  <h2 className="mt-5 text-4xl font-bold leading-[1.15] tracking-tight text-fg sm:text-5xl">
                    <span className="bg-gradient-to-l from-accent-glow via-accent to-accent-violet bg-clip-text text-transparent">
                      {c.title}
                    </span>
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-[1.75] text-muted">{c.description}</p>
                </div>

                {/* Mini stats */}
                <div className="grid grid-cols-2 gap-3">
                  <Stat icon={FiClock} label={c.localTime} value={time ?? "--:--"} sub={t.about.cards[0].value} />
                  <Stat icon={FiZap} label={c.reply} value={c.replyValue} />
                </div>

                {/* Contact tiles */}
                <div className="grid gap-3">
                  <CopyTile
                    icon={FiMail}
                    label={c.labels.Email}
                    value={site.contact.email}
                    href={`mailto:${site.contact.email}`}
                    copyLabel={c.copy}
                    copiedLabel={c.copied}
                  />
                  <CopyTile
                    icon={FiPhone}
                    label={c.labels.Phone}
                    value={site.contact.phone}
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    copyLabel={c.copy}
                    copiedLabel={c.copied}
                    ltr
                  />
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/[0.07] p-4 transition-[border-color,background-color,transform] duration-200 ease-out hover:border-[#25D366]/50 hover:bg-[#25D366]/[0.12] active:scale-[0.99]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-black">
                      <FiMessageCircle size={19} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted">{c.labels.WhatsApp}</span>
                      <span className="block text-sm font-semibold text-fg">{c.whatsappValue}</span>
                    </span>
                    <FiArrowUpRight className="shrink-0 text-[#25D366] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" size={18} />
                  </a>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  {socialItems.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-card/15 text-fg/75 transition-[transform,border-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent-glow active:scale-[0.96]"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Form pane */}
              <div className="relative border-t border-card/10 p-6 sm:p-10 lg:border-t-0">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value, sub }: { icon: IconType; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-card/10 bg-card/[0.03] p-4">
      <span className="flex items-center gap-1.5 text-xs text-muted">
        <Icon size={13} className="text-accent-glow" />
        {label}
      </span>
      <span className="mt-1.5 block text-lg font-bold tabular-nums text-fg">{value}</span>
      {sub && <span className="block text-xs text-muted-faint">{sub}</span>}
    </div>
  );
}

interface CopyTileProps {
  icon: IconType;
  label: string;
  value: string;
  href: string;
  copyLabel: string;
  copiedLabel: string;
  ltr?: boolean;
}

function CopyTile({ icon: Icon, label, value, href, copyLabel, copiedLabel, ltr }: CopyTileProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = href;
    }
  };

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-card/10 bg-card/[0.03] p-4 transition-colors duration-200 hover:border-accent/30">
      <a
        href={href}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-glow transition-colors hover:bg-accent/20"
        aria-label={label}
      >
        <Icon size={18} />
      </a>
      <a href={href} className="min-w-0 flex-1">
        <span className="block text-xs text-muted">{label}</span>
        <span
          className="block text-[13px] font-semibold text-fg sm:text-sm"
          dir={ltr ? "ltr" : undefined}
          style={ltr ? { textAlign: "start", unicodeBidi: "plaintext" } : undefined}
        >
          {/* If an email must wrap, break after the @ rather than mid-word */}
          {value.includes("@") ? (
            <>
              {value.split("@")[0]}@<wbr />
              {value.split("@")[1]}
            </>
          ) : (
            value
          )}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={`${copyLabel} ${label}`}
        className={`relative flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-[border-color,color,background-color,transform] duration-200 ease-out active:scale-[0.96] ${
          copied
            ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
            : "border-card/15 text-fg/75 hover:border-accent/50 hover:text-accent-glow"
        }`}
      >
        {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
        <span className="hidden sm:inline" aria-live="polite">
          {copied ? copiedLabel : copyLabel}
        </span>
      </button>
    </div>
  );
}
