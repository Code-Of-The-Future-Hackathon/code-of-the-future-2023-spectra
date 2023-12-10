import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

const ProfilePicture = ({ onPressPencil }) => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.circularImage}
        source={require('../../../assets/images/profile.png')}
      />
    </View>
    <TouchableOpacity style={styles.pencilContainer} onPress={onPressPencil}>
      <Octicons name="pencil" size={28} style={styles.pencil} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Center the items vertically
    justifyContent: 'center', // Center the items horizontally
    top: 40,
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
    color: '#000',
  },
});

export default ProfilePicture;
