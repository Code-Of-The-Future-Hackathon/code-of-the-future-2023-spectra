import React from 'react';
import { StyleSheet, Animated, Text } from 'react-native';
import LottieView from 'lottie-react-native';

const AnimationView = ({
  cameraMode,
  overlayAnim,
  barcodeAnimationRef,
  leavesAnimationRef,
}) => {
  <Animated.View
    style={[styles.overlay, { transform: [{ translateX: overlayAnim }] }]}
  >
    {cameraMode === 'barcode' ? (
      <LottieView
        ref={barcodeAnimationRef}
        style={{ width: 300, height: 300 }}
        source={require('../../../assets/animations/medicine.gif')}
        loop
      />
    ) : (
      <LottieView
        ref={leavesAnimationRef}
        style={{ width: 300, height: 300 }}
        source={require('../../../assets/animations/barcode.gif')}
        loop
      />
    )}
    <Text style={styles.overlayText}>
      {`Сменяне на камерата в режим: ${
        cameraMode === 'barcode' ? 'barcode' : 'natural'
      }`}
    </Text>
  </Animated.View>;
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  overlayText: {
    color: 'white',
    fontSize: 24,
  },
});

export default AnimationView;
