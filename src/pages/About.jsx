import { Page, Reveal } from "@wron/kit";
import { Container, MonoLabel, SectionHeading, Button, Disclaimer } from "../components/ui";
import RingsSVG from "../components/RingsSVG";
import { AboutRules, AboutRings } from "../components/about/AboutSections";

export default function About() {
  return (
    <Page
      title="About"
      description="Cosmic Profile & Synergy turns a name and birthdate into a playful, detailed profile. Learn what it is, how it works and how your details are handled."
    >
      <section className="midnight-glow border-b border-line">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7">
            <MonoLabel className="mb-4">About</MonoLabel>
            <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)] text-ink">Three rings, one profile</h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-muted md:text-[18px]">
              Cosmic Profile &amp; Synergy is a small tool for curious people. Enter your full name and birthdate. Three rings, western signs, Chinese zodiac animals and numerology, turn into one personal alignment you can read, save and share.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/" size="lg" arrow>Reveal my profile</Button>
              <Button to="/method" variant="secondary" size="lg">Read the method</Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[420px] md:col-span-5">
            <RingsSVG spin className="aspect-square" />
          </div>
        </Container>
      </section>

      <AboutRings />
      <AboutRules />

      <section className="border-t border-line">
        <Container className="py-14 md:py-20">
          <Reveal>
            <SectionHeading title="Made for a daily check-in" lead="Most people come once out of curiosity. Many return for Day's Vibe, or to compare themselves with a friend or partner." />
            <div className="mt-8 max-w-2xl"><Disclaimer /></div>
          </Reveal>
        </Container>
      </section>
    </Page>
  );
}
