import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Ingredients = ({ ingredients }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Съставки</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.content}>
          {ingredient}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#b6dfff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default Ingredients;
