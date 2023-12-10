import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const LogOut = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.myData} onPress={onPress}>
      <Text style={styles.clickableText}>Излезте от акаунта</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 52,
    marginTop: 180, // Adjusted from top: 40
    bottom: 100,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  clickableText: {
    color: '#C42400',
    left: 20,
  },
});

export default LogOut;
