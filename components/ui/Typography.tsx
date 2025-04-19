import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { COLORS, FONT_SIZE, FONT_WEIGHT } from '@/constants/theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'button';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'regular' | 'medium' | 'bold';
  style?: TextStyle;
  children: React.ReactNode;
}

export default function Typography({
  variant = 'body1',
  color = COLORS.text,
  align = 'left',
  weight,
  style,
  children,
  ...props
}: TypographyProps) {
  const textStyles = [
    styles[variant],
    { color, textAlign: align },
    weight && { fontWeight: FONT_WEIGHT[weight] as any },
    style
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.bold as any,
    lineHeight: FONT_SIZE.xxxl * 1.2
  },
  h2: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: FONT_WEIGHT.bold as any,
    lineHeight: FONT_SIZE.xxl * 1.2
  },
  h3: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold as any,
    lineHeight: FONT_SIZE.xl * 1.2
  },
  subtitle1: {
    fontSize: FONT_SIZE.lg,
    fontWeight: FONT_WEIGHT.medium as any,
    lineHeight: FONT_SIZE.lg * 1.5
  },
  subtitle2: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium as any,
    lineHeight: FONT_SIZE.md * 1.5
  },
  body1: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.regular as any,
    lineHeight: FONT_SIZE.md * 1.5
  },
  body2: {
    fontSize: FONT_SIZE.sm,
    fontWeight: FONT_WEIGHT.regular as any,
    lineHeight: FONT_SIZE.sm * 1.5
  },
  caption: {
    fontSize: FONT_SIZE.xs,
    fontWeight: FONT_WEIGHT.regular as any,
    lineHeight: FONT_SIZE.xs * 1.5
  },
  button: {
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.medium as any,
    lineHeight: FONT_SIZE.md * 1.5
  }
});