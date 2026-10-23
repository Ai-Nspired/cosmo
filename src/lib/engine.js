// The calculation engine. Pure functions, no browser APIs: safe to run anywhere.
import { CNY, CNY_FIRST_YEAR, CNY_LAST_YEAR } from "../data/cny";

/* ---------- Sun signs (standard tropical ranges) ---------- */
// [slug, name, glyph, startMonth, startDay, element, modality]
export const SIGNS = [
  { slug: "aries", name: "Aries", glyph: "\u2648\uFE0E", start: [3, 21], end: [4, 19], element: "Fire", modality: "Cardinal" },
  { slug: "taurus", name: "Taurus", glyph: "\u2649\uFE0E", start: [4, 20], end: [5, 20], element: "Earth", modality: "Fixed" },
  { slug: "gemini", name: "Gemini", glyph: "\u264A\uFE0E", start: [5, 21], end: [6, 20], element: "Air", modality: "Mutable" },
  { slug: "cancer", name: "Cancer", glyph: "\u264B\uFE0E", start: [6, 21], end: [7, 22], element: "Water", modality: "Cardinal" },
  { slug: "leo", name: "Leo", glyph: "\u264C\uFE0E", start: [7, 23], end: [8, 22], element: "Fire", modality: "Fixed" },
  { slug: "virgo", name: "Virgo", glyph: "\u264D\uFE0E", start: [8, 23], end: [9, 22], element: "Earth", modality: "Mutable" },
  { slug: "libra", name: "Libra", glyph: "\u264E\uFE0E", start: [9, 23], end: [10, 22], element: "Air", modality: "Cardinal" },
  { slug: "scorpio", name: "Scorpio", glyph: "\u264F\uFE0E", start: [10, 23], end: [11, 21], element: "Water", modality: "Fixed" },
  { slug: "sagittarius", name: "Sagittarius", glyph: "\u2650\uFE0E", start: [11, 22], end: [12, 21], element: "Fire", modality: "Mutable" },
  { slug: "capricorn", name: "Capricorn", glyph: "\u2651\uFE0E", start: [12, 22], end: [1, 19], element: "Earth", modality: "Cardinal" },
  { slug: "aquarius", name: "Aquarius", glyph: "\u2652\uFE0E", start: [1, 20], end: [2, 18], element: "Air", modality: "Fixed" },
  { slug: "pisces", name: "Pisces", glyph: "\u2653\uFE0E", start: [2, 19], end: [3, 20], element: "Water", modality: "Mutable" },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MON = MONTHS.map((m) => m.slice(0, 3));
export const signDates = (s) => `${MONTHS[s.start[0] - 1]} ${s.start[1]} to ${MONTHS[s.end[0] - 1]} ${s.end[1]}`;

export function sunSign(m, d) {
  const md = m * 100 + d;
  let idx = SIGNS.findIndex((s) => {
    const a = s.start[0] * 100 + s.start[1];
    const b = s.end[0] * 100 + s.end[1];
    return a <= b ? md >= a && md <= b : md >= a || md <= b;
  });
  if (idx < 0) idx = 9;
  const sign = SIGNS[idx];
  // Cusp: within one day of a boundary
  let cusp = null;
  const isDay = (pair, off) => {
    const dt = new Date(Date.UTC(2001, pair[0] - 1, pair[1] + off));
    return dt.getUTCMonth() + 1 === m && dt.getUTCDate() === d;
  };
  if (isDay(sign.start, 0) || isDay(sign.start, 1)) cusp = SIGNS[(idx + 11) % 12];
  else if (isDay(sign.end, 0) || isDay(sign.end, -1)) cusp = SIGNS[(idx + 1) % 12];
  return { ...sign, index: idx, dates: signDates(sign), cusp };
}

/* ---------- Chinese zodiac (by Lunar New Year) ---------- */
export const ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"];
export const ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"];
export const animalSlug = (a) => a.toLowerCase();
export const TRINES = [["Rat", "Dragon", "Monkey"], ["Ox", "Snake", "Rooster"], ["Tiger", "Horse", "Dog"], ["Rabbit", "Goat", "Pig"]];
export const SECRET_FRIENDS = [["Rat", "Ox"], ["Tiger", "Pig"], ["Rabbit", "Dog"], ["Dragon", "Rooster"], ["Snake", "Monkey"], ["Horse", "Goat"]];
export const clashOf = (a) => ANIMALS[(ANIMALS.indexOf(a) + 6) % 12];
export const trineOf = (a) => TRINES.find((t) => t.includes(a));
export const friendOf = (a) => { const p = SECRET_FRIENDS.find((x) => x.includes(a)); return p[0] === a ? p[1] : p[0]; };

// Element from the Chinese year's last digit: 0-1 Metal, 2-3 Water, 4-5 Wood, 6-7 Fire, 8-9 Earth
export function yearElement(y) {
  const d = y % 10;
  return ["Metal", "Metal", "Water", "Water", "Wood", "Wood", "Fire", "Fire", "Earth", "Earth"][d];
}
export const yearAnimal = (y) => ANIMALS[(((y - 4) % 12) + 12) % 12];
const iso = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

export function chineseZodiac(y, m, d) {
  if (!CNY[y]) return { error: "out_of_range", message: `Birth years from ${CNY_FIRST_YEAR} to ${CNY_LAST_YEAR} are supported. ${y} is out of range, so the animal is not shown.` };
  const [nm, nd] = CNY[y];
  const before = m * 100 + d < nm * 100 + nd;
  const cy = before ? y - 1 : y;
  if (!CNY[cy]) return { error: "out_of_range", message: `This date falls before Lunar New Year ${y}, in a year outside the supported table, so the animal is not shown.` };
  const animal = yearAnimal(cy);
  const next = CNY[cy + 1];
  return {
    animal, slug: animalSlug(animal), index: ANIMALS.indexOf(animal), element: yearElement(cy),
    polarity: cy % 2 === 0 ? "Yang" : "Yin", chineseYear: cy,
    newYearDate: iso(cy, CNY[cy][0], CNY[cy][1]), nextNewYearDate: next ? iso(cy + 1, next[0], next[1]) : null,
    beforeNewYear: before,
  };
}

/** Years (within the table) that are a given animal, optionally a given element. */
export function animalYears(animal, element) {
  const out = [];
  for (let y = CNY_FIRST_YEAR; y <= CNY_LAST_YEAR; y++) if (yearAnimal(y) === animal && (!element || yearElement(y) === element)) out.push(y);
  return out;
}
export const lunarYearSpan = (y) => {
  if (!CNY[y]) return null;
  const s = CNY[y]; const n = CNY[y + 1];
  let end = null;
  if (n) { const e = new Date(Date.UTC(y + 1, n[0] - 1, n[1] - 1)); end = `${MON[e.getUTCMonth()]} ${e.getUTCDate()}, ${y + 1}`; }
  return { start: `${MON[s[0] - 1]} ${s[1]}, ${y}`, end };
};

/* ---------- Numerology (Pythagorean) ---------- */
export const MASTER = [11, 22, 33];
export const KARMIC = [13, 14, 16, 19];
export const VOWELS = ["A", "E", "I", "O", "U"]; // Y counts as a consonant in this tool
export const letterValue = (ch) => ((ch.charCodeAt(0) - 65) % 9) + 1;
export const LETTER_TABLE = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => ({ value: n, letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((c) => letterValue(c) === n) }));

