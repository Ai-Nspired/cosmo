import { Sparkle } from "lucide-react";
import { MonoLabel } from "../ui";

const CONTEXTS = [
  ["Life Path", "Birthdate digits reduced."],
  ["Expression", "All letters of the full name."],
  ["Soul Urge", "Vowels in the name."],
  ["Personality", "Consonants in the name."],
  ["Birthday", "Day of the month."],
  ["Destiny", "Life Path plus Expression."],
];

function H({ id, children }) {
  return (
    <h2 id={id} className="flex items-center gap-3 text-[clamp(1.5rem,2.2vw,2rem)] font-[550] leading-[1.08] tracking-[-0.02em]">
      <Sparkle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />{children}
      <span className="h-px flex-1 bg-line" aria-hidden="true" />
    </h2>
  );
}
const P = ({ children }) => <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.6] text-muted">{children}</p>;
const List = ({ items }) => (
  <ul className="mt-4 max-w-[62ch] border-t border-line">
    {items.map((t, i) => (
      <li key={t} className="flex gap-4 border-b border-line py-3 text-[17px] leading-[1.6] text-ink/90">
        <span className="num font-mono text-[13px] text-accent">{String(i + 1).padStart(2, "0")}</span>{t}
      </li>
    ))}
  </ul>
);

export default function GuideReading({ g, ctx }) {
  const nav = [["overview", "Overview"], ["traits", "Traits"], ["strengths", "Strengths"], ["challenges", "Challenges"], ["tips", "Practical tips"]];
  return (
    <div className="grid gap-10 lg:grid-cols-[200px_minmax(0,1fr)_340px]">
      <nav aria-label="In this guide" className="hidden lg:block">
        <div className="sticky top-24">
          <p className="font-[550]">In this guide</p>
          <ul className="mt-5 space-y-1 border-l border-line">
            {nav.map(([id, l]) => (
              <li key={id}><a href={`#${id}`} className="flex min-h-[44px] items-center pl-4 text-[15px] text-muted hover:text-primary">{l}</a></li>
            ))}
          </ul>
        </div>
      </nav>
      <article className="space-y-12">
        <section><H id="overview">Overview</H><P>{g.overview}</P></section>
        <section><H id="traits">Traits</H><P>{g.traits}</P></section>
        <section><H id="strengths">Strengths</H><List items={g.strengths} /></section>
        <section><H id="challenges">Challenges</H><List items={g.challenges} /></section>
        <section><H id="tips">Practical tips</H><List items={g.tips} /></section>
      </article>
      <aside aria-label="Where this number appears" className="h-fit rounded-theme border border-line bg-surface p-5">
        <p className="flex items-center gap-2 font-[550]"><Sparkle className="h-4 w-4 text-accent" aria-hidden="true" />Where {g.value} can appear</p>
        {ctx && ctx.length > 0 && (
          <p className="mt-3 rounded-theme border border-accent/50 bg-accent/10 p-3 text-[15px] text-ink">In your profile: {ctx.join(", ")}.</p>
        )}
        <ul className="mt-3 border-t border-line">
          {CONTEXTS.map(([t, d]) => (
            <li key={t} className="border-b border-line py-3 last:border-0">
              <p className="text-[15px] font-[550]">{t}</p>
              <MonoLabel className="mt-1 normal-case">{d}</MonoLabel>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
