#import "SuperpoweredSdk.h"
#import "react-native-superpowered-sdk.h"

@implementation SuperpoweredSdk {
   MultiTracksPlayer *_multiTracksPlayer;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(initialize:
   (NSString *) licenseKey enableAudioAnalysis:
   (BOOL *) enableAudioAnalysis enableFFTAndFrequencyDomain:
   (BOOL *) enableFFTAndFrequencyDomain enableAudioTimeStretching:
   (BOOL *) enableAudioTimeStretching enableAudioEffects:
   (BOOL *) enableAudioEffects enableAudioPlayerAndDecoder:
   (BOOL *) enableAudioPlayerAndDecoder enableCryptographics:
   (BOOL *) enableCryptographics enableNetworking:
   (BOOL *) enableNetworking resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   Superpowered::Initialize(
           [licenseKey UTF8String],
           (bool) enableAudioAnalysis,
           (bool) enableFFTAndFrequencyDomain,
           (bool) enableAudioTimeStretching,
           (bool) enableAudioEffects,
           (bool) enableAudioPlayerAndDecoder,
           (bool) enableCryptographics,
           (bool) enableNetworking
   );

   _multiTracksPlayer = [[MultiTracksPlayer alloc] init];
}

RCT_EXPORT_METHOD(setTracks:
   (NSArray *) tracksPaths resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   [_multiTracksPlayer setTracks:tracksPaths];
}

RCT_EXPORT_METHOD(destroy:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   _multiTracksPlayer = nil;
}

RCT_EXPORT_METHOD(getTrackBufferedPercent:
   (NSInteger) index resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   auto trackBufferedPercent = (int) [_multiTracksPlayer getTrackBufferedPercent:(unsigned int) index];

   resolve(@(trackBufferedPercent));
}

RCT_EXPORT_METHOD(getBufferedPercent:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   auto bufferedPercent = (int) [_multiTracksPlayer getBufferedPercent];

   resolve(@(bufferedPercent));
}

RCT_EXPORT_METHOD(getDisplayPositionMs:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   auto displayPositionMs = (int) [_multiTracksPlayer getDisplayPositionMs];

   resolve(@(displayPositionMs));
}

RCT_EXPORT_METHOD(getDurationMs:
   (NSString *) path resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   auto durationMs = (int) [Track getDurationMs:path];

   resolve(@(durationMs));
}

RCT_EXPORT_METHOD(setPosition:
   (double) second andStop:
   (BOOL) andStop resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   [_multiTracksPlayer setPosition:second andStop:andStop];
}

RCT_EXPORT_METHOD(play) {
   [_multiTracksPlayer play];
}

RCT_EXPORT_METHOD(pause) {
   [_multiTracksPlayer pause];
}

RCT_EXPORT_METHOD(setTrackVolume:
   (NSInteger) index left:
   (float) left right:
   (float) right resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   [_multiTracksPlayer setTrackVolume:(unsigned int) index left:left right:right];
}

RCT_EXPORT_METHOD(setVolume:
   (float) value resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   [_multiTracksPlayer setVolume:value];
}

RCT_EXPORT_METHOD(setRate:
   (double) rate resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   [_multiTracksPlayer setRate:rate];
}

RCT_EXPORT_METHOD(setPitchShiftCents:
   (int) pitchShiftCents resolve:
   (RCTPromiseResolveBlock) resolve reject:
   (RCTPromiseRejectBlock) reject) {
   [_multiTracksPlayer setPitchShiftCents:pitchShiftCents];
}

@end
