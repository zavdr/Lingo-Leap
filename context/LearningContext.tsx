import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { Lesson, Flashcard, Achievement, DailyChallenge } from '@/types';
import { useAuth } from './AuthContext';
import { mockLessons, mockFlashcards, mockAchievements, mockDailyChallenges } from '@/data/mockData';

type LearningContextType = {
  lessons: Lesson[];
  flashcards: Flashcard[];
  achievements: Achievement[];
  dailyChallenges: DailyChallenge[];
  isLoading: boolean;
  completeLesson: (lessonId: string) => void;
  reviewFlashcard: (flashcardId: string, performance: 'easy' | 'medium' | 'hard') => void;
  earnAchievement: (achievementId: string) => void;
  completeDailyChallenge: (challengeId: string) => void;
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

// Helper functions for cross-platform storage
const getStorageItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

const setStorageItem = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, you would fetch this data from an API
      // For demo purposes, we're using mock data
      setLessons(mockLessons);
      setFlashcards(mockFlashcards);
      setAchievements(mockAchievements);
      setDailyChallenges(mockDailyChallenges);
      
      // Try to load any persisted data
      try {
        const lessonData = await getStorageItem('lessons');
        if (lessonData) setLessons(JSON.parse(lessonData));
        
        const flashcardData = await getStorageItem('flashcards');
        if (flashcardData) setFlashcards(JSON.parse(flashcardData));
        
        const achievementData = await getStorageItem('achievements');
        if (achievementData) setAchievements(JSON.parse(achievementData));
        
        const challengeData = await getStorageItem('dailyChallenges');
        if (challengeData) setDailyChallenges(JSON.parse(challengeData));
      } catch (error) {
        console.error('Failed to load persisted data', error);
        // Fallback to mock data if local storage fails
      }
    } catch (error) {
      console.error('Failed to load learning data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const completeLesson = (lessonId: string) => {
    const updatedLessons = lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    );
    
    // Unlock the next lesson if applicable
    const completedIndex = updatedLessons.findIndex(l => l.id === lessonId);
    if (completedIndex >= 0 && completedIndex < updatedLessons.length - 1) {
      updatedLessons[completedIndex + 1].locked = false;
    }
    
    setLessons(updatedLessons);
    setStorageItem('lessons', JSON.stringify(updatedLessons));
  };

  const reviewFlashcard = (flashcardId: string, performance: 'easy' | 'medium' | 'hard') => {
    // Implement spaced repetition algorithm
    const updatedFlashcards = flashcards.map(card => {
      if (card.id === flashcardId) {
        const now = new Date();
        let interval = card.interval || 1;
        let easeFactor = card.easeFactor || 2.5;
        
        if (performance === 'easy') {
          interval = interval * easeFactor;
          easeFactor = Math.min(easeFactor + 0.15, 3.0);
        } else if (performance === 'medium') {
          interval = interval * easeFactor;
        } else if (performance === 'hard') {
          interval = Math.max(1, interval * 0.5);
          easeFactor = Math.max(1.3, easeFactor - 0.2);
        }
        
        return {
          ...card,
          lastReviewed: now,
          interval,
          easeFactor
        };
      }
      return card;
    });
    
    setFlashcards(updatedFlashcards);
    setStorageItem('flashcards', JSON.stringify(updatedFlashcards));
  };

  const earnAchievement = (achievementId: string) => {
    const updatedAchievements = achievements.map(achievement => 
      achievement.id === achievementId
        ? { ...achievement, earned: true, earnedDate: new Date() }
        : achievement
    );
    
    setAchievements(updatedAchievements);
    setStorageItem('achievements', JSON.stringify(updatedAchievements));
  };

  const completeDailyChallenge = (challengeId: string) => {
    const updatedChallenges = dailyChallenges.map(challenge => 
      challenge.id === challengeId ? { ...challenge, completed: true } : challenge
    );
    
    setDailyChallenges(updatedChallenges);
    setStorageItem('dailyChallenges', JSON.stringify(updatedChallenges));
  };

  return (
    <LearningContext.Provider
      value={{
        lessons,
        flashcards,
        achievements,
        dailyChallenges,
        isLoading,
        completeLesson,
        reviewFlashcard,
        earnAchievement,
        completeDailyChallenge
      }}
    >
      {children}
    </LearningContext.Provider>
  );
}

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (context === undefined) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};