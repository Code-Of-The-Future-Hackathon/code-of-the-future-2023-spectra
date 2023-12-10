import React from 'react';
import { View, StyleSheet } from 'react-native';

import NotificationsSettingsTitle from './components/NotificationsSettingsTitle';
import NotificationsSettings from './components/NotificationsSettings';

export function NotificationsSettingsScreen({ navigation }) {
  const returnToAccount = () => {
    navigation.navigate('Account');
  };

  return (
    <View style={styles.container}>
      <NotificationsSettingsTitle onPressBack={returnToAccount} />

      <NotificationsSettings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
});
