import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export const GoToLoginButton = ({ GoToLogin }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.touchable} onPress={GoToLogin}>
      <Text style={styles.clickableText}>Към вход в акаунт</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 270,
  },
  touchable: {
    width: '80%',
    height: 50, // Adjust the height as needed
    borderRadius: 8,
    backgroundColor: '#52BDCC',
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center',
  },
  clickableText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
  },
});
