import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const ChangePasswordText = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Паролата е променена успешно</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#52BDCC',
    width: '90%',
    textAlign: 'center', // Center text horizontally
  },
});
