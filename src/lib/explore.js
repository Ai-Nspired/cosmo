// Day's Vibe and Compatibility. Deterministic: same inputs and date, same result.
import { reduce, reduceFull, digitSum, sunSign, chineseZodiac, parseDate, trineOf, friendOf, clashOf, seeded, SIGNS } from "./engine";
import { DAY_MOODS, DAY_COLORS, DAY_TIPS, DAY_HEADLINES } from "../data/vibe";

/* ---------- Shared relations ---------- */
const COMPLEMENT = { Fire: "Air", Air: "Fire", Earth: "Water", Water: "Earth" };

export function elementRelation(a, b) {
  if (a === b) return { key: "same", label: "Same element", score: 88 };
  if (COMPLEMENT[a] === b) return { key: "complement", label: "Complementary elements", score: 92 };
  return { key: "friction", label: "Contrasting elements", score: 55 };
}
export function modalityRelation(a, b) {
  if (a === b) return { key: "same", label: `Both ${a.toLowerCase()}`, score: 62 };
  return { key: "different", label: `${a} meets ${b.toLowerCase()}`, score: 80 };
}
export function animalRelation(a, b) {
  if (a === b) return { key: "same", label: "Same animal", score: 72 };
  if (trineOf(a).includes(b)) return { key: "trine", label: "Harmony group (trine)", score: 95 };
  if (friendOf(a) === b) return { key: "friend", label: "Secret friends", score: 90 };
  if (clashOf(a) === b) return { key: "clash", label: "Opposite animals (clash)", score: 38 };
  return { key: "neutral", label: "Neutral pairing", score: 66 };
}
export const NUMBER_GROUPS = [[1, 5, 7], [2, 4, 8], [3, 6, 9]];
export const NUMBER_GROUP_NAMES = ["independent thinkers (1, 5, 7)", "builders (2, 4, 8)", "creatives (3, 6, 9)"];
export function numberRelation(a, b) {
  const ga = NUMBER_GROUPS.findIndex((g) => g.includes(a));
  const gb = NUMBER_GROUPS.findIndex((g) => g.includes(b));
  if (a === b) return { key: "same", label: `Both ${a}s`, score: 80 };
  if (ga === gb) return { key: "group", label: `Same family: ${NUMBER_GROUP_NAMES[ga]}`, score: 90 };
  return { key: "cross", label: `Different families`, score: 62 };
}

/* ---------- Day's Vibe ---------- */
export const VIBE_WEIGHTS = { personalDay: 0.4, sign: 0.3, animal: 0.3 };
const DAY_ENERGY = { 1: 84, 2: 70, 3: 88, 4: 66, 5: 86, 6: 78, 7: 64, 8: 82, 9: 74 };

/**
 * profile: computed profile (computeProfile). dateKey: local "YYYY-MM-DD".
 * Personal Year = birth month + birth day + current year (digits summed, reduced to 1-9).
 * Personal Day = Personal Year + current month + current day, reduced (11 and 22 shown when passed through).
 */
export function dayVibe(profile, dateKey) {
  const t = parseDate(dateKey);
  if (!profile || !t || profile.chinese.error) return null;
  const personalYear = reduceFull(digitSum(profile.m) + digitSum(profile.d) + digitSum(t.y));
  const pdRaw = personalYear + digitSum(t.m) + digitSum(t.d);
  const pd = reduce(pdRaw);
  const pdBase = pd.base;

  const season = sunSign(t.m, t.d);
  const signRel = elementRelation(profile.sun.element, season.element);
  const yearNow = chineseZodiac(t.y, t.m, t.d);
  const animalRel = yearNow.error ? { key: "neutral", label: "Year outside the table", score: 66 } : animalRelation(profile.chinese.animal, yearNow.animal);

  const score = Math.round(VIBE_WEIGHTS.personalDay * DAY_ENERGY[pdBase] + VIBE_WEIGHTS.sign * signRel.score + VIBE_WEIGHTS.animal * animalRel.score);
  const seed = `${profile.name}|${profile.birthdate}|${dateKey}`;
  return {
    date: dateKey,
    personalYear, personalDay: pd, personalDayFormula: `Personal Year ${personalYear} + month ${t.m} + day ${t.d} → ${pd.trail.join(" → ")}`,
    sign: { you: profile.sun, season, relation: signRel, text: signInfluenceText(profile.sun, season, signRel) },
    animal: { you: profile.chinese.animal, year: yearNow.error ? null : yearNow.animal, relation: animalRel, text: animalInfluenceText(profile.chinese.animal, yearNow.animal, animalRel) },
    mood: DAY_MOODS[pdBase][signRel.key === "friction" ? 1 : 0],
    headline: seeded(DAY_HEADLINES[pdBase], seed),
    score,
    luckyNumber: pd.value,
    luckyColor: DAY_COLORS[pdBase],
    tip: seeded(DAY_TIPS[pdBase], seed + "tip"),
  };
}

