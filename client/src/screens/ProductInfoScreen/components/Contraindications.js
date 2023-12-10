import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Contraindications = ({ contradictions }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Противоречия</Text>
      <Text style={styles.content}>{contradictions}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cc0000',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default Contraindications;
