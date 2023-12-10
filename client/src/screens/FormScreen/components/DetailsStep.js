import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const DetailsStep = ({ formData, setFormData, onNext }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        Опишете подробно симптомите си или допълнителна информация:
      </Text>

      <TextInput
        style={styles.input}
        value={formData.details}
        onChangeText={(text) => setFormData({ ...formData, details: text })}
        placeholder="Детайли..."
        multiline
        numberOfLines={4} // Adjust this as needed
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
    borderWidth: 2,
    borderColor: '#d1d1d1',
    borderRadius: 20, // Matched border radius
    paddingVertical: 15, // Increased vertical padding
    paddingHorizontal: 20, // Increased horizontal padding
    fontSize: 18, // Increased font size
    marginBottom: 20, // Increased spacing
    textAlignVertical: 'top', // Align text at the top for multiline input
    height: 150, // Adjusted height
    width: '100%', // Full width
  },
  nextButton: {
    backgroundColor: '#6200ee', // Matched button color
    borderRadius: 25, // Increased border radius
    paddingVertical: 15, // Increased vertical padding
    paddingHorizontal: 30, // Increased horizontal padding
    width: '100%', // Full width
    alignItems: 'center',
    marginTop: 20, // Increased spacing
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18, // Increased font size
  },
});

export default DetailsStep;
