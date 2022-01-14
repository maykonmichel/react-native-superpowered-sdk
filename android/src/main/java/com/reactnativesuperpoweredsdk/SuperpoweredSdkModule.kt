package com.reactnativesuperpoweredsdk

import android.content.Context
import android.media.AudioManager
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.*
import java.util.*

class SuperpoweredSdkModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "SuperpoweredSdk"
  }

  @RequiresApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
  @ReactMethod
  private fun initialize(
    licenseKey: String,
    enableAudioAnalysis: Boolean,
    enableFFTAndFrequencyDomain: Boolean,
    enableAudioTimeStretching: Boolean,
    enableAudioEffects: Boolean,
    enableAudioPlayerAndDecoder: Boolean,
    enableCryptographics: Boolean,
    enableNetworking: Boolean) {
    setup(
      licenseKey,
      enableAudioAnalysis,
      enableFFTAndFrequencyDomain,
      enableAudioTimeStretching,
      enableAudioEffects,
      enableAudioPlayerAndDecoder,
      enableCryptographics,
      enableNetworking
    )

    val audioManager = Objects.requireNonNull(currentActivity)
      ?.getSystemService(Context.AUDIO_SERVICE) as AudioManager
    val sampleRateString = audioManager.getProperty(AudioManager.PROPERTY_OUTPUT_SAMPLE_RATE)
    val bufferSizeString = audioManager.getProperty(AudioManager.PROPERTY_OUTPUT_FRAMES_PER_BUFFER)
    val sampleRate = sampleRateString?.toInt() ?: 4800
    val bufferSize = bufferSizeString?.toInt() ?: 480

    val tempDir = currentActivity!!.cacheDir.absolutePath

    initialize(
      sampleRate,
      bufferSize,
      tempDir
    )
  }

  private external fun setup(
    licenseKey: String,
    enableAudioAnalysis: Boolean,
    enableFFTAndFrequencyDomain: Boolean,
    enableAudioTimeStretching: Boolean,
    enableAudioEffects: Boolean,
    enableAudioPlayerAndDecoder: Boolean,
    enableCryptographics: Boolean,
    enableNetworking: Boolean
  )

  private external fun initialize(
    sampleRate: Int,
    bufferSize: Int,
    tempDir: String
  )

  @ReactMethod
  private external fun onBackground()

  @ReactMethod
  private external fun onForeground()

  @ReactMethod
  private fun setTracks(tracksPaths: ReadableArray) {
    val paths = tracksPaths.toArrayList().toArray()
    val amount = tracksPaths.size()

    setTracks(
      paths,
      amount
    )
  }

  private external fun setTracks(
    paths: Array<Any>?,
    amount: Int
  )

  @ReactMethod
  private external fun destroy()

  @ReactMethod
  private fun getTrackBufferedPercent(index: Int, promise: Promise) {
    promise.resolve(getTrackBufferedPercent(index))
  }

  private external fun getTrackBufferedPercent(index: Int): Int

  @ReactMethod
  private fun getBufferedPercent(promise: Promise) {
    promise.resolve(getBufferedPercent())
  }

  private external fun getBufferedPercent(): Int

  @ReactMethod
  private fun getDisplayPositionMs(promise: Promise) {
    promise.resolve(getDisplayPositionMs())
  }

  private external fun getDisplayPositionMs(): Int

  @ReactMethod
  private fun getDurationMs(path:String, promise: Promise) {
    promise.resolve(getDurationMs(path))
  }

  private external fun getDurationMs(path: String): Int

  @ReactMethod
  private external fun setPosition(ms: Double, andStop: Boolean)

  @ReactMethod
  private external fun pause()

  @ReactMethod
  private external fun play()

  @ReactMethod
  private external fun setTrackVolume(index: Int, left: Float, right: Float)

  @ReactMethod
  private external fun setVolume(value: Float)

  @ReactMethod
  private external fun setRate(rate: Float)

  @ReactMethod
  private external fun setPitchShiftCents(pitchShiftCents: Int)

  private companion object {
    init {
      System.loadLibrary("cpp")
    }
  }

}
