import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, BORDER_RADIUS, SHADOWS } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  iconLeft,
  iconRight
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' || variant === 'ghost' ? COLORS.primary : COLORS.background} 
          size="small" 
        />
      ) : (
        <>
          {iconLeft && <>{iconLeft}</>}
          <Text style={textStyles}>{title}</Text>
          {iconRight && <>{iconRight}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
  },
  primary: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.medium
  },
  secondary: {
    backgroundColor: COLORS.secondary,
    ...SHADOWS.medium
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary
  },
  ghost: {
    backgroundColor: 'transparent'
  },
  small: {
    paddingVertical: SPACING.xs,
    minWidth: 80
  },
  medium: {
    paddingVertical: SPACING.sm,
    minWidth: 120
  },
  large: {
    paddingVertical: SPACING.md,
    minWidth: 160
  },
  disabled: {
    backgroundColor: COLORS.disabled,
    borderColor: COLORS.disabled,
    ...SHADOWS.light
  },
  text: {
    textAlign: 'center',
    fontWeight: FONT_WEIGHT.medium as any,
    marginHorizontal: SPACING.xs
  },
  primaryText: {
    color: COLORS.background
  },
  secondaryText: {
    color: COLORS.background
  },
  outlineText: {
    color: COLORS.primary
  },
  ghostText: {
    color: COLORS.primary
  },
  smallText: {
    fontSize: FONT_SIZE.sm
  },
  mediumText: {
    fontSize: FONT_SIZE.md
  },
  largeText: {
    fontSize: FONT_SIZE.lg
  },
  disabledText: {
    color: COLORS.textSecondary
  }
});