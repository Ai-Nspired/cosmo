// Share helpers. Call only from event handlers (they use window and document).
import { formatDate } from "./engine";

/** A link that re-opens a profile: /?name=...&date=YYYY-MM-DD (Home reads these). */
export function profileShareUrl(name, birthdate) {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  return `${base}/?name=${encodeURIComponent(name)}&date=${encodeURIComponent(birthdate)}`;
}
/** A link that re-opens a comparison: /explore?tab=compatibility&a=..&ad=..&b=..&bd=.. */
export function compareShareUrl(a, b) {
  const base = typeof window !== "undefined" ? window.location.origin : "";
  const q = new URLSearchParams({ tab: "compatibility", a: a.name, ad: a.birthdate, b: b.name, bd: b.birthdate });
  return `${base}/explore?${q.toString()}`;
}

/** Native share sheet when available, else copy. Returns "shared" | "copied" | "failed". */
export async function shareOrCopy(url, title = "My cosmic profile") {
  try {
    if (navigator.share) { await navigator.share({ title, url }); return "shared"; }
  } catch (e) {
    if (e && e.name === "AbortError") return "cancelled";
  }
  return (await copyText(url)) ? "copied" : "failed";
}

export async function copyText(text) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    try {
      const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy"); ta.remove(); return ok;
    } catch { return false; }
  }
}

/** Draw a 1200x630 profile card and download it as PNG. p = computed profile. */
export function downloadProfileImage(p) {
  const W = 1200, H = 630;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const g = c.getContext("2d");
  g.fillStyle = "#0B0D10"; g.fillRect(0, 0, W, H);
  const rg = g.createRadialGradient(880, 315, 20, 880, 315, 420);
  rg.addColorStop(0, "rgba(45,212,163,0.22)"); rg.addColorStop(1, "rgba(11,13,16,0)");
  g.fillStyle = rg; g.fillRect(0, 0, W, H);
  [260, 195, 130].forEach((r, i) => {
    g.beginPath(); g.arc(880, 315, r, 0, Math.PI * 2);
    g.strokeStyle = i === 0 ? "rgba(45,212,163,0.6)" : "rgba(167,139,250,0.5)"; g.lineWidth = 2; g.stroke();
  });
  g.textAlign = "center"; g.fillStyle = "#EEF2F6";
  g.font = "600 120px Geist, system-ui, sans-serif"; g.fillText(String(p.lifePath.value), 880, 355);
  g.font = "500 20px 'Geist Mono', monospace"; g.fillStyle = "#8C96A3"; g.fillText("LIFE PATH", 880, 395);
  g.textAlign = "left";
  g.fillStyle = "#2DD4A3"; g.font = "500 20px 'Geist Mono', monospace"; g.fillText("COSMIC PROFILE & SYNERGY", 72, 96);
  g.fillStyle = "#EEF2F6"; g.font = "600 56px Geist, system-ui, sans-serif"; g.fillText(p.name.slice(0, 22), 72, 180);
  g.fillStyle = "#8C96A3"; g.font = "400 24px Geist, system-ui, sans-serif"; g.fillText(formatDate(p.birthdate), 72, 222);
  const rows = [
    ["Sun sign", p.sun.name],
    ["Chinese zodiac", p.chinese.error ? "Out of range" : `${p.chinese.element} ${p.chinese.animal}`],
    ["Expression", p.expression ? String(p.expression.value) : "–"],
    ["Soul Urge", p.soulUrge ? String(p.soulUrge.value) : "–"],
    ["Destiny", p.destiny ? String(p.destiny.value) : "–"],
  ];
  rows.forEach(([k, v], i) => {
    const y = 300 + i * 56;
    g.fillStyle = "#28313B"; g.fillRect(72, y + 18, 480, 1);
    g.fillStyle = "#8C96A3"; g.font = "500 18px 'Geist Mono', monospace"; g.fillText(k.toUpperCase(), 72, y);
    g.fillStyle = "#EEF2F6"; g.font = "600 28px Geist, system-ui, sans-serif"; g.textAlign = "right"; g.fillText(v, 552, y + 4); g.textAlign = "left";
  });
  g.fillStyle = "#8C96A3"; g.font = "400 16px Geist, system-ui, sans-serif"; g.fillText("For entertainment and personal reflection.", 72, 590);
  const a = document.createElement("a");
  a.download = `cosmic-profile-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
  a.href = c.toDataURL("image/png"); document.body.appendChild(a); a.click(); a.remove();
}
