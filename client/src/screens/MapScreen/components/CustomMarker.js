import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomMarker = () => {
  return (
    <View style={styles.markerContainer}>
      <MaterialCommunityIcons name="store" size={20} color="#fff" />
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: '#AB72ED', // Change color as needed
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomMarker;
