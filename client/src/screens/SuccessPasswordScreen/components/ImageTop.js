import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const ImageTop = () => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../../../assets/images/icon.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%', // Take up the full width of the screen
    overflow: 'hidden',
    marginTop: 70,
  },
  image: {
    width: '100%', // Adjust the width as needed
    aspectRatio: 3 / 4, // Adjust the aspect ratio as needed
    resizeMode: 'contain', // Use 'contain' to display the entire image
  },
});
