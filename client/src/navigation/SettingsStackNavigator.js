import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from '../screens/AccountScreen';
import { MyProfileScreen } from '../screens/MyProfileScreen';
import { EditNameScreen } from '../screens/EditNameScreen';
import { EditEmailScreen } from '../screens/EditEmailScreen';
import { EditIconScreen } from '../screens/EditIconScreen';
import { NotificationsSettingsScreen } from '../screens/NotificationsSettingsScreen';

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
       <SettingsStack.Screen
        name="EditName"
        component={EditNameScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="EditEmail"
        component={EditEmailScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="EditIcon"
        component={EditIconScreen}
        options={{ headerShown: false }}
      />
      <SettingsStack.Screen
        name="NotificationsSettings"
        component={NotificationsSettingsScreen}
        options={{ headerShown: false }}
      />
    </SettingsStack.Navigator>
  );
};
