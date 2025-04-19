import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { COLORS, SPACING } from '@/constants/theme';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/ui/ProgressBar';
import { Flame, MessageCircle, Dumbbell, ArrowRight } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { lessons, dailyChallenges, isLoading } = useLearning();

  // Calculate completed lessons
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const completionRate = lessons.length > 0 ? completedLessons / lessons.length : 0;
  
  // Find the next lesson to continue
  const nextLesson = lessons.find(lesson => !lesson.completed && !lesson.locked);
  
  // Find incomplete daily challenges
  const incompleteChallenges = dailyChallenges.filter(challenge => !challenge.completed);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Typography variant="h2">
              Hello, {user?.name?.split(' ')[0] || 'Learner'}!
            </Typography>
            <Typography variant="body1" color={COLORS.textSecondary}>
              {user?.streak || 0} day streak | {user?.xp || 0} XP
            </Typography>
          </View>
          
          <View style={styles.streakBadge}>
            <Flame color={COLORS.error} size={20} />
            <Typography variant="subtitle2" color={COLORS.error} style={styles.streakText}>
              {user?.streak || 0}
            </Typography>
          </View>
        </View>
        
        <Card style={styles.progressCard} variant="elevated">
          <Typography variant="h3" style={styles.progressTitle}>Your Progress</Typography>
          
          <View style={styles.progressInfo}>
            <Typography variant="body1">
              {completedLessons} of {lessons.length} lessons completed
            </Typography>
            <Typography variant="subtitle2" color={COLORS.primary}>
              {Math.round(completionRate * 100)}%
            </Typography>
          </View>
          
          <ProgressBar 
            progress={completionRate} 
            height={8} 
            color={COLORS.primary} 
            style={styles.progressBar} 
          />
          
          {nextLesson && (
            <View style={styles.nextLessonSection}>
              <Typography variant="subtitle2" style={styles.continueLabel}>
                Continue learning
              </Typography>
              
              <View style={styles.nextLesson}>
                <View style={styles.lessonInfo}>
                  <Typography variant="subtitle1">{nextLesson.title}</Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>
                    {nextLesson.duration} min · {nextLesson.exercises.length} exercises
                  </Typography>
                </View>
                
                <Button 
                  title="Start" 
                  onPress={() => router.push(`/lesson/${nextLesson.id}`)}
                  size="small"
                  iconRight={<ArrowRight size={16} color={COLORS.background} />}
                />
              </View>
            </View>
          )}
        </Card>
        
        <Typography variant="h3" style={styles.sectionTitle}>Daily Challenges</Typography>
        
        {incompleteChallenges.length > 0 ? (
          incompleteChallenges.map(challenge => (
            <Card key={challenge.id} style={styles.challengeCard}>
              <View style={styles.challengeHeader}>
                <Typography variant="subtitle1">{challenge.title}</Typography>
                <View style={styles.xpBadge}>
                  <Typography variant="caption" color={COLORS.primary}>
                    +{challenge.xpReward} XP
                  </Typography>
                </View>
              </View>
              
              <Typography variant="body2" color={COLORS.textSecondary} style={styles.challengeDesc}>
                {challenge.description}
              </Typography>
              
              <Button 
                title="Complete Challenge" 
                onPress={() => {}} 
                variant="outline"
                size="small"
              />
            </Card>
          ))
        ) : (
          <Card style={styles.allCompletedCard}>
            <Typography variant="body1" align="center">
              All challenges completed for today!
            </Typography>
            <Typography variant="body2" color={COLORS.textSecondary} align="center">
              Come back tomorrow for new challenges
            </Typography>
          </Card>
        )}
        
        <View style={styles.practiceSection}>
          <Typography variant="h3" style={styles.sectionTitle}>Quick Practice</Typography>
          
          <View style={styles.practiceButtons}>
            <Button 
              title="Speaking" 
              onPress={() => router.push('/practice')}
              iconLeft={<MessageCircle size={18} color={COLORS.background} />}
              style={styles.practiceButton}
            />
            <Button 
              title="Flashcards" 
              onPress={() => router.push('/practice')}
              iconLeft={<Dumbbell size={18} color={COLORS.background} />}
              variant="secondary"
              style={styles.practiceButton}
            />
          </View>
        </View>
      </ScrollView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    marginTop: SPACING.lg,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 71, 111, 0.1)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: SPACING.md,
  },
  streakText: {
    marginLeft: SPACING.xs,
  },
  progressCard: {
    marginBottom: SPACING.xl,
  },
  progressTitle: {
    marginBottom: SPACING.md,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  progressBar: {
    marginBottom: SPACING.md,
  },
  nextLessonSection: {
    marginTop: SPACING.md,
  },
  continueLabel: {
    marginBottom: SPACING.xs,
  },
  nextLesson: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: SPACING.sm,
  },
  lessonInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  challengeCard: {
    marginBottom: SPACING.md,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  xpBadge: {
    backgroundColor: 'rgba(58, 134, 255, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 4,
  },
  challengeDesc: {
    marginBottom: SPACING.md,
  },
  allCompletedCard: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  practiceSection: {
    marginBottom: SPACING.xl,
  },
  practiceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  practiceButton: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
});