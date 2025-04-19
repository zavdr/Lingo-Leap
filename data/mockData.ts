import { Lesson, Flashcard, Achievement, DailyChallenge, Language } from '@/types';

export const supportedLanguages: Language[] = [
  { id: 'es', name: 'Spanish', flag: '🇪🇸', code: 'es-ES' },
  { id: 'fr', name: 'French', flag: '🇫🇷', code: 'fr-FR', comingSoon: true },
  { id: 'de', name: 'German', flag: '🇩🇪', code: 'de-DE', comingSoon: true },
  { id: 'it', name: 'Italian', flag: '🇮🇹', code: 'it-IT', comingSoon: true },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵', code: 'ja-JP', comingSoon: true },
  { id: 'ko', name: 'Korean', flag: '🇰🇷', code: 'ko-KR', comingSoon: true },
  { id: 'zh', name: 'Chinese', flag: '🇨🇳', code: 'zh-CN', comingSoon: true },
  { id: 'ru', name: 'Russian', flag: '🇷🇺', code: 'ru-RU', comingSoon: true },
];

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Basic Greetings',
    description: 'Learn how to greet people and introduce yourself.',
    level: 'beginner',
    language: 'es',
    xpReward: 10,
    duration: 5,
    exercises: [
      {
        id: 'ex-1',
        type: 'multipleChoice',
        question: 'How do you say "Hello" in Spanish?',
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
        correctAnswer: 'Hola'
      },
      {
        id: 'ex-2',
        type: 'translation',
        question: 'Translate "My name is John" to Spanish',
        correctAnswer: 'Me llamo John'
      },
      {
        id: 'ex-3',
        type: 'listening',
        question: 'Listen and select what you hear',
        options: ['Buenos días', 'Buenas tardes', 'Buenas noches', 'Buen provecho'],
        correctAnswer: 'Buenos días',
        audioUrl: 'path/to/audio.mp3'
      }
    ],
    completed: false,
    locked: false
  },
  {
    id: 'lesson-2',
    title: 'Numbers 1-10',
    description: 'Learn to count from one to ten.',
    level: 'beginner',
    language: 'es',
    xpReward: 15,
    duration: 8,
    exercises: [
      {
        id: 'ex-4',
        type: 'multipleChoice',
        question: 'What is "three" in Spanish?',
        options: ['Uno', 'Dos', 'Tres', 'Cuatro'],
        correctAnswer: 'Tres'
      },
      {
        id: 'ex-5',
        type: 'speaking',
        question: 'Say "seven" in Spanish',
        correctAnswer: 'siete',
      }
    ],
    completed: false,
    locked: true
  },
  {
    id: 'lesson-3',
    title: 'Common Phrases',
    description: 'Learn everyday useful expressions.',
    level: 'beginner',
    language: 'es',
    xpReward: 20,
    duration: 10,
    exercises: [],
    completed: false,
    locked: true
  }
];

export const mockFlashcards: Flashcard[] = [
  {
    id: 'card-1',
    word: 'Hola',
    translation: 'Hello',
    examples: [
      { original: '¡Hola! ¿Cómo estás?', translated: 'Hello! How are you?' },
      { original: 'Hola a todos', translated: 'Hello everyone' }
    ]
  },
  {
    id: 'card-2',
    word: 'Gracias',
    translation: 'Thank you',
    examples: [
      { original: 'Muchas gracias', translated: 'Thank you very much' },
      { original: 'Gracias por tu ayuda', translated: 'Thank you for your help' }
    ]
  },
  {
    id: 'card-3',
    word: 'Por favor',
    translation: 'Please',
    examples: [
      { original: 'Por favor, ayúdame', translated: 'Please help me' },
      { original: '¿Me puede traer agua, por favor?', translated: 'Can you bring me water, please?' }
    ]
  }
];

