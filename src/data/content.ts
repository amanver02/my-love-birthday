import type { MemoryPhoto, LoveCard, QuizChoice } from '../types';

export const HERO_DATA = {
  greeting: "Hey Tuhi…",
  subtext1: "before you ask what this is…",
  subtext2: "haan haan, Aman ne kuch kiya hai 😌",
  subtext3: "so… don't rush.",
  buttonText: "Enter my little surprise →"
};

export const LUKKA_CHUPPI_DATA = {
  heading: "Tuhi, ek chhota sa game khelegi?",
  subtext: "Dekhte hain tum mujhe kitna easily dhoondh paati ho 😏",
  buttonText: "Aman ko dhoondo 🙈",
  teasingMessages: [
    "Itna easy nahi hai 😌",
    "Thoda aur try karo!",
    "Main yahin hoon 👀",
    "Tuhiii 😂",
    "Haha, lagta hai pakad nahi pao gi!",
    "Kar diya miss! Try again 😏"
  ],
  foundMessage: "Found me ❤️",
  afterFoundText: "Good. Ab bhaagna mana hai."
};

export const WELCOME_DATA = {
  heading: "Happy Birthday, Tuhi ❤️",
  subtitle: "Meri jaan, meri rani…",
  paragraph: "Main tumhare liye sirf 'Happy Birthday' likh ke ruk sakta tha… but honestly, tum mere liye itni ordinary ho hi nahi. So I made you a tiny little world."
};

export const MEMORY_PHOTOS: MemoryPhoto[] = [
  {
    id: 'photo1',
    url: '/images/photo1.jpg',
    title: 'The Ride Together',
    caption: 'Ye wali smile… dangerous hai.',
    date: 'A Quiet Memory',
    location: 'In Our Own Bubble'
  },
  {
    id: 'photo2',
    url: '/images/photo2.jpg',
    title: 'Under the Trees',
    caption: 'Yahan tum bahut innocent ban rahi thi 😂',
    date: 'Golden Hour',
    location: 'Nature & Us'
  },
  {
    id: 'photo3',
    url: '/images/photo3.jpg',
    title: 'Simple Afternoon',
    caption: 'Ek normal photo… mere liye normal nahi.',
    date: 'Unscripted',
    location: 'Favorite Cafe'
  },
  {
    id: 'photo4',
    url: '/images/photo4.jpg',
    title: 'Just Us Smiling',
    caption: 'Still one of my favourites.',
    date: 'Pure Joy',
    location: 'Sunny Days'
  },
  {
    id: 'photo5',
    url: '/images/photo5.jpg',
    title: 'Forever Side by Side',
    caption: 'Not perfect. Not scripted. Just us.',
    date: 'Always',
    location: 'Our Favorite Spot'
  }
];

export const LOVE_CARDS: LoveCard[] = [
  { id: 1, text: "Your smile.", subtext: "The kind that instantly fixes a terrible day." },
  { id: 2, text: "Your voice.", subtext: "Even when you're just talking about random things." },
  { id: 3, text: "The way you randomly become cute.", subtext: "Without even realizing you're doing it." },
  { id: 4, text: "How you can make a completely normal day feel different.", subtext: "Just by being there." },
  { id: 5, text: "Your little reactions.", subtext: "The drama, the pout, the laughter." },
  { id: 6, text: "The way you are simply… you.", subtext: "Authentic, caring, and unapologetic." },
  { id: 7, text: "And honestly, I could keep going.", subtext: "Because listing it all would take a lifetime." }
];

export const QUIZ_QUESTIONS: QuizChoice[] = [
  { id: 'tuhi', text: 'Tuhi', response: 'Correct answer. You may continue. ✅', isCorrect: true },
  { id: 'aman', text: 'Aman', response: 'Wrong. Nice try though 😂', isCorrect: false },
  { id: 'obviously_tuhi', text: 'Obviously Tuhi', response: '100% facts. Zero debate. ✅', isCorrect: true },
  { id: 'unfair', text: 'This question is unfair', response: 'Finally, some intelligence. 🧠', isCorrect: true }
];

export const SECRET_BUTTON_DATA = {
  initialText: "Don't click this.",
  steps: [
    "Seriously?",
    "Tuhi…",
    "You were literally told not to.",
    "Anyway… since you're already here…"
  ],
  revealedText: "I love seeing you happy ❤️"
};

export const LETTER_DATA = {
  heading: "One thing I really want you to know…",
  lines: [
    "Tuhi, main shayad har baar words me perfectly express nahi kar pata…",
    "but today, I wanted to build something that shows you how much you truly mean to me.",
    "Tumhare saath guzara har chhota moment special ban jata hai. Tum jab hasti ho, to mera mood ek second me better ho jata hai.",
    "I love everything about you — your funny side, your serious side, the way you care, and even when you get slightly annoyed at me 😌",
    "This birthday is not just about adding another year to your life; it's about celebrating your presence in mine.",
    "Thank you for being my constant, my quiet comfort, and my favourite part of every day.",
    "I promise to keep making you smile, listening to your endless stories, and choosing you over and over again."
  ],
  signOff: "Always yours,",
  author: "Aman ❤️"
};

export const MEMORY_CAPSULE_DATA = {
  promptText: "Open only when you're ready…",
  message: "If one day you forget how special you are, come back here. I'll remind you.",
  author: "— Aman"
};

export const US_MOMENT_DATA = {
  heading: "Us.",
  subheading: "Not perfect. Not scripted. Just us.",
  photoUrl: "/images/us.jpg"
};

export const CANDLE_DATA = {
  title: "Today is yours.",
  subtitle: "So make a wish, Tuhi.",
  wishMadeTitle: "Wish made? ❤️",
  wishMadeSubtext: "Good. Ab ek aur wish meri taraf se…"
};

export const FINALE_DATA = {
  lines: [
    "Happy Birthday, Tuhi ❤️",
    "Meri jaan.",
    "Meri rani.",
    "My favourite person.",
    "Thank you for being you."
  ],
  signOff: "Love,",
  author: "Aman.",
  ps: "P.S. — ab smile kar di na? 😌❤️"
};