export const digitSum = (n) => String(n).split("").reduce((a, c) => a + Number(c), 0);

/** Reduce to one digit, stopping at 11, 22 or 33 if the total passes through one. */
export function reduce(n) {
  const trail = [n];
  let v = n;
  while (v > 9 && !MASTER.includes(v)) { v = digitSum(v); trail.push(v); }
  const master = MASTER.includes(v);
  return { value: v, base: master ? digitSum(v) : v, master, trail, karmic: trail.find((t) => KARMIC.includes(t)) || null };
}
/** Reduce all the way to 1 to 9 (daily cycles). */
export const reduceFull = (n) => { let v = n; while (v > 9) v = digitSum(v); return v; };
export const trailText = (r) => r.trail.join(" → ");

const SPECIAL = { "ß": "SS", "Æ": "AE", "æ": "AE", "Ø": "O", "ø": "O", "Œ": "OE", "œ": "OE", "Ð": "D", "ð": "D", "Þ": "TH", "þ": "TH", "Ł": "L", "ł": "L" };

/** Map a name to letters. Accents are removed (é → E). Letters that cannot be mapped are skipped and listed. */
export function mapName(name) {
  const letters = []; const skipped = [];
  const pre = Array.from(name || "").map((c) => SPECIAL[c] || c).join("");
  for (const raw of Array.from(pre)) {
    const c = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    if (/^[A-Z]$/.test(c)) letters.push({ letter: c, value: letterValue(c), vowel: VOWELS.includes(c) });
    else if (/\p{L}/u.test(raw)) skipped.push(raw);
  }
  return { letters, skipped: [...new Set(skipped)] };
}

