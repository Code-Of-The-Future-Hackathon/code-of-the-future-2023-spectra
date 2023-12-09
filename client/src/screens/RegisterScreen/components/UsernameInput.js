import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

const EmailInput = ({ value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <TextInput
      placeholder="Потребителско име"
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
    {!!value && (
      <Octicons
        style={styles.circle}
        name={isValidUsername(value) ? 'check-circle' : 'x-circle'}
        size={24}
        color={isValidUsername(value) ? 'green' : 'red'}
      />
    )}
  </View>
);

export const isValidUsername = (username) => {
  const minLength = 4;
  const maxLength = 20;
  const usernameRegex = /^[a-zA-Z0-9_\-]+$/;

  return (
    username.length >= minLength &&
    username.length <= maxLength &&
    usernameRegex.test(username)
  );
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
