import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TransportModeSelector = ({ currentMode, setTransportMode }) => {
  const modes = [
    { type: 'driving', icon: 'car-outline' },
    { type: 'walking', icon: 'walk-outline' },
  ];

  return (
    <View style={styles.container}>
      {modes.map(({ type, icon }) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.button,
            currentMode === type ? styles.selected : styles.unselected, // Use unselected for the default state
          ]}
          onPress={() => setTransportMode(type)}
          accessibilityLabel={`${type} mode`}
        >
          <Icon name={icon} size={20} color={currentMode === type ? 'white' : '#AB72ED'} />
          <Text style={[styles.buttonText, currentMode === type ? styles.textSelected : styles.textUnselected]}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    zIndex: 1,
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selected: {
    backgroundColor: '#AB72ED', // Selected color similar to #AB72ED
  },
  unselected: {
    backgroundColor: '#E0E0E0', // Default color for unselected button
  },
  buttonText: {
    fontWeight: 'bold',
    marginLeft: 5,
    textTransform: 'capitalize',
  },
  textSelected: {
    color: 'white', // Text color for selected
  },
  textUnselected: {
    color: '#AB72ED', // Text color for unselected
  },
});

export default TransportModeSelector;
