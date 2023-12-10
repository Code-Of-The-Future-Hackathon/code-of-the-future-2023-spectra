import React, { useRef } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const StepIndicator = ({ steps, currentStep, onStepPress }) => {
  const scrollViewRef = useRef();

  const scrollToEnd = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        {steps.map((step, index) => (
          <TouchableOpacity 
            key={step.label} 
            style={[styles.step, currentStep === index + 1 && styles.activeStep]}
            onPress={() => onStepPress(index + 1)}
          >
            <Text style={[styles.stepLabel, currentStep !== index + 1 && styles.inactiveStepLabel]}>{step.label}</Text>
            {step.completed && <Icon name="check" size={14} color={currentStep === index + 1 ? "#fff" : "#3CD539"} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {currentStep < steps.length && (
        <TouchableOpacity onPress={scrollToEnd} style={styles.arrowContainer}>
          <Icon name="angle-right" size={30} color="#5939D5" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 50,
  },
  scrollView: {
    paddingLeft: 20,
  },
  contentContainer: {
    paddingRight: 40, // Provide some space for the shadow or arrow
  },
  step: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#5939D5',
  },
  activeStep: {
    backgroundColor: '#5939D5',
  },
  stepLabel: {
    marginRight: 5,
    color: '#fff',
  },
  inactiveStepLabel: {
    color: '#000',
  },
  arrowContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -15 }],
  },
});

export default StepIndicator;