function nameNumber(letters, filter) {
  const used = letters.filter(filter);
  if (!used.length) return null;
  const total = used.reduce((a, l) => a + l.value, 0);
  return { ...reduce(total), total, letters: used };
}

export function lifePath(y, m, d) {
  const rm = reduce(m), rd = reduce(d), ry = reduce(y);
  const total = rm.value + rd.value + ry.value;
  const r = reduce(total);
  return { ...r, total, parts: { month: rm, day: rd, year: ry }, formula: `month ${m} → ${rm.value}, day ${d} → ${rd.value}, year ${y} → ${ry.value}; ${rm.value} + ${rd.value} + ${ry.value} = ${total}` };
}

/* ---------- Dates and validation ---------- */
export function parseDate(str) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(str || "");
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  const dt = new Date(Date.UTC(y, mo - 1, d));
  if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return { y, m: mo, d };
}
export const localDateKey = (date = new Date()) => iso(date.getFullYear(), date.getMonth() + 1, date.getDate());
export const formatDate = (str) => { const p = parseDate(str); return p ? `${MONTHS[p.m - 1]} ${p.d}, ${p.y}` : str; };

/** Returns {} when valid, else { name?, birthdate? } with plain messages. */
export function validateInput(name, birthdate, today = new Date()) {
  const errors = {};
  const n = (name || "").trim();
  if (!n) errors.name = "Enter your full name.";
  else if (!mapName(n).letters.length) errors.name = "None of these letters can be mapped by the A to Z number table. Try the Latin spelling of your name.";
  if (!birthdate) errors.birthdate = "Enter your birthdate.";
  else {
    const p = parseDate(birthdate);
    if (!p) errors.birthdate = /^\d{4}-\d{2}-\d{2}$/.test(birthdate) ? "That date does not exist. Check the day and month." : "Enter a complete date: day, month and year.";
    else if (birthdate > localDateKey(today)) errors.birthdate = "That date is in the future. Enter the day you were born.";
    else {
      const cz = chineseZodiac(p.y, p.m, p.d);
      if (cz.error) errors.birthdate = cz.message;
    }
  }
  return errors;
}

/* ---------- The full profile ---------- */
export function computeProfile(name, birthdate) {
  const p = parseDate(birthdate);
  if (!p) return null;
  const { letters, skipped } = mapName(name);
  const expression = nameNumber(letters, () => true);
  const soulUrge = nameNumber(letters, (l) => l.vowel);
  const personality = nameNumber(letters, (l) => !l.vowel);
  const lp = lifePath(p.y, p.m, p.d);
  const birthday = { ...reduce(p.d), total: p.d };
  const destiny = expression ? { ...reduce(lp.value + expression.value), total: lp.value + expression.value, formula: `Life Path ${lp.value} + Expression ${expression.value} = ${lp.value + expression.value}` } : null;
  const core = { expression, soulUrge, personality, birthday, destiny };
  const masters = [["lifePath", lp], ...Object.entries(core)].filter(([, r]) => r && r.master).map(([key, r]) => ({ key, value: r.value, base: r.base }));
  return {
    name: name.trim(), birthdate, ...p,
    sun: sunSign(p.m, p.d),
    chinese: chineseZodiac(p.y, p.m, p.d),
    lifePath: lp, ...core,
    letters, skipped, masters,
  };
}

/** Pick a stable item from a list using a string seed. */
export function seeded(list, seed) {
  let h = 2166136261;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return list[Math.abs(h) % list.length];
}

export const CORE_KEYS = ["expression", "soulUrge", "personality", "birthday", "destiny"];
export const CORE_LABELS = { lifePath: "Life Path", expression: "Expression", soulUrge: "Soul Urge", personality: "Personality", birthday: "Birthday", destiny: "Destiny" };
export const CORE_SLUGS = { expression: "expression", soulUrge: "soul-urge", personality: "personality", birthday: "birthday", destiny: "destiny" };
export const NUMBER_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];
export { MONTHS };
