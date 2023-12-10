import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { OPENAI_API_KEY } from '@env';

import AgeStep from './components/AgeStep';
import AllergiesStep from './components/AllergiesStep';
import PainStep from './components/PainStep';
import MedicineHistoryStep from './components/MedicineHistoryStep';
import DetailsStep from './components/DetailsStep';
import PreferencesStep from './components/Preferences';
import ChronicIllnessesStep from './components/ChronicIllnessesStep';
import GenderStep from './components/GenderStep';

import StepIndicator from './components/StepIndicator';

export function FormScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    allergies: '',
    pain: '',
    medicineHistory: '',
    gender: '',
    chronicIllness: '',
    details: '',
    preferences: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    { label: 'Пол', completed: formData.gender !== '' },
    { label: 'Възраст', completed: formData.age !== '' },
    { label: 'Болки', completed: formData.pain !== '' },
    { label: 'Медицинска история', completed: formData.medicineHistory !== '' },
    { label: 'Алергии', completed: formData.allergies !== '' },
    {
      label: 'Хронични заболявания',
      completed: formData.chronicIllness !== '',
    },
    { label: 'Подробности', completed: formData.details !== '' },
    { label: 'Предпочитания', completed: formData.preferences !== '' },
  ];

  const getResponseFromOpenAI = async (formData) => {
    try {
      const response = await fetch(
        'https://api.openai.com/v1/assistants/asst_8822DzMnI6wo7g5FlR0R5otK',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: {
              model: 'gpt-4-1106-preview',
              input: `The form data: ${JSON.stringify(
                formData
              )}. Provide a response based on this data.`,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const advice = data.choices[0].message.content;
      console.log(advice); // Log the response
      return advice;
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
    }
  };

  const onStepPress = (stepNumber) => {
    // Function to navigate to the pressed step
    setCurrentStep(stepNumber);
  };

  const handleNextStep = async () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true); // Start loading
      try {
        const advice = await getResponseFromOpenAI(formData);
        setIsLoading(false); // Stop loading
        navigation.navigate('Home', { advice });
      } catch (error) {
        setIsLoading(false); // Stop loading
        console.error('Failed to get advice:', error);
        // Optionally handle the error, e.g., show an alert or a toast notification
      }
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GenderStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <AgeStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      case 3:
        return (
          <PainStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      case 4:
        return (
          <MedicineHistoryStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      case 5:
        return (
          <AllergiesStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      case 6:
        return (
          <ChronicIllnessesStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      case 7:
        return (
          <DetailsStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      case 8:
        return (
          <PreferencesStep
            formData={formData}
            setFormData={setFormData}
            onNext={handleNextStep}
          />
        );
      default:
        return <Text>Unknown step</Text>;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StepIndicator
          steps={steps}
          currentStep={currentStep}
          onStepPress={onStepPress}
        />
        {renderStepComponent()}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Other styling as needed
  },
});
