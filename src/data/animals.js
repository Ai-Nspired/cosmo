// Chinese zodiac readings and the five elements. Entertainment and reflection only.
import { ANIMALS, ELEMENTS, trineOf, friendOf, clashOf, animalYears, animalSlug } from "../lib/engine";

const R = {
  Rat: {
    keywords: ["Clever", "Resourceful", "Quick"],
    overview: "The Rat comes first in the cycle. In the old story it won the race by riding on the Ox and jumping ahead at the finish line.",
    traits: "Rat people are sharp, alert and good at spotting chances. They save for a rainy day, read people well and adapt to almost anything. Charm comes easily to them.",
    strengths: ["Quick thinking and problem-solving", "Thrifty and good with resources", "Sociable and persuasive"],
    challenges: ["Worry about security", "Can be opportunistic", "Restless when idle"],
    tips: ["Share a resource or tip with a friend today", "Turn one worry into a concrete plan", "Rest without guilt for one evening"],
  },
  Ox: {
    keywords: ["Steady", "Strong", "Honest"],
    overview: "The Ox is the patient worker of the zodiac, linked with farming, effort and quiet strength.",
    traits: "Ox people are dependable and methodical. They keep promises, value tradition and prefer actions to speeches. Few things shake them once they have decided.",
    strengths: ["Endurance and hard work", "Trustworthy and fair", "Calm under pressure"],
    challenges: ["Stubborn about methods", "Slow to warm up to new ideas", "Can bottle up feelings"],
    tips: ["Try a new way to do a familiar task", "Say how you feel before it builds up", "Take a real break from work this week"],
  },
  Tiger: {
    keywords: ["Brave", "Bold", "Magnetic"],
    overview: "The Tiger is the zodiac's courageous protector, linked with power, passion and daring moves.",
    traits: "Tiger people are confident, competitive and full of energy. They fight for causes, love a challenge and inspire others. Life with them is rarely boring.",
    strengths: ["Courage in hard moments", "Natural leadership", "Generous and passionate"],
    challenges: ["Rash decisions", "Clashes with authority", "Restless when held back"],
    tips: ["Sleep on one big decision before acting", "Use your energy to protect someone", "Channel restlessness into exercise"],
  },
  Rabbit: {
    keywords: ["Gentle", "Elegant", "Careful"],
    overview: "The Rabbit, also called the Hare or Cat in some traditions, stands for grace, peace and good fortune.",
    traits: "Rabbit people are kind, tactful and refined. They like calm homes, good manners and beautiful things. They read danger early and prefer to avoid conflict.",
    strengths: ["Diplomacy and tact", "Good taste and creativity", "Careful, sensible choices"],
    challenges: ["Avoids hard conversations", "Can be overly cautious", "Sensitive to criticism"],
    tips: ["Have one honest conversation you have been avoiding", "Take a small, sensible risk", "Make your space a little more beautiful"],
  },
  Dragon: {
    keywords: ["Powerful", "Lucky", "Visionary"],
    overview: "The Dragon is the only mythical animal in the cycle, a symbol of power, good fortune and imperial strength.",
    traits: "Dragon people are ambitious, confident and full of vision. They think big, attract attention and expect a lot from themselves and others. Their enthusiasm can move mountains.",
    strengths: ["Big-picture vision", "Charisma and drive", "Generous with energy and ideas"],
    challenges: ["Impatience with details", "Pride and high expectations", "Can dominate a room"],
    tips: ["Break one big vision into three small steps", "Ask others for their ideas first", "Let someone else lead a small task"],
  },
  Snake: {
    keywords: ["Wise", "Intuitive", "Composed"],
    overview: "The Snake is linked with wisdom, mystery and quiet transformation.",
    traits: "Snake people think deeply and speak carefully. They trust their instincts, enjoy elegance and keep their plans private. They often see what others miss.",
    strengths: ["Strong intuition", "Calm, strategic thinking", "Refined taste"],
    challenges: ["Secretive or guarded", "Can hold grudges", "Suspicious of motives"],
    tips: ["Share one plan with someone you trust", "Act on a hunch in a small way", "Let a past hurt go"],
  },
  Horse: {
    keywords: ["Free", "Energetic", "Warm"],
    overview: "The Horse stands for freedom, movement and spirit. 2026, from Lunar New Year on 17 February, is a Fire Horse year.",
    traits: "Horse people are lively, outgoing and independent. They love travel, crowds and new projects. They work hard when free to choose how.",
    strengths: ["Energy and enthusiasm", "Sociable and warm", "Quick to act"],
    challenges: ["Impatience", "Restless with routine", "Can lose interest fast"],
    tips: ["Finish one thing before galloping to the next", "Plan a short trip or a long walk", "Give a slow friend some patience"],
  },
  Goat: {
    keywords: ["Kind", "Artistic", "Calm"],
    overview: "The Goat, also called the Sheep or Ram, is linked with gentleness, creativity and peace.",
    traits: "Goat people are caring, artistic and easy-going. They like harmony, beauty and close friends. They do their best work in a supportive setting.",
    strengths: ["Compassion and kindness", "Artistic talent", "Peaceful presence"],
    challenges: ["Worries and doubts", "Can depend on others' approval", "Avoids decisions"],
    tips: ["Make something with your hands", "Decide one small thing without asking anyone", "Spend time with people who lift you up"],
  },
  Monkey: {
    keywords: ["Witty", "Inventive", "Playful"],
    overview: "The Monkey is the zodiac's clever trickster, full of humour and ideas.",
    traits: "Monkey people are curious, funny and quick to learn. They love puzzles, games and solving problems in new ways. They get bored easily and need fresh challenges.",
    strengths: ["Inventive problem-solving", "Humour and charm", "Learns fast"],
    challenges: ["Can be mischievous", "Loses focus when bored", "Clever shortcuts that backfire"],
    tips: ["Pick a puzzle worth your brain power", "Use your wit to cheer someone up", "Do one task the long, proper way"],
  },
  Rooster: {
    keywords: ["Confident", "Precise", "Honest"],
    overview: "The Rooster announces the dawn. It stands for punctuality, pride and hard work.",
    traits: "Rooster people are observant, organised and outspoken. They like to look good, do things properly and tell the truth. They notice every detail.",
    strengths: ["Organisation and planning", "Honesty and courage", "Hard-working and punctual"],
    challenges: ["Blunt or critical", "Perfectionism", "Can show off"],
    tips: ["Give one compliment for every critique", "Let a small imperfection stand", "Wake early and plan your day"],
  },
  Dog: {
    keywords: ["Loyal", "Fair", "Protective"],
    overview: "The Dog is the zodiac's faithful guardian, linked with loyalty and justice.",
    traits: "Dog people are honest, kind and dependable. They stand up for what is right and protect the people they love. Trust matters more to them than status.",
    strengths: ["Loyalty and honesty", "Strong sense of justice", "Supportive friend"],
    challenges: ["Worry and pessimism", "Can be stubborn about right and wrong", "Slow to trust"],
    tips: ["Note three things that went well today", "Offer trust in a small way", "Stand up for a cause you believe in"],
  },
  Pig: {
    keywords: ["Generous", "Sincere", "Easy-going"],
    overview: "The Pig closes the cycle. It stands for abundance, good nature and enjoyment of life.",
    traits: "Pig people are warm, generous and honest. They enjoy good food, good company and comfort. They give freely and expect the best of others.",
    strengths: ["Generosity and warmth", "Sincerity", "Enjoys life fully"],
    challenges: ["Too trusting", "Can overindulge", "Avoids confrontation"],
    tips: ["Share a meal with friends", "Set one healthy limit and keep it", "Check the details before you trust a deal"],
  },
};

