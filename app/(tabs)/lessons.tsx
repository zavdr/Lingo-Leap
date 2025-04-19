import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useLearning } from '@/context/LearningContext';
import { COLORS, SPACING } from '@/constants/theme';
import Typography from '@/components/ui/Typography';
import LessonCard from '@/components/learning/LessonCard';
import { Lesson } from '@/types';
import { Search } from 'lucide-react-native';

export default function LessonsScreen() {
  const router = useRouter();
  const { lessons, isLoading } = useLearning();
  const [filter, setFilter] = useState<'all' | 'inProgress' | 'completed'>('all');

  const filteredLessons = filter === 'all' 
    ? lessons 
    : filter === 'completed' 
      ? lessons.filter(lesson => lesson.completed) 
      : lessons.filter(lesson => !lesson.completed && !lesson.locked);

  const handleLessonPress = (lesson: Lesson) => {
    router.push(`/lesson/${lesson.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography variant="h2">Lessons</Typography>
        
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.filtersContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <Typography 
            variant="body1" 
            color={filter === 'all' ? COLORS.primary : COLORS.textSecondary}
          >
            All
          </Typography>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'inProgress' && styles.activeFilter]}
          onPress={() => setFilter('inProgress')}
        >
          <Typography 
            variant="body1" 
            color={filter === 'inProgress' ? COLORS.primary : COLORS.textSecondary}
          >
            In Progress
          </Typography>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'completed' && styles.activeFilter]}
          onPress={() => setFilter('completed')}
        >
          <Typography 
            variant="body1" 
            color={filter === 'completed' ? COLORS.primary : COLORS.textSecondary}
          >
            Completed
          </Typography>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.lessonsContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredLessons.map(lesson => (
          <LessonCard 
            key={lesson.id} 
            lesson={lesson} 
            onPress={handleLessonPress} 
          />
        ))}
        
        {filteredLessons.length === 0 && (
          <View style={styles.emptyState}>
            <Typography variant="subtitle1" align="center">
              No lessons found
            </Typography>
            <Typography variant="body2" color={COLORS.textSecondary} align="center">
              {filter === 'completed' 
                ? "You haven't completed any lessons yet"
                : filter === 'inProgress'
                  ? "You don't have any lessons in progress"
                  : "No lessons available"}
            </Typography>
          </View>
        )}
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
    marginBottom: SPACING.md,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
  },
  filterButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    borderRadius: 20,
  },
  activeFilter: {
    backgroundColor: 'rgba(58, 134, 255, 0.1)',
  },
  lessonsContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
});