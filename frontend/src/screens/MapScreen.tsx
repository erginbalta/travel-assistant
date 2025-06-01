import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { useTheme } from '../contexts/ThemeContext';
import axios from 'axios';

const MapScreen = () => {
  const { theme } = useTheme();
  const [pois, setPois] = useState([]);
  const [selectedPoi, setSelectedPoi] = useState(null);

  useEffect(() => {
    fetchPOIs();
  }, []);

  const fetchPOIs = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/pois`, {
        params: {
          city: 'Istanbul', // Example city
          category: 'tourism',
        },
      });
      setPois(response.data);
    } catch (error) {
      console.error('Error fetching POIs:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapLibreGL.MapView
        style={styles.map}
        styleURL="https://demotiles.maplibre.org/style.json"
        initialRegion={{
          latitude: 41.0082, // Istanbul coordinates
          longitude: 28.9784,
          zoomLevel: 12,
        }}
        logoEnabled={false}
        attributionEnabled={false}
        compassEnabled={true}
        scaleBarEnabled={true}
        {...({} as any)}
      >
        <MapLibreGL.Camera
          zoomLevel={12}
          centerCoordinate={[28.9784, 41.0082]}
          animationMode="flyTo"
          animationDuration={2000}
        />
        {pois.map((poi: any) => (
          <MapLibreGL.PointAnnotation
            key={poi.id}
            id={poi.id}
            coordinate={[poi.location.lng, poi.location.lat]}
            title={poi.name}
            onSelected={() => setSelectedPoi(poi)}
          >
            <MapLibreGL.Callout title={poi.name} />
          </MapLibreGL.PointAnnotation>
        ))}
      </MapLibreGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen; 