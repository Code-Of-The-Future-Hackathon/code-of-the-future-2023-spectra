import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const EditName = ({ value, onChangeText }) => (
  <TextInput
    placeholder="Нов имейл"
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
    borderRadius: 20,
    marginHorizontal: 20,
    top: 40,
  },
});

export default EditName;
