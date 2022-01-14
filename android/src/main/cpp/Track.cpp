#include "Track.h"

int Track::getDurationMs(const char *path) {
  auto player = new Superpowered::AdvancedAudioPlayer(44100, 0);
  player->open(path);

  usleep(5000);

  auto duration = player->getDurationMs();
  delete player;

  return duration;
}

int Track::samplerate;

Track::Track(const char *path) : AdvancedAudioPlayer(samplerate, 0) {
  leftVolume = rightVolume = 1.0f;
  open(path);
}

bool Track::processLeft(float *buffer, bool mix, unsigned int numberOfFrames) {
  return AdvancedAudioPlayer::processStereo(buffer, mix, numberOfFrames, leftVolume);
}

bool Track::processRight(float *buffer, bool mix, unsigned int numberOfFrames) {
  return AdvancedAudioPlayer::processStereo(buffer, mix, numberOfFrames, rightVolume);
}

bool Track::processStereo(float *buffer, bool mix, unsigned int numberOfFrames) {
  return processLeft(buffer, mix, numberOfFrames);
}

void Track::setVolume(float left, float right) {
  leftVolume = left;
  rightVolume = right;
}
