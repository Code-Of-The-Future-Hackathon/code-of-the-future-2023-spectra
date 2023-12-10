import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Profile = () => (
  <View style={styles.container}>
    <View style={styles.circularImageContainer}>
      <Image
        style={styles.circularImage}
        source={require('../../../assets/images/profile.png')}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 72,
  },
  circularImageContainer: {
    width: 80, // Adjust as needed
    height: 80, // Adjust as needed
    borderRadius: 40, // Half of the width and height to create a perfect circle
    overflow: 'hidden', // Clip the image to the border-radius
  },
  circularImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the entire container
  },
});

export default Profile;
