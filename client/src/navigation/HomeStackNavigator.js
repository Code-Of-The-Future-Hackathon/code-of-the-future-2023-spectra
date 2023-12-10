import React, { useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { HomeScreen } from '../screens/HomeScreen';
import { FormScreen } from '../screens/FormScreen';

const HomeStack = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Form"
        component={FormScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarVisible: route.name === 'Form' ? false : true, // Hide the tab bar on FormScreen
        })}
      />
    </HomeStack.Navigator>
  );
};
