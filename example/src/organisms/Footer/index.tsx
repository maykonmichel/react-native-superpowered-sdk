import React, { VFC } from 'react';
import { View } from 'react-native';
import { Text } from '../../atoms';

import { PlayPauseButton } from '../../molecules';

import { useStyles } from './styles';

const Footer: VFC = () => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text type={'headlineMedium'}>Howling</Text>
      <Text type={'bodyMedium'}>Amber Skye</Text>
      <PlayPauseButton />
    </View>
  );
};

export default Footer;
