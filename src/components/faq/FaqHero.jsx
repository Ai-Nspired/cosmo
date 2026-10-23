import { Container, MonoLabel } from "../ui";
import RingsSVG from "../RingsSVG";
import { Reveal } from "@wron/kit";

export default function FaqHero() {
  return (
    <section className="midnight-glow relative overflow-hidden border-b border-line">
      <Container className="grid items-center gap-8 py-12 md:grid-cols-12 md:py-20">
        <div className="md:col-span-7">
          <Reveal>
            <MonoLabel className="mb-4">FAQ · Entertainment only</MonoLabel>
            <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)] text-ink">Questions, answered plainly</h1>
            <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-muted">
              Why your animal may differ, what master numbers are, how compatibility is scored and where your details live.
            </p>
          </Reveal>
        </div>
        <div className="hidden justify-center md:col-span-5 md:flex">
          <RingsSVG spin rings={["signs", "animals"]} className="h-72 w-72 opacity-80 lg:h-80 lg:w-80" />
        </div>
      </Container>
    </section>
  );
}
