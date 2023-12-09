import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const SignUpText = ({ onPress }) => (
  <View style={styles.container}>
    <View style={styles.lineContainer}>
      <View style={styles.lineLeft}></View>
      <Text style={styles.orText}>ИЛИ</Text>
      <View style={styles.lineRight}></View>
    </View>
    <Text style={styles.noAccountText}>
      Имате акаунт?{' '}
      <Text onPress={onPress} style={styles.signUpLink}>
        Вход
      </Text>
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 40, // Space above the component
    alignItems: 'center', // Center align the content
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30, // Space below the line container
  },
  lineLeft: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    width: 150, // Adjust as needed
    marginRight: 10, // Space between line and text
  },
  lineRight: {
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    width: 150, // Adjust as needed
    marginLeft: 10, // Space between line and text
  },
  orText: {
    fontSize: 16, // Adjust as needed
    color: '#8C8C8C',
  },
  noAccountText: {
    fontSize: 18, // Adjust as needed
  },
  signUpLink: {
    color: '#007BFF',
    fontSize: 18, // Adjust as needed
    textDecorationLine: 'underline',
  },
});

export default SignUpText;
