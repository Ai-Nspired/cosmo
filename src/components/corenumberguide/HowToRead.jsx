import { Container, SectionHeading, Disclaimer } from "../ui";

function Item({ label, children }) {
  return (
    <div className="border-t border-line py-6">
      <p className="mono-label">{label}</p>
      <p className="mt-3 text-[17px] leading-[1.6] text-ink/90">{children}</p>
    </div>
  );
}

export default function HowToRead({ guide }) {
  const appears = guide.key === "birthday"
    ? "It appears in the Core Numbers matrix of your profile, as one of five rows. It also feeds your Life Path and your Personal Year in Day's Vibe."
    : guide.key === "destiny"
    ? "It appears as the wider synthesis panel after the other Core Numbers in your profile, built from two results you already have."
    : "It appears in the Core Numbers matrix of your profile, as one of five rows. A master badge shows when the total is 11, 22 or 33.";
  return (
    <section className="border-b border-line py-14 md:py-20">
      <Container className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionHeading eyebrow="How to read it" title={`Reading your ${guide.name} number`} />
          <div className="mt-8 border-t border-line pt-6">
            <p className="mono-label">Where it appears in your profile</p>
            <p className="mt-3 text-[17px] leading-[1.6] text-muted">{appears}</p>
          </div>
          <Disclaimer className="mt-6" />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <Item label="What this Core Number describes">{guide.describes}</Item>
          <Item label="Strengths">{guide.strengths}</Item>
          <Item label="Challenges">{guide.challenges}</Item>
          <Item label="Practical tips">{guide.tips}</Item>
          <Item label="Relationship to your other results">{guide.relation}</Item>
          <div className="border-t border-line" />
        </div>
      </Container>
    </section>
  );
}
