#include <jni.h>
#include <string>
#include <Superpowered.h>
#include <SuperpoweredAdvancedAudioPlayer.h>
#include "MultiTracksPlayer.h"

MultiTracksPlayer *multiTracksPlayer = nullptr;

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_setup(
  JNIEnv __unused *env,
  jobject __unused thiz,
  jstring license_key,
  jboolean enable_audio_analysis,
  jboolean enable_fftand_frequency_domain,
  jboolean enable_audio_time_stretching,
  jboolean enable_audio_effects,
  jboolean enable_audio_player_and_decoder,
  jboolean enable_cryptographics,
  jboolean enable_networking
) {
  const char *license_key_char = env->GetStringUTFChars(license_key, JNI_FALSE);
  Superpowered::Initialize(
    license_key_char,
    static_cast<bool>(enable_audio_analysis),
    static_cast<bool>(enable_fftand_frequency_domain),
    static_cast<bool>(enable_audio_time_stretching),
    static_cast<bool>(enable_audio_effects),
    static_cast<bool>(enable_audio_player_and_decoder),
    static_cast<bool>(enable_cryptographics),
    static_cast<bool>(enable_networking)
  );
  env->ReleaseStringUTFChars(license_key, license_key_char);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_initialize(
  JNIEnv *env,
  jobject __unused thiz,
  jint sample_rate,
  jint buffer_size,
  jstring temp_dir
) {
  const char *path = env->GetStringUTFChars(temp_dir, JNI_FALSE);
  Superpowered::AdvancedAudioPlayer::setTempFolder(path);
  env->ReleaseStringUTFChars(temp_dir, path);

  multiTracksPlayer = new MultiTracksPlayer(sample_rate, buffer_size);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_onBackground(
  JNIEnv __unused *env,
  jobject __unused thiz
) {
  MultiTracksPlayer::onBackground();
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_onForeground(
  JNIEnv __unused *env,
  jobject __unused thiz
) {
  MultiTracksPlayer::onForeground();
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_setTracks(
  JNIEnv *env,
  jobject __unused thiz,
  jobjectArray paths,
  jint amount
) {
  if (multiTracksPlayer == nullptr) return;

  const char *tracksPathRaw[amount];
  for (int i = 0; i < amount; i++) {
    auto tracksPath = (jstring) (env->GetObjectArrayElement(paths, i));
    tracksPathRaw[i] = env->GetStringUTFChars(tracksPath, JNI_FALSE);
  }

  multiTracksPlayer->setTracks(tracksPathRaw, amount);

  for (int i = 0; i < amount; i++) {
    auto tracksPath = (jstring) (env->GetObjectArrayElement(paths, 0));
    env->ReleaseStringUTFChars(tracksPath, tracksPathRaw[i]);
  }
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_destroy(
  JNIEnv __unused *env,
  jobject __unused thiz
) {
  delete multiTracksPlayer;
}
extern "C"
JNIEXPORT jint JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_getTrackBufferedPercent(
  JNIEnv __unused *env,
  jobject __unused thiz,
  jint index
) {
  if (multiTracksPlayer == nullptr) return 0;
  return multiTracksPlayer->getTrackBufferedPercent(index);
}

extern "C"
JNIEXPORT jint JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_getBufferedPercent(
  JNIEnv __unused *env,
  jobject __unused thiz
) {
  if (multiTracksPlayer == nullptr) return 0;
  return multiTracksPlayer->getBufferedPercent();
}

extern "C"
JNIEXPORT jint JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_getDisplayPositionMs(
  JNIEnv __unused *env,
  jobject __unused thiz
) {
  if (multiTracksPlayer == nullptr) return 0;
  return multiTracksPlayer->getDisplayPositionMs();
}

extern "C"
JNIEXPORT jint JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_getDurationMs(
  JNIEnv __unused *env,
  jobject __unused thiz,
  jstring path
) {
  auto pathRaw = env->GetStringUTFChars(path, JNI_FALSE);
  auto duration = Track::getDurationMs(pathRaw);

  env->ReleaseStringUTFChars(path, pathRaw);

  return duration;
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_setPosition(
  JNIEnv __unused *env,
  jobject __unused thiz,
  jdouble ms,
  jboolean and_stop
) {
  if (multiTracksPlayer == nullptr) return;
  multiTracksPlayer->setPosition(ms, and_stop);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_play(
  JNIEnv __unused *env,
  jobject __unused thiz
) {
  if (multiTracksPlayer == nullptr) return;
  multiTracksPlayer->play();
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_pause(
  JNIEnv __unused *env,
  jobject __unused thiz
) {
  if (multiTracksPlayer == nullptr) return;
  multiTracksPlayer->pause();
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_setTrackVolume(
  JNIEnv __unused *env,
  jobject __unused thiz,
  jint index,
  jfloat left,
  jfloat right
) {
  if (multiTracksPlayer == nullptr) return;
  multiTracksPlayer->setTrackVolume(index, left, right);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_setVolume(
  JNIEnv __unused *env,
  jobject __unused thiz,
  jfloat value
) {
  if (multiTracksPlayer == nullptr) return;
  multiTracksPlayer->setVolume(value);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_setRate(
  JNIEnv __unused *env,
  jobject __unused thiz,
  jfloat rate
) {
  if (multiTracksPlayer == nullptr) return;
  multiTracksPlayer->setRate(rate);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_setPitchShiftCents(
  JNIEnv __unused *env,
  jobject __unused thiz,
  jint pitch_shift_cents
) {
  if (multiTracksPlayer == nullptr) return;
  multiTracksPlayer->setPitchShiftCents(pitch_shift_cents);
}

