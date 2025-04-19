import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { COLORS, SPACING } from '@/constants/theme';
import { Flame, Trophy, BookOpen, Zap, CalendarDays } from 'lucide-react-native';

interface StatsCardProps {
  streak: number;
  xp: number;
  lessonsCompleted: number;
  daysActive: number;
}

export default function StatsCard({ 
  streak, 
  xp, 
  lessonsCompleted,
  daysActive 
}: StatsCardProps) {
  return (
    <Card style={styles.card}>
      <Typography variant="h3" style={styles.title}>Your Stats</Typography>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(239, 71, 111, 0.1)' }]}>
            <Flame color={COLORS.error} size={24} />
          </View>
          <Typography variant="h3" align="center" style={styles.statValue}>
            {streak}
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary} align="center">
            Day Streak
          </Typography>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(58, 134, 255, 0.1)' }]}>
            <Zap color={COLORS.primary} size={24} />
          </View>
          <Typography variant="h3" align="center" style={styles.statValue}>
            {xp}
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary} align="center">
            Total XP
          </Typography>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(6, 214, 160, 0.1)' }]}>
            <BookOpen color={COLORS.success} size={24} />
          </View>
          <Typography variant="h3" align="center" style={styles.statValue}>
            {lessonsCompleted}
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary} align="center">
            Lessons
          </Typography>
        </View>
        
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 209, 102, 0.1)' }]}>
            <CalendarDays color={COLORS.warning} size={24} />
          </View>
          <Typography variant="h3" align="center" style={styles.statValue}>
            {daysActive}
          </Typography>
          <Typography variant="caption" color={COLORS.textSecondary} align="center">
            Days Active
          </Typography>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.lg,
  },
  title: {
    marginBottom: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  statValue: {
    marginBottom: SPACING.xs / 2,
  },
});