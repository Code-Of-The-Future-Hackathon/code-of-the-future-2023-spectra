import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { isValidEmail } from './EmailInput';
import { isValidFullName } from './FullNameInput';
import { isValidUsername } from './UsernameInput';
import { isValidPassword } from './PasswordInput';

const ErrorComponent = ({ email, username, fullName, password }) => {
  if (!isValidEmail(email)) {
    return (
      <Text style={styles.errorText}>Моля, въведете валиден имейл адрес.</Text>
    );
  } else if (!isValidFullName(fullName)) {
    return (
      <Text style={styles.errorText}>
        Пълното име трябва да включва поне две думи.
      </Text>
    );
  } else if (!isValidUsername(username)) {
    return (
      <Text style={styles.errorText}>
        Потребителското име трябва да съдържа 4-20 знака и може да включва
        букви, цифри, долна черта или тирета.
      </Text>
    );
  } else if (!isValidPassword(password)) {
    return (
      <Text style={styles.errorText}>
        Паролата трябва да съдържа поне 8 знака и да включва главни, малки
        букви, цифри и специални знаци.
      </Text>
    );
  } else {
    return null;
  }
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
