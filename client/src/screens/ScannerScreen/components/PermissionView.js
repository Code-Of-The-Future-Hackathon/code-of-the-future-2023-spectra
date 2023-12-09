import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PermissionView = ({ onContinue }) => (
  <View style={styles.container}>
    <Image
      source={require('../../../assets/images/camera.png')}
      style={styles.centeredImage}
    />
    <Text style={styles.instructionText}>Разрешете достъп до камерата</Text>
    <Text style={styles.subInstructionText}>
      За да започнете, докоснете „Продължи“ и използвайте камерата си, за да
      сканирате продукти
    </Text>
    <TouchableOpacity style={styles.buttonContinue} onPress={onContinue}>
      <Text style={styles.buttonText}>„Продължи“</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F9',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  centeredImage: {
    marginTop: 125, // Add some margin on top
    marginBottom: 50, // Add some margin at the bottom
    width: windowWidth, // Full width of the screen
    height: windowHeight * 0.4, // Half of the screen height
    resizeMode: 'contain', // To make sure the image is scaled properly
    alignSelf: 'center', // Center the image
  },
  instructionText: {
    fontSize: 24, // Slightly larger text for the main instruction
    textAlign: 'center', // Center the text
    marginVertical: 8, // Add some margin to the top and bottom
    fontWeight: 'bold',
    color: '#000',
  },
  subInstructionText: {
    fontSize: 16, // Smaller text for the sub-instruction
    textAlign: 'center', // Center the text
    marginBottom: 16, // Add some margin to the bottom
    color: '#9F9F9F',
    marginHorizontal: 30,
  },
  buttonContinue: {
    backgroundColor: '#AB72ED',
    borderRadius: 15,
    padding: 14,
    marginHorizontal: 30,
    marginVertical: 20,
  },
});

export default PermissionView;
