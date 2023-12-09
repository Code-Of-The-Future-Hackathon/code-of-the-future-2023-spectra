import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { REACT_NATIVE_API_URL } from '@env';

import BackButton from './components/BackButton';
import Title from './components/Title';
import EmailInput from './components/EmailInput';
import UsernameInput from './components/UsernameInput';
import FullNameInput from './components/FullNameInput';
import PasswordInput from './components/PasswordInput';
import TermsAndPrivacyPolicyText from './components/TermsAndPrivacyPolicyText';
import SignInButton from './components/SignInButton';
import LogInText from './components/LogInText';
import ErrorComponent from './components/Error';

export function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);

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

  const handleRegister = () => {
    setSignInClicked(true);

    if (email && username && fullName && password) {
      fetch(`${REACT_NATIVE_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, fullName, password }),
      });

      navigation.navigate('Scanner');
    }
  };

  const handleBack = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleBack} />

      <Title />

      <EmailInput value={email} onChangeText={setEmail} />

      <FullNameInput value={fullName} onChangeText={setFullName} />

      <UsernameInput value={username} onChangeText={setUsername} />

      <PasswordInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isPasswordVisible}
        onToggleVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
      />

      <TermsAndPrivacyPolicyText />

      <SignInButton onPress={handleRegister} />

      {signInClicked && (
        <ErrorComponent
          email={email}
          username={username}
          fullName={fullName}
          password={password}
        />
      )}

      {!keyboardVisible && <LogInText onPress={handleBack} />}
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
