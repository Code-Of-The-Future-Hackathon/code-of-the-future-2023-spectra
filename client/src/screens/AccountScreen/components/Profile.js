import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Profile = () => (
  <View style={styles.container}>
    <Text style={styles.personName}>Стас Узунов</Text>
    <View style={styles.textContainer}>
      <View style={styles.column}>
        <Text style={styles.added}>Добавени</Text>
        <Text>3</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.scanned}>Сканирани</Text>
        <Text>13</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 86,
    top: 55,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    marginTop: 10,
  },
  column: {
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    height: '100%', // Take up the full height of the parent container
    bottom: 15,
  },
  personName: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    top: 50,
  },
  added: {
    color: '#A0A0A0',
  },
  scanned: {
    color: '#A0A0A0',
  },
});

export default Profile;
