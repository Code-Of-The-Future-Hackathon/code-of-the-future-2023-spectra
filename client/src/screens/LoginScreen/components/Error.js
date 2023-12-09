import React from 'react';
import { Text, StyleSheet } from 'react-native';

const ErrorComponent = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <Text style={styles.errorText}>
      Съжаляваме, паролата ви е неправилна. Моля, проверете отново паролата си.
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: '#FF4242',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
});

export default ErrorComponent;
