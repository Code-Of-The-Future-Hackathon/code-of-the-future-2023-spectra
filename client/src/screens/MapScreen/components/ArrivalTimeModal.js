import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AnimatedNumber = ({ style, value }) => {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity

  useEffect(() => {
    // Fade out and back in on value change
    fadeAnim.setValue(1);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [value]);

  return (
    <Animated.Text style={[style, { opacity: fadeAnim }]}>
      {value}
    </Animated.Text>
  );
};

const ArrivalTimeModal = ({ isVisible, arrivalTime, distance, onCancel }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [displayTime, setDisplayTime] = useState(arrivalTime);
  distance = ` (${distance})`;

  useEffect(() => {
    fadeAnim.setValue(0);
    if (isVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, fadeAnim]);

  useEffect(() => {
    // This effect will trigger the 'ticker' effect when arrivalTime changes.
    if (arrivalTime !== displayTime) {
      // You can customize this effect as needed.
      setDisplayTime(arrivalTime);
    }
  }, [arrivalTime, displayTime]);

  if (!isVisible && fadeAnim._value === 0) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.detailsContainer}>
        <View style={styles.timeDistanceContainer}>
          <AnimatedNumber style={styles.timeText} value={arrivalTime} />
          <AnimatedNumber style={styles.distanceText} value={distance} />
        </View>
        <Text style={styles.viaText}>според Вашето местоположение...</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Icon name="close-circle-outline" size={30} color="#ff3b30" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 80, // Adjust as needed
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  timeDistanceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  distanceText: {
    fontSize: 16,
    color: '#555',
  },
  viaText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArrivalTimeModal;
