import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfilePicture = ({ imageUri }) => {
  let imageSource = imageUri;

  // If imageUri is a string, convert it to an object with a uri key
  if (typeof imageUri === 'string') {
    imageSource = { uri: imageUri };
  }

  // If imageUri is null or undefined, use a default image
  if (!imageUri) {
    imageSource = require('../../../assets/images/profile-set.png');
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.circularImage} source={imageSource} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  circularImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pencilContainer: {
    position: 'absolute',
    right: 110,
    top: 64,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: 10, // Add some padding to the pencil icon
  },
  pencil: {
    textAlign: 'center',
    fontSize: 30,
    color: '#C8C8C8',
  },
});

export default ProfilePicture;
