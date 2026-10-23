import { useParams, Link } from "react-router";
import { Page } from "@wron/kit";
import { getCoreGuide, CORE_GUIDES } from "../data/coreNumbers";
import { Container } from "../components/ui";
import Masthead from "../components/corenumberguide/Masthead";
import WhatItUses from "../components/corenumberguide/WhatItUses";
import HowToRead from "../components/corenumberguide/HowToRead";
import RelatedMethods from "../components/corenumberguide/RelatedMethods";

export default function CoreNumberGuide() {
  const { type } = useParams();
  const guide = getCoreGuide(type);

  if (!guide) {
    return (
      <Page title="Core Number not found" description="This Core Number guide does not exist. Browse Expression, Soul Urge, Personality, Birthday and Destiny." noindex>
        <Container className="py-24">
          <p className="mono-label">Guide not found</p>
          <h1 className="display mt-3 text-[clamp(2.25rem,6vw,4rem)] text-ink">That Core Number does not exist</h1>
          <ul className="mt-8 max-w-md border-t border-line">
            {CORE_GUIDES.map((c) => (
              <li key={c.slug} className="border-b border-line">
                <Link to={`/guides/core-numbers/${c.slug}`} className="flex min-h-[52px] items-center text-lg font-[550] text-ink hover:text-primary">{c.name}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </Page>
    );
  }

  return (
    <Page
      title={`${guide.name} number guide`}
      description={`${guide.name} number: ${guide.short} See the formula, which letters count, how to read it, strengths, challenges and tips.`.slice(0, 155)}
    >
      <Masthead guide={guide} />
      <WhatItUses guide={guide} />
      <HowToRead guide={guide} />
      <RelatedMethods current={guide.slug} />
    </Page>
  );
}
