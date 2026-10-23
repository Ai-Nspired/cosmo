import { useState } from "react";
import { UserRound, CalendarDays, ArrowRight, Bookmark } from "lucide-react";
import { Field, Panel } from "../ui";
import { localDateKey } from "../../lib/engine";

export default function PersonPanel({ id, title, value, onChange, errors = {}, canUseProfile, onUseProfile, people, onSave, tone = "text-accent" }) {
  const [choosing, setChoosing] = useState(false);
  const linkBtn = "group inline-flex min-h-[44px] items-center gap-1.5 text-[14px] font-[550] text-primary transition-colors hover:text-ink";
  return (
    <Panel className="p-5 md:p-6">
      <div className="flex items-center gap-3">
        <UserRound className={`h-6 w-6 ${tone}`} aria-hidden="true" />
        <h3 className="text-[22px] font-[550] text-ink">{title}</h3>
      </div>
      <div className="mt-5 space-y-4">
        <Field id={`${id}-name`} label="Full name" icon={UserRound} placeholder="Full name" autoComplete="off" value={value.name} error={errors.name} onChange={(e) => onChange({ ...value, name: e.target.value, id: value.id })} />
        <Field id={`${id}-date`} label="Birthdate" icon={CalendarDays} type="date" max={localDateKey()} value={value.birthdate} error={errors.birthdate} onChange={(e) => onChange({ ...value, birthdate: e.target.value, id: value.id })} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        {canUseProfile && (
          <button type="button" className={linkBtn} onClick={onUseProfile}>Use my profile <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button>
        )}
        <button type="button" className={linkBtn} aria-expanded={choosing} onClick={() => setChoosing((c) => !c)}>Choose saved person <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></button>
        <button type="button" className={linkBtn} onClick={onSave}><Bookmark className="h-4 w-4" aria-hidden="true" />Save this person</button>
      </div>
      {choosing && (
        <ul className="mt-2 border-t border-line">
          {people.length === 0 && <li className="py-3 text-[14px] text-muted">No saved people yet.</li>}
          {people.map((p) => (
            <li key={p.id} className="border-b border-line">
              <button type="button" className="sweep flex min-h-[48px] w-full items-center justify-between gap-3 px-1 text-left text-[15px] text-ink hover:text-primary"
                onClick={() => { onChange({ name: p.name, birthdate: p.birthdate, id: p.id }); setChoosing(false); }}>
                <span>{p.name}</span><span className="font-mono text-[12px] tracking-[0.06em] text-muted">{p.birthdate}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
