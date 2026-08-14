"use client";

import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";
import { site } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { useApp } from "@/context/AppProviders";

const whatsappLink = `https://wa.me/${site.contact.whatsapp}`;

const contactItems = [
  {
    label: "Phone",
    value: site.contact.phone,
    href: `tel:${site.contact.phone.replace(/\s/g, "")}`,
    icon: FiPhone,
  },
  {
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    icon: FiMail,
  },
  {
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: whatsappLink,
    icon: FiMessageCircle,
  },
  {
    label: "Location",
    value: site.contact.location,
    href: "",
    icon: FiMapPin,
  },
];

const socialItems = [
  { label: "LinkedIn", href: site.socials.linkedin, icon: FiLinkedin },
  { label: "GitHub", href: site.socials.github, icon: FiGithub },
  { label: "Instagram", href: site.socials.instagram, icon: FiInstagram },
];

export default function Contact() {
  const { t } = useApp();
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-ambient-slow absolute left-1/2 top-0 -ml-[20rem] h-80 w-[40rem] max-w-full rounded-full bg-accent/25 blur-[150px]" />
      </div>

      <div className="container-px">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: contact info */}
          <Reveal direction="right" className="h-full">
            <div className="glass flex h-full flex-col gap-4 rounded-3xl p-6 sm:p-8 lg:justify-between">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {contactItems.map((item) => {
                const inner = (
                  <div className="flex h-full items-center gap-3 rounded-2xl border border-card/5 bg-card/[0.03] p-4 transition-colors duration-300 hover:border-accent/30 hover:bg-card/[0.05]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent-glow">
                      <item.icon size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-muted-faint">
                        {t.contact.labels[item.label] ?? item.label}
                      </p>
                      <p
                        className={`truncate text-sm font-semibold text-fg ${
                          item.label === "Phone" ? "phone-ltr" : ""
                        }`}
                      >
                        {item.label === "WhatsApp"
                          ? t.contact.whatsappValue
                          : item.label === "Location"
                          ? t.about.cards[0].value
                          : item.value}
                      </p>
                    </div>
                  </div>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label}>{inner}</div>
                );
              })}
            </div>

            {/* WhatsApp + Email CTAs */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-6 py-4 text-sm font-semibold text-black transition-transform duration-200 hover:scale-[1.02]"
              >
                <FiMessageCircle size={20} />
                {t.contact.whatsappCta}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-gradient px-6 py-4 text-sm font-semibold text-night-900 shadow-glow-sm transition-transform duration-200 hover:scale-[1.02]"
              >
                <FiMail size={20} />
                {t.contact.emailCta}
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socialItems.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/20 bg-accent/[0.05] text-fg/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent-glow hover:shadow-glow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="left">
            <div className="glass rounded-3xl p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
