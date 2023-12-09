import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TopScans = ({ navigation }) => {
  const topScansData = [
    {
      id: '1',
      imgUrl:
        'https://res.cloudinary.com/dpvqy1a5d/image/upload/v1701470775/foi4kiteulj2f2lehsio.png',
      name: 'Мляко',
      brand: 'Марка А',
    },
    {
      id: '2',
      imgUrl:
        'https://res.cloudinary.com/dpvqy1a5d/image/upload/v1701470503/fttbjo05oh9uwlat26hr.png',
      name: 'Кисело мляко',
      brand: 'Марка Б',
    },
    {
      id: '3',
      imgUrl:
        'https://res.cloudinary.com/dpvqy1a5d/image/upload/v1701470614/p40zlrbkclkmi1mdokzi.png',
      name: 'Ябълка',
      brand: 'Марка В',
    },
    {
      id: '4',
      imgUrl:
        'https://res.cloudinary.com/dpvqy1a5d/image/upload/v1701470503/fttbjo05oh9uwlat26hr.png',
      name: 'Кисело мляко',
      brand: 'Марка Г',
    },
    {
      id: '5',
      imgUrl:
        'https://res.cloudinary.com/dpvqy1a5d/image/upload/v1701470503/fttbjo05oh9uwlat26hr.png',
      name: 'Кисело мляко',
      brand: 'Марка Д',
    },
  ];

  return (
    <View>
      <View style={styles.topScansSection}>
        <Text style={styles.titleScans}>Топ Сканирания</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TopScansTabs')}>
          <Icon name="chevron-right" size={40} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {topScansData.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.imgUrl }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productBrand}>{item.brand}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topScansSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 12,
  },
  titleScans: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  productBrand: {
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});

export default TopScans;
