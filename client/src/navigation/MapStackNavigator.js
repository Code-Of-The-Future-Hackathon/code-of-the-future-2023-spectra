import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MapScreen } from '../screens/MapScreen';

const MapStack = createStackNavigator();

export const MapStackNavigator = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="HomeStack"
        component={MapScreen}
        options={{ headerShown: false }}
      />
    </MapStack.Navigator>
  );
};
