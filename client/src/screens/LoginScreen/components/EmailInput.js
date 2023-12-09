import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const EmailInput = ({ value, onChangeText }) => (
  <TextInput
    placeholder="Имейл"
    value={value}
    onChangeText={onChangeText}
    style={styles.input}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#E4E4E4',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 18,
    borderRadius: 6,
  },
});

export default EmailInput;
