import React, { useEffect, useState, VFC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Superpowered from 'react-native-superpowered-sdk';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useColors } from '../../style';
import styles from './styles';

const PlayPauseButton: VFC = () => {
  const [playing, setPlaying] = useState(false);

  const togglePlaying = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) Superpowered.play();
    else Superpowered.pause();
  }, [playing]);

  const name = playing ? 'pause-circle' : 'play-circle';

  const colors = useColors();

  const disabledColor = `${colors.secondary}55`;

  return (
    <View style={styles.container}>
      <Icon name={'skip-previous'} size={40} color={disabledColor} />
      <TouchableOpacity onPress={togglePlaying}>
        <Icon name={name} size={80} color={colors.primary} />
      </TouchableOpacity>
      <Icon name={'skip-next'} size={40} color={disabledColor} />
    </View>
  );
};

export default PlayPauseButton;
