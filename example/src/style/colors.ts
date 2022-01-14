import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

import palette from './palette';

export type Colors = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  shadow: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
};

const light: Colors = {
  primary: palette.primary40,
  onPrimary: palette.primary100,
  primaryContainer: palette.primary90,
  onPrimaryContainer: palette.primary10,
  secondary: palette.secondary40,
  onSecondary: palette.secondary100,
  secondaryContainer: palette.secondary90,
  onSecondaryContainer: palette.secondary10,
  tertiary: palette.tertiary40,
  onTertiary: palette.tertiary100,
  tertiaryContainer: palette.tertiary90,
  onTertiaryContainer: palette.tertiary10,
  error: palette.error40,
  onError: palette.error100,
  errorContainer: palette.error90,
  onErrorContainer: palette.error10,
  background: palette.neutral99,
  onBackground: palette.neutral10,
  surface: palette.neutral99,
  onSurface: palette.neutral10,
  surfaceVariant: palette.neutralVariant90,
  onSurfaceVariant: palette.neutralVariant30,
  outline: palette.neutralVariant50,
  shadow: palette.neutral0,
  inverseSurface: palette.neutral20,
  inverseOnSurface: palette.neutral95,
  inversePrimary: palette.primary80,
};

const dark: Colors = {
  primary: palette.primary80,
  onPrimary: palette.primary20,
  primaryContainer: palette.primary30,
  onPrimaryContainer: palette.primary90,
  secondary: palette.secondary80,
  onSecondary: palette.secondary20,
  secondaryContainer: palette.secondary30,
  onSecondaryContainer: palette.secondary90,
  tertiary: palette.tertiary80,
  onTertiary: palette.tertiary20,
  tertiaryContainer: palette.tertiary30,
  onTertiaryContainer: palette.tertiary90,
  error: palette.error80,
  onError: palette.error20,
  errorContainer: palette.error30,
  onErrorContainer: palette.error90,
  background: palette.neutral10,
  onBackground: palette.neutral90,
  surface: palette.neutral10,
  onSurface: palette.neutral80,
  surfaceVariant: palette.neutralVariant30,
  onSurfaceVariant: palette.neutralVariant80,
  outline: palette.neutralVariant60,
  shadow: palette.neutral0,
  inverseSurface: palette.neutral90,
  inverseOnSurface: palette.neutral20,
  inversePrimary: palette.primary40,
};

export const useColors = () => {
  const colorScheme = useColorScheme();

  return useMemo(() => (colorScheme === 'light' ? light : dark), [colorScheme]);
};

export type Color = keyof Colors;
