import { StyleSheet } from 'react-native';

import { useColors } from '../../style';

export const useStyles = () => {
  const colors = useColors();

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
      marginVertical: 8,
      paddingLeft: 20,
      backgroundColor: colors.surfaceVariant,
      borderRadius: 32,
    },
    muted: {
      opacity: 0.3,
    },
    name: {
      flex: 4,
      marginLeft: 10,
    },
  });
};
