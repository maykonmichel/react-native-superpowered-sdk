import React, { useEffect, useState, VFC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Superpowered from 'react-native-superpowered-sdk';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text } from '../../atoms';
import { TrackControl } from '../../molecules';

import { useStyles } from './styles';

type Props = {
  control: 'panning' | 'volume';
  index: number;
  name: string;
};

const Track: VFC<Props> = ({ control, index, name }) => {
  const [volume, setVolume] = useState(1);
  const onPressMinus = () => volume && setVolume(volume - 0.1);
  const onPressPlus = () => volume < 1 && setVolume(volume + 0.1);

  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const onPressLeft = () => {
    setLeft(!left);
    setRight(false);
  };
  const onPressRight = () => {
    setLeft(false);
    setRight(!right);
  };

  const [muted, setMuted] = useState(false);

  const toggleMuted = () => setMuted(!muted);

  useEffect(() => {
    Superpowered.setTrackVolume(
      index,
      muted || right ? 0 : volume,
      muted || left ? 0 : volume
    );
  }, [index, left, muted, right, volume]);

  const styles = useStyles();

  return (
    <View style={[muted && styles.muted]}>
      <TouchableOpacity onPress={toggleMuted} style={styles.container}>
        <Icon name={muted ? 'volume-mute' : 'volume-high'} size={18} />
        <Text type={'labelLarge'} style={styles.name}>
          {name}
        </Text>
        {control === 'panning' ? (
          <TrackControl
            left={{ label: 'L', onPress: onPressLeft, value: left }}
            right={{ label: 'R', onPress: onPressRight, value: right }}
          />
        ) : (
          <TrackControl
            left={{ label: '-', onPress: onPressMinus, value: volume > 0 }}
            right={{ label: '+', onPress: onPressPlus, value: volume < 1 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Track;