export const mockAchievements: Achievement[] = [
  {
    id: 'achievement-1',
    title: 'First Steps',
    description: 'Complete your first lesson',
    imageUrl: 'https://via.placeholder.com/100',
    criteria: 'Complete 1 lesson',
    earned: false
  },
  {
    id: 'achievement-2',
    title: 'On Fire',
    description: 'Maintain a 3-day streak',
    imageUrl: 'https://via.placeholder.com/100',
    criteria: 'Login for 3 consecutive days',
    earned: false
  },
  {
    id: 'achievement-3',
    title: 'Vocabulary Master',
    description: 'Learn 50 words',
    imageUrl: 'https://via.placeholder.com/100',
    criteria: 'Review 50 flashcards',
    earned: false
  }
];

export const mockDailyChallenges: DailyChallenge[] = [
  {
    id: 'challenge-1',
    title: 'Basic Greetings Master',
    description: 'Practice "Buenos días", "Buenas tardes", and "Buenas noches" in 3 different conversations',
    englishDescription: 'Master the art of Spanish greetings throughout the day',
    xpReward: 20,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'speaking',
      requiredCount: 3,
      currentCount: 0
    }
  },
  {
    id: 'challenge-2',
    title: 'Numbers Champion',
    description: 'Cuenta del 1 al 20 sin errores',
    englishDescription: 'Count from 1 to 20 without mistakes',
    xpReward: 15,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'speaking',
      requiredCount: 1,
      currentCount: 0
    }
  },
  {
    id: 'challenge-3',
    title: 'Family Vocabulary',
    description: 'Aprende 5 palabras nuevas sobre la familia',
    englishDescription: 'Learn 5 new family-related words',
    xpReward: 25,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'flashcards',
      requiredCount: 5,
      currentCount: 0
    }
  },
  {
    id: 'challenge-4',
    title: 'Perfect Pronunciation',
    description: 'Practica la pronunciación de "r" en 10 palabras diferentes',
    englishDescription: 'Practice rolling "r" sounds in 10 different words',
    xpReward: 30,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'speaking',
      requiredCount: 10,
      currentCount: 0
    }
  },
  {
    id: 'challenge-5',
    title: 'Weather Expert',
    description: 'Describe el clima usando 5 expresiones diferentes',
    englishDescription: 'Describe the weather using 5 different expressions',
    xpReward: 20,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'speaking',
      requiredCount: 5,
      currentCount: 0
    }
  },
  {
    id: 'challenge-6',
    title: 'Restaurant Ready',
    description: 'Aprende a pedir 3 platos diferentes en un restaurante',
    englishDescription: 'Learn to order 3 different dishes at a restaurant',
    xpReward: 25,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'speaking',
      requiredCount: 3,
      currentCount: 0
    }
  },
  {
    id: 'challenge-7',
    title: 'Time Master',
    description: 'Practica decir la hora en 5 diferentes momentos del día',
    englishDescription: 'Practice telling time at 5 different times of the day',
    xpReward: 20,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'speaking',
      requiredCount: 5,
      currentCount: 0
    }
  },
  {
    id: 'challenge-8',
    title: 'Direction Navigator',
    description: 'Aprende a dar direcciones usando 8 preposiciones diferentes',
    englishDescription: 'Learn to give directions using 8 different prepositions',
    xpReward: 35,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'flashcards',
      requiredCount: 8,
      currentCount: 0
    }
  },
  {
    id: 'challenge-9',
    title: 'Emotion Explorer',
    description: 'Expresa 6 emociones diferentes en español',
    englishDescription: 'Express 6 different emotions in Spanish',
    xpReward: 25,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'speaking',
      requiredCount: 6,
      currentCount: 0
    }
  },
  {
    id: 'challenge-10',
    title: 'Daily Routine Pro',
    description: 'Describe tu rutina diaria usando 10 verbos reflexivos',
    englishDescription: 'Describe your daily routine using 10 reflexive verbs',
    xpReward: 40,
    completed: false,
    date: new Date(),
    criteria: {
      type: 'speaking',
      requiredCount: 10,
      currentCount: 0
    }
  }
];