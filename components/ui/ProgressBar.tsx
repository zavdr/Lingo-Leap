import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { COLORS, BORDER_RADIUS } from '@/constants/theme';

interface ProgressBarProps {
  progress: number; // from 0 to 1
  height?: number;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  style?: ViewStyle;
  animated?: boolean;
  duration?: number;
}

export default function ProgressBar({
  progress,
  height = 8,
  color = COLORS.primary,
  backgroundColor = COLORS.disabled,
  borderRadius = BORDER_RADIUS.round,
  style,
  animated = true,
  duration = 500
}: ProgressBarProps) {
  // Make sure progress is between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      animatedProgress.value = withTiming(clampedProgress, { duration });
    } else {
      animatedProgress.value = clampedProgress;
    }
  }, [clampedProgress, animated, duration]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value * 100}%`
    };
  });

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor, borderRadius },
        style
      ]}
    >
      <Animated.View
        style={[
          styles.progress,
          { backgroundColor: color, borderRadius },
          progressStyle
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden'
  },
  progress: {
    height: '100%'
  }
});