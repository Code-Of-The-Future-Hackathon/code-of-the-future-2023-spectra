import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import EditNameTitle from './components/EditEmailTitle';
import EditName from './components/EditEmail';
import SaveChanges from './components/SaveChanges';

export function EditEmailScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const returnToProfile = () => {
    navigation.navigate('MyProfile');
  };

  return (
    <View style={styles.container}>
      <EditNameTitle returnToProfile={returnToProfile} />

      <EditName value={email} onChangeText={setEmail} />

      <SaveChanges />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
});
