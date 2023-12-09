import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const ButtonSend = ({ HandleSend }) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.touchable} onPress={HandleSend}>
      <Text style={styles.clickableText}>Изпращане</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchable: {
    width: '80%',
    height: 50, // Adjust the height as needed
    borderRadius: 8,
    backgroundColor: '#AB72ED',
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center',
  },
  clickableText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default ButtonSend;
