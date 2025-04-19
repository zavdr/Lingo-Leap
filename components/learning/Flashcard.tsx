import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  Easing,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { Flashcard as FlashcardType } from '@/types';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { COLORS, SPACING } from '@/constants/theme';
import { VolumeX, Volume2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

interface FlashcardProps {
  card: FlashcardType;
  onRate: (performance: 'easy' | 'medium' | 'hard') => void;
}

export default function FlashcardComponent({ card, onRate }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const rotation = useSharedValue(0);
  
  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotation.value,
      [0, 1],
      [0, 180]
    );
    
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` },
      ],
      opacity: rotation.value > 0.5 ? 0 : 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
    };
  });
  
  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotation.value,
      [0, 1],
      [180, 360]
    );
    
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotateValue}deg` },
      ],
      opacity: rotation.value > 0.5 ? 1 : 0,
      position: 'absolute',
      width: '100%',
      height: '100%',
    };
  });
  
  const handleFlip = () => {
    const newValue = isFlipped ? 0 : 1;
    rotation.value = withTiming(newValue, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    }, () => {
      runOnJS(setIsFlipped)(!isFlipped);
    });
  };
  
  const speakWord = (word: string) => {
    Speech.speak(word, {
      language: 'es-ES', // Should be dynamic based on language
      pitch: 1.0,
      rate: 0.8,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={0.9}
        onPress={handleFlip}
        style={styles.flipContainer}
      >
        <Animated.View style={[styles.cardContainer, frontAnimatedStyle]}>
          <Card style={styles.card}>
            <View style={styles.topSection}>
              <TouchableOpacity 
                style={styles.audioButton}
                onPress={() => speakWord(card.word)}
              >
                <Volume2 color={COLORS.primary} size={24} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.contentSection}>
              <Typography variant="h2" align="center" style={styles.word}>
                {card.word}
              </Typography>
              
              <Typography variant="body1" color={COLORS.textSecondary} align="center">
                Tap to flip
              </Typography>
            </View>
          </Card>
        </Animated.View>
        
        <Animated.View style={[styles.cardContainer, backAnimatedStyle]}>
          <Card style={styles.card}>
            <View style={styles.topSection}>
              <TouchableOpacity 
                style={styles.audioButton}
                onPress={() => speakWord(card.word)}
              >
                <Volume2 color={COLORS.primary} size={24} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.contentSection}>
              <Typography variant="h3" align="center" style={styles.translation}>
                {card.translation}
              </Typography>
              
              <View style={styles.examplesContainer}>
                {card.examples.map((example, index) => (
                  <View key={index} style={styles.example}>
                    <Typography variant="body2" color={COLORS.primary}>
                      {example.original}
                    </Typography>
                    <Typography variant="body2" color={COLORS.textSecondary}>
                      {example.translated}
                    </Typography>
                  </View>
                ))}
              </View>
            </View>
          </Card>
        </Animated.View>
      </TouchableOpacity>
      
      <View style={styles.actionButtons}>
        <Button 
          title="Hard" 
          onPress={() => onRate('hard')} 
          variant="outline"
          style={styles.actionButton}
        />
        <Button 
          title="Good" 
          onPress={() => onRate('medium')} 
          variant="primary"
          style={styles.actionButton}
        />
        <Button 
          title="Easy" 
          onPress={() => onRate('easy')} 
          variant="secondary"
          style={styles.actionButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - SPACING.xl * 2,
    alignItems: 'center',
  },
  flipContainer: {
    width: '100%',
    height: 300,
    marginBottom: SPACING.lg,
  },
  cardContainer: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  card: {
    width: '100%',
    height: '100%',
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  audioButton: {
    padding: SPACING.xs,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  word: {
    marginBottom: SPACING.md,
  },
  translation: {
    marginBottom: SPACING.md,
  },
  examplesContainer: {
    width: '100%',
  },
  example: {
    marginBottom: SPACING.sm,
    padding: SPACING.sm,
    backgroundColor: 'rgba(58, 134, 255, 0.05)',
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});