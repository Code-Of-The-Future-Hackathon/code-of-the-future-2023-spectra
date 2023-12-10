import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ChronicIllnessStep = ({ formData, setFormData, onNext }) => {
  const handleSelectChronicILLnesses = (option) => {
    if (option === 'no') {
      // If 'No' is selected, clear the chronicIllnessDetails
      setFormData({ ...formData, chronicIllness: option, chronicIllnessDetails: '' });
    } else {
      // If 'Yes' is selected, only update the chronicIllness
      setFormData({ ...formData, chronicIllness: option });
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Страдате ли от хронични заболявания?</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, formData.chronicIllness === 'yes' && styles.selectedOption]}
          onPress={() => handleSelectChronicILLnesses('yes')}
        >
          <Text style={[styles.optionText, formData.chronicIllness === 'yes' && styles.selectedOptionText]}>Да</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, formData.chronicIllness === 'no' && styles.selectedOption]}
          onPress={() => handleSelectChronicILLnesses('no')}
        >
          <Text style={[styles.optionText, formData.chronicIllness === 'no' && styles.selectedOptionText]}>Не</Text>
        </TouchableOpacity>
      </View>
      
      {formData.chronicIllness === 'yes' && (
        <TextInput
          style={styles.input}
          value={formData.chronicIllnessDetails}
          onChangeText={(text) => setFormData({ ...formData, chronicIllnessDetails: text })}
          placeholder="Опишете хронични заболявания"
          multiline
          numberOfLines={4}
        />
      )}
      
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
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 15, // Increased padding
    paddingHorizontal: 30, // Increased padding
    borderWidth: 2, // Increased border width
    borderColor: '#d1d1d1',
    borderRadius: 20, // Increased border radius
    marginBottom: 10, // Add space between buttons vertically
    width: '100%', // Full width
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  optionText: {
    fontSize: 18, // Increased font size
  },
  selectedOptionText: {
    color: 'white', // Text color for selected option
  },
  input: {
    borderWidth: 2,
    borderColor: '#d1d1d1',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 18,
    marginBottom: 20,
    width: '100%', // Full width
    textAlignVertical: 'top', // Align text at the top for multiline input
  },
  nextButton: {
    backgroundColor: '#6200ee',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: '100%', // Full width
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ChronicIllnessStep;
