// MedicineHistoryStep.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const MedicineHistoryStep = ({ formData, setFormData, onNext }) => {
  const handleSelectMedicineHistory = (option) => {
    if (option === 'no') {
      // If 'No' is selected, clear the medicineDetails
      setFormData({ ...formData, medicineHistory: option, medicineDetails: '' });
    } else {
      // If 'Yes' is selected, only update the medicineHistory
      setFormData({ ...formData, medicineHistory: option });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Използвате ли в момента някакви медикаменти?</Text>
      
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
          style={[styles.optionButton, formData.medicineHistory === 'yes' && styles.selectedOption]}
          onPress={() => handleSelectMedicineHistory('yes')}
        >
          <Text style={[styles.optionText, formData.medicineHistory === 'yes' && styles.selectedOptionText]}>Да</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.optionButton, formData.medicineHistory === 'no' && styles.selectedOption]}
          onPress={() => handleSelectMedicineHistory('no')}
        >
          <Text style={[styles.optionText, formData.medicineHistory === 'no' && styles.selectedOptionText]}>Не</Text>
        </TouchableOpacity>
      </View>
      
      {formData.medicineHistory === 'yes' && (
        <TextInput
          style={styles.input}
          value={formData.medicineDetails}
          onChangeText={(text) => setFormData({ ...formData, medicineDetails: text })}
          placeholder="Избройте медикаментите"
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

export default MedicineHistoryStep;
