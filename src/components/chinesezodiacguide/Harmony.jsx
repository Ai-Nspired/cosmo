import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function Harmony({ guide }) {
  const rows = [
    ["Harmony group", `${guide.trine.join(", ")} (trine). Secret friend: ${guide.secretFriend}.`],
    ["Clashes", `${guide.clash}, the opposite animal in the cycle.`],
  ];
  return (
    <section className="pt-14" aria-labelledby="hc-h">
      <div className="flex items-center gap-4">
        <span className="h-px w-12 bg-primary/70" aria-hidden="true" />
        <h2 id="hc-h" className="h-section text-ink">Harmony and clashes</h2>
      </div>
      <dl className="mt-8 divide-y divide-line rounded-theme border border-line bg-surface px-5 md:px-6">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]">
            <dt className="font-mono text-[13px] tracking-[0.06em] text-muted">{k}</dt>
            <dd className="text-[17px] leading-[1.6] text-ink">{v}</dd>
          </div>
        ))}
        <div className="grid gap-1 py-4 sm:grid-cols-[220px_1fr]">
          <dt className="font-mono text-[13px] tracking-[0.06em] text-muted">Compatibility use</dt>
          <dd>
            <Link to="/method" className="group inline-flex min-h-[44px] items-center gap-2 text-[17px] text-primary underline underline-offset-4 hover:text-ink">
              How compatibility is scored <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </dd>
        </div>
      </dl>
    </section>
  );
}
