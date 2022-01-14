cmake_minimum_required(VERSION 3.4.1)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 11)

add_library(
        cpp
        SHARED
        cpp-adapter.cpp
        ${PATH_TO_SUPERPOWERED}/OpenSource/SuperpoweredAndroidAudioIO.cpp
)

target_link_libraries(
        cpp
        log
        android
        OpenSLES
        ${PATH_TO_SUPERPOWERED}/libSuperpoweredAndroid${ANDROID_ABI}.a
)

include_directories(
        ../cpp
        ../superpowered
)
