import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { ImageTop } from './components/ImageTop';
import { ChangePasswordText } from './components/ChangePasswordText';
import { GoToLoginButton } from './components/GoToLoginButton';

export function SuccessPasswordScreen({ navigation }) {
  const GoToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageTop />

      <ChangePasswordText />

      <GoToLoginButton GoToLogin={GoToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Add flex: 1 to cover the entire available space
    backgroundColor: '#FFFFFF',
  },
});
