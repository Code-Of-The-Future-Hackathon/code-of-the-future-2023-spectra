import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScannerScreen } from '../screens/ScannerScreen';
import { ProductInfoScreen } from '../screens/ProductInfoScreen';

const ScannerStack = createStackNavigator();

export const ScannerStackNavigator = () => {
  return (
    <ScannerStack.Navigator>
      <ScannerStack.Screen
        name="ScannerStack"
        component={ScannerScreen}
        options={{ headerShown: false }}
      />
      <ScannerStack.Screen
        name="ProductInfo"
        component={ProductInfoScreen}
        options={{ headerShown: false }}
      />
    </ScannerStack.Navigator>
  );
};
