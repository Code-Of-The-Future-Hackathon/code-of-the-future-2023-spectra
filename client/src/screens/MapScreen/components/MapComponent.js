import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import CustomMarker from './CustomMarker';
import AnimatedMarker from './AnimatedMarker';

const MapComponent = ({
  currentLocation,
  routeCoordinates,
  destinationPoints,
  selectedDestinationIndex,
  handleMarkerPress,
  showOnlySelectedMarker,
}) => (
  <MapView
    style={[styles.map, { marginTop: 40 }]}
    initialRegion={{
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    followUserLocation={true}
  >
    {destinationPoints.map((point, index) => {
      if (showOnlySelectedMarker && index !== selectedDestinationIndex) {
        return null; // Don't render this marker
      }
      return (
        <Marker
          key={index}
          coordinate={{ latitude: point.latitude, longitude: point.longitude }}
          onPress={() => handleMarkerPress(index)}
        >
          <AnimatedMarker>
            <CustomMarker />
          </AnimatedMarker>
        </Marker>
      );
    })}
    {routeCoordinates.length > 0 && (
      <Polyline
        coordinates={routeCoordinates}
        strokeWidth={4}
        strokeColor="#007AFF"
        lineDashPattern={[10, 5]}
      />
    )}
  </MapView>
);

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    flex: 1, // This makes sure the map takes up the remaining space
  },
});

export default MapComponent;
