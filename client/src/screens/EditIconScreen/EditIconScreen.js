import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import EditIconTitle from './components/EditIconTitle';
import ProfilePicture from './components/ProfilePicture';
import SaveChanges from './components/SaveChanges';
import ChooseIcon from './components/ChooseIcons';

export function EditIconScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const image = [
    require('../../assets/images/profile-set.png'),
    require('../../assets/images/profile-set.png'),
    require('../../assets/images/profile-set.png'),
    require('../../assets/images/profile-set.png'),
    require('../../assets/images/profile-set.png'),
    require('../../assets/images/profile-set.png'),
    require('../../assets/images/profile-set.png'),
    require('../../assets/images/profile-set.png'),
  ];

  const returnToProfile = () => {
    navigation.navigate('MyProfile');
  };

  const handleIconSelect = (imageUri) => {
    setSelectedImage(imageUri);
  };

  return (
    <View style={styles.container}>
      <EditIconTitle returnToProfile={returnToProfile} />
      <ProfilePicture imageUri={selectedImage} />
      <ChooseIcon image={image} onPressImage={handleIconSelect} />
      <SaveChanges />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
});
