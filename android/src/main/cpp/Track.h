#include <unistd.h>
#include <SuperpoweredAdvancedAudioPlayer.h>

class Track : public Superpowered::AdvancedAudioPlayer {
public:
  static int getDurationMs(const char *path);

  Track(const char *path);

  bool processLeft(float *buffer, bool mix, unsigned int numberOfFrames);

  bool processRight(float *buffer, bool mix, unsigned int numberOfFrames);

  bool processStereo(float *buffer, bool mix, unsigned int numberOfFrames);

  void setVolume(float left, float right);

  float leftVolume;
  float rightVolume;

  static int samplerate;
};
