import React, { useEffect, useRef } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const NoResult = ({ onClose, onNavigate }) => {
  const slideAnim = useRef(
    new Animated.Value(Dimensions.get('window').height)
  ).current; // Start off the bottom of the screen

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

  return (
    <TouchableWithoutFeedback onPress={slideDown}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.draggableContainer}>
          <View style={styles.draggableIndicator} />
        </View>
        <Text style={styles.title}>Нещо ново..</Text>
        <Text style={styles.subTitle}>
          Не можахме да намерим този продукт, може да го добавите в нашата база
        </Text>
        <TouchableOpacity style={styles.button} onPress={onNavigate}>
          <Text style={styles.buttonText}>Нека го добавим!</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Changed from flexDirection
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    zIndex: 2,
    height: 220,
  },
  draggableContainer: {
    width: '100%', // Take the full width of the container
    alignItems: 'center', // Center children horizontally
    marginBottom: 20,
  },
  draggableIndicator: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    alignSelf: 'center', // Center the indicator within the draggableContainer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    width: '80%',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    width: '80%',
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 15,
    borderColor: '#9F9F9F',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default NoResult;
