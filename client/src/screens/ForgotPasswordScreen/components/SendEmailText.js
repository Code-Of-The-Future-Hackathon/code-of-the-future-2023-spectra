import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const SendEmailText = () => (
  <View style={styles.container}>
    <Text style={styles.title}>
      Не се безпокойте. Въведете своя имейл и ние ще ви изпрати инструкции, за
      да нулирате паролата си.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginLeft: '10%',
  },
  title: {
    fontSize: 20,
    color: '#AB72ED',
    width: '80%',
  },
});

export default SendEmailText;
