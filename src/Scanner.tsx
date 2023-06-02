import 'react-native-reanimated'
import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react'
import {
  Camera,
  useCameraDevices,
  CameraDeviceFormat,
  sortFormats,
  frameRateIncluded,
  CameraRuntimeError,
  PhotoFile,
  VideoFile,
  useFrameProcessor,
} from 'react-native-vision-camera'
import {
  PinchGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import Reanimated, { useSharedValue } from 'react-native-reanimated'
import { View, StyleSheet } from 'react-native'
import { CaptureButton } from './CaptureButton'
import {
  BUTTON_SIZE,
  CONTENT_SPACING,
  SAFE_AREA_PADDING,
  MAX_ZOOM_FACTOR,
} from './constants'

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)
Reanimated.addWhitelistedNativeProps({
  zoom: true,
})

const Scanner = () => {
  // Camera Settings
  const camera = useRef<Camera>(null)
  const devices = useCameraDevices()
  const device = devices.back
  const fps = 30
  const zoom = useSharedValue(0)
  const minZoom = device?.minZoom ?? 1
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR)
  const isPressingButton = useSharedValue(false)

  const [isCameraInitialized, setIsCameraInitialized] = useState(false)

  const formats = useMemo<CameraDeviceFormat[]>(() => {
    if (device?.formats == null) {
      return []
    }
    return device.formats.sort(sortFormats)
  }, [device?.formats])

  // Handlers
  const requestCameraPermission = async () => {
    await Camera.requestCameraPermission()
  }

  const onInitialized = useCallback(() => {
    console.log('IT WORKS')
    setIsCameraInitialized(true)
  }, [])

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error('Error on camera: ', error)
  }, [])

  const onMediaCaptured = useCallback(
    (media: PhotoFile | VideoFile, type: 'photo' | 'video') => {
      console.log(`Media captured! ${JSON.stringify(media)}`)
    },
    []
  )

  const setIsPressingButton = useCallback(
    (_isPressingButton: boolean) => {
      isPressingButton.value = _isPressingButton
    },
    [isPressingButton]
  )

  const format = useMemo(() => {
    let result = formats
    // find the first format that includes the given FPS
    return result.find(f =>
      f.frameRateRanges.some(r => frameRateIncluded(r, fps))
    )
  }, [formats])

  const frameProcessor = useFrameProcessor(frame => {
    'worklet'
    // TODO Frame NATIVE PROCESOR
  }, [])

  useEffect(() => {
    requestCameraPermission()
  }, [])

  return (
    <View style={styles.container}>
      {device && device !== null && (
        <PinchGestureHandler onGestureEvent={() => {}} enabled>
          <Reanimated.View style={StyleSheet.absoluteFill}>
            <TapGestureHandler numberOfTaps={2}>
              <ReanimatedCamera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                format={format}
                isActive // TEST
                onInitialized={onInitialized}
                onError={onError}
                enableZoomGesture={false}
                photo
                frameProcessor={frameProcessor}
                orientation="portrait"
                frameProcessorFps={1}
                // onFrameProcessorPerformanceSuggestionAvailable={onFrameProcessorSuggestionAvailable}
              />
            </TapGestureHandler>
          </Reanimated.View>
        </PinchGestureHandler>
      )}
      <CaptureButton
        style={styles.captureButton}
        camera={camera}
        onMediaCaptured={onMediaCaptured}
        cameraZoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        flash="off"
        enabled={isCameraInitialized}
        setIsPressingButton={setIsPressingButton}
      />
    </View>
  )
}

export default Scanner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: SAFE_AREA_PADDING.paddingBottom,
  },
  button: {
    marginBottom: CONTENT_SPACING,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(140, 140, 140, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightButtonRow: {
    position: 'absolute',
    right: SAFE_AREA_PADDING.paddingRight,
    top: SAFE_AREA_PADDING.paddingTop,
  },
  text: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
