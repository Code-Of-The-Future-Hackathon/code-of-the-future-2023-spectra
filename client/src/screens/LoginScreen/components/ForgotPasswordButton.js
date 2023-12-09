import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ForgotPasswordButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.forgotPasswordButton}>
    <Text style={styles.forgotPasswordText}>Забравена парола?</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  forgotPasswordButton: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#000000',
    fontSize: 16, // Adjust as needed
    marginBottom: 20, // Space below the component
    fontWeight: 'bold',
  },
});

export default ForgotPasswordButton;
