import React from 'react';
import { ScrollView } from 'react-native';

import Header from './components/Header';

export function HomeScreen({ navigation, username }) {
  username = username || 'Потребител';

  return (
    <ScrollView>
      <Header navigation={navigation} username={username} />
    </ScrollView>
  );
}
