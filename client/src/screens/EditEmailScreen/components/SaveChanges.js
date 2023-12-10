import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const SaveChanges = ({ onPress }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.myData} onPress={onPress}>
      <Text style={styles.clickableText}>Запази промените</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#AB72ED',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  clickableText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default SaveChanges;
