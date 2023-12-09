import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const EmailInput = ({ value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder="Имейл"
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center the input
    marginBottom: 12,
    marginTop: 14,
  },
  input: {
    height: 50,
    borderColor: '#E4E4E4',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderRadius: 8,
    width: '80%',
    paddingLeft: 18,
    paddingRight: 18,
  },
});

export default EmailInput;
