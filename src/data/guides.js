// One searchable index of every guide page, grouped by system.
import { SIGN_GUIDES } from "./signs";
import { ANIMAL_GUIDES } from "./animals";
import { NUMBER_GUIDES } from "./numbers";
import { CORE_GUIDES } from "./coreNumbers";

export const signPath = (slug) => `/guides/sun-signs/${slug}`;
export const animalPath = (slug) => `/guides/chinese-zodiac/${String(slug).toLowerCase()}`;
export const numberPath = (n) => `/guides/numbers/${n}`;
export const corePath = (slug) => `/guides/core-numbers/${slug}`;

export const GUIDE_GROUPS = [
  { key: "signs", label: "Sun signs", items: SIGN_GUIDES.map((s) => ({ label: s.name, sub: s.dates, glyph: s.glyph, to: signPath(s.slug), terms: [s.name, s.element, s.modality, ...s.keywords] })) },
  { key: "animals", label: "Chinese zodiac", items: ANIMAL_GUIDES.map((a) => ({ label: a.name, sub: `No. ${a.index + 1}`, to: animalPath(a.slug), terms: [a.name, ...a.keywords] })) },
  { key: "numbers", label: "Numbers", items: NUMBER_GUIDES.map((n) => ({ label: String(n.value), sub: n.master ? `Master number · ${n.title}` : n.title, master: n.master, to: numberPath(n.value), terms: [String(n.value), n.title, ...n.keywords, n.master ? "master" : ""] })) },
  { key: "core", label: "Core Numbers", items: CORE_GUIDES.map((c) => ({ label: c.name, sub: c.short, to: corePath(c.slug), terms: [c.name, c.short] })) },
];

/** Search all guides. Returns groups with only matching items (empty groups removed). */
export function searchGuides(query) {
  const q = query.trim().toLowerCase();
  if (!q) return GUIDE_GROUPS;
  return GUIDE_GROUPS.map((g) => ({ ...g, items: g.items.filter((i) => i.terms.some((t) => t && t.toLowerCase().includes(q))) })).filter((g) => g.items.length);
}
