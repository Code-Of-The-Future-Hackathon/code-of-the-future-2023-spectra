import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const MenuItem = ({ iconName, title, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <MaterialCommunityIcons name={iconName} size={24} style={styles.icon} />
    <Text style={styles.title}>{title}</Text>
    <Entypo style={styles.chevronIcon} name="chevron-small-right" size={30} />
  </TouchableOpacity>
);

const AppComponents = ({ onPressNotifications, NESHTOTEST }) => (
  <View style={styles.container}>
    <MenuItem
      iconName="bell-outline"
      title="Известия"
      onPress={onPressNotifications}
    />
    <View style={styles.divider} />
    <MenuItem
      iconName="email-outline"
      title="Свържете се с поддръжката"
      onPress={() => console.log('Support Clicked')}
    />
    <View style={styles.divider} />
    <MenuItem
      iconName="file-document-outline"
      title="Условия за ползване"
      onPress={() => console.log('Terms of Use Clicked')}
    />
    <View style={styles.divider} />
    <MenuItem
      iconName="shield-outline"
      title="Политика за поверителност"
      onPress={() => console.log('Privacy Policy Clicked')}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 254,
    top: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginRight: 16,
  },
  title: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F3F3',
    marginHorizontal: 20,
  },
  chevronIcon: {
    color: '#999999',
    marginRight: 4,
  },
});

export default AppComponents;
