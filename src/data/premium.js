// Premium readings: moon sign, rising sign and the expanded Chinese zodiac. Entertainment and reflection only.
export const MOON_READINGS = {
  aries: "Your feelings arrive fast and hot. You need room to act on them, and you settle quickly once you have.",
  taurus: "You feel safest with routine, touch and good food. Your moods are slow to change and slow to settle.",
  gemini: "You sort feelings out by talking or writing. A curious mind keeps your moods light and changeable.",
  cancer: "You feel everything deeply and remember it. Home, family and familiar rituals refill you.",
  leo: "You need to feel warm, appreciated and seen. You love generously, and you hurt when praise dries up.",
  virgo: "You calm down by being useful and tidying up. You can be hard on yourself when things feel messy.",
  libra: "You feel best when things are peaceful and fair. Conflict drains you, so you may smooth over what needs saying.",
  scorpio: "Your feelings run deep and stay private. You trust slowly, and when you do, you commit fully.",
  sagittarius: "You need freedom and fresh air to feel good. Humor and honesty are how you handle hard feelings.",
  capricorn: "You keep feelings under control and show care through effort. A clear plan settles you.",
  aquarius: "You step back to understand a feeling before you share it. You value friendship and space in equal measure.",
  pisces: "You soak up the moods around you. Quiet time, music and sleep help you tell yours from everyone else's.",
};

export const RISING_READINGS = {
  aries: "Direct and energetic. People see someone who is ready to go.",
  taurus: "Calm and grounded. People see someone steady and easy to be around.",
  gemini: "Quick and curious. People see someone chatty with a question ready.",
  cancer: "Gentle and watchful. People see someone caring who takes a moment to open up.",
  leo: "Warm and confident. People notice you when you walk in.",
  virgo: "Neat and thoughtful. People see someone capable and observant.",
  libra: "Charming and polite. People see someone friendly with an eye for style.",
  scorpio: "Intense and composed. People sense depth and a little mystery.",
  sagittarius: "Open and upbeat. People see a friendly explorer with a big laugh.",
  capricorn: "Serious and poised. People see someone reliable and mature.",
  aquarius: "Cool and original. People see a friendly individual who does things their own way.",
  pisces: "Soft and dreamy. People see someone kind who seems a little far away.",
};

export const ANIMAL_DEEP = {
  Rat: { love: "Attentive and playful, but guards its heart until trust is proven.", work: "Spots chances early and negotiates well. Suits roles that reward quick thinking.", stress: "Hoards, schemes and overthinks. Sleep and a clear budget help." },
  Ox: { love: "Loyal and slow to commit. Shows love through reliable acts.", work: "Thrives on long projects and clear standards.", stress: "Digs in and goes quiet. Name the issue early." },
  Tiger: { love: "Passionate and protective. Needs a partner who can match its pace.", work: "Leads well in a crisis and gets restless in routine.", stress: "Gets rash and sharp. Burn off energy before you reply." },
  Rabbit: { love: "Gentle and devoted. Wants a calm, beautiful home life.", work: "Excels at diplomacy, design and careful detail.", stress: "Withdraws and avoids. Say the hard thing kindly." },
  Dragon: { love: "Bold and generous. Likes a partner who is not afraid of its fire.", work: "Thinks big and rallies people. Needs help with details.", stress: "Takes over and gets proud. Ask before you act." },
  Snake: { love: "Deep and private. Slow to open up, devoted once it does.", work: "Strategic and research minded. Strong in focused roles.", stress: "Turns secretive and cold. Share one worry." },
  Horse: { love: "Warm and free-spirited. Needs room to roam and honest talk.", work: "Energetic and social. Best with variety and autonomy.", stress: "Bolts from problems. Finish one thing first." },
  Goat: { love: "Tender and romantic. Thrives with reassurance.", work: "Creative and cooperative. Best in supportive teams.", stress: "Worries and clings. Make one small decision alone." },
  Monkey: { love: "Funny and flirtatious. Needs a partner who keeps up mentally.", work: "Learns fast and solves problems. Bores easily.", stress: "Gets sly and scattered. Slow down and tell the plain truth." },
  Rooster: { love: "Devoted and proud. Shows care by fixing and planning.", work: "Organized and precise. Great at presenting and quality checks.", stress: "Turns critical. Give a compliment before a correction." },
  Dog: { love: "Faithful and honest. Wants trust above all.", work: "Principled and team minded. Strong in service and fairness.", stress: "Anxious and sharp-tongued. Name three things going well." },
  Pig: { love: "Affectionate and generous. Enjoys comfort and shared meals.", work: "Hard-working and fair. A warm presence in any team.", stress: "Overindulges and avoids conflict. Set one limit." },
};

export const ELEMENT_FEEDS = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
export const ELEMENT_HOLDS = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };

export const PREMIUM_FEATURES = [
  { k: "Moon sign", v: "Your inner weather: what you need to feel safe." },
  { k: "Rising sign", v: "The first impression you give. Needs birth time and place." },
  { k: "Expanded Chinese zodiac", v: "Love, work and stress traits, plus your element's place in the cycle." },
  { k: "Nine-factor compatibility", v: "Sun, Moon and Rising, animal, element, Life Path, Expression and two directional links." },
  { k: "Cosmic Matches", v: "Members ranked by your nine-factor score, filtered by area." },
];
