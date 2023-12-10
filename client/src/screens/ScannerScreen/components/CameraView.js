import React from 'react';
import { Camera } from 'expo-camera';
import { Dimensions, View, StyleSheet } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FocusLines = () => (
  <View style={styles.focusLinesContainer}>
    <View style={[styles.focusCorner, styles.topLeftCorner]} />
    <View style={[styles.focusCorner, styles.topRightCorner]} />
    <View style={[styles.focusCorner, styles.bottomLeftCorner]} />
    <View style={[styles.focusCorner, styles.bottomRightCorner]} />
  </View>
);

const CameraView = React.forwardRef(
  ({ onBarCodeScanned, torchEnabled, scanned, showLines }, ref) => (
    <View style={styles.container}>
      <Camera
        ref={ref}
        onBarCodeScanned={scanned ? undefined : onBarCodeScanned}
        flashMode={
          torchEnabled
            ? Camera.Constants.FlashMode.torch
            : Camera.Constants.FlashMode.off
        }
        style={{
          width: windowWidth,
          height: windowHeight,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        ratio="16:9"
      />
      {showLines && <FocusLines />}
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
    width: 50, // Width of the corner piece
    height: 50, // Height of the corner piece
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
