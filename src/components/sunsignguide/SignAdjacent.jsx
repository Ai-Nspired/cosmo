import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { signPath } from "../../data/guides";

export default function SignAdjacent({ prev, next }) {
  const cls = "group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-[550] text-primary hover:text-ink";
  return (
    <nav aria-label="Adjacent signs" className="rounded-theme border border-line px-5 py-5">
      <div className="grid grid-cols-2 items-center gap-y-4 md:grid-cols-[1fr_auto_1fr]">
        <Link to={signPath(prev.slug)} className={cls}>
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>Previous sign<span className="block text-[13px] font-normal text-muted">{prev.name}</span></span>
        </Link>
        <Link to="/guides" className="order-last col-span-2 flex min-h-[44px] flex-col items-center justify-center text-[14px] text-muted hover:text-ink md:order-none md:col-span-1 md:px-16">
          <svg viewBox="0 0 32 32" className="mb-1 h-6 w-6" aria-hidden="true"><path d="M16 2 C17 11 21 15 30 16 C21 17 17 21 16 30 C15 21 11 17 2 16 C11 15 15 11 16 2 Z" fill="none" stroke="#A78BFA" strokeWidth="1.6" /></svg>
          All sun signs
        </Link>
        <Link to={signPath(next.slug)} className={`${cls} justify-self-end text-right`}>
          <span>Next sign<span className="block text-[13px] font-normal text-muted">{next.name}</span></span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
