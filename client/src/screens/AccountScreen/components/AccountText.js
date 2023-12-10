import React from 'react';
import { Text, StyleSheet } from 'react-native';

const AccountText = () => <Text style={styles.text}>Акаунт</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    left: 30,
    top: 12,
  },
});

export default AccountText;
