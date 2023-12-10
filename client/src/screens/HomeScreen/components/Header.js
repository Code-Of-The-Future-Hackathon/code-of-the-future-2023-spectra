import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({ navigation, username }) => {
  return (
    <View style={styles.header}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Здравейте!</Text>
        <View style={styles.nameDecoration}>
          <Text style={styles.username}>{username}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Form')}
      >
        <AntDesign name="form" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 35,
    backgroundColor: '#AB72ED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 50,
  },
  greetingContainer: {
    flexDirection: 'column',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    position: 'absolute',
    right: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    padding: 10,
    top: 60,
  },
});

export default Header;
