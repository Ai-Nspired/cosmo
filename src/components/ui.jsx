// Shared building blocks. Import what you need: import { Button, Field, MonoLabel, ... } from "../components/ui";
import { forwardRef } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { cn, RollText } from "@wron/kit";

/** Page width container on the 12-column grid (1440 max). */
export function Container({ className, children, as: As = "div", ...rest }) {
  return <As className={cn("mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-8", className)} {...rest}>{children}</As>;
}

/** Geist Mono label: calculation labels, dates, status. 12px, 0.06em, uppercase. */
export function MonoLabel({ className, children, as: As = "p", ...rest }) {
  return <As className={cn("mono-label", className)} {...rest}>{children}</As>;
}

/** Section heading (30-40px, 550 weight) with optional mono eyebrow and lead copy. */
export function SectionHeading({ eyebrow, title, lead, as: As = "h2", className, children }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow && <MonoLabel className="mb-3">{eyebrow}</MonoLabel>}
      <As className="h-section text-ink">{title}</As>
      {lead && <p className="mt-4 text-[17px] leading-[1.6] text-muted">{lead}</p>}
      {children}
    </div>
  );
}

const BTN = {
  primary: "bg-primary text-primary-ink hover:bg-[#45E0B3] shadow-[0_0_0_1px_rgba(45,212,163,0.3),0_8px_30px_-12px_rgba(45,212,163,0.6)]",
  secondary: "border border-line bg-surface text-ink hover:border-primary/60 hover:text-primary",
  ghost: "text-ink hover:text-primary",
  violet: "border border-accent/60 bg-accent/10 text-ink hover:bg-accent/20",
};
const SIZE = { md: "min-h-[48px] px-5 text-[15px]", lg: "min-h-[54px] px-6 text-[16px]", sm: "min-h-[44px] px-4 text-[14px]" };

/**
 * Button: variant primary|secondary|ghost|violet, size sm|md|lg.
 * Pass `to` for an internal link, `href` for an external/anchor link, else it's a <button>.
 * `arrow` adds a nudging arrow. Primary labels roll on hover.
 */
export const Button = forwardRef(function Button({ variant = "primary", size = "md", to, href, arrow, icon: Icon, className, children, ...rest }, ref) {
  const cls = cn(
    "group inline-flex items-center justify-center gap-2 rounded-theme font-[550] transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    BTN[variant], SIZE[size], className
  );
  const inner = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      {variant === "primary" && typeof children === "string" ? <RollText>{children}</RollText> : children}
      {arrow && <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
    </>
  );
  if (to) return <Link ref={ref} to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a ref={ref} href={href} className={cls} {...rest}>{inner}</a>;
  return <button ref={ref} type={rest.type || "button"} className={cls} {...rest}>{inner}</button>;
});

/** Text link with arrow, for "Open full guide", "See calculation". */
export function ArrowLink({ to, href, children, className, ...rest }) {
  const cls = cn("group inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-[550] text-primary transition-colors hover:text-ink", className);
  const inner = <>{children}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></>;
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  return <a href={href} className={cls} {...rest}>{inner}</a>;
}

/**
 * Labelled input, 18px text, 52px+ tall, optional leading icon, help and inline error.
 * The visible label can be hidden with hideLabel (still read by screen readers).
 */
export const Field = forwardRef(function Field({ id, label, hideLabel, icon: Icon, error, help, className, inputClassName, ...rest }, ref) {
  const helpId = help ? `${id}-help` : undefined;
  const errId = error ? `${id}-error` : undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className={cn("mb-2 block text-[14px] font-[550] text-ink/90", hideLabel && "sr-only")}>{label}</label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />}
        <input
          ref={ref}
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={cn(helpId, errId) || undefined}
          className={cn(
            "block min-h-[54px] w-full rounded-theme border bg-bg/60 px-4 text-[18px] text-ink placeholder:text-muted/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 [color-scheme:dark]",
            Icon && "pl-12",
            error ? "border-red-400/70 focus:border-red-400" : "border-line hover:border-ink/25 focus:border-primary",
            inputClassName
          )}
          {...rest}
        />
      </div>
      {error && <p id={errId} role="alert" className="mt-2 text-[14px] leading-snug text-red-300">{error}</p>}
      {help && !error && <p id={helpId} className="mt-2 text-[13px] leading-snug text-muted">{help}</p>}
    </div>
  );
});

/** Teal-on-dark surface panel with hairline border. */
export function Panel({ className, children, as: As = "div", ...rest }) {
  return <As className={cn("rounded-theme border border-line bg-surface", className)} {...rest}>{children}</As>;
}

/** Violet "Master number" badge. Pass base to show "base 2". */
export function MasterBadge({ base, className }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border border-accent/60 bg-accent/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-accent ring-violet", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
      Master number{base ? ` · base ${base}` : ""}
    </span>
  );
}

/** Big tabular number for results (52-72px). */
export function BigNumber({ value, master, className }) {
  return <span className={cn("num block text-[clamp(52px,5vw,72px)] font-semibold leading-none tracking-[-0.04em]", master ? "text-accent glow-violet" : "text-ink", className)}>{value}</span>;
}

/** Sign glyph rendered as text (never emoji). */
export function Glyph({ children, className }) {
  return <span className={cn("glyph", className)} aria-hidden="true">{children}</span>;
}

/** Disclaimer line used at the end of readings and guides. */
export function Disclaimer({ className }) {
  return <p className={cn("text-[14px] leading-relaxed text-muted", className)}>For entertainment and personal reflection, not prediction or scientific assessment.</p>;
}
