// Nine-factor matching. Builds on the free compatibility rules in explore.js and adds
// moon sign, rising sign, the Chinese element cycle and Expression. Deterministic.
import { SIGNS, ANIMALS } from "./engine";
import { elementRelation, modalityRelation, animalRelation, numberRelation, SIGN_SPLIT } from "./explore";

export const NINE_WEIGHTS = { sun: 0.14, moon: 0.14, rising: 0.08, animal: 0.14, element: 0.06, lifePath: 0.14, expression: 0.08, moonSun: 0.11, soulPers: 0.11 };
export const NINE_LABELS = {
  sun: "Sun signs", moon: "Moon signs", rising: "Rising signs", animal: "Chinese animal harmony", element: "Chinese element cycle",
  lifePath: "Life Path pairing", expression: "Expression pairing", moonSun: "Moon meets Sun", soulPers: "Soul Urge meets Personality",
};
export const NINE_ORDER = ["sun", "moon", "rising", "animal", "element", "lifePath", "expression", "moonSun", "soulPers"];
export const NINE_MISSING_HINT = { moon: "needs a birthdate", rising: "needs birth time and place", expression: "needs letters in the name", moonSun: "needs both Moon signs", soulPers: "needs vowels and consonants in both names" };

const GEN = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
const CTRL = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };

export function chineseElementRelation(a, b) {
  if (a === b) return { label: `Both ${a}`, score: 80 };
  if (GEN[a] === b) return { label: `${a} feeds ${b}`, score: 92 };
  if (GEN[b] === a) return { label: `${b} feeds ${a}`, score: 92 };
  if (CTRL[a] === b) return { label: `${a} holds back ${b}`, score: 52 };
  if (CTRL[b] === a) return { label: `${b} holds back ${a}`, score: 52 };
  return { label: "Neutral", score: 66 };
}

function signPair(i, j) {
  const a = SIGNS[i], b = SIGNS[j];
  const el = elementRelation(a.element, b.element), mo = modalityRelation(a.modality, b.modality);
  return { score: Math.round(SIGN_SPLIT.element * el.score + SIGN_SPLIT.modality * mo.score), label: `${a.name} and ${b.name}: ${el.label.toLowerCase()}, ${mo.label.toLowerCase()}` };
}

/** A flat, shareable picture of one person. Numbers are base values (1 to 9); 0 or -1 means unknown. */
export function personaFromProfile(p, chart) {
  return {
    name: p.name.split(/\s+/)[0], sun: p.sun.index, moon: chart?.moon?.index ?? -1, rising: chart?.rising?.index ?? -1,
    animal: p.chinese.animal, element: p.chinese.element, lifePath: p.lifePath.base,
    expression: p.expression?.base || 0, soulUrge: p.soulUrge?.base || 0, personality: p.personality?.base || 0,
  };
}
export function personaFromRow(r) {
  return {
    name: String(r.display_name || "Member").split(/\s+/)[0], sun: r.sun, moon: r.moon ?? -1, rising: r.rising ?? -1,
    animal: ANIMALS[r.animal] || "Rat", element: r.element || "Wood", lifePath: r.life_path || 0,
    expression: r.expression || 0, soulUrge: r.soul_urge || 0, personality: r.personality || 0,
  };
}
/** The columns saved on a member card. Never includes birthdate, full name, time or place. */
export function personaToRow(p) {
  return { sun: p.sun, moon: p.moon, rising: p.rising, animal: ANIMALS.indexOf(p.animal), element: p.element, life_path: p.lifePath, expression: p.expression, soul_urge: p.soulUrge, personality: p.personality };
}

export function compat9(a, b) {
  const f = [];
  const shared = (key, r) => f.push({ key, label: NINE_LABELS[key], weight: NINE_WEIGHTS[key], detail: r.label, ab: r.score, ba: r.score });
  const sp = signPair(a.sun, b.sun); shared("sun", sp);
  if (a.moon >= 0 && b.moon >= 0) shared("moon", signPair(a.moon, b.moon));
  if (a.rising >= 0 && b.rising >= 0) shared("rising", signPair(a.rising, b.rising));
  shared("animal", animalRelation(a.animal, b.animal));
  shared("element", chineseElementRelation(a.element, b.element));
  if (a.lifePath > 0 && b.lifePath > 0) shared("lifePath", numberRelation(a.lifePath, b.lifePath));
  if (a.expression > 0 && b.expression > 0) shared("expression", numberRelation(a.expression, b.expression));
  if (a.moon >= 0 && b.moon >= 0) {
    const x = signPair(a.moon, b.sun), y = signPair(b.moon, a.sun);
    f.push({ key: "moonSun", label: NINE_LABELS.moonSun, weight: NINE_WEIGHTS.moonSun, directional: true, ab: x.score, ba: y.score,
      detailAB: `${a.name}'s ${SIGNS[a.moon].name} Moon meets ${b.name}'s ${SIGNS[b.sun].name} Sun`, detailBA: `${b.name}'s ${SIGNS[b.moon].name} Moon meets ${a.name}'s ${SIGNS[a.sun].name} Sun` });
  }
  if (a.soulUrge > 0 && b.personality > 0 && b.soulUrge > 0 && a.personality > 0) {
    const x = numberRelation(a.soulUrge, b.personality), y = numberRelation(b.soulUrge, a.personality);
    f.push({ key: "soulPers", label: NINE_LABELS.soulPers, weight: NINE_WEIGHTS.soulPers, directional: true, ab: x.score, ba: y.score,
      detailAB: `${a.name}'s Soul Urge ${a.soulUrge} meets ${b.name}'s Personality ${b.personality}`, detailBA: `${b.name}'s Soul Urge ${b.soulUrge} meets ${a.name}'s Personality ${a.personality}` });
  }
  f.sort((p, q) => NINE_ORDER.indexOf(p.key) - NINE_ORDER.indexOf(q.key));
  const total = f.reduce((s, x) => s + x.weight, 0);
  const side = (k) => Math.round(f.reduce((s, x) => s + x.weight * x[k], 0) / total);
  const ab = side("ab"), ba = side("ba");
  const read = (x, y, k) => {
    const sorted = [...f].sort((p, q) => q[k] - p[k]);
    const best = sorted[0], worst = sorted[sorted.length - 1];
    return `${x.name} meets ${y.name} at ${k === "ab" ? ab : ba} out of 100. The strongest link is ${best.label.toLowerCase()}, at ${best[k]}. The most friction is in ${worst.label.toLowerCase()}, at ${worst[k]}. Name that one early and it matters less.`;
  };
  return {
    score: Math.round((ab + ba) / 2), factors: f, used: f.length,
    missing: NINE_ORDER.filter((k) => !f.some((x) => x.key === k)),
    ab: { score: ab, title: `How ${a.name} meets ${b.name}`, text: read(a, b, "ab") },
    ba: { score: ba, title: `How ${b.name} meets ${a.name}`, text: read(b, a, "ba") },
  };
}
