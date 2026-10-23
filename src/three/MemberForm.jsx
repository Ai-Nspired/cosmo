import { useState } from "react";
import { Field, Button, Panel, MonoLabel } from "../ui";

const area = "block w-full rounded-theme border border-line bg-bg/60 px-4 py-3 text-[18px] text-ink transition-colors hover:border-ink/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 [color-scheme:dark]";
const label = "mb-2 block text-[14px] font-[550] text-ink/90";

export default function MemberForm({ persona, row, onSave, onCancel }) {
  const [f, setF] = useState({
    name: row?.display_name || persona.name || "", area: row?.area || "", lookingFor: row?.looking_for || "Either",
    bio: row?.bio || "", reach: row?.reach_me || "", age: !!row,
  });
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setF({ ...f, [k]: v });

  async function submit(e) {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = "Enter a display name of at least 2 letters. A first name is enough.";
    if (!f.area.trim()) er.area = "Enter your city or region so we can show people near you.";
    if (!f.age) er.age = "Confirm that you are 18 or older.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    await onSave(f);
    setBusy(false);
  }

  return (
    <Panel as="form" onSubmit={submit} noValidate className="p-5 md:p-8">
      <MonoLabel>{row ? "Edit your member card" : "Create your member card"}</MonoLabel>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field id="mc-name" label="Display name" value={f.name} maxLength={40} error={err.name} onChange={(e) => set("name", e.target.value)} help="Use a first name or a nickname. Not your full name." />
        <Field id="mc-area" label="City or region" value={f.area} maxLength={60} error={err.area} onChange={(e) => set("area", e.target.value)} placeholder="For example, Austin" />
        <div>
          <label htmlFor="mc-look" className={label}>Looking for</label>
          <select id="mc-look" value={f.lookingFor} onChange={(e) => set("lookingFor", e.target.value)} className={`${area} min-h-[54px]`}>
            <option>Dating</option><option>Friends</option><option>Either</option>
          </select>
        </div>
        <Field id="mc-reach" label="How to reach you (optional)" value={f.reach} maxLength={80} onChange={(e) => set("reach", e.target.value)} help="Shown on your card. Add only something you are happy to make public." />
        <div className="md:col-span-2">
          <label htmlFor="mc-bio" className={label}>A few words about you (optional)</label>
          <textarea id="mc-bio" rows={3} maxLength={280} value={f.bio} onChange={(e) => set("bio", e.target.value)} className={area} />
          <p className="mt-2 text-[13px] text-muted">{f.bio.length} of 280 characters</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t border-line pt-5 text-[14px] leading-[1.6] md:grid-cols-2">
        <p><span className="font-mono text-[12px] uppercase tracking-[0.06em] text-primary">Shared on your card</span><br /><span className="text-ink/85">Display name, city, bio, contact line, Sun, Moon and Rising signs, Chinese animal and element, Life Path and name numbers.</span></p>
        <p><span className="font-mono text-[12px] uppercase tracking-[0.06em] text-muted">Never shared</span><br /><span className="text-ink/85">Your birthdate, full name, birth time, birth place and email.</span></p>
      </div>
      <p className="mt-3 text-[14px] leading-[1.6] text-muted">Member cards can be read by anyone who visits the site's data, not only by members. Keep the bio and contact line to things you would post in public.</p>

      <div className="mt-5">
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[16px] text-ink/90">
          <input type="checkbox" checked={f.age} onChange={(e) => set("age", e.target.checked)} className="mt-1 h-5 w-5 accent-[#2DD4A3]" />
          <span>I am 18 or older and I agree to the Terms.</span>
        </label>
        {err.age && <p role="alert" className="mt-1 text-[14px] text-red-300">{err.age}</p>}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="submit" size="lg" disabled={busy}>{busy ? "Saving" : row ? "Save my card" : "Join Cosmic Matches"}</Button>
        {onCancel && <Button variant="secondary" size="lg" onClick={onCancel}>Cancel</Button>}
      </div>
    </Panel>
  );
}
