import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import BackButton from './components/BackButton';
import Title from './components/Title';
import SendEmailText from './components/SendEmailText';
import EmailInput from './components/EmailInput';
import ButtonSend from './components/ButtonSend';

export function ForgotPasswordScreen({ navigation }) {
  const GoBack = () => {
    navigation.navigate('Login');
  };

  const HandleSend = () => {
    navigation.navigate('SuccessPassword');
  };

  return (
    <View style={styles.container}>
      <BackButton GoBack={GoBack} />

      <Title />

      <SendEmailText />

      <EmailInput />

      <ButtonSend HandleSend={HandleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Add flex: 1 to cover the entire available space
    backgroundColor: '#FFFFFF',
  },
});
