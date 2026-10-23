import { Page } from "@wron/kit";
import { Link } from "react-router";
import { Container, MonoLabel, Panel, ArrowLink } from "../components/ui";
import { OrbitMark } from "../components/RingsSVG";
import TermsSections, { TERMS } from "../components/terms/TermsSections";

export default function Terms() {
  return (
    <Page
      title="Terms of use"
      description="The plain-language terms for using Cosmic Profile & Synergy: entertainment only, your details stay on your device, and how to use the readings."
    >
      <Container className="pb-24 pt-12 md:pt-20">
        <header className="max-w-3xl">
          <MonoLabel className="mb-4">Terms · Last updated October 2026</MonoLabel>
          <h1 className="display text-[clamp(2.25rem,6vw,4.5rem)] text-ink">Terms of use</h1>
          <p className="mt-6 text-[17px] leading-[1.6] text-muted md:text-[18px]">
            Cosmic Profile &amp; Synergy is a playful tool. Using it means you agree to these short terms. They are written in plain words so you can read them in a few minutes.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label="On this page" className="lg:sticky lg:top-24">
              <MonoLabel className="mb-3">On this page</MonoLabel>
              <ol className="border-t border-line">
                {TERMS.map((t, i) => (
                  <li key={t.id} className="border-b border-line">
                    <a href={`#${t.id}`} className="sweep flex min-h-[44px] items-center gap-3 text-[15px] text-ink/85 transition-colors hover:text-primary">
                      <span className="num font-mono text-[12px] text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {t.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="lg:col-span-8 lg:col-start-5">
            <TermsSections />
            <Panel className="mt-12 p-6">
              <OrbitMark className="mb-5" />
              <p className="text-center text-[16px] leading-[1.6] text-muted">
                Questions about how your details are handled? Read the <Link to="/privacy" className="text-primary underline underline-offset-4 hover:text-ink">Privacy page</Link> or see <Link to="/method" className="text-primary underline underline-offset-4 hover:text-ink">how the numbers are calculated</Link>.
              </p>
              <div className="mt-2 flex justify-center"><ArrowLink to="/">Back to your profile</ArrowLink></div>
            </Panel>
          </div>
        </div>
      </Container>
    </Page>
  );
}
