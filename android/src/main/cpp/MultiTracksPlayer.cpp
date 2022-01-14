#include "MultiTracksPlayer.h"

SuperpoweredAndroidAudioIO *MultiTracksPlayer::_audioIO;

void MultiTracksPlayer::onBackground() {
  _audioIO->onBackground();
}

void MultiTracksPlayer::onForeground() {
  _audioIO->onForeground();
}

static bool audioProcessing(
  void *__unused clientdata,
  short int *audioIO,
  int numFrames,
  int samplerate
) {
  return ((MultiTracksPlayer *) clientdata)
    ->process(audioIO, (unsigned int) numFrames, (unsigned int) samplerate);
}

MultiTracksPlayer::MultiTracksPlayer(int samplerate, int buffersize) {
  Track::samplerate = samplerate;

  _stereoMixer = new Superpowered::StereoMixer();
  _stereoMixer->inputGain[1] = _stereoMixer->inputGain[2] = 0;

  _audioIO = new SuperpoweredAndroidAudioIO(
    samplerate,
    buffersize,
    false,
    true,
    audioProcessing,
    this,
    -1,
    SL_ANDROID_STREAM_MEDIA
  );
}

MultiTracksPlayer::~MultiTracksPlayer() {
  delete _audioIO;

  for (auto iterator = _tracks.rbegin(); iterator != _tracks.rend(); iterator++) {
    auto track = *iterator;
    delete track;
    _tracks.pop_back();
  }
}

bool MultiTracksPlayer::process(
  short int *output,
  unsigned int numberOfFrames,
  unsigned int samplerate
) {
  for (auto track : _tracks) {
    track->outputSamplerate = samplerate;
    track->syncMode = Superpowered::SyncMode_TempoAndBeat;
  }

  float buffer[3][numberOfFrames * 8 + 64];
  bool silence[3];

  silence[0] = silence[1] = silence[2] = true;

  for (auto track : _tracks) {
    auto hasLeftVolume = track->leftVolume > 0;
    auto hasRightVolume = track->rightVolume > 0;
    auto hasBothVolumes = hasLeftVolume && hasRightVolume;

    if (hasBothVolumes) {
      if (track->processStereo(buffer[2], !silence[2], numberOfFrames))
        silence[2] = false;
    } else if (hasRightVolume) {
      if (track->processRight(buffer[1], !silence[1], numberOfFrames))
        silence[1] = false;
    } else if (track->processLeft(buffer[0], !silence[0], numberOfFrames)) {
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

  if (!silence[0])
    Superpowered::FloatToShortInt(buffer[0], output, numberOfFrames);
  return !silence[0];
}

void MultiTracksPlayer::setTracks(const char **paths, int amount) {
  int i;

  for (i = 0; i < amount && i < _tracks.size(); i++)
    _tracks[i]->open(paths[i]);

  for (; i < amount; i++)
    _tracks.push_back(new Track(paths[i]));

  for (auto it = _tracks.rbegin(); it != _tracks.rend() && _tracks.size() != amount; it++) {
    auto track = *it;
    delete track;
    _tracks.pop_back();
  }
}

float MultiTracksPlayer::getTrackBufferedPercent(unsigned int index) {
  try {
    return _tracks.at(index)->getBufferedEndPercent() * 100;
  } catch (std::out_of_range &outOfRange) {
    return 0;
  }
}

float MultiTracksPlayer::getBufferedPercent() {
  float bufferedPercent = 0.0f;

  for (auto track : _tracks) bufferedPercent += track->getBufferedEndPercent();

  return bufferedPercent / _tracks.size() * 100;
}

double MultiTracksPlayer::getDisplayPositionMs() {
  return _tracks.front()->getDisplayPositionMs();
}

void MultiTracksPlayer::setPosition(double ms, bool andStop) {
  for (auto track : _tracks)
    track->setPosition(ms, andStop, true, false, true);
}

void MultiTracksPlayer::play() {
  for (auto track : _tracks) {
    if (track == _tracks.front()) track->play();
    else track->playSynchronized();
  }

  Superpowered::CPU::setSustainedPerformanceMode(true);
}

void MultiTracksPlayer::pause() {
  for (auto track : _tracks) track->pause();

  Superpowered::CPU::setSustainedPerformanceMode(false);
}

void MultiTracksPlayer::setTrackVolume(int index, float left, float right) {
  _tracks.at(index)->setVolume(left, right);
}

void MultiTracksPlayer::setVolume(float value) {
  _stereoMixer->outputGain[0] = _stereoMixer->outputGain[1] = value;
}

void MultiTracksPlayer::setRate(float rate) {
  for (auto track : _tracks) track->playbackRate = rate;
}

void MultiTracksPlayer::setPitchShiftCents(int pitchShiftCents) {
  for (auto track : _tracks) track->pitchShiftCents = pitchShiftCents;
}
