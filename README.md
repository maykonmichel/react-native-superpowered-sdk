# react-native-superpowered-sdk

Superpowered React Native integration

## Installation

```sh
yarn add react-native-superpowered-sdk
```

## Usage

```js
import { useSuperpowered } from 'react-native-superpowered-sdk';

// ...

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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
