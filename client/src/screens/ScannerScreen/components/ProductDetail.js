import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductDetail = ({
  name,
  imgUrl,
  onNavigate,
  onClose,
}) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height)
  ).current; // Start off the bottom of the screen

  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    // Slide up animation from bottom to its position
    Animated.timing(slideAnim, {
      toValue: 0, // Final position on the screen
      duration: 500, // Duration of the animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, []);

  const slideDown = () => {
    // Slide down animation
    Animated.timing(slideAnim, {
      toValue: 600, // Change this value based on the screen height or where you want the component to slide to
      duration: 600, // Duration of animation
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const openProductView = () => {
    // Function to navigate to the ProductViewScreen
    navigation.navigate('ProductView', {
      // Assuming you want to pass these as params to the ProductViewScreen
      name,
      imgUrl,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={slideDown}>
      <View style={styles.wraper}>
        <Animated.View
          style={[
            styles.productContainer,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.draggableContainer}>
            <View style={styles.draggableIndicator} />
          </View>
          <TouchableOpacity onPress={openProductView}>
            <Image
              source={{ uri: imgUrl }}
              style={styles.productImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{name}</Text>
            <TouchableOpacity onPress={onNavigate} style={styles.productButton}>
              <Text style={styles.buttonText}>Провери го</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wraper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30, // Padding at the top for draggableIndicator
    paddingBottom: 30,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
    zIndex: 2,
    width: '100%',
  },
  draggableContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    alignItems: 'center', // Centers content horizontally
  },
  draggableIndicator: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  productImage: {
    width: 130,
    height: 130,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-around',
  },
  productButton: {
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9F9F9F',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 8,
  }
});

export default ProductDetail;
