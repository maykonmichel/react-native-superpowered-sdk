import type { ButtonProps, ViewStyle } from 'react-native';

export type Props = ButtonProps & {
  fullWidth?: boolean;
  icon?: string;
  loading?: boolean;
  style?: ViewStyle;
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
};
