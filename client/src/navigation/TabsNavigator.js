import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { HomeStackNavigator } from './HomeStackNavigator';
import { ScannerStackNavigator } from './ScannerStackNavigator';
import { MapStackNavigator } from './MapStackNavigator';
import { SettingsStackNavigator } from './SettingsStackNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons'; // Make sure you've installed this package

const Tab = createBottomTabNavigator();

function TabsNavigator() {
  const getTabBarIcon = (route, focused) => {
    let iconName;
    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline';
    } else if (route.name === 'Scanner') {
      iconName = focused ? 'search' : 'search-outline';
    } else if (route.name === 'Map') {
      iconName = focused ? 'map' : 'map-outline';
    } else if (route.name === 'Settings') {
      iconName = focused ? 'settings' : 'settings-outline';
    }
    return (
      <Ionicons
        name={iconName}
        size={28}
        color={focused ? '#AB72ED' : '#c7c7c7'}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => getTabBarIcon(route, focused),
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} listeners={({ navigation, route }) => ({
        focus: () => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          if (routeName === 'Form') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
          } else {
            navigation.setOptions({ tabBarStyle: { ...styles.tabBar, display: 'flex' } });
          }
        },
      })} />
      <Tab.Screen name="Scanner" component={ScannerStackNavigator} />
      <Tab.Screen name="Map" component={MapStackNavigator} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    display: 'flex',
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 100,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
    zIndex: 1,
  },
});

export default TabsNavigator;
