// Moon sign and rising sign. Pure functions, no browser APIs.
// Moon: a short series for the Moon's ecliptic longitude (good to about a third of a degree).
// Rising: the ecliptic point on the eastern horizon from sidereal time, latitude and longitude.
import { SIGNS, parseDate } from "./engine";

const RAD = Math.PI / 180;
const norm = (d) => ((d % 360) + 360) % 360;
const jd = (ms) => ms / 86400000 + 2440587.5;

export function moonLongitude(ms) {
  const T = (jd(ms) - 2451545) / 36525;
  const s = (a, b) => Math.sin((a + b * T) * RAD);
  return norm(
    218.32 + 481267.881 * T + 6.29 * s(135.0, 477198.87) - 1.27 * s(259.3, -413335.36) +
    0.66 * s(235.7, 890534.22) + 0.21 * s(269.9, 954397.7) - 0.19 * s(357.5, 35999.05) - 0.11 * s(186.5, 966404.05)
  );
}

export function ascendant(ms, lat, lng) {
  const d = jd(ms) - 2451545;
  const T = d / 36525;
  const ramc = norm(norm(280.46061837 + 360.98564736629 * d) + lng) * RAD;
  const eps = (23.4393 - 0.013 * T) * RAD;
  const phi = Math.max(-66, Math.min(66, lat)) * RAD;
  const asc = Math.atan2(Math.cos(ramc), -(Math.sin(eps) * Math.tan(phi) + Math.cos(eps) * Math.sin(ramc)));
  return norm(asc / RAD);
}

export function signAt(lon) {
  const index = Math.floor(norm(lon) / 30) % 12;
  return { ...SIGNS[index], index, degree: Math.floor(norm(lon) % 30) };
}

function tzOffsetMs(utcMs, tz) {
  const f = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
  const p = Object.fromEntries(f.formatToParts(new Date(utcMs)).map((x) => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute, +p.second);
  return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 1000) * 1000;
}

/** Local clock time at a place to a UTC timestamp. place: { tz } or { offset } (hours) or null (read as UTC). */
export function localToUtc(y, m, d, hh, mm, place) {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  if (!place) return guess;
  if (place.tz) {
    try {
      const o1 = tzOffsetMs(guess, place.tz);
      let utc = guess - o1;
      const o2 = tzOffsetMs(utc, place.tz);
      if (o2 !== o1) utc = guess - o2;
      return utc;
    } catch { return guess; }
  }
  return guess - (place.offset || 0) * 3600000;
}

