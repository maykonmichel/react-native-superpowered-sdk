#import <Foundation/Foundation.h>

#import "Superpowered.h"
#import "SuperpoweredAdvancedAudioPlayer.h"

@interface Track : NSObject

@property(nonatomic) float leftVolume;
@property(nonatomic) float rightVolume;

+ (unsigned int)getDurationMs:(NSString *)path;

- (id)init:(NSString *)path;

- (void)open:(NSString *)path;

- (bool)processStereo:(float *)buffer mix:(bool)mixed numberOfFrames:(unsigned int)numberOfFrames volume:(float)volume;

- (bool)processLeft:(float *)buffer mix:(bool)mixed numberOfFrames:(unsigned int)numberOfFrames;

- (bool)processRight:(float *)buffer mix:(bool)mixed numberOfFrames:(unsigned int)numberOfFrames;

- (bool)processStereo:(float *)buffer mix:(bool)mixed numberOfFrames:(unsigned int)numberOfFrames;

- (void)setVolume:(float)left volumeRight:(float)right;

- (float)getBufferedEndPercent;

- (double)getDisplayPositionMs;

- (void)setPosition:(double)ms andStop:(bool)andStop;

- (void)play;

- (void)playSynchronized;

- (void)pause;

- (void)setOutputSamplerate:(unsigned int)samplerate;

- (void)setSyncMode:(Superpowered::SyncMode)syncMode;

- (void)setPlaybackRate:(double)rate;

- (void)setPitchShiftCents:(int)pitchShiftCents;

@end
