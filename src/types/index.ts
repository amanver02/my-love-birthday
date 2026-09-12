export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
  location?: string;
}

export interface LoveCard {
  id: number;
  text: string;
  subtext?: string;
  icon?: string;
}

export type SectionId = 
  | 'opening'
  | 'welcome'
  | 'lukka-chuppi'
  | 'memories'
  | 'things-i-love'
  | 'investigation'
  | 'secret'
  | 'letter'
  | 'capsule'
  | 'us'
  | 'wish'
  | 'ending';

export interface QuizChoice {
  id: string;
  text: string;
  response: string;
  isCorrect?: boolean;
}
