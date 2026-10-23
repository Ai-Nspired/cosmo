import { Reveal } from "@wron/kit";

function Block({ n, title, children }) {
  return (
    <section id={title.toLowerCase().replace(/\s+/g, "-")} className="scroll-mt-24 border-b border-line py-9">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[12px] tracking-[0.06em] text-primary">{n}</span>
        <span className="h-px w-8 bg-primary/70" aria-hidden="true" />
        <h2 className="h-section text-ink">{title}</h2>
      </div>
      <div className="mt-4 md:pl-[4.5rem]">{children}</div>
    </section>
  );
}

const List = ({ items }) => (
  <ul className="space-y-2 text-[17px] leading-[1.6] text-muted">
    {items.map((i) => (
      <li key={i} className="flex gap-3"><span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />{i}</li>
    ))}
  </ul>
);

export default function Reading({ guide }) {
  const rail = [
    ["Overview", "overview"], ["Traits", "traits"], ["Strengths", "strengths"], ["Challenges", "challenges"], ["Practical tips", "practical-tips"],
  ];
  return (
    <div className="grid gap-10 md:grid-cols-12">
      <Reveal className="md:col-span-8">
        <Block n="01" title="Overview"><p className="max-w-2xl text-[17px] leading-[1.6] text-muted">{guide.overview}</p></Block>
        <Block n="02" title="Traits"><p className="max-w-2xl text-[17px] leading-[1.6] text-muted">{guide.traits}</p></Block>
        <Block n="03" title="Strengths"><List items={guide.strengths} /></Block>
        <Block n="04" title="Challenges"><List items={guide.challenges} /></Block>
        <Block n="05" title="Practical tips"><List items={guide.tips} /></Block>
      </Reveal>
      <aside className="hidden md:col-span-4 md:block" aria-label="On this page">
        <div className="sticky top-24 border-l border-line pl-6 pt-9">
          <p className="mono-label mb-3">Index</p>
          <ul>
            {rail.map(([l, id], i) => (
              <li key={id} className="border-b border-line">
                <a href={`#${id}`} className="sweep flex min-h-[44px] items-center gap-3 text-[15px] text-ink/85 transition-colors hover:text-primary">
                  <span className="font-mono text-[12px] text-muted">0{i + 1}</span>{l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
