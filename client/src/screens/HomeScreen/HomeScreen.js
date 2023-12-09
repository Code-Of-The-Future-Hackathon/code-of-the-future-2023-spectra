import React from 'react';
import { ScrollView } from 'react-native';

import Header from './components/Header';
import TopScans from './components/TopScans';
import Statistics from './components/Statistics';

export function HomeScreen({ navigation, username }) {
  username = username || 'Потребител';

  return (
    <ScrollView>
      <Header navigation={navigation} username={username} />
      <TopScans navigation={navigation} />
      <Statistics />
    </ScrollView>
  );
}
