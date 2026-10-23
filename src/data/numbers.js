// Numerology readings for 1 to 9 and the master numbers 11, 22 and 33.
import { NUMBER_LIST } from "../lib/engine";

const R = {
  1: { title: "The Pioneer", keywords: ["Independent", "Driven", "Original"],
    overview: "One is the number of beginnings. It stands alone, points forward and likes to lead.",
    traits: "People strong in 1 want to make their own mark. They are self-starters who prefer to find their own way rather than follow instructions.",
    strengths: ["Initiative and courage", "Clear sense of self", "Original ideas"], challenges: ["Can be bossy or impatient", "Finds it hard to ask for help", "Stubborn independence"], tips: ["Lead a small project from start to finish", "Ask for one piece of help this week", "Celebrate someone else's win"] },
  2: { title: "The Partner", keywords: ["Cooperative", "Sensitive", "Diplomatic"],
    overview: "Two is the number of pairs and balance. It joins, listens and makes peace.",
    traits: "People strong in 2 read moods well and shine in teams. They prefer harmony to competition and often work quietly behind the scenes.",
    strengths: ["Empathy and tact", "Team player", "Patient listener"], challenges: ["Overly sensitive to criticism", "Puts others first too often", "Indecision"], tips: ["Say one need out loud today", "Pair up on a task you dread", "Trust your first instinct on a small choice"] },
  3: { title: "The Communicator", keywords: ["Expressive", "Joyful", "Creative"],
    overview: "Three is the number of expression. It talks, creates and brings light to a room.",
    traits: "People strong in 3 love words, art and fun. They are social, optimistic and inspire others with their enthusiasm.",
    strengths: ["Creative expression", "Optimism and humour", "Social ease"], challenges: ["Scattered energy", "Avoids hard feelings", "Can talk more than act"], tips: ["Finish one creative piece", "Write down what you feel, not only what you think", "Share your work with one person"] },
  4: { title: "The Builder", keywords: ["Practical", "Reliable", "Organised"],
    overview: "Four is the number of foundations: four walls, four seasons, four directions.",
    traits: "People strong in 4 value order, effort and honesty. They are the ones who turn a plan into something real.",
    strengths: ["Hard work and discipline", "Dependability", "Practical problem-solving"], challenges: ["Rigid thinking", "Workaholic habits", "Resistance to change"], tips: ["Try one new method this week", "Book time off like a task", "Build something with your hands"] },
  5: { title: "The Adventurer", keywords: ["Free", "Curious", "Adaptable"],
    overview: "Five is the number of change and the five senses. It moves, explores and tries everything once.",
    traits: "People strong in 5 crave variety and freedom. They adapt fast, love travel and learn by doing.",
    strengths: ["Adaptability", "Curiosity and courage", "Lively, magnetic energy"], challenges: ["Restlessness", "Overindulgence", "Avoids commitment"], tips: ["Try something new without changing everything", "Keep one promise you made", "Move your body daily"] },
  6: { title: "The Nurturer", keywords: ["Caring", "Responsible", "Harmonious"],
    overview: "Six is the number of home, family and care.",
    traits: "People strong in 6 look after others and make spaces feel warm. They have a strong sense of duty and love beauty and harmony.",
    strengths: ["Compassion and loyalty", "Responsibility", "Eye for beauty"], challenges: ["Over-giving", "Perfectionism at home", "Can meddle"], tips: ["Let someone care for you", "Ask before you help", "Make one corner of your home lovely"] },
  7: { title: "The Seeker", keywords: ["Analytical", "Spiritual", "Private"],
    overview: "Seven is the number of inquiry. It asks why and looks beneath the surface.",
    traits: "People strong in 7 are thoughtful, studious and need time alone. They trust research and intuition in equal measure.",
    strengths: ["Deep thinking", "Intuition and insight", "Independent study"], challenges: ["Isolation", "Skepticism of others", "Overthinking"], tips: ["Spend quiet time in nature", "Share one insight with a friend", "Act before you have every answer"] },
  8: { title: "The Achiever", keywords: ["Ambitious", "Powerful", "Practical"],
    overview: "Eight is the number of power, money and results. On its side it looks like infinity: what goes out comes back.",
    traits: "People strong in 8 think big and work to make it real. They are good managers and comfortable with authority.",
    strengths: ["Leadership", "Business sense", "Resilience"], challenges: ["Workaholism", "Control issues", "Measuring worth by success"], tips: ["Set one clear money goal", "Delegate one task", "Do something generous with no return"] },
  9: { title: "The Humanitarian", keywords: ["Compassionate", "Wise", "Generous"],
    overview: "Nine is the last single digit. It holds a little of every number before it and stands for completion.",
    traits: "People strong in 9 care about the wider world. They are idealistic, artistic and willing to give.",
    strengths: ["Compassion", "Broad vision", "Generosity"], challenges: ["Trouble letting go", "Self-sacrifice", "Disappointment when ideals fall short"], tips: ["Finish or release one old project", "Volunteer an hour", "Accept help as freely as you give it"] },
  11: { title: "The Intuitive", keywords: ["Inspired", "Sensitive", "Visionary"],
    overview: "Eleven is a master number. It carries the sensitivity of 2 with an extra charge of insight and inspiration.",
    traits: "People strong in 11 sense things before they happen and can inspire others with ideas. The energy is high and can feel like nervous tension.",
    strengths: ["Intuition", "Inspiring presence", "Idealism"], challenges: ["Anxiety and nerves", "Self-doubt", "Feeling misunderstood"], tips: ["Ground yourself with routine and sleep", "Write down your hunches", "Share an idea that could help others"] },
  22: { title: "The Master Builder", keywords: ["Visionary", "Practical", "Capable"],
    overview: "Twenty-two is a master number. It joins the dreams of 11 with the practical skill of 4.",
    traits: "People strong in 22 can turn big visions into real structures. They feel a pull to build something that lasts beyond them.",
    strengths: ["Large-scale vision", "Practical execution", "Leadership"], challenges: ["Pressure to achieve", "Overwork", "Fear of wasting potential"], tips: ["Break the big plan into one brick a day", "Rest is part of building", "Find partners who share the vision"] },
  33: { title: "The Master Teacher", keywords: ["Compassionate", "Guiding", "Selfless"],
    overview: "Thirty-three is a master number. It lifts the care of 6 into a wish to teach, heal and uplift.",
    traits: "People strong in 33 give a lot of themselves. They are drawn to teaching, healing and creative service.",
    strengths: ["Deep compassion", "Guidance and teaching", "Creative care"], challenges: ["Burnout from giving", "Martyr feelings", "High standards for self"], tips: ["Fill your own cup first", "Teach one thing you know well", "Say no to one demand on your time"] },
};

export const MASTER_COPY = "This tool keeps 11, 22 and 33 before the final reduction and also shows their base numbers 2, 4 and 6.";
export const MASTER_GUIDE_COPY = "This tool keeps 11, 22 and 33 before final reduction and also presents the reduced base as a secondary layer.";
export const MASTER_RULE_NOTE = "This is the tool's own stated rule, common in Western (Pythagorean) numerology. It is not labelled as Vedic numerology, which usually reduces everything to 1 to 9.";

export const NUMBER_GUIDES = NUMBER_LIST.map((n) => ({
  value: n, master: n > 9, base: n > 9 ? String(n).split("").reduce((a, c) => a + +c, 0) : n, ...R[n],
}));
export const getNumberGuide = (n) => NUMBER_GUIDES.find((g) => String(g.value) === String(n)) || null;
