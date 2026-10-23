import { CITIES } from "../../lib/astro";

const base = "block min-h-[54px] w-full rounded-theme border border-line bg-bg/60 px-4 text-[18px] text-ink transition-colors hover:border-ink/25 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 [color-scheme:dark]";
const lab = "mb-2 block text-[14px] font-[550] text-ink/90";
const help = "mt-2 text-[13px] leading-snug text-muted";

/** Optional birth time and place. value: { time, placeKey, lat, lng, offset }. */
export default function ChartFields({ id, value, onChange }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`${id}-time`} className={lab}>Birth time (optional)</label>
        <input id={`${id}-time`} type="time" value={value.time} onChange={(e) => set("time", e.target.value)} className={base} />
        <p className={help}>Needed for the rising sign. Without it, the Moon sign is read for midday.</p>
      </div>
      <div>
        <label htmlFor={`${id}-place`} className={lab}>Birth place (optional)</label>
        <select id={`${id}-place`} value={value.placeKey} onChange={(e) => set("placeKey", e.target.value)} className={base}>
          <option value="">Skip, or not sure</option>
          {CITIES.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
          <option value="custom">Another place</option>
        </select>
        <p className={help}>Pick the nearest large city, or enter coordinates.</p>
      </div>
      {value.placeKey === "custom" && (
        <div className="grid gap-4 sm:col-span-2 sm:grid-cols-3">
          {[["lat", "Latitude", "North is positive"], ["lng", "Longitude", "East is positive"], ["offset", "UTC offset (hours)", "At the time of birth"]].map(([k, l, h]) => (
            <div key={k}>
              <label htmlFor={`${id}-${k}`} className={lab}>{l}</label>
              <input id={`${id}-${k}`} type="number" step="any" inputMode="decimal" value={value[k]} onChange={(e) => set(k, e.target.value)} className={base} />
              <p className={help}>{h}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
