import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Header from './components/Header';

export function HomeScreen({ route, navigation, username }) {
  username = username || 'Потребител';
  const { advice, isLoading } = route.params || {};

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading advice...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollViewStyle}>
      <Header navigation={navigation} username={username} />
      {advice ? (
        <View style={styles.adviceContainer}>
          <Text style={styles.adviceText}>{advice}</Text>
        </View>
      ) : (
        <View style={styles.noAdviceContainer}>
          <Text style={styles.noAdviceText}>
            Няма Съвети все още, ако искате да получите си попълнете формата.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    backgroundColor: '#f2f2f2', // Change this color to match your design
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAdviceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust the margin as needed
  },
  noAdviceText: {
    textAlign: 'center',
    fontSize: 18,
    padding: 20, // Add padding for aesthetic spacing
    color: '#2c3e50', // This is a soft dark blue color; you can use any color
    // Add any additional styling that you need
  },
  adviceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, // Padding for the advice text
  },
  adviceText: {
    fontSize: 16,
    textAlign: 'center',
    // Add any additional styling that you need
  },
  // Add other styles as needed
});

export default HomeScreen;
