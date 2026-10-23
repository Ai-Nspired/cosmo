import { Link } from "react-router";
import { Container, MonoLabel, Glyph } from "../ui";

export default function SignMasthead({ g, note }) {
  return (
    <section className="midnight-glow border-b border-line">
      <Container className="pb-12 pt-6 md:pb-16">
        <nav aria-label="Breadcrumb" className="text-[14px] text-muted">
          <Link to="/guides" className="hover:text-ink">Guides</Link> <span className="px-1">/</span>
          <Link to="/guides" className="hover:text-ink">Sun signs</Link> <span className="px-1">/</span>
          <span className="text-ink/90">{g.name}</span>
        </nav>
        <div className="mt-8 grid items-center gap-8 md:grid-cols-12">
          <div className="relative mx-auto flex aspect-[4/3] w-full max-w-[420px] items-center justify-center md:col-span-4 md:max-w-none">
            <svg viewBox="0 0 400 300" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
              <ellipse cx="200" cy="150" rx="185" ry="75" transform="rotate(-22 200 150)" fill="none" stroke="#A78BFA" strokeOpacity="0.7" />
              <path d="M312 82 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="#A78BFA" transform="translate(-36 18)" />
            </svg>
            <Glyph className="relative text-[clamp(120px,16vw,190px)] leading-none text-primary" ><span style={{ textShadow: "0 0 30px rgba(45,212,163,0.7), 0 0 60px rgba(45,212,163,0.35)" }}>{g.glyph}</span></Glyph>
          </div>
          <div className="md:col-span-7 md:col-start-5">
            <MonoLabel>{g.dates} · {g.element} · {g.modality}</MonoLabel>
            <h1 className="display mt-3 text-[clamp(3rem,7vw,76px)] text-ink">{g.name}</h1>
            <p className="mt-5 max-w-lg text-[17px] leading-[1.6] text-ink/80">{note} Use the date range published in the Method section.</p>
            <Link to="/guides" className="mt-4 inline-flex min-h-[44px] items-center text-[15px] font-[550] text-primary hover:text-ink">All sun signs</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
