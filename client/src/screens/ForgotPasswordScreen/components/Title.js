import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Title = () => <Text style={styles.title}> Spectra </Text>;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'NeueMontreal',
    fontSize: 64, // Adjust as needed
    alignSelf: 'center',
    marginBottom: 20, // Adds margin below the title
    color: '#AB72ED',
    marginTop: 200,
  },
});

export default Title;
