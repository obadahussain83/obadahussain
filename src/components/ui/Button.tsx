"use client";

import type { ReactNode, MouseEventHandler } from "react";

type Variant = "primary" | "secondary";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Full width on its own row. */
  block?: boolean;
}

interface AsButton extends BaseProps {
  as?: "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
}

interface AsLink extends BaseProps {
  as: "a";
  href: string;
  download?: boolean;
  target?: string;
  rel?: string;
}

type ButtonProps = AsButton | AsLink;

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-transform duration-200 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.03] active:scale-[0.97] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100";

const variants: Record<Variant, string> = {
  primary: "bg-accent-gradient text-night-900 shadow-glow hover:shadow-glow-lg",
  secondary:
    "border border-accent/30 bg-card/[0.02] text-fg hover:border-accent/60 hover:bg-accent/[0.06]",
};

/**
 * Shared call-to-action button. One place for the site's button styling:
 * gradient fill, hover/press feedback, and (on primary) a sheen sweep.
 * Renders as <button> or <a> depending on `as`.
 */
export default function Button(props: ButtonProps) {
  const { children, variant = "primary", className = "", block } = props;
  const classes = `${base} ${variants[variant]} ${block ? "w-full" : ""} ${className}`;

  const sheen =
    variant === "primary" ? (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-full motion-reduce:hidden"
      />
    ) : null;

  if (props.as === "a") {
    const { href, download, target, rel } = props;
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        className={classes}
      >
        {sheen}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </a>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={classes}
    >
      {sheen}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}
