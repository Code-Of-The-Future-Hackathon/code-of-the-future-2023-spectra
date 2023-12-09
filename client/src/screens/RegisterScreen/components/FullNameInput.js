import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

const EmailInput = ({ value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder="Пълното име"
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
    {!!value && (
      <Octicons
        style={styles.circle}
        name={isValidFullName(value) ? 'check-circle' : 'x-circle'}
        size={24}
        color={isValidFullName(value) ? 'green' : 'red'}
      />
    )}
  </View>
);

export const isValidFullName = (value) => {
  // Split the name into words
  const words = value.trim().split(/\s+/);

  // Check if there are at least two words and each word is at least 2 characters
  return words.length >= 2 && words.every((word) => word.length >= 2);
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#E4E4E4',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    paddingLeft: 18,
    paddingRight: 40,
    borderRadius: 6,
  },
  circle: {
    position: 'absolute',
    right: 10,
    padding: 8,
    justifyContent: 'center',
  },
});

export default EmailInput;
