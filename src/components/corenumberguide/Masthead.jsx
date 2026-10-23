import { Link } from "react-router";
import { Container, Panel, MonoLabel } from "../ui";
import RingsSVG from "../RingsSVG";

export default function Masthead({ guide }) {
  return (
    <section className="midnight-glow relative overflow-hidden border-b border-line">
      <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
        <div className="md:col-span-7">
          <nav aria-label="Breadcrumb" className="mono-label flex flex-wrap gap-2">
            <Link to="/guides" className="hover:text-ink">Guides</Link><span aria-hidden="true">/</span><span>Core Numbers</span>
          </nav>
          <h1 className="display mt-5 text-[clamp(2.75rem,7vw,4.75rem)] text-ink">{guide.name} number</h1>
          <p className="mt-6 max-w-xl text-[18px] leading-[1.6] text-ink/85">{guide.describes}</p>
          <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-muted">{guide.short}</p>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <Panel className="p-5">
            <MonoLabel>Formula</MonoLabel>
            <p className="mt-3 break-words font-mono text-[13px] leading-relaxed tracking-[0.06em] text-primary">{guide.formula}</p>
            <div className="my-4 h-px bg-line" />
            <MonoLabel>Uses</MonoLabel>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{guide.uses}</p>
          </Panel>
          <RingsSVG className="pointer-events-none mx-auto mt-6 hidden h-44 w-44 opacity-70 md:block" rings={["numbers"]} spin />
        </div>
      </Container>
    </section>
  );
}