function signInfluenceText(you, season, rel) {
  const s = `The Sun is in ${season.name}, a ${season.element.toLowerCase()} sign. `;
  if (rel.key === "same") return s + `That matches your ${you.name} element, so your natural style feels louder today. Lean into it, then check you are not overdoing it.`;
  if (rel.key === "complement") return s + `${season.element} feeds your ${you.element.toLowerCase()} side. Things you start today tend to find an easy rhythm.`;
  return s + `${season.element} and ${you.element.toLowerCase()} pull in different directions. Expect small frictions and treat them as useful feedback.`;
}
function animalInfluenceText(you, year, rel) {
  if (!year) return "The current lunar year is outside the supported table, so the animal reads as neutral today.";
  const s = `This is a ${year} year. `;
  if (rel.key === "same") return s + `It is your own animal's year, which tradition treats as a year to move carefully and protect your energy.`;
  if (rel.key === "trine") return s + `The ${year} sits in your harmony group, so the year's pace suits you. Say yes to good invitations.`;
  if (rel.key === "friend") return s + `The ${year} is your secret friend, a quiet ally. Help can arrive from someone you did not expect.`;
  if (rel.key === "clash") return s + `The ${year} sits opposite your ${you}. Keep plans flexible and avoid forcing big decisions on tense days.`;
  return s + `The ${year} and your ${you} are on neutral terms. Your own choices set the tone.`;
}

/** Milliseconds until the next local midnight (for the daily refresh). */
export function msUntilMidnight(now = new Date()) {
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 1);
  return next - now;
}

/* ---------- Compatibility (two-way) ---------- */
// Each direction blends four parts. The final score is the average of both directions.
export const COMPAT_WEIGHTS = { lifePath: 0.3, sign: 0.25, animal: 0.25, direction: 0.2 };
export const SIGN_SPLIT = { element: 0.7, modality: 0.3 };

/** a, b: computed profiles. Returns null when either is missing. */
export function compatibility(a, b) {
  if (!a || !b || a.chinese.error || b.chinese.error) return null;
  const lp = numberRelation(a.lifePath.base, b.lifePath.base);
  const el = elementRelation(a.sun.element, b.sun.element);
  const mo = modalityRelation(a.sun.modality, b.sun.modality);
  const signScore = Math.round(SIGN_SPLIT.element * el.score + SIGN_SPLIT.modality * mo.score);
  const an = animalRelation(a.chinese.animal, b.chinese.animal);

  const dir = (x, y) => {
    if (!x.soulUrge || !y.personality) return { label: "Not enough letters to compare", score: 70 };
    const r = numberRelation(x.soulUrge.base, y.personality.base);
    return { ...r, label: `${x.name.split(" ")[0]}'s Soul Urge ${x.soulUrge.value} meets ${y.name.split(" ")[0]}'s Personality ${y.personality.value}` };
  };
  const dAB = dir(a, b), dBA = dir(b, a);
  const base = COMPAT_WEIGHTS.lifePath * lp.score + COMPAT_WEIGHTS.sign * signScore + COMPAT_WEIGHTS.animal * an.score;
  const ab = Math.round(base + COMPAT_WEIGHTS.direction * dAB.score);
  const ba = Math.round(base + COMPAT_WEIGHTS.direction * dBA.score);
  const first = (p) => p.name.split(" ")[0];

  return {
    score: Math.round((ab + ba) / 2),
    ab: { score: ab, title: `How ${first(a)} meets ${first(b)}`, direction: dAB, text: directionText(a, b, dAB, an) },
    ba: { score: ba, title: `How ${first(b)} meets ${first(a)}`, direction: dBA, text: directionText(b, a, dBA, an) },
    factors: [
      { key: "lifePath", label: "Life Path pairing", detail: `${a.lifePath.value} and ${b.lifePath.value}: ${lp.label}`, score: lp.score },
      { key: "sign", label: "Sun sign element and modality", detail: `${a.sun.name} and ${b.sun.name}: ${el.label.toLowerCase()}, ${mo.label.toLowerCase()}`, score: signScore },
      { key: "animal", label: "Chinese animal harmony", detail: `${a.chinese.animal} and ${b.chinese.animal}: ${an.label.toLowerCase()}`, score: an.score },
    ],
  };
}

function directionText(x, y, d, an) {
  const fx = x.name.split(" ")[0], fy = y.name.split(" ")[0];
  const open = {
    same: `${fx} recognises a lot of themselves in how ${fy} shows up, which makes trust come fast.`,
    group: `What ${fx} wants deep down fits the way ${fy} acts in the world. ${fx} tends to feel understood without long explanations.`,
    cross: `${fx}'s inner wants and ${fy}'s outer style speak different languages. ${fx} may need to ask rather than assume.`,
  }[d.key] || `${fx} reads ${fy} through first impressions, so give it time.`;
  const tail = {
    trine: `As a ${x.chinese.animal} meeting a ${y.chinese.animal}, ${fx} usually finds the pace easy to share.`,
    friend: `${fx}'s ${x.chinese.animal} and ${fy}'s ${y.chinese.animal} are secret friends: loyal once the bond forms.`,
    clash: `${fx}'s ${x.chinese.animal} sits opposite ${fy}'s ${y.chinese.animal}, so ${fx} should name small irritations early.`,
    same: `Two ${x.chinese.animal}s share habits, good and bad, so ${fx} may spot their own blind spots in ${fy}.`,
    neutral: `Between the ${x.chinese.animal} and the ${y.chinese.animal}, the bond is shaped by effort more than fate.`,
  }[an.key];
  return `${open} ${tail}`;
}

export { SIGNS };
