import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Lesson } from '@/types';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import ProgressBar from '@/components/ui/ProgressBar';
import { COLORS, SPACING } from '@/constants/theme';
import { Clock as LockClosed, Bookmark, Clock } from 'lucide-react-native';

interface LessonCardProps {
  lesson: Lesson;
  onPress: (lesson: Lesson) => void;
}

export default function LessonCard({ lesson, onPress }: LessonCardProps) {
  const handlePress = () => {
    if (!lesson.locked) {
      onPress(lesson);
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={lesson.locked ? 1 : 0.8} 
      onPress={handlePress}
      disabled={lesson.locked}
    >
      <Card 
        style={[
          styles.card, 
          lesson.locked && styles.lockedCard
        ]}
        variant="elevated"
      >
        {lesson.locked && (
          <View style={styles.lockedOverlay}>
            <LockClosed color={COLORS.background} size={24} />
            <Typography variant="subtitle2" color={COLORS.background} align="center" style={styles.lockedText}>
              Complete previous lessons to unlock
            </Typography>
          </View>
        )}

        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Typography variant="h3">{lesson.title}</Typography>
            <View style={styles.levelBadge}>
              <Typography variant="caption" color={COLORS.background}>
                {lesson.level.charAt(0).toUpperCase() + lesson.level.slice(1)}
              </Typography>
            </View>
          </View>
          
          {lesson.completed ? (
            <View style={styles.completedBadge}>
              <Typography variant="caption" color={COLORS.background}>Completed</Typography>
            </View>
          ) : null}
        </View>

        <Typography variant="body1" color={COLORS.textSecondary} style={styles.description}>
          {lesson.description}
        </Typography>

        <View style={styles.footer}>
          <View style={styles.metaItem}>
            <Bookmark size={16} color={COLORS.secondary} />
            <Typography variant="body2" color={COLORS.textSecondary} style={styles.metaText}>
              {lesson.exercises.length} exercises
            </Typography>
          </View>
          
          <View style={styles.metaItem}>
            <Clock size={16} color={COLORS.secondary} />
            <Typography variant="body2" color={COLORS.textSecondary} style={styles.metaText}>
              {lesson.duration} min
            </Typography>
          </View>
          
          <View style={styles.xpContainer}>
            <Typography variant="body2" color={COLORS.primary} weight="bold">
              +{lesson.xpReward} XP
            </Typography>
          </View>
        </View>

        {lesson.completed ? (
          <ProgressBar progress={1} height={4} color={COLORS.success} style={styles.progressBar} />
        ) : (
          <ProgressBar progress={0} height={4} style={styles.progressBar} />
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
    position: 'relative',
  },
  lockedCard: {
    opacity: 0.8,
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  lockedText: {
    marginTop: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  levelBadge: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 4,
    marginLeft: SPACING.sm,
  },
  completedBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 4,
  },
  description: {
    marginBottom: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: SPACING.xs,
  },
  xpContainer: {
    backgroundColor: 'rgba(58, 134, 255, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 4,
  },
  progressBar: {
    marginTop: SPACING.xs,
  },
});