import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { Dimensions, View, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Calculate the best camera aspect ratio for the device
const calculateAspectRatio = () => {
  // Common camera aspect ratios
  const commonRatios = ['4:3', '16:9'];
  const deviceRatio = windowWidth / windowHeight;

  // Find the aspect ratio that is closest to the device ratio
  return commonRatios.reduce((prev, curr) =>
    Math.abs(curr - deviceRatio) < Math.abs(prev - deviceRatio) ? curr : prev
  );
};

const FocusLines = () => (
  <View style={styles.focusLinesContainer}>
    <View style={[styles.focusCorner, styles.topLeftCorner]} />
    <View style={[styles.focusCorner, styles.topRightCorner]} />
    <View style={[styles.focusCorner, styles.bottomLeftCorner]} />
    <View style={[styles.focusCorner, styles.bottomRightCorner]} />
  </View>
);

const CameraView = React.forwardRef(
  ({ onBarCodeScanned, torchEnabled, scanned, showLines }, ref) => {
    const [aspectRatio, setAspectRatio] = useState(calculateAspectRatio());

    useEffect(() => {
      const updateAspectRatio = () => {
        setAspectRatio(calculateAspectRatio());
      };

      Dimensions.addEventListener('change', updateAspectRatio);
      return () => Dimensions.removeEventListener('change', updateAspectRatio);
    }, []);

    return (
      <View style={styles.container}>
        <Camera
          ref={ref}
          onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
          flashMode={
            torchEnabled
              ? Camera.Constants.FlashMode.torch
              : Camera.Constants.FlashMode.off
          }
          style={styles.cameraStyle}
          ratio={aspectRatio}
        />
        {showLines && <FocusLines />}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  focusLinesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  focusCorner: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
  topLeftCorner: {
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  topRightCorner: {
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
    right: '50%',
    top: '50%',
    transform: [{ translateX: 100 }, { translateY: -100 }],
  },
  bottomLeftCorner: {
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: 'white',
    left: '50%',
    bottom: '50%',
    transform: [{ translateX: -100 }, { translateY: 100 }],
  },
  bottomRightCorner: {
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: 'white',
    right: '50%',
    bottom: '50%',
    transform: [{ translateX: 100 }, { translateY: 100 }],
  },
});

export default CameraView;
