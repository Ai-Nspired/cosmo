import { useParams } from "react-router";
import { Page } from "@wron/kit";
import { getSignGuide, SIGN_GUIDES, ELEMENT_NOTES, MODALITY_NOTES, CUSP_NOTE } from "../data/signs";
import { Container, Disclaimer } from "../components/ui";
import SignMasthead from "../components/sunsignguide/SignMasthead";
import SignReading from "../components/sunsignguide/SignReading";
import SignConnection from "../components/sunsignguide/SignConnection";
import SignAdjacent from "../components/sunsignguide/SignAdjacent";
import NotFound from "./NotFound";

export default function SunSignGuide() {
  const { sign } = useParams();
  const g = getSignGuide(String(sign || "").toLowerCase());
  if (!g) return <NotFound />;
  const prev = SIGN_GUIDES[(g.index + 11) % 12];
  const next = SIGN_GUIDES[(g.index + 1) % 12];
  return (
    <Page
      title={`${g.name} sun sign guide`}
      description={`${g.name} (${g.dates}): overview, traits, strengths, challenges and practical tips, plus how the sign shapes Day's Vibe and Compatibility.`}
    >
      <SignMasthead g={g} note={CUSP_NOTE} />
      <Container className="grid gap-10 py-12 md:grid-cols-[220px_1fr] md:gap-0">
        <SignReading g={g} />
        <div className="md:col-start-2 md:pl-12">
          <SignConnection g={g} elementNote={ELEMENT_NOTES[g.element]} modalityNote={MODALITY_NOTES[g.modality]} />
        </div>
      </Container>
      <Container className="pb-24 pt-4 md:pb-16">
        <SignAdjacent prev={prev} next={next} />
        <Disclaimer className="mt-6 text-center" />
      </Container>
    </Page>
  );
}
