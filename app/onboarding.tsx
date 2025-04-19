import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { COLORS, SPACING } from '@/constants/theme';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { Language, ProficiencyLevel } from '@/types';
import { supportedLanguages } from '@/data/mockData';
import { Globe, ArrowRight, CircleCheck as CheckCircle2 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { user, setLanguage, setProficiencyLevel } = useAuth();
  const [step, setStep] = useState<'language' | 'proficiency'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<ProficiencyLevel | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleLevelSelect = (level: ProficiencyLevel) => {
    setSelectedLevel(level);
  };

  const handleNext = async () => {
    if (step === 'language' && selectedLanguage) {
      await setLanguage(selectedLanguage);
      setStep('proficiency');
    } else if (step === 'proficiency' && selectedLevel) {
      await setProficiencyLevel(selectedLevel);
      router.replace('/(tabs)');
    }
  };

  const renderLanguageStep = () => (
    <>
      <View style={styles.header}>
        <Globe color={COLORS.primary} size={64} />
        <Typography variant="h2" style={styles.title}>Choose a language</Typography>
        <Typography variant="body1" color={COLORS.textSecondary} style={styles.subtitle}>
          Select the language you want to learn
        </Typography>
      </View>
      
      <FlatList
        data={supportedLanguages}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.languageItem,
              selectedLanguage?.id === item.id && styles.selectedLanguageItem
            ]}
            onPress={() => handleLanguageSelect(item)}
          >
            <Typography variant="h3" style={styles.languageFlag}>
              {item.flag}
            </Typography>
            <Typography 
              variant="subtitle1" 
              color={selectedLanguage?.id === item.id ? COLORS.primary : COLORS.text}
            >
              {item.name}
            </Typography>
            {selectedLanguage?.id === item.id && (
              <View style={styles.checkIcon}>
                <CheckCircle2 color={COLORS.primary} size={20} />
              </View>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.languageList}
      />
    </>
  );

  const renderProficiencyStep = () => (
    <>
      <View style={styles.header}>
        <Typography variant="h2" style={styles.title}>Your level</Typography>
        <Typography variant="body1" color={COLORS.textSecondary} style={styles.subtitle}>
          Select your current level in {selectedLanguage?.name}
        </Typography>
      </View>
      
      <View style={styles.levelContainer}>
        <TouchableOpacity
          style={[
            styles.levelItem,
            selectedLevel === 'beginner' && styles.selectedLevelItem
          ]}
          onPress={() => handleLevelSelect('beginner')}
        >
          <View style={[styles.levelIcon, { backgroundColor: 'rgba(6, 214, 160, 0.1)' }]}>
            <Typography variant="h2" color={COLORS.success}>1</Typography>
          </View>
          <Typography variant="subtitle1">Beginner</Typography>
          <Typography variant="body2" color={COLORS.textSecondary} style={styles.levelDescription}>
            I'm just starting to learn
          </Typography>
          {selectedLevel === 'beginner' && (
            <View style={styles.checkIcon}>
              <CheckCircle2 color={COLORS.primary} size={20} />
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.levelItem,
            selectedLevel === 'intermediate' && styles.selectedLevelItem
          ]}
          onPress={() => handleLevelSelect('intermediate')}
        >
          <View style={[styles.levelIcon, { backgroundColor: 'rgba(255, 209, 102, 0.1)' }]}>
            <Typography variant="h2" color={COLORS.warning}>2</Typography>
          </View>
          <Typography variant="subtitle1">Intermediate</Typography>
          <Typography variant="body2" color={COLORS.textSecondary} style={styles.levelDescription}>
            I know some basics
          </Typography>
          {selectedLevel === 'intermediate' && (
            <View style={styles.checkIcon}>
              <CheckCircle2 color={COLORS.primary} size={20} />
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.levelItem,
            selectedLevel === 'advanced' && styles.selectedLevelItem
          ]}
          onPress={() => handleLevelSelect('advanced')}
        >
          <View style={[styles.levelIcon, { backgroundColor: 'rgba(58, 134, 255, 0.1)' }]}>
            <Typography variant="h2" color={COLORS.primary}>3</Typography>
          </View>
          <Typography variant="subtitle1">Advanced</Typography>
          <Typography variant="body2" color={COLORS.textSecondary} style={styles.levelDescription}>
            I'm already conversational
          </Typography>
          {selectedLevel === 'advanced' && (
            <View style={styles.checkIcon}>
              <CheckCircle2 color={COLORS.primary} size={20} />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {step === 'language' ? renderLanguageStep() : renderProficiencyStep()}
      
      <Button
        title={step === 'language' ? 'Continue' : 'Start Learning'}
        onPress={handleNext}
        disabled={(step === 'language' && !selectedLanguage) || (step === 'proficiency' && !selectedLevel)}
        iconRight={<ArrowRight size={18} color={COLORS.background} />}
        style={styles.nextButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginTop: SPACING.xl * 2,
    marginBottom: SPACING.xl,
  },
  title: {
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
  languageList: {
    paddingBottom: SPACING.xl,
  },
  languageItem: {
    width: (width - SPACING.lg * 2 - SPACING.md) / 2,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    margin: SPACING.xs,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },
  selectedLanguageItem: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  languageFlag: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  checkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  levelContainer: {
    flex: 1,
    marginTop: SPACING.lg,
  },
  levelItem: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },
  selectedLevelItem: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  levelIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  levelDescription: {
    marginTop: SPACING.xs,
  },
  nextButton: {
    marginBottom: SPACING.xl,
  },
});