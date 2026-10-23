import { scrollToSection } from "@wron/kit";

export const STEPS = [
  ["lunar", "Chinese zodiac"],
  ["sun", "Sun sign"],
  ["numbers", "Numbers and master numbers"],
  ["letters", "Letter table"],
  ["scoring", "Day's Vibe and compatibility"],
  ["premium", "Premium: Moon, Rising, nine factors"],
];

export default function MethodNav() {
  return (
    <nav aria-label="On this page" className="md:sticky md:top-24">
      <p className="mono-label mb-3">On this page</p>
      <ul className="border-t border-line">
        {STEPS.map(([id, label], i) => (
          <li key={id} className="border-b border-line">
            <a
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
              className="sweep flex min-h-[44px] items-center gap-3 text-[15px] font-[550] text-ink/85 transition-colors hover:text-primary"
            >
              <span className="font-mono text-[12px] tracking-[0.06em] text-muted">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
