import { useEffect, useState } from "react";
import { storage } from "@wron/kit";

const KEY = "cps-chart";
const EMPTY = { time: "", placeKey: "", lat: "", lng: "", offset: "" };

/** Birth time and place for the full chart. Kept in this browser only. */
export function useChartInput() {
  const [value, setValue] = useState(EMPTY);
  useEffect(() => {
    try {
      const s = storage.get(KEY);
      const o = typeof s === "string" ? JSON.parse(s) : s;
      if (o && typeof o === "object") setValue({ ...EMPTY, ...o });
    } catch { /* ignore */ }
  }, []);
  const set = (next) => {
    setValue(next);
    try { storage.set(KEY, JSON.stringify(next)); } catch { /* blocked */ }
  };
  return [value, set];
}
