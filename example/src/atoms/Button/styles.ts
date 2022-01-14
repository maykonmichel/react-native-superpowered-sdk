import { StyleSheet } from 'react-native';

import { Colors, elevation, useColors } from '../../style';

import type { Props } from './types';

const getContainerStyles = (colors: Colors) =>
  StyleSheet.create({
    default: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      height: 40,
      borderRadius: 20,
    },
    filled: {
      backgroundColor: colors.primary,
    },
    fullWidth: {
      alignSelf: 'stretch',
    },
    tonal: {
      backgroundColor: colors.secondaryContainer,
    },
    elevated: {
      ...elevation.level1,
      backgroundColor: colors.surface,
    },
    disabled: {
      backgroundColor: `${colors.onSurface}3D`,
    },
    outlined: {
      backgroundColor: colors.surface,
      borderColor: colors.outline,
      borderWidth: 1,
    },
    outlinedDisabled: {
      borderColor: `${colors.onSurface}1E`,
    },
    text: {
      backgroundColor: undefined,
      paddingHorizontal: undefined,
      height: undefined,
      borderRadius: undefined,
    },
  });

const getTitleStyles = (colors: Colors) =>
  StyleSheet.create({
    default: {
      marginHorizontal: 8,
      color: colors.primary,
    },
    disabled: {
      color: `${colors.onSurface}60`,
    },
    filled: {
      color: colors.onPrimary,
    },
    tonal: {
      color: colors.onSecondaryContainer,
    },
  });

export const useStyles = ({
  disabled,
  fullWidth,
  variant = 'filled',
}: Props) => {
  const colors = useColors();

  const containerStyles = getContainerStyles(colors);
  const titleStyles = getTitleStyles(colors);

  return StyleSheet.create({
    container: StyleSheet.flatten([
      containerStyles.default,
      fullWidth && containerStyles.fullWidth,
      variant === 'filled' && containerStyles.filled,
      variant === 'tonal' && containerStyles.tonal,
      variant === 'elevated' && containerStyles.elevated,
      disabled && containerStyles.disabled,
      variant === 'outlined' && containerStyles.outlined,
      disabled && containerStyles.outlinedDisabled,
      variant === 'text' && containerStyles.text,
    ]),
    title: StyleSheet.flatten([
      titleStyles.default,
      variant === 'filled' && titleStyles.filled,
      variant === 'tonal' && titleStyles.tonal,
      disabled && titleStyles.disabled,
    ]),
  });
};
