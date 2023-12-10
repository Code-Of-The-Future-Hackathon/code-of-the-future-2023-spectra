import React from 'react';
import { Text, StyleSheet } from 'react-native';

const AccountTitle = () => <Text style={styles.title}>Акаунт</Text>;

const styles = StyleSheet.create({
  title: {
    fontSize: 28, // Adjust as needed
    alignSelf: 'center',
    marginTop: 56,
  },
});

export default AccountTitle;
