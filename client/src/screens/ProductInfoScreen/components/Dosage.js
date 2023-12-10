import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dosage = ({ dosage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Доза</Text>
      <Text style={styles.content}>{dosage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#e8f4ea',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a2d7af',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default Dosage;
