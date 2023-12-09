import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Statistics = () => {
  return (
    <View style={styles.statisticsContainer}>
      <Text style={styles.title}>Статистики</Text>
      <View style={styles.statisticCard}>
        <Icon name="attach-money" size={33} color="#4CAF50" />
        <View style={styles.statisticTextContainer}>
          <Text style={styles.statisticLabel}>Спестени пари:</Text>
          <Text style={styles.statisticValue}>+ 100.43 лв.</Text>
        </View>
      </View>
      <View style={styles.statisticCard}>
        <Icon name="search" size={33} color="#3F51B5" />
        <View style={styles.statisticTextContainer}>
          <Text style={styles.statisticLabel}>Най-търсен продукт:</Text>
          <Text style={styles.statisticValue}>Име на продукта</Text>
        </View>
      </View>
      <View style={styles.statisticCard}>
        <Icon name="store" size={33} color="#ff3d3d" />
        <View style={styles.statisticTextContainer}>
          <Text style={styles.statisticLabel}>Любим магазин:</Text>
          <Text style={styles.statisticValue}>Име на магазина</Text>
        </View>
      </View>
      <View style={styles.statisticCard}>
        <Icon name="category" size={33} color="#FF9800" />
        <View style={styles.statisticTextContainer}>
          <Text style={styles.statisticLabel}>Предпочитана категория:</Text>
          <Text style={styles.statisticValue}>Име на категория</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  statisticsContainer: {
    marginTop: 12,
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  statisticCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 4,
  },
  statisticTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  statisticLabel: {
    fontSize: 16,
    color: '#757575',
  },
  statisticValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginTop: 4,
  },
});

export default Statistics;
