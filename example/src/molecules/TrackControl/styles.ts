import { StyleSheet } from 'react-native';

import { useColors } from '../../style';

export const useStyles = () => {
  const colors = useColors();

  return StyleSheet.create({
    default: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 16,
    },
    highlight: {
      backgroundColor: colors.primary,
    },
    left: {
      borderColor: colors.outline,
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },
    right: {
      paddingRight: 8,
      borderTopRightRadius: 32,
      borderBottomRightRadius: 32,
    },
  });
};
