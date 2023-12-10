import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Storage = ({ storage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Инструкции за съхранение</Text>
      <Text style={styles.content}>{storage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ffffe0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fffacd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8c00',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default Storage;
