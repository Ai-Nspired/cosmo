import { Page, Reveal } from "@wron/kit";
import { Container, MonoLabel, Disclaimer } from "../components/ui";
import RingsSVG from "../components/RingsSVG";
import PrivacySections from "../components/privacy/PrivacySections";
import PrivacyControls from "../components/privacy/PrivacyControls";

export default function Privacy() {
  return (
    <Page
      title="Privacy"
      description="Cosmic Profile & Synergy calculates everything in your browser. Your name and birthdate stay on your device. See what is saved and how to remove it."
    >
      <section className="midnight-glow border-b border-line">
        <Container className="grid items-center gap-8 py-12 md:grid-cols-12 md:py-20">
          <div className="md:col-span-8">
            <MonoLabel className="mb-4">Privacy · Plain words</MonoLabel>
            <h1 className="display text-[clamp(2.25rem,6vw,4.5rem)] text-ink">Your details stay on this device.</h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.6] text-muted">
              Your name and birthdate are used to calculate your profile in your browser. We do not send them to a server, and we do not keep a copy.
            </p>
          </div>
          <div className="hidden md:col-span-4 md:block">
            <RingsSVG spin className="mx-auto h-64 w-64 opacity-80" title="Decorative three rings" />
          </div>
        </Container>
      </section>
      <Container className="grid gap-12 py-12 md:grid-cols-12 md:py-16">
        <div className="md:col-span-8">
          <Reveal><PrivacySections /></Reveal>
        </div>
        <aside className="md:col-span-4">
          <div className="md:sticky md:top-24">
            <PrivacyControls />
            <Disclaimer className="mt-6" />
          </div>
        </aside>
      </Container>
    </Page>
  );
}
