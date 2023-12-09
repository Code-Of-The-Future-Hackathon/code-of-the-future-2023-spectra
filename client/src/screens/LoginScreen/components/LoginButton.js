import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LoginButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.logInButton}>
    <Text style={styles.loginText}>Вход</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  logInButton: {
    backgroundColor: '#AB72ED',
    height: 50, // Adjust as needed
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30, // Adjust as needed
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 18, // Adjust as needed
  },
});

export default LoginButton;
