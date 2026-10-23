import { motion, useReducedMotion } from "motion/react";
import { cn } from "@wron/kit";

/** Profile modules assemble from a thin stroke into a rectangular panel over 450ms. */
export function Assemble({ children, className, delay = 0, as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  return (
    <M
      className={cn("relative", className)}
      initial={reduce ? false : { clipPath: "inset(49.6% 0% 49.6% 0%)", opacity: 0.5 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

function Col({ title, children }) {
  return (
    <div className="border-t border-line pt-4">
      <h3 className="mono-label">{title}</h3>
      <div className="mt-3 text-[16px] leading-[1.6] text-ink/90 md:text-[16px] max-md:text-[17px]">{children}</div>
    </div>
  );
}

function List({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((s) => (
        <li key={s} className="flex gap-2.5">
          <span className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <span>{s}</span>
        </li>
      ))}
    </ul>
  );
}

/** Traits, Strengths, Challenges and Try today, in columns. Omit traits for three columns. */
export function ReadingCols({ traits, strengths, challenges, tip, className }) {
  const four = !!traits;
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", four ? "lg:grid-cols-4" : "lg:grid-cols-3", className)}>
      {four && <Col title="Traits"><p>{traits}</p></Col>}
      <Col title="Strengths"><List items={strengths} /></Col>
      <Col title="Challenges"><List items={challenges} /></Col>
      <Col title="Try today"><p>{tip}</p></Col>
    </div>
  );
}

export function Keywords({ items, className }) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((k) => (
        <li key={k} className="rounded-full border border-line px-3 py-1 font-mono text-[12px] tracking-[0.06em] text-muted">{k}</li>
      ))}
    </ul>
  );
}
