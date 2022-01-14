import { useCallback, useEffect } from 'react';
import { AppState, AppStateStatus, Platform } from 'react-native';

import Superpowered from './Superpowered';

const isAndroid = Platform.OS === 'android';

const listener = (state: AppStateStatus) =>
  state === 'active'
    ? Superpowered.onForeground()
    : Superpowered.onBackground();

type UseSuperpowered = {
  licenseKey: string;
  enableAudioAnalysis?: boolean;
  enableFFTAndFrequencyDomain?: boolean;
  enableAudioTimeStretching?: boolean;
  enableAudioEffects?: boolean;
  enableAudioPlayerAndDecoder?: boolean;
  enableCryptographics?: boolean;
  enableNetworking?: boolean;
};

const useSuperpowered = ({
  licenseKey,
  enableAudioAnalysis = false,
  enableFFTAndFrequencyDomain = false,
  enableAudioTimeStretching = false,
  enableAudioEffects = false,
  enableAudioPlayerAndDecoder = false,
  enableCryptographics = false,
  enableNetworking = false,
}: UseSuperpowered) => {
  useEffect(() => {
    Superpowered.initialize(
      licenseKey,
      enableAudioAnalysis,
      enableFFTAndFrequencyDomain,
      enableAudioTimeStretching,
      enableAudioEffects,
      enableAudioPlayerAndDecoder,
      enableCryptographics,
      enableNetworking
    );

    return Superpowered.destroy;
  }, [
    enableAudioAnalysis,
    enableAudioEffects,
    enableAudioPlayerAndDecoder,
    enableAudioTimeStretching,
    enableCryptographics,
    enableFFTAndFrequencyDomain,
    enableNetworking,
    licenseKey,
  ]);

  const saveBatteryInBackground = useCallback(() => {
    AppState.addEventListener('change', listener);
    return () => AppState.removeEventListener('change', listener);
  }, []);

  useEffect((): (() => void) | void => {
    if (isAndroid) return saveBatteryInBackground();
  }, [saveBatteryInBackground]);
};

export default useSuperpowered;
