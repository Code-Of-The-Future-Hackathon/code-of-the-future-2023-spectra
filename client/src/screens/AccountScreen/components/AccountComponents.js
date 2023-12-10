import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const AccountComponents = ({ onPress }) => (
  <View style={styles.container}>
    <View style={styles.rectangle}>
      <View style={styles.dividingLine} />
      <TouchableOpacity style={styles.myProfile} onPress={onPress}>
        <Text style={styles.clickableText}>Моят профил</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.personName}>Стас Узунов</Text>
          <Entypo
            name="chevron-small-right"
            size={30}
            style={styles.chevronIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.myData}
        onPress={() => console.log('Bottom Clicked')}
      >
        <Text style={styles.clickableText}>Моите данни</Text>
        <Entypo
          name="chevron-small-right"
          size={30}
          style={styles.chevronIcon}
        />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 86,
    top: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  rectangle: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
  },
  dividingLine: {
    position: 'absolute',
    top: '50%',
    left: 20,
    right: 20,
    height: 1,
    backgroundColor: '#F3F3F3',
  },
  myProfile: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: '50%',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  myData: {
    position: 'absolute',
    left: 0,
    top: '50%',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  clickableText: {
    color: '#5D5D5D',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to the end
    flex: 1, // Allow the personName to take up the remaining space
  },
  chevronIcon: {
    color: '#999999',
    marginLeft: 10, // Add some space between the name and the icon
  },
  personName: {
    marginLeft: 10,
    color: '#C8C8C8',
    fontSize: 12,
  },
});

export default AccountComponents;
