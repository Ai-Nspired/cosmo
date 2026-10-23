import { Bookmark, Star } from "lucide-react";
import { Panel } from "../ui";
import { formatDate } from "../../lib/engine";
import { PEOPLE_BLOCKED_MESSAGE } from "../ProfileProvider";

export default function SavedPeople({ people, storageOk, onEdit, onCompare, onRemove }) {
  const btn = "min-h-[44px] px-3 text-[14px] font-[550] transition-colors";
  return (
    <section aria-labelledby="saved-h" className="mt-10">
      <Panel className="p-5 md:p-6">
        <div className="flex items-center gap-3">
          <Star className="h-5 w-5 text-accent" aria-hidden="true" />
          <h2 id="saved-h" className="text-[22px] font-[550] text-ink">Saved on this device</h2>
        </div>
        {people.length === 0 ? (
          <div className="mt-6 flex flex-col items-center py-6 text-center">
            <Bookmark className="h-6 w-6 text-muted" aria-hidden="true" />
            <p className="mt-3 text-[16px] text-muted">People you save for comparison will appear here.</p>
          </div>
        ) : (
          <ul className="mt-4 border-t border-line">
            {people.map((p) => (
              <li key={p.id} className="sweep flex flex-col gap-1 border-b border-line py-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="px-1">
                  <p className="text-[17px] font-[550] text-ink">{p.name}</p>
                  <p className="font-mono text-[12px] tracking-[0.06em] text-muted">{formatDate(p.birthdate)}</p>
                </div>
                <div className="flex items-center">
                  <button type="button" className={`${btn} text-ink hover:text-primary`} onClick={() => onEdit(p)}>Edit</button>
                  <button type="button" className={`${btn} text-primary hover:text-ink`} onClick={() => onCompare(p)}>Compare</button>
                  <button type="button" className={`${btn} text-muted hover:text-red-300`} onClick={() => onRemove(p.id)} aria-label={`Remove ${p.name}`}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!storageOk && <p role="status" className="mt-4 text-[14px] leading-relaxed text-muted">{PEOPLE_BLOCKED_MESSAGE}</p>}
      </Panel>
    </section>
  );
}
