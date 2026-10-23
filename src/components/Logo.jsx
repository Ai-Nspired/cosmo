import { Link } from "react-router";
import { cn } from "@wron/kit";

/** The four-point star mark, drawn in SVG (teal to violet). */
export function StarMark({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="cps-star" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2DD4A3" />
          <stop offset="1" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="9" fill="none" stroke="url(#cps-star)" strokeOpacity="0.5" strokeWidth="1" />
      <path d="M16 2 C17 11 21 15 30 16 C21 17 17 21 16 30 C15 21 11 17 2 16 C11 15 15 11 16 2 Z" fill="none" stroke="url(#cps-star)" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="1.6" fill="#EEF2F6" />
    </svg>
  );
}

export default function Logo({ className }) {
  return (
    <Link to="/" aria-label="Cosmic Profile & Synergy, home" className={cn("group flex min-h-[44px] items-center gap-3 rounded-theme", className)}>
      <StarMark className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
      <span className="text-[15px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[17px]">Cosmic Profile &amp; Synergy</span>
    </Link>
  );
}
