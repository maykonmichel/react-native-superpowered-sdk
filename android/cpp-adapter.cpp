#include <jni.h>
#include "react-native-superpowered-sdk.h"

extern "C"
JNIEXPORT jint JNICALL
Java_com_reactnativesuperpoweredsdk_SuperpoweredSdkModule_nativeMultiply(JNIEnv *env, jclass type, jint a, jint b) {
    return example::multiply(a, b);
}
