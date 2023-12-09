import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const bottomContainerHeightPercentage = 45; // Adjust the percentage as needed

const pages = [
  {
    title: 'Сканирайте за информация',
    subtitle: 'Разгледайте състава, разбете за алергени и др.',
    image: require('../../assets/images/icon.png'),
    buttonText: 'Харесва ми',
  },
  {
    title: 'Намери лекарството',
    subtitle: 'Намерете лекарството, което ви трябва в най-близката аптека',
    image: require('../../assets/images/icon.png'),
    buttonText: 'Интересно',
  },
  {
    title: 'Задайте си оплакванията и симптомите',
    subtitle: 'Получете съвети за лекарства и лекари, които да посетите',
    image: require('../../assets/images/icon.png'),
    buttonText: 'Схванах го',
  },
  {
    title: 'Следете вашата активност',
    subtitle: 'Вижте вашите лекарства, лекари и аптеки на едно място',
    image: require('../../assets/images/icon.png'),
    buttonText: 'Нека видим',
  },
];

export function OnboardingScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          typeof pages[currentPage].image === 'string'
            ? { uri: pages[currentPage].image }
            : pages[currentPage].image
        }
        style={styles.onboardingImage}
      />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>{pages[currentPage].title}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{pages[currentPage].subtitle}</Text>
        </View>
        <View style={styles.dotsContainer}>
          {pages.map((_, idx) => (
            <View
              style={[styles.dot, idx === currentPage && styles.activeDot]}
              key={idx}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={nextPage}>
          <Text style={styles.buttonText}>{pages[currentPage].buttonText}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <Text style={styles.loginText}>Вход</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://webstage.bg/information/confidentiality-policy'
            )
          }
        >
          <Text style={styles.PrivacyPolicy}>Политика за поверителност</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  onboardingImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: screenHeight * ((110 - bottomContainerHeightPercentage) / 100), // Fill the remaining space
    resizeMode: 'cover', // or 'stretch'
  },
  bottomContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: (screenHeight * bottomContainerHeightPercentage) / 100,
  },
  subtitleContainer: {
    height: '13%',
  },
  image: { width: '100%', height: '100%' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '12%',
  },
  subtitle: {
    textAlign: 'center',
    color: '#9F9F9F',
    marginLeft: 30,
    marginRight: 30,
    overflow: 'hidden',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxHeight: '10%',
    marginBottom: '5%',
  },
  dot: {
    width: '2.5%',
    height: '27%',
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    marginHorizontal: '1.1%',
  },
  activeDot: { backgroundColor: '#000000' },
  loginText: { marginTop: 20, fontWeight: 'bold', fontSize: 17 },
  button: {
    backgroundColor: '#AB72ED',
    paddingHorizontal: '15%',
    paddingVertical: '3%',
    borderRadius: 30,
    maxHeight: '80%',
    minWidth: '83%',
  },
  buttonText: { color: '#FFFFFF', textAlign: 'center' },
  PrivacyPolicy: { textAlign: 'center', color: '#9F9F9F', marginTop: 30 },
});
