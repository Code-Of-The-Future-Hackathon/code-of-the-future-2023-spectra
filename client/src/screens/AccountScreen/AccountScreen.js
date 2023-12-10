import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import AccountTitle from './components/AccountTitle';
import Profile from './components/Profile';
import ProfilePicture from './components/ProfilePicture';
import AccountText from './components/AccountText';
import AccountComponents from './components/AccountComponents';
import AppText from './components/AppText';
import AppComponents from './components/AppComponents';
import LogOut from './components/LogOut';

export function AccountScreen({ navigation }) {
  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleProfile = () => {
    navigation.navigate('MyProfile');
  };

  const handleNotifications = () => {
    navigation.navigate('NotificationsSettings');
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>

      <AccountTitle />

      <Profile />

      <ProfilePicture />

      <AccountText />

      <AccountComponents onPress={handleProfile} />

      <AppText />

      <AppComponents onPressNotifications={handleNotifications} />

      <LogOut onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
});
