import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'; // Ensure you import the correct icon library

const ReportButton = ({ onReportPress }) => {
  return (
    <View style={styles.reportContainer}>
      <TouchableOpacity style={styles.reportButton} onPress={onReportPress}>
        <Text style={styles.reportText}>Докладвайте за грешка</Text>
        <AntDesign name="exclamationcircleo" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  reportContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
    padding: 10,
  },
  reportButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '90%',
    flexDirection: 'row', // Arrange children in a row
    justifyContent: 'space-between', // Align children with space between them
    alignItems: 'center', // Center children vertically
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, // Slightly more visible
    shadowRadius: 6, // Larger radius for a more diffused shadow
    // Android shadow
    elevation: 5, // Slightly higher elevation for a more noticeable shadow
  },
  reportText: {
    fontSize: 16,
    left: 5,
  },
});

export default ReportButton;
