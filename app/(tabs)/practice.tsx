import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useLearning } from '@/context/LearningContext';
import { COLORS, SPACING } from '@/constants/theme';
import Typography from '@/components/ui/Typography';
import FlashcardComponent from '@/components/learning/Flashcard';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Flashcard } from '@/types';
import { Play, MessageCircle, Volume2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function PracticeScreen() {
  const { flashcards, reviewFlashcard } = useLearning();
  const [mode, setMode] = useState<'selection' | 'flashcards' | 'speaking'>('selection');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFlashcardPress = () => {
    setMode('flashcards');
    setCurrentIndex(0); // Reset index when entering flashcard mode
  };

  const handleSpeakingPress = () => {
    setMode('speaking');
  };

  const handleBackToSelection = () => {
    setMode('selection');
    setCurrentIndex(0);
  };

  const handleRateCard = (performance: 'easy' | 'medium' | 'hard') => {
    if (flashcards.length > 0 && currentIndex < flashcards.length) {
      reviewFlashcard(flashcards[currentIndex].id, performance);
      
      if (currentIndex === flashcards.length - 1) {
        // End of deck
        handleBackToSelection();
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const renderFlashcardMode = () => (
    <View style={styles.practiceContainer}>
      <Typography variant="h2" style={styles.practiceTitle}>Flashcards</Typography>
      
      <Typography variant="body1" color={COLORS.textSecondary} style={styles.practiceSubtitle}>
        {flashcards.length > 0 ? 
          `Card ${currentIndex + 1} of ${flashcards.length}` : 
          "No flashcards available"}
      </Typography>
      
      {flashcards.length > 0 && currentIndex < flashcards.length ? (
        <FlashcardComponent 
          card={flashcards[currentIndex]} 
          onRate={handleRateCard} 
        />
      ) : (
        <Card style={styles.speakingCard}>
          <Typography variant="body1" align="center">
            No flashcards available. Please add some flashcards to practice.
          </Typography>
        </Card>
      )}
      
      <Button 
        title="Back to Practice Menu" 
        onPress={handleBackToSelection} 
        variant="outline"
        style={styles.backButton}
      />
    </View>
  );

  const renderSpeakingMode = () => (
    <View style={styles.practiceContainer}>
      <Typography variant="h2" style={styles.practiceTitle}>Speaking Practice</Typography>
      
      <Card style={styles.speakingCard}>
        <Typography variant="subtitle1" style={styles.speakPrompt}>
          Listen and repeat the phrase:
        </Typography>
        
        <Typography variant="h3" align="center" style={styles.phraseText}>
          Buenos días
        </Typography>
        
        <View style={styles.audioControls}>
          <TouchableOpacity style={styles.audioButton}>
            <Volume2 color={COLORS.primary} size={24} />
            <Typography variant="body2" color={COLORS.primary}>Play Audio</Typography>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.recordButton}>
          <View style={styles.recordIcon} />
          <Typography variant="subtitle2" align="center" style={styles.recordText}>
            Tap and hold to record
          </Typography>
        </TouchableOpacity>
      </Card>
      
      <Button 
        title="Back to Practice Menu" 
        onPress={handleBackToSelection} 
        variant="outline"
        style={styles.backButton}
      />
    </View>
  );

  const renderSelectionMode = () => (
    <View style={styles.container}>
      <Typography variant="h2" style={styles.title}>Practice</Typography>
      <Typography variant="body1" color={COLORS.textSecondary} style={styles.subtitle}>
        Choose a practice activity
      </Typography>
      
      <View style={styles.practiceOptionsContainer}>
        <TouchableOpacity 
          style={[styles.practiceOption, { backgroundColor: 'rgba(58, 134, 255, 0.1)' }]}
          onPress={handleFlashcardPress}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.primary }]}>
            <Play color={COLORS.background} size={24} />
          </View>
          <Typography variant="subtitle1" style={styles.optionTitle}>Flashcards</Typography>
          <Typography variant="body2" color={COLORS.textSecondary} style={styles.optionDescription}>
            Review vocabulary with spaced repetition
          </Typography>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.practiceOption, { backgroundColor: 'rgba(131, 56, 236, 0.1)' }]}
          onPress={handleSpeakingPress}
        >
          <View style={[styles.iconContainer, { backgroundColor: COLORS.secondary }]}>
            <MessageCircle color={COLORS.background} size={24} />
          </View>
          <Typography variant="subtitle1" style={styles.optionTitle}>Speaking</Typography>
          <Typography variant="body2" color={COLORS.textSecondary} style={styles.optionDescription}>
            Practice pronunciation with feedback
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (mode === 'flashcards') {
    return renderFlashcardMode();
  } else if (mode === 'speaking') {
    return renderSpeakingMode();
  } else {
    return renderSelectionMode();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  title: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    marginBottom: SPACING.xl,
  },
  practiceOptionsContainer: {
    flex: 1,
  },
  practiceOption: {
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  optionTitle: {
    marginBottom: SPACING.xs,
  },
  optionDescription: {
    marginBottom: SPACING.sm,
  },
  practiceContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  practiceTitle: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.xs,
  },
  practiceSubtitle: {
    marginBottom: SPACING.xl,
  },
  backButton: {
    marginTop: SPACING.xl,
  },
  speakingCard: {
    width: width - SPACING.xl * 2,
    padding: SPACING.lg,
    marginTop: SPACING.lg,
  },
  speakPrompt: {
    marginBottom: SPACING.lg,
  },
  phraseText: {
    marginBottom: SPACING.xl,
  },
  audioControls: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(58, 134, 255, 0.1)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  recordButton: {
    alignItems: 'center',
  },
  recordIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.error,
    marginBottom: SPACING.sm,
  },
  recordText: {
    marginBottom: SPACING.md,
  },
});