import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const AgeStep = ({ formData, setFormData, onNext }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>На колко години сте?</Text>
      <TextInput
        style={styles.input}
        value={formData.age}
        onChangeText={(text) => setFormData({ ...formData, age: text })}
        keyboardType="numeric"
        placeholder="Въведете Вашата възраст"
      />
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>Нататък</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center', // Center align items
  },
  question: {
    fontSize: 22, // Increased font size
    fontWeight: 'bold',
    marginBottom: 30, // Increased spacing
  },
  input: {
    borderWidth: 2, // Match the border width with GenderStep buttons
    borderColor: '#d1d1d1',
    borderRadius: 20, // Match the border radius with GenderStep buttons
    paddingVertical: 15, // Increased vertical padding
    paddingHorizontal: 20, // Increased horizontal padding
    fontSize: 18, // Increased font size
    marginBottom: 20, // Increased spacing
    width: '100%', // Full width to match button sizes
  },
  nextButton: {
    backgroundColor: '#6200ee', // Match the button color with GenderStep
    borderRadius: 25, // Match the border radius with GenderStep
    paddingVertical: 15, // Increased vertical padding
    paddingHorizontal: 30, // Increased horizontal padding
    width: '100%', // Full width
    alignItems: 'center',
    marginTop: 30, // Increased spacing
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
});

export default AgeStep;
