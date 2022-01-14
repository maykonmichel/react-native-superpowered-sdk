import { NativeModules, Platform } from 'react-native';

type SuperpoweredType = {
  destroy(): void;
  getBufferedPercent(): Promise<number>;
  getDisplayPositionMs(): Promise<number>;
  getDurationMs(path: string): Promise<number>;
  getTrackBufferedPercent(index: number): Promise<number>;
  initialize(
    licenseKey: string,
    enableAudioAnalysis: boolean,
    enableFFTAndFrequencyDomain: boolean,
    enableAudioTimeStretching: boolean,
    enableAudioEffects: boolean,
    enableAudioPlayerAndDecoder: boolean,
    enableCryptographics: boolean,
    enableNetworking: boolean
  ): void;
  onBackground(): void;
  onForeground(): void;
  pause(): void;
  play(): void;
  setPitchShiftCents(pitchShiftCents: number): void;
  setPosition(ms: number, andStop: boolean): void;
  setRate(rate: number): void;
  setTracks(tracksURIs: string[]): void;
  setTrackVolume(index: number, left: number, right: number): void;
  setVolume(value: number): void;
};

const { SuperpoweredSdk } = NativeModules;

const LINKING_ERROR =
  `The package 'react-native-superpowered-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const Superpowered: SuperpoweredType = SuperpoweredSdk
  ? SuperpoweredSdk
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default Superpowered;
