import { ArrowLink } from "../ui";

export default function SignConnection({ g, elementNote, modalityNote }) {
  const rows = [
    ["Element", g.element, elementNote],
    ["Modality", g.modality, modalityNote],
    ["Day's Vibe contribution", `${g.name} sets your sign element (${g.element}). Each day it is compared with the element of the Sun's current sign.`, "Same element scores 88, complementary 92, contrasting 55. Sign carries 30% of the vibe score."],
    ["Compatibility contribution", `${g.element} and ${g.modality} are compared with the other person's sign.`, "Element counts 70% and modality 30% of the sign part, which is 25% of each direction."],
  ];
  return (
    <section className="mt-14 max-w-3xl" aria-label="Profile connection">
      <dl className="border-t border-line">
        {rows.map(([k, v, note]) => (
          <div key={k} className="sweep grid gap-1 border-b border-line py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8">
            <dt className="text-[16px] font-[550] text-ink">{k}</dt>
            <dd>
              <span className="text-[16px] text-ink/85">{v}</span>
              {note && <span className="mt-1 block text-[14px] leading-snug text-muted">{note}</span>}
            </dd>
          </div>
        ))}
      </dl>
      <ArrowLink to="/method" className="mt-4">Read the exact method</ArrowLink>
    </section>
  );
}
