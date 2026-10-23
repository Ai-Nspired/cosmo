import { Check, Minus } from "lucide-react";
import { Page, Reveal, useUser } from "@wron/kit";
import { Container, MonoLabel, Button, SectionHeading, ArrowLink, Panel, Disclaimer } from "../components/ui";
import RingsSVG from "../components/RingsSVG";
import PremiumNav from "../components/premium/PremiumNav";
import { PREMIUM_FEATURES } from "../data/premium";
import { NINE_ORDER, NINE_LABELS } from "../lib/match9";

const FREE = ["Sun sign", "Chinese animal and element", "Life Path and five Core Numbers", "Day's Vibe", "Two-way compatibility, four parts"];

export default function Premium() {
  const { user } = useUser();
  return (
    <Page title="Premium" description="Premium adds your Moon and Rising signs, expanded Chinese zodiac traits, nine-factor compatibility and Cosmic Matches. The free profile stays free.">
      <section className="midnight-glow border-b border-line">
        <Container className="grid items-center gap-10 py-12 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <MonoLabel className="mb-4 text-accent">Premium · Early access</MonoLabel>
            <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)] text-ink">Read your whole sky, then meet people who fit it</h1>
            <p className="mt-6 max-w-xl text-[17px] leading-[1.6] text-muted md:text-[18px]">
              Free gives you your Sun sign, Chinese animal and numbers. Premium adds your Moon and Rising signs, a longer animal reading, and a nine-factor score you can use to find compatible members near you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {user ? <Button to="/premium/chart" size="lg" arrow>Open my chart</Button> : <Button to="/account?mode=signup&next=/premium/chart" size="lg" arrow>Create my account</Button>}
              {!user && <Button to="/account?mode=signin" variant="secondary" size="lg">Sign in</Button>}
              {user && <Button to="/premium/matches" variant="secondary" size="lg">Cosmic Matches</Button>}
            </div>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.6] text-muted">Premium is in early access. Accounts are open and billing has not started.</p>
          </div>
          <div className="mx-auto w-full max-w-[400px] md:col-span-5">
            <RingsSVG spin className="aspect-square" />
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        <PremiumNav />
      </Container>

      <section className="border-t border-line">
        <Container className="grid gap-10 py-14 md:grid-cols-2 md:py-20">
          <Reveal>
            <Panel className="h-full p-6">
              <MonoLabel>Free · no account</MonoLabel>
              <h2 className="h-section mt-2 text-ink">Stays as it is</h2>
              <ul className="mt-5 space-y-3">
                {FREE.map((t) => <li key={t} className="flex gap-3 text-[17px] text-ink/90"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{t}</li>)}
                {["Moon sign", "Rising sign", "Cosmic Matches"].map((t) => <li key={t} className="flex gap-3 text-[17px] text-muted"><Minus className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />{t}</li>)}
              </ul>
              <Button to="/" variant="secondary" className="mt-6">Use the free profile</Button>
            </Panel>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="h-full rounded-theme border border-accent/50 bg-[#14122A] p-6 shadow-[0_0_60px_-30px_rgba(167,139,250,0.7)]">
              <MonoLabel className="text-accent">Premium · account</MonoLabel>
              <h2 className="h-section mt-2 text-ink">Everything in free, plus</h2>
              <ul className="mt-5 space-y-4">
                {PREMIUM_FEATURES.map((f) => (
                  <li key={f.k} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span className="text-[17px] leading-[1.5] text-ink"><span className="font-[550]">{f.k}.</span> <span className="text-ink/80">{f.v}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-surface/40">
        <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <SectionHeading eyebrow="The score" title="Nine factors, one number" lead="Your free compatibility uses four parts. Premium uses up to nine, and scores each direction on its own." />
            <ArrowLink to="/method#premium" className="mt-4">Read every weight</ArrowLink>
          </div>
          <ol className="md:col-span-7">
            {NINE_ORDER.map((k, i) => (
              <li key={k} className="sweep flex items-center gap-4 border-b border-line py-3 first:border-t">
                <span className="num font-mono text-[12px] tracking-[0.06em] text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[17px] text-ink">{NINE_LABELS[k]}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid gap-10 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <SectionHeading eyebrow="Cosmic Matches" title="Members ranked for you" />
          </div>
          <div className="space-y-4 text-[17px] leading-[1.6] text-ink/90 md:col-span-7">
            <p>Make a member card with a display name, your city and a few words. Your card shares your signs and numbers, not your birthdate, full name, birth time or birth place.</p>
            <p>You then see other members ranked by nine-factor score, and you can switch to people near you. Open any card to see how each factor scored and a reading in both directions.</p>
            <p className="text-[15px] text-muted">Members must be 18 or older. Private messages are not part of this release: add a contact line to your card if you want to be reachable. Real billing is not switched on yet.</p>
            <Disclaimer />
          </div>
        </Container>
      </section>
    </Page>
  );
}
