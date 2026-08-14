"use client";

import { useState, type FormEvent } from "react";
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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t, lang } = useApp();
  const f = t.contact.form;
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

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
    setForm((f) => ({ ...f, [name]: value }));
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

    const body =
      lang === "ar"
        ? `مرحباً ${site.name}، أنا ${form.name}.\n` +
          `البريد: ${form.email}\n` +
          phoneLine +
          `الرسالة: ${form.message}`
        : `Hi ${site.name}, I'm ${form.name}.\n` +
          `Email: ${form.email}\n` +
          phoneLine +
          `Message: ${form.message}`;

    const url = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(
      body
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSent(true);
    setForm(initial);
    setTimeout(() => setSent(false), 5000);
  };

  const fieldClasses = (hasError?: string) =>
    `w-full rounded-xl border bg-card/[0.03] px-4 py-3 text-sm text-fg placeholder:text-muted-faint outline-none transition-colors focus:border-accent/60 focus:bg-card/[0.05] ${
      hasError ? "border-red-500/60" : "border-accent/20"
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder={f.name}
            className={fieldClasses(errors.name)}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={f.email}
            className={fieldClasses(errors.email)}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="sr-only">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder={f.phone}
          className={fieldClasses(errors.phone)}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={f.message}
          className={`${fieldClasses(errors.message)} resize-none`}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-400">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-semibold text-night-900 shadow-glow-sm transition-transform duration-200 hover:scale-[1.02]"
      >
        {sent ? (
          <>
            <FiCheckCircle />
            {f.sent}
          </>
        ) : (
          <>
            <FiSend className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
            {f.send}
          </>
        )}
      </button>
    </form>
  );
}
