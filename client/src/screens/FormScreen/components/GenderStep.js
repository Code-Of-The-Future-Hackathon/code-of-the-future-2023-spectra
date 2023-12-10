import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GenderStep = ({ formData, setFormData, onNext }) => {
  const handleSelectGender = (gender) => {
    setFormData({ ...formData, gender });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Пол:</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, formData.gender === 'male' && styles.selectedOption]}
          onPress={() => handleSelectGender('male')}
        >
          <Text style={[styles.optionText, formData.gender === 'male' && styles.selectedOptionText]}>Мъж</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, formData.gender === 'female' && styles.selectedOption]}
          onPress={() => handleSelectGender('female')}
        >
          <Text style={[styles.optionText, formData.gender === 'female' && styles.selectedOptionText]}>Жена</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, formData.gender === 'other' && styles.selectedOption]}
          onPress={() => handleSelectGender('other')}
        >
          <Text style={[styles.optionText, formData.gender === 'other' && styles.selectedOptionText]}>Друг</Text>
        </TouchableOpacity>
      </View>
      
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
  optionsContainer: {
    alignSelf: 'stretch', // Make the container fill the width
    marginBottom: 20, // Add space between the button container and the next button
  },
  optionButton: {
    paddingVertical: 15, // Increased padding
    paddingHorizontal: 30, // Increased padding
    borderWidth: 2, // Increased border width
    borderColor: '#d1d1d1',
    borderRadius: 30, // Increased border radius
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, // Add space between buttons vertically
    width: '100%', // Make each button take the full width
  },
  selectedOption: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  optionText: {
    fontSize: 18, // Increased font size
    color: '#333',
  },
  selectedOptionText: {
    color: 'white', // Text color for selected option
  },
  nextButton: {
    backgroundColor: '#5939D5',
    borderRadius: 25, // Increased border radius
    paddingVertical: 15, // Increased padding
    paddingHorizontal: 30, // Increased padding
    alignItems: 'center',
    marginTop: 30, // Increased spacing
    width: '100%', // Make the button take full width
  },
  nextButtonText: {
    fontSize: 18, // Increased font size
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GenderStep;