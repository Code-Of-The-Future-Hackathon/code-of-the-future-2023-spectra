import React from 'react';
import { Picker } from '@react-native-picker/picker';

const DestinationPicker = ({
  destinationPoints,
  selectedDestinationIndex,
  setSelectedDestinationIndex,
}) => (
  <Picker
    selectedValue={selectedDestinationIndex}
    onValueChange={(itemIndex) => setSelectedDestinationIndex(itemIndex)}
  >
    {destinationPoints.map((point, index) => (
      <Picker.Item key={index} label={point.label} value={index} />
    ))}
  </Picker>
);

export default DestinationPicker;
