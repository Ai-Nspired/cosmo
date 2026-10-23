import { MonoLabel } from "../ui";

const SECTIONS = [
  { id: "calc", label: "01 · Calculation", title: "Everything is worked out in your browser", body: [
    "When you enter a full name and a birthdate, the page calculates your Chinese animal, sun sign, Life Path and Core Numbers on your own device.",
    "The same goes for Day's Vibe and Compatibility. No outside service is called to produce a reading, so the tool keeps working offline once the page has loaded.",
  ] },
  { id: "saved", label: "02 · Saved on device", title: "What is saved, and where", body: [
    "If saving is available, this browser's local storage keeps three things: your profile (name and birthdate), the people you saved for Compatibility, and nothing else about you.",
    "This data lives only on the device and browser you used. It is not uploaded, and we cannot see it. If your browser blocks storage, the tool still works, but only for the current session, and the page tells you so.",
  ] },
  { id: "sent", label: "03 · Not collected", title: "What we do not collect", body: [
    "We do not ask you to create an account. We do not collect your name, birthdate or readings on a server, and we do not sell or share them.",
    "Share links contain the name and date you chose to put in them. Anyone with the link can see those details, so share them only with people you trust. The Download image button builds the picture on your device.",
  ] },
  { id: "cookies", label: "04 · Cookies", title: "Cookies and notices", body: [
    "The site may show a cookie notice, depending on the tools its owner connects. Use Cookie settings in the footer to review your choice at any time.",
  ] },
  { id: "remove", label: "05 · Your control", title: "Remove your data any time", body: [
    "Use the controls on this page to delete your saved profile and saved people. You can also clear this site's data in your browser settings. Reset on the Profile page removes your profile too.",
  ] },
  { id: "names", label: "06 · Names", title: "Names and letters", body: [
    "Accents are removed before counting, and letters the A to Z table cannot map are skipped. This happens in your browser and nothing is recorded.",
  ] },
  { id: "changes", label: "07 · Changes", title: "Changes to this page", body: [
    "If the way the tool handles data changes, this page will change first. The tool is for entertainment and personal reflection, and it is not meant for children under 13 to use without a parent.",
  ] },
];

export default function PrivacySections() {
  return (
    <div className="border-t border-line">
      {SECTIONS.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-line py-8">
          <MonoLabel className="mb-3">{s.label}</MonoLabel>
          <h2 className="h-section text-ink">{s.title}</h2>
          <div className="mt-4 space-y-4 text-[17px] leading-[1.6] text-ink/85">
            {s.body.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </section>
      ))}
    </div>
  );
}
