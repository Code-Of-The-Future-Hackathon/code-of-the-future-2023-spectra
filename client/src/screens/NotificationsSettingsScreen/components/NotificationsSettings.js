import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Switch } from 'react-native';

const MenuItem = ({ title }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItem}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <Switch
        trackColor={{ false: '#E6E6E6', true: '#D3B1FA' }}
        thumbColor={'#AB72ED'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const NotificationsSettings = () => (
  <View style={styles.container}>
    <MenuItem title="Ново Съдържание" />
    <View style={styles.divider} />
    <MenuItem title="Списък за Пазаруване" />
    <View style={styles.divider} />
    <MenuItem title="Проверка/Добавяне на Продукт" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 205,
    top: 50,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  menuItem: {
    flex: 1,
    flexDirection: 'row', // Align text and switch in a row
    alignItems: 'center', // Align items vertically in the row
  },
  titleText: {
    flex: 1,
    color: '#5D5D5D', // Set the text color to black or any other color you prefer
    left: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F3F3',
    marginHorizontal: 20,
  },
});

export default NotificationsSettings;
