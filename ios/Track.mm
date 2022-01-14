#import "Track.h"

@implementation Track {
    Superpowered::AdvancedAudioPlayer *player;
}

+ (unsigned int)getDurationMs:(NSString *)path {
    auto player = new Superpowered::AdvancedAudioPlayer(44100, 0);
    player->open([path cStringUsingEncoding:NSUTF8StringEncoding]);

    usleep(50000);

    auto duration = player->getDurationMs();
    delete player;

    return duration;
}

- (id)init:(NSString *)path {
    self = [super init];

    player = new Superpowered::AdvancedAudioPlayer(44100, 0);
    player->open([path cStringUsingEncoding:NSUTF8StringEncoding]);

    _leftVolume = _rightVolume = 1;

    return self;
}

- (void)open:(NSString *)path {
    player->open([path cStringUsingEncoding:NSUTF8StringEncoding]);
}

- (bool)processStereo:(float *)buffer mix:(bool)mix numberOfFrames:(unsigned int)numberOfFrames volume:(float)volume {
    return player->processStereo(buffer, mix, numberOfFrames, volume);
}

- (bool)processLeft:(float *)buffer mix:(bool)mix numberOfFrames:(unsigned int)numberOfFrames {
    return [self processStereo:buffer mix:mix numberOfFrames:numberOfFrames volume:_leftVolume];
}

- (bool)processRight:(float *)buffer mix:(bool)mix numberOfFrames:(unsigned int)numberOfFrames {
    return [self processStereo:buffer mix:mix numberOfFrames:numberOfFrames volume:_rightVolume];
}

- (bool)processStereo:(float *)buffer mix:(bool)mix numberOfFrames:(unsigned int)numberOfFrames {
    return [self processLeft:buffer mix:mix numberOfFrames:numberOfFrames];
}

- (void)setVolume:(float)left volumeRight:(float)right {
    _leftVolume = left;
    _rightVolume = right;
}

- (float)getBufferedEndPercent {
    return player->getBufferedEndPercent();
}

- (double)getDisplayPositionMs {
    return player->getDisplayPositionMs();
}

- (void)setPosition:(double)ms andStop:(bool)andStop {
    player->setPosition(ms, andStop, true, false, true);
}

- (void)play {
    player->play();
}

- (void)playSynchronized {
    player->playSynchronized();
}

- (void)pause {
    player->pause();
}

- (void)setOutputSamplerate:(unsigned int)samplerate {
    player->outputSamplerate = samplerate;
}

- (void)setSyncMode:(Superpowered::SyncMode)syncMode {
    player->syncMode = syncMode;
}

- (void)setPlaybackRate:(double)rate {
    player->playbackRate = rate;
}

- (void)setPitchShiftCents:(int)pitchShiftCents {
    player->pitchShiftCents = pitchShiftCents;
}

@end
