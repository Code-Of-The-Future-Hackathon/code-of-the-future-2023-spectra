import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { OnboardingScreen } from '../screens/OnboardingScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
