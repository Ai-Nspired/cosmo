import { MonoLabel } from "../ui";

const SECTIONS = [
  { id: "calc", label: "01 · Calculation", title: "Everything is worked out in your browser", body: [
    "When you enter a full name and a birthdate, the page calculates your Chinese animal, sun sign, Life Path and Core Numbers on your own device. Moon and Rising signs are calculated the same way.",
    "The same goes for Day's Vibe and Compatibility. No outside service is called to produce a reading, so the free tool keeps working offline once the page has loaded.",
  ] },
  { id: "saved", label: "02 · Saved on device", title: "What the free profile saves, and where", body: [
    "If saving is available, this browser's local storage keeps your profile (name and birthdate), the people you saved for Compatibility, and the optional birth time and place you entered for your chart.",
    "This data lives only on the device and browser you used. It is not uploaded, and we cannot see it. If your browser blocks storage, the tool still works, but only for the current session, and the page tells you so.",
  ] },
  { id: "premium", label: "03 · Premium", title: "What a Premium account stores", body: [
    "Premium needs an account. We keep your email, the name you gave, and your password in protected form.",
    "If you create a member card for Cosmic Matches, we store a display name, short bio, city, what you are looking for, an optional contact line, and your results: Sun, Moon and Rising signs, Chinese animal and element, Life Path and name numbers. We do not store your birthdate, full name, birth time or birth place.",
    "Member cards can be read by anyone who visits the site's data, not only by signed-in members. Write nothing in your bio or contact line that you would not post in public. You can remove your card at any time on the Cosmic Matches page.",
    "If you report a member, your note and that member's card name go to the site owner.",
  ] },
  { id: "sent", label: "04 · Not collected", title: "What we do not collect", body: [
    "The free profile needs no account. For it, we do not collect your name, birthdate or readings on a server, and we do not sell or share them.",
    "Share links contain the name and date you chose to put in them. Anyone with the link can see those details, so share them only with people you trust. The Download image button builds the picture on your device.",
  ] },
  { id: "cookies", label: "05 · Cookies", title: "Cookies and notices", body: [
    "The site may show a cookie notice, depending on the tools its owner connects. Use Cookie settings in the footer to review your choice at any time.",
  ] },
  { id: "remove", label: "06 · Your control", title: "Remove your data any time", body: [
    "Use the controls on this page to delete your saved profile and saved people on this device. You can also clear this site's data in your browser settings. Reset on the Profile page removes your profile too.",
    "To leave Cosmic Matches, remove your member card on that page. To close your account, ask the site owner.",
  ] },
  { id: "names", label: "07 · Names", title: "Names and letters", body: [
    "Accents are removed before counting, and letters the A to Z table cannot map are skipped. This happens in your browser and nothing is recorded.",
  ] },
  { id: "changes", label: "08 · Changes", title: "Changes to this page", body: [
    "If the way the tool handles data changes, this page will change first. The free tool is for entertainment and personal reflection. Premium and Cosmic Matches are for adults aged 18 and over.",
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
