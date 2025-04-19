export type Language = {
  id: string;
  name: string;
  flag: string;
  code: string;
  comingSoon?: boolean;
};

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  selectedLanguage?: Language;
  proficiencyLevel?: ProficiencyLevel;
  streak: number;
  xp: number;
  lastActive?: Date;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  level: ProficiencyLevel;
  language: string;
  xpReward: number;
  duration: number; // in minutes
  exercises: Exercise[];
  completed: boolean;
  locked: boolean;
};

export type Exercise = {
  id: string;
  type: 'multipleChoice' | 'translation' | 'listening' | 'speaking';
  question: string;
  options?: string[];
  correctAnswer: string;
  audioUrl?: string;
  imageUrl?: string;
};

export type Flashcard = {
  id: string;
  word: string;
  translation: string;
  audioUrl?: string;
  imageUrl?: string;
  examples: { original: string; translated: string }[];
  lastReviewed?: Date;
  interval?: number; // for spaced repetition
  easeFactor?: number; // for spaced repetition
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  criteria: string;
  earned: boolean;
  earnedDate?: Date;
};

export type ChallengeCriteria = {
  type: 'speaking' | 'flashcards' | 'lesson';
  requiredCount: number;
  currentCount: number;
};

export type DailyChallenge = {
  id: string;
  title: string;
  description: string;
  englishDescription: string;
  xpReward: number;
  completed: boolean;
  date: Date;
  criteria?: ChallengeCriteria;
};

export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  disabled: string;
  border: string;
};