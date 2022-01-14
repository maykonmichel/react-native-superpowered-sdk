import React, { useEffect } from 'react';

import { Button } from 'react-native';
import Superpowered, { useSuperpowered } from 'react-native-superpowered-sdk';

const tracksURIs = [
  'https://www.mboxdrive.com/Vocals.mp3',
  'https://www.mboxdrive.com/Guitars.mp3',
  'https://www.mboxdrive.com/Drums.mp3',
  'https://www.mboxdrive.com/Keyboards.mp3',
  'https://www.mboxdrive.com/Effects.mp3',
];

export default function App() {
  useSuperpowered({
    licenseKey: 'ExampleLicenseKey-WillExpire-OnNextUpdate',
    enableAudioAnalysis: false,
    enableFFTAndFrequencyDomain: false,
    enableAudioTimeStretching: false,
    enableAudioEffects: true,
    enableAudioPlayerAndDecoder: true,
    enableCryptographics: false,
    enableNetworking: true,
  });

  useEffect(() => {
    Superpowered.setTracks(tracksURIs);
  }, []);

  return <Button onPress={() => Superpowered.play()} title={'Play'} />;
}
