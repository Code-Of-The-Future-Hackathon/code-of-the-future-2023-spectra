import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const ChooseIcon = ({ image, onPressImage }) => {
  const numColumns = 4; // Define how many columns you want in your grid

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => onPressImage(item)}
      style={styles.imageContainer}
    >
      <Image style={styles.image} source={item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={image}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.whiteRectangle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 40,
  },
  whiteRectangle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignSelf: 'center', // This ensures the whiteRectangle stays centered
    width: '90%', // Adjust as needed
  },
  imageContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    overflow: 'hidden',
    margin: 5, // Add margin for spacing between icons
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ChooseIcon;
