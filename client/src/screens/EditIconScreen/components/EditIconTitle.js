import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const EditIconTitle = ({ returnToProfile }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Икони</Text>
      <TouchableOpacity style={styles.backButton} onPress={returnToProfile}>
        <Entypo name="chevron-thin-left" size={30} style={styles.chevronIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 40,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2, // Vertical offset for the shadow
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android elevation
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 12,
  },
  backButton: {
    position: 'absolute',
    top: 56,
    left: 20,
  },
});

export default EditIconTitle;
