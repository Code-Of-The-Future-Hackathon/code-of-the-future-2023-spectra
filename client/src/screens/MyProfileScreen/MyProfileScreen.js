import React from 'react';
import { View } from 'react-native';

import MyProfileTitle from './components/MyProfileTitle';
import ProfilePicture from './components/ProfilePicture';
import MyProfileComponents from './components/MyProfileComponents';

export function MyProfileScreen({ navigation }) {
  const handleName = () => {
    navigation.navigate('EditName');
  };

  const handleEmail = () => {
    navigation.navigate('EditEmail');
  };

  const handleIcon = () => {
    navigation.navigate('EditIcon');
  };

  const returnToAccount = () => {
    navigation.navigate('Account');
  };

  return (
    <View>
      <MyProfileTitle onPressBack={returnToAccount} />

      <ProfilePicture onPressPencil={handleIcon} />

      <MyProfileComponents
        onPressName={handleName}
        onPressEmail={handleEmail}
      />
    </View>
  );
}
