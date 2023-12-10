import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from '../screens/AccountScreen';
import { MyProfileScreen } from '../screens/MyProfileScreen';

const SettingsStack = createStackNavigator();

export const SettingsStackNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};
