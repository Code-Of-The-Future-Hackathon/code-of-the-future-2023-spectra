import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const LocationTitle = ({ title, hours, setIsInstructionsModalVisible }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
    <Text style={styles.hours}>{hours}</Text>
    {title !== 'Изберете си аптека' && (
      <TouchableOpacity onPress={() => setIsInstructionsModalVisible(true)}>
        <Text>Покажи Упътванията</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    zIndex: 1,
  },
  text: {
    paddingTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  hours: {
    fontSize: 16, // Choose an appropriate font size
    color: '#333', // Choose an appropriate text color
    paddingBottom: 10, // Add some spacing below the hours
  },
});

export default LocationTitle;
