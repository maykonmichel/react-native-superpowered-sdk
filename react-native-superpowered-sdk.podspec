require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-superpowered-sdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "10.0" }
  s.source       = { :git => "https://github.com/maykonmichel/react-native-superpowered-sdk.git", :tag => "#{s.version}" }


  s.source_files = "ios/**/*.{h,m,mm}", "cpp/**/*.{h,cpp}", "superpowered/*.{cpp,mm,h}"


  s.ios.deployment_target = '9.0'
  s.ios.source_files = 'superpowered/OpenSource/SuperpoweredIOSAudioIO.h', 'superpowered/OpenSource/SuperpoweredIOSAudioIO.mm'
  s.ios.framework = 'Foundation', 'AVFoundation', 'AudioToolbox', 'CoreAudio', 'CoreMedia', 'UIKit'
  s.ios.vendored_libraries = 'superpowered/libSuperpoweredAudioIOS.a'


  s.dependency "React-Core"
end
