import React, { useState, VFC } from 'react';
import { FlatList, ListRenderItem, SafeAreaView, View } from 'react-native';

import { Button } from '../../atoms';
import { Footer, Track } from '../../organisms';

import styles from './styles';
import useTracks from './useTracks';

const Player: VFC = () => {
  const [control, setControl] = useState<'panning' | 'volume'>('panning');

  const tracks = useTracks();

  const renderTrack: ListRenderItem<string> = ({ index, item }) => (
    <Track name={item} index={index} control={control} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button
          title={'Panning'}
          onPress={() => setControl('panning')}
          variant={control === 'panning' ? 'filled' : 'tonal'}
          style={styles.control}
        />
        <Button
          title={'Volume'}
          onPress={() => setControl('volume')}
          variant={control === 'volume' ? 'filled' : 'tonal'}
          style={styles.control}
        />
      </View>
      <FlatList data={tracks} renderItem={renderTrack} />
      <Footer />
    </SafeAreaView>
  );
};

export default Player;
