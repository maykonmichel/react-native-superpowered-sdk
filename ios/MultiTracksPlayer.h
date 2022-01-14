#import "SuperpoweredCPU.h"
#import "SuperpoweredIOSAudioIO.h"
#import "SuperpoweredMixer.h"
#import "SuperpoweredSimple.h"
#import "SuperpoweredTimeStretching.h"
#import "Track.h"

@interface MultiTracksPlayer : NSObject

- (id)init;

- (void)dealloc;

- (void)setTracks:(NSArray *)paths;

- (float)getTrackBufferedPercent:(unsigned int)index;

- (float)getBufferedPercent;

- (double)getDisplayPositionMs;

- (void)setPosition:(double)ms andStop:(bool)andStop;

- (void)play;

- (void)pause;

- (void)setTrackVolume:(unsigned int)index left:(float)left right:(float)right;

- (void)setVolume:(float)value;

- (void)setRate:(double)rate;

- (void)setPitchShiftCents:(int)pitchShiftCents;

@end
