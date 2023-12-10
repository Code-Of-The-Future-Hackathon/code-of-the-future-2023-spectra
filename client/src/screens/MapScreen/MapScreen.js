import React, { useState, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '@env';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';

import ArrivalTimeModal from './components/ArrivalTimeModal';
import DestinationPicker from './components/DestinationPicker';
import TransportModeSelector from './components/TransportModeSelector';
import MapComponent from './components/MapComponent';
import LocationTitle from './components/LocationTitle';
import NavigationInstructionsModal from './components/NavigationInstructionsModal';

export function MapScreen({ route }) {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedDestinationIndex, setSelectedDestinationIndex] = useState(-1);
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState(null);
  const [estimatedDistance, setEstimatedDistance] = useState(null);
  const [routeSteps, setRouteSteps] = useState([]);
  const [transportMode, setTransportMode] = useState('driving');
  const [isInstructionsModalVisible, setIsInstructionsModalVisible] =
    useState(false);

  const isNavigationActive =
    selectedDestinationIndex >= 0 && !!estimatedArrivalTime;
  const currentStep = routeSteps.length > 0 ? routeSteps[0].instruction : '';

  const destinationPoints = [
    { latitude: 42.45604, longitude: 27.412063, label: 'Аптека Живот', openAt: '08:00', closeAt: '20:00' },
    { latitude: 42.461178, longitude: 27.406498, label: 'Вита Фарма', openAt: '08:00', closeAt: '20:00' },
    { latitude: 42.464351, longitude: 27.402829, label: 'Здравец Аптека', openAt: '08:00', closeAt: '20:00' },
    { latitude: 42.448614, longitude: 27.413729, label: 'Билкова Аптека', openAt: '08:00', closeAt: '20:00'},
    { latitude: 42.453224, longitude: 27.421175, label: 'Фармация Здраве', openAt: '08:00', closeAt: '20:00' },
    { latitude: 42.461994, longitude: 27.420875, label: 'Лекарска Грижа', openAt: '08:00', closeAt: '20:00' },
    { latitude: 42.458226, longitude: 27.423364, label: 'Аптека Здраве и Красота', openAt: '08:00', closeAt: '20:00' },
    { latitude: 42.459809, longitude: 27.412249, label: 'Сърцевина Фарма', openAt: '08:00', closeAt: '20:00' },
  ];

  const locationTitle =
    selectedDestinationIndex >= 0 &&
      selectedDestinationIndex < destinationPoints.length
      ? destinationPoints[selectedDestinationIndex].label
      : 'Изберете си аптека';

  const locationHours =
    selectedDestinationIndex >= 0 &&
      selectedDestinationIndex < destinationPoints.length
      ? destinationPoints[selectedDestinationIndex].openAt + ' - ' + destinationPoints[selectedDestinationIndex].closeAt
      : '';

  const cancelNavigation = () => {
    setSelectedDestinationIndex(-1);
    setRouteCoordinates([]);
    setEstimatedArrivalTime(null);
    setEstimatedDistance(null);
  };

  const handleCloseInstructionsModal = () => {
    setIsInstructionsModalVisible(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (route.params?.destination) {
      const selectedDestination = route.params.destination;
      setSelectedDestinationIndex(
        destinationPoints.findIndex(
          (point) =>
            point.latitude === selectedDestination.latitude &&
            point.longitude === selectedDestination.longitude
        )
      );
      // Automatically fetch directions if a destination is passed
      if (currentLocation) {
        getDirections(
          `${currentLocation.latitude},${currentLocation.longitude}`,
          `${selectedDestination.latitude},${selectedDestination.longitude}`
        );
      }
    }
  }, [route.params?.destination, currentLocation]);

  useEffect(() => {
    if (
      currentLocation &&
      selectedDestinationIndex >= 0 &&
      selectedDestinationIndex < destinationPoints.length
    ) {
      const selectedDestination = destinationPoints[selectedDestinationIndex];
      getDirections(
        `${currentLocation.latitude},${currentLocation.longitude}`,
        `${selectedDestination.latitude},${selectedDestination.longitude}`
      );
    }
  }, [selectedDestinationIndex, currentLocation, transportMode]); // Add transportMode as a dependency

  const handleMarkerPress = (index) => {
    const selectedDestination = destinationPoints[index];
    setSelectedDestinationIndex(index);
    if (currentLocation) {
      getDirections(
        `${currentLocation.latitude},${currentLocation.longitude}`,
        `${selectedDestination.latitude},${selectedDestination.longitude}`
      );
    }
  };

  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&mode=${transportMode}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const json = await response.json();

      if (json.status !== 'OK') {
        console.error('API Error:', json.status, json.error_message);
        return;
      }

      if (json.routes.length === 0) {
        console.log('No routes found. Check the validity of your locations.');
        return;
      }

      if (json.routes[0]) {
        setEstimatedDistance(json.routes[0].legs[0].distance.text); // Set distance here
        setEstimatedArrivalTime(json.routes[0].legs[0].duration.text); // Existing line
      }

      const points = polyline.decode(json.routes[0].overview_polyline.points);
      const coords = points.map((point) => ({
        latitude: point[0],
        longitude: point[1],
      }));

      const steps = json.routes[0].legs[0].steps.map((step) => {
        return {
          distance: step.distance.text,
          duration: step.duration.text,
          instruction: step.html_instructions, // This is the navigation instruction
          startLocation: step.start_location,
          endLocation: step.end_location,
        };
      });
      // Store the steps in the state
      setRouteSteps(steps);

      setRouteCoordinates(coords);
    } catch (error) {
      console.error('Failed to fetch directions:', error);
    }
  };

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!currentLocation) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LocationTitle
        title={locationTitle}
        hours={locationHours}
        setIsInstructionsModalVisible={setIsInstructionsModalVisible}
      />
      <TransportModeSelector
        currentMode={transportMode}
        setTransportMode={setTransportMode}
      />
      <DestinationPicker
        destinationPoints={destinationPoints}
        selectedDestinationIndex={selectedDestinationIndex}
        setSelectedDestinationIndex={setSelectedDestinationIndex}
      />
      <MapComponent
        currentLocation={currentLocation}
        routeCoordinates={routeCoordinates}
        destinationPoints={destinationPoints}
        selectedDestinationIndex={selectedDestinationIndex}
        handleMarkerPress={handleMarkerPress}
        showOnlySelectedMarker={isNavigationActive}
      />
      {estimatedArrivalTime && selectedDestinationIndex >= 0 && (
        <ArrivalTimeModal
          isVisible={!!estimatedArrivalTime && selectedDestinationIndex >= 0}
          arrivalTime={estimatedArrivalTime}
          distance={estimatedDistance}
          onCancel={cancelNavigation} // Pass the new prop here
        />
      )}
      <NavigationInstructionsModal
        isVisible={isInstructionsModalVisible}
        steps={routeSteps}
        onCancel={handleCloseInstructionsModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1, // This makes sure the map takes up the remaining space
  },
});
