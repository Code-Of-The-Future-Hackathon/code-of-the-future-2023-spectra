import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';

const RecognitionResult = ({
  topFourPredictions,
  onConfirm,
  onShowOtherOptions,
  showAlternatives,
  onAddNew,
}) => {
  if (!topFourPredictions || topFourPredictions.length === 0) return null;
  const firstPrediction = topFourPredictions[0];

  return (
    <View style={styles.resultOverlay}>
      {!showAlternatives ? (
        <>
          <Text style={styles.resultTitle}>Потвърждение на продукт</Text>
          <Text style={styles.resultText}>
            Това {firstPrediction.tagName} ли е?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => onConfirm(firstPrediction)}
            >
              <Text style={styles.buttonText}>Да</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.rejectButton]}
              onPress={onShowOtherOptions}
            >
              <Text style={styles.buttonText}>Не</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          {topFourPredictions
            .filter((prediction) => prediction.probability > 0)
            .map((prediction, index) => (
              <TouchableOpacity
                key={index}
                style={styles.alternativeOption}
                onPress={() => onConfirm(prediction)}
              >
                <Text style={styles.alternativeText}>
                  {prediction.tagName} -{' '}
                  {Math.round(prediction.probability * 100)}%
                </Text>
              </TouchableOpacity>
            ))}
          <TouchableOpacity style={styles.addNewButton} onPress={onAddNew}>
            <Text style={styles.addNewButtonText}>Добави продукта</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  resultOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    minWidth: '30%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  alternativeOption: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#4B5563',
  },
  alternativeText: {
    color: 'white',
    fontSize: 16,
  },
  addNewButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  addNewButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RecognitionResult;
