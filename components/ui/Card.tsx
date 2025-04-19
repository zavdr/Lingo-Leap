import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'small' | 'medium' | 'large';
}

export default function Card({
  children,
  style,
  variant = 'elevated',
  padding = 'medium'
}: CardProps) {
  const variantStyle = variant === 'elevated' 
    ? styles.elevated 
    : variant === 'outlined' 
      ? styles.outlined 
      : styles.flat;
      
  const paddingStyle = padding === 'none' 
    ? null 
    : padding === 'small' 
      ? styles.paddingSmall 
      : padding === 'large' 
        ? styles.paddingLarge 
        : styles.paddingMedium;

  return (
    <View style={[styles.card, variantStyle, paddingStyle, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  elevated: {
    ...SHADOWS.medium
  },
  outlined: {
    borderWidth: 1,
    borderColor: COLORS.border
  },
  flat: {
    // No additional styling needed
  },
  paddingSmall: {
    padding: SPACING.sm
  },
  paddingMedium: {
    padding: SPACING.md
  },
  paddingLarge: {
    padding: SPACING.lg
  }
});