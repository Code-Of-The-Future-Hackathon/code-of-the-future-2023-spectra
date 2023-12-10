import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from '../screens/AccountScreen';

const SettingsStack = createStackNavigator();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};
