import { useEffect } from 'react';
import Superpowered, { useSuperpowered } from 'react-native-superpowered-sdk';

const tracks = ['Vocals', 'Guitars', 'Drums', 'Keyboards', 'Effects'];

const API_URI = 'https://www.mboxdrive.com';

const tracksURIs = tracks.map((track) => `${API_URI}/${track}.mp3`);

export default () => {
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

  return tracks;
};
