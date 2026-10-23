import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "@wron/kit";
import { computeProfile } from "../lib/engine";

/*
  Shared state for the whole site, kept on this device only.
  - profile: { name, birthdate: "YYYY-MM-DD" } or null (the visitor's own entries)
  - computed: the full calculated profile (computeProfile) or null
  - people: saved people for compatibility [{ id, name, birthdate }]
  - storageOk: false when the browser blocks saving (session only)
  - justRevealed: true right after a new valid submission (for the ring alignment)
*/

const ProfileContext = createContext(null);

const KEY_PROFILE = "cps-profile";
const KEY_PEOPLE = "cps-people";

function safeParse(v, fallback) {
  if (v == null) return fallback;
  if (typeof v !== "string") return v;
  try { return JSON.parse(v); } catch { return fallback; }
}

function trySave(key, value) {
  try {
    const s = JSON.stringify(value);
    storage.set(key, s);
    const back = storage.get(key);
    return back === s || (back != null && JSON.stringify(safeParse(back, null)) === s);
  } catch {
    return false;
  }
}

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(null);
  const [people, setPeople] = useState([]);
  const [storageOk, setStorageOk] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [justRevealed, setJustRevealed] = useState(false);

  useEffect(() => {
    try {
      const p = safeParse(storage.get(KEY_PROFILE), null);
      if (p && p.name && p.birthdate) { setProfileState(p); setSaved(true); }
      const list = safeParse(storage.get(KEY_PEOPLE), []);
      if (Array.isArray(list)) setPeople(list);
      setStorageOk(trySave("cps-test", 1));
      storage.remove("cps-test");
    } catch {
      setStorageOk(false);
    }
    setHydrated(true);
  }, []);

  const computed = useMemo(() => {
    if (!profile) return null;
    try { return computeProfile(profile.name, profile.birthdate); } catch { return null; }
  }, [profile]);

  /** Set the visitor's profile. Saves on the device unless { save: false }. Returns true when saved. */
  const setProfile = useCallback((name, birthdate, { save = true, reveal = true } = {}) => {
    const p = { name: name.trim(), birthdate };
    setProfileState(p);
    if (reveal) setJustRevealed(true);
    if (!save) { setSaved(false); return false; }
    const ok = trySave(KEY_PROFILE, p);
    setStorageOk(ok);
    setSaved(ok);
    return ok;
  }, []);

  /** Save the current profile on this device. Returns true on success. */
  const saveProfile = useCallback(() => {
    if (!profile) return false;
    const ok = trySave(KEY_PROFILE, profile);
    setStorageOk(ok);
    setSaved(ok);
    return ok;
  }, [profile]);

  const resetProfile = useCallback(() => {
    setProfileState(null);
    setSaved(false);
    setJustRevealed(false);
    try { storage.remove(KEY_PROFILE); } catch { /* blocked */ }
  }, []);

  const clearReveal = useCallback(() => setJustRevealed(false), []);

  const persistPeople = useCallback((list) => {
    setPeople(list);
    const ok = trySave(KEY_PEOPLE, list);
    setStorageOk(ok);
    return ok;
  }, []);

  /** Add or update a saved person. Returns { person, ok }. */
  const savePerson = useCallback((name, birthdate, id) => {
    const person = { id: id || `p${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, name: name.trim(), birthdate };
    const exists = people.find((x) => x.id === person.id || (x.name.toLowerCase() === person.name.toLowerCase() && x.birthdate === birthdate));
    const list = exists ? people.map((x) => (x.id === exists.id ? { ...person, id: exists.id } : x)) : [...people, person];
    const ok = persistPeople(list);
    return { person: exists ? { ...person, id: exists.id } : person, ok };
  }, [people, persistPeople]);

  const removePerson = useCallback((id) => persistPeople(people.filter((x) => x.id !== id)), [people, persistPeople]);

  const value = {
    hydrated, profile, computed, saved, storageOk, justRevealed,
    setProfile, saveProfile, resetProfile, clearReveal,
    people, savePerson, removePerson,
  };
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used inside ProfileProvider");
  return ctx;
}

export const STORAGE_BLOCKED_MESSAGE = "Saving is blocked in this browser. Your profile will still work for this session.";
export const PEOPLE_BLOCKED_MESSAGE = "If local storage is blocked, saved people remain available only for this session.";
