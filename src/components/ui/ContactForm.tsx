"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { FiSend, FiCheckCircle } from "react-icons/fi";
import { useApp } from "@/context/AppProviders";
import { site } from "@/data/site";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = { name: "", email: "", phone: "", message: "" };
const MAX_MESSAGE = 500;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t, lang } = useApp();
  const f = t.contact.form;
  const [form, setForm] = useState<FormState>(initial);
  const [type, setType] = useState<number | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const sentTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(sentTimer.current), []);

  const validate = (values: FormState): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = f.errName;
    if (!values.email.trim()) next.email = f.errEmailReq;
    else if (!emailRegex.test(values.email)) next.email = f.errEmailValid;
    if (values.phone.trim() && values.phone.trim().length < 6)
      next.phone = f.errPhone;
    if (!values.message.trim()) next.message = f.errMsgReq;
    else if (values.message.trim().length < 10)
      next.message = f.errMsgLen;
    return next;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    // Forward the message to WhatsApp with a prefilled, formatted text.
    const phoneLine = form.phone.trim()
      ? lang === "ar"
        ? `الهاتف: ${form.phone}\n`
        : `Phone: ${form.phone}\n`
      : "";
    const typeLine = type !== null ? `${f.typeLine}: ${f.types[type]}\n` : "";

    const body =
      lang === "ar"
        ? `مرحباً ${site.name}، أنا ${form.name}.\n` +
          `البريد: ${form.email}\n` +
          phoneLine +
          typeLine +
          `الرسالة: ${form.message}`
        : `Hi ${site.name}, I'm ${form.name}.\n` +
          `Email: ${form.email}\n` +
          phoneLine +
          typeLine +
          `Message: ${form.message}`;

    const url = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
      body
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSent(true);
    setForm(initial);
    setType(null);
    window.clearTimeout(sentTimer.current);
    sentTimer.current = window.setTimeout(() => setSent(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex h-full flex-col gap-5">
      {/* Project type */}
      <fieldset>
        <legend className="mb-3 text-sm font-semibold text-fg">{f.typeLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {f.types.map((label, i) => {
            const on = type === i;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => setType(on ? null : i)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-[border-color,background-color,color,transform] duration-200 ease-out active:scale-[0.96] ${
                  on
                    ? "border-accent/60 bg-accent/15 text-fg shadow-glow-sm"
                    : "border-card/15 text-muted hover:border-card/30 hover:text-fg"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field id="name" label={f.name} error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder=" "
            className={inputClasses(errors.name)}
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field id="email" label={f.email} error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            value={form.email}
            onChange={handleChange}
            placeholder=" "
            className={`${inputClasses(errors.email)} text-start [unicode-bidi:plaintext]`}
            aria-invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field id="phone" label={f.phone} error={errors.phone}>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          dir="ltr"
          value={form.phone}
          onChange={handleChange}
          placeholder=" "
          className={`${inputClasses(errors.phone)} text-start [unicode-bidi:plaintext]`}
          aria-invalid={!!errors.phone}
        />
      </Field>

      <Field
        id="message"
        label={f.message}
        error={errors.message}
        aside={
          <span className="pointer-events-none absolute bottom-3 end-4 font-mono text-[11px] text-muted-faint" dir="ltr">
            {form.message.length}/{MAX_MESSAGE}
          </span>
        }
      >
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={MAX_MESSAGE}
          value={form.message}
          onChange={handleChange}
          placeholder=" "
          className={`${inputClasses(errors.message)} resize-none pb-8`}
          aria-invalid={!!errors.message}
        />
      </Field>

      <div className="mt-auto">
        <button
          type="submit"
          className="contact-send group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-accent-gradient px-7 py-4 text-sm font-semibold text-night-900 shadow-glow-sm transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          {/* Both states stay mounted and crossfade (with a touch of blur) */}
          <span
            className={`inline-flex items-center gap-2 transition-[opacity,filter,transform] duration-300 ease-out ${
              sent ? "scale-95 opacity-0 blur-[3px]" : "opacity-100"
            }`}
          >
            <FiSend className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
            {f.send}
          </span>
          <span
            aria-live="polite"
            className={`absolute inset-0 inline-flex items-center justify-center gap-2 transition-[opacity,filter,transform] duration-300 ease-out ${
              sent ? "opacity-100" : "scale-95 opacity-0 blur-[3px]"
            }`}
          >
            {sent && (
              <>
                <FiCheckCircle />
                {f.sent}
              </>
            )}
          </span>
        </button>
        <p className="mt-3 text-center text-xs text-muted-faint">{f.via}</p>
      </div>
    </form>
  );
}

const inputClasses = (hasError?: string) =>
  `peer block w-full rounded-2xl border bg-card/[0.03] px-4 pb-2.5 pt-6 text-sm text-fg outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:bg-card/[0.05] focus:shadow-[0_0_0_4px_rgb(var(--accent)/0.12)] ${
    hasError ? "border-red-500/60" : "border-card/15 focus:border-accent/60"
  }`;

// Floating label: sits inside the field, lifts and shrinks on focus / when filled.
function Field({
  id,
  label,
  error,
  aside,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="relative">
        {children}
        <label
          htmlFor={id}
          className="pointer-events-none absolute start-4 top-4 origin-top-left text-sm text-muted transition-transform duration-200 ease-out peer-focus:-translate-y-2.5 peer-focus:scale-[0.8] peer-focus:text-accent-glow peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.8] rtl:origin-top-right"
        >
          {label}
        </label>
        {aside}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
