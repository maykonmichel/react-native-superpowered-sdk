#include <cstdlib>
#include <vector>
#include <OpenSource/SuperpoweredAndroidAudioIO.h>
#include <SLES/OpenSLES.h>
#include <SLES/OpenSLES_AndroidConfiguration.h>
#include <SuperpoweredAdvancedAudioPlayer.h>
#include <SuperpoweredSimple.h>
#include <SuperpoweredCPU.h>
#include <SuperpoweredMixer.h>
#include <SuperpoweredTimeStretching.h>
#include <android/log.h>
#include "Track.h"

class MultiTracksPlayer {
public:
  static void onBackground();

  static void onForeground();

  MultiTracksPlayer(int samplerate, int buffersize);

  ~MultiTracksPlayer();

  void setTracks(const char **paths, int amount);

  bool process(short *output, unsigned int numberOfFrames, unsigned int samplerate);

  float getTrackBufferedPercent(unsigned int index);

  float getBufferedPercent();

  double getDisplayPositionMs();

  void setPosition(double ms, bool andStop);

  void play();

  void pause();

  void setTrackVolume(int index, float left, float right);

  void setVolume(float value);

  void setRate(float rate);

  void setPitchShiftCents(int pitchShiftCents);

private:
  static SuperpoweredAndroidAudioIO *_audioIO;
  Superpowered::StereoMixer *_stereoMixer;
  std::vector<Track *> _tracks;
};
