import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { COLORS, SPACING } from '@/constants/theme';
import Typography from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StatsCard from '@/components/profile/StatsCard';
import AchievementItem from '@/components/profile/AchievementItem';
import LanguageSelector from '@/components/profile/LanguageSelector';
import { Settings, LogOut, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { lessons, achievements, dailyChallenges, completeDailyChallenge } = useLearning();
  const [isLoading, setIsLoading] = useState(false);
  
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const earnedAchievements = achievements.filter(achievement => achievement.earned);
  
  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const handleCompleteChallenge = async (challengeId: string) => {
    setIsLoading(true);
    try {
      await completeDailyChallenge(challengeId);
    } catch (error) {
      console.error('Failed to complete challenge:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2">Profile</Typography>
        
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              {user?.avatarUrl ? (
                <Image 
                  source={{ uri: user.avatarUrl }} 
                  style={styles.profileImage} 
                />
              ) : (
                <View style={styles.profileImagePlaceholder}>
                  <Typography variant="h2" color={COLORS.background}>
                    {user?.name?.charAt(0) || 'U'}
                  </Typography>
                </View>
              )}
            </View>
            
            <View style={styles.profileInfo}>
              <Typography variant="h3">{user?.name}</Typography>
              <Typography variant="body1" color={COLORS.textSecondary}>
                {user?.email}
              </Typography>
            </View>
          </View>
          
          <StatsCard 
            streak={user?.streak || 0} 
            xp={user?.xp || 0} 
            lessonsCompleted={completedLessons}
            daysActive={14}
          />
          
          <Card style={styles.settingsCard}>
            <LanguageSelector />
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemContent}>
                <Typography variant="subtitle1">Notifications</Typography>
                <Typography variant="body2" color={COLORS.textSecondary}>On</Typography>
              </View>
              <ChevronRight size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingsItem}>
              <View style={styles.settingsItemContent}>
                <Typography variant="subtitle1">Account Settings</Typography>
              </View>
              <ChevronRight size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </Card>
          
          <View style={styles.section}>
            <Typography variant="h3" style={styles.sectionTitle}>
              Daily Challenges
            </Typography>
            
            {dailyChallenges.map(challenge => (
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
                
                <Typography variant="caption" color={COLORS.textSecondary} style={styles.englishDesc}>
                  {challenge.englishDescription}
                </Typography>
                
                {challenge.completed ? (
                  <View style={styles.completedBadge}>
                    <Typography variant="caption" color={COLORS.background}>
                      Completed
                    </Typography>
                  </View>
                ) : (
                  <Button 
                    title="Complete Challenge" 
                    onPress={() => handleCompleteChallenge(challenge.id)}
                    variant="outline"
                    size="small"
                    loading={isLoading}
                    disabled={isLoading}
                  />
                )}
                
                {challenge.criteria && (
                  <View style={styles.progressContainer}>
                    <Typography variant="caption" color={COLORS.textSecondary}>
                      Progress: {challenge.criteria.currentCount}/{challenge.criteria.requiredCount}
                    </Typography>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { 
                            width: `${(challenge.criteria.currentCount / challenge.criteria.requiredCount) * 100}%`,
                            backgroundColor: challenge.completed ? COLORS.success : COLORS.primary
                          }
                        ]} 
                      />
                    </View>
                  </View>
                )}
              </Card>
            ))}
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Typography variant="h3">Achievements</Typography>
              <Typography variant="body2" color={COLORS.primary}>
                {earnedAchievements.length}/{achievements.length}
              </Typography>
            </View>
            
            {achievements.map(achievement => (
              <AchievementItem key={achievement.id} achievement={achievement} />
            ))}
          </View>
          
          <Button 
            title="Log Out" 
            onPress={handleLogout} 
            variant="outline"
            iconLeft={<LogOut size={18} color={COLORS.primary} />}
            style={styles.logoutButton}
          />
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
    marginTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    marginBottom: SPACING.xl,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  profileImageContainer: {
    marginRight: SPACING.lg,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  settingsCard: {
    marginBottom: SPACING.lg,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  settingsItemContent: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
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
    marginBottom: SPACING.xs,
  },
  englishDesc: {
    marginBottom: SPACING.md,
    fontStyle: 'italic',
  },
  completedBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs / 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  progressContainer: {
    marginTop: SPACING.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: COLORS.disabled,
    borderRadius: 2,
    marginTop: SPACING.xs / 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  logoutButton: {
    marginTop: SPACING.md,
  },
});