import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MapScreen } from '../screens/MapScreen';

const HomeStack = createStackNavigator();

export const MapStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};
