import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator } from './HomeStackNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons'; // Make sure you've installed this package

const Tab = createBottomTabNavigator();

function TabsNavigator() {
    const getTabBarIcon = (route, focused) => {
        let iconName;
        if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
        } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Ionicons name={iconName} size={28} color={focused ? '#6e6e6e' : '#c7c7c7'} />;
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
            <Tab.Screen name="Home" component={HomeStackNavigator} />
            <Tab.Screen name="Search" component={HomeStackNavigator} />
            <Tab.Screen name="Profile" component={HomeStackNavigator} />
            <Tab.Screen name="Settings" component={HomeStackNavigator} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
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
        elevation: 5
    },
});

export default TabsNavigator;
