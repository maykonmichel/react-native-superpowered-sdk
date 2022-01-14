
#import "MultiTracksPlayer.h"

@implementation MultiTracksPlayer {
    SuperpoweredIOSAudioIO *_audioIO;
    Superpowered::StereoMixer *_stereoMixer;
    NSArray *_tracks;
}

static bool audioProcessing(
        void *clientdata,
        __unused float **inputBuffers,
        __unused unsigned int inputChannels,
        __unused float **outputBuffers,
        __unused unsigned int outputChannels,
        __unused unsigned int numberOfFrames,
        unsigned int samplerate,
        __unused uint64_t hostTime
) {
    __unsafe_unretained MultiTracksPlayer *self = (__bridge MultiTracksPlayer *) clientdata;
    return [self audioProcessing:outputBuffers[0] right:outputBuffers[1] numFrames:numberOfFrames samplerate:samplerate];
}

- (id)init {
    self = [super init];

    Superpowered::AdvancedAudioPlayer::setTempFolder([NSTemporaryDirectory() cStringUsingEncoding:NSUTF8StringEncoding]);

    _tracks = @[];

    _stereoMixer = new Superpowered::StereoMixer();
    _stereoMixer->inputGain[1] = _stereoMixer->inputGain[2] = 0;

    _audioIO = [[SuperpoweredIOSAudioIO alloc] initWithDelegate:(id <SuperpoweredIOSAudioIODelegate>) self preferredBufferSize:12 preferredSamplerate:44100 audioSessionCategory:AVAudioSessionCategoryPlayback channels:2 audioProcessingCallback:audioProcessing clientdata:(__bridge void *) self];
    [_audioIO start];

    return self;
}

- (void)dealloc {
    [_audioIO stop];
}

- (void)setTracks:(NSArray *)paths {
    NSUInteger i = 0;
    auto amount = [paths count];
    NSMutableArray *tracks = (NSMutableArray *) [_tracks mutableCopy];

    for (; i < amount && i < [tracks count]; i++) {
        Track *track = tracks[i];
        NSString *path = paths[i];
        [track open:path];
    }

    for (NSString *path in paths) {
        Track *track = [[Track alloc] init:path];
        [tracks addObject:track];
    }

    while([tracks count] != amount) [tracks removeLastObject];

    _tracks = [tracks copy];
}

- (bool)audioProcessing:(float *)leftOutput right:(float *)rightOutput numFrames:(unsigned int)numberOfFrames samplerate:(unsigned int)samplerate {
    for (Track *track in _tracks) {
        [track setOutputSamplerate:samplerate];
        [track setSyncMode:Superpowered::SyncMode_TempoAndBeat];
    }

    float buffer[3][numberOfFrames * 8 + 64];
    bool silence[3];

    silence[0] = silence[1] = silence[2] = true;

    for (Track *track in _tracks) {
        const auto hasLeftVolume = track.leftVolume > 0;
        const auto hasRightVolume = track.rightVolume > 0;
        const auto hasBothVolumes = hasLeftVolume && hasRightVolume;

        if (hasBothVolumes) {
            if ([track processStereo:buffer[2] mix:!silence[2] numberOfFrames:numberOfFrames])
                silence[2] = false;
        } else if (hasRightVolume) {
            if ([track processRight:buffer[1] mix:!silence[1] numberOfFrames:numberOfFrames])
                silence[1] = false;
        } else if ([track processLeft:buffer[0] mix:!silence[0] numberOfFrames:numberOfFrames]) {
                silence[0] = false;
        }
    }

    _stereoMixer->process(
            silence[0] ? nullptr : buffer[0],
            silence[1] ? nullptr : buffer[1],
            silence[2] ? nullptr : buffer[2],
            nullptr,
            buffer[0],
            numberOfFrames
    );

    silence[0] &= silence[1] && silence[2];

    if (!silence[0]) Superpowered::DeInterleave(buffer[0], leftOutput, rightOutput, numberOfFrames);

    return !silence[0];
}

- (float)getTrackBufferedPercent:(unsigned int)index {
    return [_tracks[index] getBufferedEndPercent] * 100;
}

- (float)getBufferedPercent {
    float bufferedPercent = 0.0f;

    for (Track *track in _tracks) bufferedPercent += [track getBufferedEndPercent];

    return bufferedPercent / [_tracks count] * 100;
}

- (double)getDisplayPositionMs {
    Track *firstTrack = [_tracks firstObject];
    return [firstTrack getDisplayPositionMs];
}

- (void)setPosition:(double)ms andStop:(bool)andStop {
    for (Track *track in _tracks) [track setPosition:ms andStop:andStop];
}

- (void)play {
    for (Track *track in _tracks) {
        if (track == [_tracks firstObject]) [track play];
        else [track playSynchronized];
    }
}

- (void)pause {
    for (Track *track in _tracks) [track pause];
}

- (void)setTrackVolume:(unsigned int)index left:(float)left right:(float)right {
    [_tracks[index] setVolume:left volumeRight:right];
}

- (void)setVolume:(float)value {
    _stereoMixer->outputGain[0] = _stereoMixer->outputGain[1] = value;
}

- (void)setRate:(double)rate {
    for (Track *track in _tracks) [track setPlaybackRate:rate];
}

- (void)setPitchShiftCents:(int)pitchShiftCents {
    for (Track *track in _tracks) [track setPitchShiftCents:pitchShiftCents];
}

@end

