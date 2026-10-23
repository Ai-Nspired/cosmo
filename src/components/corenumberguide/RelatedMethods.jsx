import { Link } from "react-router";
import { Container } from "../ui";

const LINKS = [
  { to: "/method#letters", label: "Letter table" },
  { to: "/method#reduction", label: "Reduction rules" },
  { to: "/guides/numbers/11", label: "Master numbers" },
  { to: "/guides", label: "All Core Numbers" },
];

export default function RelatedMethods() {
  return (
    <section className="py-10 md:py-14">
      <Container>
        <p className="mono-label mb-3">Related methods</p>
        <ul className="flex flex-col border-t border-line sm:flex-row sm:flex-wrap sm:border-t-0">
          {LINKS.map((l) => (
            <li key={l.label} className="border-b border-line sm:mr-8 sm:border-t sm:border-b-0">
              <Link to={l.to} className="flex min-h-[48px] items-center text-[15px] font-[550] text-primary transition-colors hover:text-ink">{l.label}</Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
