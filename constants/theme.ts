import { ThemeColors } from '@/types';

export const COLORS: ThemeColors = {
  primary: '#3A86FF',
  secondary: '#8338EC',
  accent: '#06D6A0',
  success: '#06D6A0',
  warning: '#FFD166',
  error: '#EF476F',
  background: '#FFFFFF',
  surface: '#F7F9FC',
  text: '#1A1A2E',
  textSecondary: '#4A4A68',
  disabled: '#C5C5D2',
  border: '#E0E0E0'
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const FONT_SIZE = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32
};

export const FONT_WEIGHT = {
  regular: '400',
  medium: '600',
  bold: '700'
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999
};

export const SHADOWS = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4
  },
  dark: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6
  }
};