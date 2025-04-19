import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Achievement } from '@/types';
import Card from '@/components/ui/Card';
import Typography from '@/components/ui/Typography';
import { COLORS, SPACING } from '@/constants/theme';

interface AchievementItemProps {
  achievement: Achievement;
}

export default function AchievementItem({ achievement }: AchievementItemProps) {
  return (
    <Card 
      style={[
        styles.card,
        !achievement.earned && styles.unearned
      ]}
      variant={achievement.earned ? 'elevated' : 'outlined'}
    >
      <View style={styles.content}>
        <Image
          source={{ uri: achievement.imageUrl }}
          style={[
            styles.image,
            !achievement.earned && styles.unearnedImage
          ]}
        />
        
        <View style={styles.details}>
          <Typography 
            variant="subtitle1" 
            color={achievement.earned ? COLORS.text : COLORS.textSecondary}
          >
            {achievement.title}
          </Typography>
          
          <Typography 
            variant="body2" 
            color={achievement.earned ? COLORS.textSecondary : COLORS.disabled}
            style={styles.description}
          >
            {achievement.description}
          </Typography>
          
          {achievement.earned ? (
            <View style={styles.earnedBadge}>
              <Typography variant="caption" color={COLORS.background}>
                Earned {achievement.earnedDate 
                  ? new Date(achievement.earnedDate).toLocaleDateString() 
                  : ''}
              </Typography>
            </View>
          ) : (
            <Typography variant="caption" color={COLORS.disabled} style={styles.criteria}>
              {achievement.criteria}
            </Typography>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  unearned: {
    opacity: 0.7,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SPACING.md,
  },
  unearnedImage: {
    opacity: 0.5,
    filter: 'grayscale(1)',
  },
  details: {
    flex: 1,
  },
  description: {
    marginTop: SPACING.xs,
  },
  earnedBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: SPACING.xs,
  },
  criteria: {
    marginTop: SPACING.xs,
  },
});