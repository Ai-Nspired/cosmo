// Day's Vibe wording, keyed by the Personal Day base number (1 to 9).
// [mood when signals agree, mood when the sign element is in friction]
export const DAY_MOODS = {
  1: ["Bold", "Restless"],
  2: ["Gentle", "Sensitive"],
  3: ["Sparkling", "Scattered"],
  4: ["Steady", "Stubborn"],
  5: ["Adventurous", "Jumpy"],
  6: ["Warm", "Overcommitted"],
  7: ["Reflective", "Withdrawn"],
  8: ["Driven", "Pressured"],
  9: ["Generous", "Wistful"],
};

export const DAY_COLORS = {
  1: { name: "Signal red", hex: "#F87171" },
  2: { name: "Moon silver", hex: "#CBD5E1" },
  3: { name: "Sunflower yellow", hex: "#FACC15" },
  4: { name: "Moss green", hex: "#65A30D" },
  5: { name: "Electric turquoise", hex: "#2DD4BF" },
  6: { name: "Rose pink", hex: "#F9A8D4" },
  7: { name: "Deep indigo", hex: "#818CF8" },
  8: { name: "Burnished gold", hex: "#D4A64A" },
  9: { name: "Ultraviolet", hex: "#A78BFA" },
};

export const DAY_HEADLINES = {
  1: ["A day for first moves", "Start the thing you keep postponing", "Your name on the front of it"],
  2: ["Small kindnesses land big", "Listen twice, speak once", "A day for teaming up"],
  3: ["Say it out loud", "Play is productive today", "Your words travel further"],
  4: ["Build one solid brick", "Order beats inspiration today", "Fix the thing that wobbles"],
  5: ["Change the route", "Say yes to the unplanned", "Curiosity pays today"],
  6: ["Home and heart first", "Look after someone, including you", "Make a space nicer"],
  7: ["Go quiet and notice", "Questions over answers", "A day for deep focus"],
  8: ["Make the bold ask", "Money and plans line up", "Lead with confidence"],
  9: ["Let something go", "Finish, then rest", "Give without keeping score"],
};

export const DAY_TIPS = {
  1: ["Write down one goal for today and take the first step before noon.", "Introduce yourself to someone new or pitch the idea you have been holding back.", "Make one decision on your own without polling everyone first."],
  2: ["Send a thank-you message to someone who helped you recently.", "Offer to pair up on a task instead of doing it alone.", "Pause before replying to anything that stings. Answer tomorrow if you can."],
  3: ["Share something you made, even if it is small or unfinished.", "Call a friend instead of texting. Laughter counts as progress today.", "Doodle, sing or write for ten minutes with no goal."],
  4: ["Clear one drawer, one inbox folder or one nagging chore.", "Plan tomorrow tonight, in three short lines.", "Pick the slow, careful option on anything important."],
  5: ["Take a different way home or try a food you have never ordered.", "Move your body somewhere new, even a ten-minute walk.", "Leave an hour of your day unplanned and see what fills it."],
  6: ["Cook or share a meal with someone you care about.", "Do one thing that makes your space feel calmer.", "Check in on someone who usually checks in on you."],
  7: ["Spend twenty minutes away from screens with a book or a walk.", "Write down a question you want answered this month.", "Say no to one plan so you have room to think."],
  8: ["Review your money for ten minutes and set one clear target.", "Ask for the raise, the deal or the favour you have been rehearsing.", "Delegate one task you have been holding too tightly."],
  9: ["Donate, recycle or give away something you no longer use.", "Close an open loop: reply, return, apologise or finish.", "End the day by noting three things you are grateful for."],
};
