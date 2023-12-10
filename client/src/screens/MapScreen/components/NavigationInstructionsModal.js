import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const NavigationInstructionsModal = ({ isVisible, steps, onCancel }) => {
  // Function to remove HTML tags from a string
  const stripHtml = (html) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ScrollView>
            {steps.map((step, index) => (
              <View key={index} style={styles.stepContainer}>
                <Text style={styles.stepText}>
                  {stripHtml(step.instruction)}
                </Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Затвори</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
    maxHeight: '50%', // Limit the modal height
  },
  stepContainer: {
    marginBottom: 15,
  },
  stepText: {
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
  },
});

export default NavigationInstructionsModal;
