import React, { VFC } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Text from '../Text';

import { useStyles } from './styles';
import type { Props } from './types';

const Button: VFC<Props> = (props) => {
  const styles = useStyles(props);

  const { icon, loading, style, title } = props;

  return (
    <TouchableOpacity
      accessibilityRole={'button'}
      {...props}
      style={StyleSheet.compose<ViewStyle>(styles.container, style)}
    >
      {!!icon && <Icon name={icon} size={18} color={styles.title.color} />}
      {loading ? (
        <ActivityIndicator color={styles.title.color} />
      ) : (
        <Text type="labelLarge" style={styles.title}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
