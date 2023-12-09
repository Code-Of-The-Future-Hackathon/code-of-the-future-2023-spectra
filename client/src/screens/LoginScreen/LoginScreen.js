import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import BackButton from './components/BackButton';
import Title from './components/Title';
import ForgotPasswordButton from './components/ForgotPasswordButton';
import SignUpText from './components/SignUpText';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import LoginButton from './components/LoginButton';
import ErrorComponent from './components/Error';

export function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleLogin = () => {
    navigation.navigate('App');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const handleBack = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBack} />

      <Title />
      <EmailInput value={email} onChangeText={setEmail} />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
      />

      <ForgotPasswordButton onPress={handleForgotPassword} />
      <LoginButton onPress={handleLogin} />

      <ErrorComponent />

      {!keyboardVisible && <SignUpText onPress={handleSignUp} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});
