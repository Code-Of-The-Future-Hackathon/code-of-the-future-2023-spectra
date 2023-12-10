import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SideEffects from './components/SideEffects';
import Storage from './components/Storage';
import Dosage from './components/Dosage';
import Ingredients from './components/Ingredients';
import Contraindications from './components/Contraindications';
import ReportButton from './components/ReportButton';

export function ProductInfoScreen({ route, navigation }) {
  const { productDetails } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={styles.favoriteButton}
        >
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={30}
            color={isFavorite ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.generalInfo}>
          <Text style={styles.name}>{productDetails.name}</Text>
          <Image source={{ uri: productDetails.imgUrl }} style={styles.image} />
        </View>

        <SideEffects sideEffects={productDetails.sideEffects} />
        <Storage storage={productDetails.storage} />
        <Dosage dosage={productDetails.dosage} />
        <Ingredients ingredients={productDetails.ingredients} />
        <Contraindications contradictions={productDetails.contradictions} />

        <ReportButton onReportPress={() => {}} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 30,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 10,
  },
  favoriteButton: {
    padding: 10,
  },
  generalInfo: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default ProductInfoScreen;
