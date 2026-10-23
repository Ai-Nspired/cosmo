import { Page } from "@wron/kit";
import { Container, Button } from "../components/ui";
import FaqHero from "../components/faq/FaqHero";
import FaqList from "../components/faq/FaqList";
import { FAQ } from "../data/faq";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function Faq() {
  return (
    <Page
      title="FAQ"
      description="Answers about your Chinese animal, master numbers, Expression and Destiny, compatibility scoring, saved details and how accurate the readings are."
      jsonLd={jsonLd}
    >
      <FaqHero />
      <FaqList />
      <Container className="pb-24 pt-4 md:pb-28">
        <div className="flex flex-col items-start gap-5 rounded-theme border border-line bg-surface p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <h2 className="h-section text-ink">Ready to see your own numbers?</h2>
            <p className="mt-2 max-w-xl text-[17px] leading-[1.6] text-muted">Enter a name and birthdate. Everything is calculated in your browser.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button to="/" arrow size="lg">Reveal my profile</Button>
            <Button to="/method" variant="secondary" size="lg">Read the method</Button>
          </div>
        </div>
      </Container>
    </Page>
  );
}
