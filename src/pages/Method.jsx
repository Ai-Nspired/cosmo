import { Page } from "@wron/kit";
import { Container, MonoLabel, Disclaimer } from "../components/ui";
import RingsSVG from "../components/RingsSVG";
import MethodNav from "../components/method/MethodNav";
import { LunarSection, SunSection, NumberSection } from "../components/method/MethodSections";
import { LettersSection, ScoringSection } from "../components/method/MethodTables";

export default function Method() {
  return (
    <Page
      title="Method"
      description="The exact rules behind your profile: Lunar New Year dates, sun sign ranges, Pythagorean letter values, master numbers, Day's Vibe and compatibility scoring."
    >
      <section className="midnight-glow relative overflow-hidden border-b border-line">
        <Container className="grid items-center gap-8 py-12 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <MonoLabel className="mb-4">Method · every rule, in the open</MonoLabel>
            <h1 className="display text-[clamp(40px,6vw,76px)] text-ink">How your profile is calculated</h1>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-muted">
              Every number on this site comes from a short, fixed rule. The same name and birthdate always give the same result. Nothing is sent to a server, so you can check each step yourself.
            </p>
          </div>
          <div className="hidden justify-center md:col-span-5 md:flex">
            <RingsSVG spin className="h-[320px] w-[320px] opacity-90" />
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 md:grid-cols-12 md:py-16">
        <aside className="md:col-span-3">
          <MethodNav />
        </aside>
        <div className="space-y-16 md:col-span-9 md:space-y-20">
          <LunarSection />
          <SunSection />
          <NumberSection />
          <LettersSection />
          <ScoringSection />
          <Disclaimer />
        </div>
      </Container>
    </Page>
  );
}
