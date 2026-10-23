import { Link } from "react-router";

export const TERMS = [
  { id: "entertainment", title: "Entertainment only", body: [
    "Astrology, the Chinese zodiac and numerology are not science. They cannot predict events or describe you with certainty. Every reading here is for fun and personal reflection.",
    "Do not use a reading to make medical, legal, financial, or relationship decisions. Talk to a qualified professional for those.",
  ] },
  { id: "use", title: "Using the tool", body: [
    "You may use Cosmic Profile & Synergy for personal, non-commercial use. Enter your own details, or those of someone who is happy for you to use them, for example in Compatibility.",
    "Please do not copy the site's readings in bulk, scrape it, or try to break it.",
  ] },
  { id: "data", title: "Your details", body: [
    "On the free profile, your name and birthdate are calculated in your browser. If you choose to save, they are kept in this browser's local storage on your device. Reset removes them.",
    "If your browser blocks storage, the tool still works for the current session only. See the Privacy page for more.",
  ] },
  { id: "accuracy", title: "Accuracy and limits", body: [
    "Results follow the rules on the Method page. Sun sign dates can differ by a day in some years, and the Chinese zodiac uses a table of Lunar New Year dates for birth years 1924 to 2035. Outside that range the tool says so instead of guessing.",
    "Other sources may use different methods, so you may see different results elsewhere. We make no promise that the tool is free of errors or always available.",
  ] },
  { id: "premium", title: "Premium accounts and Cosmic Matches", body: [
    "Premium and Cosmic Matches are for people aged 18 and over. You must give an accurate age confirmation and use your own details.",
    "A member card is public to anyone who visits the site's data. Do not post anything unlawful, hateful, or private to someone else, and do not use Cosmic Matches to harass, scam or pressure anyone. The owner may remove a card or close an account that breaks these rules.",
    "Scores are entertainment. They do not predict how a relationship will go, and we do not check who members are. Meet in public first and tell a friend. Premium is in early access, and its features and terms may change before billing begins.",
  ] },
  { id: "content", title: "Content and ownership", body: [
    "The readings, design and calculation rules on this site belong to the site's owner. You may share your own profile or comparison link, or download your profile image, for personal use.",
  ] },
  { id: "liability", title: "No warranty or liability", body: [
    "The tool is provided as it is. To the extent the law allows, the owner is not responsible for any loss or decision that comes from using a reading.",
  ] },
  { id: "changes", title: "Changes to these terms", body: [
    "These terms may be updated as the tool grows. The date at the top of the page shows the latest version. Continuing to use the site means you accept the current terms.",
  ] },
];

export default function TermsSections() {
  return (
    <div className="space-y-12">
      {TERMS.map((t, i) => (
        <section key={t.id} id={t.id} className="scroll-mt-24 border-t border-line pt-6">
          <p className="num font-mono text-[12px] tracking-[0.06em] text-muted">{String(i + 1).padStart(2, "0")}</p>
          <h2 className="h-section mt-2 text-ink">{t.title}</h2>
          <div className="mt-4 space-y-4">
            {t.body.map((p) => (
              <p key={p} className="text-[17px] leading-[1.6] text-ink/85">{p}</p>
            ))}
          </div>
          {t.id === "data" && (
            <p className="mt-4 text-[15px]">
              <Link to="/privacy" className="text-primary underline underline-offset-4 hover:text-ink">Read the Privacy page</Link>
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
