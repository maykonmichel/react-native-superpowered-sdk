import { StyleSheet } from 'react-native';

import { useColors } from '../../style';

export const useStyles = () => {
  const colors = useColors();

  return StyleSheet.create({
    container: {
      alignItems: 'center',
      borderColor: colors.outline,
      borderTopWidth: 1,
      padding: 32,
      paddingTop: 16,
    },
  });
};