const C = [
  ["new-york", "New York, USA", 40.71, -74.01, "America/New_York"], ["los-angeles", "Los Angeles, USA", 34.05, -118.24, "America/Los_Angeles"],
  ["chicago", "Chicago, USA", 41.88, -87.63, "America/Chicago"], ["denver", "Denver, USA", 39.74, -104.99, "America/Denver"],
  ["houston", "Houston, USA", 29.76, -95.37, "America/Chicago"], ["miami", "Miami, USA", 25.76, -80.19, "America/New_York"],
  ["atlanta", "Atlanta, USA", 33.75, -84.39, "America/New_York"], ["san-francisco", "San Francisco, USA", 37.77, -122.42, "America/Los_Angeles"],
  ["seattle", "Seattle, USA", 47.61, -122.33, "America/Los_Angeles"], ["toronto", "Toronto, Canada", 43.65, -79.38, "America/Toronto"],
  ["vancouver", "Vancouver, Canada", 49.28, -123.12, "America/Vancouver"], ["mexico-city", "Mexico City, Mexico", 19.43, -99.13, "America/Mexico_City"],
  ["sao-paulo", "São Paulo, Brazil", -23.55, -46.63, "America/Sao_Paulo"], ["buenos-aires", "Buenos Aires, Argentina", -34.6, -58.38, "America/Argentina/Buenos_Aires"],
  ["london", "London, UK", 51.51, -0.13, "Europe/London"], ["dublin", "Dublin, Ireland", 53.35, -6.26, "Europe/Dublin"],
  ["paris", "Paris, France", 48.86, 2.35, "Europe/Paris"], ["madrid", "Madrid, Spain", 40.42, -3.7, "Europe/Madrid"],
  ["berlin", "Berlin, Germany", 52.52, 13.41, "Europe/Berlin"], ["rome", "Rome, Italy", 41.9, 12.5, "Europe/Rome"],
  ["amsterdam", "Amsterdam, Netherlands", 52.37, 4.9, "Europe/Amsterdam"], ["stockholm", "Stockholm, Sweden", 59.33, 18.07, "Europe/Stockholm"],
  ["istanbul", "Istanbul, Turkey", 41.01, 28.98, "Europe/Istanbul"], ["moscow", "Moscow, Russia", 55.76, 37.62, "Europe/Moscow"],
  ["cairo", "Cairo, Egypt", 30.04, 31.24, "Africa/Cairo"], ["lagos", "Lagos, Nigeria", 6.52, 3.38, "Africa/Lagos"],
  ["nairobi", "Nairobi, Kenya", -1.29, 36.82, "Africa/Nairobi"], ["johannesburg", "Johannesburg, South Africa", -26.2, 28.05, "Africa/Johannesburg"],
  ["dubai", "Dubai, UAE", 25.2, 55.27, "Asia/Dubai"], ["mumbai", "Mumbai, India", 19.08, 72.88, "Asia/Kolkata"],
  ["delhi", "Delhi, India", 28.61, 77.21, "Asia/Kolkata"], ["bangkok", "Bangkok, Thailand", 13.76, 100.5, "Asia/Bangkok"],
  ["singapore", "Singapore", 1.35, 103.82, "Asia/Singapore"], ["hong-kong", "Hong Kong", 22.32, 114.17, "Asia/Hong_Kong"],
  ["shanghai", "Shanghai, China", 31.23, 121.47, "Asia/Shanghai"], ["beijing", "Beijing, China", 39.9, 116.41, "Asia/Shanghai"],
  ["taipei", "Taipei, Taiwan", 25.03, 121.57, "Asia/Taipei"], ["seoul", "Seoul, South Korea", 37.57, 126.98, "Asia/Seoul"],
  ["tokyo", "Tokyo, Japan", 35.68, 139.65, "Asia/Tokyo"], ["manila", "Manila, Philippines", 14.6, 120.98, "Asia/Manila"],
  ["jakarta", "Jakarta, Indonesia", -6.21, 106.85, "Asia/Jakarta"], ["sydney", "Sydney, Australia", -33.87, 151.21, "Australia/Sydney"],
  ["melbourne", "Melbourne, Australia", -37.81, 144.96, "Australia/Melbourne"], ["auckland", "Auckland, New Zealand", -36.85, 174.76, "Pacific/Auckland"],
];
export const CITIES = C.map(([key, name, lat, lng, tz]) => ({ key, name, lat, lng, tz }));

/** Turn the form's place fields into a place, or null when none or invalid. */
export function resolvePlace(v) {
  if (!v || !v.placeKey) return null;
  if (v.placeKey === "custom") {
    const lat = parseFloat(v.lat), lng = parseFloat(v.lng), off = parseFloat(v.offset);
    if ([lat, lng, off].some(Number.isNaN) || Math.abs(lat) > 66 || Math.abs(lng) > 180 || off < -12 || off > 14) return null;
    return { name: "Custom place", lat, lng, offset: off };
  }
  return CITIES.find((c) => c.key === v.placeKey) || null;
}

/** input: { time: "HH:MM" or "", place: place or null }. Moon always; rising only with time and place. */
export function computeChart(birthdate, input = {}) {
  const p = parseDate(birthdate);
  if (!p) return null;
  const { time, place } = input;
  const tm = /^(\d{2}):(\d{2})$/.exec(time || "");
  const ms = localToUtc(p.y, p.m, p.d, tm ? +tm[1] : 12, tm ? +tm[2] : 0, place || null);
  const moon = signAt(moonLongitude(ms));
  const H = 12 * 3600000;
  const moonUncertain = !tm && signAt(moonLongitude(ms - H)).index !== signAt(moonLongitude(ms + H)).index;
  const rising = tm && place ? signAt(ascendant(ms, place.lat, place.lng)) : null;
  return { moon, rising, timeKnown: !!tm, placeKnown: !!place, moonUncertain };
}