export const ELEMENT_INFO = {
  Wood: { color: "Green", note: "Wood grows. It adds generosity, growth and a wish to help others flourish.", flavor: "more cooperative and growth-minded" },
  Fire: { color: "Red", note: "Fire spreads. It adds passion, boldness and a bright, dynamic edge.", flavor: "more passionate and bold" },
  Earth: { color: "Yellow", note: "Earth holds. It adds stability, patience and practical sense.", flavor: "more grounded and practical" },
  Metal: { color: "White", note: "Metal cuts. It adds determination, focus and strong principles.", flavor: "more determined and principled" },
  Water: { color: "Black", note: "Water flows. It adds intuition, flexibility and calm wisdom.", flavor: "more intuitive and adaptable" },
};

/** The reading for an animal in a given element, e.g. Fire Horse. */
export function elementVariant(animal, element) {
  const a = R[animal]; const e = ELEMENT_INFO[element];
  return {
    title: `${element} ${animal}`,
    years: animalYears(animal, element),
    text: `The ${element} ${animal} keeps the ${a.keywords.join(", ").toLowerCase()} nature of the ${animal}, but ${e.flavor}. ${e.note} For a ${animal}, that means ${a.strengths[0].toLowerCase()} with a ${element.toLowerCase()} quality, while ${a.challenges[0].toLowerCase()} may need extra care.`,
  };
}

export const LUNAR_NOTE = "Your Chinese zodiac year changes at Lunar New Year, not on 1 January. Birthdates before that year's verified Lunar New Year date belong to the preceding zodiac year.";

export const ANIMAL_GUIDES = ANIMALS.map((name, index) => ({
  name, index, slug: animalSlug(name), ...R[name],
  trine: trineOf(name), secretFriend: friendOf(name), clash: clashOf(name),
  years: animalYears(name),
}));
export const getAnimalGuide = (slug) => ANIMAL_GUIDES.find((a) => a.slug === slug) || null;
export { ELEMENTS };
