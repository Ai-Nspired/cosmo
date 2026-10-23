// Sun sign readings. Written as entertainment and reflection, not prediction.
import { SIGNS, signDates } from "../lib/engine";

const R = {
  aries: {
    keywords: ["Initiator", "Brave", "Direct"],
    overview: "Aries opens the zodiac year at the spring equinox, and it acts like it. This is the sign of the first step, the quick decision and the honest reaction.",
    traits: "Aries people tend to move first and think on the way. They like a clear challenge, get bored by waiting, and say what they mean. Their energy is contagious, and they often pull others into action.",
    strengths: ["Starts things others only talk about", "Recovers fast from setbacks", "Honest, even when it is awkward"],
    challenges: ["Impatience with slow people or slow plans", "Can start more than they finish", "Temper that flares quickly, then fades"],
    tips: ["Pick one project and see it to the end before starting the next", "Count to five before replying when you feel heated", "Use your courage to stand up for someone quieter"],
  },
  taurus: {
    keywords: ["Steady", "Sensual", "Loyal"],
    overview: "Taurus is the fixed earth sign of late spring, linked with comfort, patience and the things that last.",
    traits: "Taurus people like to build slowly and well. They notice texture, taste and sound, and they are happiest when life feels secure. Once they commit to a person or a plan, they rarely let go.",
    strengths: ["Patient and reliable under pressure", "Good with money and practical resources", "Creates calm, comfortable spaces"],
    challenges: ["Resists change, even helpful change", "Can dig in and become stubborn", "Comfort can slide into inertia"],
    tips: ["Try one small new habit each week to keep change friendly", "Ask what you would gain, not only what you would lose", "Share your calm: invite someone over for a slow evening"],
  },
  gemini: {
    keywords: ["Curious", "Quick", "Social"],
    overview: "Gemini is the mutable air sign at the end of spring, the sign of conversation, ideas and two sides of every story.",
    traits: "Gemini people collect facts, friends and opinions. They think fast, talk easily and adapt to almost any room. A day without learning something new feels like a wasted day.",
    strengths: ["Learns quickly and explains clearly", "Connects people and ideas", "Light, funny company"],
    challenges: ["Attention that jumps before the job is done", "Can seem inconsistent or hard to pin down", "Overthinking instead of choosing"],
    tips: ["Keep a single list for ideas so they stop crowding your head", "Finish one conversation thread before opening another", "Pair your curiosity with a deadline"],
  },
  cancer: {
    keywords: ["Caring", "Intuitive", "Protective"],
    overview: "Cancer begins at the summer solstice. It is the cardinal water sign of home, family and memory.",
    traits: "Cancer people feel things deeply and remember them for a long time. They protect the people they love and make others feel at home. A tough shell often covers a soft heart.",
    strengths: ["Strong emotional intelligence", "Fiercely loyal to family and friends", "Good at reading a room"],
    challenges: ["Takes criticism personally", "Moods that rise and fall with circumstances", "Can hold on to the past"],
    tips: ["Say what you need instead of hoping others guess", "Build a small daily ritual that grounds you", "Let one old grudge go this month"],
  },
  leo: {
    keywords: ["Radiant", "Generous", "Proud"],
    overview: "Leo is the fixed fire sign of high summer, linked with creativity, play and the warmth of the Sun itself.",
    traits: "Leo people like to shine and help others shine too. They are generous with praise, time and attention. They want their work to be seen and their loyalty to be returned.",
    strengths: ["Natural confidence and presence", "Warm, generous and encouraging", "Brings creative energy to any group"],
    challenges: ["Can need more recognition than others give", "Pride that makes apologies hard", "Dislikes being sidelined"],
    tips: ["Give someone else the spotlight on purpose today", "Make something just for the joy of it", "Practise a short, sincere apology before you need it"],
  },
  virgo: {
    keywords: ["Precise", "Helpful", "Thoughtful"],
    overview: "Virgo is the mutable earth sign of late summer harvest, the sign of skill, service and getting the details right.",
    traits: "Virgo people notice what others miss. They like to be useful, to improve things and to understand how they work. Their care often shows through practical help more than words.",
    strengths: ["Sharp eye for detail and quality", "Dependable and hard-working", "Solves problems calmly"],
    challenges: ["Self-criticism and perfectionism", "Worry about things that may never happen", "Can come across as picky"],
    tips: ["Call something done at good, not perfect, once today", "Write your worries down, then pick one to act on", "Praise before you correct"],
  },
  libra: {
    keywords: ["Fair", "Graceful", "Diplomatic"],
    overview: "Libra opens autumn at the equinox. It is the cardinal air sign of balance, beauty and partnership.",
    traits: "Libra people look for harmony and fairness. They see every side, value good manners and are drawn to art and design. Relationships matter deeply to them.",
    strengths: ["Natural mediator and peacemaker", "Strong sense of style and beauty", "Charming and easy to talk to"],
    challenges: ["Indecision when every option has merit", "Avoids conflict until it grows", "Can lose themselves in other people's wishes"],
    tips: ["Give yourself a time limit on small choices", "Say one honest no this week", "Spend time somewhere beautiful to reset"],
  },
  scorpio: {
    keywords: ["Intense", "Perceptive", "Resilient"],
    overview: "Scorpio is the fixed water sign of deep autumn, linked with transformation, privacy and emotional depth.",
    traits: "Scorpio people go all in or not at all. They see through surfaces, keep secrets well and value loyalty above almost everything. They often grow strongest after hard times.",
    strengths: ["Focus and determination", "Reads motives and hidden patterns", "Deeply loyal once trust is earned"],
    challenges: ["Can be guarded or suspicious", "Holds on to hurt for a long time", "All-or-nothing reactions"],
    tips: ["Share one thing you usually keep private with someone you trust", "Channel intensity into a project with a clear goal", "Ask a direct question instead of testing people"],
  },
  sagittarius: {
    keywords: ["Free", "Optimistic", "Seeker"],
    overview: "Sagittarius is the mutable fire sign at the end of autumn, the sign of travel, big questions and open horizons.",
    traits: "Sagittarius people want room to roam, in body and mind. They are honest, funny and hopeful, and they love learning through experience. Routine can feel like a cage.",
    strengths: ["Optimism that lifts others", "Honest and open-minded", "Adventurous and curious about the world"],
    challenges: ["Blunt words that land harder than meant", "Restless with commitments", "Promises more than time allows"],
    tips: ["Plan a small adventure close to home", "Check your schedule before saying yes", "Soften one honest comment with kindness"],
  },
  capricorn: {
    keywords: ["Ambitious", "Disciplined", "Wise"],
    overview: "Capricorn begins at the winter solstice. It is the cardinal earth sign of structure, goals and long climbs.",
    traits: "Capricorn people play the long game. They set goals, work steadily and respect experience. Underneath the serious surface, many have a dry, sharp sense of humour.",
    strengths: ["Patience to reach long-term goals", "Responsible and organised", "Calm in a crisis"],
    challenges: ["Can work too much and rest too little", "Hard on themselves and others", "Slow to show feelings"],
    tips: ["Book rest into your calendar like a meeting", "Celebrate a milestone, not only the summit", "Tell someone you appreciate them, out loud"],
  },
  aquarius: {
    keywords: ["Original", "Independent", "Humane"],
    overview: "Aquarius is the fixed air sign of midwinter, linked with ideas, community and the future.",
    traits: "Aquarius people think differently and are proud of it. They care about fairness for everyone, enjoy unusual ideas and need freedom in their relationships. They can be friendly to all and close to few.",
    strengths: ["Inventive, original thinking", "Strong sense of fairness", "Loyal friend who gives space"],
    challenges: ["Can seem detached or aloof", "Stubborn about their own ideas", "Rebels against rules for the sake of it"],
    tips: ["Share a feeling, not only an opinion, today", "Join or help a group working on something you care about", "Try one idea that someone else suggested"],
  },
  pisces: {
    keywords: ["Dreamy", "Compassionate", "Creative"],
    overview: "Pisces closes the zodiac year in late winter. It is the mutable water sign of imagination, empathy and endings that lead to new beginnings.",
    traits: "Pisces people feel what others feel. They are artistic, kind and open to the unseen side of life. They need time alone to recharge after absorbing everyone's moods.",
    strengths: ["Deep empathy and kindness", "Rich imagination and creativity", "Adapts gently to change"],
    challenges: ["Escapes into daydreams when life is hard", "Weak boundaries with demanding people", "Can feel overwhelmed easily"],
    tips: ["Protect a quiet hour for yourself every day", "Turn a daydream into one small real step", "Practise saying 'let me think about it'"],
  },
};

export const ELEMENT_NOTES = {
  Fire: "Fire signs (Aries, Leo, Sagittarius) bring drive, warmth and spark.",
  Earth: "Earth signs (Taurus, Virgo, Capricorn) bring patience, practicality and staying power.",
  Air: "Air signs (Gemini, Libra, Aquarius) bring ideas, talk and connection.",
  Water: "Water signs (Cancer, Scorpio, Pisces) bring feeling, intuition and depth.",
};
export const MODALITY_NOTES = {
  Cardinal: "Cardinal signs start each season, so they like to begin things.",
  Fixed: "Fixed signs sit in the middle of a season, so they hold steady and finish.",
  Mutable: "Mutable signs end a season, so they adapt and prepare for change.",
};

export const CUSP_NOTE = "Cusp dates can differ by a day depending on year and method. This tool uses the standard ranges shown in the Method section.";

export const SIGN_GUIDES = SIGNS.map((s, index) => ({ ...s, index, dates: signDates(s), ...R[s.slug] }));
export const getSignGuide = (slug) => SIGN_GUIDES.find((s) => s.slug === slug) || null;
