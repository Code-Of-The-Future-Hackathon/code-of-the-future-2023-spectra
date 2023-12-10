import React, { useState, useEffect, useRef } from 'react';
import { REACT_NATIVE_API_URL, PREDICTION_API_URL, PREDICTION_KEY } from '@env';
import {
  TextInput,
  View,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Image,
  Animated,
  Text,
  Dimensions,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { Camera } from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImageManipulator from 'expo-image-manipulator';

import PermissionView from './components/PermissionView';
import CameraView from './components/CameraView';
import ProductDetail from './components/ProductDetail';
import NoResult from './components/NoResult';
import PhotoButton from './components/PhotoButton';
import RecognitionResult from './components/RecognitionResult';
import AnimationView from './components/AnimationView';

export function ScannerScreen({ navigation }) {
  const tempProductDetails = {
    id: 'f809861e-7049-4041-8390-4d431728865a',
    name: 'Аналгин',
    formId: 'bb7c29a2-851b-45d5-acb9-fb1e3c673ff9',
    imgUrl:
      'https://res.cloudinary.com/dyy4oqzuh/image/upload/v1702150986/ahusu8wpwcsb168qch37.jpg',
    barcode: '3800010640039',
    sideEffects: 'Алергични реакции, гастроинтестинални проблеми',
    storage: 'Място недостъпно за деца, предпазено от пряка слънчева светлина.',
    dosage: 'Да се пие 1/2 - 1 таблетка до 4 пъти дневно.',
    ingredients: [
      'Метамизол натрий',
      'Пшенично нишесте',
      'Нишесте',
      'Натриев цикламат',
      'Захарин натрий',
    ],
    contradictions: 'Алергии, кървене, проблеми с черния дроб',
    categoryId: '12fe54c4-04b7-49f8-9934-7f21afc2fc04',
    createdAt: '2023-12-10T07:54:55.102Z',
    updatedAt: '2023-12-10T07:54:55.102Z',
  };

  const [productDetails, setProductDetails] = useState(tempProductDetails);

  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [torchEnabled, setTorchEnabled] = useState(false);
  const [inputVisible, setInputVisible] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [cameraMode, setCameraMode] = useState('barcode'); // 'barcode' or 'customVision'
  const [recognitionResult, setRecognitionResult] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showLines, setShowLines] = useState(true);

  const [error, setError] = useState(false);
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);

  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [showCamera, setShowCamera] = useState(true);

  const overlayAnim = useRef(new Animated.Value(-1000)).current;
  const barcodeAnimationRef = useRef(null);
  const leavesAnimationRef = useRef(null);

  const [topFourPredictions, setTopFourPredictions] = useState([]);
  const [showAlternatives, setShowAlternatives] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setScanned(false);
    }
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [isFocused]);

  useEffect(() => {
    if (cameraMode === 'barcode' && barcodeAnimationRef.current) {
      barcodeAnimationRef.current.play();
    } else if (cameraMode === 'customVision' && leavesAnimationRef.current) {
      leavesAnimationRef.current.play();
    }
  }, [cameraMode]);

  useEffect(() => {
    // Define the handler function
    const handler = ({ window, screen }) => {
      // Handle the dimensions change
      console.log(`Window dimensions: ${window.width}x${window.height}`);
      console.log(`Screen dimensions: ${screen.width}x${screen.height}`);
    };

    // Subscribe to dimension changes
    const subscription = Dimensions.addEventListener('change', handler);

    // Return a cleanup function that removes the event listener
    return () => subscription.remove();
  }, []);

  const handlePress = () => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    setShowLines(false);

    setCameraMode(cameraMode === 'barcode' ? 'customVision' : 'barcode');
    // Slide in from the left
    Animated.timing(overlayAnim, {
      toValue: 0, // Center of the screen
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Wait for longer, e.g., 1.5 seconds, then slide out to the right
      setTimeout(() => {
        Animated.timing(overlayAnim, {
          toValue: 1000, // Off-screen to the right
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          overlayAnim.setValue(-1000); // Reset to start position
        });
        setShowLines(true);
      }, 1500);
    });

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };

  const dismissKeyboardAndHideInput = () => {
    Keyboard.dismiss(); // This will dismiss the keyboard
    toggleInputVisible(); // Call the function to set inputVisible to false
  };

  const toggleInputVisible = () => {
    setInputVisible(!inputVisible);
  };

  const toggleTorch = () => {
    setTorchEnabled(!torchEnabled);
  };

  const handleShowOtherOptions = () => {
    setShowAlternatives(true); // This will show the other options view
  };

  const handlePressContinue = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  const resizeImage = async (imageUri, maxWidth, maxHeight) => {
    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: maxWidth, height: maxHeight } }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error('Error during image manipulation:', error);
      throw error;
    }
  };

  const sendImageToCustomVision = async (imageUri) => {
    try {
      const resizedImageUri = await resizeImage(imageUri, 1080, 1920); // Resize to max 800x600
      const imageData = new FormData();
      imageData.append('file', {
        uri: resizedImageUri,
        type: 'image/jpeg',
        name: 'upload.jpg',
      });

      let response = await fetch(PREDICTION_API_URL, {
        method: 'POST',
        headers: {
          'Prediction-Key': PREDICTION_KEY,
        },
        body: imageData,
      });

      if (response.ok) {
        const result = await response.json();
        const topThree = result.predictions
          ? result.predictions.slice(0, 4)
          : [];
        setTopFourPredictions(topThree);

        // Use the local topThree variable for immediate access
        if (topThree.length > 0) {
          setRecognitionResult(topThree[0].tagName);
        } else {
          // Handle case where no predictions are available
          setRecognitionResult('No predictions available');
        }
      } else {
        const errorResult = await response.text();
        console.error('Error response:', errorResult);
        throw new Error(`Unable to recognize the image: ${errorResult}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductDetails = async (barcode) => {
    setInputVisible(false);
    console.log('Fetching product details for barcode: ', barcode);
    console.log(REACT_NATIVE_API_URL);
    try {
      const response = await fetch(
        `${REACT_NATIVE_API_URL}/products/barcode/${barcode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const details = await response.json();
      setProductDetails(details);
    } catch (error) {
      setError(true);
      setProductDetails(null); // Handle error state appropriately
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetchProductDetails(data); // fetch details using barcode
  };

  const handleCaptureImage = async () => {
    if (cameraRef.current && cameraMode === 'customVision') {
      let photo = await cameraRef.current.takePictureAsync();
      setCapturedImageUri(photo.uri); // Save the captured image URI
      sendImageToCustomVision(photo.uri);
      setShowCamera(false); // Hide the camera view
    }
  };

  // Function to handle removing the image
  const handleRemoveImage = () => {
    setCapturedImageUri(null);
    setShowCamera(true); // Show the camera view again
  };

  const handleAddNew = () => {
    // Logic to handle adding a new entry
    setShowCamera(true); // Show the camera view again
    setError(true);
    setShowAlternatives(false); // Hide the other options view
    setRecognitionResult(''); // Reset the recognition result
  };

  const handleConfirm = (prediction) => {
    setRecognitionResult(prediction.tagName);
    setShowAlternatives(false); // Hide the other options view
    setShowCamera(true); // Show the camera view again
  };

  if (
    hasPermission === null ||
    hasPermission === undefined ||
    isFocused === false
  ) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: '#000',
        }}
      >
        <ActivityIndicator size={75} color="#52BDCC" />
      </View>
    );
  }
  if (hasPermission === false) {
    return <PermissionView onContinue={handlePressContinue} />;
  }

  return (
    <View style={styles.container}>
      {showCamera && (
        <Animated.View
          style={[styles.overlay, { transform: [{ translateX: overlayAnim }] }]}
        >
          {cameraMode === 'barcode' ? (
            <Image
              style={{ width: 300, height: 300 }}
              source={require('../../assets/animations/barcode.gif')}
            />
          ) : (
            <Image
              style={{ width: 300, height: 300 }}
              source={require('../../assets/animations/medicine.gif')}
            />
          )}
          <Text style={styles.overlayText}>
            {`Сменяме на камерата на ${
              cameraMode === 'barcode' ? 'barcode' : 'natural'
            }`}
          </Text>
          {cameraMode != 'barcode' && (
            <Text style={styles.subOverlayText}>Снимка на лекарството</Text>
          )}
        </Animated.View>
      )}

      {isFocused && showCamera && (
        <CameraView
          ref={cameraRef}
          onBarCodeScanned={
            cameraMode === 'barcode' && !scanned
              ? handleBarCodeScanned
              : undefined
          }
          cameraMode={cameraMode}
          torchEnabled={torchEnabled}
          scanned={scanned}
          showLines={showLines}
        />
      )}

      {productDetails && (
        <View style={styles.overlayModel}>
          <ProductDetail
            name={productDetails.name}
            imgUrl={productDetails.imgUrl}
            onNavigate={() => {
              navigation.navigate('ProductInfo', {
                productDetails: productDetails,
              });
            }}
            onClose={() => {
              setProductDetails(null); // Close the product details
              setScanned(false); // Reset scanned to false
            }}
          />
        </View>
      )}

      {showCamera && (
        <TouchableOpacity style={styles.torchButton} onPress={toggleTorch}>
          <Ionicons name="flash-outline" size={30} color="white" />
        </TouchableOpacity>
      )}

      {!productDetails && !error && showCamera && (
        <TouchableOpacity
          style={styles.modeButton}
          onPress={handlePress}
          disabled={isButtonDisabled}
        >
          {cameraMode === 'barcode' ? (
            <MaterialIcons name="medical-services" size={30} color="white" />
          ) : (
            <MaterialIcons name="qr-code-scanner" size={30} color="white" />
          )}
        </TouchableOpacity>
      )}

      {!productDetails && !error && showCamera && (
        <TouchableOpacity
          style={styles.keyboardButton}
          onPress={toggleInputVisible}
        >
          <MaterialIcons name="keyboard" size={30} color="white" />
        </TouchableOpacity>
      )}

      {inputVisible && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={dismissKeyboardAndHideInput}
        >
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setBarcodeValue(text)}
            value={barcodeValue}
            placeholder="Въведете баркод"
            keyboardType="numeric"
            zIndex={1}
            onSubmitEditing={() => fetchProductDetails(barcodeValue)}
          />
        </TouchableOpacity>
      )}

      {error && (
        <View style={styles.overlayModel}>
          <NoResult
            onClose={() => {
              setError(false);
              setProductDetails(null); // Close the product details
              setScanned(false); // Reset scanned to false
            }}
            onNavigate={() => {
              navigation.navigate('TakePhoto', {
                productDetails: productDetails,
              });
            }}
          />
        </View>
      )}

      {cameraMode === 'customVision' && showCamera && (
        <PhotoButton takePicture={handleCaptureImage} />
      )}

      {!showCamera && (
        /* Display the captured image in full screen */
        <View style={styles.fullImageContainer}>
          <Image source={{ uri: capturedImageUri }} style={styles.fullImage} />
          <TouchableOpacity
            style={styles.removeImageButton}
            onPress={handleRemoveImage}
          >
            <MaterialIcons name="close" size={30} />
          </TouchableOpacity>
        </View>
      )}

      {recognitionResult && !showCamera && (
        <RecognitionResult
          topFourPredictions={topFourPredictions}
          onConfirm={handleConfirm}
          onShowOtherOptions={handleShowOtherOptions}
          showAlternatives={showAlternatives}
          onAddNew={handleAddNew}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraView: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraModeText: {
    color: 'white',
    fontSize: 24,
  },
  torchButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#AB72ED',
    borderRadius: 15,
    padding: 10,
  },
  keyboardButton: {
    position: 'absolute',
    zIndex: 2,
    bottom: 100,
    padding: 10,
    right: 20,
    zIndex: 2,
    borderRadius: 15,
    backgroundColor: '#AB72ED',
  },
  modeButton: {
    position: 'absolute',
    zIndex: 2,
    bottom: 100,
    padding: 10,
    right: 80,
    borderRadius: 15,
    backgroundColor: '#AB72ED',
  },
  inputField: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -20,
    width: '80%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 16,
    zIndex: 1,
  },
  fullImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 5,
  },
  fullImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageButton: {
    zIndex: 10,
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 100,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  overlayModel: {
    ...StyleSheet.absoluteFillObject, // This will make the overlay cover the entire screen
    backgroundColor: 'rgba(0,0,0,0.7)', // Semi-transparent black
    justifyContent: 'flex-end',
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayText: {
    color: 'white',
    fontSize: 22,
  },
  subOverlayText: {
    color: 'white',
    fontSize: 12,
  },
});
