import React from 'react';
import { StyleSheet, Text } from 'react-native';

const agreeText = ({ onPress }) => (
  <Text style={styles.termsText}>
    С регистрацията вие се съгласявате да с нашите{' '}
    <Text onPress={onPress} style={styles.signUpLink}>
      Условия
    </Text>{' '}
    на употреба и{' '}
    <Text onPress={onPress} style={styles.signUpLink}>
      Политика за поверителност
    </Text>
  </Text>
);

const styles = StyleSheet.create({
  termsText: {
    color: '#939393',
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 30,
  },
  signUpLink: {
    color: '#00229A',
  },
});

export default agreeText;
