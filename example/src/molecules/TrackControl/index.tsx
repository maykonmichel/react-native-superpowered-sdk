import React, { VFC } from 'react';
import { TouchableOpacity } from 'react-native';

import { Text } from '../../atoms';

import { useStyles } from './styles';

type Control = {
  label: string;
  onPress: () => void;
  value: boolean;
};

type Props = {
  left: Control;
  right: Control;
};

const TrackControl: VFC<Props> = ({ left, right }) => {
  const styles = useStyles();

  return (
    <>
      <TouchableOpacity
        onPress={left.onPress}
        style={[styles.default, styles.left, left.value && styles.highlight]}
      >
        <Text type={'labelLarge'}>{left.label}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={right.onPress}
        style={[styles.default, styles.right, right.value && styles.highlight]}
      >
        <Text type={'labelLarge'}>{right.label}</Text>
      </TouchableOpacity>
    </>
  );
};

export default TrackControl;
