import { Link, useParams } from "react-router";
import { Page, Reveal } from "@wron/kit";
import { Container } from "../components/ui";
import { getAnimalGuide, LUNAR_NOTE } from "../data/animals";
import Masthead from "../components/chinesezodiacguide/Masthead";
import Reading from "../components/chinesezodiacguide/Reading";
import Elements from "../components/chinesezodiacguide/Elements";
import Harmony from "../components/chinesezodiacguide/Harmony";
import NotFound from "./NotFound";

export default function ChineseZodiacGuide() {
  const { animal } = useParams();
  const guide = getAnimalGuide(String(animal || "").toLowerCase());
  if (!guide) return <NotFound />;
  return (
    <Page
      title={`Year of the ${guide.name}`}
      description={`${guide.name} in the Chinese zodiac: overview, traits, strengths, challenges, tips, five element variants, harmony and clashes. ${LUNAR_NOTE.slice(0, 40)}`.slice(0, 154)}
    >
      <Masthead guide={guide} note={LUNAR_NOTE} />
      <Container className="pb-24">
        <Reading guide={guide} />
        <Elements guide={guide} />
        <Harmony guide={guide} />
        <Reveal>
          <p className="mt-10 text-[14px] leading-relaxed text-muted">
            For entertainment and personal reflection, not prediction or scientific assessment.{" "}
            <Link to="/guides" className="text-primary hover:text-ink">All guides</Link>
          </p>
        </Reveal>
      </Container>
    </Page>
  );
}
