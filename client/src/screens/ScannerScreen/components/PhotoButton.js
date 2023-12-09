import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const PhotoButton = ({ takePicture }) => (
  <View style={styles.takePhotoContainer}>
    <TouchableOpacity style={styles.outerCircle} onPress={takePicture}>
      <View style={styles.takePhotoButton}></View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  takePhotoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 150,
  },
  takePhotoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Inner circle (shutter) color
    borderRadius: 30, // To make it round
    width: 60, // Diameter of the inner circle
    height: 60, // Diameter of the inner circle
    borderWidth: 2, // Width of the border circle
    borderColor: 'white', // Color of the border circle
    // Add shadow if you like to give depth, similar to the real camera button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent background
    borderRadius: 35, // To make it round
    width: 70, // Diameter of the outer circle
    height: 70, // Diameter of the outer circle
    borderWidth: 3, // Width of the border of the outer circle
    borderColor: 'white', // Color of the border of the outer circle
    position: 'absolute', // Position it over the inner circle
  },
});

export default PhotoButton;
